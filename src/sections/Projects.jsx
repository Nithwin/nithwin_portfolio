import React, { useEffect, useRef, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { RiLayoutGridLine, RiLayoutRowLine } from "react-icons/ri";

const FALLBACK_PROJECTS = [
  {
    id: "1",
    title: "AI-Powered RAG Platform",
    description: "A production-grade Retrieval-Augmented Generation system using LangChain, Pinecone, and GPT-4 for enterprise knowledge management with real-time document ingestion.",
    tags: ["Python", "LangChain", "Pinecone", "FastAPI"],
    category: "Generative AI",
    githubUrl: "https://github.com/Nithwin",
    demoUrl: null,
    imageUrl: null,
  },
  {
    id: "2",
    title: "High-Concurrency E-Commerce",
    description: "A full-stack e-commerce platform handling 10k+ concurrent users with Next.js, PostgreSQL, Redis caching, and Stripe payment integration.",
    tags: ["Next.js", "PostgreSQL", "Redis", "Stripe"],
    category: "Full Stack",
    githubUrl: "https://github.com/Nithwin",
    demoUrl: null,
    imageUrl: null,
  },
  {
    id: "3",
    title: "Smart ID Detection System",
    description: "IEEE-published computer vision system using CA-YOLOv8 for real-time ID card detection with coordinate attention mechanism for noise reduction.",
    tags: ["Python", "YOLOv8", "OpenCV", "Deep Learning"],
    category: "Computer Vision",
    githubUrl: "https://github.com/Nithwin",
    demoUrl: null,
    imageUrl: null,
  },
  {
    id: "4",
    title: "Real-Time Chat Application",
    description: "WebSocket-based chat platform with Firebase Realtime Database, end-to-end encryption, and React UI supporting 1000+ simultaneous connections.",
    tags: ["React", "Firebase", "WebSockets", "Node.js"],
    category: "Full Stack",
    githubUrl: "https://github.com/Nithwin",
    demoUrl: null,
    imageUrl: null,
  },
  {
    id: "5",
    title: "Flutter Mobile Banking App",
    description: "Cross-platform mobile banking application with biometric authentication, real-time transaction tracking, and BLoC state management architecture.",
    tags: ["Flutter", "Dart", "Firebase", "BLoC"],
    category: "Mobile",
    githubUrl: "https://github.com/Nithwin",
    demoUrl: null,
    imageUrl: null,
  },
  {
    id: "6",
    title: "LLM Fine-Tuning Pipeline",
    description: "Custom fine-tuning pipeline for domain-specific LLMs using LoRA/QLoRA techniques with distributed training on cloud GPUs.",
    tags: ["Python", "PyTorch", "HuggingFace", "LoRA"],
    category: "Generative AI",
    githubUrl: "https://github.com/Nithwin",
    demoUrl: null,
    imageUrl: null,
  },
];

const FALLBACK_GRADIENTS = [
  "linear-gradient(135deg, rgba(255,59,29,0.18), rgba(255,120,60,0.08))",
  "linear-gradient(135deg, rgba(22,22,30,0.9), rgba(54,54,70,0.6))",
  "linear-gradient(135deg, rgba(255,59,29,0.1), rgba(22,22,30,0.8))",
  "linear-gradient(135deg, rgba(54,54,70,0.8), rgba(255,59,29,0.12))",
  "linear-gradient(135deg, rgba(22,22,30,0.95), rgba(255,59,29,0.08))",
  "linear-gradient(135deg, rgba(255,59,29,0.14), rgba(22,22,30,0.9))",
];

const CATEGORY_ICONS = {
  "Generative AI": "🧠",
  "Full Stack": "⚡",
  "Computer Vision": "👁️",
  "Mobile": "📱",
  "Backend": "🔧",
};

const WorkCard = ({ project, index }) => (
  <article className="work-card">
    <div className="work-thumb">
      {project.imageUrl ? (
        <img
          src={project.imageUrl}
          alt={project.title}
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
      ) : null}
      <div
        className="work-thumb-fallback"
        style={{
          display: project.imageUrl ? "none" : "flex",
          background: FALLBACK_GRADIENTS[index % FALLBACK_GRADIENTS.length],
          fontSize: "48px",
        }}
      >
        {CATEGORY_ICONS[project.category] || "🚀"}
      </div>
    </div>
    <div className="work-body">
      <div className="work-cat">{project.category || "Project"}</div>
      <h3 className="work-title">{project.title}</h3>
      <p className="work-desc">{project.description}</p>
      {project.tags && (
        <div className="work-tags">
          {project.tags.slice(0, 4).map((t) => (
            <span key={t} className="work-tag">{t}</span>
          ))}
        </div>
      )}
      <div className="work-links">
        {project.demoUrl && (
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="work-link-btn primary">
            <FaExternalLinkAlt size={11} /> Live Demo
          </a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="work-link-btn">
            <FaGithub size={12} /> Source Code
          </a>
        )}
      </div>
    </div>
  </article>
);

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("slider"); // "slider" | "grid"
  const [slideIdx, setSlideIdx] = useState(0);
  const trackRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const snap = await getDocs(collection(db, "projects"));
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setProjects(data.length > 0 ? data : FALLBACK_PROJECTS);
      } catch {
        setProjects(FALLBACK_PROJECTS);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  // Slider scroll
  useEffect(() => {
    if (trackRef.current && viewMode === "slider") {
      const cardW = trackRef.current.querySelector(".work-card");
      if (!cardW) return;
      const w = cardW.getBoundingClientRect().width + 32;
      trackRef.current.style.transform = `translateX(-${slideIdx * w}px)`;
    }
  }, [slideIdx, viewMode, projects]);

  // Reveal
  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".reveal") || [];
    const obs = new IntersectionObserver((e) => e.forEach((en) => en.isIntersecting && en.target.classList.add("revealed")), { threshold: 0.05 });
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const canPrev = slideIdx > 0;
  const canNext = viewMode === "slider" && slideIdx < projects.length - 2;

  return (
    <section id="projects" className="section-block" ref={sectionRef}>
      <div className="container">
        <div className="section-header-row reveal">
          <div>
            <span className="eyebrow">Selected Work</span>
            <h2 className="section-title">Projects</h2>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            {viewMode === "slider" && (
              <div className="slider-controls">
                <button
                  className="arrow-btn"
                  onClick={() => setSlideIdx((i) => Math.max(0, i - 1))}
                  disabled={!canPrev}
                >
                  <FaChevronLeft size={14} />
                </button>
                <button
                  className="arrow-btn"
                  onClick={() => setSlideIdx((i) => i + 1)}
                  disabled={!canNext}
                >
                  <FaChevronRight size={14} />
                </button>
              </div>
            )}
            <div className="view-mode-toggle">
              <button
                className={`view-mode-btn${viewMode === "slider" ? " active" : ""}`}
                onClick={() => { setViewMode("slider"); setSlideIdx(0); }}
              >
                <RiLayoutRowLine size={13} />
              </button>
              <button
                className={`view-mode-btn${viewMode === "grid" ? " active" : ""}`}
                onClick={() => setViewMode("grid")}
              >
                <RiLayoutGridLine size={13} />
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loading-container"><div className="spinner" /></div>
        ) : viewMode === "slider" ? (
          <div className="projects-slider-wrap reveal">
            <div className="projects-viewport">
              <div
                ref={trackRef}
                className="projects-track"
                style={{ display: "grid", gridTemplateColumns: `repeat(${projects.length}, calc(50% - 16px))`, gap: "32px" }}
              >
                {projects.map((p, i) => <WorkCard key={p.id} project={p} index={i} />)}
              </div>
            </div>
          </div>
        ) : (
          <div
            className="reveal"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}
          >
            {projects.map((p, i) => <WorkCard key={p.id} project={p} index={i} />)}
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "40px" }} className="reveal">
          <a
            href="https://github.com/Nithwin"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <FaGithub size={15} />
            View All on GitHub
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .projects-track { grid-template-columns: repeat(${12}, 82vw) !important; }
        }
      `}</style>
    </section>
  );
};

export default Projects;
