import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { FaSun, FaMoon, FaBars, FaTimes, FaFileDownload } from "react-icons/fa";

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Publications", id: "publications" },
  { label: "Skills", id: "skills" },
  { label: "Profiles", id: "coding-profiles" },
  { label: "Contact", id: "contact" },
];

const Navigation = () => {
  const { isDark, toggleTheme } = useTheme();
  const [active, setActive] = useState("home");
  const [scrollPct, setScrollPct] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pillRef = useRef(null);
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  // Scroll progress + active section tracking
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(total > 0 ? (window.scrollY / total) * 100 : 0);

      const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
      let current = "home";
      for (const sec of sections) {
        if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lightning canvas on brand pill
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = 160;
    canvas.height = 44;

    const bolts = [];
    const spawnBolt = () => {
      bolts.push({
        x: 10 + Math.random() * 140,
        y: 0,
        life: 0,
        maxLife: 8 + Math.random() * 8,
        segments: generateBolt(10 + Math.random() * 140, 0, 10 + Math.random() * 140, 44),
      });
    };
    const generateBolt = (x1, y1, x2, y2) => {
      const pts = [{ x: x1, y: y1 }];
      const steps = 6 + Math.floor(Math.random() * 4);
      for (let i = 1; i < steps; i++) {
        const t = i / steps;
        pts.push({
          x: x1 + (x2 - x1) * t + (Math.random() - 0.5) * 18,
          y: y1 + (y2 - y1) * t,
        });
      }
      pts.push({ x: x2, y: y2 });
      return pts;
    };

    let frame = 0;
    const tick = () => {
      ctx.clearRect(0, 0, 160, 44);

      // Draw name text
      ctx.font = "700 12px 'JetBrains Mono', monospace";
      ctx.letterSpacing = "3px";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#F4F3EF";
      ctx.fillText("NITHWIN", 80, 22);

      // Spawn bolts
      if (frame % 18 === 0) spawnBolt();

      for (let i = bolts.length - 1; i >= 0; i--) {
        const b = bolts[i];
        b.life++;
        const alpha = 1 - b.life / b.maxLife;
        ctx.strokeStyle = `rgba(255, 120, 60, ${alpha * 0.8})`;
        ctx.lineWidth = 1;
        ctx.shadowColor = "#FF3B1D";
        ctx.shadowBlur = 6;
        ctx.beginPath();
        b.segments.forEach((p, j) => {
          j === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
        });
        ctx.stroke();
        ctx.shadowBlur = 0;
        if (b.life >= b.maxLife) bolts.splice(i, 1);
      }

      frame++;
      animRef.current = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 82, behavior: "smooth" });
    setDrawerOpen(false);
  };

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          {/* Logo */}
          <div>
            <div
              ref={pillRef}
              className="lightning-brand-pill"
              onClick={() => scrollTo("home")}
              style={{ cursor: "pointer" }}
            >
              <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1 }} />
            </div>
          </div>

          {/* Nav Links */}
          <nav className="nav-center">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                className={`nav-link${active === l.id ? " active" : ""}`}
                onClick={() => scrollTo(l.id)}
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* Right */}
          <div className="header-right">
            <button
              onClick={toggleTheme}
              className="pill-btn"
              title="Toggle theme"
            >
              {isDark ? <FaSun size={12} /> : <FaMoon size={12} />}
              {isDark ? "Light" : "Dark"}
            </button>
            <a href="./assets/resume.pdf" download className="pill-btn">
              <FaFileDownload size={11} />
              Resume
            </a>
            <button className="hamburger-btn" onClick={() => setDrawerOpen(true)}>
              <span className="ham-line" />
              <span className="ham-line" />
              <span className="ham-line" />
            </button>
          </div>
        </div>
        <div className="scroll-progress" style={{ width: `${scrollPct}%` }} />
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer${drawerOpen ? " open" : ""}`}>
        <button className="mobile-close-btn" onClick={() => setDrawerOpen(false)}>
          <FaTimes />
        </button>
        {NAV_LINKS.map((l) => (
          <button
            key={l.id}
            className={`nav-link${active === l.id ? " active" : ""}`}
            onClick={() => scrollTo(l.id)}
          >
            {l.label}
          </button>
        ))}
        <button onClick={toggleTheme} className="pill-btn" style={{ marginTop: 16 }}>
          {isDark ? <FaSun size={12} /> : <FaMoon size={12} />}
          {isDark ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </>
  );
};

export default Navigation;
