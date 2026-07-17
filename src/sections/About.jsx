import React from "react";
import { motion } from "framer-motion";
import SectionReveal, { fadeUp } from "../components/SectionReveal";
import { RiCodeSSlashLine, RiSmartphoneLine, RiPaletteLine, RiCpuLine, RiSparklingFill } from "react-icons/ri";

const stats = [
  { number: "10+", label: "Production Platforms Built" },
  { number: "2+", label: "Years Software Engineering" },
  { number: "8+", label: "Core Frameworks & Stacks" },
  { number: "100%", label: "Architectural Precision" },
];

const services = [
  { icon: RiCpuLine, title: "Generative AI & LLM Systems", desc: "Architecting AI-first platforms, RAG pipelines, and intelligent agent integrations that automate complex workflows.", color: "#7B2FFF" },
  { icon: RiCodeSSlashLine, title: "Full Stack Web Engineering", desc: "High-concurrency React, Next.js, and Node.js ecosystems built for speed, SEO, and rock-solid scalability.", color: "#00D4FF" },
  { icon: RiSmartphoneLine, title: "Fluid Mobile Solutions", desc: "Cross-platform mobile apps using Flutter and React Native that deliver buttery-smooth 60fps native performance.", color: "#00FFD1" },
  { icon: RiPaletteLine, title: "UI/UX & Design Systems", desc: "Crafting bespoke, accessible design tokens and interactive prototypes that bridge aesthetics with intuitive usability.", color: "#FF6B6B" },
];

const techTags = [
  "Next.js 15", "React.js", "TypeScript", "Python / GenAI", "Node.js", 
  "Flutter", "Tailwind CSS", "PostgreSQL", "MongoDB", "Firebase", "Docker", "Figma"
];

const About = () => {
  return (
    <SectionReveal id="about">
      <div className="grid-bg" />
      <div className="container-main">
        {/* Section Header */}
        <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: "50px" }}>
          <span className="section-label">
            <RiSparklingFill size={14} style={{ display: "inline", marginRight: "6px", color: "var(--neon)" }} />
            Who I Am
          </span>
          <h2 style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontFamily: "var(--font-outfit), var(--font-syne)", fontWeight: 800, marginTop: "14px", color: "var(--text-primary)", letterSpacing: "-0.03em" }}>
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        {/* Full-Width Image-Free Editorial Bio Card */}
        <motion.div
          variants={fadeUp}
          className="glass-card"
          style={{
            padding: "clamp(28px, 5vw, 56px)",
            borderRadius: "32px",
            marginBottom: "64px",
            position: "relative",
            overflow: "hidden",
            border: "1px solid var(--border)",
            background: "var(--bg-card)",
            boxShadow: "0 24px 60px rgba(0, 0, 0, 0.35)",
          }}
        >
          {/* Subtle Ambient Gradient Top Banner inside Card */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: "linear-gradient(90deg, #7B2FFF, #00D4FF, #00FFD1)",
            }}
          />

          <div style={{ maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>
            <h3 style={{ fontSize: "clamp(1.4rem, 3.2vw, 2.2rem)", fontFamily: "var(--font-outfit)", fontWeight: 700, color: "var(--text-primary)", marginBottom: "20px", letterSpacing: "-0.02em" }}>
              Architecting intelligent digital platforms that stand out in the modern cloud era.
            </h3>
            
            <p style={{ fontSize: "1.08rem", lineHeight: 1.85, color: "var(--text-secondary)", marginBottom: "18px" }}>
              I'm <span style={{ color: "var(--cyan)", fontWeight: 700 }}>Nithwin V M</span>, a Full Stack & Generative AI Software Engineer driven by the challenge of transforming visionary concepts into high-performance, robust software.
            </p>

            <p style={{ fontSize: "1.02rem", lineHeight: 1.85, color: "var(--text-muted)", marginBottom: "32px" }}>
              My engineering philosophy revolves around three pillars: <strong style={{ color: "var(--text-primary)" }}>blazing-fast execution speed</strong>, <strong style={{ color: "var(--text-primary)" }}>modular architecture</strong>, and <strong style={{ color: "var(--text-primary)" }}>frictionless user experience</strong>. Whether designing real-time data pipelines or interactive UI systems, I write clean, maintainable code that scales effortlessly from day one.
            </p>

            {/* Glowing Tech Stack Pill Cloud */}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px" }}>
              {techTags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: "8px 18px",
                    borderRadius: "50px",
                    fontSize: "0.85rem",
                    fontFamily: "var(--font-mono), monospace",
                    fontWeight: 600,
                    background: "rgba(123, 47, 255, 0.12)",
                    border: "1px solid rgba(123, 47, 255, 0.28)",
                    color: "var(--purple-light)",
                    transition: "all 0.3s ease",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Impact Stats Grid */}
        <motion.div variants={fadeUp} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "80px" }}>
          {stats.map(({ number, label }) => (
            <div key={label} className="glass-card" style={{ textAlign: "center", padding: "36px 20px", borderRadius: "24px" }}>
              <p className="gradient-text" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)", fontFamily: "var(--font-outfit)", fontWeight: 800, marginBottom: "8px", letterSpacing: "-0.03em" }}>
                {number}
              </p>
              <p style={{ fontSize: "0.88rem", fontFamily: "var(--font-mono)", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Services & Capabilities */}
        <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: "44px" }}>
          <span className="section-label">Capabilities</span>
          <h3 style={{ fontSize: "clamp(1.8rem, 4.2vw, 2.8rem)", fontFamily: "var(--font-outfit)", fontWeight: 800, marginTop: "14px", color: "var(--text-primary)", letterSpacing: "-0.03em" }}>
            Core <span className="gradient-text">Expertise</span>
          </h3>
        </motion.div>

        <motion.div variants={fadeUp} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          {services.map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="glass-card" style={{ padding: "36px 32px", borderRadius: "28px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{
                  width: "56px", height: "56px", borderRadius: "16px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: `${color}18`, border: `1px solid ${color}40`,
                  marginBottom: "24px",
                  boxShadow: `0 8px 24px ${color}20`,
                }}>
                  <Icon size={26} style={{ color }} />
                </div>
                <h4 style={{ fontSize: "1.25rem", fontFamily: "var(--font-outfit)", fontWeight: 700, color: "var(--text-primary)", marginBottom: "12px", letterSpacing: "-0.01em" }}>
                  {title}
                </h4>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.75, color: "var(--text-muted)" }}>
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </SectionReveal>
  );
};

export default About;
