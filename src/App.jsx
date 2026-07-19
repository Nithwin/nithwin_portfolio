import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./styles/globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import CursorGlow from "./components/CursorGlow";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Publications from "./sections/Publications";
import Skills from "./sections/Skills";
import CodingProfiles from "./sections/CodingProfiles";
import Contact from "./sections/Contact";

/* ===================== CINEMATIC PRELOADER ===================== */
const LoadingScreen = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame;
    let start = null;
    const duration = 2400; // 2.4s count-up

    const tick = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic for natural feel
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * 100));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "#050508",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Ambient aurora spheres */}
      <motion.div
        style={{
          position: "absolute",
          top: "30%",
          left: "20%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(123,47,255,0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        style={{
          position: "absolute",
          bottom: "20%",
          right: "15%",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Center content */}
      <div style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
        {/* Greeting line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: "0.72rem",
            fontFamily: "JetBrains Mono, monospace",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.2)",
            marginBottom: "16px",
          }}
        >
          Loading Experience
        </motion.p>

        {/* Name — cinematic text reveal */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: "clamp(2.2rem, 6vw, 4rem)",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            marginBottom: "8px",
          }}
        >
          <span
            style={{
              background: "linear-gradient(135deg, #7B2FFF 0%, #00D4FF 60%, #00FFD1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Nithwin V M
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: "0.92rem",
            fontFamily: "Plus Jakarta Sans, sans-serif",
            color: "rgba(255,255,255,0.35)",
            fontWeight: 500,
            marginBottom: "48px",
          }}
        >
          Full Stack & Generative AI Engineer
        </motion.p>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          style={{ width: "200px", margin: "0 auto", position: "relative" }}
        >
          <div
            style={{
              width: "100%",
              height: "1px",
              background: "rgba(255,255,255,0.06)",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            <motion.div
              style={{
                height: "100%",
                background: "linear-gradient(90deg, #7B2FFF, #00D4FF)",
                borderRadius: "2px",
                transformOrigin: "left",
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: count / 100 }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </div>

          {/* Counter */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{
              marginTop: "16px",
              fontSize: "0.78rem",
              fontFamily: "JetBrains Mono, monospace",
              color: "rgba(255,255,255,0.25)",
              letterSpacing: "0.1em",
            }}
          >
            <span style={{ color: "rgba(123,47,255,0.7)", fontWeight: 600 }}>
              {String(count).padStart(3, "0")}
            </span>
            <span style={{ margin: "0 6px" }}>/</span>
            <span>100</span>
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom corner signature */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        style={{
          position: "absolute",
          bottom: "24px",
          right: "24px",
          fontSize: "0.62rem",
          fontFamily: "JetBrains Mono, monospace",
          color: "rgba(255,255,255,0.12)",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}
      >
        © 2025 Portfolio
      </motion.p>
    </motion.div>
  );
};

/* ===================== APP ===================== */
const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            style={{ background: "var(--bg-primary)", minHeight: "100vh" }}
          >
            <CursorGlow />
            <Navigation />
            <Hero />
            <About />
            <Projects />
            <Publications />
            <Skills />
            <CodingProfiles />
            <Contact />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default App;