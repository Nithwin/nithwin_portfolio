import React, { useEffect, useRef } from "react";
import { FaGithub } from "react-icons/fa";
import { HERO_ART } from "../data/heroArt";

export default function Hero({ theme }) {
  const darkImgSrc = useRef(HERO_ART.dark);
  const lightImgSrc = useRef(HERO_ART.light);
  const heroModeRef = useRef("liquid");
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const canvas = document.getElementById("hero-canvas");
    const stage = document.getElementById("hero-stage");
    if (!canvas || !stage) return;
    const ctx = canvas.getContext("2d");

    const imgD = new Image();
    const imgL = new Image();
    imgD.src = darkImgSrc.current;
    imgL.src = lightImgSrc.current;

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
    const onStageTouchMove = (e) => {
      if (!e.touches[0]) return;
      const rect = stage.getBoundingClientRect();
      ptrX = (e.touches[0].clientX - rect.left) / rect.width;
      ptrY = (e.touches[0].clientY - rect.top) / rect.height;
      tx = (ptrX - 0.5) * 22;
      ty = (ptrY - 0.5) * 16;
      if (Math.random() < 0.4) {
        ripples.push({ y: ptrY, age: 0, amp: 16 });
        if (ripples.length > 6) ripples.shift();
      }
    };

    function resizeCanvas() {
      const rect = stage.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    stage.addEventListener("mousemove", onStageMouseMove);
    stage.addEventListener("mouseleave", onStageMouseLeave);
    stage.addEventListener("touchmove", onStageTouchMove, { passive: true });
    stage.addEventListener("touchend", onStageMouseLeave, { passive: true });

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
      if (!W || !H) {
        rafId = requestAnimationFrame(renderHero);
        return;
      }
      const isL = themeRef.current === "light";
      const activeImg = isL ? imgL : imgD;
      const acc = isL ? "#0038FF" : "#FF3B1D";
      const scaleRef = W / 720;

      ctx.fillStyle = isL ? "#F2ECE0" : "#0C0C10";
      ctx.fillRect(0, 0, W, H);

      if (activeImg.complete && activeImg.naturalWidth > 0) {
        const slices = 54;
        const sh = H / slices;
        const srcH = activeImg.naturalHeight / slices;
        const curMode = heroModeRef.current;

        for (let i = 0; i < slices; i++) {
          const ny = i / slices;
          let dx = cx * (ny - 0.5) * 1.4 * scaleRef;
          if (curMode === "liquid") {
            for (const r of ripples) {
              const d = ny - r.y;
              dx +=
                Math.sin(d * 26 - r.age * 0.3) *
                Math.exp(-Math.abs(d) * 6) *
                r.amp * scaleRef;
            }
            dx += Math.sin(ny * 8 + t) * 2.5 * scaleRef;
          } else if (curMode === "lightning") {
            if (Math.abs(ny - ptrY) < 0.08) dx += (Math.random() - 0.5) * 18 * scaleRef;
          } else {
            dx += (i % 2 === 0 ? 1 : -1) * Math.sin(t + i * 0.25) * 8 * scaleRef;
          }
          ctx.drawImage(
            activeImg,
            0,
            i * srcH,
            activeImg.naturalWidth,
            srcH,
            dx,
            i * sh - cy * 0.4 * (H / 800),
            W,
            sh + 0.8
          );
        }
      }

      const rotY = t * 0.45 + cx * 0.04;
      const rotX = t * 0.25 - cy * 0.04;
      const s = Math.min(W, H) * 0.185;
      const proj = icoVerts.map(([vx, vy, vz]) => {
        const x1 = vx * Math.cos(rotY) - vz * Math.sin(rotY);
        const z1 = vz * Math.cos(rotY) + vx * Math.sin(rotY);
        const y2 = vy * Math.cos(rotX) - z1 * Math.sin(rotX);
        const z2 = z1 * Math.cos(rotX) + vy * Math.sin(rotX);
        return { x: W * 0.5 + x1 * s, y: H * 0.43 + y2 * s, z: z2 };
      });

      ctx.strokeStyle = acc;
      ctx.lineWidth = Math.max(1, 1.25 * scaleRef);
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
      window.removeEventListener("resize", resizeCanvas);
      stage.removeEventListener("mousemove", onStageMouseMove);
      stage.removeEventListener("mouseleave", onStageMouseLeave);
      stage.removeEventListener("touchmove", onStageTouchMove);
      stage.removeEventListener("touchend", onStageMouseLeave);
    };
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-grid">
        <div>
          <div className="eyebrow hero-eyebrow">
            NITHWIN V M · FULL STACK &amp; GENAI
          </div>
          <h1 className="hero-headline">
            Building <span className="accent-text">intelligent software</span> &amp;{" "}
            <span className="accent-text">scalable web</span> systems.
          </h1>
          <p className="hero-subtitle">
            I'm a software engineer crafting high-performance web platforms and
            GenAI tools, bridging algorithmic depth with clean, intuitive user experiences.
          </p>

          <div className="cta-row">
            <a href="#work" className="btn-primary" data-cursor="PROJECTS">
              <span>Explore Selected Works</span>
              <span>→</span>
            </a>
            <a
              href="https://github.com/Nithwin"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              data-cursor="GITHUB"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              <FaGithub size={16} />
              <span>GitHub Profile ↗</span>
            </a>
          </div>
        </div>

        {/* Interactive 3D Kinetic Sculpture */}
        <div className="hero-visual-wrap">
          <div
            className="hero-3d-stage"
            id="hero-stage"
            data-cursor="3D INTERACT"
          >
            <canvas id="hero-canvas"></canvas>
          </div>
        </div>
      </div>
    </section>
  );
}
