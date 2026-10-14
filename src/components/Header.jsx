import React, { useEffect, useRef } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaSun,
  FaMoon,
} from "react-icons/fa";

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

  // Automatically close mobile menu when window is resized to desktop width (e.g. maximized)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setMobileMenuOpen]);

  const navLinks = [
    { id: "top", label: "Home", num: "01" },
    { id: "about", label: "About", num: "02" },
    { id: "work", label: "Projects", num: "03" },
    { id: "skills", label: "Skills", num: "04" },
    { id: "certs", label: "Certificates", num: "05" },
    { id: "contact", label: "Contact", num: "06" },
  ];

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
            {navLinks.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`nav-link ${activeNav === id ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(id);
                }}
                data-cursor={label.toUpperCase()}
              >
                {label}
              </a>
            ))}
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

            {/* Mobile Hamburger / Close Button */}
            <button
              className="icon-circle-btn mobile-hamburger-btn mobile-menu-btn"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
            </button>
          </div>
        </div>

        {/* Upgraded Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-nav-panel mobile-nav-drawer">
            <div className="mobile-nav-links">
              {navLinks.map(({ id, label, num }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`mobile-nav-link ${activeNav === id ? "active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(id);
                  }}
                >
                  <span className="mobile-nav-num">{num}</span>
                  <span className="mobile-nav-title">{label}</span>
                  <span className="mobile-nav-arrow">→</span>
                </a>
              ))}
            </div>

            <div className="mobile-drawer-footer">
              <a
                href="#contact"
                className="btn-primary mobile-cta-btn"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contact");
                }}
              >
                <span>Let's Talk ↗</span>
              </a>

              <div className="mobile-socials-row">
                <a
                  href="https://github.com/Nithwin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-circle-btn"
                  title="GitHub"
                >
                  <FaGithub size={15} />
                </a>
                <a
                  href="https://www.linkedin.com/in/nithwin-v-m-7b5b13252/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-circle-btn"
                  title="LinkedIn"
                >
                  <FaLinkedin size={15} />
                </a>
                <a
                  href="mailto:vmnithwin@gmail.com"
                  className="icon-circle-btn"
                  title="Email"
                >
                  <FaEnvelope size={14} />
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
