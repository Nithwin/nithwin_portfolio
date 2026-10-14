import React from "react";
import FooterWordmark from "./FooterWordmark";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="monumental-footer" id="footer">
      <div className="container">
        <div className="footer-columns">
          <div>
            <div className="footer-col-title">NITHWIN</div>
            <p className="work-desc" style={{ maxWidth: "34ch" }}>
              Full Stack, C++20 Systems &amp; Generative AI Engineer based in
              India. Crafting high-concurrency backends, LLM CLI agents, and
              award-winning digital experiences.
            </p>
          </div>

          <div>
            <div className="footer-col-title">NAVIGATION</div>
            <div className="footer-link-list">
              <a href="#top">Home</a>
              <a href="#about">About</a>
              <a href="#work">Projects</a>
              <a href="#skills">Skills &amp; Activity</a>
              <a href="#certs">Certificates</a>
              <a href="#contact">Contact</a>
            </div>
          </div>

          <div>
            <div className="footer-col-title">PROJECTS</div>
            <div className="footer-link-list">
              <a
                href="https://windmist.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                WindMist v1.0.1 (Go AI CLI) ↗
              </a>
              <a
                href="https://github.com/Nithwin"
                target="_blank"
                rel="noopener noreferrer"
              >
                Kernel-Lab (C++20 OS Lab) ↗
              </a>
              <a
                href="https://github.com/Nithwin"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mini-Kafka (Log Broker) ↗
              </a>
              <a
                href="https://ieeexplore.ieee.org/iel8/11502027/11502031/11502277.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                CA-YOLOv8 (IEEE Xplore) ↗
              </a>
              <a
                href="https://github.com/Nithwin/ShadowCoders"
                target="_blank"
                rel="noopener noreferrer"
              >
                ShadowCoders (Dev Platform) ↗
              </a>
            </div>
          </div>

          <div>
            <div className="footer-col-title">PROFILES &amp; STATUS</div>
            <div className="footer-link-list">
              <a
                href="https://github.com/Nithwin"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub: @Nithwin ↗
              </a>
              <a
                href="https://medium.com/@vmnithwin/introducing-windmist-an-open-source-ai-coding-assistant-for-the-terminal-12165232f3f3"
                target="_blank"
                rel="noopener noreferrer"
              >
                Medium: @vmnithwin ↗
              </a>
              <a
                href="https://nithwin.site/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Web: nithwin.site ↗
              </a>
              <span
                style={{
                  color: "var(--accent)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  marginTop: "4px",
                }}
              >
                ● Open to SDE &amp; AI Roles
              </span>
            </div>
          </div>
        </div>

        <div
          className="footer-brand-stage"
          data-cursor="BACK TO TOP ↑"
          onClick={scrollToTop}
        >
          <div className="footer-lightning-pill">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="logo-lightning-video footer-lightning-video"
              src="/assets/nithwin.mp4"
            />
          </div>
          <FooterWordmark />
        </div>

        <div className="footer-bottom-bar">
          <span>© 2026 NITHWIN V M. ALL RIGHTS RESERVED.</span>
          <span>Tamil Nadu, India</span>
          <a
            href="#top"
            className="pill-btn"
            data-cursor="TOP"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
          >
            BACK TO TOP ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
