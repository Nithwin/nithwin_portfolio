import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import LogoPill from "./LogoPill";
import DesktopNav from "./DesktopNav";
import ThemeToggle from "./ThemeToggle";
import { MobileToggle, MobileDropdown } from "./MobileMenu";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "publications", label: "Research" },
  { id: "skills", label: "Skills" },
  { id: "coding-profiles", label: "Profiles" },
  { id: "contact", label: "Contact" },
];

const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const videoRef = useRef(null);
  const isScrollingToRef = useRef(false);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.4;
  }, []);

  // High-Precision Active Section & Scroll Detector
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // If user clicked a navigation link, lock activeSection until scroll finishes
      if (isScrollingToRef.current) return;

      // Check if user has scrolled to the bottom of the page (for Contact or short bottom sections)
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        setActiveSection("contact");
        return;
      }

      // Check which section is directly under the header line (scrollY + ~240px)
      const scrollPos = window.scrollY + 240;
      let currentId = "home";

      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            currentId = item.id;
          }
        }
      }

      setActiveSection(currentId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    // Set active section immediately and lock scroll detection during smooth scroll animation
    setActiveSection(id);
    isScrollingToRef.current = true;

    window.scrollTo({ top: el.offsetTop - 90, behavior: "smooth" });
    setMobileOpen(false);

    setTimeout(() => {
      isScrollingToRef.current = false;
    }, 1000);
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
          {/* Logo Badge Capsule */}
          <LogoPill isDark={isDark} onClick={() => scrollTo("home")} videoRef={videoRef} />

          {/* Inject responsive display classes */}
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

          {/* Desktop Navigation Link pill */}
          <DesktopNav items={NAV_ITEMS} activeSection={activeSection} scrollTo={scrollTo} isDark={isDark} />

          {/* Right actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />

            {/* Let's Talk CTA button */}
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

            {/* Mobile menu trigger */}
            <MobileToggle isOpen={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)} />
          </div>
        </div>
      </motion.header>

      {/* Mobile drop-down list */}
      <MobileDropdown
        isOpen={mobileOpen}
        items={NAV_ITEMS}
        activeSection={activeSection}
        onSelect={scrollTo}
        isDark={isDark}
      />
    </>
  );
};

export default Navigation;
