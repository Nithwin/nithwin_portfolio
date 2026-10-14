import React, { useEffect, useRef, useState } from "react";
import { PROJECTS } from "../data/projectsData";

export default function Projects({
  projectsList,
  sliderIndex,
  setSliderIndex,
  isExpanded,
  setIsExpanded,
  onSelectProject,
  theme,
}) {
  const themeRef = useRef(theme);
  themeRef.current = theme;

  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Procedural geometric canvases for project cards
  useEffect(() => {
    const canvases = [];
    const elements = document.querySelectorAll(".project-canvas-item");

    elements.forEach((canvasEl) => {
      const pIdx = parseInt(canvasEl.getAttribute("data-proj-idx"), 10);
      const p = projectsList[pIdx] || PROJECTS[pIdx];
      const st = { mx: 0.5, my: 0.5, e: 0.3, te: 0.3, t: pIdx * 1.3 };

      const card = canvasEl.closest(".work-card");
      if (card) {
        card.addEventListener("mousemove", (ev) => {
          const r = canvasEl.getBoundingClientRect();
          st.mx = (ev.clientX - r.left) / r.width;
          st.my = (ev.clientY - r.top) / r.height;
          st.te = 1.0;
        });
        card.addEventListener("mouseleave", () => {
          st.te = 0.3;
        });
      }
      canvases.push({ c: canvasEl, p, st });
    });

    let rafId;
    function renderCardCanvases() {
      const isL = themeRef.current === "light";
      const bg = isL ? "#F2ECE0" : "#0B0B0F";
      const fg = isL ? "#131316" : "#F4F3EF";
      const acc = isL ? "#0038FF" : "#FF3B1D";

      for (const { c, p, st } of canvases) {
        if (!c) continue;
        st.t += 0.04;
        st.e += (st.te - st.e) * 0.12;
        const ctx = c.getContext("2d");
        if (!ctx) continue;
        const W = c.width,
          H = c.height;
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, W, H);

        ctx.save();
        ctx.translate(
          W * 0.5 + (st.mx - 0.5) * 24,
          H * 0.5 + (st.my - 0.5) * 16
        );
        ctx.strokeStyle = acc;
        ctx.lineWidth = 2.2;
        const wv = Math.sin(st.t * 2) * 8 * st.e;

        const shape = p ? p.shape : 0;
        if (shape === 0) {
          for (let r = 24; r <= 88; r += 20) {
            ctx.beginPath();
            ctx.arc(0, 0, r + wv * 0.4, 0, Math.PI * 2);
            ctx.stroke();
          }
        } else if (shape === 1) {
          for (let i = -2; i <= 2; i++) {
            ctx.strokeRect(
              i * 40 - 13,
              -46 + Math.sin(st.t + i) * 9 * st.e,
              26,
              92
            );
          }
        } else if (shape === 2) {
          for (let l = -1; l <= 1; l++) {
            ctx.beginPath();
            for (let x = -140; x <= 140; x += 10) {
              const y =
                l * 26 +
                Math.sin(x * 0.04 + st.t * 2.5 + l) * (8 + st.e * 12);
              if (x === -140) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            ctx.stroke();
          }
        } else {
          ctx.strokeRect(-86 - wv, -52 - wv, 172 + wv * 2, 104 + wv * 2);
          ctx.strokeStyle = fg;
          ctx.beginPath();
          ctx.arc(0, 0, 24, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();
      }
      rafId = requestAnimationFrame(renderCardCanvases);
    }
    rafId = requestAnimationFrame(renderCardCanvases);

    return () => cancelAnimationFrame(rafId);
  }, [sliderIndex, isExpanded, projectsList, isMobile]);

  const maxIndex = isMobile
    ? Math.max(0, projectsList.length - 1)
    : Math.max(0, projectsList.length - 2);

  const handlePrev = () => {
    setIsExpanded(false);
    setSliderIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setIsExpanded(false);
    setSliderIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  // Touch swipe support
  const touchStartX = useRef(0);
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
  };

  return (
    <section className="section-block" id="work">
      <div className="section-header-row reveal-item">
        <div>
          <span className="eyebrow">FEATURED WORK</span>
          <h2 className="section-title">Projects</h2>
        </div>

        <div className="slider-controls">
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              color: "var(--fg-muted)",
              marginRight: "8px",
            }}
            id="slider-counter"
          >
            {isExpanded
              ? `SHOWING ALL 0${projectsList.length} PROJECTS`
              : isMobile
              ? `SHOWING 0${sliderIndex + 1} OF 0${projectsList.length}`
              : `SHOWING 0${sliderIndex + 1}–0${Math.min(
                  projectsList.length,
                  sliderIndex + 2
                )} OF 0${projectsList.length}`}
          </span>
          <button
            className="arrow-btn"
            onClick={handlePrev}
            data-cursor="PREV"
            aria-label="Previous Projects"
          >
            ←
          </button>
          <button
            className="arrow-btn"
            onClick={handleNext}
            data-cursor="NEXT"
            aria-label="Next Projects"
          >
            →
          </button>
          <button
            className="pill-btn"
            onClick={() => setIsExpanded((prev) => !prev)}
            data-cursor="EXPAND"
            style={{ marginLeft: "8px" }}
          >
            {isExpanded
              ? "Compact Slider ↑"
              : `View More (All ${projectsList.length}) ↓`}
          </button>
        </div>
      </div>

      <div
        className="projects-viewport"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={`projects-track reveal-group ${
            isExpanded ? "expanded-grid" : ""
          }`}
          style={{
            gridTemplateColumns: isExpanded
              ? undefined
              : isMobile
              ? `repeat(${projectsList.length}, 100%)`
              : `repeat(${projectsList.length}, calc(50% - 16px))`,
            gap: isMobile ? "20px" : "32px",
            transform: isExpanded
              ? "none"
              : isMobile
              ? `translate3d(calc(-${sliderIndex * 100}% - ${
                  sliderIndex * 20
                }px), 0, 0)`
              : `translate3d(calc(-${sliderIndex * 50}% - ${
                  sliderIndex * 16
                }px), 0, 0)`,
          }}
        >
          {projectsList.map((p, idx) => (
            <article
              key={idx}
              className="work-card reveal-item"
              data-cursor="CASE STUDY"
              onClick={() => onSelectProject(p)}
            >
              <div className="work-visual">
                {p.imageUrl ? (
                  <div className="work-img-container">
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      className="work-img"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const fallback =
                          e.currentTarget.parentElement.querySelector(
                            ".project-canvas-item"
                          );
                        if (fallback) fallback.style.display = "block";
                      }}
                    />
                    <canvas
                      className="work-canvas project-canvas-item"
                      data-proj-idx={idx}
                      width="520"
                      height="300"
                      style={{ display: "none" }}
                    ></canvas>
                  </div>
                ) : (
                  <canvas
                    className="work-canvas project-canvas-item"
                    data-proj-idx={idx}
                    width="520"
                    height="300"
                  ></canvas>
                )}
              </div>
              <div className="work-meta-row">
                <h3 className="work-title">
                  0{idx + 1}. {p.title}
                </h3>
                <span className="work-cat">{p.cat}</span>
              </div>
              <p className="work-desc">{p.desc}</p>
              <div className="tag-row">
                {p.tags.map((t, tIdx) => (
                  <span key={tIdx} className="tag-pill">
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
