import React, { useState, useEffect, useRef } from "react";

export default function Certifications({
  certsList,
  certSliderIndex,
  setCertSliderIndex,
  isCertsExpanded,
  setIsCertsExpanded,
}) {
  const viewportRef = useRef(null);
  const [viewportWidth, setViewportWidth] = useState(0);

  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (viewportRef.current) {
        setViewportWidth(viewportRef.current.clientWidth);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const gap = isMobile ? 20 : 32;
  const w =
    viewportWidth ||
    (typeof window !== "undefined"
      ? Math.min(window.innerWidth - (isMobile ? 36 : 72), 1200)
      : 600);
  const cardWidth = isMobile ? w : (w - gap) / 2;

  const maxIndex = isMobile
    ? Math.max(0, certsList.length - 1)
    : Math.max(0, certsList.length - 2);

  const safeIndex = Math.min(Math.max(0, certSliderIndex), maxIndex);
  const shiftX = isCertsExpanded ? 0 : safeIndex * (cardWidth + gap);

  const handlePrev = () => {
    setIsCertsExpanded(false);
    setCertSliderIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setIsCertsExpanded(false);
    setCertSliderIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  // Touch swipe support (only horizontal swipes)
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e) => {
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) {
        handleNext();
      } else if (diffX < 0) {
        handlePrev();
      }
    }
  };

  return (
    <section className="section-block" id="certs">
      <div className="section-header-row reveal-item">
        <div>
          <span className="eyebrow">CREDENTIALS</span>
          <h2 className="section-title">Certifications</h2>
        </div>

        <div className="slider-controls">
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              color: "var(--fg-muted)",
              marginRight: "8px",
            }}
          >
            {isCertsExpanded
              ? `SHOWING ALL 0${certsList.length} CERTIFICATIONS`
              : isMobile
              ? `SHOWING 0${safeIndex + 1} OF 0${certsList.length}`
              : `SHOWING 0${safeIndex + 1}–0${Math.min(
                  certsList.length,
                  safeIndex + 2
                )} OF 0${certsList.length}`}
          </span>
          <button
            className="arrow-btn"
            onClick={handlePrev}
            data-cursor="PREV"
            aria-label="Previous Certifications"
          >
            ←
          </button>
          <button
            className="arrow-btn"
            onClick={handleNext}
            data-cursor="NEXT"
            aria-label="Next Certifications"
          >
            →
          </button>
          <button
            className="pill-btn"
            onClick={() => setIsCertsExpanded((prev) => !prev)}
            data-cursor="EXPAND"
            style={{ marginLeft: "8px" }}
          >
            {isCertsExpanded
              ? "Compact Slider ↑"
              : `View More (All ${certsList.length}) ↓`}
          </button>
          <a
            href="https://github.com/Nithwin/certs"
            target="_blank"
            rel="noopener noreferrer"
            className="pill-btn"
            data-cursor="CERTS REPO"
            style={{ marginLeft: "4px" }}
          >
            GitHub Certs ↗
          </a>
        </div>
      </div>

      <div
        ref={viewportRef}
        className="certs-viewport"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={`certs-track ${isCertsExpanded ? "expanded-grid" : ""}`}
          style={{
            display: isCertsExpanded ? "grid" : "flex",
            flexWrap: isCertsExpanded ? "wrap" : "nowrap",
            gap: `${gap}px`,
            transform: isCertsExpanded ? "none" : `translate3d(-${shiftX}px, 0, 0)`,
            transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            width: isCertsExpanded ? "100%" : "max-content",
          }}
        >
          {certsList.map((cert) => (
            <article
              key={cert.id}
              className="cert-card reveal-item is-revealed"
              style={{
                width: isCertsExpanded ? "100%" : `${cardWidth}px`,
                maxWidth: isCertsExpanded ? "100%" : `${cardWidth}px`,
                flex: isCertsExpanded ? "1 1 100%" : `0 0 ${cardWidth}px`,
                boxSizing: "border-box",
              }}
            >
              {cert.imageUrl ? (
                <div className="cert-img-wrap">
                  <img
                    src={cert.imageUrl}
                    alt={cert.title}
                    className="cert-img"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.parentElement.classList.add("img-fallback");
                    }}
                  />
                  <div className="cert-badge-overlay">
                    <span>{cert.platform}</span>
                  </div>
                </div>
              ) : (
                <div className="cert-no-img-badge">
                  <span className="cert-platform-chip">{cert.platform}</span>
                  <span className="cert-year-chip">{cert.date}</span>
                </div>
              )}

              <div className="cert-body">
                <div className="cert-meta-row">
                  <span className="cert-issuer">{cert.issuer}</span>
                  <span className="cert-date">{cert.date}</span>
                </div>

                <h3 className="cert-title">{cert.title}</h3>
                <p className="cert-desc">{cert.desc}</p>

                <div className="cert-tags">
                  {cert.skills.map((s, idx) => (
                    <span key={idx} className="tag-pill">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="cert-footer-row">
                  <span className="cert-id-tag" title={cert.credentialId}>
                    ID: {cert.credentialId}
                  </span>
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pill-btn cert-verify-btn"
                    data-cursor="VERIFY"
                  >
                    <span>Verify Credential ↗</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
