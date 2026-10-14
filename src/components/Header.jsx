import React, { useEffect, useRef } from "react";
import { FaGithub, FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";

export default function Header({
  activeNav,
  scrollToSection,
  theme,
  onToggleTheme,
  mobileMenuOpen,
  setMobileMenuOpen,
}) {
  const videoLogoRef = useRef(null);

  useEffect(() => {
    if (videoLogoRef.current) {
      videoLogoRef.current.playbackRate = 0.5;
      videoLogoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <>
      <div className="scroll-bar" id="scroll-bar"></div>

      <header className="site-header">
        <div className="header-inner">
          {/* Logo Pill */}
          <a
            href="#top"
            className="lightning-brand-pill"
            aria-label="Nithwin (Nithwin V M) — Portfolio"
            title="Nithwin — Full Stack & AI Systems Engineer"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("top");
            }}
          >
            <div className="logo-video-mask">
              <video
                ref={videoLogoRef}
                autoPlay
                loop
                muted
                playsInline
                className="logo-lightning-video"
                src="/assets/nithwin.mp4"
              />
            </div>
          </a>

          {/* Desktop Nav - Pill Links Container */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            <a
              href="#top"
              className={`nav-link ${activeNav === "top" ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("top");
              }}
              data-cursor="HOME"
            >
              Home
            </a>
            <a
              href="#about"
              className={`nav-link ${activeNav === "about" ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("about");
              }}
              data-cursor="ABOUT"
            >
              About
            </a>
            <a
              href="#work"
              className={`nav-link ${activeNav === "work" ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("work");
              }}
              data-cursor="PROJECTS"
            >
              Projects
            </a>
            <a
              href="#skills"
              className={`nav-link ${activeNav === "skills" ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("skills");
              }}
              data-cursor="SKILLS"
            >
              Skills
            </a>
            <a
              href="#certs"
              className={`nav-link ${activeNav === "certs" ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("certs");
              }}
              data-cursor="CERTS"
            >
              Certificates
            </a>
            <a
              href="#contact"
              className={`nav-link ${activeNav === "contact" ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
              data-cursor="CONTACT"
            >
              Contact
            </a>
          </nav>

          {/* Header Action Buttons: GitHub, Circular Theme Toggle (NO text), Let's Talk CTA */}
          <div className="header-actions">
            <a
              href="https://github.com/Nithwin"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-circle-btn nav-github-btn"
              data-cursor="GITHUB"
              aria-label="GitHub Profile"
              title="GitHub Profile"
            >
              <FaGithub size={15} />
            </a>

            {/* Circular Theme Toggle Icon Button — Zero text */}
            <button
              id="theme-toggle"
              className="icon-circle-btn theme-toggle-btn"
              onClick={onToggleTheme}
              data-cursor="THEME"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <span id="theme-icon" aria-hidden="true">
                {theme === "dark" ? (
                  <FaSun size={14} style={{ color: "var(--accent)" }} />
                ) : (
                  <FaMoon size={14} style={{ color: "var(--accent)" }} />
                )}
              </span>
            </button>

            {/* Pill CTA Button (Let's Talk) */}
            <a
              href="#contact"
              className="nav-cta-btn"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
              data-cursor="CONTACT"
            >
              <span>Let's Talk</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              className="icon-circle-btn mobile-hamburger-btn mobile-menu-btn"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="mobile-nav-panel mobile-nav-drawer">
            <a
              href="#top"
              className={`mobile-nav-link ${activeNav === "top" ? "active" : ""}`}
              onClick={() => scrollToSection("top")}
            >
              Home
            </a>
            <a
              href="#about"
              className={`mobile-nav-link ${activeNav === "about" ? "active" : ""}`}
              onClick={() => scrollToSection("about")}
            >
              About
            </a>
            <a
              href="#work"
              className={`mobile-nav-link ${activeNav === "work" ? "active" : ""}`}
              onClick={() => scrollToSection("work")}
            >
              Projects
            </a>
            <a
              href="#skills"
              className={`mobile-nav-link ${activeNav === "skills" ? "active" : ""}`}
              onClick={() => scrollToSection("skills")}
            >
              Skills
            </a>
            <a
              href="#certs"
              className={`mobile-nav-link ${activeNav === "certs" ? "active" : ""}`}
              onClick={() => scrollToSection("certs")}
            >
              Certificates
            </a>
            <a
              href="#contact"
              className={`mobile-nav-link ${activeNav === "contact" ? "active" : ""}`}
              onClick={() => scrollToSection("contact")}
            >
              Contact
            </a>
            <div style={{ paddingTop: "8px" }}>
              <button
                className="pill-btn theme-toggle-btn"
                onClick={onToggleTheme}
                style={{ width: "100%", justifyContent: "center", gap: "10px" }}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                <span id="theme-icon" aria-hidden="true">
                  {theme === "dark" ? (
                    <FaSun size={14} style={{ color: "var(--accent)" }} />
                  ) : (
                    <FaMoon size={14} style={{ color: "var(--accent)" }} />
                  )}
                </span>
                <span>{theme === "dark" ? "LIGHT MODE" : "DARK MODE"}</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
