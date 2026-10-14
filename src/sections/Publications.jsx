import React, { useEffect, useRef } from "react";
import { RiBookOpenLine, RiArrowRightUpLine, RiCheckDoubleLine } from "react-icons/ri";

const Publications = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".reveal") || [];
    const obs = new IntersectionObserver(
      (e) => e.forEach((en) => en.isIntersecting && en.target.classList.add("revealed")),
      { threshold: 0.08 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="publications" className="section-block" ref={sectionRef}>
      <div className="container">
        <div className="section-header-row reveal">
          <div>
            <span className="eyebrow">Research</span>
            <h2 className="section-title">Academic Publications</h2>
          </div>
        </div>

        <div className="publication-card reveal">
          <div className="pub-accent-bar" />
          <div className="pub-inner">
            {/* Left */}
            <div>
              <div className="pub-publisher-row">
                <div className="pub-icon">
                  <RiBookOpenLine />
                </div>
                <div>
                  <div className="pub-publisher-label">Publisher</div>
                  <div className="pub-publisher-name">IEEE Xplore</div>
                </div>
              </div>

              <h3 className="pub-title">
                Smart ID Card Detection Based on CA-YOLOv8
              </h3>

              <div className="pub-tags">
                <span className="pub-tag">YOLOv8</span>
                <span className="pub-tag">Computer Vision</span>
                <span className="pub-tag">Deep Learning</span>
                <span className="pub-tag">Coordinate Attention</span>
              </div>
            </div>

            {/* Right */}
            <div>
              <p className="pub-abstract">
                A novel approach integrating Coordinate Attention (CA) into the
                YOLOv8 architecture to significantly enhance real-time detection
                and extraction of ID card details in complex environments. This
                architecture effectively mitigates background noise and improves
                bounding box precision across diverse lighting conditions and
                occlusion scenarios.
              </p>

              <ul className="pub-checklist">
                {[
                  "Peer-reviewed Conference Paper",
                  "Standardized Evaluation Metrics (mAP, F1, Precision)",
                  "Real-time Inference Optimized",
                  "Published on IEEE Xplore",
                ].map((item) => (
                  <li key={item} className="pub-check-item">
                    <RiCheckDoubleLine className="pub-check-icon" size={16} />
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href="https://ieeexplore.ieee.org/document/11502277"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ display: "inline-flex", borderRadius: "999px" }}
                data-cursor="READ"
              >
                Read on IEEE Xplore <RiArrowRightUpLine size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Publications;
