import React, { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaFileDownload } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { RiArrowRightLine, RiSparklingFill } from "react-icons/ri";
import { useTheme } from "../context/ThemeContext";

const ROLES = [
  "Deep Learning & Computer Vision (CA-YOLOv8)",
  "Distributed Backend Systems & C++",
  "Full-Stack Web Architectures",
  "High-Throughput Cloud APIs",
];

const METRICS = [
  { num: "450", unit: "+", label: "LeetCode Solved", sub: "Top 15% globally" },
  { num: "1", unit: "", label: "IEEE Publication", sub: "CA-YOLOv8 Object Detection" },
  { num: "15", unit: "+", label: "Projects Built", sub: "Full-Stack & Deep Learning" },
  { num: "8.0", unit: " CGPA", label: "Academic Excellence", sub: "Kongu Engineering College" },
];

const Hero = () => {
  const { isDark } = useTheme();
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);
  const cardRef = useRef(null);

  // Typewriter
  useEffect(() => {
    const current = ROLES[roleIdx];
    let t;
    if (!isDeleting && charIdx < current.length) {
      t = setTimeout(() => setCharIdx((c) => c + 1), 40);
    } else if (!isDeleting && charIdx === current.length) {
      t = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && charIdx > 0) {
      t = setTimeout(() => setCharIdx((c) => c - 1), 20);
    } else if (isDeleting && charIdx === 0) {
      setIsDeleting(false);
      setRoleIdx((r) => (r + 1) % ROLES.length);
    }
    setDisplayText(current.slice(0, charIdx));
    return () => clearTimeout(t);
  }, [charIdx, isDeleting, roleIdx]);

  // Gentle 3D Mouse Tilt
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotX = (y / (rect.height / 2)) * -6;
    const rotY = (x / (rect.width / 2)) * 6;
    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-2px)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
      cardRef.current.style.transition = "transform 0.5s ease";
    }
  };

  const handleMouseEnter = () => {
    if (cardRef.current) {
      cardRef.current.style.transition = "transform 0.1s ease-out";
    }
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const heroImage = isDark
    ? "/assets/about.png"
    : "/assets/file_00000000217081f88c1c299190a59705.png";

  return (
    <section
      id="home"
      style={{
        paddingTop: "140px",
        paddingBottom: "80px",
        position: "relative",
        zIndex: 2,
      }}
    >
      <div className="container">
        {/* Main Hero Split Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "56px",
            alignItems: "center",
            marginBottom: "72px",
          }}
        >
          {/* Left: Typography & Value Proposition */}
          <div>
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              SYSTEMS & AI RESEARCHER
            </div>

            <h1
              className="section-title"
              style={{
                fontSize: "clamp(38px, 4.8vw, 64px)",
                lineHeight: 1.08,
                letterSpacing: "-0.04em",
                marginBottom: "20px",
              }}
            >
              Engineering <span className="gradient-text">Scalable Systems</span> & Next-Gen AI Models.
            </h1>

            {/* Typewriter role badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 16px",
                borderRadius: "var(--radius-pill)",
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border)",
                fontFamily: "var(--font-mono)",
                fontSize: "13px",
                color: "var(--fg-secondary)",
                marginBottom: "24px",
                maxWidth: "100%",
              }}
            >
              <RiSparklingFill color="var(--accent)" size={15} />
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {displayText}
              </span>
              <span
                style={{
                  display: "inline-block",
                  width: "2px",
                  height: "14px",
                  backgroundColor: "var(--accent)",
                  animation: "pulse-glow 1s infinite",
                }}
              />
            </div>

            <p
              className="section-subtitle"
              style={{
                fontSize: "17px",
                lineHeight: 1.7,
                marginBottom: "36px",
                color: "var(--fg-muted)",
              }}
            >
              Hi, I'm <strong style={{ color: "var(--fg)" }}>Nithwin V M</strong>. Computer Science
              Engineer at Kongu Engineering College. IEEE Xplore Published Researcher in Computer
              Vision and dedicated builder of production-grade systems and generative AI tools.
            </p>

            {/* CTA Buttons */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                flexWrap: "wrap",
                marginBottom: "36px",
              }}
            >
              <button onClick={() => scrollTo("projects")} className="btn-pill-primary">
                Explore Work <RiArrowRightLine size={16} />
              </button>
              <a href="/resume.pdf" download className="btn-pill-secondary">
                <FaFileDownload size={14} /> Download CV
              </a>
            </div>

            {/* Social Pill Strip */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--fg-dim)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Connect:
              </span>
              {[
                { href: "https://github.com/Nithwin", icon: FaGithub, label: "GitHub" },
                { href: "https://www.linkedin.com/in/nithwin-v-m-7b5b13252/", icon: FaLinkedin, label: "LinkedIn" },
                { href: "https://leetcode.com/u/vmnithwin/", icon: SiLeetcode, label: "LeetCode" },
                { href: "https://www.instagram.com/_nithwin", icon: FaInstagram, label: "Instagram" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dock-icon-btn"
                  aria-label={label}
                  title={label}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Right: Spatial Glass 3D Stage Card */}
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            className="glass-card"
            style={{
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              maxWidth: "480px",
              margin: "0 auto",
              width: "100%",
            }}
          >
            {/* Stage Header Info */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "12px",
                fontFamily: "var(--font-mono)",
                color: "var(--fg-muted)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span className="dock-status-dot" />
                <span>ACTIVE STATUS</span>
              </div>
              <span style={{ color: "var(--fg-dim)" }}>TAMIL NADU, INDIA</span>
            </div>

            {/* Hero Image Container */}
            <div
              style={{
                width: "100%",
                aspectRatio: "1/1",
                borderRadius: "var(--radius-md)",
                overflow: "hidden",
                position: "relative",
                backgroundColor: "var(--bg-subtle)",
                border: "1px solid var(--border)",
              }}
            >
              <img
                src={heroImage}
                alt="Nithwin V M"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: isDark ? "contrast(1.05) brightness(0.95)" : "none",
                  transition: "transform 0.5s ease",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(8,8,11,0.85) 0%, transparent 50%)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "16px",
                  left: "16px",
                  right: "16px",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 12px",
                    borderRadius: "var(--radius-pill)",
                    backgroundColor: "rgba(8, 8, 11, 0.75)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    fontSize: "12px",
                    fontFamily: "var(--font-mono)",
                    color: "#F8FAFC",
                  }}
                >
                  <RiSparklingFill color="var(--accent)" size={13} />
                  <span>IEEE CA-YOLOv8 Author</span>
                </div>
              </div>
            </div>

            {/* Quick telemetry metrics */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
              }}
            >
              <div
                style={{
                  padding: "12px 14px",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "var(--bg-subtle)",
                  border: "1px solid var(--border)",
                }}
              >
                <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--fg-dim)", textTransform: "uppercase" }}>
                  LeetCode Track
                </div>
                <div style={{ fontSize: "16px", fontWeight: 700, color: "var(--fg)", marginTop: "2px" }}>
                  450+ Solved
                </div>
              </div>

              <div
                style={{
                  padding: "12px 14px",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "var(--bg-subtle)",
                  border: "1px solid var(--border)",
                }}
              >
                <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--fg-dim)", textTransform: "uppercase" }}>
                  Research Paper
                </div>
                <div style={{ fontSize: "16px", fontWeight: 700, color: "var(--accent)", marginTop: "2px" }}>
                  IEEE Xplore
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bento Metric Counters */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          {METRICS.map((item, idx) => (
            <div key={idx} className="glass-card" style={{ padding: "24px" }}>
              <div
                style={{
                  fontSize: "36px",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  color: "var(--fg)",
                  lineHeight: 1,
                  marginBottom: "8px",
                }}
              >
                {item.num}
                <span style={{ color: "var(--accent)" }}>{item.unit}</span>
              </div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--fg-secondary)", marginBottom: "4px" }}>
                {item.label}
              </div>
              <div style={{ fontSize: "12px", color: "var(--fg-dim)" }}>
                {item.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
