import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiMenu4Line, RiCloseLine, RiSunLine, RiMoonClearLine } from "react-icons/ri";
import { useTheme } from "../../context/ThemeContext";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "leetcode", label: "LeetCode" },
  { id: "contact", label: "Contact" },
];

const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.4;
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section
  useEffect(() => {
    const sectionEls = NAV_ITEMS.map(({ id }) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.35, rootMargin: "-80px 0px 0px 0px" }
    );
    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.offsetTop - 72, behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      {/* NAV BAR */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: scrolled
            ? (isDark ? "rgba(10,10,18,0.88)" : "rgba(245,245,255,0.88)")
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          transition: "background 0.35s ease, backdrop-filter 0.35s ease, border-color 0.35s ease",
        }}
      >
        <div className="container-main" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => scrollTo("home")}
            style={{ cursor: "pointer", height: "36px" }}
          >
            <video
              ref={videoRef}
              src="./assets/nithwin.mp4"
              loop muted autoPlay playsInline
              style={{ height: "100%", width: "auto" }}
            />
          </motion.div>

          {/* Desktop Links */}
          <div style={{ display: "flex", alignItems: "center", gap: "32px" }} className="hidden lg:flex">
            {NAV_ITEMS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`nav-link ${activeSection === id ? "active" : ""}`}
                style={{ fontSize: "0.9rem" }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Right Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                cursor: "pointer",
              }}
            >
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <RiSunLine size={18} color="#FFD700" />
                  </motion.div>
                ) : (
                  <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <RiMoonClearLine size={18} color="#7B2FFF" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("contact")}
              className="btn-primary hidden lg:flex"
              style={{ padding: "10px 24px", fontSize: "0.85rem" }}
            >
              <span>Let's Talk</span>
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              onClick={() => setMobileOpen(!mobileOpen)}
              whileTap={{ scale: 0.9 }}
              className="lg:hidden"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                cursor: "pointer",
              }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <RiCloseLine size={22} color="var(--text-primary)" /> : <RiMenu4Line size={22} color="var(--text-primary)" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden"
            style={{
              position: "fixed",
              top: "80px",
              left: "16px",
              right: "16px",
              zIndex: 99,
              background: isDark ? "rgba(14,14,22,0.96)" : "rgba(255,255,255,0.96)",
              border: "1px solid var(--border)",
              backdropFilter: "blur(24px)",
              borderRadius: "20px",
              padding: "20px",
            }}
          >
            {NAV_ITEMS.map(({ id, label }, i) => (
              <motion.button
                key={id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => scrollTo(id)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: activeSection === id ? "var(--purple)" : "var(--text-secondary)",
                  background: activeSection === id ? "rgba(123,47,255,0.08)" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                {label}
              </motion.button>
            ))}
            <div style={{ borderTop: "1px solid var(--border)", marginTop: "12px", paddingTop: "12px" }}>
              <button onClick={() => scrollTo("contact")} className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                <span>Let's Talk</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
