import React, { useEffect, useRef } from "react";
import { RiArrowRightUpLine, RiDownloadLine } from "react-icons/ri";

const MANIFESTO_WORDS = [
  { word: "I", accent: false },
  { word: "build", accent: true },
  { word: "high-performance", accent: false },
  { word: "web", accent: false },
  { word: "platforms", accent: false },
  { word: "and", accent: false },
  { word: "intelligent", accent: true },
  { word: "AI", accent: true },
  { word: "systems", accent: false },
  { word: "that", accent: false },
  { word: "solve", accent: true },
  { word: "real", accent: false },
  { word: "problems", accent: false },
  { word: "at", accent: false },
  { word: "scale.", accent: false },
  { word: "Every", accent: false },
  { word: "line", accent: false },
  { word: "of", accent: false },
  { word: "code", accent: true },
  { word: "is", accent: false },
  { word: "intentional.", accent: false },
  { word: "Every", accent: false },
  { word: "system", accent: false },
  { word: "is", accent: false },
  { word: "designed", accent: true },
  { word: "to", accent: false },
  { word: "endure.", accent: false },
];

const MILESTONES = [
  {
    kicker: "Core Expertise",
    title: "Generative AI & LLMs",
    desc: "Building RAG pipelines, fine-tuned LLM agents, and AI-powered tools that automate real workflows at production scale.",
    color: "#FF3B1D",
  },
  {
    kicker: "Engineering",
    title: "Full Stack Systems",
    desc: "End-to-end web ecosystems — React, Next.js, Node.js, PostgreSQL — architected for performance and scale.",
    color: "#FF3B1D",
  },
  {
    kicker: "Problem Solving",
    title: "750+ LeetCode Solved",
    desc: "Consistent algorithmic thinking and data-first design principles applied to every technical challenge.",
    color: "#FF3B1D",
  },
  {
    kicker: "Research",
    title: "IEEE Published Author",
    desc: "Peer-reviewed conference paper on CA-YOLOv8 smart ID card detection, published on IEEE Xplore.",
    color: "#FF3B1D",
  },
];

const About = () => {
  const manifestoRef = useRef(null);
  const sectionRef = useRef(null);

  // Scrolly word reveal
  useEffect(() => {
    const words = manifestoRef.current?.querySelectorAll(".scrolly-word") || [];
    const onScroll = () => {
      const rect = manifestoRef.current?.getBoundingClientRect();
      if (!rect) return;
      const viewH = window.innerHeight;
      const total = rect.height + viewH;
      const progress = Math.min(Math.max((viewH - rect.top) / total, 0), 1);
      words.forEach((w, i) => {
        if (progress > i / words.length * 0.6) {
          w.classList.add("lit");
        } else {
          w.classList.remove("lit");
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Section reveal
  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".reveal") || [];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.isIntersecting && e.target.classList.add("revealed"));
    }, { threshold: 0.08 });
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" className="section-block" ref={sectionRef}>
      <div className="container">
        <div className="section-header-row reveal">
          <div>
            <span className="eyebrow">About Me</span>
            <h2 className="section-title">
              Crafting intelligent<br />digital experiences.
            </h2>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a
              href="./assets/resume.pdf"
              download
              className="btn-secondary"
            >
              <RiDownloadLine size={15} />
              Download CV
            </a>
            <a
              href="https://github.com/Nithwin"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              GitHub Profile <RiArrowRightUpLine size={15} />
            </a>
          </div>
        </div>

        <div className="about-grid">
          {/* Left — scrolly manifesto */}
          <div ref={manifestoRef} className="scrolly-manifesto reveal">
            {MANIFESTO_WORDS.map((w, i) => (
              <React.Fragment key={i}>
                <span className={`scrolly-word${w.accent ? " accent-word" : ""}`}>
                  {w.word}
                </span>{" "}
              </React.Fragment>
            ))}
          </div>

          {/* Right — milestone cards */}
          <div className="about-milestones">
            {MILESTONES.map((m, i) => (
              <div
                key={m.title}
                className={`milestone-card reveal reveal-delay-${i + 1}`}
              >
                <div className="milestone-kicker">{m.kicker}</div>
                <div className="milestone-title">{m.title}</div>
                <div className="milestone-desc">{m.desc}</div>
              </div>
            ))}

            {/* Quick facts */}
            <div
              className="reveal reveal-delay-5"
              style={{
                padding: "20px 24px",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border)",
                background: "var(--bg-card)",
                marginTop: "4px",
              }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                {[
                  { label: "Location", val: "India" },
                  { label: "Experience", val: "3+ Years" },
                  { label: "Email", val: "vmnithwin@gmail.com" },
                  { label: "Status", val: "Open to Work" },
                ].map(({ label, val }) => (
                  <div key={label}>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--fg-muted)", marginBottom: "4px" }}>
                      {label}
                    </div>
                    <div style={{ fontSize: "13.5px", fontWeight: 600, color: "var(--fg)" }}>
                      {val}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
