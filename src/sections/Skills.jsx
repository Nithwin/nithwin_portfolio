import React, { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import {
  SiHtml5, SiCss3, SiJavascript, SiTypescript, SiPython, SiOpenjdk,
  SiCplusplus, SiC, SiDart, SiReact, SiTailwindcss, SiBootstrap,
  SiFlutter, SiMui, SiAndroidstudio, SiFigma, SiFirebase,
  SiVercel, SiMongodb, SiGithub, SiNodedotjs, SiNextdotjs,
} from "react-icons/si";
import { FiVideo } from "react-icons/fi";
import { VscVscode } from "react-icons/vsc";

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
    label: "Frameworks & Libraries",
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
    label: "Tools & Platforms",
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
  const tripled = [...skills, ...skills, ...skills];
  return (
    <div className="skills-marquee-wrap">
      <div className={`skills-marquee-track${reverse ? " reverse" : ""}`}>
        {tripled.map((skill, i) => {
          const Icon = skill.icon;
          return (
            <div
              key={`${skill.name}-${i}`}
              className="skill-pill"
              style={{
                borderColor: `${skill.color}30`,
                backgroundColor: `${skill.color}0A`,
              }}
            >
              <Icon size={17} style={{ color: skill.color, flexShrink: 0 }} />
              <span className="skill-pill-name">{skill.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Skills = () => {
  const { isDark } = useTheme();
  const sectionRef = useRef(null);

  const adjusted = CATEGORIES.map((cat) => ({
    ...cat,
    skills: cat.skills.map((s) => ({
      ...s,
      color: s.color === "#FFFFFF" && !isDark ? "#1A1A1A" : s.color,
    })),
  }));

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".reveal") || [];
    const obs = new IntersectionObserver(
      (e) => e.forEach((en) => en.isIntersecting && en.target.classList.add("revealed")),
      { threshold: 0.08 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" className="section-block" ref={sectionRef}>
      <div className="container">
        <div className="section-header-row reveal">
          <div>
            <span className="eyebrow">Expertise</span>
            <h2 className="section-title">
              Skills & Technologies
            </h2>
          </div>
          <p className="section-subtitle">
            Technologies I use to bring ideas to life — from design to deployment.
          </p>
        </div>
      </div>

      <div className="reveal" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {adjusted.map((cat, i) => (
          <div key={cat.label}>
            <div className="container">
              <div className="skills-cat-label">{cat.label}</div>
            </div>
            <MarqueeRow skills={cat.skills} reverse={i % 2 === 1} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
