import React from "react";
import { motion } from "framer-motion";

const LogoPill = ({ isDark, onClick, videoRef }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      style={{
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        height: "44px",
        padding: "2px 14px",
        borderRadius: "50px",
        background: "#0A0A12", // Keep dark backdrop so black video blends seamlessly!
        border: isDark
          ? "1.5px solid rgba(123, 47, 255, 0.5)"
          : "2px solid #7B2FFF",
        boxShadow: isDark
          ? "0 0 20px rgba(123, 47, 255, 0.3)"
          : "0 4px 16px rgba(123, 47, 255, 0.25)",
        overflow: "hidden",
        flexShrink: 0,
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <video
        ref={videoRef}
        src="./assets/nithwin.mp4"
        loop
        muted
        autoPlay
        playsInline
        style={{
          height: "36px",
          width: "auto",
          display: "block",
          objectFit: "contain",
          borderRadius: "20px",
        }}
      />
    </motion.div>
  );
};

export default LogoPill;
