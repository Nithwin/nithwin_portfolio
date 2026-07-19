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
        <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: "48px" }}>
          <span className="section-label">Research</span>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontFamily: "var(--font-syne)", fontWeight: 700, marginTop: "16px", color: "var(--text-primary)" }}>
            Academic <span className="gradient-text">Publications</span>
          </h2>
        </motion.div>

        <motion.div 
          variants={fadeUp} 
          className="publication-card glass-card"
          whileHover={{ y: -8 }}
          style={{
            position: "relative",
            maxWidth: "900px",
            margin: "0 auto",
            padding: "40px",
            borderRadius: "24px",
            border: "1px solid var(--border)",
            display: "grid",
            gridTemplateColumns: "1fr 1.5fr",
            gap: "40px",
            alignItems: "center",
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

          {/* Left Side: Badge & Meta */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(123,47,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--purple-light)" }}>
                <RiBookOpenLine size={24} />
              </div>
              <div>
                <p style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--purple-light)" }}>Publisher</p>
                <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>IEEE Xplore</p>
              </div>
            </div>

            <h3 style={{ fontSize: "1.6rem", fontFamily: "var(--font-syne)", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.3, marginBottom: "16px" }}>
              Smart ID Card Detection Based on CA-YOLOv8
            </h3>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              <span className="pub-tag">YOLOv8</span>
              <span className="pub-tag">Computer Vision</span>
              <span className="pub-tag">Deep Learning</span>
            </div>
          </div>

          {/* Right Side: Abstract & Link */}
          <div style={{ paddingLeft: "32px", borderLeft: "1px solid var(--border)" }} className="pub-content-right">
            <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "var(--text-muted)", marginBottom: "24px" }}>
              A novel approach integrating Coordinate Attention (CA) into the YOLOv8 architecture to significantly enhance real-time detection and extraction of ID card details in complex environments. This architecture effectively mitigates background noise and improves bounding box precision.
            </p>

            <ul style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                <RiCheckDoubleLine size={16} color="var(--neon)" /> Peer-reviewed Conference Paper
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                <RiCheckDoubleLine size={16} color="var(--neon)" /> Standardized Evaluation Metrics
              </li>
            </ul>

            <a 
              href="https://ieeexplore.ieee.org/document/11502277" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-primary"
              style={{ display: "inline-flex", gap: "8px", padding: "12px 24px", borderRadius: "50px" }}
            >
              Read on IEEE Xplore <RiArrowRightUpLine size={18} />
            </a>
          </div>
        </motion.div>
      </div>

      <style>{`
        .pub-tag {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 6px 12px;
          border-radius: 50px;
          background: rgba(0,212,255,0.08);
          color: var(--cyan);
          border: 1px solid rgba(0,212,255,0.2);
        }
        
        .publication-card:hover {
          border-color: rgba(123, 47, 255, 0.4);
          box-shadow: 0 20px 40px rgba(0,0,0,0.2), 0 0 40px rgba(123,47,255,0.1);
        }

        @media (max-width: 900px) {
          .publication-card {
            grid-template-columns: 1fr;
            gap: 24px;
            padding: 24px;
          }
          .pub-content-right {
            padding-left: 0 !important;
            border-left: none !important;
            border-top: 1px solid var(--border);
            padding-top: 24px;
          }
        }
      `}</style>
    </SectionReveal>
  );
};

export default Publications;
