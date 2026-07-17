import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { HiArrowRight } from "react-icons/hi";
import { RiDownloadLine, RiSparklingFill, RiCodeSSlashLine, RiCpuLine, RiArrowDownLine, RiMapPinLine } from "react-icons/ri";

const ROLES = [
  "Executing Generative AI & LLM Solutions...",
  "Scaling Cloud Native Full Stack Systems...",
  "Architecting High-Concurrency Web Platforms...",
  "Crafting Award-Winning Digital Realities...",
];

const Hero = () => {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  const { scrollY } = useScroll();
  // Gentle parallax translation without any opacity fading so nothing hides on scroll!
  const yParallaxText = useTransform(scrollY, [0, 1200], [0, 60]);
  const yParallaxImage = useTransform(scrollY, [0, 1200], [0, 30]);

  // World-Class GSAP Staggered Entrance Timeline
  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.1 });
    tl.from(".hero-title-line", { opacity: 0, y: 40, stagger: 0.1, duration: 0.8, ease: "power4.out" })
      .from(".hero-terminal-box", { opacity: 0, y: 20, scale: 0.96, duration: 0.6, ease: "power3.out" }, "-=0.45")
      .from(".hero-bio", { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" }, "-=0.4")
      .from(".hero-location-bar", { opacity: 0, y: 15, duration: 0.5, ease: "power3.out" }, "-=0.35")
      .from(".hero-cta-group", { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" }, "-=0.35")
      .from(".hero-social-item", { opacity: 0, scale: 0.6, stagger: 0.07, duration: 0.5, ease: "back.out(1.8)" }, "-=0.3")
      .from(".hero-visual-avatar", { opacity: 0, scale: 0.92, y: 35, duration: 1.1, ease: "power4.out" }, "-=0.85")
      .from(".hero-floating-hud", { opacity: 0, y: 25, scale: 0.9, stagger: 0.15, duration: 0.7, ease: "power3.out" }, "-=0.55");
  }, { scope: heroRef });

  // Terminal Typewriter Ticker
  useEffect(() => {
    const current = ROLES[roleIndex];
    let timeout;
    if (!isDeleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 50);
    } else if (!isDeleting && charIndex === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2600);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 25);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex((r) => (r + 1) % ROLES.length);
    }
    setDisplayText(current.slice(0, charIndex));
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  // Subtle 3D Depth Parallax on Right Avatar
  useEffect(() => {
    const el = imageRef.current;
    if (!el) return;
    const move = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 18;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      gsap.to(el, { x, y, duration: 1.2, ease: "power2.out" });
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
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      id="home"
      style={{
        position: "relative",
        // Perfectly tuned height so it's compact and doesn't feel overly tall or stretched
        minHeight: "max(660px, 84vh)",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        paddingTop: "94px",
        paddingBottom: "32px",
      }}
    >
      {/* Background Architectural Grid & Deep Aurora Spheres */}
      <div className="grid-bg" />
      <div
        style={{
          position: "absolute",
          top: "12%",
          left: "6%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          pointerEvents: "none",
          background: "radial-gradient(circle, rgba(123, 47, 255, 0.22) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "6%",
          right: "6%",
          width: "540px",
          height: "540px",
          borderRadius: "50%",
          pointerEvents: "none",
          background: "radial-gradient(circle, rgba(0, 212, 255, 0.18) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      <div className="container-main" style={{ position: "relative", zIndex: 10, width: "100%" }}>
        {/* Responsive CSS for Executive Layout & Proportions */}
        <style>{`
          @media (min-width: 1024px) {
            .hero-grid {
              flex-direction: row !important;
              justify-content: space-between !important;
              align-items: center !important;
              gap: 36px !important;
            }
            .hero-left {
              max-width: 610px !important;
              text-align: left !important;
            }
            .hero-right {
              width: clamp(360px, 44vw, 550px) !important;
              height: clamp(390px, 48vw, 580px) !important;
            }
            .hero-cta-group, .hero-social-group, .hero-location-bar {
              justify-content: flex-start !important;
            }
            .hud-top-left { top: 16px !important; left: -14px !important; }
            .hud-mid-right { top: 38% !important; right: -12px !important; }
            .hud-bottom-left { bottom: 24px !important; left: 14px !important; }
          }
          @media (max-width: 1023px) {
            .hero-grid {
              flex-direction: column-reverse !important;
              align-items: center !important;
              gap: 36px !important;
            }
            .hero-left {
              width: 100% !important;
              text-align: center !important;
            }
            .hero-right {
              width: clamp(280px, 84vw, 450px) !important;
              height: clamp(330px, 88vw, 510px) !important;
            }
            .hero-cta-group, .hero-social-group, .hero-location-bar {
              justify-content: center !important;
            }
            .hud-top-left { top: 8px !important; left: 6px !important; }
            .hud-mid-right { top: 38% !important; right: 6px !important; }
            .hud-bottom-left { bottom: 12px !important; left: 16px !important; }
          }
        `}</style>

        <div className="hero-grid" style={{ display: "flex", width: "100%" }}>
          {/* ===================== LEFT COLUMN: EDITORIAL TYPOGRAPHY & STORY ===================== */}
          <motion.div
            style={{ y: yParallaxText }}
            className="hero-left"
          >
            {/* Sleek, Executive Headline (No top pill above heading) */}
            <h1
              className="hero-title-line"
              style={{
                fontSize: "clamp(1.95rem, 3.8vw, 3.1rem)",
                fontFamily: "var(--font-outfit), var(--font-jakarta), sans-serif",
                fontWeight: 800,
                lineHeight: 1.12,
                letterSpacing: "-0.025em",
                color: "var(--text-primary)",
                marginBottom: "4px",
              }}
            >
              Hi, I'm Nithwin V M
            </h1>
            <h1
              className="hero-title-line gradient-text"
              style={{
                fontSize: "clamp(2.15rem, 4.3vw, 3.45rem)",
                fontFamily: "var(--font-outfit), var(--font-jakarta), sans-serif",
                fontWeight: 800,
                lineHeight: 1.12,
                letterSpacing: "-0.025em",
                marginBottom: "20px",
              }}
            >
              Building GenAI & Full Stack Realities.
            </h1>

            {/* Interactive Cyber Terminal Window Box */}
            <div
              className="hero-terminal-box"
              style={{
                background: "rgba(14, 14, 22, 0.8)",
                border: "1px solid var(--border)",
                borderRadius: "14px",
                padding: "13px 18px",
                marginBottom: "22px",
                boxShadow: "0 10px 35px rgba(0, 0, 0, 0.45)",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {/* Terminal Window Header with Mac Dots */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "6px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#FF5F56", display: "inline-block" }} />
                  <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#FFBD2E", display: "inline-block" }} />
                  <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#27C93F", display: "inline-block" }} />
                </div>
                <span style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", letterSpacing: "0.08em" }}>
                  bash - nithwin.ai
                </span>
              </div>

              {/* Terminal Typewriter Line */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", paddingTop: "4px" }}>
                <span style={{ color: "var(--neon)", fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "0.95rem" }}>
                  ~ $
                </span>
                <span
                  style={{
                    color: "var(--text-primary)",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 500,
                    fontSize: "clamp(0.88rem, 1.7vw, 1.02rem)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <span>{displayText}</span>
                  <span
                    style={{
                      display: "inline-block",
                      width: "3px",
                      height: "1.2em",
                      background: "var(--cyan)",
                      borderRadius: "2px",
                      animation: "blink 1s infinite",
                    }}
                  />
                </span>
              </div>
            </div>

            {/* Story-Driven Bio */}
            <p
              className="hero-bio"
              style={{
                fontSize: "1.04rem",
                fontFamily: "var(--font-jakarta), sans-serif",
                lineHeight: 1.78,
                color: "var(--text-muted)",
                maxWidth: "560px",
                marginBottom: "22px",
              }}
            >
              Turning visionary concepts into high-concurrency web ecosystems and intelligent Generative AI platforms. I bridge aesthetic design mastery with robust, cloud-native architectural engineering to create award-winning digital experiences.
            </p>

            {/* Location & Global Readiness Bar */}
            <div
              className="hero-location-bar"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "32px",
                fontFamily: "var(--font-mono)",
                fontSize: "0.82rem",
                color: "var(--text-secondary)",
              }}
            >
              <RiMapPinLine size={16} style={{ color: "var(--purple-light)" }} />
              <span>India // Open for Global Remote & High-Impact Engineering Roles</span>
            </div>

            {/* CTAs */}
            <div className="hero-cta-group" style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginBottom: "34px" }}>
              <motion.button
                whileHover={{ scale: 1.04, y: -2, boxShadow: "0 12px 35px rgba(123, 47, 255, 0.55)" }}
                whileTap={{ scale: 0.96 }}
                onClick={scrollToAbout}
                className="btn-primary"
                style={{
                  padding: "14px 34px",
                  fontSize: "0.96rem",
                  fontFamily: "var(--font-jakarta), sans-serif",
                  fontWeight: 600,
                  borderRadius: "50px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <span>Explore The Story</span>
                <HiArrowRight size={18} style={{ position: "relative", zIndex: 1 }} />
              </motion.button>

              <motion.a
                href="/assets/resume.pdf"
                download
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="btn-outline"
                style={{
                  padding: "14px 28px",
                  fontSize: "0.96rem",
                  fontFamily: "var(--font-jakarta), sans-serif",
                  fontWeight: 600,
                  borderRadius: "50px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <RiDownloadLine size={18} />
                <span>Download CV</span>
              </motion.a>
            </div>

            {/* Social Connect Bar */}
            <div className="hero-social-group" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span
                style={{
                  fontSize: "0.78rem",
                  fontFamily: "var(--font-mono), monospace",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                  marginRight: "6px",
                }}
              >
                Connect //
              </span>
              {socials.map(({ href, icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="hero-social-item"
                  whileHover={{ scale: 1.16, y: -3 }}
                  whileTap={{ scale: 0.92 }}
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    color: "var(--text-secondary)",
                    transition: "color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                  }}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ===================== RIGHT COLUMN: ABOUT IMAGE MOVED TO HERO & HUD CARDS ===================== */}
          <motion.div
            className="hero-right hero-visual-avatar"
            style={{
              y: yParallaxImage,
              position: "relative",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              zIndex: 10,
            }}
          >
            {/* Deep Luminous Halo Behind Avatar */}
            <div
              style={{
                position: "absolute",
                top: "10%",
                width: "88%",
                height: "82%",
                borderRadius: "50%",
                background: "linear-gradient(135deg, rgba(123, 47, 255, 0.45) 0%, rgba(0, 212, 255, 0.28) 100%)",
                filter: "blur(75px)",
                opacity: 0.9,
                pointerEvents: "none",
                zIndex: 1,
              }}
            />

            {/* Using about.png as requested ("add that image in hero i feel that looks best for hero") */}
            <div
              ref={imageRef}
              style={{
                position: "relative",
                zIndex: 10,
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <img
                src="./assets/about.png"
                alt="Nithwin V M"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  objectPosition: "bottom center",
                  filter: "drop-shadow(0 25px 55px rgba(0, 0, 0, 0.65))",
                  transition: "transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
              />
            </div>

            {/* HUD Card 1: Gen-AI Architecture (Top Left) */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              className="hero-floating-hud hud-top-left glass-card"
              style={{
                position: "absolute",
                padding: "11px 16px",
                borderRadius: "18px",
                zIndex: 20,
                pointerEvents: "none",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                border: "1px solid var(--border)",
                background: "var(--bg-card)",
                backdropFilter: "blur(24px)",
                boxShadow: "0 16px 40px rgba(0, 0, 0, 0.45)",
              }}
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "12px",
                  background: "rgba(123, 47, 255, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--purple-light)",
                }}
              >
                <RiCpuLine size={19} />
              </div>
              <div>
                <p style={{ fontSize: "0.68rem", fontFamily: "var(--font-mono)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)" }}>
                  Architecture
                </p>
                <p className="gradient-text" style={{ fontSize: "1.04rem", fontWeight: 800, fontFamily: "var(--font-jakarta)" }}>
                  GenAI & LLMs
                </p>
              </div>
            </motion.div>

            {/* HUD Card 2: Full Stack Cloud Performance (Mid Right) */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              className="hero-floating-hud hud-mid-right glass-card"
              style={{
                position: "absolute",
                padding: "11px 16px",
                borderRadius: "18px",
                zIndex: 20,
                pointerEvents: "none",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                border: "1px solid var(--border)",
                background: "var(--bg-card)",
                backdropFilter: "blur(24px)",
                boxShadow: "0 16px 40px rgba(0, 0, 0, 0.45)",
              }}
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "12px",
                  background: "rgba(0, 212, 255, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--cyan)",
                }}
              >
                <RiCodeSSlashLine size={19} />
              </div>
              <div>
                <p style={{ fontSize: "0.68rem", fontFamily: "var(--font-mono)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)" }}>
                  Cloud Systems
                </p>
                <p className="gradient-text" style={{ fontSize: "1.04rem", fontWeight: 800, fontFamily: "var(--font-jakarta)" }}>
                  99.9% Uptime
                </p>
              </div>
            </motion.div>

            {/* HUD Card 3: Production Systems (Bottom Left) */}
            <motion.div
              animate={{ y: [0, -8, 0], x: [0, 4, 0] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1.0 }}
              className="hero-floating-hud hud-bottom-left glass-card"
              style={{
                position: "absolute",
                padding: "11px 16px",
                borderRadius: "18px",
                zIndex: 20,
                pointerEvents: "none",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                border: "1px solid var(--border)",
                background: "var(--bg-card)",
                backdropFilter: "blur(24px)",
                boxShadow: "0 16px 40px rgba(0, 0, 0, 0.45)",
              }}
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "12px",
                  background: "rgba(0, 255, 209, 0.18)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--neon)",
                }}
              >
                <RiSparklingFill size={19} />
              </div>
              <div>
                <p style={{ fontSize: "0.68rem", fontFamily: "var(--font-mono)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)" }}>
                  Production Track
                </p>
                <p style={{ fontSize: "1.04rem", fontWeight: 800, fontFamily: "var(--font-jakarta)", color: "var(--text-primary)" }}>
                  10+ Shipped
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Story Scroll Invitation Bar */}
        <motion.div
          onClick={scrollToAbout}
          style={{
            marginTop: "32px",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            cursor: "pointer",
            width: "max-content",
          }}
          whileHover={{ x: 6 }}
          transition={{ duration: 0.3 }}
        >
          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              border: "1px solid var(--border)",
              background: "var(--bg-card)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--cyan)",
            }}
          >
            <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
              <RiArrowDownLine size={18} />
            </motion.div>
          </div>
          <span
            style={{
              fontSize: "0.8rem",
              fontFamily: "var(--font-mono), monospace",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "var(--text-secondary)",
            }}
          >
            Scroll to explore the story
          </span>
        </motion.div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
