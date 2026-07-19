import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import SectionReveal, { fadeUp } from "../components/SectionReveal";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { RiStackLine } from "react-icons/ri";

const ProjectCard = ({ project }) => (
  <motion.div variants={fadeUp} className="project-card">
    {/* Image */}
    <div style={{ position: "relative", height: "200px", overflow: "hidden", borderRadius: "20px 20px 0 0" }}>
      {project.imageUrl ? (
        <img src={project.imageUrl} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }} />
      ) : (
        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, rgba(123,47,255,0.15), rgba(0,212,255,0.08))" }}>
          <RiStackLine size={44} style={{ color: "rgba(123,47,255,0.3)" }} />
        </div>
      )}
      <div className="overlay" />
      {/* Hover action buttons */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", opacity: 0, transition: "opacity 0.3s", zIndex: 5 }} className="project-card-actions">
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
            style={{ width: "44px", height: "44px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)" }}>
            <FaGithub size={18} color="#fff" />
          </a>
        )}
        {project.demoUrl && (
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
            style={{ width: "44px", height: "44px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(123,47,255,0.6)", backdropFilter: "blur(8px)", border: "1px solid rgba(123,47,255,0.4)" }}>
            <FaExternalLinkAlt size={14} color="#fff" />
          </a>
        )}
      </div>
    </div>

    {/* Content */}
    <div style={{ padding: "24px" }}>
      {project.tags && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "14px" }}>
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} style={{ fontSize: "0.7rem", padding: "3px 10px", borderRadius: "50px", fontWeight: 500, background: "rgba(123,47,255,0.1)", color: "var(--purple-light)", border: "1px solid rgba(123,47,255,0.2)" }}>
              {tag}
            </span>
          ))}
        </div>
      )}
      <h3 style={{ fontSize: "1.08rem", fontFamily: "var(--font-syne)", fontWeight: 600, color: "var(--text-primary)", marginBottom: "10px" }}>
        {project.title}
      </h3>
      <p style={{ fontSize: "0.88rem", lineHeight: 1.65, color: "var(--text-muted)", marginBottom: "18px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
        {project.description}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {project.demoUrl && (
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: "8px 20px", fontSize: "0.8rem", gap: "6px" }}>
            <span>Live Demo</span>
            <FaExternalLinkAlt size={10} style={{ position: "relative", zIndex: 1 }} />
          </a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: "7px 20px", fontSize: "0.8rem", gap: "6px" }}>
            <FaGithub size={13} />
            Code
          </a>
        )}
      </div>
    </div>

    {/* Inline hover style for action buttons */}
    <style>{`
      .project-card:hover .project-card-actions { opacity: 1 !important; }
      .project-card:hover img { transform: scale(1.08); }
    `}</style>
  </motion.div>
);

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const snap = await getDocs(collection(db, "projects"));
        setProjects(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const allTags = ["All", ...new Set(projects.flatMap((p) => p.tags || []))];
  const filtered = filter === "All" ? projects : projects.filter((p) => p.tags?.includes(filter));

  return (
    <SectionReveal id="projects">
      <div className="grid-bg" />
      <div className="container-main">
        {/* Header */}
        <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: "56px" }}>
          <span className="section-label">Portfolio</span>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontFamily: "var(--font-syne)", fontWeight: 700, marginTop: "18px", color: "var(--text-primary)" }}>
            My <span className="gradient-text">Projects</span>
          </h2>
          <p style={{ marginTop: "16px", fontSize: "1rem", maxWidth: "520px", margin: "16px auto 0", color: "var(--text-muted)", lineHeight: 1.7 }}>
            A selection of things I've built — from web platforms to mobile apps.
          </p>
        </motion.div>

        {/* Filter pills */}
        {allTags.length > 1 && (
          <motion.div variants={fadeUp} className="project-filter-row">
            {allTags.slice(0, 8).map((tag) => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                style={{
                  padding: "8px 20px", borderRadius: "50px", fontSize: "0.85rem", fontWeight: 500,
                  cursor: "pointer", border: "none", fontFamily: "inherit", transition: "all 0.3s",
                  ...(filter === tag
                    ? { background: "var(--purple)", color: "#fff", boxShadow: "0 4px 20px rgba(123,47,255,0.35)" }
                    : { background: "var(--bg-card)", color: "var(--text-secondary)", border: "1px solid var(--border)" }),
                }}
              >
                {tag}
              </button>
            ))}
          </motion.div>
        )}

        {/* Loading */}
        {loading && (
          <div style={{ display: "flex", justifyContent: "center", padding: "60px 0" }}>
            <motion.div
              style={{ width: "40px", height: "40px", borderRadius: "50%", border: "3px solid rgba(123,47,255,0.2)", borderTopColor: "var(--purple)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
          </div>
        )}

        {/* Grid */}
        {!loading && (
          filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-muted)" }}>
              <RiStackLine size={44} style={{ margin: "0 auto 16px", opacity: 0.3 }} />
              <p>No projects found. Check back soon!</p>
            </div>
          ) : (
            <div className="projects-grid">
              {filtered.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )
        )}
      </div>

      {/* Responsive styles for Projects */}
      <style>{`
        .project-filter-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          margin-bottom: 48px;
        }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 28px;
        }
        @media (max-width: 768px) {
          .project-filter-row {
            gap: 8px;
            margin-bottom: 36px;
          }
          .projects-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }
        @media (max-width: 480px) {
          .project-filter-row button {
            padding: 6px 16px !important;
            font-size: 0.8rem !important;
          }
        }
      `}</style>
    </SectionReveal>
  );
};

export default Projects;
