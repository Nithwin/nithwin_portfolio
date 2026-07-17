import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiSunLine, RiMoonClearLine } from "react-icons/ri";

const ThemeToggle = ({ isDark, onToggle }) => {
  return (
    <motion.button
      onClick={onToggle}
      whileHover={{ scale: 1.1, rotate: 15 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle theme"
      style={{
        width: "42px",
        height: "42px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
        border: "1px solid var(--border)",
        cursor: "pointer",
        flexShrink: 0,
      }}
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <RiSunLine size={19} color="#FFD700" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <RiMoonClearLine size={19} color="#7B2FFF" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default ThemeToggle;
