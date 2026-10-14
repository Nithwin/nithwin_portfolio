import React, { useEffect, useState, useRef } from "react";
import "./styles/globals.css";
import { HERO_ART } from "./data/heroArt";
import { PROJECTS } from "./data/projectsData";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [sliderIndex, setSliderIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [heroMode, setHeroMode] = useState("liquid");

  const darkImgSrc = useRef(HERO_ART.dark);
  const lightImgSrc = useRef(HERO_ART.light);
  const heroModeRef = useRef("liquid");
  heroModeRef.current = heroMode;
  const themeRef = useRef("dark");
  themeRef.current = theme;

  // Toggle Dark / Light Theme
  const handleToggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  /* ========================================================================
     1. CUSTOM MAGNETIC CURSOR
     ======================================================================== */
  useEffect(() => {
    const dot = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");
    const txt = document.getElementById("cursor-text");
    if (!dot || !ring || !txt) return;

    let mx = window.innerWidth / 2,
      my = window.innerHeight / 2,
      rx = mx,
      ry = my;
    let animId;

    const onMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + "px";
      dot.style.top = my + "px";

      const el = e.target.closest("[data-cursor]");
      if (el) {
        ring.classList.add("active");
        txt.textContent = el.getAttribute("data-cursor");
      } else {
        ring.classList.remove("active");
      }
    };

    const loop = () => {
      rx += (mx - rx) * 0.22;
      ry += (my - ry) * 0.22;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      animId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMouseMove);
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  /* ========================================================================
     2. CINEMATIC STORM CLOUD & LIGHTNING BREAK PRELOADER
     ======================================================================== */
  useEffect(() => {
    const pre = document.getElementById("storm-preloader");
    const canvas = document.getElementById("storm-canvas");
    const numEl = document.getElementById("preloader-num");
    const skipBtn = document.getElementById("skip-preloader");
    if (!pre || !canvas || !numEl || !skipBtn) return;

    const ctx = canvas.getContext("2d");
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    let closed = false;
    let progress = 0;
    let flashAlpha = 0.8;
    const bolts = [];
    let rafId;

    function spawnBolt() {
      const startX = canvas.width * (0.25 + Math.random() * 0.5);
      const pts = [{ x: startX, y: 0 }];
      let cx = startX,
        cy = 0;
      while (cy < canvas.height) {
        cx += (Math.random() - 0.5) * 95;
        cy += 28 + Math.random() * 42;
        pts.push({ x: cx, y: cy });
      }
      bolts.push({ pts, life: 1.0 });
      flashAlpha = 0.45;
    }
    spawnBolt();

    function finishPreloader() {
      if (closed) return;
      closed = true;
      numEl.textContent = "100%";
      pre.classList.add("done");
    }

    skipBtn.addEventListener("click", finishPreloader);

    const timer = setInterval(() => {
      progress += 20;
      if (Math.random() < 0.7) spawnBolt();
      if (progress >= 100) {
        progress = 100;
        clearInterval(timer);
        setTimeout(finishPreloader, 160);
      }
      numEl.textContent = String(progress).padStart(2, "0") + "%";
    }, 85);

    function renderStorm() {
      if (closed) return;
      const W = canvas.width,
        H = canvas.height;
      ctx.fillStyle = "#07070A";
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = "#111118";
      for (let i = 0; i < 6; i++) {
        const rx = (i / 5) * W;
        const ry = i % 2 === 0 ? H * 0.22 : H * 0.75;
        ctx.beginPath();
        ctx.arc(rx, ry, 220, 0, Math.PI * 2);
        ctx.fill();
      }

      if (flashAlpha > 0.01) {
        ctx.fillStyle = `rgba(255, 59, 29, ${flashAlpha * 0.18})`;
        ctx.fillRect(0, 0, W, H);
        flashAlpha *= 0.88;
      }

      for (let i = bolts.length - 1; i >= 0; i--) {
        const b = bolts[i];
        ctx.strokeStyle = `rgba(255, 59, 29, ${b.life})`;
        ctx.lineWidth = 4;
        ctx.beginPath();
        b.pts.forEach((p, idx) => {
          if (idx === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        ctx.stroke();

        ctx.strokeStyle = `rgba(255, 245, 238, ${b.life})`;
        ctx.lineWidth = 1.6;
        ctx.stroke();

        b.life *= 0.84;
        if (b.life < 0.05) bolts.splice(i, 1);
      }
      rafId = requestAnimationFrame(renderStorm);
    }
    rafId = requestAnimationFrame(renderStorm);

    return () => {
      clearInterval(timer);
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  /* ========================================================================
     3. HEADER "NITHWIN" PILL WITH LIVE ORANGE LIGHTNING ARCS
     ======================================================================== */
  useEffect(() => {
    const canvas = document.getElementById("logo-lightning-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width,
      H = canvas.height;
    let t = 0;
    let rafId;

    function drawElectricBolt(x1, y1, x2, y2, displace, col, width) {
      if (displace < 2) {
        ctx.strokeStyle = col;
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        return;
      }
      const mx = (x1 + x2) * 0.5 + (Math.random() - 0.5) * displace;
      const my = (y1 + y2) * 0.5 + (Math.random() - 0.5) * displace;
      drawElectricBolt(x1, y1, mx, my, displace * 0.5, col, width);
      drawElectricBolt(mx, my, x2, y2, displace * 0.5, col, width);
    }

    function renderLogo() {
      t += 1;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#0D0D12";
      ctx.fillRect(0, 0, W, H);

      ctx.save();
      ctx.font = "900 38px 'Inter', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.shadowColor = "#FF3B1D";
      ctx.shadowBlur = 14;
      ctx.fillStyle = "#FF3B1D";
      ctx.fillText("NITHWIN", W * 0.5, H * 0.54);

      ctx.shadowBlur = 0;
      ctx.strokeStyle = "#FFF5EE";
      ctx.lineWidth = 1.1;
      ctx.strokeText("NITHWIN", W * 0.5, H * 0.54);
      ctx.restore();

      if (t % 2 === 0) {
        const sx = 34 + Math.random() * 60;
        const ex = W - 34 - Math.random() * 60;
        drawElectricBolt(
          sx,
          22 + Math.random() * 24,
          ex,
          22 + Math.random() * 28,
          18,
          "#FF3B1D",
          2.2
        );
        drawElectricBolt(
          sx,
          24 + Math.random() * 22,
          ex,
          24 + Math.random() * 24,
          12,
          "#FFF7F2",
          1.1
        );
      }
      rafId = requestAnimationFrame(renderLogo);
    }
    rafId = requestAnimationFrame(renderLogo);

    return () => cancelAnimationFrame(rafId);
  }, []);

  /* ========================================================================
     4. UPGRADED 3D HERO SCULPTURE + 3D ROTATING QUANTUM CORE
     ======================================================================== */
  useEffect(() => {
    const canvas = document.getElementById("hero-canvas");
    const stage = document.getElementById("hero-stage");
    if (!canvas || !stage) return;
    const ctx = canvas.getContext("2d");

    const imgD = new Image();
    const imgL = new Image();
    imgD.src = darkImgSrc.current;
    imgL.src = lightImgSrc.current;

    const onDarkUpload = (e) => {
      const f = e.target.files[0];
      if (!f) return;
      const r = new FileReader();
      r.onload = (ev) => {
        imgD.src = ev.target.result;
        darkImgSrc.current = ev.target.result;
      };
      r.readAsDataURL(f);
    };
    const onLightUpload = (e) => {
      const f = e.target.files[0];
      if (!f) return;
      const r = new FileReader();
      r.onload = (ev) => {
        imgL.src = ev.target.result;
        lightImgSrc.current = ev.target.result;
      };
      r.readAsDataURL(f);
    };

    const darkInput = document.getElementById("upload-dark");
    const lightInput = document.getElementById("upload-light");
    if (darkInput) darkInput.addEventListener("change", onDarkUpload);
    if (lightInput) lightInput.addEventListener("change", onLightUpload);

    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0,
      ptrX = 0.5,
      ptrY = 0.45;
    const ripples = [{ y: 0.45, age: 0, amp: 16 }];

    const onStageMouseMove = (e) => {
      const rect = stage.getBoundingClientRect();
      ptrX = (e.clientX - rect.left) / rect.width;
      ptrY = (e.clientY - rect.top) / rect.height;
      tx = (ptrX - 0.5) * 22;
      ty = (ptrY - 0.5) * 16;
      if (Math.random() < 0.35) {
        ripples.push({ y: ptrY, age: 0, amp: 16 });
        if (ripples.length > 6) ripples.shift();
      }
    };
    const onStageMouseLeave = () => {
      tx = 0;
      ty = 0;
    };

    stage.addEventListener("mousemove", onStageMouseMove);
    stage.addEventListener("mouseleave", onStageMouseLeave);

    const phi = (1 + Math.sqrt(5)) / 2;
    const icoVerts = [
      [-1, phi, 0],
      [1, phi, 0],
      [-1, -phi, 0],
      [1, -phi, 0],
      [0, -1, phi],
      [0, 1, phi],
      [0, -1, -phi],
      [0, 1, -phi],
      [phi, 0, -1],
      [phi, 0, 1],
      [-phi, 0, -1],
      [-phi, 0, 1],
    ];
    const icoEdges = [];
    for (let i = 0; i < icoVerts.length; i++) {
      for (let j = i + 1; j < icoVerts.length; j++) {
        const d = Math.hypot(
          icoVerts[i][0] - icoVerts[j][0],
          icoVerts[i][1] - icoVerts[j][1],
          icoVerts[i][2] - icoVerts[j][2]
        );
        if (Math.abs(d - 2.0) < 0.1) icoEdges.push([i, j]);
      }
    }

    let t = 0;
    let rafId;

    function renderHero() {
      t += 0.035;
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;

      const W = canvas.width,
        H = canvas.height;
      const isL = themeRef.current === "light";
      const activeImg = isL ? imgL : imgD;
      const acc = isL ? "#0038FF" : "#FF3B1D";

      ctx.fillStyle = isL ? "#ECE8DF" : "#0C0C10";
      ctx.fillRect(0, 0, W, H);

      if (activeImg.complete && activeImg.naturalWidth > 0) {
        const slices = 54;
        const sh = H / slices;
        const srcH = activeImg.naturalHeight / slices;
        const curMode = heroModeRef.current;

        for (let i = 0; i < slices; i++) {
          const ny = i / slices;
          let dx = cx * (ny - 0.5) * 1.4;
          if (curMode === "liquid") {
            for (const r of ripples) {
              const d = ny - r.y;
              dx +=
                Math.sin(d * 26 - r.age * 0.3) *
                Math.exp(-Math.abs(d) * 6) *
                r.amp;
            }
            dx += Math.sin(ny * 8 + t) * 2.5;
          } else if (curMode === "lightning") {
            if (Math.abs(ny - ptrY) < 0.08) dx += (Math.random() - 0.5) * 18;
          } else {
            dx += (i % 2 === 0 ? 1 : -1) * Math.sin(t + i * 0.25) * 8;
          }
          ctx.drawImage(
            activeImg,
            0,
            i * srcH,
            activeImg.naturalWidth,
            srcH,
            dx,
            i * sh - cy * 0.4,
            W,
            sh + 0.8
          );
        }
      }

      const rotY = t * 0.45 + cx * 0.04;
      const rotX = t * 0.25 - cy * 0.04;
      const proj = icoVerts.map(([vx, vy, vz]) => {
        const x1 = vx * Math.cos(rotY) - vz * Math.sin(rotY);
        const z1 = vz * Math.cos(rotY) + vx * Math.sin(rotY);
        const y2 = vy * Math.cos(rotX) - z1 * Math.sin(rotX);
        const z2 = z1 * Math.cos(rotX) + vy * Math.sin(rotX);
        const s = 145;
        return { x: W * 0.5 + x1 * s, y: H * 0.43 + y2 * s, z: z2 };
      });

      ctx.strokeStyle = acc;
      ctx.lineWidth = 1.25;
      ctx.globalAlpha = 0.55;
      icoEdges.forEach(([a, b]) => {
        ctx.beginPath();
        ctx.moveTo(proj[a].x, proj[a].y);
        ctx.lineTo(proj[b].x, proj[b].y);
        ctx.stroke();
      });
      ctx.globalAlpha = 1.0;

      for (let i = ripples.length - 1; i >= 0; i--) {
        ripples[i].age += 1;
        ripples[i].amp *= 0.95;
        if (ripples[i].amp < 0.3) ripples.splice(i, 1);
      }
      rafId = requestAnimationFrame(renderHero);
    }
    rafId = requestAnimationFrame(renderHero);

    return () => {
      cancelAnimationFrame(rafId);
      stage.removeEventListener("mousemove", onStageMouseMove);
      stage.removeEventListener("mouseleave", onStageMouseLeave);
      if (darkInput) darkInput.removeEventListener("change", onDarkUpload);
      if (lightInput) lightInput.removeEventListener("change", onLightUpload);
    };
  }, []);

  /* ========================================================================
     5. ANIMATED SCROLLYTELLING "ABOUT ME" WORD ILLUMINATION
     ======================================================================== */
  useEffect(() => {
    const container = document.getElementById("scrolly-text-container");
    const scrollBar = document.getElementById("scroll-bar");
    if (!container || !scrollBar) return;

    const rawText =
      "I build software where performance meets intelligence. From writing custom C++20 slab allocators and raw Linux TCP/IP socket networks to architecting WindMist — a 1M-token Go AI CLI agent — and publishing Coordinate Attention computer vision research in IEEE Xplore, every system is crafted for zero race conditions and sub-millisecond precision.";
    const rawWords = rawText.trim().split(/\s+/);
    const highlightSet = new Set([
      "performance",
      "intelligence.",
      "C++20",
      "slab",
      "allocators",
      "WindMist",
      "1M-token",
      "Go",
      "AI",
      "CLI",
      "Coordinate",
      "Attention",
      "IEEE",
      "Xplore,",
      "zero",
      "race",
      "sub-millisecond",
    ]);

    container.innerHTML = rawWords
      .map((w) => {
        const isAcc = highlightSet.has(w);
        return `<span class="scrolly-word ${
          isAcc ? "accent-word" : ""
        }">${w}</span>`;
      })
      .join(" ");

    const wordSpans = container.querySelectorAll(".scrolly-word");

    function onScroll() {
      const maxS = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      scrollBar.style.width =
        ((window.scrollY / maxS) * 100).toFixed(1) + "%";

      const rect = container.getBoundingClientRect();
      const viewH = window.innerHeight;
      const prog = Math.min(
        1,
        Math.max(0, (viewH * 0.85 - rect.top) / (viewH * 0.65))
      );
      const litCount = Math.floor(prog * wordSpans.length);
      wordSpans.forEach((sp, idx) => {
        sp.classList.toggle("lit", idx <= litCount || prog > 0.92);
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    setTimeout(onScroll, 100);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ========================================================================
     6. PROJECTS CAROUSEL CANVASES
     ======================================================================== */
  useEffect(() => {
    const canvases = [];
    const elements = document.querySelectorAll(".project-canvas-item");

    elements.forEach((canvasEl) => {
      const pIdx = parseInt(canvasEl.getAttribute("data-proj-idx"), 10);
      const p = PROJECTS[pIdx];
      const st = { mx: 0.5, my: 0.5, e: 0.3, te: 0.3, t: pIdx * 1.3 };

      const card = canvasEl.closest(".work-card");
      if (card) {
        card.addEventListener("mousemove", (ev) => {
          const r = canvasEl.getBoundingClientRect();
          st.mx = (ev.clientX - r.left) / r.width;
          st.my = (ev.clientY - r.top) / r.height;
          st.te = 1.0;
        });
        card.addEventListener("mouseleave", () => {
          st.te = 0.3;
        });
      }
      canvases.push({ c: canvasEl, p, st });
    });

    let rafId;
    function renderCardCanvases() {
      const isL = themeRef.current === "light";
      const bg = isL ? "#E6E1D5" : "#0B0B0F";
      const fg = isL ? "#111113" : "#F4F3EF";
      const acc = isL ? "#0038FF" : "#FF3B1D";

      for (const { c, p, st } of canvases) {
        st.t += 0.04;
        st.e += (st.te - st.e) * 0.12;
        const ctx = c.getContext("2d");
        const W = c.width,
          H = c.height;
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, W, H);

        ctx.save();
        ctx.translate(
          W * 0.5 + (st.mx - 0.5) * 24,
          H * 0.5 + (st.my - 0.5) * 16
        );
        ctx.strokeStyle = acc;
        ctx.lineWidth = 2.2;
        const wv = Math.sin(st.t * 2) * 8 * st.e;

        if (p.shape === 0) {
          for (let r = 24; r <= 88; r += 20) {
            ctx.beginPath();
            ctx.arc(0, 0, r + wv * 0.4, 0, Math.PI * 2);
            ctx.stroke();
          }
        } else if (p.shape === 1) {
          for (let i = -2; i <= 2; i++) {
            ctx.strokeRect(
              i * 40 - 13,
              -46 + Math.sin(st.t + i) * 9 * st.e,
              26,
              92
            );
          }
        } else if (p.shape === 2) {
          for (let l = -1; l <= 1; l++) {
            ctx.beginPath();
            for (let x = -140; x <= 140; x += 10) {
              const y =
                l * 26 +
                Math.sin(x * 0.04 + st.t * 2.5 + l) * (8 + st.e * 12);
              if (x === -140) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            ctx.stroke();
          }
        } else {
          ctx.strokeRect(-86 - wv, -52 - wv, 172 + wv * 2, 104 + wv * 2);
          ctx.strokeStyle = fg;
          ctx.beginPath();
          ctx.arc(0, 0, 24, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();
      }
      rafId = requestAnimationFrame(renderCardCanvases);
    }
    rafId = requestAnimationFrame(renderCardCanvases);

    return () => cancelAnimationFrame(rafId);
  }, [sliderIndex, isExpanded]);

  /* ========================================================================
     7. 3D NEURAL NETWORK TRAINING VISUALIZER
     ======================================================================== */
  useEffect(() => {
    const canvas = document.getElementById("nn-3d-canvas");
    const epochEl = document.getElementById("nn-epoch");
    const lossEl = document.getElementById("nn-loss");
    const accEl = document.getElementById("nn-acc");
    const burstBtn = document.getElementById("burst-train-btn");
    if (!canvas || !epochEl || !lossEl || !accEl || !burstBtn) return;
    const ctx = canvas.getContext("2d");

    const layerSizes = [5, 8, 8, 4];
    const layerX = [-2.2, -0.75, 0.75, 2.2];
    const nodes = [];
    const layers = [];

    layerSizes.forEach((count, lIdx) => {
      const layerNodes = [];
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const radius = lIdx === 0 || lIdx === 3 ? 0.75 : 1.15;
        const node = {
          layer: lIdx,
          x: layerX[lIdx],
          y: Math.sin(angle) * radius,
          z: Math.cos(angle) * radius,
          act: Math.random(),
        };
        nodes.push(node);
        layerNodes.push(node);
      }
      layers.push(layerNodes);
    });

    const edges = [];
    for (let l = 0; l < layers.length - 1; l++) {
      for (const a of layers[l]) {
        for (const b of layers[l + 1]) {
          if (Math.random() < 0.65) {
            edges.push({ a, b, weight: 0.3 + Math.random() * 0.7 });
          }
        }
      }
    }

    const pulses = [];
    function spawnPulse(isBackprop = false) {
      const e = edges[Math.floor(Math.random() * edges.length)];
      pulses.push({
        edge: e,
        t: 0,
        speed: 0.025 + Math.random() * 0.025,
        backprop: isBackprop,
      });
    }
    for (let i = 0; i < 28; i++) spawnPulse(i % 3 === 0);

    let epoch = 142;
    let loss = 0.0148;
    let acc = 98.4;
    let speedBoost = 1.0;

    const onBurstClick = () => {
      speedBoost = 2.8;
      for (let i = 0; i < 35; i++) spawnPulse(i % 2 === 0);
      epoch += 12;
      loss = Math.max(0.0042, loss * 0.88);
      acc = Math.min(99.6, acc + 0.15);
      epochEl.textContent = "Epoch " + epoch;
      lossEl.textContent = loss.toFixed(4);
      accEl.textContent = acc.toFixed(1) + "%";
    };
    burstBtn.addEventListener("click", onBurstClick);

    let rotY = 0.28,
      rotX = 0.18;
    const onCanvasMouseMove = (e) => {
      const r = canvas.getBoundingClientRect();
      rotY = ((e.clientX - r.left) / r.width - 0.5) * 0.9;
      rotX = ((e.clientY - r.top) / r.height - 0.5) * 0.6;
    };
    canvas.addEventListener("mousemove", onCanvasMouseMove);

    function project3D(x, y, z, W, H) {
      const cy = Math.cos(rotY),
        sy = Math.sin(rotY);
      const x1 = x * cy - z * sy,
        z1 = z * cy + x * sy;
      const cx = Math.cos(rotX),
        sx = Math.sin(rotX);
      const y2 = y * cx - z1 * sx,
        z2 = z1 * cx + y * sx;
      const scale = 285 / (4.8 + z2);
      return { x: W * 0.5 + x1 * scale, y: H * 0.5 + y2 * scale, s: scale };
    }

    let frame = 0;
    let rafId;
    function renderNN() {
      frame++;
      speedBoost += (1.0 - speedBoost) * 0.04;
      if (frame % 4 === 0 && pulses.length < 40)
        spawnPulse(Math.random() < 0.35);

      const W = canvas.width,
        H = canvas.height;
      const isL = themeRef.current === "light";
      ctx.fillStyle = isL ? "#ECE8DF" : "#0B0B0F";
      ctx.fillRect(0, 0, W, H);

      const fg = isL ? "#111113" : "#F4F3EF";
      const accColor = isL ? "#0038FF" : "#FF3B1D";
      const synColor = isL
        ? "rgba(17,17,19,0.13)"
        : "rgba(244,243,239,0.12)";

      ctx.strokeStyle = synColor;
      ctx.lineWidth = 1;
      for (const e of edges) {
        const pa = project3D(e.a.x, e.a.y, e.a.z, W, H);
        const pb = project3D(e.b.x, e.b.y, e.b.z, W, H);
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.stroke();
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.t += p.speed * speedBoost;
        if (p.t >= 1) {
          p.edge.b.act = 1.0;
          pulses.splice(i, 1);
          continue;
        }
        const u = p.backprop ? 1 - p.t : p.t;
        const px = p.edge.a.x + (p.edge.b.x - p.edge.a.x) * u;
        const py = p.edge.a.y + (p.edge.b.y - p.edge.a.y) * u;
        const pz = p.edge.a.z + (p.edge.b.z - p.edge.a.z) * u;
        const pt = project3D(px, py, pz, W, H);

        ctx.fillStyle = p.backprop ? fg : accColor;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, p.backprop ? 3.2 : 4.2, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const n of nodes) {
        n.act *= 0.96;
        const pt = project3D(n.x, n.y, n.z, W, H);
        const r = 5.5 + n.act * 4.5;
        ctx.fillStyle = n.act > 0.35 ? accColor : fg;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = fg;
      ctx.font = "600 11px monospace";
      ctx.fillText("INPUT TENSOR", 28, H - 18);
      ctx.fillText("COORDINATE ATTENTION (CA)", W * 0.32, H - 18);
      ctx.fillText("LLM TRANSFORMER BLOCKS", W * 0.6, H - 18);
      ctx.fillText("OUTPUT", W - 78, H - 18);

      rafId = requestAnimationFrame(renderNN);
    }
    rafId = requestAnimationFrame(renderNN);

    return () => {
      cancelAnimationFrame(rafId);
      burstBtn.removeEventListener("click", onBurstClick);
      canvas.removeEventListener("mousemove", onCanvasMouseMove);
    };
  }, []);

  /* ========================================================================
     8. FLOATING SKILLS CONSTELLATION & GITHUB HEATMAP
     ======================================================================== */
  useEffect(() => {
    const canvas = document.getElementById("floating-skills-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const SKILLS = [
      { name: "C++20", core: true },
      { name: "Go 1.26", core: true },
      { name: "GenAI / LLMs", core: true },
      { name: "Python", core: true },
      { name: "CA-YOLOv8", core: true },
      { name: "TypeScript", core: false },
      { name: "React / Next.js", core: false },
      { name: "Node.js", core: false },
      { name: "PostgreSQL", core: false },
      { name: "Docker", core: false },
      { name: "Linux Kernel", core: true },
      { name: "TCP/IP Sockets", core: true },
      { name: "Lip Gloss TUI", core: false },
      { name: "Flutter / Dart", core: false },
    ];

    const W = canvas.width,
      H = canvas.height;
    const pills = SKILLS.map((s, i) => ({
      name: s.name,
      core: s.core,
      x: 75 + (i % 4) * 128 + (Math.random() - 0.5) * 20,
      y: 52 + Math.floor(i / 4) * 72 + (Math.random() - 0.5) * 16,
      vx: (Math.random() - 0.5) * 0.9,
      vy: (Math.random() - 0.5) * 0.9,
    }));

    let mx = -999,
      my = -999;
    const onCanvasMouseMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mx = (e.clientX - r.left) * (W / r.width);
      my = (e.clientY - r.top) * (H / r.height);
    };
    const onCanvasMouseLeave = () => {
      mx = -999;
      my = -999;
    };
    canvas.addEventListener("mousemove", onCanvasMouseMove);
    canvas.addEventListener("mouseleave", onCanvasMouseLeave);

    let rafId;
    function renderSkills() {
      const isL = themeRef.current === "light";
      ctx.fillStyle = isL ? "#ECE8DF" : "#0B0B0F";
      ctx.fillRect(0, 0, W, H);

      const fg = isL ? "#111113" : "#F4F3EF";
      const acc = isL ? "#0038FF" : "#FF3B1D";
      const border = isL ? "#C8C1B4" : "#262632";

      ctx.strokeStyle = isL
        ? "rgba(17,17,19,0.09)"
        : "rgba(244,243,239,0.09)";
      ctx.lineWidth = 1;
      for (let i = 0; i < pills.length; i++) {
        for (let j = i + 1; j < pills.length; j++) {
          const d = Math.hypot(pills[i].x - pills[j].x, pills[i].y - pills[j].y);
          if (d < 135) {
            ctx.beginPath();
            ctx.moveTo(pills[i].x, pills[i].y);
            ctx.lineTo(pills[j].x, pills[j].y);
            ctx.stroke();
          }
        }
      }

      ctx.font = "600 12px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (const p of pills) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 58 || p.x > W - 58) p.vx *= -1;
        if (p.y < 28 || p.y > H - 28) p.vy *= -1;

        const dx = p.x - mx,
          dy = p.y - my;
        const dist = Math.hypot(dx, dy);
        if (dist < 110 && dist > 1) {
          p.x += (dx / dist) * 2.2;
          p.y += (dy / dist) * 2.2;
        }

        const pw = ctx.measureText(p.name).width + 24;
        const ph = 30;
        ctx.fillStyle = p.core ? acc : isL ? "#F4F1EA" : "#15151C";
        ctx.strokeStyle = p.core ? acc : border;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.roundRect(p.x - pw * 0.5, p.y - ph * 0.5, pw, ph, 999);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = p.core ? "#FFFFFF" : fg;
        ctx.fillText(p.name, p.x, p.y + 1);
      }
      rafId = requestAnimationFrame(renderSkills);
    }
    rafId = requestAnimationFrame(renderSkills);

    // Heatmap generator
    const hm = document.getElementById("github-heatmap");
    if (hm && hm.children.length === 0) {
      for (let i = 0; i < 26 * 5; i++) {
        const cell = document.createElement("div");
        const r = (i * 17 + 11) % 10;
        cell.className =
          "heat-cell" +
          (r > 7 ? " l3" : r > 4 ? " l2" : r > 2 ? " l1" : "");
        hm.appendChild(cell);
      }
    }

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener("mousemove", onCanvasMouseMove);
      canvas.removeEventListener("mouseleave", onCanvasMouseLeave);
    };
  }, []);

  // Escape key for Case Study Modal
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setActiveModalProject(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      {/* Custom Magnetic Cursor */}
      <div id="cursor-dot"></div>
      <div id="cursor-ring">
        <span id="cursor-text">EXPLORE</span>
      </div>

      {/* ========================================================================
           1. CINEMATIC STORM CLOUD & LIGHTNING BREAK PRELOADER
           ======================================================================== */}
      <div id="storm-preloader">
        <canvas id="storm-canvas"></canvas>
        <div className="preloader-ui">
          <span>NITHWIN V M // EDITION 01 // KINETIC EDITORIAL</span>
          <button
            id="skip-preloader"
            className="pill-btn"
            data-cursor="ENTER"
            style={{
              background: "#121218",
              color: "#F4F3EF",
              borderColor: "#FF3B1D",
            }}
          >
            SKIP STORM INTRO →
          </button>
        </div>
        <div className="preloader-center-box">
          <div>
            <div className="eyebrow" style={{ color: "#FF3B1D" }}>
              ENTERING NEURAL STORM FIELD
            </div>
            <div
              style={{
                fontSize: "clamp(24px, 3vw, 40px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
              }}
            >
              Initializing 3D Shaders &amp; Lightning Core
            </div>
          </div>
          <div className="preloader-counter" id="preloader-num">
            00%
          </div>
        </div>
        <div className="preloader-ui">
          <span>DARK &amp; LIGHT THEME READY</span>
          <span>60 FPS WEBGL // ZERO GRADIENTS</span>
        </div>
      </div>

      {/* ========================================================================
           2. STICKY HEADER WITH ORANGE LIGHTNING "NITHWIN" PILL BADGE
           ======================================================================== */}
      <header className="site-header">
        <div className="header-inner">
          <a href="#top" className="lightning-brand-pill" data-cursor="LIGHTNING">
            <canvas
              id="logo-lightning-canvas"
              width="368"
              height="92"
            ></canvas>
          </a>

          <nav className="nav-center" aria-label="Primary Navigation">
            <a href="#top" className="nav-link active" data-cursor="HOME">
              Home
            </a>
            <a href="#about" className="nav-link" data-cursor="STORY">
              About Story
            </a>
            <a href="#work" className="nav-link" data-cursor="PROJECTS">
              Projects
            </a>
            <a href="#neural-lab" className="nav-link" data-cursor="3D AI">
              3D Neural Lab
            </a>
            <a href="#skills" className="nav-link" data-cursor="SKILLS">
              Skills &amp; GitHub
            </a>
            <a href="#footer" className="nav-link" data-cursor="CONTACT">
              Contact
            </a>
          </nav>

          <div className="header-right">
            <button
              id="theme-toggle"
              onClick={handleToggleTheme}
              className="pill-btn"
              data-cursor="THEME"
            >
              <span id="theme-icon">{theme === "dark" ? "☀" : "☾"}</span>
              <span id="theme-label">
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </span>
            </button>
          </div>
        </div>
        <div className="scroll-bar" id="scroll-bar"></div>
      </header>

      <main className="container" id="top">
        {/* ======================================================================
             3. UPGRADED 3D HERO SECTION
             ====================================================================== */}
        <section className="hero-section">
          <div className="hero-grid">
            <div>
              <span className="eyebrow">
                AI / ML · LLM &amp; GENAI · C++20 SYSTEMS · GO BACKEND
              </span>
              <h1 className="hero-headline">
                Engineering <span className="accent-text">GenAI</span> &amp; C++
                Realities.
              </h1>
              <p className="hero-subtitle">
                I'm <strong>Nithwin V M</strong> — engineering{" "}
                <strong>1M-token Go AI CLI agents (WindMist)</strong>,{" "}
                <strong>C++20 kernel memory allocators</strong>, distributed log
                brokers, and{" "}
                <strong>IEEE-published computer vision</strong>.
              </p>

              <div className="cta-row">
                <a href="#work" className="btn-primary" data-cursor="PROJECTS">
                  <span>Explore Selected Works</span>
                  <span>→</span>
                </a>
                <a
                  href="#neural-lab"
                  className="btn-secondary"
                  data-cursor="3D TRAINER"
                >
                  <span>3D Neural Network Lab</span>
                </a>
              </div>

              <div className="hero-metrics">
                <div>
                  <div className="stat-num">800+</div>
                  <div className="stat-label">LeetCode Solved</div>
                </div>
                <div>
                  <div className="stat-num">158+</div>
                  <div className="stat-label">GitHub Repos</div>
                </div>
                <div>
                  <div className="stat-num">IEEE</div>
                  <div className="stat-label">CA-YOLOv8 Author</div>
                </div>
                <div>
                  <div className="stat-num">400+</div>
                  <div className="stat-label">Platform Users</div>
                </div>
              </div>
            </div>

            {/* Upgraded 3D Dual-Theme Sculpture + Interactive 3D Neural Gyro */}
            <div className="hero-visual-wrap">
              <div
                className="hero-3d-stage"
                id="hero-stage"
                data-cursor="3D INTERACT"
              >
                <canvas id="hero-canvas" width="720" height="800"></canvas>
              </div>

              <div className="hero-controls-bar">
                <div className="mode-pills" role="group">
                  <button
                    className={`mode-pill-btn ${
                      heroMode === "liquid" ? "active" : ""
                    }`}
                    onClick={() => setHeroMode("liquid")}
                    data-cursor="LIQUID"
                  >
                    Liquid + 3D Core
                  </button>
                  <button
                    className={`mode-pill-btn ${
                      heroMode === "lightning" ? "active" : ""
                    }`}
                    onClick={() => setHeroMode("lightning")}
                    data-cursor="STORM"
                  >
                    Electric Arc
                  </button>
                  <button
                    className={`mode-pill-btn ${
                      heroMode === "slicer" ? "active" : ""
                    }`}
                    onClick={() => setHeroMode("slicer")}
                    data-cursor="SLICER"
                  >
                    3D Slicer
                  </button>
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  <label
                    className="pill-btn"
                    style={{ padding: "6px 12px", fontSize: "10px" }}
                    data-cursor="UPLOAD DARK"
                  >
                    Dark Img
                    <input
                      type="file"
                      id="upload-dark"
                      accept="image/*"
                      style={{ display: "none" }}
                    />
                  </label>
                  <label
                    className="pill-btn"
                    style={{ padding: "6px 12px", fontSize: "10px" }}
                    data-cursor="UPLOAD LIGHT"
                  >
                    Light Img
                    <input
                      type="file"
                      id="upload-light"
                      accept="image/*"
                      style={{ display: "none" }}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================================
             4. ANIMATED SCROLLYTELLING "ABOUT ME" SECTION
             ====================================================================== */}
        <section className="section-block" id="about">
          <div className="section-header-row">
            <div>
              <span className="eyebrow">01 // ABOUT ME · SCROLLYTELLING</span>
              <h2 className="section-title">The Engineering Narrative</h2>
            </div>
            <p className="section-subtitle">
              Scroll down to illuminate the story — bridging low-level C++20
              systems rigor with frontier Generative AI and LLM orchestration.
            </p>
          </div>

          <div className="about-scrolly-grid">
            <div className="scrolly-manifesto" id="scrolly-text-container">
              I build software where performance meets intelligence. From
              writing custom C++20 slab allocators and raw Linux TCP/IP socket
              networks to architecting WindMist — a 1M-token Go AI CLI agent —
              and publishing Coordinate Attention computer vision research in
              IEEE Xplore, every system is crafted for zero race conditions and
              sub-millisecond precision.
            </div>

            <div className="about-milestones">
              <div className="milestone-card">
                <div className="milestone-kicker">
                  PILLAR 01 // GENAI, LLMS &amp; AGENT LOOPS
                </div>
                <div className="milestone-title">
                  WindMist CLI &amp; 14 Published Agent Skills
                </div>
                <p className="milestone-desc">
                  Built a modular Go 1.26 AI software engineer in the terminal
                  supporting 1,048,576-token Gemini 2.5 context windows and
                  atomic AST file patching in &lt;1.5ms.
                </p>
              </div>
              <div className="milestone-card">
                <div className="milestone-kicker">
                  PILLAR 02 // C++20 &amp; DISTRIBUTED BACKENDS
                </div>
                <div className="milestone-title">
                  Kernel-Lab, Mini-Kafka &amp; DB-Crusher
                </div>
                <p className="milestone-desc">
                  Engineered 64-byte cache-aligned memory arenas, OS process
                  schedulers, append-only distributed message brokers, and
                  high-concurrency database stress testers.
                </p>
              </div>
              <div className="milestone-card">
                <div className="milestone-kicker">
                  PILLAR 03 // PEER-REVIEWED AI RESEARCH
                </div>
                <div className="milestone-title">
                  IEEE Xplore Author (CA-YOLOv8 · 0.58 EER)
                </div>
                <p className="milestone-desc">
                  Published novel Coordinate Attention enhancements for YOLOv8,
                  validated across 800 real-world student ID cards with 2.1% FAR
                  security precision.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================================
             5. COMPACT HORIZONTAL PROJECTS SLIDER (2 VISIBLE + ARROWS + VIEW MORE)
             ====================================================================== */}
        <section className="section-block" id="work">
          <div className="section-header-row">
            <div>
              <span className="eyebrow">02 // SELECTED WORKS</span>
              <h2 className="section-title">Flagship Projects</h2>
            </div>

            <div className="slider-controls">
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  color: "var(--fg-muted)",
                  marginRight: "8px",
                }}
                id="slider-counter"
              >
                {isExpanded
                  ? "SHOWING ALL 06 PROJECTS"
                  : `SHOWING 0${sliderIndex + 1}–0${Math.min(
                      6,
                      sliderIndex + 2
                    )} OF 06`}
              </span>
              <button
                className="arrow-btn"
                onClick={() => {
                  setIsExpanded(false);
                  setSliderIndex((prev) => (prev - 1 + 5) % 5);
                }}
                data-cursor="PREV"
                aria-label="Previous Projects"
              >
                ←
              </button>
              <button
                className="arrow-btn"
                onClick={() => {
                  setIsExpanded(false);
                  setSliderIndex((prev) => (prev + 1) % 5);
                }}
                data-cursor="NEXT"
                aria-label="Next Projects"
              >
                →
              </button>
              <button
                className="pill-btn"
                onClick={() => setIsExpanded((prev) => !prev)}
                data-cursor="EXPAND"
                style={{ marginLeft: "8px" }}
              >
                {isExpanded
                  ? "Compact Slider (Show 2) ↑"
                  : "View More (All 6) ↓"}
              </button>
            </div>
          </div>

          <div className="projects-viewport">
            <div
              className={`projects-track ${isExpanded ? "expanded-grid" : ""}`}
              style={{
                transform: isExpanded
                  ? "none"
                  : `translate3d(calc(-${sliderIndex * 50}% - ${
                      sliderIndex * 16
                    }px), 0, 0)`,
              }}
            >
              {PROJECTS.map((p, idx) => (
                <article
                  key={idx}
                  className="work-card"
                  data-cursor="CASE STUDY"
                  onClick={() => setActiveModalProject(p)}
                >
                  <div className="work-visual">
                    <canvas
                      className="work-canvas project-canvas-item"
                      data-proj-idx={idx}
                      width="520"
                      height="300"
                    ></canvas>
                  </div>
                  <div className="work-meta-row">
                    <h3 className="work-title">
                      0{idx + 1}. {p.title}
                    </h3>
                    <span className="work-cat">{p.cat}</span>
                  </div>
                  <p className="work-desc">{p.desc}</p>
                  <div className="tag-row">
                    {p.tags.map((t, tIdx) => (
                      <span key={tIdx} className="tag-pill">
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ======================================================================
             6. 3D NEURAL NETWORK TRAINING VISUALIZER SECTION
             ====================================================================== */}
        <section className="section-block" id="neural-lab">
          <div className="section-header-row">
            <div>
              <span className="eyebrow">
                03 // LIVE 3D DEEP LEARNING SIMULATION
              </span>
              <h2 className="section-title">
                3D Neural Network Training Lab
              </h2>
            </div>
            <p className="section-subtitle">
              Interactive 3D visualization of forward-pass tensor activations
              and backward-propagation gradients across a 4-layer Coordinate
              Attention &amp; LLM architecture.
            </p>
          </div>

          <div className="nn-studio-card">
            <canvas
              id="nn-3d-canvas"
              width="760"
              height="400"
              data-cursor="DRAG / PULSE 3D"
            ></canvas>

            <div className="nn-telemetry-panel">
              <div>
                <div className="eyebrow" style={{ marginBottom: "6px" }}>
                  LIVE TRAINING TELEMETRY
                </div>
                <h3
                  style={{
                    fontSize: "22px",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                  }}
                >
                  CA-YOLOv8 &amp; Transformer Backprop
                </h3>
                <p className="work-desc" style={{ marginTop: "6px" }}>
                  Orange pulses represent forward feature activations; bright
                  white pulses trace backpropagation gradient updates across 3D
                  synaptic weights.
                </p>
              </div>

              <div className="nn-metrics-grid">
                <div className="nn-stat-box">
                  <div className="nn-stat-val" id="nn-epoch">
                    Epoch 142
                  </div>
                  <div className="nn-stat-lbl">Training Cycle</div>
                </div>
                <div className="nn-stat-box">
                  <div className="nn-stat-val" id="nn-loss">
                    0.0148
                  </div>
                  <div className="nn-stat-lbl">Cross-Entropy Loss</div>
                </div>
                <div className="nn-stat-box">
                  <div className="nn-stat-val" id="nn-acc">
                    98.4%
                  </div>
                  <div className="nn-stat-lbl">Validation mAP@50</div>
                </div>
                <div className="nn-stat-box">
                  <div className="nn-stat-val">0.58 EER</div>
                  <div className="nn-stat-lbl">IEEE Benchmark</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <button
                  className="btn-primary"
                  id="burst-train-btn"
                  data-cursor="TRAIN BURST"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  <span>⚡ Trigger High-Velocity Training Burst</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================================
             7. FLOATING / MOVING SKILLS CONSTELLATION & GITHUB STATS BENTO
             ====================================================================== */}
        <section
          className="section-block"
          id="skills"
          style={{ borderBottom: "none" }}
        >
          <div className="section-header-row">
            <div>
              <span className="eyebrow">
                04 // TECH STACK &amp; CODING TELEMETRY
              </span>
              <h2 className="section-title">
                Floating Skills &amp; GitHub Stats
              </h2>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <a
                href="https://github.com/Nithwin"
                target="_blank"
                rel="noopener noreferrer"
                className="pill-btn"
                data-cursor="GITHUB"
              >
                GitHub @Nithwin ↗
              </a>
              <a
                href="https://ieeexplore.ieee.org/iel8/11502027/11502031/11502277.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="pill-btn"
                data-cursor="IEEE"
              >
                IEEE Xplore Paper ↗
              </a>
            </div>
          </div>

          <div className="skills-and-github-grid">
            <div className="floating-skills-card">
              <div>
                <div className="eyebrow" style={{ marginBottom: "6px" }}>
                  INTERACTIVE PHYSICS CONSTELLATION
                </div>
                <h3 style={{ fontSize: "22px", fontWeight: 800 }}>
                  Skills &amp; Technologies in Motion
                </h3>
                <p className="work-desc" style={{ marginTop: "4px" }}>
                  Move your cursor inside the arena to interact with floating
                  skill nodes across C++, Go, GenAI, and Full-Stack systems.
                </p>
              </div>
              <canvas
                id="floating-skills-canvas"
                width="580"
                height="320"
                data-cursor="REPEL / ORBIT"
              ></canvas>
            </div>

            <div className="github-stats-card">
              <div>
                <div className="eyebrow" style={{ marginBottom: "6px" }}>
                  VERIFIED DEVELOPER PROFILES
                </div>
                <h3 style={{ fontSize: "22px", fontWeight: 800 }}>
                  GitHub (@Nithwin) &amp; LeetCode (@vmnithwin)
                </h3>
              </div>

              <div className="nn-metrics-grid">
                <div className="nn-stat-box">
                  <div className="nn-stat-val">800+</div>
                  <div className="nn-stat-lbl">LeetCode Problems Solved</div>
                </div>
                <div className="nn-stat-box">
                  <div className="nn-stat-val">158+</div>
                  <div className="nn-stat-lbl">Public GitHub Repositories</div>
                </div>
                <div className="nn-stat-box">
                  <div className="nn-stat-val">14</div>
                  <div className="nn-stat-lbl">Published Agent Skills</div>
                </div>
                <div className="nn-stat-box">
                  <div className="nn-stat-val">Go &amp; C++</div>
                  <div className="nn-stat-lbl">Primary Systems Stack</div>
                </div>
              </div>

              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    color: "var(--fg-muted)",
                    marginBottom: "8px",
                  }}
                >
                  <span>CONTRIBUTION ACTIVITY MATRIX</span>
                  <span style={{ color: "var(--accent)" }}>
                    ACTIVE OPEN-SOURCE MAINTAINER
                  </span>
                </div>
                <div className="heatmap-grid" id="github-heatmap"></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ========================================================================
           8. MONUMENTAL AWWWARDS-GRADE FOOTER
           ======================================================================== */}
      <footer className="monumental-footer" id="footer">
        <div className="container">
          <div className="footer-cta-banner">
            <div>
              <span className="eyebrow">05 // INITIATE COLLABORATION</span>
              <h2
                style={{
                  fontSize: "clamp(32px, 4.2vw, 58px)",
                  fontWeight: 850,
                  letterSpacing: "-0.04em",
                  lineHeight: 1.02,
                }}
              >
                Ready to Ship Next-Gen
                <br />
                AI &amp; Systems Architecture?
              </h2>
            </div>
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <a
                href="mailto:vmnithwin@gmail.com"
                className="btn-primary"
                data-cursor="EMAIL ME"
              >
                <span>vmnithwin@gmail.com</span>
                <span>↗</span>
              </a>
              <a
                href="https://github.com/Nithwin"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                data-cursor="GITHUB"
              >
                <span>GitHub Profile ↗</span>
              </a>
            </div>
          </div>

          <div className="footer-columns">
            <div>
              <div className="footer-col-title">NITHWIN V M</div>
              <p className="work-desc" style={{ maxWidth: "34ch" }}>
                Full Stack, C++20 Systems &amp; Generative AI Engineer based in
                India. Crafting high-concurrency backends, LLM CLI agents, and
                award-winning digital experiences.
              </p>
            </div>

            <div>
              <div className="footer-col-title">NAVIGATION</div>
              <div className="footer-link-list">
                <a href="#top">01 // Home &amp; 3D Hero</a>
                <a href="#about">02 // Scrollytelling About</a>
                <a href="#work">03 // Selected Projects</a>
                <a href="#neural-lab">04 // 3D Neural Network Lab</a>
                <a href="#skills">05 // Skills &amp; GitHub Stats</a>
              </div>
            </div>

            <div>
              <div className="footer-col-title">FLAGSHIP SYSTEMS</div>
              <div className="footer-link-list">
                <a
                  href="https://windmist.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WindMist v1.0.1 (Go AI CLI) ↗
                </a>
                <a
                  href="https://github.com/Nithwin"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Kernel-Lab (C++20 OS Lab) ↗
                </a>
                <a
                  href="https://github.com/Nithwin"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Mini-Kafka (Log Broker) ↗
                </a>
                <a
                  href="https://ieeexplore.ieee.org/iel8/11502027/11502031/11502277.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CA-YOLOv8 (IEEE Xplore) ↗
                </a>
                <a
                  href="https://skills.rest/company/nithwin"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ShadowCoders &amp; 14 Skills ↗
                </a>
              </div>
            </div>

            <div>
              <div className="footer-col-title">PROFILES &amp; STATUS</div>
              <div className="footer-link-list">
                <a
                  href="https://github.com/Nithwin"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub: @Nithwin ↗
                </a>
                <a
                  href="https://medium.com/@vmnithwin/introducing-windmist-an-open-source-ai-coding-assistant-for-the-terminal-12165232f3f3"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Medium: @vmnithwin ↗
                </a>
                <a
                  href="https://nithwin.site/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Web: nithwin.site ↗
                </a>
                <span
                  style={{
                    color: "var(--accent)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "12px",
                    marginTop: "4px",
                  }}
                >
                  ● Open to SDE &amp; AI Roles
                </span>
              </div>
            </div>
          </div>

          <div className="footer-giant-wordmark" data-cursor="NITHWIN V M">
            NITHWIN<span>.</span>SITE
          </div>

          <div className="footer-bottom-bar">
            <span>© 2026 NITHWIN V M. ALL RIGHTS RESERVED.</span>
            <span>INDIA (IST) // ZERO-GRADIENT ARCHITECTURAL EDITION</span>
            <a href="#top" className="pill-btn" data-cursor="TOP">
              BACK TO TOP ↑
            </a>
          </div>
        </div>
      </footer>

      {/* Case Study Modal */}
      {activeModalProject && (
        <div id="case-modal" className="open" role="dialog" aria-modal="true">
          <div className="case-dialog">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <span className="eyebrow" style={{ marginBottom: 0 }}>
                {activeModalProject.cat}
              </span>
              <button
                className="pill-btn"
                onClick={() => setActiveModalProject(null)}
                data-cursor="CLOSE"
              >
                CLOSE [ESC] ✕
              </button>
            </div>
            <h2
              style={{
                fontSize: "clamp(24px, 2.8vw, 34px)",
                fontWeight: 800,
                marginBottom: "10px",
              }}
            >
              {activeModalProject.title}
            </h2>
            <p className="work-desc" style={{ marginBottom: "16px" }}>
              {activeModalProject.desc}
            </p>
            <div className="tag-row" style={{ marginBottom: "16px" }}>
              {activeModalProject.tags.map((t, idx) => (
                <span key={idx} className="tag-pill">
                  {t}
                </span>
              ))}
            </div>
            <div className="case-code">{activeModalProject.code}</div>
            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                marginTop: "20px",
              }}
            >
              <a
                href={activeModalProject.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Launch Live / Paper ↗
              </a>
              <a
                href={activeModalProject.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                GitHub Source ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}