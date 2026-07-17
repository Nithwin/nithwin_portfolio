import React, { useRef } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { RiArrowUpLine, RiHeartFill } from "react-icons/ri";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "leetcode", label: "LeetCode" },
  { id: "contact", label: "Contact" },
];

const SOCIALS = [
  { href: "https://github.com/Nithwin", icon: FaGithub, label: "GitHub" },
  { href: "https://www.linkedin.com/in/nithwin-v-m-7b5b13252/", icon: FaLinkedin, label: "LinkedIn" },
  { href: "https://www.instagram.com/_nithwin", icon: FaInstagram, label: "Instagram" },
  { href: "https://leetcode.com/u/vmnithwin/", icon: SiLeetcode, label: "LeetCode" },
];

const Footer = () => {
  const videoRef = useRef(null);
  React.useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.3;
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: "smooth" });
  };

  return (
    <footer style={{ borderTop: "1px solid var(--border)", background: "var(--bg-secondary)", paddingTop: "64px", paddingBottom: "32px" }}>
      <div className="container-main">
        {/* Top Row */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "40px", justifyContent: "space-between", marginBottom: "48px" }}>
          {/* Brand */}
          <div style={{ maxWidth: "280px" }}>
            <div style={{ height: "40px", marginBottom: "16px" }}>
              <video ref={videoRef} src="./assets/nithwin.mp4" loop muted autoPlay playsInline style={{ height: "100%", width: "auto" }} />
            </div>
            <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "var(--text-muted)" }}>
              Building digital experiences that inspire. Full Stack Developer & UI/UX Designer from India.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p style={{ fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-muted)", marginBottom: "16px" }}>
              Navigation
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 24px" }}>
              {NAV_LINKS.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--text-secondary)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "color 0.2s",
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
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
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
        <div style={{ height: "1px", background: "var(--border)", marginBottom: "24px" }} />

        {/* Bottom */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "12px", fontSize: "0.75rem", color: "var(--text-muted)" }}>
          <p>© {new Date().getFullYear()} Nithwin V M. All rights reserved.</p>
          <p style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            Made with <RiHeartFill size={12} color="#EF4444" /> using React + GSAP
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
