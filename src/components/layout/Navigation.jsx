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
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section automatically
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
    window.scrollTo({ top: el.offsetTop - 90, behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      {/* FLOATING PILL NAVBAR */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: "fixed",
          top: scrolled ? "12px" : "20px",
          left: 0,
          right: 0,
          zIndex: 1000,
          display: "flex",
          justifyContent: "center",
          padding: "0 16px",
          transition: "top 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            pointerEvents: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
            width: "100%",
            maxWidth: "1060px",
            height: scrolled ? "64px" : "72px",
            padding: "8px 16px",
            borderRadius: "50px",
            background: scrolled
              ? (isDark ? "rgba(14, 14, 22, 0.88)" : "rgba(255, 255, 255, 0.88)")
              : (isDark ? "rgba(14, 14, 22, 0.65)" : "rgba(255, 255, 255, 0.75)"),
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: isDark
              ? "1px solid rgba(255, 255, 255, 0.12)"
              : "1px solid rgba(0, 0, 0, 0.08)",
            boxShadow: scrolled
              ? "0 12px 40px rgba(0, 0, 0, 0.35), 0 0 24px rgba(123, 47, 255, 0.15)"
              : "0 8px 32px rgba(0, 0, 0, 0.2), 0 0 16px rgba(123, 47, 255, 0.1)",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* LOGO PILL (with curved border around video) */}
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => scrollTo("home")}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              height: "44px",
              padding: "2px 14px",
              borderRadius: "50px",
              background: isDark ? "#0A0A12" : "#0A0A12", // Keep dark pill backdrop so black video blends seamlessly!
              border: isDark
                ? "1.5px solid rgba(123, 47, 255, 0.5)"
                : "2px solid #7B2FFF",
              boxShadow: isDark
                ? "0 0 20px rgba(123, 47, 255, 0.3)"
                : "0 4px 16px rgba(123, 47, 255, 0.25)",
              overflow: "hidden",
              flexShrink: 0,
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
                height: "36px",
                width: "auto",
                display: "block",
                objectFit: "contain",
                borderRadius: "20px",
              }}
            />
          </motion.div>

          {/* DESKTOP LINKS (only visible on large screens) */}
          <style>{`
            @media (min-width: 1024px) {
              .desktop-nav-group { display: flex !important; }
              .mobile-toggle-btn { display: none !important; }
            }
            @media (max-width: 1023px) {
              .desktop-nav-group { display: none !important; }
              .mobile-toggle-btn { display: flex !important; }
            }
          `}</style>

          <div
            className="desktop-nav-group"
            style={{
              display: "none",
              alignItems: "center",
              gap: "4px",
              background: isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.03)",
              padding: "6px",
              borderRadius: "50px",
              border: "1px solid var(--border)",
            }}
          >
            {NAV_ITEMS.map(({ id, label }) => {
              const isActive = activeSection === id;
              return (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  style={{
                    position: "relative",
                    padding: "8px 18px",
                    borderRadius: "50px",
                    fontSize: "0.88rem",
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? "#FFFFFF" : "var(--text-secondary)",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "color 0.3s ease",
                    zIndex: 1,
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "50px",
                        background: "linear-gradient(135deg, #7B2FFF, #00D4FF)",
                        boxShadow: "0 4px 15px rgba(123, 47, 255, 0.4)",
                        zIndex: -1,
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {label}
                </button>
              );
            })}
          </div>

          {/* RIGHT ACTIONS */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
            {/* THEME TOGGLE */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
                border: "1px solid var(--border)",
                cursor: "pointer",
              }}
            >
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <RiSunLine size={19} color="#FFD700" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <RiMoonClearLine size={19} color="#7B2FFF" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* CTA BUTTON (only visible on desktop) */}
            <div className="desktop-nav-group" style={{ display: "none" }}>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(123, 47, 255, 0.5)" }}
                whileTap={{ scale: 0.96 }}
                onClick={() => scrollTo("contact")}
                className="btn-primary"
                style={{
                  padding: "10px 24px",
                  fontSize: "0.85rem",
                  borderRadius: "50px",
                }}
              >
                <span>Let's Talk</span>
              </motion.button>
            </div>

            {/* MOBILE MENU TOGGLE (strictly mobile only via exact CSS media query) */}
            <motion.button
              onClick={() => setMobileOpen(!mobileOpen)}
              whileTap={{ scale: 0.9 }}
              className="mobile-toggle-btn"
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                display: "none",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                cursor: "pointer",
              }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <RiCloseLine size={22} color="var(--text-primary)" />
              ) : (
                <RiMenu4Line size={22} color="var(--text-primary)" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* MOBILE MENU DROPDOWN */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mobile-toggle-btn"
            style={{
              position: "fixed",
              top: scrolled ? "84px" : "100px",
              left: "16px",
              right: "16px",
              zIndex: 999,
              background: isDark
                ? "rgba(14, 14, 22, 0.96)"
                : "rgba(255, 255, 255, 0.96)",
              border: "1px solid var(--border)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderRadius: "28px",
              padding: "24px",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4)",
              display: "none",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {NAV_ITEMS.map(({ id, label }, i) => {
              const isActive = activeSection === id;
              return (
                <motion.button
                  key={id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => scrollTo(id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    textAlign: "left",
                    padding: "14px 18px",
                    borderRadius: "16px",
                    fontSize: "1.05rem",
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? "#FFFFFF" : "var(--text-secondary)",
                    background: isActive
                      ? "linear-gradient(135deg, rgba(123, 47, 255, 0.8), rgba(0, 212, 255, 0.6))"
                      : "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  <span>{label}</span>
                  {isActive && (
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "#00FFD1",
                        boxShadow: "0 0 10px #00FFD1",
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
            <div
              style={{
                borderTop: "1px solid var(--border)",
                marginTop: "12px",
                paddingTop: "16px",
              }}
            >
              <button
                onClick={() => scrollTo("contact")}
                className="btn-primary"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  padding: "14px",
                  borderRadius: "50px",
                }}
              >
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
