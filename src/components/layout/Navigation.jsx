import React, { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { FaSun, FaMoon, FaBars, FaTimes, FaFileDownload } from "react-icons/fa";

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Research", id: "publications" },
  { label: "Skills", id: "skills" },
  { label: "Profiles", id: "coding-profiles" },
  { label: "Contact", id: "contact" },
];

const Navigation = () => {
  const { isDark, toggleTheme } = useTheme();
  const [active, setActive] = useState("home");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
      let current = "home";
      for (const sec of sections) {
        if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setDrawerOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="floating-dock-wrap" style={{ transition: "all 0.3s ease" }}>
        <nav
          className="floating-dock"
          style={{
            transform: scrolled ? "scale(0.98)" : "scale(1)",
            boxShadow: scrolled
              ? "0 24px 50px -10px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.12)"
              : undefined,
          }}
        >
          {/* Brand Logo & Available Indicator */}
          <button
            onClick={() => scrollTo("home")}
            className="dock-logo"
            style={{ cursor: "pointer" }}
            aria-label="Nithwin V M - Home"
          >
            <span className="dock-status-dot" title="Available for opportunities" />
            <span style={{ fontWeight: 800, letterSpacing: "-0.03em" }}>NITHWIN</span>
          </button>

          {/* Desktop Nav Items */}
          <div className="dock-links" style={{ display: "none" }}>
            {/* Handled by media query inline below */}
          </div>

          <div
            className="dock-nav-desktop"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            {NAV_LINKS.map((link) => {
              const isActive = active === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`dock-item ${isActive ? "active" : ""}`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Actions: Theme Toggle & Resume */}
          <div className="dock-actions">
            <button
              onClick={toggleTheme}
              className="dock-icon-btn"
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              aria-label="Toggle theme"
            >
              {isDark ? <FaSun size={14} color="#f4b942" /> : <FaMoon size={14} />}
            </button>

            <a
              href="/resume.pdf"
              download
              className="dock-icon-btn"
              title="Download Resume"
              aria-label="Download Resume"
              style={{
                background: "var(--accent-dim)",
                borderColor: "rgba(56, 189, 248, 0.3)",
                color: "var(--accent)",
              }}
            >
              <FaFileDownload size={13} />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setDrawerOpen((prev) => !prev)}
              className="dock-icon-btn dock-mobile-toggle"
              aria-label="Toggle navigation menu"
            >
              {drawerOpen ? <FaTimes size={15} /> : <FaBars size={15} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99,
            backgroundColor: "rgba(0, 0, 0, 0.65)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className="glass-card"
            style={{
              width: "100%",
              maxWidth: "380px",
              padding: "32px 24px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              textAlign: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ marginBottom: "12px" }}>
              <span className="dock-logo" style={{ justifyContent: "center" }}>
                <span className="dock-status-dot" />
                <span>NITHWIN V M</span>
              </span>
            </div>
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`dock-item ${active === link.id ? "active" : ""}`}
                style={{
                  padding: "12px 18px",
                  fontSize: "16px",
                  width: "100%",
                }}
              >
                {link.label}
              </button>
            ))}
            <div style={{ marginTop: "16px", display: "flex", gap: "10px", justifyContent: "center" }}>
              <a
                href="/resume.pdf"
                download
                className="btn-pill-primary"
                style={{ width: "100%", padding: "11px 20px" }}
              >
                <FaFileDownload size={13} /> Resume
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Responsive CSS helper */}
      <style>{`
        @media (max-width: 860px) {
          .dock-nav-desktop {
            display: none !important;
          }
          .dock-mobile-toggle {
            display: flex !important;
          }
        }
        @media (min-width: 861px) {
          .dock-mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navigation;
