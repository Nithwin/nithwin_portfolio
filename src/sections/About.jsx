import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionReveal, { fadeUp, slideInLeft, slideInRight } from "../components/SectionReveal";
import {
  RiSparklingFill,
  RiMapPinLine,
  RiBrainLine,
  RiCodeSSlashLine,
  RiLightbulbLine,
  RiDownloadLine,
  RiArrowRightUpLine,
} from "react-icons/ri";

const highlights = [
  {
    icon: RiBrainLine,
    color: "#7B2FFF",
    title: "Generative AI",
    desc: "Building RAG pipelines, LLM agents, and AI-powered tools that automate real workflows.",
  },
  {
    icon: RiCodeSSlashLine,
    color: "#00D4FF",
    title: "Full Stack Engineering",
    desc: "End-to-end web ecosystems — React, Next.js, Node, PostgreSQL — optimized for scale.",
  },
  {
    icon: RiLightbulbLine,
    color: "#00FFD1",
    title: "Problem Solving",
    desc: "750+ LeetCode problems solved. Data-first thinking for every design challenge.",
  },
];

const stats = [
  { value: "750+", label: "LeetCode Solved" },
  { value: "15+", label: "Projects Built" },
  { value: "400+", label: "Users Served" },
];

const About = () => {
  return (
    <SectionReveal id="about">
      <div className="grid-bg" />

      {/* Ambient aurora */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "0",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(123,47,255,0.12) 0%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <div className="container-main" style={{ position: "relative", zIndex: 10 }}>
        {/* ─── Responsive CSS ─── */}
        <style>{`
          .about-grid {
            display: grid;
            grid-template-columns: 1.1fr 0.9fr;
            gap: 72px;
            align-items: center;
          }
          .about-stats-row {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
          }
          .about-highlights-col {
            display: flex;
            flex-direction: column;
            gap: 18px;
          }
          @media (max-width: 900px) {
            .about-grid {
              grid-template-columns: 1fr;
              gap: 48px;
            }
            .about-left { text-align: center; }
            .about-left .about-label-row { justify-content: center; }
            .about-left p { margin-left: auto; margin-right: auto; }
            .about-cta-row { justify-content: center !important; }
          }
          @media (max-width: 480px) {
            .about-grid { gap: 36px; }
            .about-stats-row { gap: 10px; }
            .highlight-card { padding: 20px !important; }
          }
        `}</style>

        <div className="about-grid">
          {/* ─────────── LEFT COLUMN ─────────── */}
          <motion.div variants={slideInLeft} className="about-left">
            {/* Label */}
            <div className="about-label-row" style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
              <RiSparklingFill size={14} style={{ color: "var(--neon)" }} />
              <span className="section-label" style={{ margin: 0 }}>About Me</span>
            </div>

            {/* Headline */}
            <h2
              style={{
                fontSize: "clamp(2rem, 4.2vw, 3.2rem)",
                fontFamily: "var(--font-outfit), sans-serif",
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
                color: "var(--text-primary)",
                marginBottom: "24px",
              }}
            >
              Crafting intelligent{" "}
              <span className="gradient-text">digital experiences.</span>
            </h2>

            {/* Bio — concise */}
            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.8,
                color: "var(--text-secondary)",
                fontFamily: "var(--font-jakarta), sans-serif",
                maxWidth: "520px",
                marginBottom: "32px",
              }}
            >
              I'm <strong style={{ color: "var(--cyan)" }}>Nithwin V M</strong>, a Full Stack & Generative AI Engineer based in India. I build high-performance web platforms and intelligent AI systems that solve real problems.
            </p>

            {/* Stats row */}
            <div className="about-stats-row" style={{ marginBottom: "32px" }}>
              {stats.map(({ value, label }) => (
                <motion.div
                  key={label}
                  whileHover={{ y: -4, borderColor: "rgba(123,47,255,0.35)" }}
                  style={{
                    padding: "20px 16px",
                    borderRadius: "16px",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    textAlign: "center",
                    transition: "all 0.35s ease",
                  }}
                >
                  <p className="gradient-text" style={{ fontSize: "1.6rem", fontFamily: "var(--font-syne)", fontWeight: 800, lineHeight: 1, marginBottom: "6px" }}>
                    {value}
                  </p>
                  <p style={{ fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)" }}>
                    {label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA Row */}
            <div className="about-cta-row" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "14px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "9px 18px",
                  borderRadius: "50px",
                  background: "rgba(0,212,255,0.08)",
                  border: "1px solid rgba(0,212,255,0.2)",
                  fontSize: "0.85rem",
                  fontFamily: "var(--font-mono), monospace",
                  fontWeight: 600,
                  color: "var(--cyan)",
                }}
              >
                <RiMapPinLine size={14} />
                India // Open to Remote
              </div>

              <motion.a
                href="/assets/resume.pdf"
                download
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="btn-outline"
                style={{
                  padding: "9px 22px",
                  fontSize: "0.88rem",
                  borderRadius: "50px",
                  gap: "8px",
                }}
              >
                <RiDownloadLine size={16} />
                Resume
              </motion.a>
            </div>
          </motion.div>

          {/* ─────────── RIGHT COLUMN ─────────── */}
          <motion.div variants={slideInRight} className="about-highlights-col">
            {highlights.map(({ icon: Icon, color, title, desc }, i) => (
              <motion.div
                key={title}
                whileHover={{ y: -5, borderColor: color, boxShadow: `0 12px 40px ${color}18` }}
                className="highlight-card"
                style={{
                  padding: "28px",
                  borderRadius: "20px",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.35s ease",
                  cursor: "default",
                }}
              >
                {/* Accent line */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: `linear-gradient(90deg, ${color}, transparent)`,
                  }}
                />

                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "12px" }}>
                  <div
                    style={{
                      width: "46px",
                      height: "46px",
                      borderRadius: "13px",
                      background: `${color}15`,
                      border: `1px solid ${color}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={22} style={{ color }} />
                  </div>
                  <h3
                    style={{
                      fontSize: "1.12rem",
                      fontFamily: "var(--font-outfit), sans-serif",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      margin: 0,
                    }}
                  >
                    {title}
                  </h3>
                </div>

                <p
                  style={{
                    fontSize: "0.92rem",
                    lineHeight: 1.7,
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-jakarta), sans-serif",
                    margin: 0,
                  }}
                >
                  {desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </SectionReveal>
  );
};

export default About;
