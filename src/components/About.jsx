import React, { useEffect } from "react";

export default function About() {
  useEffect(() => {
    const container = document.getElementById("scrolly-text-container");
    const scrollBar = document.getElementById("scroll-bar");
    const timelineGlow = document.getElementById("timeline-progress-bar");
    if (!container) return;

    const rawText =
      "I build software where performance meets intelligence. From developing full-stack web platforms and LLM-powered tools to solving 800+ algorithmic problems and publishing IEEE-recognized computer vision research, every system is designed to be fast, reliable, and built to scale.";
    const rawWords = rawText.trim().split(/\s+/);
    const highlightSet = new Set([
      "performance",
      "intelligence.",
      "full-stack",
      "LLM-powered",
      "800+",
      "algorithmic",
      "IEEE-recognized",
      "computer",
      "vision",
      "fast,",
      "reliable,",
      "scale.",
    ]);

    container.innerHTML = rawWords
      .map((w) => {
        const isAcc = highlightSet.has(w);
        return `<span class="scrolly-word ${
          isAcc ? "accent-word" : ""
        }">${w}</span>`;
      })
      .join(" ");

    const wordSpans = container.querySelectorAll(".scrolly-word");
    const aboutSection = document.getElementById("about");
    const timelineNodes = document.querySelectorAll(".timeline-node");

    function onScroll() {
      if (scrollBar) {
        const maxS = Math.max(
          1,
          document.documentElement.scrollHeight - window.innerHeight
        );
        scrollBar.style.width =
          ((window.scrollY / maxS) * 100).toFixed(1) + "%";
      }

      const containerRect = container.getBoundingClientRect();
      const sectionRect = aboutSection
        ? aboutSection.getBoundingClientRect()
        : containerRect;

      // Reveal starts as soon as manifesto reaches 2/3 of the viewport height
      const triggerLine = window.innerHeight * (2 / 3);
      const scrolled = triggerLine - containerRect.top;
      const totalRange = Math.max(
        260,
        sectionRect.height -
          (containerRect.top - sectionRect.top) -
          (window.innerHeight - triggerLine) +
          60
      );
      const prog = Math.min(1, Math.max(0, scrolled / totalRange));

      const litCount = Math.floor(prog * wordSpans.length);
      wordSpans.forEach((sp, idx) => {
        if (idx < litCount) {
          sp.classList.add("lit");
          sp.classList.remove("active-word");
        } else if (idx === litCount && prog > 0.02 && prog < 0.98) {
          sp.classList.add("lit", "active-word");
        } else {
          sp.classList.remove("lit", "active-word");
        }
      });

      if (timelineGlow) {
        timelineGlow.style.height = `${Math.min(100, Math.max(0, prog * 100))}%`;
      }

      timelineNodes.forEach((node, i) => {
        node.classList.toggle("active", prog >= (i + 0.2) / timelineNodes.length);
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    setTimeout(onScroll, 100);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="section-block" id="about">
      <div className="about-scrolly-grid">
        <div className="about-sticky-left">
          <div className="about-header-block">
            <span className="eyebrow">ABOUT NITHWIN</span>
            <h2 className="section-title">Background &amp; Philosophy</h2>
            <p className="section-subtitle">
              Bridging algorithmic depth with intuitive full-stack platforms and intelligent AI systems.
            </p>
          </div>

          <div className="scrolly-manifesto" id="scrolly-text-container">
            I build software where performance meets intelligence. From
            developing full-stack web platforms and LLM-powered tools to
            solving 800+ algorithmic problems and publishing IEEE-recognized
            computer vision research, every system is designed to be fast,
            reliable, and built to scale.
          </div>
        </div>

        {/* Interactive Timeline Story Matrix */}
        <div className="about-timeline-matrix">
          <div className="timeline-header">
            <span className="timeline-hud-tag">STORY &amp; MILESTONES</span>
          </div>

          <div className="timeline-track-wrap">
            <div className="timeline-track-line">
              <div className="timeline-track-glow" id="timeline-progress-bar"></div>
            </div>

            <div className="timeline-node">
              <div className="timeline-marker">
                <span className="marker-core"></span>
                <span className="marker-ring"></span>
              </div>
              <div className="timeline-card">
                <div className="timeline-meta">
                  <span className="timeline-year">2022 — 2026</span>
                  <span className="timeline-badge">EDUCATION</span>
                </div>
                <h3 className="timeline-title">Nandha Engineering College</h3>
                <p className="timeline-desc">
                  Pursued Computer Science with an 8.3 CGPA while mastering algorithmic problem-solving, solving 800+ LeetCode problems (ranking in the top 15% globally).
                </p>
              </div>
            </div>

            <div className="timeline-node">
              <div className="timeline-marker">
                <span className="marker-core"></span>
                <span className="marker-ring"></span>
              </div>
              <div className="timeline-card">
                <div className="timeline-meta">
                  <span className="timeline-year">2026</span>
                  <span className="timeline-badge">RESEARCH</span>
                </div>
                <h3 className="timeline-title">IEEE Xplore Research Publication</h3>
                <p className="timeline-desc">
                  Published research on Coordinate Attention enhancements for YOLOv8 (CA-YOLOv8) for real-time smart ID card detection, achieving 0.58 EER across 800 cards.
                </p>
              </div>
            </div>

            <div className="timeline-node">
              <div className="timeline-marker">
                <span className="marker-core"></span>
                <span className="marker-ring"></span>
              </div>
              <div className="timeline-card">
                <div className="timeline-meta">
                  <span className="timeline-year">2025 — PRESENT</span>
                  <span className="timeline-badge">PRODUCTION &amp; GENAI</span>
                </div>
                <h3 className="timeline-title">Full-Stack Systems &amp; AI Tools</h3>
                <p className="timeline-desc">
                  Architected ShadowCoders collaborative developer platform, developed LLM-powered developer tools like WindMist, and engineered scalable cloud architectures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
