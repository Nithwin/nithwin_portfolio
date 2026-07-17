import React from "react";
import { motion } from "framer-motion";

const DesktopNav = ({ items, activeSection, scrollTo, isDark }) => {
  return (
    <div
      className="desktop-nav-group"
      style={{
        display: "none",
        alignItems: "center",
        gap: "4px",
        background: isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.03)",
        padding: "6px",
        borderRadius: "50px",
        border: "1px solid var(--border)",
      }}
    >
      {items.map(({ id, label }) => {
        const isActive = activeSection === id;
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            style={{
              position: "relative",
              padding: "8px 18px",
              borderRadius: "50px",
              fontSize: "0.88rem",
              fontWeight: isActive ? 600 : 500,
              color: isActive ? "#FFFFFF" : "var(--text-secondary)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "color 0.3s ease",
              zIndex: 1,
            }}
          >
            {isActive && (
              <motion.div
                layoutId="activeNavIndicator"
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50px",
                  background: "linear-gradient(135deg, #7B2FFF, #00D4FF)",
                  boxShadow: "0 4px 15px rgba(123, 47, 255, 0.4)",
                  zIndex: -1,
                }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default DesktopNav;
