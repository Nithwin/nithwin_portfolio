import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiMenu4Line, RiCloseLine } from "react-icons/ri";

export const MobileToggle = ({ isOpen, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      className="mobile-toggle-btn"
      style={{
        width: "42px",
        height: "42px",
        borderRadius: "50%",
        display: "none",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        cursor: "pointer",
        flexShrink: 0,
      }}
      aria-label="Toggle menu"
    >
      {isOpen ? (
        <RiCloseLine size={22} color="var(--text-primary)" />
      ) : (
        <RiMenu4Line size={22} color="var(--text-primary)" />
      )}
    </motion.button>
  );
};

export const MobileDropdown = ({ isOpen, items, activeSection, scrollTo, isDark, scrolled }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.95 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="mobile-toggle-btn"
          style={{
            position: "fixed",
            top: scrolled ? "84px" : "100px",
            left: "16px",
            right: "16px",
            zIndex: 999,
            background: isDark
              ? "rgba(14, 14, 22, 0.96)"
              : "rgba(255, 255, 255, 0.96)",
            border: "1px solid var(--border)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderRadius: "28px",
            padding: "24px",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4)",
            display: "none",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {items.map(({ id, label }, i) => {
            const isActive = activeSection === id;
            return (
              <motion.button
                key={id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => scrollTo(id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  textAlign: "left",
                  padding: "14px 18px",
                  borderRadius: "16px",
                  fontSize: "1.05rem",
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? "#FFFFFF" : "var(--text-secondary)",
                  background: isActive
                    ? "linear-gradient(135deg, rgba(123, 47, 255, 0.8), rgba(0, 212, 255, 0.6))"
                    : "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                <span>{label}</span>
                {isActive && (
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#00FFD1",
                      boxShadow: "0 0 10px #00FFD1",
                    }}
                  />
                )}
              </motion.button>
            );
          })}
          <div
            style={{
              borderTop: "1px solid var(--border)",
              marginTop: "12px",
              paddingTop: "16px",
            }}
          >
            <button
              onClick={() => scrollTo("contact")}
              className="btn-primary"
              style={{
                width: "100%",
                justifyContent: "center",
                padding: "14px",
                borderRadius: "50px",
              }}
            >
              <span>Let's Talk</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
