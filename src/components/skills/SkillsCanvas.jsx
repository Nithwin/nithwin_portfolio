import React, { useEffect, useRef } from "react";

const SKILLS = [
  { name: "C++20", core: true },
  { name: "Go 1.26", core: true },
  { name: "Python", core: true },
  { name: "PyTorch", core: true },
  { name: "NumPy", core: true },
  { name: "GenAI / LLMs", core: true },
  { name: "CA-YOLOv8", core: true },
  { name: "OpenCV", core: true },
  { name: "TypeScript", core: false },
  { name: "React / Next.js", core: false },
  { name: "Node.js", core: false },
  { name: "FastAPI", core: false },
  { name: "PostgreSQL", core: false },
  { name: "Docker", core: false },
  { name: "Linux Kernel", core: true },
  { name: "TCP/IP Sockets", core: true },
  { name: "Redis", core: false },
  { name: "Lip Gloss TUI", core: false },
  { name: "Flutter / Dart", core: false },
];

export default function SkillsCanvas({ theme, isMobile }) {
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const canvas = document.getElementById("floating-skills-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let W = canvas.width;
    let H = canvas.height;

    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      const newW = Math.floor(rect.width) || 580;
      const newH = window.innerWidth <= 768 ? 300 : 340;
      canvas.width = newW;
      canvas.height = newH;
      W = newW;
      H = newH;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const isMob = window.innerWidth <= 768;
    const cols = isMob ? 3 : 4;
    const colW = W / cols;
    const pills = SKILLS.map((s, i) => ({
      name: s.name,
      core: s.core,
      x: colW * 0.5 + (i % cols) * colW + (Math.random() - 0.5) * 16,
      y: 35 + Math.floor(i / cols) * (isMob ? 42 : 52) + (Math.random() - 0.5) * 10,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
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
    const onCanvasTouchMove = (e) => {
      if (!e.touches[0]) return;
      const r = canvas.getBoundingClientRect();
      mx = (e.touches[0].clientX - r.left) * (W / r.width);
      my = (e.touches[0].clientY - r.top) * (H / r.height);
    };

    canvas.addEventListener("mousemove", onCanvasMouseMove);
    canvas.addEventListener("mouseleave", onCanvasMouseLeave);
    canvas.addEventListener("touchmove", onCanvasTouchMove, { passive: true });
    canvas.addEventListener("touchend", onCanvasMouseLeave, { passive: true });

    let rafId;
    function renderSkills() {
      const isL = themeRef.current === "light";
      ctx.fillStyle = isL ? "#F2ECE0" : "#0B0B0F";
      ctx.fillRect(0, 0, W, H);

      const fg = isL ? "#131316" : "#F4F3EF";
      const acc = isL ? "#0038FF" : "#FF3B1D";
      const border = isL ? "#DFD7C5" : "#262632";

      ctx.strokeStyle = isL
        ? "rgba(19,19,22,0.08)"
        : "rgba(244,243,239,0.09)";
      ctx.lineWidth = 1;
      for (let i = 0; i < pills.length; i++) {
        for (let j = i + 1; j < pills.length; j++) {
          const d = Math.hypot(pills[i].x - pills[j].x, pills[i].y - pills[j].y);
          if (d < (W < 450 ? 95 : 130)) {
            ctx.beginPath();
            ctx.moveTo(pills[i].x, pills[i].y);
            ctx.lineTo(pills[j].x, pills[j].y);
            ctx.stroke();
          }
        }
      }

      const isNarrow = W < 460;
      ctx.font = isNarrow ? "600 11px monospace" : "600 12px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (const p of pills) {
        p.x += p.vx;
        p.y += p.vy;

        const pad = isNarrow ? 16 : 22;
        const pw = ctx.measureText(p.name).width + pad;
        const ph = isNarrow ? 26 : 30;

        if (p.x < pw * 0.5 + 4 || p.x > W - pw * 0.5 - 4) p.vx *= -1;
        if (p.y < ph * 0.5 + 4 || p.y > H - ph * 0.5 - 4) p.vy *= -1;

        const dx = p.x - mx,
          dy = p.y - my;
        const dist = Math.hypot(dx, dy);
        if (dist < 90 && dist > 1) {
          p.x += (dx / dist) * 2.2;
          p.y += (dy / dist) * 2.2;
        }

        ctx.fillStyle = p.core ? acc : isL ? "#FBF9F1" : "#15151C";
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

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", onCanvasMouseMove);
      canvas.removeEventListener("mouseleave", onCanvasMouseLeave);
      canvas.removeEventListener("touchmove", onCanvasTouchMove);
      canvas.removeEventListener("touchend", onCanvasMouseLeave);
    };
  }, []);

  return (
    <div className="floating-skills-card">
      <div>
        <div className="eyebrow" style={{ marginBottom: "6px" }}>
          CORE TECHNOLOGIES
        </div>
        <h3 className="skills-bento-title">Skills &amp; Technologies in Motion</h3>
        <p className="work-desc" style={{ marginTop: "4px" }}>
          {isMobile
            ? "Tap or drag inside the arena to interact with floating skill nodes across C++, Go, GenAI, and Full-Stack systems."
            : "Move your cursor inside the arena to interact with floating skill nodes across C++, Go, GenAI, and Full-Stack systems."}
        </p>
      </div>
      <canvas
        id="floating-skills-canvas"
        width="580"
        height="340"
        data-cursor="REPEL / ORBIT"
      />
    </div>
  );
}
