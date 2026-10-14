import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";

const NUM_PARTICLES = 4200;

// Morph target names and human-readable metadata
export const MORPH_MODES = [
  { id: "orb", label: "✦ ORB", title: "GENESIS // NEBULAR CORE", sub: "Organic AI Energy" },
  { id: "scorpio", label: "🦂 SCORPIO", title: "SCORPIO // CELESTIAL CONSTELLATION", sub: "Algorithmic Precision" },
  { id: "neural", label: "🧠 NEURAL", title: "CORTEX // SYNAPTIC NETWORK", sub: "GenAI & LLM Architectures" },
  { id: "quantum", label: "♾️ QUANTUM", title: "MOBIUS // DISTRIBUTED LOOP", sub: "Scalable Full-Stack Systems" },
];

// Helper to create a soft volumetric smoke particle texture
function createParticleTexture() {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.2, "rgba(255, 255, 255, 0.85)");
  gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.25)");
  gradient.addColorStop(0.85, "rgba(255, 255, 255, 0.05)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// 1. Generate Organic Nebular Sphere / Smoke Ball (MDX.so style)
function generateOrbPositions(count) {
  const arr = new Float32Array(count * 3);
  const phi = (1 + Math.sqrt(5)) / 2;

  for (let i = 0; i < count; i++) {
    // Golden ratio sphere distribution
    const yNorm = 1 - (i / (count - 1)) * 2;
    const rad = Math.sqrt(1 - yNorm * yNorm);
    const theta = 2 * Math.PI * i / phi;

    // Volumetric cloud layer: 30% dense core, 70% swirling outer mist
    const isCore = i < count * 0.3;
    const rBase = isCore
      ? 0.4 + Math.random() * 0.7
      : 1.45 + 0.35 * Math.sin(theta * 3 + yNorm * 4) + (Math.random() - 0.5) * 0.25;

    arr[i * 3] = Math.cos(theta) * rad * rBase;
    arr[i * 3 + 1] = yNorm * rBase * 1.05;
    arr[i * 3 + 2] = Math.sin(theta) * rad * rBase;
  }
  return arr;
}

// 2. Generate 3D Scorpio / Celestial Scorpion
function generateScorpioPositions(count) {
  const arr = new Float32Array(count * 3);

  // Allocate particle budget across anatomical parts
  const bodyCount = Math.floor(count * 0.22);
  const tailCount = Math.floor(count * 0.26);
  const clawCount = Math.floor(count * 0.26);
  const legCount = count - bodyCount - tailCount - clawCount;

  let idx = 0;

  // A. Carapace & Body (segmented oval with ridges)
  for (let i = 0; i < bodyCount; i++) {
    const t = i / bodyCount;
    const z = -0.4 + t * 1.1; // z from -0.4 to 0.7
    const taper = Math.sin(t * Math.PI);
    const w = (0.55 * taper + 0.15) * (0.85 + Math.random() * 0.3);
    const h = (0.35 * taper + 0.08) * (0.85 + Math.random() * 0.3);
    const angle = Math.random() * Math.PI * 2;

    arr[idx * 3] = Math.cos(angle) * w;
    arr[idx * 3 + 1] = -0.15 + Math.sin(angle) * h;
    arr[idx * 3 + 2] = z;
    idx++;
  }

  // B. Metasoma (Segmented tail arching up, back, and forward over body)
  for (let i = 0; i < tailCount; i++) {
    const t = i / tailCount;
    // Arch trajectory: C-curve from posterior (z = -0.4) arching high up (y = 1.9) and curling forward
    const archAngle = t * Math.PI * 1.28; // 0 to 230 degrees
    const spineZ = -0.4 - 1.1 * Math.sin(archAngle) + t * 0.3;
    const spineY = -0.1 + 1.25 * (1 - Math.cos(archAngle));

    // Stinger vesicle at the very tip
    const isStinger = t > 0.88;
    const thickness = isStinger ? 0.25 * (1.05 - t) * 6 : 0.22 * (1 - t * 0.45);
    const rad = thickness * (0.6 + Math.random() * 0.8);
    const ang = Math.random() * Math.PI * 2;

    let px = Math.cos(ang) * rad;
    let py = spineY + Math.sin(ang) * rad;
    let pz = spineZ;

    // Stinger sharp tip curve
    if (t > 0.95) {
      py -= (t - 0.95) * 4.0;
      pz += (t - 0.95) * 3.5;
    }

    arr[idx * 3] = px;
    arr[idx * 3 + 1] = py;
    arr[idx * 3 + 2] = pz;
    idx++;
  }

  // C. Chelae (Pincers / Claws)
  for (let i = 0; i < clawCount; i++) {
    const side = i % 2 === 0 ? 1 : -1;
    const t = (i / clawCount);

    if (t < 0.45) {
      // Pedipalp arms reaching forward-outward
      const armT = t / 0.45;
      const ax = side * (0.35 + armT * 0.95 + (Math.random() - 0.5) * 0.12);
      const ay = -0.1 + Math.sin(armT * Math.PI) * 0.2 + (Math.random() - 0.5) * 0.1;
      const az = 0.5 + armT * 0.85;

      arr[idx * 3] = ax;
      arr[idx * 3 + 1] = ay;
      arr[idx * 3 + 2] = az;
    } else {
      // Crescent pincer jaws (inner and outer blades)
      const jawT = (t - 0.45) / 0.55;
      const isMovable = i % 4 === 0 || i % 4 === 1;
      const curve = isMovable ? 0.35 * Math.sin(jawT * Math.PI) : -0.25 * Math.sin(jawT * Math.PI);
      const cx = side * (1.3 + curve * side) + (Math.random() - 0.5) * 0.12;
      const cy = -0.05 + (Math.random() - 0.5) * 0.15;
      const cz = 1.35 + jawT * 0.7;

      arr[idx * 3] = cx;
      arr[idx * 3 + 1] = cy;
      arr[idx * 3 + 2] = cz;
    }
    idx++;
  }

  // D. 8 Walking Legs
  const legPairs = 4;
  for (let i = 0; i < legCount; i++) {
    const side = i % 2 === 0 ? 1 : -1;
    const pairIdx = Math.floor((i / legCount) * legPairs);
    const t = ((i / legCount) * legPairs) % 1;

    const baseZ = 0.35 - pairIdx * 0.22;
    // Leg arch from body out and down
    const lx = side * (0.35 + t * 1.1 + (Math.random() - 0.5) * 0.1);
    const ly = -0.15 + Math.sin(t * Math.PI) * 0.45 - t * 0.65;
    const lz = baseZ + (pairIdx - 1.5) * 0.15 + (Math.random() - 0.5) * 0.08;

    arr[idx * 3] = lx;
    arr[idx * 3 + 1] = ly;
    arr[idx * 3 + 2] = lz;
    idx++;
  }

  return arr;
}

// 3. Generate 3D Neural Cortex / Brain Network
function generateNeuralPositions(count) {
  const arr = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const side = i % 2 === 0 ? 1 : -1;
    const u = Math.random() * Math.PI;
    const v = Math.random() * Math.PI * 2;

    // Brain sulcal folds and cortical fissures
    const fold = 0.18 * Math.sin(u * 8) * Math.cos(v * 6);
    const r = (1.25 + fold) * (0.85 + Math.random() * 0.28);

    // Two hemispheres separated by longitudinal fissure
    const x = side * (0.35 + Math.abs(Math.sin(u) * Math.cos(v)) * r * 0.85);
    const y = Math.cos(u) * r * 1.05;
    const z = Math.sin(u) * Math.sin(v) * r * 1.3;

    // Brainstem & spinal connection for 10% of particles
    if (i < count * 0.08) {
      const stemT = i / (count * 0.08);
      arr[i * 3] = (Math.random() - 0.5) * 0.25;
      arr[i * 3 + 1] = -1.0 - stemT * 0.6;
      arr[i * 3 + 2] = -0.2 + (Math.random() - 0.5) * 0.25;
    } else {
      arr[i * 3] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = z;
    }
  }
  return arr;
}

// 4. Generate 3D Quantum Mobius / Torus
function generateQuantumPositions(count) {
  const arr = new Float32Array(count * 3);
  const R = 1.45; // Major radius
  const r = 0.58; // Minor radius

  for (let i = 0; i < count; i++) {
    const u = (i / count) * Math.PI * 2 * 3; // 3 turns
    const v = (i / count) * Math.PI * 2;
    const jitter = (Math.random() - 0.5) * 0.18;

    const rCurr = r + jitter + 0.12 * Math.sin(u * 4);
    const x = (R + rCurr * Math.cos(v)) * Math.cos(u);
    const y = (R + rCurr * Math.cos(v)) * Math.sin(u);
    const z = rCurr * Math.sin(v) + 0.3 * Math.sin(u * 2);

    arr[i * 3] = x;
    arr[i * 3 + 1] = y * 0.85;
    arr[i * 3 + 2] = z;
  }
  return arr;
}

export default function HeroMorphVisual({ theme = "dark" }) {
  const containerRef = useRef(null);
  const [activeMode, setActiveMode] = useState("orb");
  const [isHovered, setIsHovered] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  // References for animation state
  const activeModeRef = useRef("orb");
  activeModeRef.current = activeMode;
  const themeRef = useRef(theme);
  themeRef.current = theme;

  // Track drag and mouse physics
  const physicsRef = useRef({
    mouseX: 0,
    mouseY: 0,
    targetRotX: 0.15,
    targetRotY: 0.35,
    currentRotX: 0.15,
    currentRotY: 0.35,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    rotStartX: 0,
    rotStartY: 0,
    shockwaveRadius: 0,
    shockwaveIntensity: 0,
    autoCycleTime: 0,
  });

  const handleModeChange = useCallback((modeId) => {
    setActiveMode(modeId);
    // Trigger fluid pulse when switching modes
    physicsRef.current.shockwaveRadius = 0.1;
    physicsRef.current.shockwaveIntensity = 1.6;
  }, []);

  // Scroll listener: smoothly morphs between states as user scrolls the portfolio
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight * 0.85;

      // Only trigger auto-scroll morphing if not actively interacting
      if (physicsRef.current.isDragging) return;

      if (scrollY < heroHeight * 0.4) {
        if (activeModeRef.current !== "orb") setActiveMode("orb");
      } else if (scrollY < heroHeight * 0.9) {
        if (activeModeRef.current !== "scorpio") setActiveMode("scorpio");
      } else if (scrollY < heroHeight * 1.5) {
        if (activeModeRef.current !== "neural") setActiveMode("neural");
      } else {
        if (activeModeRef.current !== "quantum") setActiveMode("quantum");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Three.js Mount & Animation Loop
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Pre-calculate target vertex positions
    const targets = {
      orb: generateOrbPositions(NUM_PARTICLES),
      scorpio: generateScorpioPositions(NUM_PARTICLES),
      neural: generateNeuralPositions(NUM_PARTICLES),
      quantum: generateQuantumPositions(NUM_PARTICLES),
    };

    // BufferGeometry setup
    const geometry = new THREE.BufferGeometry();
    const currentPositions = new Float32Array(targets.orb);
    const particleColors = new Float32Array(NUM_PARTICLES * 3);
    const particleScales = new Float32Array(NUM_PARTICLES);

    for (let i = 0; i < NUM_PARTICLES; i++) {
      particleScales[i] = 0.65 + Math.random() * 0.7;
    }

    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(currentPositions, 3)
    );
    geometry.setAttribute(
      "color",
      new THREE.BufferAttribute(particleColors, 3)
    );

    // Particle sprite texture with soft volumetric smoke falloff
    const particleTexture = createParticleTexture();

    // Points Material
    const material = new THREE.PointsMaterial({
      size: 0.16,
      map: particleTexture,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      opacity: 0.92,
    });

    const pointCloud = new THREE.Points(geometry, material);
    scene.add(pointCloud);

    // Ambient floating stardust core glow
    const coreGlowGeo = new THREE.SphereGeometry(0.55, 16, 16);
    const coreGlowMat = new THREE.MeshBasicMaterial({
      color: themeRef.current === "light" ? 0x0038ff : 0xff3b1d,
      transparent: true,
      opacity: 0.08,
      wireframe: true,
    });
    const coreGlowMesh = new THREE.Mesh(coreGlowGeo, coreGlowMat);
    scene.add(coreGlowMesh);

    // Theme color palettes
    const darkPalette = {
      primary: new THREE.Color(0xff3b1d), // Ember orange/red
      secondary: new THREE.Color(0xff7a45), // Warm peach glow
      core: new THREE.Color(0xfff7f2), // Incandescent core
      void: new THREE.Color(0x383848), // Ambient edge
    };

    const lightPalette = {
      primary: new THREE.Color(0x0038ff), // Electric cobalt blue
      secondary: new THREE.Color(0x3b82f6), // Azure sky blue
      core: new THREE.Color(0x001a70), // Deep blue core
      void: new THREE.Color(0x7590ff), // Lighter pearl mist
    };

    // Mouse & Touch Interaction Handlers
    const onMouseDown = (e) => {
      physicsRef.current.isDragging = true;
      physicsRef.current.dragStartX = e.clientX;
      physicsRef.current.dragStartY = e.clientY;
      physicsRef.current.rotStartX = physicsRef.current.targetRotY;
      physicsRef.current.rotStartY = physicsRef.current.targetRotX;
      setIsInteracting(true);
    };

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      physicsRef.current.mouseX = normX;
      physicsRef.current.mouseY = normY;

      if (physicsRef.current.isDragging) {
        const deltaX = e.clientX - physicsRef.current.dragStartX;
        const deltaY = e.clientY - physicsRef.current.dragStartY;
        physicsRef.current.targetRotY =
          physicsRef.current.rotStartX + deltaX * 0.008;
        physicsRef.current.targetRotX =
          physicsRef.current.rotStartY + deltaY * 0.008;
      }
    };

    const onMouseUp = () => {
      physicsRef.current.isDragging = false;
      setIsInteracting(false);
    };

    const onClick = () => {
      // Trigger fluid ripple shockwave
      physicsRef.current.shockwaveRadius = 0.05;
      physicsRef.current.shockwaveIntensity = 2.2;
    };

    // Touch support
    const onTouchStart = (e) => {
      if (!e.touches[0]) return;
      physicsRef.current.isDragging = true;
      physicsRef.current.dragStartX = e.touches[0].clientX;
      physicsRef.current.dragStartY = e.touches[0].clientY;
      physicsRef.current.rotStartX = physicsRef.current.targetRotY;
      physicsRef.current.rotStartY = physicsRef.current.targetRotX;
      setIsInteracting(true);
    };

    const onTouchMove = (e) => {
      if (!e.touches[0] || !physicsRef.current.isDragging) return;
      const deltaX = e.touches[0].clientX - physicsRef.current.dragStartX;
      const deltaY = e.touches[0].clientY - physicsRef.current.dragStartY;
      physicsRef.current.targetRotY =
        physicsRef.current.rotStartX + deltaX * 0.01;
      physicsRef.current.targetRotX =
        physicsRef.current.rotStartY + deltaY * 0.01;
    };

    const onTouchEnd = () => {
      physicsRef.current.isDragging = false;
      setIsInteracting(false);
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    container.addEventListener("click", onClick);
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    // Handle container resize
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

    // Animation Loop Variables
    let clock = 0;
    let animId;

    const animate = () => {
      clock += 0.025;
      const pState = physicsRef.current;
      const isLight = themeRef.current === "light";
      const palette = isLight ? lightPalette : darkPalette;

      // Smooth camera/object rotation with inertia & mouse parallax
      if (!pState.isDragging) {
        // Subtle constant celestial rotation
        pState.targetRotY += 0.0035;
        // Parallax influence from mouse
        const parallaxX = pState.mouseY * 0.25;
        const parallaxY = pState.mouseX * 0.35;
        pState.currentRotX +=
          (pState.targetRotX + parallaxX - pState.currentRotX) * 0.08;
        pState.currentRotY +=
          (pState.targetRotY + parallaxY - pState.currentRotY) * 0.08;
      } else {
        pState.currentRotX += (pState.targetRotX - pState.currentRotX) * 0.15;
        pState.currentRotY += (pState.targetRotY - pState.currentRotY) * 0.15;
      }

      pointCloud.rotation.x = pState.currentRotX;
      pointCloud.rotation.y = pState.currentRotY;
      coreGlowMesh.rotation.x = pState.currentRotX;
      coreGlowMesh.rotation.y = pState.currentRotY;

      // Update core glow material
      coreGlowMat.color = palette.primary;
      material.size = isLight ? 0.18 : 0.15;

      // Active target positions
      const currentMode = activeModeRef.current;
      const targetArr = targets[currentMode] || targets.orb;
      const posAttr = geometry.attributes.position;
      const colAttr = geometry.attributes.color;
      const posData = posAttr.array;
      const colData = colAttr.array;

      // Shockwave decay
      if (pState.shockwaveIntensity > 0.02) {
        pState.shockwaveRadius += 0.08;
        pState.shockwaveIntensity *= 0.93;
      }

      // Morph interpolation & fluid curl noise update
      const morphSpeed = 0.065;
      const tempColor = new THREE.Color();

      for (let i = 0; i < NUM_PARTICLES; i++) {
        const i3 = i * 3;
        const tx = targetArr[i3];
        const ty = targetArr[i3 + 1];
        const tz = targetArr[i3 + 2];

        // 1. Morph towards target position
        posData[i3] += (tx - posData[i3]) * morphSpeed;
        posData[i3 + 1] += (ty - posData[i3 + 1]) * morphSpeed;
        posData[i3 + 2] += (tz - posData[i3 + 2]) * morphSpeed;

        // 2. Micro smoke turbulence / organic breathing
        const noise =
          Math.sin(clock * 1.5 + i * 0.12) * 0.012 +
          Math.cos(clock * 2.0 + i * 0.08) * 0.008;
        posData[i3] += noise;
        posData[i3 + 1] += noise * 0.7;
        posData[i3 + 2] += noise;

        // 3. Fluid shockwave interaction
        if (pState.shockwaveIntensity > 0.02) {
          const dist = Math.sqrt(
            posData[i3] ** 2 + posData[i3 + 1] ** 2 + posData[i3 + 2] ** 2
          );
          const diff = dist - pState.shockwaveRadius;
          if (Math.abs(diff) < 0.6) {
            const force =
              (1 - Math.abs(diff) / 0.6) * pState.shockwaveIntensity * 0.15;
            posData[i3] += (posData[i3] / (dist || 1)) * force;
            posData[i3 + 1] += (posData[i3 + 1] / (dist || 1)) * force;
            posData[i3 + 2] += (posData[i3 + 2] / (dist || 1)) * force;
          }
        }

        // 4. Volumetric color mapping based on distance from core and height
        const distFromCenter = Math.sqrt(
          posData[i3] ** 2 + posData[i3 + 1] ** 2 + posData[i3 + 2] ** 2
        );
        const normDist = Math.min(1, Math.max(0, distFromCenter / 2.2));

        if (normDist < 0.35) {
          tempColor.lerpColors(palette.core, palette.primary, normDist / 0.35);
        } else if (normDist < 0.75) {
          tempColor.lerpColors(
            palette.primary,
            palette.secondary,
            (normDist - 0.35) / 0.4
          );
        } else {
          tempColor.lerpColors(
            palette.secondary,
            palette.void,
            (normDist - 0.75) / 0.25
          );
        }

        colData[i3] = tempColor.r;
        colData[i3 + 1] = tempColor.g;
        colData[i3 + 2] = tempColor.b;
      }

      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("click", onClick);
      container.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  const activeMeta =
    MORPH_MODES.find((m) => m.id === activeMode) || MORPH_MODES[0];

  return (
    <div className="hero-visual-wrap">
      {/* 3D Kinetic Canvas Stage */}
      <div
        className="hero-3d-stage"
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          cursor: isInteracting ? "grabbing" : "grab",
          touchAction: "none",
        }}
      >
        {/* Top Minimal HUD Readout */}
        <div
          style={{
            position: "absolute",
            top: "16px",
            left: "18px",
            right: "18px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "var(--font-mono)",
              fontSize: "10.5px",
              color: "var(--accent)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              background: "rgba(var(--bg-rgb, 10, 10, 12), 0.7)",
              backdropFilter: "blur(8px)",
              padding: "4px 10px",
              borderRadius: "999px",
              border: "1px solid var(--border)",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "var(--accent)",
                boxShadow: "0 0 8px var(--accent)",
                display: "inline-block",
                animation: "pulse 2s infinite ease-in-out",
              }}
            />
            <span>{activeMeta.title}</span>
          </div>

          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              color: "var(--fg-muted)",
              letterSpacing: "0.05em",
              background: "rgba(var(--bg-rgb, 10, 10, 12), 0.6)",
              backdropFilter: "blur(6px)",
              padding: "4px 8px",
              borderRadius: "6px",
              border: "1px solid var(--border)",
            }}
          >
            {NUM_PARTICLES.toLocaleString()} GPU MIST NODES
          </div>
        </div>

        {/* Floating Morph Pill Selector Dock */}
        <div
          style={{
            position: "absolute",
            bottom: "14px",
            left: "14px",
            right: "14px",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            alignItems: "center",
          }}
        >
          <div
            className="mode-pills"
            style={{
              width: "100%",
              maxWidth: "460px",
              background: "rgba(10, 10, 12, 0.75)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid var(--border-strong)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.35)",
            }}
          >
            {MORPH_MODES.map((mode) => (
              <button
                key={mode.id}
                type="button"
                className={`mode-pill-btn ${activeMode === mode.id ? "active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleModeChange(mode.id);
                }}
                style={{
                  flex: 1,
                  textAlign: "center",
                  cursor: "pointer",
                }}
                title={mode.title}
              >
                {mode.label}
              </button>
            ))}
          </div>

          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              color: isHovered ? "var(--fg)" : "var(--fg-muted)",
              letterSpacing: "0.06em",
              transition: "color 0.25s ease",
              textTransform: "uppercase",
            }}
          >
            {isHovered ? "DRAG TO ROTATE · CLICK TO DISPERSE · SCROLL TO MORPH" : activeMeta.sub}
          </div>
        </div>
      </div>
    </div>
  );
}
