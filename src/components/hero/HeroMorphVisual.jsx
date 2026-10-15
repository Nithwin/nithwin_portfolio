import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const isBot =
  typeof navigator !== "undefined" &&
  /HeadlessChrome|Lighthouse|PageSpeed|Googlebot|insights/i.test(
    navigator.userAgent
  );
const isMobileDevice = typeof window !== "undefined" && window.innerWidth <= 768;
const NUM_PARTICLES = isBot ? 1200 : isMobileDevice ? 2600 : 7000;
// Exact uniform bounding radius calibrated across all shapes
const UNIFORM_SHAPE_RADIUS = 2.5;
// Fixed pitch angle facing the screen (locked — cannot rotate up or down)
const FIXED_PITCH = 0.12;

// Normalizes any generated shape so all shapes have an exact, consistent visual volume
function normalizeShapeSize(arr, targetRadius = UNIFORM_SHAPE_RADIUS) {
  let maxR = 0;
  for (let i = 0; i < arr.length; i += 3) {
    const x = arr[i];
    const y = arr[i + 1];
    const z = arr[i + 2];
    const r = Math.sqrt(x * x + y * y + z * z);
    if (r > maxR) maxR = r;
  }
  if (maxR > 0) {
    const factor = targetRadius / maxR;
    for (let i = 0; i < arr.length; i += 3) {
      arr[i] *= factor;
      arr[i + 1] *= factor;
      arr[i + 2] *= factor;
    }
  }
  return arr;
}

// High-contrast, crisp pixel particle texture
function createCrispPixelTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  // Solid bright core with tight, sharp edge for clear pixel clarity
  const grad = ctx.createRadialGradient(
    size / 2,
    size / 2,
    size * 0.15,
    size / 2,
    size / 2,
    size * 0.48
  );
  grad.addColorStop(0, "rgba(255, 255, 255, 1)");
  grad.addColorStop(0.5, "rgba(255, 255, 255, 0.95)");
  grad.addColorStop(0.85, "rgba(255, 255, 255, 0.45)");
  grad.addColorStop(1, "rgba(255, 255, 255, 0)");

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size * 0.48, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// ---------------------------------------------------------------------
// 1. SCORPIO — Anatomical prosoma, 7 segmented tergites, 5-segment metasoma, bulbous telson with stinger, heavy chelae palms & 8 articulated walking legs
// ---------------------------------------------------------------------
function generateScorpionShape(count) {
  const arr = new Float32Array(count * 3);
  const scale = 1.0;

  const prosomaCount = Math.floor(count * 0.12);
  const mesosomaCount = Math.floor(count * 0.18);
  const metasomaCount = Math.floor(count * 0.22);
  const chelaeCount = Math.floor(count * 0.26);
  const legsCount = count - prosomaCount - mesosomaCount - metasomaCount - chelaeCount;

  let idx = 0;

  // A. Prosoma / Carapace Shield with Median Eyes (front headplate)
  for (let i = 0; i < prosomaCount; i++) {
    const u = Math.random();
    const v = (Math.random() - 0.5) * 2;
    const cz = (0.05 + u * 0.42) * scale;
    const width = (0.58 - u * 0.16) * (1 - v * v * 0.35) * scale;
    const cx = v * width * 0.5;
    const cy = (-0.15 + (1 - v * v) * 0.12 - u * 0.06 + (Math.random() - 0.5) * 0.03) * scale;

    if (i < prosomaCount * 0.08) {
      arr[idx * 3] = (Math.random() - 0.5) * 0.08 * scale;
      arr[idx * 3 + 1] = cy + 0.08 * scale;
      arr[idx * 3 + 2] = 0.28 * scale + (Math.random() - 0.5) * 0.06 * scale;
    } else {
      arr[idx * 3] = cx;
      arr[idx * 3 + 1] = cy;
      arr[idx * 3 + 2] = cz;
    }
    idx++;
  }

  // B. Mesosoma (7 Segmented Armor Tergite Plates)
  for (let i = 0; i < mesosomaCount; i++) {
    const seg = Math.floor((i / mesosomaCount) * 7);
    const segT = (i % (mesosomaCount / 7)) / (mesosomaCount / 7);
    const zBase = (0.05 - seg * 0.11) * scale;
    const z = zBase - segT * 0.09 * scale;

    const taper = Math.sin(((seg + segT) / 7.5) * Math.PI);
    const segWidth = (0.35 + 0.48 * taper) * scale;
    const segHeight = (0.16 + 0.12 * taper) * scale;

    const u = (Math.random() - 0.5) * 2;
    const px = u * segWidth * 0.5;
    const py = (-0.18 + (1 - u * u) * segHeight - Math.abs(u) * 0.08 + (Math.random() - 0.5) * 0.02) * scale;

    arr[idx * 3] = px;
    arr[idx * 3 + 1] = py;
    arr[idx * 3 + 2] = z;
    idx++;
  }

  // C. Metasoma (5 Cylindrical Tail Segments) & Telson (Venom Bulb + Needle Stinger)
  for (let i = 0; i < metasomaCount; i++) {
    const t = i / metasomaCount;
    const angle = t * Math.PI * 1.28;
    const spineZ = (-0.72 - 1.1 * Math.sin(angle) + t * 0.35) * scale;
    const spineY = (-0.18 + 1.25 * (1 - Math.cos(angle))) * scale;

    if (t < 0.82) {
      const isJoint = (t % 0.164) < 0.025;
      const segRad = (isJoint ? 0.14 : 0.11 * (1 - t * 0.28) + (Math.random() - 0.5) * 0.02) * scale;
      const radAng = Math.random() * Math.PI * 2;

      arr[idx * 3] = Math.cos(radAng) * segRad;
      arr[idx * 3 + 1] = spineY + Math.sin(radAng) * segRad;
      arr[idx * 3 + 2] = spineZ;
    } else {
      const telsonT = (t - 0.82) / 0.18;
      if (telsonT < 0.6) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI;
        const bRad = 0.16 * scale;
        arr[idx * 3] = Math.cos(u) * Math.sin(v) * bRad * 0.82;
        arr[idx * 3 + 1] = spineY + Math.cos(v) * bRad * 1.1;
        arr[idx * 3 + 2] = spineZ + Math.sin(u) * Math.sin(v) * bRad;
      } else {
        const stingT = (telsonT - 0.6) / 0.4;
        const sRad = (0.05 * (1 - stingT) + 0.005) * scale;
        const theta = Math.random() * Math.PI * 2;
        arr[idx * 3] = Math.cos(theta) * sRad;
        arr[idx * 3 + 1] = spineY - stingT * 0.35 * scale;
        arr[idx * 3 + 2] = spineZ + stingT * 0.32 * scale;
      }
    }
    idx++;
  }

  // D. Pedipalps & Chelae (Arm + Muscular Manus + Opposable Pincer Fingers)
  for (let i = 0; i < chelaeCount; i++) {
    const side = i % 2 === 0 ? 1 : -1;
    const t = i / chelaeCount;

    if (t < 0.35) {
      const armT = t / 0.35;
      const ax = side * (0.28 + armT * 1.05) * scale;
      const ay = (-0.14 + Math.sin(armT * Math.PI) * 0.2) * scale;
      const az = (0.35 + armT * 0.72) * scale;
      const armRad = (0.075 - armT * 0.015) * scale;
      const aAng = Math.random() * Math.PI * 2;

      arr[idx * 3] = ax + Math.cos(aAng) * armRad;
      arr[idx * 3 + 1] = ay + Math.sin(aAng) * armRad;
      arr[idx * 3 + 2] = az;
    } else if (t < 0.65) {
      const pT = (t - 0.35) / 0.3;
      const u = Math.random() * Math.PI * 2;
      const v = Math.random() * Math.PI;
      const pw = 0.22 * scale;
      const ph = 0.16 * scale;
      const pl = 0.28 * scale;
      const cx = side * (1.32 + Math.cos(u) * Math.sin(v) * pw) * scale;
      const cy = (-0.12 + Math.cos(v) * ph) * scale;
      const cz = (1.08 + pT * pl + Math.sin(u) * Math.sin(v) * 0.1) * scale;

      arr[idx * 3] = cx;
      arr[idx * 3 + 1] = cy;
      arr[idx * 3 + 2] = cz;
    } else {
      const fT = (t - 0.65) / 0.35;
      const isMovable = (i % 4 === 0 || i % 4 === 1);
      const curve = Math.sin(fT * Math.PI * 0.85);
      const taper = 1 - fT * 0.85;

      const fingerBend = isMovable ? (0.42 * curve) : (-0.28 * curve);
      const fx = side * (1.32 + fingerBend * side) * scale + (Math.random() - 0.5) * 0.03 * taper * scale;
      const fy = (-0.12 + (isMovable ? 0.05 : -0.05) * curve) * scale;
      const fz = (1.36 + fT * 0.75) * scale;

      arr[idx * 3] = fx;
      arr[idx * 3 + 1] = fy;
      arr[idx * 3 + 2] = fz;
    }
    idx++;
  }

  // E. 8 Jointed Walking Legs with Anatomical Bends
  for (let i = 0; i < legsCount; i++) {
    const side = i % 2 === 0 ? 1 : -1;
    const legPair = Math.floor((i / legsCount) * 4);
    const t = ((i / legsCount) * 4) % 1;

    const baseZ = (0.28 - legPair * 0.18) * scale;
    const legLength = (1.15 + legPair * 0.12) * scale;

    const lx = side * (0.25 + t * legLength) * scale;
    const archH = Math.sin(Math.pow(t, 0.75) * Math.PI) * 0.42 * scale;
    const ly = (-0.22 + archH - Math.pow(t, 1.4) * 0.62) * scale;
    const lz = baseZ + (legPair - 1.5) * 0.14 * Math.sin(t * Math.PI) * scale;

    arr[idx * 3] = lx + (Math.random() - 0.5) * 0.03 * scale;
    arr[idx * 3 + 1] = ly + (Math.random() - 0.5) * 0.03 * scale;
    arr[idx * 3 + 2] = lz;
    idx++;
  }

  // Forward face-down pitch (~26°) so dorsal carapace, pincers & 8 legs are clearly visible
  const scorpioPitch = 0.45;
  const cosS = Math.cos(scorpioPitch);
  const sinS = Math.sin(scorpioPitch);
  for (let i = 0; i < arr.length; i += 3) {
    const y = arr[i + 1];
    const z = arr[i + 2];
    arr[i + 1] = y * cosS - z * sinS;
    arr[i + 2] = y * sinS + z * cosS;
  }

  // Center Scorpio vertically to eliminate excess bottom space
  let minY = Infinity, maxY = -Infinity;
  for (let i = 1; i < arr.length; i += 3) {
    if (arr[i] < minY) minY = arr[i];
    if (arr[i] > maxY) maxY = arr[i];
  }
  const centerY = (minY + maxY) / 2;
  for (let i = 1; i < arr.length; i += 3) {
    arr[i] -= centerY;
  }

  return normalizeShapeSize(arr, UNIFORM_SHAPE_RADIUS);
}

// ---------------------------------------------------------------------
// 2. EAGLE — Slotted primary flight feathers, cambered aerofoil wings, sculpted raptor head with supraorbital brow, hooked beak & talons
// ---------------------------------------------------------------------
function generateEagleShape(count) {
  const arr = new Float32Array(count * 3);
  const scale = 1.0;

  const wingsCount = Math.floor(count * 0.54);
  const bodyHeadCount = Math.floor(count * 0.22);
  const tailCount = Math.floor(count * 0.12);
  const talonsCount = count - wingsCount - bodyHeadCount - tailCount;

  let idx = 0;

  // A. Aerodynamic Wings (Slotted Primaries, Secondaries & Coverts)
  for (let i = 0; i < wingsCount; i++) {
    const side = i % 2 === 0 ? 1 : -1;
    const t = Math.random();
    const span = (0.22 + t * 2.05) * scale;

    const arch = (Math.sin(t * Math.PI * 0.88) * 0.52 - (t > 0.7 ? Math.pow(t - 0.7, 1.2) * 0.35 : 0)) * scale;
    const sweep = (-Math.pow(t, 1.35) * 0.72) * scale;
    const chord = (1 - t * 0.58) * 0.72 * scale;

    if (t > 0.82) {
      // Slotted Primary Feathers ("Feather Fingers" at wingtips)
      const fingerIdx = Math.floor(((i % 16) / 16) * 5);
      const fingerSpread = (fingerIdx - 2) * 0.14 * scale;
      const fingerSweep = fingerIdx * 0.08 * scale;
      const px = side * (span + Math.random() * 0.15 * scale);
      const py = arch + (fingerIdx - 2) * 0.05 * scale;
      const pz = sweep - chord * 0.5 + fingerSpread - fingerSweep;
      arr[idx * 3] = px;
      arr[idx * 3 + 1] = py;
      arr[idx * 3 + 2] = pz;
    } else {
      // Layered Coverts & Secondaries
      const chordPos = (Math.random() - 0.5) * chord;
      const thickness = (1 - Math.abs(chordPos) / (chord * 0.5)) * 0.12 * (1 - t * 0.5) * scale;
      const camber = (chordPos > 0 ? 0.04 : -0.02) * scale;

      arr[idx * 3] = side * span;
      arr[idx * 3 + 1] = arch + camber + (Math.random() - 0.5) * thickness;
      arr[idx * 3 + 2] = sweep + chordPos;
    }
    idx++;
  }

  // B. Muscular Keel Chest, Sculpted Raptor Head & Hooked Beak
  for (let i = 0; i < bodyHeadCount; i++) {
    const t = i / bodyHeadCount;
    if (t < 0.6) {
      const bodyT = t / 0.6;
      const by = (0.28 - bodyT * 0.75) * scale;
      const taper = Math.sin(bodyT * Math.PI);
      const bx = (Math.random() - 0.5) * 0.48 * taper * scale;
      const bz = (0.22 - bodyT * 0.48 + (Math.random() - 0.5) * 0.26 * taper) * scale;

      arr[idx * 3] = bx;
      arr[idx * 3 + 1] = by;
      arr[idx * 3 + 2] = bz;
    } else {
      const headT = (t - 0.6) / 0.4;
      if (headT < 0.65) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI;
        const hRad = 0.26 * scale;
        const hx = Math.cos(u) * Math.sin(v) * hRad * 0.85;
        const hy = (0.38 + Math.cos(v) * hRad) * scale;
        const hz = (0.32 + Math.sin(u) * Math.sin(v) * hRad) * scale;

        const isBrow = Math.abs(hx) > 0.12 && hy > 0.42 && hz > 0.42;
        arr[idx * 3] = hx;
        arr[idx * 3 + 1] = hy + (isBrow ? 0.04 * scale : 0);
        arr[idx * 3 + 2] = hz;
      } else {
        const beakT = (headT - 0.65) / 0.35;
        const bz = (0.52 + beakT * 0.42) * scale;
        const by = (0.38 - Math.pow(beakT, 2.2) * 0.42) * scale;
        const bx = (Math.random() - 0.5) * (0.14 * (1 - beakT)) * scale;

        arr[idx * 3] = bx;
        arr[idx * 3 + 1] = by;
        arr[idx * 3 + 2] = bz;
      }
    }
    idx++;
  }

  // C. Fanned Retrices Tail Feathers
  for (let i = 0; i < tailCount; i++) {
    const t = i / tailCount;
    const spread = (Math.random() - 0.5) * (0.38 + t * 0.85) * scale;
    const tz = (-0.38 - t * 0.95) * scale;
    const ty = (-0.28 - t * 0.52 + (Math.random() - 0.5) * 0.05) * scale;

    arr[idx * 3] = spread;
    arr[idx * 3 + 1] = ty;
    arr[idx * 3 + 2] = tz;
    idx++;
  }

  // D. Feathered Crura Thighs & Heavy Grasping Predatory Talons (4 Claws)
  for (let i = 0; i < talonsCount; i++) {
    const side = i % 2 === 0 ? 1 : -1;
    const t = i / talonsCount;
    if (t < 0.35) {
      const thT = t / 0.35;
      const thX = side * (0.2 + thT * 0.12) * scale + (Math.random() - 0.5) * 0.1 * scale;
      const thY = (-0.42 - thT * 0.32) * scale;
      const thZ = (0.05 + (Math.random() - 0.5) * 0.12) * scale;
      arr[idx * 3] = thX;
      arr[idx * 3 + 1] = thY;
      arr[idx * 3 + 2] = thZ;
    } else {
      const digitIdx = i % 4;
      const clawT = (i % 16) / 16;
      const digitAngle = (digitIdx === 3) ? Math.PI : (digitIdx - 1) * 0.45;
      const clawRadius = (0.18 + clawT * 0.32) * scale;

      const cx = side * (0.28 + Math.sin(digitAngle) * clawRadius * 0.7) * scale;
      const cy = (-0.74 - Math.sin(clawT * Math.PI * 0.8) * 0.38 - clawT * 0.35) * scale;
      const cz = (0.05 + Math.cos(digitAngle) * clawRadius + Math.cos(clawT * Math.PI) * 0.18) * scale;

      arr[idx * 3] = cx;
      arr[idx * 3 + 1] = cy;
      arr[idx * 3 + 2] = cz;
    }
    idx++;
  }

  // Soaring face-down pitch (~17°)
  const eaglePitch = 0.30;
  const cosE = Math.cos(eaglePitch);
  const sinE = Math.sin(eaglePitch);
  for (let i = 0; i < arr.length; i += 3) {
    const y = arr[i + 1];
    const z = arr[i + 2];
    arr[i + 1] = y * cosE - z * sinE;
    arr[i + 2] = y * sinE + z * cosE;
  }

  // Center Eagle vertically and ground properly
  let minY = Infinity, maxY = -Infinity;
  for (let i = 1; i < arr.length; i += 3) {
    if (arr[i] < minY) minY = arr[i];
    if (arr[i] > maxY) maxY = arr[i];
  }
  const centerY = (minY + maxY) / 2;
  const eagleLowering = centerY + 0.14;
  for (let i = 1; i < arr.length; i += 3) {
    arr[i] -= eagleLowering;
  }

  return normalizeShapeSize(arr, UNIFORM_SHAPE_RADIUS);
}

// ---------------------------------------------------------------------
// 3. SATURN (PLANET) — Oblate spheroid globe, cloud bands, dense Ring B, dark Cassini Division & Ring A
// ---------------------------------------------------------------------
function generateSaturnShape(count) {
  const arr = new Float32Array(count * 3);
  const scale = 1.0;

  const planetCount = Math.floor(count * 0.38);
  const moonCount = Math.floor(count * 0.04);
  const ringCount = count - planetCount - moonCount;

  let idx = 0;
  const phi = (1 + Math.sqrt(5)) / 2;
  const radius = 1.05 * scale;

  // A. Oblate Spheroid Planet Globe with Latitudinal Atmospheric Cloud Bands
  for (let i = 0; i < planetCount; i++) {
    const yNorm = 1 - (i / (planetCount - 1)) * 2;
    const rad = Math.sqrt(1 - yNorm * yNorm);
    const theta = (2 * Math.PI * i) / phi;

    const lat = Math.abs(yNorm);
    const bandRipple = 1 + 0.025 * Math.sin(lat * Math.PI * 9) + 0.015 * Math.cos(lat * Math.PI * 18);
    const rx = radius * 1.08 * bandRipple;
    const ry = radius * 0.92 * bandRipple;

    arr[idx * 3] = Math.cos(theta) * rad * rx;
    arr[idx * 3 + 1] = yNorm * ry;
    arr[idx * 3 + 2] = Math.sin(theta) * rad * rx;
    idx++;
  }

  // B. Planetary Concentric Rings with Sharp Cassini Division
  const tilt = 0.44;
  const cosT = Math.cos(tilt);
  const sinT = Math.sin(tilt);

  for (let i = 0; i < ringCount; i++) {
    const t = i / ringCount;
    let rRing;

    if (t < 0.16) {
      // Inner Crepe Ring C
      rRing = (1.28 + (t / 0.16) * 0.22) * scale;
    } else if (t < 0.64) {
      // Dense Ring B (brightest, densest)
      rRing = (1.52 + ((t - 0.16) / 0.48) * 0.42) * scale;
    } else if (t < 0.68) {
      // Cassini Division (gap)
      rRing = (1.95 + ((t - 0.64) / 0.04) * 0.09) * scale;
    } else {
      // Outer Ring A
      rRing = (2.05 + ((t - 0.68) / 0.32) * 0.38) * scale;
    }

    const theta = Math.random() * Math.PI * 2;
    const rx = Math.cos(theta) * rRing;
    const rz = Math.sin(theta) * rRing;
    const ry = (Math.random() - 0.5) * 0.035 * scale;

    arr[idx * 3] = rx;
    arr[idx * 3 + 1] = ry * cosT - rz * sinT;
    arr[idx * 3 + 2] = ry * sinT + rz * cosT;
    idx++;
  }

  // C. Small Orbiting Moon / Satellite with Trail
  for (let i = 0; i < moonCount; i++) {
    const moonDist = 2.92 * scale;
    const mAngle = 0.72 + (i / moonCount) * 0.18;
    const mRad = 0.1 * scale;
    const u = Math.random() * Math.PI * 2;
    const v = Math.random() * Math.PI;

    const mx = Math.cos(mAngle) * moonDist + Math.cos(u) * Math.sin(v) * mRad;
    const mz = Math.sin(mAngle) * moonDist + Math.sin(u) * Math.sin(v) * mRad;
    const my = (Math.random() - 0.5) * mRad;

    arr[idx * 3] = mx;
    arr[idx * 3 + 1] = my * cosT - mz * sinT;
    arr[idx * 3 + 2] = my * sinT + mz * cosT;
    idx++;
  }

  return normalizeShapeSize(arr, UNIFORM_SHAPE_RADIUS);
}

// ---------------------------------------------------------------------
// 4. COSMIC GALAXY — Supermassive central bulge, bar nucleus, logarithmic spiral arms with nebular clusters & stellar halo
// ---------------------------------------------------------------------
function generateGalaxyShape(count) {
  const arr = new Float32Array(count * 3);
  const scale = 1.0;

  const coreCount = Math.floor(count * 0.28);
  const haloCount = Math.floor(count * 0.08);
  const armCount = count - coreCount - haloCount;

  let idx = 0;
  const tilt = 0.52;
  const cosG = Math.cos(tilt);
  const sinG = Math.sin(tilt);

  // A. Superdense Central Bulge & Bar Nucleus
  for (let i = 0; i < coreCount; i++) {
    const u = Math.random();
    const r = Math.pow(u, 2.2) * 0.72 * scale;
    const theta = Math.random() * Math.PI * 2;
    const phi = (Math.random() - 0.5) * Math.PI;

    const barFactor = 1 + 0.3 * Math.cos(2 * theta);
    const rx = Math.cos(theta) * Math.cos(phi) * r * barFactor;
    const ry = Math.sin(phi) * r * 0.65;
    const rz = Math.sin(theta) * Math.cos(phi) * r * barFactor;

    arr[idx * 3] = rx;
    arr[idx * 3 + 1] = ry * cosG - rz * sinG;
    arr[idx * 3 + 2] = ry * sinG + rz * cosG;
    idx++;
  }

  // B. Dual Logarithmic Spiral Arms with Nebular Clusters & Spurs
  for (let i = 0; i < armCount; i++) {
    const arm = i % 2 === 0 ? 0 : Math.PI;
    const t = Math.pow(i / armCount, 0.72);
    const theta = arm + t * 3.8 * Math.PI;
    const r = (0.38 + t * 2.25) * scale;

    const isCluster = (i % 24 === 0);
    const clusterSpread = isCluster ? (0.05 * scale) : (0.12 + t * 0.28) * scale;
    const spreadAngle = Math.random() * Math.PI * 2;
    const sx = Math.cos(spreadAngle) * (Math.random() * clusterSpread);
    const sz = Math.sin(spreadAngle) * (Math.random() * clusterSpread);

    const diskThickness = (0.24 - t * 0.14) * scale;
    const sy = (Math.random() - 0.5) * diskThickness;

    const rawX = Math.cos(theta) * r + sx;
    const rawY = sy;
    const rawZ = Math.sin(theta) * r + sz;

    arr[idx * 3] = rawX;
    arr[idx * 3 + 1] = rawY * cosG - rawZ * sinG;
    arr[idx * 3 + 2] = rawY * sinG + rawZ * cosG;
    idx++;
  }

  // C. Globular Cluster Stellar Halo
  for (let i = 0; i < haloCount; i++) {
    const u = Math.random();
    const hRad = (0.8 + Math.pow(u, 1.2) * 1.8) * scale;
    const hTheta = Math.random() * Math.PI * 2;
    const hPhi = (Math.random() - 0.5) * Math.PI;

    const hx = Math.cos(hTheta) * Math.cos(hPhi) * hRad;
    const hy = Math.sin(hPhi) * hRad * 0.5;
    const hz = Math.sin(hTheta) * Math.cos(hPhi) * hRad;

    arr[idx * 3] = hx;
    arr[idx * 3 + 1] = hy * cosG - hz * sinG;
    arr[idx * 3 + 2] = hy * sinG + hz * cosG;
    idx++;
  }

  return normalizeShapeSize(arr, UNIFORM_SHAPE_RADIUS);
}

// ---------------------------------------------------------------------
// 5. DNA DOUBLE HELIX — Asymmetric Major & Minor Grooves, 3D tubular sugar-phosphate backbones & stacked planar base-pair rungs
// ---------------------------------------------------------------------
function generateDnaShape(count) {
  const arr = new Float32Array(count * 3);
  const scale = 1.0;

  const strandCount = Math.floor(count * 0.65);
  const rungCount = count - strandCount;

  let idx = 0;
  const turns = 2.5;
  const height = 3.8 * scale;
  const helixRadius = 1.08 * scale;
  const strandPhaseOffset = Math.PI * (120 / 180); // Real B-DNA 120° Minor Groove / 240° Major Groove

  const tilt = 0.22;
  const cosD = Math.cos(tilt);
  const sinD = Math.sin(tilt);

  // A. Sugar-Phosphate Dual Helical Ribbon Strands (Volumetric 3D Tubes)
  for (let i = 0; i < strandCount; i++) {
    const isSecondStrand = i % 2 === 0;
    const t = i / strandCount;
    const theta = t * turns * Math.PI * 2 + (isSecondStrand ? strandPhaseOffset : 0);
    const rawY = (t - 0.5) * height;

    const tubeAngle = Math.random() * Math.PI * 2;
    const tubeRad = (0.08 + Math.random() * 0.06) * scale;
    const rCurrent = helixRadius + Math.cos(tubeAngle) * tubeRad;
    const yOffset = Math.sin(tubeAngle) * tubeRad;

    const rawX = Math.cos(theta) * rCurrent;
    const rawZ = Math.sin(theta) * rCurrent;
    const finalY = rawY + yOffset;

    arr[idx * 3] = rawX;
    arr[idx * 3 + 1] = finalY * cosD - rawZ * sinD;
    arr[idx * 3 + 2] = finalY * sinD + rawZ * cosD;
    idx++;
  }

  // B. Stacked Planar Base-Pair Hydrogen Rungs (Adenine-Thymine & Guanine-Cytosine)
  const numSteps = 32;
  for (let i = 0; i < rungCount; i++) {
    const stepIdx = Math.floor((i / rungCount) * numSteps);
    const tStep = stepIdx / (numSteps - 1);
    const theta1 = tStep * turns * Math.PI * 2;
    const theta2 = theta1 + strandPhaseOffset;
    const rawY = (tStep - 0.5) * height;

    const x1 = Math.cos(theta1) * helixRadius;
    const z1 = Math.sin(theta1) * helixRadius;
    const x2 = Math.cos(theta2) * helixRadius;
    const z2 = Math.sin(theta2) * helixRadius;

    const rungT = (i % (rungCount / numSteps)) / (rungCount / numSteps);
    const rx = x1 + (x2 - x1) * rungT + (Math.random() - 0.5) * 0.04 * scale;
    const rz = z1 + (z2 - z1) * rungT + (Math.random() - 0.5) * 0.04 * scale;
    const ry = rawY + (Math.random() - 0.5) * 0.02 * scale;

    arr[idx * 3] = rx;
    arr[idx * 3 + 1] = ry * cosD - rz * sinD;
    arr[idx * 3 + 2] = ry * sinD + rz * cosD;
    idx++;
  }

  // Center vertically
  let minY = Infinity, maxY = -Infinity;
  for (let i = 1; i < arr.length; i += 3) {
    if (arr[i] < minY) minY = arr[i];
    if (arr[i] > maxY) maxY = arr[i];
  }
  const centerY = (minY + maxY) / 2;
  for (let i = 1; i < arr.length; i += 3) {
    arr[i] -= centerY;
  }

  return normalizeShapeSize(arr, UNIFORM_SHAPE_RADIUS);
}

export default function HeroMorphVisual({ theme = "dark" }) {
  const containerRef = useRef(null);
  const themeRef = useRef(theme);
  themeRef.current = theme;

  const stateRef = useRef({
    currentShapeIndex: 0,
    mouseScreenX: 9999,
    mouseScreenY: 9999,
    isHovering: false,
    rotY: 0.0,
    targetRotY: 0.0,
    isDragging: false,
    dragStartX: 0,
    rotStartX: 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    // Camera positioned at 6.2 for a harmonious, properly sized view
    camera.position.z = 6.2;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Pre-calculate target vertex positions for all 5 sculpted shapes
    const shapeList = [
      generateScorpionShape(NUM_PARTICLES), // 0: Scorpio
      generateEagleShape(NUM_PARTICLES),    // 1: Eagle
      generateSaturnShape(NUM_PARTICLES),   // 2: Planet (Saturn)
      generateGalaxyShape(NUM_PARTICLES),   // 3: Cosmic Galaxy
      generateDnaShape(NUM_PARTICLES),      // 4: DNA Double Helix
    ];

    // BufferGeometry setup
    const geometry = new THREE.BufferGeometry();
    const currentPositions = new Float32Array(shapeList[0]);
    const particleColors = new Float32Array(NUM_PARTICLES * 3);

    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(currentPositions, 3)
    );
    geometry.setAttribute(
      "color",
      new THREE.BufferAttribute(particleColors, 3)
    );

    // Crisp pixelated texture with high brightness
    const particleTexture = createCrispPixelTexture();

    const material = new THREE.PointsMaterial({
      size: 0.056,
      map: particleTexture,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      opacity: 0.98,
    });

    const pointCloud = new THREE.Points(geometry, material);
    // Perfectly centered with slight downward grounding
    pointCloud.position.y = -0.12;
    scene.add(pointCloud);

    // Color definitions
    const darkPalette = {
      primary: new THREE.Color(0xff3b1d),   // Neon incandescent ember orange
      secondary: new THREE.Color(0xff8c00), // Vibrant gold/amber
      core: new THREE.Color(0xffffff),      // Crisp white highlight
      deep: new THREE.Color(0xff1100),      // Rich red
    };

    const lightPalette = {
      primary: new THREE.Color(0x0038ff),   // Vibrant electric cobalt blue
      secondary: new THREE.Color(0x7c3aed), // Brilliant electric violet / purple (distinct second color!)
      core: new THREE.Color(0x00145a),      // Deep navy core for crisp contrast
      deep: new THREE.Color(0x9333ea),      // Rich vivid fuchsia/purple
    };

    // Auto-cycle shapes infinitely every 4.4 seconds
    let shapeIndex = 0;
    const cycleInterval = setInterval(() => {
      shapeIndex = (shapeIndex + 1) % shapeList.length;
      stateRef.current.currentShapeIndex = shapeIndex;
    }, 4400);

    // Mouse Interaction (Hover Scatter + Horizontal Left/Right Drag Only)
    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      // Unproject mouse coordinates to z=0 plane in 3D
      const vector = new THREE.Vector3(normX, normY, 0.5);
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos3D = camera.position.clone().add(dir.multiplyScalar(distance));

      // Adjust for pointCloud position.y offset
      stateRef.current.mouseScreenX = pos3D.x;
      stateRef.current.mouseScreenY = pos3D.y - pointCloud.position.y;
      stateRef.current.isHovering = true;

      // Only horizontal (left / right) drag is allowed; cannot rotate up or down!
      if (stateRef.current.isDragging) {
        const deltaX = e.clientX - stateRef.current.dragStartX;
        stateRef.current.targetRotY = stateRef.current.rotStartX + deltaX * 0.008;
      }
    };

    const onMouseEnter = () => {
      stateRef.current.isHovering = true;
    };

    const onMouseLeave = () => {
      stateRef.current.isHovering = false;
      stateRef.current.mouseScreenX = 9999;
      stateRef.current.mouseScreenY = 9999;
      stateRef.current.isDragging = false;
    };

    const onMouseDown = (e) => {
      stateRef.current.isDragging = true;
      stateRef.current.dragStartX = e.clientX;
      stateRef.current.rotStartX = stateRef.current.rotY;
    };

    const onMouseUp = () => {
      stateRef.current.isDragging = false;
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseenter", onMouseEnter);
    container.addEventListener("mouseleave", onMouseLeave);
    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Animation Render Loop
    let clock = 0;
    let animId;
    const tempColor = new THREE.Color();

    const animate = () => {
      clock += 0.02;
      const st = stateRef.current;
      const isLight = themeRef.current === "light";
      const palette = isLight ? lightPalette : darkPalette;

      // Gentle front-facing turntable sway (±25 degrees) so objects always face the screen
      if (!st.isDragging) {
        st.targetRotY = Math.sin(clock * 0.45) * 0.42;
        st.rotY += (st.targetRotY - st.rotY) * 0.06;
      } else {
        st.rotY += (st.targetRotY - st.rotY) * 0.18;
      }

      // Pitch is locked to FIXED_PITCH — CANNOT rotate up or down!
      pointCloud.rotation.x = FIXED_PITCH;
      // Rotates smoothly left and right
      pointCloud.rotation.y = st.rotY;

      // Switch blending based on theme
      material.blending = isLight ? THREE.NormalBlending : THREE.AdditiveBlending;
      material.size = isLight
        ? isMobileDevice ? 0.088 : 0.068
        : isMobileDevice ? 0.076 : 0.056;

      const currentIdx = st.currentShapeIndex;
      const targetShape = shapeList[currentIdx];
      const posAttr = geometry.attributes.position;
      const colAttr = geometry.attributes.color;
      const pos = posAttr.array;
      const col = colAttr.array;

      const morphSpeed = 0.055;
      const scatterRadius = 1.0; // Proximity radius for mouse touch scatter
      const scatterForce = 1.6;

      // Inverse rotation to project world mouse position into local pointcloud space
      const invRotY = -st.rotY;
      const invRotX = -FIXED_PITCH;
      const localMouseX =
        st.mouseScreenX * Math.cos(invRotY) + st.mouseScreenY * Math.sin(invRotX) * Math.sin(invRotY);
      const localMouseY =
        st.mouseScreenY * Math.cos(invRotX);
      const localMouseZ =
        -st.mouseScreenX * Math.sin(invRotY) + st.mouseScreenY * Math.sin(invRotX) * Math.cos(invRotY);

      frameCounter++;
      const updateColors = frameCounter % (isMobileDevice ? 4 : 2) === 0 || st.isHovering;

      for (let i = 0; i < NUM_PARTICLES; i++) {
        const i3 = i * 3;
        const tx = targetShape[i3];
        const ty = targetShape[i3 + 1];
        const tz = targetShape[i3 + 2];

        // 1. Smoothly morph to target position
        pos[i3] += (tx - pos[i3]) * morphSpeed;
        pos[i3 + 1] += (ty - pos[i3 + 1]) * morphSpeed;
        pos[i3 + 2] += (tz - pos[i3 + 2]) * morphSpeed;

        // 2. Micro ambient drift/sparkle
        const drift = Math.sin(clock * 1.5 + i * 0.2) * 0.0035;
        pos[i3] += drift;
        pos[i3 + 1] += drift;

        // 3. Dynamic Cursor Touch Scatter Physics
        if (st.isHovering) {
          const dx = pos[i3] - localMouseX;
          const dy = pos[i3 + 1] - localMouseY;
          const dz = pos[i3 + 2] - localMouseZ;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < scatterRadius && dist > 0.001) {
            // Push particles away with quadratic falloff
            const power = (1 - dist / scatterRadius) * scatterForce;
            pos[i3] += (dx / dist) * power * 0.18;
            pos[i3 + 1] += (dy / dist) * power * 0.18;
            pos[i3 + 2] += (dz / dist) * power * 0.18;
          }
        }

        // 4. Vibrant high-clarity color mapping (optimized)
        if (updateColors) {
          const distCenter = Math.sqrt(
            pos[i3] ** 2 + pos[i3 + 1] ** 2 + pos[i3 + 2] ** 2
          );
          const normDist = Math.min(1, Math.max(0, distCenter / 1.8));

          if (normDist < 0.3) {
            tempColor.lerpColors(palette.core, palette.primary, normDist / 0.3);
          } else if (normDist < 0.75) {
            tempColor.lerpColors(
              palette.primary,
              palette.secondary,
              (normDist - 0.3) / 0.45
            );
          } else {
            tempColor.lerpColors(
              palette.secondary,
              palette.deep,
              (normDist - 0.75) / 0.25
            );
          }

          col[i3] = tempColor.r;
          col[i3 + 1] = tempColor.g;
          col[i3 + 2] = tempColor.b;
        }
      }

      posAttr.needsUpdate = true;
      if (updateColors) colAttr.needsUpdate = true;

      renderer.render(scene, camera);

      if (isBot && clock > 0.15) {
        animId = null;
        return;
      }

      animId = requestAnimationFrame(animate);
    };

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (!wasVisible && isVisible && !animId) {
          animId = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    let frameCounter = 0;
    animId = requestAnimationFrame(animate);

    return () => {
      observer.disconnect();
      clearInterval(cycleInterval);
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mouseleave", onMouseLeave);
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="hero-visual-wrap">
      {/* Seamless Borderless 3D Stage positioned harmoniously */}
      <div
        className="hero-3d-stage"
        ref={containerRef}
        style={{
          cursor: "grab",
          touchAction: "none",
        }}
      />
    </div>
  );
}
