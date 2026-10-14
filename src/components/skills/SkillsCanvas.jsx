import React, { useEffect, useRef } from "react";
import {
  SiCplusplus,
  SiGo,
  SiPython,
  SiPytorch,
  SiNumpy,
  SiOpencv,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiFastapi,
  SiPostgresql,
  SiDocker,
  SiLinux,
  SiRedis,
  SiFlutter,
  SiOpenai,
} from "react-icons/si";
import { FaTerminal } from "react-icons/fa";
import { TbEye, TbNetwork } from "react-icons/tb";

const SKILLS = [
  { id: "cpp", name: "C++20", category: "Systems & Memory", icon: SiCplusplus, color: "#00599C", core: true },
  { id: "go", name: "Go 1.26", category: "High Concurrency CLI", icon: SiGo, color: "#00ADD8", core: true },
  { id: "python", name: "Python", category: "Core AI & Scripting", icon: SiPython, color: "#3776AB", core: true },
  { id: "pytorch", name: "PyTorch", category: "Deep Learning", icon: SiPytorch, color: "#EE4C2C", core: true },
  { id: "genai", name: "GenAI / LLMs", category: "Agentic Workflows", icon: SiOpenai, color: "#10A37F", core: true },
  { id: "yolo", name: "CA-YOLOv8", category: "Neural Vision (IEEE)", icon: TbEye, color: "#FF6F00", core: true },
  { id: "linux", name: "Linux Kernel", category: "OS & Systems", icon: SiLinux, color: "#FCC624", core: true },
  { id: "tcp", name: "TCP/IP Sockets", category: "Network Protocols", icon: TbNetwork, color: "#00D26A", core: true },
  { id: "opencv", name: "OpenCV", category: "Computer Vision", icon: SiOpencv, color: "#5C3EE8", core: true },
  { id: "numpy", name: "NumPy", category: "Vectorized Math", icon: SiNumpy, color: "#4DABCF", core: true },
  { id: "docker", name: "Docker", category: "Containers & DevOps", icon: SiDocker, color: "#2496ED", core: false },
  { id: "postgres", name: "PostgreSQL", category: "Relational DB", icon: SiPostgresql, color: "#4169E1", core: false },
  { id: "redis", name: "Redis", category: "In-Memory Cache", icon: SiRedis, color: "#DC382D", core: false },
  { id: "fastapi", name: "FastAPI", category: "Async Python APIs", icon: SiFastapi, color: "#05998B", core: false },
  { id: "ts", name: "TypeScript", category: "Type-Safe Frontend", icon: SiTypescript, color: "#3178C6", core: false },
  { id: "react", name: "React", category: "UI Architecture", icon: SiReact, color: "#61DAFB", core: false },
  { id: "next", name: "Next.js", category: "Full-Stack Web", icon: SiNextdotjs, color: "#9E9E9E", core: false },
  { id: "node", name: "Node.js", category: "Backend Runtime", icon: SiNodedotjs, color: "#5FA04E", core: false },
  { id: "tui", name: "Lip Gloss TUI", category: "Terminal Styling", icon: FaTerminal, color: "#FF79C6", core: false },
  { id: "flutter", name: "Flutter", category: "Cross-Platform UI", icon: SiFlutter, color: "#02569B", core: false },
];

export default function SkillsCanvas({ theme, isMobile }) {
  const themeRef = useRef(theme);
  themeRef.current = theme;

  const arenaRef = useRef(null);
  const canvasRef = useRef(null);
  const orbRefs = useRef([]);

  useEffect(() => {
    const arena = arenaRef.current;
    const canvas = canvasRef.current;
    if (!arena || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let arenaW = arena.clientWidth || 580;
    let arenaH = arena.clientHeight || (window.innerWidth <= 768 ? 300 : 340);

    function resizeArena() {
      if (!arena || !canvas) return;
      const rect = arena.getBoundingClientRect();
      arenaW = Math.floor(rect.width) || 580;
      arenaH = window.innerWidth <= 768 ? 300 : 340;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(arenaW * dpr);
      canvas.height = Math.floor(arenaH * dpr);
      canvas.style.width = `${arenaW}px`;
      canvas.style.height = `${arenaH}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resizeArena();
    window.addEventListener("resize", resizeArena);

    // Initialize node physics state with organic distribution
    const isMob = window.innerWidth <= 768;
    const cols = isMob ? 4 : 5;
    const rows = Math.ceil(SKILLS.length / cols);
    const slotW = arenaW / cols;
    const slotH = arenaH / rows;

    const nodes = SKILLS.map((s, i) => {
      const isCore = s.core;
      const size = isCore ? (isMob ? 44 : 50) : (isMob ? 38 : 42);
      const radius = size / 2;
      const col = i % cols;
      const row = Math.floor(i / cols);

      const initialX =
        col * slotW + (slotW - size) * 0.5 + (Math.random() - 0.5) * 14;
      const initialY =
        row * slotH + (slotH - size) * 0.5 + (Math.random() - 0.5) * 10;

      return {
        ...s,
        size,
        radius,
        x: Math.max(8, Math.min(arenaW - size - 8, initialX)),
        y: Math.max(8, Math.min(arenaH - size - 8, initialY)),
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        phase: i * 1.37 + Math.random(),
      };
    });

    let mx = -999;
    let my = -999;

    const onMouseMove = (e) => {
      const rect = arena.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mx = -999;
      my = -999;
    };

    const onTouchMove = (e) => {
      if (!e.touches[0]) return;
      const rect = arena.getBoundingClientRect();
      mx = e.touches[0].clientX - rect.left;
      my = e.touches[0].clientY - rect.top;
    };

    arena.addEventListener("mousemove", onMouseMove);
    arena.addEventListener("mouseleave", onMouseLeave);
    arena.addEventListener("touchmove", onTouchMove, { passive: true });
    arena.addEventListener("touchend", onMouseLeave, { passive: true });

    let rafId;
    let time = 0;

    function physicsLoop() {
      time += 0.008;
      ctx.clearRect(0, 0, arenaW, arenaH);
      const isLight = themeRef.current === "light";

      // 1. Constellation connection lines
      const maxConnectDist = isMob ? 95 : 120;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const c1x = n1.x + n1.radius;
          const c1y = n1.y + n1.radius;
          const c2x = n2.x + n2.radius;
          const c2y = n2.y + n2.radius;
          const d = Math.hypot(c1x - c2x, c1y - c2y);

          if (d < maxConnectDist) {
            const alpha = (1 - d / maxConnectDist) * (isLight ? 0.20 : 0.25);
            ctx.strokeStyle = isLight
              ? `rgba(19, 19, 22, ${alpha})`
              : `rgba(244, 243, 239, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(c1x, c1y);
            ctx.lineTo(c2x, c2y);
            ctx.stroke();
          }
        }
      }

      // 2. Orb-to-orb gentle spacing (prevents clumping, maintains medium separation)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const c1x = n1.x + n1.radius;
          const c1y = n1.y + n1.radius;
          const c2x = n2.x + n2.radius;
          const c2y = n2.y + n2.radius;
          const dx = c2x - c1x;
          const dy = c2y - c1y;
          const dist = Math.hypot(dx, dy);
          const minDist = n1.radius + n2.radius + 8;

          if (dist < minDist && dist > 0.05) {
            const overlap = (minDist - dist) / minDist;
            const repForce = overlap * 0.18;
            const nx = dx / dist;
            const ny = dy / dist;
            n1.vx -= nx * repForce;
            n1.vy -= ny * repForce;
            n2.vx += nx * repForce;
            n2.vy += ny * repForce;
          }
        }
      }

      // 3. Cursor repulsion & medium-speed physics integration
      const repelDist = isMob ? 85 : 105;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (mx > -100 && my > -100) {
          const cx = node.x + node.radius;
          const cy = node.y + node.radius;
          const dx = cx - mx;
          const dy = cy - my;
          const dist = Math.hypot(dx, dy);

          if (dist < repelDist && dist > 0.1) {
            const force = (repelDist - dist) / repelDist;
            node.vx += (dx / dist) * force * 0.75;
            node.vy += (dy / dist) * force * 0.75;
          }
        }

        // Gentle harmonic wander at medium speed
        const wanderX = Math.sin(time * 0.5 + node.phase) * 0.05;
        const wanderY = Math.cos(time * 0.55 + node.phase * 1.2) * 0.05;

        node.vx = node.vx * 0.95 + wanderX;
        node.vy = node.vy * 0.95 + wanderY;

        // Controlled speed cap (medium floating tempo)
        const currentSpeed = Math.hypot(node.vx, node.vy);
        const maxSpeed = 0.85;
        if (currentSpeed > maxSpeed) {
          node.vx = (node.vx / currentSpeed) * maxSpeed;
          node.vy = (node.vy / currentSpeed) * maxSpeed;
        }

        node.x += node.vx;
        node.y += node.vy;

        // Soft wall bounds with gentle damping
        if (node.x < 8) {
          node.x = 8;
          node.vx = Math.abs(node.vx) * 0.4;
        } else if (node.x > arenaW - node.size - 8) {
          node.x = arenaW - node.size - 8;
          node.vx = -Math.abs(node.vx) * 0.4;
        }

        if (node.y < 8) {
          node.y = 8;
          node.vy = Math.abs(node.vy) * 0.4;
        } else if (node.y > arenaH - node.size - 8) {
          node.y = arenaH - node.size - 8;
          node.vy = -Math.abs(node.vy) * 0.4;
        }

        // Direct hardware-accelerated transform update
        const el = orbRefs.current[i];
        if (el) {
          el.style.transform = `translate3d(${node.x}px, ${node.y}px, 0)`;
        }
      }

      rafId = requestAnimationFrame(physicsLoop);
    }

    rafId = requestAnimationFrame(physicsLoop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resizeArena);
      arena.removeEventListener("mousemove", onMouseMove);
      arena.removeEventListener("mouseleave", onMouseLeave);
      arena.removeEventListener("touchmove", onTouchMove);
      arena.removeEventListener("touchend", onMouseLeave);
    };
  }, []);

  return (
    <div className="floating-skills-card reveal-item">
      <div>
        <div className="eyebrow" style={{ marginBottom: "6px" }}>
          CORE TECHNOLOGIES
        </div>
        <h3 className="skills-bento-title">Skills &amp; Technologies in Motion</h3>
        <p className="work-desc" style={{ marginTop: "4px" }}>
          {isMobile
            ? "Tap or drag inside the arena to interact with authentic brand nodes. Hover or tap any logo to inspect."
            : "Move your cursor inside the arena to repel and orbit authentic brand nodes. Hover any logo to inspect details."}
        </p>
      </div>

      <div
        className="skills-arena"
        ref={arenaRef}
        data-cursor="ORBIT / REPEL"
        id="skills-arena-interactive"
      >
        <canvas ref={canvasRef} className="skills-arena-canvas" />

        {SKILLS.map((skill, idx) => {
          const Icon = skill.icon;
          const isMob = typeof window !== "undefined" && window.innerWidth <= 768;
          const size = skill.core ? (isMob ? 46 : 52) : (isMob ? 38 : 44);
          const iconSize = skill.core ? (isMob ? 23 : 27) : (isMob ? 19 : 22);

          return (
            <div
              key={skill.id}
              ref={(el) => (orbRefs.current[idx] = el)}
              className="skill-orb-wrapper"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: `${size}px`,
                height: `${size}px`,
                willChange: "transform",
              }}
            >
              <div
                className={`skill-orb ${skill.core ? "is-core" : ""}`}
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  "--brand-color": skill.color,
                }}
                tabIndex={0}
                aria-label={`${skill.name} (${skill.category})`}
              >
                <Icon
                  className="skill-orb-icon"
                  size={iconSize}
                  style={{
                    color:
                      theme === "light" && skill.id === "next"
                        ? "#111116"
                        : skill.color,
                  }}
                />

                <div className="skill-orb-tooltip">
                  <div className="tooltip-header">
                    <span
                      className="tooltip-dot"
                      style={{ backgroundColor: skill.color }}
                    />
                    <span className="tooltip-name">{skill.name}</span>
                    {skill.core && <span className="tooltip-badge">CORE</span>}
                  </div>
                  <div className="tooltip-category">{skill.category}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
