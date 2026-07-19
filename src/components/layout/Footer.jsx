import React, { useRef } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { RiArrowUpLine, RiHeartFill } from "react-icons/ri";
import { useTheme } from "../../context/ThemeContext";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "coding-profiles", label: "Profiles" },
  { id: "contact", label: "Contact" },
];

const SOCIALS = [
  { href: "https://github.com/Nithwin", icon: FaGithub, label: "GitHub" },
  { href: "https://www.linkedin.com/in/nithwin-v-m-7b5b13252/", icon: FaLinkedin, label: "LinkedIn" },
  { href: "https://www.instagram.com/_nithwin", icon: FaInstagram, label: "Instagram" },
  { href: "https://leetcode.com/u/vmnithwin/", icon: SiLeetcode, label: "LeetCode" },
];

const Footer = () => {
  const { isDark } = useTheme();
  const videoRef = useRef(null);
  React.useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.3;
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: "smooth" });
  };

  return (
    <footer style={{ borderTop: "1px solid var(--border)", background: "var(--bg-secondary)", paddingTop: "72px", paddingBottom: "36px" }}>
      <div className="container-main">
        {/* Top Row */}
        <div className="footer-top-row">
          {/* Brand — with LogoPill-style video */}
          <div style={{ maxWidth: "320px" }}>
            {/* Logo Video Pill — identical style to header LogoPill */}
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => scrollTo("home")}
              style={{
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                height: "48px",
                padding: "2px 16px",
                borderRadius: "50px",
                background: "#0A0A12",
                border: isDark
                  ? "1.5px solid rgba(123, 47, 255, 0.5)"
                  : "2px solid #7B2FFF",
                boxShadow: isDark
                  ? "0 0 20px rgba(123, 47, 255, 0.3)"
                  : "0 4px 16px rgba(123, 47, 255, 0.25)",
                overflow: "hidden",
                marginBottom: "20px",
                transition: "border-color 0.3s ease, box-shadow 0.3s ease",
              }}
            >
              <video
                ref={videoRef}
                src="./assets/nithwin.mp4"
                loop
                muted
                autoPlay
                playsInline
                style={{
                  height: "40px",
                  width: "auto",
                  display: "block",
                  objectFit: "contain",
                  borderRadius: "20px",
                }}
              />
            </motion.div>

            <p style={{ fontSize: "0.9rem", lineHeight: 1.75, color: "var(--text-muted)" }}>
              Building digital experiences that inspire. Full Stack Developer & GenAI Engineer from India.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p style={{ fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-muted)", marginBottom: "18px" }}>
              Navigation
            </p>
            <div className="footer-nav-links">
              {NAV_LINKS.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--text-secondary)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "color 0.2s",
                    padding: "4px 0",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "var(--purple-light)")}
                  onMouseLeave={(e) => (e.target.style.color = "var(--text-secondary)")}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Socials + Back to top */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
            <p style={{ fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-muted)", marginBottom: "2px" }}>
              Socials
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              {SOCIALS.map(({ href, icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    transition: "border-color 0.3s, box-shadow 0.3s",
                  }}
                >
                  <Icon size={16} style={{ color: "var(--text-secondary)" }} />
                </motion.a>
              ))}
            </div>
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              whileHover={{ scale: 1.08, y: -2 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "0.85rem",
                fontWeight: 500,
                color: "var(--purple-light)",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              <RiArrowUpLine size={16} />
              Back to top
            </motion.button>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "var(--border)", marginBottom: "28px" }} />

        {/* Bottom */}
        <div className="footer-bottom-row">
          <p>© {new Date().getFullYear()} Nithwin V M. All rights reserved.</p>
          <p style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            Made with <RiHeartFill size={12} color="#EF4444" /> using React + GSAP
          </p>
        </div>
      </div>

      {/* Footer-specific responsive styles */}
      <style>{`
        .footer-top-row {
          display: flex;
          flex-wrap: wrap;
          gap: 48px;
          justify-content: space-between;
          margin-bottom: 56px;
        }
        .footer-nav-links {
          display: flex;
          flex-wrap: wrap;
          gap: 12px 28px;
        }
        .footer-bottom-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          font-size: 0.78rem;
          color: var(--text-muted);
        }
        @media (max-width: 768px) {
          .footer-top-row {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 36px;
          }
          .footer-top-row > div {
            max-width: 100% !important;
          }
          .footer-nav-links {
            justify-content: center;
          }
          .footer-bottom-row {
            justify-content: center;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
