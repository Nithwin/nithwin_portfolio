import React, { useState } from "react";
import {
  FaGithub,
  FaEnvelope,
  FaCopy,
  FaCheck,
  FaLinkedin,
} from "react-icons/fa";
import { SiLeetcode, SiMedium } from "react-icons/si";

export default function ContactInfo() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("vmnithwin@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <div className="contact-telemetry-col">
      <div className="contact-hud-card">
        <span className="eyebrow" style={{ marginBottom: "2px" }}>
          EMAIL
        </span>
        <div className="contact-email-hero">vmnithwin@gmail.com</div>

        <div className="contact-btn-row">
          <button
            type="button"
            className="pill-btn"
            onClick={handleCopyEmail}
            data-cursor="COPY"
            style={{
              borderColor: copiedEmail
                ? "var(--accent)"
                : "var(--border-strong)",
              color: copiedEmail ? "var(--accent)" : "inherit",
            }}
          >
            {copiedEmail ? <FaCheck size={11} /> : <FaCopy size={11} />}
            <span>{copiedEmail ? "COPIED" : "COPY EMAIL"}</span>
          </button>

          <a
            href="mailto:vmnithwin@gmail.com"
            className="btn-primary"
            data-cursor="EMAIL"
            style={{ padding: "8px 18px", fontSize: "12px" }}
          >
            <FaEnvelope size={11} />
            <span>SEND EMAIL ↗</span>
          </a>
        </div>
      </div>

      {/* Social Channels Matrix */}
      <div className="contact-social-grid">
        <a
          href="https://github.com/Nithwin"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-social-tile"
          data-cursor="GITHUB"
        >
          <div className="contact-social-icon">
            <FaGithub />
          </div>
          <div className="contact-social-text">
            <span className="contact-social-title">GitHub</span>
            <span className="contact-social-sub">@Nithwin</span>
          </div>
        </a>

        <a
          href="https://www.linkedin.com/in/nithwin-v-m-7b5b13252/"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-social-tile"
          data-cursor="LINKEDIN"
        >
          <div className="contact-social-icon">
            <FaLinkedin />
          </div>
          <div className="contact-social-text">
            <span className="contact-social-title">LinkedIn</span>
            <span className="contact-social-sub">Nithwin V M</span>
          </div>
        </a>

        <a
          href="https://leetcode.com/u/vmnithwin/"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-social-tile"
          data-cursor="LEETCODE"
        >
          <div className="contact-social-icon">
            <SiLeetcode />
          </div>
          <div className="contact-social-text">
            <span className="contact-social-title">LeetCode</span>
            <span className="contact-social-sub">@vmnithwin</span>
          </div>
        </a>

        <a
          href="https://medium.com/@vmnithwin/introducing-windmist-an-open-source-ai-coding-assistant-for-the-terminal-12165232f3f3"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-social-tile"
          data-cursor="MEDIUM"
        >
          <div className="contact-social-icon">
            <SiMedium />
          </div>
          <div className="contact-social-text">
            <span className="contact-social-title">Medium</span>
            <span className="contact-social-sub">Tech Articles</span>
          </div>
        </a>
      </div>
    </div>
  );
}
