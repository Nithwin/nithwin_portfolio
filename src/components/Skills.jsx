import React, { useEffect, useState } from "react";
import SkillsCanvas from "./skills/SkillsCanvas";
import GithubStatsCard from "./skills/GithubStatsCard";

export default function Skills({ theme }) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      className="section-block"
      id="skills"
      style={{ borderBottom: "none" }}
    >
      <div className="section-header-row">
        <div>
          <span className="eyebrow">TECH STACK &amp; PROFILES</span>
          <h2 className="section-title">Skills &amp; Activity</h2>
        </div>
        <div className="section-header-actions">
          <a
            href="https://github.com/Nithwin"
            target="_blank"
            rel="noopener noreferrer"
            className="pill-btn"
            data-cursor="GITHUB"
          >
            GitHub @Nithwin ↗
          </a>
          <a
            href="https://ieeexplore.ieee.org/iel8/11502027/11502031/11502277.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="pill-btn"
            data-cursor="IEEE"
          >
            IEEE Xplore Paper ↗
          </a>
        </div>
      </div>

      <div className="skills-and-github-grid">
        <SkillsCanvas theme={theme} isMobile={isMobile} />
        <GithubStatsCard />
      </div>
    </section>
  );
}
