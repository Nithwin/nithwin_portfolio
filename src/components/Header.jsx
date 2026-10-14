import React, { useEffect, useRef } from "react";
import { FaGithub, FaBars, FaTimes } from "react-icons/fa";

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
    <header className="site-header">
      <div className="header-inner">
        <a
          href="#top"
          className="lightning-brand-pill"
          aria-label="Nithwin V M"
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

        {/* Desktop Nav */}
        <nav className="desktop-nav nav-center" aria-label="Main Navigation">
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
            Skills &amp; Activity
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
            data-cursor="CONNECT"
          >
            Contact
          </a>
        </nav>

        {/* Action Buttons: GitHub, Theme Toggle, Mobile Hamburger */}
        <div className="header-actions header-right">
          <a
            href="https://github.com/Nithwin"
            target="_blank"
            rel="noopener noreferrer"
            className="pill-btn nav-github-btn"
            data-cursor="GITHUB"
            aria-label="GitHub Profile"
          >
            <FaGithub size={15} />
          </a>

          <button
            id="theme-toggle"
            className="pill-btn theme-toggle-btn"
            onClick={onToggleTheme}
            data-cursor="THEME"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <span className="theme-toggle-indicator">
              <span className="theme-toggle-dot"></span>
            </span>
            <span className="theme-toggle-text">
              {theme === "dark" ? "LIGHT" : "DARK"}
            </span>
          </button>

          <button
            className="pill-btn mobile-hamburger-btn mobile-menu-btn"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
          </button>
        </div>
      </div>

      <div className="scroll-bar" id="scroll-bar"></div>

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
        </div>
      )}
    </header>
  );
}
