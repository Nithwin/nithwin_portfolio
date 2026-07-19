import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import SectionReveal, { fadeUp } from "../components/SectionReveal";
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { RiStackLine, RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

/* ── Gradient backgrounds for cards with no image ── */
const FALLBACK_GRADIENTS = [
  "linear-gradient(135deg, rgba(123,47,255,0.22), rgba(0,212,255,0.12))",
  "linear-gradient(135deg, rgba(0,212,255,0.18), rgba(0,255,209,0.1))",
  "linear-gradient(135deg, rgba(0,255,209,0.15), rgba(123,47,255,0.18))",
  "linear-gradient(135deg, rgba(255,161,22,0.15), rgba(123,47,255,0.15))",
  "linear-gradient(135deg, rgba(123,47,255,0.18), rgba(255,71,87,0.1))",
];

/* ─────────────────── PROJECT CARD ─────────────────── */
const ProjectCard = ({ project, index }) => (
  <motion.div
    variants={fadeUp}
    className="project-card"
    style={{ height: "100%", display: "flex", flexDirection: "column" }}
  >
    {/* Thumbnail */}
    <div className="project-thumb" style={{ position: "relative", overflow: "hidden", flexShrink: 0 }}>
      {project.imageUrl ? (
        <img
          src={project.imageUrl}
          alt={project.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
          onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
        />
      ) : null}
      <div
        style={{
          width: "100%", height: "100%",
          display: project.imageUrl ? "none" : "flex",
          alignItems: "center", justifyContent: "center",
          background: FALLBACK_GRADIENTS[index % FALLBACK_GRADIENTS.length],
        }}
      >
        <RiStackLine size={44} style={{ color: "rgba(123,47,255,0.45)" }} />
      </div>
      <div className="overlay" />
      {/* Hover action buttons */}
      <div
        className="project-card-actions"
        style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", opacity: 0, transition: "opacity 0.3s", zIndex: 5 }}
      >
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
            style={{ width: "44px", height: "44px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.25)" }}>
            <FaGithub size={18} color="#fff" />
          </a>
        )}
        {project.demoUrl && (
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
            style={{ width: "44px", height: "44px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(123,47,255,0.7)", backdropFilter: "blur(8px)", border: "1px solid rgba(123,47,255,0.4)" }}>
            <FaExternalLinkAlt size={14} color="#fff" />
          </a>
        )}
      </div>
    </div>

    {/* Body */}
    <div className="project-body" style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      {project.tags && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "12px" }}>
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="project-tag" style={{ borderRadius: "50px", fontWeight: 600, background: "rgba(123,47,255,0.1)", color: "var(--purple-light)", border: "1px solid rgba(123,47,255,0.22)" }}>
              {tag}
            </span>
          ))}
        </div>
      )}
      <h3 className="project-title" style={{ fontFamily: "var(--font-syne)", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.4 }}>
        {project.title}
      </h3>
      <p className="project-desc" style={{ lineHeight: 1.7, color: "var(--text-muted)", flex: 1, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
        {project.description}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "auto" }}>
        {project.demoUrl && (
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-primary project-btn" style={{ gap: "6px", borderRadius: "50px" }}>
            <span>Live Demo</span>
            <FaExternalLinkAlt size={10} style={{ position: "relative", zIndex: 1 }} />
          </a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-outline project-btn" style={{ gap: "6px", borderRadius: "50px" }}>
            <FaGithub size={13} />
            Code
          </a>
        )}
      </div>
    </div>

    <style>{`
      .project-card:hover .project-card-actions { opacity: 1 !important; }
      .project-card:hover img { transform: scale(1.06); }
    `}</style>
  </motion.div>
);

/* ─────────────────── DESKTOP CAROUSEL ─────────────────── */
const DesktopCarousel = ({ projects }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const CARD_W = 360; // card width + gap
  const GAP = 24;

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (CARD_W + GAP), behavior: "smooth" });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    updateArrows();
    return () => el.removeEventListener("scroll", updateArrows);
  }, [projects]);

  return (
    <div style={{ position: "relative" }}>
      {/* Left arrow */}
      <button
        onClick={() => scroll(-1)}
        disabled={!canScrollLeft}
        style={{
          position: "absolute", left: "-20px", top: "50%", transform: "translateY(-50%)",
          zIndex: 20, width: "44px", height: "44px", borderRadius: "50%",
          border: "1px solid var(--border)", background: "var(--bg-card)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: canScrollLeft ? "pointer" : "default",
          opacity: canScrollLeft ? 1 : 0.25,
          transition: "opacity 0.3s, box-shadow 0.3s",
          boxShadow: canScrollLeft ? "0 4px 20px rgba(0,0,0,0.4)" : "none",
        }}
      >
        <FaChevronLeft size={14} style={{ color: "var(--text-primary)" }} />
      </button>

      {/* Scroll track */}
      <div
        ref={scrollRef}
        className="proj-scroll"
        style={{
          display: "flex",
          gap: `${GAP}px`,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          paddingBottom: "8px",
        }}
      >
        <style>{`.proj-scroll::-webkit-scrollbar { display: none; }`}</style>
        {projects.map((project, i) => (
          <div
            key={project.id}
            style={{
              minWidth: `${CARD_W}px`,
              maxWidth: `${CARD_W}px`,
              scrollSnapAlign: "start",
              flexShrink: 0,
            }}
          >
            <ProjectCard project={project} index={i} />
          </div>
        ))}
      </div>

      {/* Right arrow */}
      <button
        onClick={() => scroll(1)}
        disabled={!canScrollRight}
        style={{
          position: "absolute", right: "-20px", top: "50%", transform: "translateY(-50%)",
          zIndex: 20, width: "44px", height: "44px", borderRadius: "50%",
          border: "1px solid var(--border)", background: "var(--bg-card)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: canScrollRight ? "pointer" : "default",
          opacity: canScrollRight ? 1 : 0.25,
          transition: "opacity 0.3s, box-shadow 0.3s",
          boxShadow: canScrollRight ? "0 4px 20px rgba(0,0,0,0.4)" : "none",
        }}
      >
        <FaChevronRight size={14} style={{ color: "var(--text-primary)" }} />
      </button>

      {/* Dot indicators */}
      <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "24px" }}>
        {projects.map((_, i) => (
          <div
            key={i}
            style={{
              width: "6px", height: "6px", borderRadius: "50%",
              background: i < 3 ? "var(--purple)" : "rgba(255,255,255,0.15)",
              transition: "background 0.3s",
            }}
          />
        ))}
      </div>
    </div>
  );
};

/* ─────────────────── MOBILE GRID (3 + View More) ─────────────────── */
const MobileGrid = ({ projects }) => {
  const INITIAL = 3;
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? projects : projects.slice(0, INITIAL);
  const hasMore = projects.length > INITIAL;

  return (
    <div style={{ position: "relative" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {shown.map((project, i) => (
          <motion.div
            key={project.id}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ duration: 0.35, delay: i >= INITIAL ? (i - INITIAL) * 0.08 : 0 }}
          >
            <ProjectCard project={project} index={i} />
          </motion.div>
        ))}
      </div>

      {hasMore && (
        <motion.button
          onClick={() => setExpanded(!expanded)}
          whileTap={{ scale: 0.97 }}
          className="view-more-btn"
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            margin: "24px auto 0",
            padding: "12px 28px", borderRadius: "50px",
            background: expanded ? "transparent" : "linear-gradient(135deg, #7B2FFF, #5050DD)",
            border: expanded ? "1.5px solid rgba(123,47,255,0.5)" : "none",
            color: expanded ? "var(--purple-light)" : "#fff",
            fontSize: "0.88rem", fontWeight: 600,
            cursor: "pointer", fontFamily: "inherit",
            transition: "all 0.3s ease",
            boxShadow: expanded ? "none" : "0 8px 30px rgba(123,47,255,0.35)",
            width: "100%",
            maxWidth: "280px",
            position: "relative",
            zIndex: 10,
          }}
        >
          {expanded ? (
            <><RiArrowUpSLine size={20} /> Show Less</>
          ) : (
            <><RiArrowDownSLine size={20} /> View More ({projects.length - INITIAL} more)</>
          )}
        </motion.button>
      )}
    </div>
  );
};

const INITIAL_PROJECTS = [
  {
    "id": "4RfZQgcPLhNl4nqTLUry",
    "imageUrl": "https://raw.githubusercontent.com/Nithwin/windmist/main/images/Gemini_Generated_Image_4fucu04fucu04fuc.png",
    "description": "Built WindMist, an open-source AI coding assistant for the terminal in Go with a modular provider architecture. Developed repository-aware file editing tools, streaming AI responses, and intelligent context retrieval.",
    "title": "WindMist — Open-Source AI Coding Assistant",
    "demoUrl": "https://windmist.vercel.app",
    "githubUrl": "https://github.com/Nithwin/windmist",
    "tags": ["Go", "AI", "CLI", "Docker", "GitHub Actions"]
  },
  {
    "id": "8PoIL7UQ62xfD7A9Q3mj",
    "demoUrl": null,
    "description": "Built a full-stack online examination platform serving 400+ students, supporting reliable real-time examinations for 80+ concurrent users. Implemented hybrid code execution with client-side offloading and 11 browser-based anti-cheating mechanisms.",
    "title": "ShadowCoders - Scalable Examination Platform",
    "imageUrl": null,
    "tags": ["Next.js", "Express.js", "PostgreSQL", "Socket.IO", "Prisma"],
    "githubUrl": "https://github.com/Nithwin/ShadowCoders"
  },
  {
    "id": "BPMdm9Qxi7kQjgS6YKQP",
    "githubUrl": "https://github.com/Nithwin/SICD",
    "tags": ["Python", "YOLOv8", "Computer Vision", "Flask", "OpenCV"],
    "description": "Designed a customized YOLOv8 architecture for accurate real-time student ID card detection using CBAM attention and small-object detection enhancements. Published the research as 'CA-YOLOv8' in IEEE Xplore.",
    "imageUrl": "https://i.ibb.co/jkvzdyV9/Screenshot-From-2026-05-04-22-42-15.png",
    "title": "Smart ID Card Detection - CA-YOLOv8",
    "demoUrl": "https://sicd.vercel.app"
  },
  {
    "id": "Ey7LGj5URwZiD0PHNe9Q",
    "demoUrl": null,
    "description": "Developed a real-time terminal-based chat application using TCP/IP socket programming. Implemented a client-server architecture supporting reliable bidirectional communication over raw sockets.",
    "imageUrl": null,
    "title": "Terminal TCP/IP Chat Network",
    "tags": ["C++", "Socket Programming", "TCP/IP", "Linux"],
    "githubUrl": "https://github.com/Nithwin/Cpp_Projects"
  },
  {
    "id": "NmX1klXElPxVLHU8CprT",
    "title": "AmmuBus - Tourist Bus Booking Platform",
    "imageUrl": "https://i.ibb.co/5ghkHcn8/Screenshot-From-2026-07-19-15-29-24.png",
    "description": "A comprehensive web platform for booking tourist buses across 126+ cities in India. Features a vast network of bus partners and verified operators for seamless group travels.",
    "demoUrl": "http://ammubus.in/",
    "githubUrl": "https://github.com/Nithwin/ammubus-web",
    "tags": ["Web App", "React", "Travel", "Booking"]
  }
];

/* ─────────────────── MAIN SECTION ─────────────────── */
const Projects = () => {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const cached = localStorage.getItem("cached_projects");
        if (cached) {
          setProjects(JSON.parse(cached));
        }

        const snap = await getDocs(collection(db, "projects"));
        const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        
        if (data.length > 0) {
          setProjects(data);
          localStorage.setItem("cached_projects", JSON.stringify(data));
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };
    fetchProjects();
  }, []);

  return (
    <SectionReveal id="projects">
      <div className="grid-bg" />

      <div className="container-main">
        {/* Section Header */}
        <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: "40px" }}>
          <span className="section-label">Portfolio</span>
          <h2 className="proj-heading" style={{ fontFamily: "var(--font-syne)", fontWeight: 700, marginTop: "18px", color: "var(--text-primary)" }}>
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="proj-subtitle" style={{ margin: "14px auto 0", color: "var(--text-muted)", lineHeight: 1.7 }}>
            A selection of things I've built — from AI tools to web platforms.
          </p>
        </motion.div>

        {/* Error state */}
        {error && (
          <motion.div variants={fadeUp} className="glass-card" style={{ padding: "48px", textAlign: "center", borderRadius: "24px" }}>
            <RiStackLine size={44} style={{ margin: "0 auto 16px", color: "var(--text-muted)", opacity: 0.4 }} />
            <p style={{ color: "var(--text-muted)", marginBottom: "8px" }}>Couldn't load projects right now.</p>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", opacity: 0.6 }}>{error}</p>
          </motion.div>
        )}

        {/* Empty state */}
        {!error && projects.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text-muted)" }}>
            <RiStackLine size={44} style={{ margin: "0 auto 16px", opacity: 0.3 }} />
            <p>No projects found. Check back soon!</p>
          </div>
        )}

        {/* Desktop: horizontal scroll carousel (hidden on mobile via CSS) */}
        {!error && projects.length > 0 && (
          <>
            <motion.div variants={fadeUp} className="projects-desktop-carousel">
              <DesktopCarousel projects={projects} />
            </motion.div>

            {/* Mobile: stacked grid with View More */}
            <motion.div variants={fadeUp} className="projects-mobile-grid">
              <MobileGrid projects={projects} />
            </motion.div>
          </>
        )}
      </div>

      {/* Responsive layout CSS */}
      <style>{`
        .proj-heading {
          font-size: clamp(1.8rem, 5vw, 3.5rem);
        }
        .proj-subtitle {
          font-size: 0.95rem;
          max-width: 520px;
        }

        /* Project card responsive */
        .project-thumb {
          height: 200px;
          border-radius: 20px 20px 0 0;
        }
        .project-body {
          padding: 20px;
        }
        .project-tag {
          font-size: 0.65rem;
          padding: 3px 9px;
        }
        .project-title {
          font-size: 1.05rem;
          margin-bottom: 8px;
        }
        .project-desc {
          font-size: 0.85rem;
          margin-bottom: 16px;
        }
        .project-btn {
          padding: 8px 16px;
          font-size: 0.78rem;
        }

        /* Desktop: show carousel, hide mobile grid */
        .projects-desktop-carousel { display: block; }
        .projects-mobile-grid { display: none; }

        @media (max-width: 768px) {
          /* Mobile: hide carousel, show grid */
          .projects-desktop-carousel { display: none !important; }
          .projects-mobile-grid { display: block !important; }
        }

        /* ════════ MOBILE ════════ */
        @media (max-width: 480px) {
          .proj-heading {
            font-size: 1.6rem;
          }
          .proj-subtitle {
            font-size: 0.85rem;
          }
          .project-thumb {
            height: 160px;
            border-radius: 16px 16px 0 0;
          }
          .project-body {
            padding: 16px;
          }
          .project-tag {
            font-size: 0.6rem;
            padding: 2px 8px;
          }
          .project-title {
            font-size: 0.95rem;
          }
          .project-desc {
            font-size: 0.8rem;
            margin-bottom: 12px;
          }
          .project-btn {
            padding: 7px 14px;
            font-size: 0.75rem;
          }
          .project-card {
            border-radius: 16px;
          }
          .view-more-btn {
            font-size: 0.82rem !important;
            padding: 10px 22px !important;
          }
        }

        /* ════════ VERY SMALL ════════ */
        @media (max-width: 360px) {
          .project-thumb {
            height: 140px;
          }
          .project-body {
            padding: 14px;
          }
          .project-title {
            font-size: 0.9rem;
          }
          .project-desc {
            font-size: 0.78rem;
          }
        }
      `}</style>
    </SectionReveal>
  );
};

export default Projects;
