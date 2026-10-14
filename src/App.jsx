import React, { useEffect, useRef, useState } from "react";
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

/* ─── SPLIT-SHUTTER PRELOADER ─────────────────────────────────────── */
const Preloader = ({ onDone }) => {
  const [count, setCount] = useState(0);
  const shutterTopRef = useRef(null);
  const shutterBottomRef = useRef(null);
  const hudRef = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    let start = null;
    const duration = 2200;
    let raf;

    const tick = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const n = Math.floor(eased * 100);
      setCount(n);
      if (fillRef.current) fillRef.current.style.width = `${eased * 100}%`;

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        // Trigger shutter open
        setTimeout(() => {
          if (hudRef.current) {
            hudRef.current.style.opacity = "0";
            hudRef.current.style.transform = "scale(1.06)";
          }
          setTimeout(() => {
            if (shutterTopRef.current) shutterTopRef.current.style.transform = "translateY(-102%)";
            if (shutterBottomRef.current) shutterBottomRef.current.style.transform = "translateY(102%)";
            setTimeout(onDone, 950);
          }, 200);
        }, 250);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div id="preloader">
      {/* Shutter panels */}
      <div
        ref={shutterTopRef}
        className="shutter-panel shutter-top"
      />
      <div
        ref={shutterBottomRef}
        className="shutter-panel shutter-bottom"
      />

      {/* HUD overlay */}
      <div ref={hudRef} className="preloader-hud">
        {/* Top bar */}
        <div className="preloader-bar-row">
          <span>Nithwin V M — Portfolio</span>
          <span>Loading Experience</span>
        </div>

        {/* Center — big counter */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div className="preloader-counter">
              {String(count).padStart(2, "0")}
              <span>%</span>
            </div>
            <div className="preloader-label" style={{ marginTop: 12 }}>
              Full Stack &amp; Generative AI Engineer
            </div>
          </div>
          {/* Vertical tagline */}
          <div style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(244,243,239,0.2)",
            writingMode: "vertical-rl",
            marginBottom: "4px",
          }}>
            Building the future with code &amp; AI
          </div>
        </div>

        {/* Progress bar */}
        <div>
          <div className="preloader-progress-track">
            <div ref={fillRef} className="preloader-progress-fill" />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── APP ─────────────────────────────────────────────────────────── */
const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider>
      {loading && <Preloader onDone={() => setLoading(false)} />}
      <div
        style={{
          opacity: loading ? 0 : 1,
          transition: "opacity 0.4s ease",
          background: "var(--bg)",
          minHeight: "100vh",
        }}
      >
        <CursorGlow />
        <Navigation />
        <main>
          <Hero />
          <About />
          <Projects />
          <Publications />
          <Skills />
          <CodingProfiles />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;