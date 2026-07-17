import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { HiArrowDown } from "react-icons/hi";
import { RiDownloadLine } from "react-icons/ri";

const ROLES = ["Full Stack Developer", "UI/UX Designer", "Mobile App Dev", "Problem Solver"];

const Hero = () => {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 600], [0, 120]);
  const opacityFade = useTransform(scrollY, [0, 400], [1, 0]);

  // GSAP entrance
  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    tl.from(".hero-badge", { opacity: 0, y: 20, duration: 0.5, ease: "power3.out" })
      .from(".hero-title", { opacity: 0, y: 50, stagger: 0.1, duration: 0.7, ease: "power4.out" }, "-=0.2")
      .from(".hero-sub", { opacity: 0, y: 20, duration: 0.5, ease: "power3.out" }, "-=0.3")
      .from(".hero-cta", { opacity: 0, y: 20, duration: 0.5, ease: "power3.out" }, "-=0.2")
      .from(".hero-social", { opacity: 0, x: -16, stagger: 0.06, duration: 0.4, ease: "power3.out" }, "-=0.2")
      .from(".hero-image-wrap", { opacity: 0, scale: 0.88, duration: 0.9, ease: "power4.out" }, "-=0.6");
  }, { scope: heroRef });

  // Typewriter
  useEffect(() => {
    const current = ROLES[roleIndex];
    let timeout;
    if (!isDeleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 80);
    } else if (!isDeleting && charIndex === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 40);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex((r) => (r + 1) % ROLES.length);
    }
    setDisplayText(current.slice(0, charIndex));
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  // Mouse parallax on image
  useEffect(() => {
    const el = imageRef.current;
    if (!el) return;
    const move = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 14;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      gsap.to(el, { x, y, duration: 1, ease: "power2.out" });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const socials = [
    { href: "https://github.com/Nithwin", icon: FaGithub, label: "GitHub" },
    { href: "https://www.linkedin.com/in/nithwin-v-m-7b5b13252/", icon: FaLinkedin, label: "LinkedIn" },
    { href: "https://www.instagram.com/_nithwin", icon: FaInstagram, label: "Instagram" },
    { href: "https://leetcode.com/u/vmnithwin/", icon: SiLeetcode, label: "LeetCode" },
  ];

  const scrollToAbout = () => {
    const el = document.getElementById("about");
    if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      id="home"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        paddingTop: "88px",
        paddingBottom: "40px",
      }}
    >
      {/* Grid */}
      <div className="grid-bg" />

      {/* Ambient glow */}
      <div style={{
        position: "absolute", top: "20%", left: "15%", width: "400px", height: "400px",
        borderRadius: "50%", pointerEvents: "none",
        background: "radial-gradient(circle, rgba(123,47,255,0.12) 0%, transparent 70%)", filter: "blur(60px)",
      }} />
      <div style={{
        position: "absolute", bottom: "25%", right: "15%", width: "320px", height: "320px",
        borderRadius: "50%", pointerEvents: "none",
        background: "radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)", filter: "blur(60px)",
      }} />

      <div className="container-main" style={{ position: "relative", zIndex: 10 }}>
        <div style={{
          display: "flex",
          flexDirection: "column-reverse",
          alignItems: "center",
          gap: "48px",
        }}>
          {/* Responsive: on large screens, side by side */}
          <style>{`
            @media (min-width: 1024px) {
              .hero-grid {
                flex-direction: row !important;
                gap: 32px !important;
              }
              .hero-left { max-width: 600px; }
              .hero-right { max-width: 420px; }
            }
          `}</style>
          <div className="hero-grid" style={{
            display: "flex",
            flexDirection: "column-reverse",
            alignItems: "center",
            gap: "48px",
            width: "100%",
          }}>
            {/* LEFT: Text */}
            <motion.div style={{ y: yParallax, opacity: opacityFade }} className="hero-left" >
              {/* Badge */}
              <div className="hero-badge" style={{ marginBottom: "24px" }}>
                <span className="section-label">
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22C55E", display: "inline-block" }} className="animate-pulse-glow" />
                  Available for Work
                </span>
              </div>

              {/* Title */}
              <h1 className="hero-title" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontFamily: "var(--font-syne)", fontWeight: 700, lineHeight: 1.1, color: "var(--text-primary)", marginBottom: "8px" }}>
                Hi, I'm
              </h1>
              <h1 className="hero-title gradient-text" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontFamily: "var(--font-syne)", fontWeight: 700, lineHeight: 1.1, marginBottom: "20px" }}>
                Nithwin V M
              </h1>

              {/* Typewriter */}
              <div className="hero-sub" style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "16px", display: "flex", alignItems: "center", gap: "4px" }}>
                <span>{displayText}</span>
                <span className="typed-cursor" />
              </div>

              {/* Bio */}
              <p className="hero-sub" style={{ fontSize: "1rem", lineHeight: 1.7, color: "var(--text-muted)", maxWidth: "480px", marginBottom: "28px" }}>
                I craft immersive digital experiences — from blazing fast web apps to polished mobile solutions. I level up alone, but build for everyone.
              </p>

              {/* CTAs */}
              <div className="hero-cta" style={{ display: "flex", flexWrap: "wrap", gap: "14px", marginBottom: "24px" }}>
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={scrollToAbout} className="btn-primary">
                  <span>View My Work</span>
                  <HiArrowDown size={16} style={{ position: "relative", zIndex: 1 }} />
                </motion.button>
                <motion.a href="/assets/resume.pdf" download whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="btn-outline" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  <RiDownloadLine size={16} />
                  Resume
                </motion.a>
              </div>

              {/* Socials */}
              <div style={{ display: "flex", gap: "12px" }}>
                {socials.map(({ href, icon: Icon, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="hero-social"
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.92 }}
                    style={{
                      width: "44px", height: "44px", borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: "var(--bg-card)", border: "1px solid var(--border)",
                      transition: "border-color 0.3s, box-shadow 0.3s",
                    }}
                  >
                    <Icon size={17} style={{ color: "var(--text-secondary)" }} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* RIGHT: Image */}
            <div className="hero-right" style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative", width: "100%" }}>
              {/* Orbit rings */}
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
                <div className="orbit-ring" style={{ width: "300px", height: "300px", animationDuration: "20s" }} />
                <div className="orbit-ring" style={{ width: "400px", height: "400px", animationDuration: "28s", animationDirection: "reverse", borderStyle: "dashed" }} />
              </div>

              {/* Glow behind image */}
              <div style={{
                position: "absolute", width: "280px", height: "280px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(123,47,255,0.2) 0%, transparent 70%)", filter: "blur(30px)", pointerEvents: "none",
              }} />

              {/* Image container */}
              <div ref={imageRef} className="hero-image-wrap" style={{ position: "relative", zIndex: 10 }}>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div style={{
                    width: "clamp(220px, 35vw, 320px)",
                    height: "clamp(220px, 35vw, 320px)",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "2px solid rgba(123,47,255,0.35)",
                    boxShadow: "0 0 50px rgba(123,47,255,0.25), 0 0 100px rgba(123,47,255,0.08)",
                    background: "linear-gradient(135deg, rgba(123,47,255,0.15), rgba(0,212,255,0.08))",
                    position: "relative",
                  }}>
                    <img src="./assets/hero.png" alt="Nithwin V M" style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.1) translateY(8px)" }} />
                  </div>

                  {/* Floating badges */}
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="glass-card"
                    style={{ position: "absolute", top: "12px", right: "-8px", padding: "8px 16px", borderRadius: "14px", zIndex: 20, pointerEvents: "none" }}
                  >
                    <p style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text-muted)" }}>Experience</p>
                    <p className="gradient-text" style={{ fontSize: "0.95rem", fontWeight: 700 }}>2+ Years</p>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="glass-card"
                    style={{ position: "absolute", bottom: "20px", left: "-8px", padding: "8px 16px", borderRadius: "14px", zIndex: 20, pointerEvents: "none" }}
                  >
                    <p style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text-muted)" }}>Projects</p>
                    <p className="gradient-text" style={{ fontSize: "0.95rem", fontWeight: 700 }}>10+ Built</p>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          onClick={scrollToAbout}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute", bottom: "24px", left: "50%", transform: "translateX(-50%)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", cursor: "pointer",
          }}
        >
          <span style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)" }}>Scroll</span>
          <HiArrowDown size={14} style={{ color: "var(--purple)" }} />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
