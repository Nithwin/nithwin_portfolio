import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./styles/globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Leetcode from "./sections/Leetcode";
import Contact from "./sections/Contact";

/* ===================== LOADING SCREEN ===================== */
const LoadingScreen = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0, scale: 1.02 }}
    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    style={{
      position: "fixed",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 200,
      background: "#0A0A12",
    }}
  >
    {/* Animated rings */}
    <div style={{ position: "relative", width: "100px", height: "100px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "32px" }}>
      <motion.div
        style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "2px solid rgba(123,47,255,0.3)" }}
        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        style={{ position: "absolute", width: "72px", height: "72px", borderRadius: "50%", border: "2px solid rgba(0,212,255,0.4)", borderTopColor: "transparent" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        style={{ position: "absolute", width: "44px", height: "44px", borderRadius: "50%", border: "2px solid rgba(123,47,255,0.8)", borderBottomColor: "transparent" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        style={{ width: "14px", height: "14px", borderRadius: "50%", background: "linear-gradient(135deg, #7B2FFF, #00D4FF)" }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>

    {/* Name */}
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ textAlign: "center" }}>
      <h1 style={{
        fontSize: "1.8rem",
        fontFamily: "Syne, sans-serif",
        fontWeight: 700,
        background: "linear-gradient(135deg, #7B2FFF, #00D4FF)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        marginBottom: "6px",
      }}>
        Nithwin V M
      </h1>
      <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>Portfolio</p>
    </motion.div>

    {/* Progress bar */}
    <motion.div style={{ marginTop: "28px", width: "100px", height: "2px", borderRadius: "2px", overflow: "hidden", background: "rgba(255,255,255,0.06)" }}>
      <motion.div
        style={{ height: "100%", borderRadius: "2px", background: "linear-gradient(90deg, #7B2FFF, #00D4FF)" }}
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      />
    </motion.div>
  </motion.div>
);

/* ===================== APP ===================== */
const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
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
            <Navigation />
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Leetcode />
            <Contact />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default App;