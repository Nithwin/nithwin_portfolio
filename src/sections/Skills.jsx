import React from "react";
import { motion } from "framer-motion";
import SectionReveal, { fadeUp } from "../components/SectionReveal";
import {
  SiHtml5, SiCss3, SiJavascript, SiTypescript, SiPython, SiOpenjdk,
  SiCplusplus, SiC, SiDart, SiReact, SiTailwindcss, SiBootstrap,
  SiFlutter, SiMui, SiAndroidstudio, SiFigma, SiFirebase,
  SiVercel, SiMongodb, SiGithub, SiNodedotjs, SiNextdotjs,
} from "react-icons/si";
import { FiVideo } from "react-icons/fi";
import { VscVscode } from "react-icons/vsc";
import { useTheme } from "../context/ThemeContext";

const CATEGORIES = [
  {
    label: "Languages",
    skills: [
      { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", icon: SiCss3, color: "#2965F1" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#007ACC" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "Java", icon: SiOpenjdk, color: "#007396" },
      { name: "C++", icon: SiCplusplus, color: "#00599C" },
      { name: "C", icon: SiC, color: "#A8B9CC" },
      { name: "Dart", icon: SiDart, color: "#0175C2" },
    ],
  },
  {
    label: "Frameworks",
    skills: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
      { name: "Flutter", icon: SiFlutter, color: "#02569B" },
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
      { name: "Material UI", icon: SiMui, color: "#007FFF" },
    ],
  },
  {
    label: "Tools",
    skills: [
      { name: "VS Code", icon: VscVscode, color: "#007ACC" },
      { name: "Figma", icon: SiFigma, color: "#F24E1E" },
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
      { name: "Vercel", icon: SiVercel, color: "#FFFFFF" },
      { name: "Android Studio", icon: SiAndroidstudio, color: "#3DDC84" },
      { name: "DaVinci Resolve", icon: FiVideo, color: "#FF4B4B" },
    ],
  },
];

const MarqueeRow = ({ skills, reverse = false }) => {
  const doubled = [...skills, ...skills, ...skills]; // triple for seamless loop
  return (
    <div style={{ overflow: "hidden", padding: "8px 0", position: "relative" }}>
      {/* Edge fades */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "60px", background: "linear-gradient(to right, var(--bg-primary), transparent)", zIndex: 2, pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "60px", background: "linear-gradient(to left, var(--bg-primary), transparent)", zIndex: 2, pointerEvents: "none" }} />
      <motion.div
        style={{ display: "flex", gap: "12px", width: "max-content" }}
        animate={{ x: reverse ? ["0%", "-33.33%"] : ["-33.33%", "0%"] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((skill, i) => {
          const Icon = skill.icon;
          return (
            <div
              key={`${skill.name}-${i}`}
              style={{
                display: "flex", alignItems: "center", gap: "16px",
                padding: "16px 32px", borderRadius: "50px", flexShrink: 0,
                border: `1.5px solid ${skill.color}30`,
                background: `${skill.color}0A`,
              }}
            >
              <Icon size={38} style={{ color: skill.color }} />
              <span style={{ fontSize: "1.15rem", fontWeight: 600, whiteSpace: "nowrap", color: "var(--text-secondary)" }}>
                {skill.name}
              </span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

const Skills = () => {
  const { isDark } = useTheme();

  // Adjust colors that are pure white in dark mode to black in light mode
  const adjustedCategories = CATEGORIES.map((cat) => ({
    ...cat,
    skills: cat.skills.map((skill) => ({
      ...skill,
      color: skill.color === "#FFFFFF" && !isDark ? "#0A0A12" : skill.color,
    })),
  }));

  return (
    <SectionReveal id="skills">
      <div className="grid-bg" />
      <div className="container-main">
        {/* Header */}
        <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: "48px" }}>
          <span className="section-label">Expertise</span>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontFamily: "var(--font-syne)", fontWeight: 700, marginTop: "16px", color: "var(--text-primary)" }}>
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p style={{ marginTop: "12px", fontSize: "1rem", maxWidth: "500px", margin: "12px auto 0", color: "var(--text-muted)" }}>
            Technologies I use to bring ideas to life — from design to deployment.
          </p>
        </motion.div>

        {/* Marquee Rows */}
        <motion.div variants={fadeUp} style={{ marginBottom: "20px" }}>
          {adjustedCategories.map((cat, i) => (
            <div key={cat.label} style={{ marginBottom: "16px" }}>
              <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 600, color: "var(--text-muted)", marginBottom: "8px", paddingLeft: "8px" }}>
                {cat.label}
              </p>
              <MarqueeRow skills={cat.skills} reverse={i % 2 === 1} />
            </div>
          ))}
        </motion.div>
      </div>
    </SectionReveal>
  );
};

export default Skills;
