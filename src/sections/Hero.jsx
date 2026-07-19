import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { HiArrowRight } from "react-icons/hi";
import { RiDownloadLine, RiArrowDownLine } from "react-icons/ri";
import { useTheme } from "../context/ThemeContext";

const ROLES = [
  "Executing Generative AI & LLM Solutions...",
  "Scaling Cloud Native Full Stack Systems...",
  "Architecting High-Concurrency Web Platforms...",
  "Crafting Award-Winning Digital Realities...",
];

const Hero = () => {
  const { isDark } = useTheme();
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  const { scrollY } = useScroll();
  const yParallaxText = useTransform(scrollY, [0, 1200], [0, 60]);
  const yParallaxImage = useTransform(scrollY, [0, 1200], [0, 30]);

  // World-Class GSAP Staggered Entrance Timeline (Clean & Uncluttered)
  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.1 });
    tl.from(".hero-title-line", { opacity: 0, y: 40, stagger: 0.1, duration: 0.8, ease: "power4.out" })
      .from(".hero-terminal-box", { opacity: 0, y: 20, scale: 0.96, duration: 0.6, ease: "power3.out" }, "-=0.45")
      .from(".hero-bio", { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" }, "-=0.4")
      .from(".hero-social-row", { opacity: 0, y: 15, duration: 0.5, ease: "power3.out" }, "-=0.35")
      .from(".hero-cta-group", { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" }, "-=0.35")
      .from(".hero-visual-container", { opacity: 0, scale: 0.92, y: 35, duration: 1.1, ease: "power4.out" }, "-=0.85");
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

  // Premium 3D Magnetic Tilt Effect
  useEffect(() => {
    const el = imageRef.current;
    if (!el) return;
    
    // Set 3D perspective on parent for depth
    gsap.set(el.parentElement, { perspective: 1200 });

    const move = (e) => {
      // Calculate rotation based on cursor position relative to center of screen
      const rotX = ((e.clientY / window.innerHeight) - 0.5) * -16; // -8 to 8 deg
      const rotY = ((e.clientX / window.innerWidth) - 0.5) * 16;
      
      gsap.to(el, { 
        rotateX: rotX, 
        rotateY: rotY, 
        z: 30, // push out slightly
        duration: 1.2, 
        ease: "power2.out",
        transformPerspective: 1200
      });
    };

    const leave = () => {
      gsap.to(el, { rotateX: 0, rotateY: 0, z: 0, duration: 1.5, ease: "power3.out" });
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
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

  // Choose hero image based on theme
  const heroImage = isDark
    ? "./assets/about.png"
    : "./assets/file_00000000217081f88c1c299190a59705.png";

  return (
    <section
      ref={heroRef}
      id="home"
      style={{
        position: "relative",
        minHeight: "max(660px, 86vh)",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        // Added generous top gap (`paddingTop: "168px"`) so header never crowds the hero content!
        paddingTop: "168px",
        paddingBottom: "40px",
      }}
    >
      {/* Background Architectural Grid & Deep Aurora Spheres */}
      <div className="grid-bg" />
      <div
        style={{
          position: "absolute",
          top: "14%",
          left: "6%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          pointerEvents: "none",
          background: "radial-gradient(circle, rgba(123, 47, 255, 0.2) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "8%",
          right: "6%",
          width: "540px",
          height: "540px",
          borderRadius: "50%",
          pointerEvents: "none",
          background: "radial-gradient(circle, rgba(0, 212, 255, 0.16) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      <div className="container-main" style={{ position: "relative", zIndex: 10, width: "100%" }}>
        {/* Responsive CSS for Clean, Uncluttered Editorial Layout */}
        <style>{`
          @media (min-width: 1024px) {
            .hero-grid {
              flex-direction: row !important;
              justify-content: space-between !important;
              align-items: center !important;
              gap: 48px !important;
            }
            .hero-left {
              max-width: 610px !important;
              text-align: left !important;
            }
            .hero-right {
              width: clamp(340px, 42vw, 520px) !important;
              height: clamp(390px, 48vw, 560px) !important;
            }
            .hero-cta-group, .hero-social-row {
              justify-content: flex-start !important;
            }
          }
          @media (max-width: 1023px) {
            section#home {
              padding-top: 140px !important;
              min-height: auto !important;
              padding-bottom: 48px !important;
            }
            .hero-scroll-invite {
              margin-top: 48px !important;
              margin-bottom: 24px !important;
              justify-content: center !important;
            }
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
              width: clamp(240px, 70vw, 380px) !important;
              height: clamp(280px, 75vw, 420px) !important;
            }
            .hero-cta-group, .hero-social-row {
              justify-content: center !important;
            }
            .hero-bio {
              margin-left: auto !important;
              margin-right: auto !important;
            }
          }
          @media (max-width: 480px) {
            section#home {
              padding-top: 120px !important;
            }
            .hero-right {
              width: clamp(200px, 65vw, 300px) !important;
              height: clamp(240px, 70vw, 340px) !important;
            }
            .hero-cta-group {
              flex-direction: column !important;
              align-items: center !important;
              width: 100% !important;
            }
            .hero-cta-group .btn-primary,
            .hero-cta-group .btn-outline {
              width: 100% !important;
              justify-content: center !important;
            }
            .hero-terminal-box {
              padding: 10px 14px !important;
            }
          }
        `}</style>

        <div className="hero-grid" style={{ display: "flex", width: "100%" }}>
          {/* ===================== LEFT COLUMN: EDITORIAL TYPOGRAPHY & STORY ===================== */}
          <motion.div
            style={{ y: yParallaxText }}
            className="hero-left"
          >
            {/* Sleek, Executive Headline */}
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
                background: "rgba(14, 14, 22, 0.82)",
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
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "6px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#FF5F56", display: "inline-block" }} />
                  <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#FFBD2E", display: "inline-block" }} />
                  <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#27C93F", display: "inline-block" }} />
                </div>
                <span style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "#A0A0B8", letterSpacing: "0.08em" }}>
                  bash - nithwin.ai
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", paddingTop: "4px" }}>
                <span style={{ color: "var(--neon)", fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "0.95rem" }}>
                  ~ $
                </span>
                <span
                  style={{
                    color: "#F8F8FF",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 500,
                    fontSize: "clamp(0.82rem, 1.5vw, 1.02rem)",
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
                marginBottom: "24px",
              }}
            >
              Turning visionary concepts into high-concurrency web ecosystems and intelligent Generative AI platforms. I bridge aesthetic design mastery with robust, cloud-native architectural engineering to create award-winning digital experiences.
            </p>

            {/* Connect Row placed right above CTAs as requested */}
            <div
              className="hero-social-row"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "28px",
              }}
            >
              <span
                style={{
                  fontSize: "0.78rem",
                  fontFamily: "var(--font-mono), monospace",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                  marginRight: "4px",
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

            {/* CTAs */}
            <div className="hero-cta-group" style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
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
          </motion.div>

          {/* ===================== RIGHT COLUMN: CLEAN ARCHITECTURAL FRAME ===================== */}
          <motion.div
            className="hero-right hero-visual-container"
            style={{
              y: yParallaxImage,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
            }}
          >
            {/* Luminous Architectural Glass Card Wrapper that looks pristine in Light & Dark mode */}
            <div
              ref={imageRef}
              style={{
                position: "relative",
                zIndex: 10,
                width: "100%",
                height: "100%",
                borderRadius: "32px",
                padding: "18px",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-card)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                transition: "border-color 0.4s ease, box-shadow 0.4s ease", // removed 'all' so GSAP can handle transform smoothly
                transformStyle: "preserve-3d", // enable 3D children
              }}
            >
              {/* Soft Ambient Inner Glow */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: isDark
                    ? "radial-gradient(circle at center, rgba(123, 47, 255, 0.18) 0%, transparent 80%)"
                    : "radial-gradient(circle at center, rgba(123, 47, 255, 0.08) 0%, transparent 80%)",
                  pointerEvents: "none",
                }}
              />

              {/* Character Image — swaps between dark and light mode */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  zIndex: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transformStyle: "preserve-3d",
                  transform: "translateZ(40px)", // Popping effect!
                }}
              >
                <img
                  key={heroImage}
                  src={heroImage}
                  alt="Nithwin V M"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    transform: isDark ? "scale(1.02)" : "scale(1.3)",
                    transition: "transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Story Scroll Invitation Bar */}
        <motion.div
          onClick={scrollToAbout}
          className="hero-scroll-invite"
          style={{
            marginTop: "44px",
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
