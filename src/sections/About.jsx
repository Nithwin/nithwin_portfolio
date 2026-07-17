import React from "react";
import { motion } from "framer-motion";
import SectionReveal, { fadeUp } from "../components/SectionReveal";
import { RiCodeSSlashLine, RiSmartphoneLine, RiPaletteLine, RiDatabase2Line } from "react-icons/ri";

const stats = [
  { number: "10+", label: "Projects Built" },
  { number: "2+", label: "Years Experience" },
  { number: "5+", label: "Tech Stacks" },
  { number: "100%", label: "Passion" },
];

const services = [
  { icon: RiCodeSSlashLine, title: "Web Development", desc: "Modern, performant React & Next.js applications with pixel-perfect UI.", color: "#7B2FFF" },
  { icon: RiSmartphoneLine, title: "Mobile Apps", desc: "Cross-platform Flutter & React Native apps that feel native.", color: "#00D4FF" },
  { icon: RiPaletteLine, title: "UI/UX Design", desc: "Intuitive Figma interfaces that balance beauty with usability.", color: "#00FFD1" },
  { icon: RiDatabase2Line, title: "Backend & APIs", desc: "Scalable REST APIs, Firebase integrations, and MongoDB databases.", color: "#FF6B6B" },
];

const About = () => {
  return (
    <SectionReveal id="about">
      <div className="grid-bg" />
      <div className="container-main">
        {/* Header */}
        <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: "60px" }}>
          <span className="section-label">Who I Am</span>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontFamily: "var(--font-syne)", fontWeight: 700, marginTop: "16px", color: "var(--text-primary)" }}>
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        {/* Bio Row */}
        <motion.div variants={fadeUp} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "48px", marginBottom: "80px", justifyContent: "center" }}>
          {/* Image */}
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div style={{
              position: "absolute", inset: "-12px", borderRadius: "24px",
              background: "linear-gradient(135deg, rgba(123,47,255,0.25), rgba(0,212,255,0.1))",
              filter: "blur(16px)",
            }} />
            <div style={{
              position: "relative", width: "280px", height: "340px", borderRadius: "24px", overflow: "hidden",
              border: "1.5px solid rgba(123,47,255,0.25)",
            }}>
              <img src="./assets/about.png" alt="Nithwin about" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,18,0.5) 0%, transparent 60%)" }} />
            </div>
          </div>

          {/* Text */}
          <div style={{ flex: "1 1 300px", maxWidth: "560px" }}>
            <h3 style={{ fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontFamily: "var(--font-syne)", fontWeight: 600, color: "var(--text-primary)", marginBottom: "16px" }}>
              Building the web, one pixel at a time
            </h3>
            <p style={{ fontSize: "1rem", lineHeight: 1.7, color: "var(--text-secondary)", marginBottom: "12px" }}>
              I'm <span style={{ color: "var(--purple-light)", fontWeight: 600 }}>Nithwin V M</span>, a passionate Full Stack Developer from India who loves transforming complex problems into elegant, user-centric digital products.
            </p>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "var(--text-muted)", marginBottom: "12px" }}>
              From crafting pixel-perfect UIs in React to building robust mobile apps in Flutter, I bring a holistic approach to software development. I believe great code is both functional and beautiful.
            </p>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "var(--text-muted)", marginBottom: "20px" }}>
              When I'm not coding, you'll find me solving LeetCode problems, exploring new design trends, or editing videos in DaVinci Resolve.
            </p>

            {/* Tech tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {["React.js", "Flutter", "Firebase", "Node.js", "Figma"].map((tag) => (
                <span key={tag} style={{
                  padding: "6px 16px", borderRadius: "50px", fontSize: "0.8rem", fontWeight: 500,
                  background: "rgba(123,47,255,0.1)", border: "1px solid rgba(123,47,255,0.2)", color: "var(--purple-light)",
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div variants={fadeUp} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "80px" }}>
          {stats.map(({ number, label }) => (
            <div key={label} className="glass-card" style={{ textAlign: "center", padding: "32px 16px" }}>
              <p className="gradient-text" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontFamily: "var(--font-syne)", fontWeight: 700, marginBottom: "8px" }}>{number}</p>
              <p style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--text-muted)" }}>{label}</p>
            </div>
          ))}
        </motion.div>

        {/* Services */}
        <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: "40px" }}>
          <span className="section-label">What I Do</span>
          <h3 style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)", fontFamily: "var(--font-syne)", fontWeight: 700, marginTop: "16px", color: "var(--text-primary)" }}>
            My <span className="gradient-text">Services</span>
          </h3>
        </motion.div>

        <motion.div variants={fadeUp} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
          {services.map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="glass-card" style={{ padding: "32px" }}>
              <div style={{
                width: "52px", height: "52px", borderRadius: "14px",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: `${color}15`, border: `1px solid ${color}30`,
                marginBottom: "20px",
              }}>
                <Icon size={24} style={{ color }} />
              </div>
              <h4 style={{ fontSize: "1.05rem", fontFamily: "var(--font-syne)", fontWeight: 600, color: "var(--text-primary)", marginBottom: "10px" }}>
                {title}
              </h4>
              <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "var(--text-muted)" }}>
                {desc}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </SectionReveal>
  );
};

export default About;
