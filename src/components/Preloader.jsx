import React, { useEffect, useRef } from "react";

export default function Preloader({ theme }) {
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const pre = document.getElementById("storm-preloader");
    const canvas = document.getElementById("storm-canvas");
    const numEl = document.getElementById("preloader-num");
    const barFill = document.getElementById("preloader-bar-fill");
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
    const sparks = [];
    let rafId;

    // Multi-branching fractal lightning generator
    function spawnBolt() {
      const startX = canvas.width * (0.2 + Math.random() * 0.6);

      function createBranch(x1, y1, angle, length, depth) {
        const pts = [{ x: x1, y: y1 }];
        let cx = x1,
          cy = y1;
        const steps = Math.max(5, Math.floor(length / 28));

        for (let i = 0; i < steps; i++) {
          const stepLen = length / steps;
          angle += (Math.random() - 0.5) * 0.85;
          cx += Math.sin(angle) * stepLen + (Math.random() - 0.5) * 16;
          cy += Math.cos(angle) * stepLen;
          pts.push({ x: cx, y: cy });

          // Fork secondary branch
          if (depth < 2 && Math.random() < 0.28 && i > 1 && i < steps - 1) {
            const forkAngle =
              angle + (Math.random() < 0.5 ? -1 : 1) * (0.45 + Math.random() * 0.35);
            createBranch(
              cx,
              cy,
              forkAngle,
              length * (0.35 + Math.random() * 0.3),
              depth + 1
            );
          }

          // Emit hot plasma sparks at lightning kinks
          if (Math.random() < 0.22) {
            sparks.push({
              x: cx,
              y: cy,
              vx: (Math.random() - 0.5) * 5,
              vy: (Math.random() - 0.5) * 4 - 0.5,
              life: 1.0,
              decay: 0.025 + Math.random() * 0.035,
              size: 1.5 + Math.random() * 2,
            });
          }
        }
        bolts.push({ pts, life: 1.0, width: depth === 0 ? 3.6 : 1.8 });
      }

      createBranch(startX, 0, (Math.random() - 0.5) * 0.2, canvas.height, 0);
      flashAlpha = 0.6;
    }
    spawnBolt();

    function finishPreloader() {
      if (closed) return;
      closed = true;
      numEl.textContent = "100%";
      if (barFill) barFill.style.width = "100%";
      pre.classList.add("done");
      setTimeout(() => {
        if (pre) pre.style.display = "none";
      }, 850);
    }

    skipBtn.addEventListener("click", finishPreloader);

    const onKey = (e) => {
      if (e.key === "Escape") finishPreloader();
    };
    window.addEventListener("keydown", onKey);

    const timer = setInterval(() => {
      progress += Math.floor(Math.random() * 4) + 2; // Increments by 2-5%
      if (Math.random() < 0.38) spawnBolt();

      if (progress >= 100) {
        progress = 100;
        clearInterval(timer);
        numEl.textContent = "100%";
        if (barFill) barFill.style.width = "100%";
        spawnBolt();
        setTimeout(finishPreloader, 320);
      } else {
        numEl.textContent = String(progress).padStart(2, "0") + "%";
        if (barFill) barFill.style.width = progress + "%";
      }
    }, 55);

    function renderStorm() {
      if (closed) return;
      const W = canvas.width,
        H = canvas.height;

      // Theme-adaptive colors
      const isL = themeRef.current === "light";
      const accentRgb = isL ? "0, 56, 255" : "255, 59, 29";
      const coreRgb = isL ? "255, 255, 255" : "255, 247, 242";
      const sparkRgb = isL ? "60, 140, 255" : "255, 140, 60";

      // Deep void backdrop
      ctx.fillStyle = "#07070A";
      ctx.fillRect(0, 0, W, H);

      // Clean architectural hairline grid
      const gridSize = 80;
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.02 + flashAlpha * 0.04})`;
      ctx.lineWidth = 0.75;
      ctx.beginPath();
      for (let x = 0; x < W; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
      }
      for (let y = 0; y < H; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
      }
      ctx.stroke();

      // Theme-tinted atmospheric storm flash
      if (flashAlpha > 0.01) {
        ctx.fillStyle = `rgba(${accentRgb}, ${flashAlpha * 0.22})`;
        ctx.fillRect(0, 0, W, H);
        flashAlpha *= 0.88;
      }

      // Render branching lightning bolts
      for (let i = bolts.length - 1; i >= 0; i--) {
        const b = bolts[i];
        if (b.pts.length < 2) {
          bolts.splice(i, 1);
          continue;
        }

        // Broad energetic glow sheath
        ctx.strokeStyle = `rgba(${accentRgb}, ${b.life * 0.95})`;
        ctx.lineWidth = b.width * 1.6;
        ctx.beginPath();
        b.pts.forEach((p, idx) => {
          if (idx === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        ctx.stroke();

        // Intense hot white core filament
        ctx.strokeStyle = `rgba(${coreRgb}, ${b.life})`;
        ctx.lineWidth = Math.max(1, b.width * 0.45);
        ctx.stroke();

        b.life *= 0.86;
        if (b.life < 0.04) bolts.splice(i, 1);
      }

      // Render drifting plasma sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.06;
        s.life -= s.decay;
        if (s.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        ctx.fillStyle = `rgba(${sparkRgb}, ${s.life})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(renderStorm);
    }
    rafId = requestAnimationFrame(renderStorm);

    return () => {
      clearInterval(timer);
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div id="storm-preloader" data-preloader-theme={theme}>
      <div className="shutter-panel shutter-top"></div>
      <div className="shutter-panel shutter-bottom"></div>
      <canvas id="storm-canvas"></canvas>

      <div className="preloader-ui preloader-top">
        <div className="preloader-brand">
          <span className="preloader-title">NITHWIN V M</span>
        </div>
        <button
          id="skip-preloader"
          className="preloader-skip-pill"
          aria-label="Skip storm intro"
        >
          SKIP [ESC] →
        </button>
      </div>

      <div className="preloader-center-box">
        <div className="preloader-headline-wrap">
          <h2 className="preloader-main-title">
            Engineering <span className="preloader-accent">Kinetic</span> Realities.
          </h2>
          <div className="preloader-bar-wrap">
            <div className="preloader-bar-track">
              <div className="preloader-bar-fill" id="preloader-bar-fill"></div>
            </div>
          </div>
        </div>

        <div className="preloader-counter-wrap">
          <div className="preloader-counter" id="preloader-num">
            00%
          </div>
        </div>
      </div>

      <div className="preloader-ui preloader-bottom">
        <span>PORTFOLIO</span>
        <span>2026</span>
      </div>
    </div>
  );
}
