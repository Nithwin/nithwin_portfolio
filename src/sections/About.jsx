import React from "react";
import { motion } from "framer-motion";
import SectionReveal, { fadeUp } from "../components/SectionReveal";
import {
  RiSparklingFill,
  RiMapPinLine,
  RiBrainLine,
  RiCodeSSlashLine,
  RiLightbulbLine,
  RiDownloadLine,
} from "react-icons/ri";

const highlights = [
  {
    icon: RiBrainLine,
    color: "#7B2FFF",
    title: "Generative AI & LLM Engineering",
    desc: "I build RAG pipelines, autonomous agent loops, and LLM-powered tools using Python, LangChain, and vector databases — turning raw model capabilities into real enterprise automation.",
  },
  {
    icon: RiCodeSSlashLine,
    color: "#00D4FF",
    title: "Full Stack Cloud Development",
    desc: "From Next.js 15 frontends to Node.js backends and PostgreSQL/MongoDB databases, I engineer complete web ecosystems optimized for performance, scalability, and SEO.",
  },
  {
    icon: RiLightbulbLine,
    color: "#00FFD1",
    title: "Algorithms & Problem Solving",
    desc: "Daily LeetCode practice keeps my algorithmic thinking sharp. I approach every system design challenge with a data-first mindset — writing code that scales cleanly under concurrency.",
  },
];

const About = () => {
  return (
    <SectionReveal id="about">
      <div className="grid-bg" />

      {/* Background aurora glow */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "0",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(123,47,255,0.13) 0%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "0",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,212,255,0.1) 0%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <div
        className="container-main"
        style={{ position: "relative", zIndex: 10, paddingTop: "60px", paddingBottom: "80px" }}
      >
        {/* ── Responsive layout ── */}
        <style>{`
          .about-layout {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 64px;
            align-items: start;
          }
          .about-left-col {
            position: sticky;
            top: 130px;
          }
          @media (max-width: 900px) {
            .about-layout {
              grid-template-columns: 1fr;
              gap: 48px;
            }
            .about-left-col {
              position: static;
            }
          }
        `}</style>

        <div className="about-layout">
          {/* ─────────────────── LEFT: BIO ─────────────────── */}
          <div className="about-left-col">
            <motion.div variants={fadeUp}>
              {/* Label */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "18px" }}>
                <RiSparklingFill size={14} style={{ color: "var(--neon)" }} />
                <span className="section-label" style={{ margin: 0 }}>About Me</span>
              </div>

              {/* Headline */}
              <h2
                style={{
                  fontSize: "clamp(2rem, 4.2vw, 3.2rem)",
                  fontFamily: "var(--font-outfit), sans-serif",
                  fontWeight: 800,
                  lineHeight: 1.18,
                  letterSpacing: "-0.03em",
                  color: "var(--text-primary)",
                  marginBottom: "24px",
                }}
              >
                Building the future,{" "}
                <span className="gradient-text">one system at a time.</span>
              </h2>

              {/* Bio paragraphs */}
              <p
                style={{
                  fontSize: "1.05rem",
                  lineHeight: 1.82,
                  color: "var(--text-secondary)",
                  fontFamily: "var(--font-jakarta), sans-serif",
                  marginBottom: "16px",
                }}
              >
                I'm{" "}
                <strong style={{ color: "var(--cyan)" }}>Nithwin V M</strong>, a
                Full Stack & Generative AI Software Engineer based in India.
                I'm passionate about crafting intelligent, high-performance
                web platforms that feel as good as they perform.
              </p>
              <p
                style={{
                  fontSize: "0.98rem",
                  lineHeight: 1.82,
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-jakarta), sans-serif",
                  marginBottom: "36px",
                }}
              >
                Whether I'm designing a Generative AI pipeline, shipping a
                full-stack product, or solving a hard LeetCode problem at
                midnight — I bring the same obsessive focus to clean,
                modular code that scales under real-world pressure.
              </p>

              {/* Location pill + Download CTA */}
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "9px 18px",
                    borderRadius: "50px",
                    background: "rgba(0,212,255,0.08)",
                    border: "1px solid rgba(0,212,255,0.2)",
                    fontSize: "0.88rem",
                    fontFamily: "var(--font-mono), monospace",
                    fontWeight: 600,
                    color: "var(--cyan)",
                  }}
                >
                  <RiMapPinLine size={15} />
                  India // Open to Global Remote
                </div>

                <motion.a
                  href="/assets/resume.pdf"
                  download
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 22px",
                    borderRadius: "50px",
                    fontSize: "0.92rem",
                    fontFamily: "var(--font-jakarta), sans-serif",
                    fontWeight: 600,
                    textDecoration: "none",
                    color: "var(--text-primary)",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    boxShadow: "var(--shadow-card)",
                    transition: "all 0.3s ease",
                  }}
                >
                  <RiDownloadLine size={16} />
                  Resume
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* ─────────────────── RIGHT: HIGHLIGHT CARDS ─────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {highlights.map(({ icon: Icon, color, title, desc }, i) => (
              <motion.div
                key={title}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -5, borderColor: color }}
                style={{
                  padding: "32px",
                  borderRadius: "24px",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  boxShadow: "var(--shadow-card)",
                  position: "relative",
                  overflow: "hidden",
                  transition: "border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease",
                  cursor: "default",
                }}
              >
                {/* Accent top line */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: `linear-gradient(90deg, ${color}, transparent)`,
                  }}
                />

                {/* Icon + Title row */}
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "14px",
                      background: `${color}18`,
                      border: `1px solid ${color}35`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={24} style={{ color }} />
                  </div>
                  <h3
                    style={{
                      fontSize: "1.18rem",
                      fontFamily: "var(--font-outfit), sans-serif",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      letterSpacing: "-0.015em",
                      margin: 0,
                    }}
                  >
                    {title}
                  </h3>
                </div>

                {/* Description */}
                <p
                  style={{
                    fontSize: "0.97rem",
                    lineHeight: 1.78,
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-jakarta), sans-serif",
                    margin: 0,
                  }}
                >
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionReveal>
  );
};

export default About;
