import React, { useState, useEffect, useRef } from "react";

export default function Certifications({
  certsList,
  certSliderIndex,
  setCertSliderIndex,
  isCertsExpanded,
  setIsCertsExpanded,
}) {
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

  const maxIndex = isMobile
    ? Math.max(0, certsList.length - 1)
    : Math.max(0, certsList.length - 2);

  const handlePrev = () => {
    setIsCertsExpanded(false);
    setCertSliderIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setIsCertsExpanded(false);
    setCertSliderIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
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
              ? `SHOWING 0${certSliderIndex + 1} OF 0${certsList.length}`
              : `SHOWING 0${certSliderIndex + 1}–0${Math.min(
                  certsList.length,
                  certSliderIndex + 2
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
        className="certs-viewport"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={`certs-track reveal-group ${
            isCertsExpanded ? "expanded-grid" : ""
          }`}
          style={{
            gridTemplateColumns: isCertsExpanded
              ? undefined
              : isMobile
              ? `repeat(${certsList.length}, 100%)`
              : `repeat(${certsList.length}, calc(50% - 16px))`,
            gap: isMobile ? "20px" : "32px",
            transform: isCertsExpanded
              ? "none"
              : isMobile
              ? `translate3d(calc(-${certSliderIndex * 100}% - ${
                  certSliderIndex * 20
                }px), 0, 0)`
              : `translate3d(calc(-${certSliderIndex * 50}% - ${
                  certSliderIndex * 16
                }px), 0, 0)`,
          }}
        >
          {certsList.map((cert) => (
            <article key={cert.id} className="cert-card reveal-item">
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
