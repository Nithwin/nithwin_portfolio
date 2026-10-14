import React, { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { RiDownloadLine, RiArrowRightLine } from "react-icons/ri";
import { useTheme } from "../context/ThemeContext";

const ROLES = [
  "Generative AI & LLM Solutions",
  "Full Stack Web Architecture",
  "Cloud-Native Scalable Systems",
  "Award-Winning Digital Experiences",
];

const METRICS = [
  { num: "750", unit: "+", label: "LeetCode Solved" },
  { num: "15", unit: "+", label: "Projects Built" },
  { num: "1", unit: "", label: "IEEE Publication" },
  { num: "400", unit: "+", label: "Users Served" },
];

const Hero = () => {
  const { isDark } = useTheme();
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);
  const imageRef = useRef(null);
  const sectionRef = useRef(null);

  // Typewriter
  useEffect(() => {
    const current = ROLES[roleIdx];
    let t;
    if (!isDeleting && charIdx < current.length) {
      t = setTimeout(() => setCharIdx((c) => c + 1), 52);
    } else if (!isDeleting && charIdx === current.length) {
      t = setTimeout(() => setIsDeleting(true), 2600);
    } else if (isDeleting && charIdx > 0) {
      t = setTimeout(() => setCharIdx((c) => c - 1), 26);
    } else if (isDeleting && charIdx === 0) {
      setIsDeleting(false);
      setRoleIdx((r) => (r + 1) % ROLES.length);
    }
    setDisplayText(current.slice(0, charIdx));
    return () => clearTimeout(t);
  }, [charIdx, isDeleting, roleIdx]);

  // 3D tilt on portrait
  useEffect(() => {
    const el = imageRef.current;
    if (!el) return;
    let rx = 0, ry = 0;
    let rafId;

    const move = (e) => {
      const targetRX = ((e.clientY / window.innerHeight) - 0.5) * -14;
      const targetRY = ((e.clientX / window.innerWidth) - 0.5) * 14;
      const lerp = (a, b, t) => a + (b - a) * t;
      const animate = () => {
        rx = lerp(rx, targetRX, 0.08);
        ry = lerp(ry, targetRY, 0.08);
        el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(20px)`;
        rafId = requestAnimationFrame(animate);
      };
      cancelAnimationFrame(rafId);
      animate();
    };
    const leave = () => {
      cancelAnimationFrame(rafId);
      el.style.transform = `rotateX(0deg) rotateY(0deg) translateZ(0)`;
      el.style.transition = "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)";
      setTimeout(() => { if (el) el.style.transition = ""; }, 1200);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Stagger reveal on mount
  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".reveal") || [];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("revealed");
        }
      });
    }, { threshold: 0.1 });
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToAbout = () => {
    const el = document.getElementById("about");
    if (el) window.scrollTo({ top: el.offsetTop - 82, behavior: "smooth" });
  };

  const heroImage = isDark
    ? "./assets/about.png"
    : "./assets/file_00000000217081f88c1c299190a59705.png";

  return (
    <section id="home" className="hero-section" ref={sectionRef}>
      <div className="container">
        <div className="hero-grid">
          {/* Left */}
          <div>
            <div className="eyebrow reveal">
              Full Stack & Generative AI Engineer
            </div>
            <h1 className="hero-headline reveal reveal-delay-1">
              Building the<br />
              future with<br />
              <span className="accent-word">code & AI.</span>
            </h1>

            <div className="hero-terminal reveal reveal-delay-2">
              <span className="prompt">$</span>
              <span style={{ color: "var(--fg)" }}>{displayText}</span>
              <span className="cursor-blink" />
            </div>

            <p className="hero-subtitle reveal reveal-delay-3">
              I'm <strong>Nithwin V M</strong>, a Full Stack & Generative AI Engineer
              from India. I architect high-performance web platforms and intelligent
              LLM-powered systems that solve real-world problems.
            </p>

            <div className="cta-row reveal reveal-delay-4">
              <button className="btn-primary" onClick={scrollToAbout}>
                Explore Work <RiArrowRightLine size={16} />
              </button>
              <a href="./assets/resume.pdf" download className="btn-secondary">
                <RiDownloadLine size={16} />
                Download CV
              </a>
            </div>

            {/* Social icons */}
            <div className="hero-socials-strip reveal reveal-delay-5">
              {[
                { href: "https://github.com/Nithwin", icon: FaGithub, label: "GitHub" },
                { href: "https://www.linkedin.com/in/nithwin-v-m-7b5b13252/", icon: FaLinkedin, label: "LinkedIn" },
                { href: "https://www.instagram.com/_nithwin", icon: FaInstagram, label: "Instagram" },
                { href: "https://leetcode.com/u/vmnithwin/", icon: SiLeetcode, label: "LeetCode" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  aria-label={label}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>

            {/* Metrics */}
            <div className="hero-metrics reveal reveal-delay-5">
              {METRICS.map(({ num, unit, label }) => (
                <div key={label}>
                  <div className="metric-num">
                    {num}<span className="accent-unit">{unit}</span>
                  </div>
                  <div className="metric-label">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Portrait */}
          <div className="hero-visual-wrap reveal reveal-delay-2">
            <div
              style={{ perspective: "1200px" }}
            >
              <div
                ref={imageRef}
                className="hero-portrait-frame"
                style={{ transformStyle: "preserve-3d", willChange: "transform" }}
              >
                <img
                  src={heroImage}
                  alt="Nithwin V M"
                  loading="eager"
                />
                <div className="hero-portrait-overlay" />
                <div className="hero-portrait-badge">
                  <span className="hero-badge-dot" />
                  <span className="hero-badge-text">
                    <strong>Available</strong> — Open to new opportunities
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
