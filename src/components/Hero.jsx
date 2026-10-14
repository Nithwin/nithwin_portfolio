import React from "react";
import { FaGithub } from "react-icons/fa";
import HeroMorphVisual from "./hero/HeroMorphVisual";

export default function Hero({ theme }) {
  return (
    <section className="hero-section">
      <div className="hero-grid">
        <div>
          <div className="eyebrow hero-eyebrow">
            NITHWIN · FULL STACK &amp; GENAI
          </div>
          <h1 className="hero-headline">
            Building <span className="accent-text">intelligent software</span> &amp;{" "}
            <span className="accent-text">scalable web</span> systems.
          </h1>
          <p className="hero-subtitle">
            I'm a software engineer crafting high-performance web platforms and
            GenAI tools, bridging algorithmic depth with clean, intuitive user experiences.
          </p>

          <div className="cta-row">
            <a href="#work" className="btn-primary" data-cursor="PROJECTS">
              <span>Explore Selected Works</span>
              <span>→</span>
            </a>
            <a
              href="https://github.com/Nithwin"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              data-cursor="GITHUB"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              <FaGithub size={16} />
              <span>GitHub Profile ↗</span>
            </a>
          </div>
        </div>

        {/* 3D Morphing Organic Smoke Sculpture (MDX.so inspired: Orb, Scorpio, Neural, Quantum) */}
        <HeroMorphVisual theme={theme} />
      </div>
    </section>
  );
}
