import React, { useEffect, useState, useRef } from "react";
import "./styles/globals.css";
import { PROJECTS } from "./data/projectsData";
import { CERTIFICATIONS } from "./data/certsData";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./config/firebase";

import Preloader from "./components/Preloader";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ProjectModal from "./components/ProjectModal";

export default function App() {
  const getInitialTheme = () => {
    try {
      const saved =
        localStorage.getItem("portfolio-theme") ||
        localStorage.getItem("nithwin_theme");
      if (saved === "light" || saved === "dark") return saved;
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: light)").matches
      ) {
        return "light";
      }
    } catch (e) {}
    return "dark";
  };

  const [theme, setTheme] = useState(getInitialTheme);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [activeNav, setActiveNav] = useState("top");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectsList, setProjectsList] = useState(PROJECTS);
  const [certsList, setCertsList] = useState(CERTIFICATIONS);
  const [certSliderIndex, setCertSliderIndex] = useState(0);
  const [isCertsExpanded, setIsCertsExpanded] = useState(false);

  const themeRef = useRef(getInitialTheme());
  themeRef.current = theme;

  // Fetch original project documents and images from Firestore database
  useEffect(() => {
    let isMounted = true;
    async function fetchOriginalProjects() {
      try {
        const snap = await getDocs(collection(db, "projects"));
        if (!snap.empty && isMounted) {
          const dbData = snap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setProjectsList((prev) => {
            return prev.map((localProj) => {
              const matched = dbData.find((d) => {
                const dt = (d.title || "").toLowerCase();
                const lt = (localProj.title || "").toLowerCase();
                if (dt.includes("windmist") && lt.includes("windmist")) return true;
                if (
                  (dt.includes("yolo") || dt.includes("id card") || dt.includes("sicd")) &&
                  (lt.includes("yolo") || lt.includes("id"))
                )
                  return true;
                if (dt.includes("ammubus") && lt.includes("ammubus")) return true;
                if (dt.includes("shadow") && lt.includes("shadow")) return true;
                if (
                  (dt.includes("tcp") || dt.includes("chat")) &&
                  (lt.includes("tcp") || lt.includes("chat"))
                )
                  return true;
                return false;
              });

              if (matched) {
                return {
                  ...localProj,
                  title: matched.title || localProj.title,
                  desc: matched.description || localProj.desc,
                  tags:
                    matched.tags && matched.tags.length
                      ? matched.tags
                      : localProj.tags,
                  imageUrl: matched.imageUrl || localProj.imageUrl || null,
                  live: matched.demoUrl || localProj.live,
                  repo: matched.githubUrl || localProj.repo,
                  fromDb: true,
                };
              }
              return localProj;
            });
          });
        }
      } catch (err) {
        console.warn("Firestore projects fetch error:", err);
      }

      // Check if certificates collection exists in Firestore DB
      try {
        const certsSnap = await getDocs(collection(db, "certificates"));
        if (!certsSnap.empty && isMounted) {
          const dbCerts = certsSnap.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          }));
          setCertsList((prev) => {
            return prev.map((localCert) => {
              const matched = dbCerts.find(
                (d) =>
                  d.id === localCert.id ||
                  (d.title &&
                    localCert.title &&
                    d.title.toLowerCase() === localCert.title.toLowerCase())
              );
              return matched ? { ...localCert, ...matched } : localCert;
            });
          });
        }
      } catch (certErr) {
        // graceful offline fallback to local data
      }
    }

    fetchOriginalProjects();
    return () => {
      isMounted = false;
    };
  }, []);

  // Sync initial theme with DOM & localStorage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("portfolio-theme", theme);
      localStorage.setItem("nithwin_theme", theme);
    } catch (e) {}
  }, [theme]);

  // Toggle Dark / Light Theme with Radial Circular Wipe Transition
  const handleToggleTheme = (e) => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    const updateDOM = () => {
      setTheme(nextTheme);
      themeRef.current = nextTheme;
      document.documentElement.setAttribute("data-theme", nextTheme);
      try {
        localStorage.setItem("portfolio-theme", nextTheme);
        localStorage.setItem("nithwin_theme", nextTheme);
      } catch (e) {}
    };

    if (
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      updateDOM();
      return;
    }

    const btn = document.getElementById("theme-toggle");
    const rect = btn?.getBoundingClientRect();
    const x = e?.clientX ?? (rect ? rect.left + rect.width / 2 : window.innerWidth / 2);
    const y = e?.clientY ?? (rect ? rect.top + rect.height / 2 : window.innerHeight / 2);

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      updateDOM();
    });

    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 650,
            easing: "cubic-bezier(0.2, 0, 0, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      })
      .catch(() => {
        updateDOM();
      });
  };

  // Active section scroll spy
  useEffect(() => {
    const sectionIds = ["top", "about", "work", "skills", "certs", "contact", "footer"];
    const onScroll = () => {
      const scrollPos = window.scrollY + 180;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveNav(id);
          }
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smooth scroll-reveal observer for non-About sections (re-animates on every scroll)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
          } else {
            entry.target.classList.remove("is-revealed");
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -30px 0px",
        threshold: 0.05,
      }
    );

    const elements = document.querySelectorAll(".reveal-item, .reveal-group");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [projectsList, certsList, isExpanded, isCertsExpanded]);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Preloader theme={theme} />
      <Header
        activeNav={activeNav}
        scrollToSection={scrollToSection}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="container" id="top">
        <Hero theme={theme} />
        <About />
        <Projects
          projectsList={projectsList}
          sliderIndex={sliderIndex}
          setSliderIndex={setSliderIndex}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          onSelectProject={setActiveModalProject}
          theme={theme}
        />
        <Skills theme={theme} />
        <Certifications
          certsList={certsList}
          certSliderIndex={certSliderIndex}
          setCertSliderIndex={setCertSliderIndex}
          isCertsExpanded={isCertsExpanded}
          setIsCertsExpanded={setIsCertsExpanded}
        />
        <Contact />
      </main>

      <Footer />
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </>
  );
}