import React, { useEffect } from "react";

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      id="case-modal"
      className="open"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target.id === "case-modal") onClose();
      }}
    >
      <div className="case-dialog">
        <div className="case-modal-header">
          <span className="eyebrow" style={{ marginBottom: 0 }}>
            {project.cat}
          </span>
          <button
            className="pill-btn case-close-btn"
            onClick={onClose}
            data-cursor="CLOSE"
          >
            CLOSE [ESC] ✕
          </button>
        </div>
        <h2 className="case-modal-title">
          {project.title}
        </h2>
        {project.imageUrl && (
          <div className="case-modal-img-wrap">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="case-modal-img"
              loading="lazy"
              width="800"
              height="450"
              decoding="async"
            />
          </div>
        )}
        <p className="work-desc" style={{ marginBottom: "16px", lineHeight: "1.6" }}>
          {project.desc}
        </p>
        <div className="tag-row" style={{ marginBottom: "20px" }}>
          {project.tags &&
            project.tags.map((t, idx) => (
              <span key={idx} className="tag-pill">
                {t}
              </span>
            ))}
        </div>
        <div className="case-modal-actions">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Launch Live / Paper ↗
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              GitHub Source ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
