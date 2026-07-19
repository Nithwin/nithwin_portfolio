import React from "react";
import { motion } from "framer-motion";
import SectionReveal, { fadeUp, slideInRight } from "../components/SectionReveal";
import { RiBookOpenLine, RiExternalLinkLine, RiArrowRightUpLine, RiCheckDoubleLine } from "react-icons/ri";

const Publications = () => {
  return (
    <SectionReveal id="publications">
      <div className="grid-bg" />
      
      {/* Ambient background glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(123,47,255,0.05) 0%, rgba(0,212,255,0.03) 50%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <div className="container-main" style={{ position: "relative", zIndex: 10 }}>
        <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: "40px" }}>
          <span className="section-label">Research</span>
          <h2 className="pub-heading" style={{ fontFamily: "var(--font-syne)", fontWeight: 700, marginTop: "16px", color: "var(--text-primary)" }}>
            Academic <span className="gradient-text">Publications</span>
          </h2>
        </motion.div>

        <motion.div 
          variants={fadeUp} 
          className="publication-card glass-card"
          whileHover={{ y: -4 }}
          style={{
            position: "relative",
            maxWidth: "900px",
            margin: "0 auto",
            borderRadius: "24px",
            border: "1px solid var(--border)",
            overflow: "hidden",
            transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {/* Animated decorative line */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: "4px",
            background: "linear-gradient(to bottom, #7B2FFF, #00D4FF)",
          }} />

          <div className="pub-inner">
            {/* Left Side: Badge & Meta */}
            <div className="pub-content-left">
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <div className="pub-icon-box" style={{ borderRadius: "12px", background: "rgba(123,47,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--purple-light)" }}>
                  <RiBookOpenLine size={22} />
                </div>
                <div>
                  <p style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--purple-light)" }}>Publisher</p>
                  <p className="pub-publisher" style={{ fontWeight: 700, color: "var(--text-primary)" }}>IEEE Xplore</p>
                </div>
              </div>

              <h3 className="pub-title" style={{ fontFamily: "var(--font-syne)", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.3, marginBottom: "14px" }}>
                Smart ID Card Detection Based on CA-YOLOv8
              </h3>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                <span className="pub-tag">YOLOv8</span>
                <span className="pub-tag">Computer Vision</span>
                <span className="pub-tag">Deep Learning</span>
              </div>
            </div>

            {/* Right Side: Abstract & Link */}
            <div className="pub-content-right">
              <p className="pub-abstract" style={{ lineHeight: 1.7, color: "var(--text-muted)", marginBottom: "20px" }}>
                A novel approach integrating Coordinate Attention (CA) into the YOLOv8 architecture to significantly enhance real-time detection and extraction of ID card details in complex environments. This architecture effectively mitigates background noise and improves bounding box precision.
              </p>

              <ul style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
                <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                  <RiCheckDoubleLine size={16} color="var(--neon)" style={{ flexShrink: 0 }} /> Peer-reviewed Conference Paper
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                  <RiCheckDoubleLine size={16} color="var(--neon)" style={{ flexShrink: 0 }} /> Standardized Evaluation Metrics
                </li>
              </ul>

              <a 
                href="https://ieeexplore.ieee.org/document/11502277" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-primary pub-cta-btn"
                style={{ display: "inline-flex", gap: "8px", borderRadius: "50px" }}
              >
                Read on IEEE Xplore <RiArrowRightUpLine size={18} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .pub-heading {
          font-size: clamp(1.8rem, 5vw, 3.5rem);
        }
        .pub-tag {
          font-size: 0.72rem;
          font-weight: 600;
          padding: 5px 11px;
          border-radius: 50px;
          background: rgba(0,212,255,0.08);
          color: var(--cyan);
          border: 1px solid rgba(0,212,255,0.2);
        }
        
        .publication-card:hover {
          border-color: rgba(123, 47, 255, 0.4);
          box-shadow: 0 20px 40px rgba(0,0,0,0.2), 0 0 40px rgba(123,47,255,0.1);
        }

        .pub-inner {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 36px;
          align-items: center;
          padding: 36px;
        }

        .pub-icon-box {
          width: 44px;
          height: 44px;
        }

        .pub-publisher {
          font-size: 1rem;
        }

        .pub-title {
          font-size: 1.4rem;
        }

        .pub-content-right {
          padding-left: 28px;
          border-left: 1px solid var(--border);
        }

        .pub-abstract {
          font-size: 0.92rem;
        }

        .pub-cta-btn {
          padding: 11px 22px;
        }

        /* ════════ TABLET ════════ */
        @media (max-width: 900px) {
          .pub-inner {
            grid-template-columns: 1fr;
            gap: 20px;
            padding: 24px;
          }
          .pub-content-right {
            padding-left: 0;
            border-left: none;
            border-top: 1px solid var(--border);
            padding-top: 20px;
          }
        }

        /* ════════ MOBILE ════════ */
        @media (max-width: 480px) {
          .pub-inner {
            padding: 18px;
            gap: 16px;
          }
          .pub-heading {
            font-size: 1.5rem;
          }
          .pub-icon-box {
            width: 38px;
            height: 38px;
          }
          .pub-icon-box svg {
            width: 18px;
            height: 18px;
          }
          .pub-publisher {
            font-size: 0.9rem;
          }
          .pub-title {
            font-size: 1.15rem;
            margin-bottom: 12px;
          }
          .pub-tag {
            font-size: 0.65rem;
            padding: 4px 9px;
          }
          .pub-abstract {
            font-size: 0.85rem;
            line-height: 1.65;
            margin-bottom: 16px;
          }
          .pub-cta-btn {
            padding: 10px 18px;
            font-size: 0.82rem !important;
            width: 100%;
            justify-content: center;
          }
          .publication-card {
            border-radius: 18px;
          }
        }

        /* ════════ VERY SMALL ════════ */
        @media (max-width: 360px) {
          .pub-inner {
            padding: 14px;
          }
          .pub-title {
            font-size: 1.05rem;
          }
          .pub-abstract {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </SectionReveal>
  );
};

export default Publications;
