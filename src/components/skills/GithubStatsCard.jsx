import React, { useEffect } from "react";

export default function GithubStatsCard() {
  useEffect(() => {
    const hm = document.getElementById("github-heatmap");
    if (hm && hm.children.length === 0) {
      for (let i = 0; i < 26 * 5; i++) {
        const cell = document.createElement("div");
        const r = (i * 17 + 11) % 10;
        cell.className =
          "heat-cell" +
          (r > 7 ? " l3" : r > 4 ? " l2" : r > 2 ? " l1" : "");
        hm.appendChild(cell);
      }
    }
  }, []);

  return (
    <div className="github-stats-card reveal-item">
      <div>
        <div className="eyebrow" style={{ marginBottom: "6px" }}>
          CODING PROFILES
        </div>
        <h3 className="skills-bento-title">
          GitHub (@Nithwin) &amp; LeetCode (@vmnithwin)
        </h3>
      </div>

      <div className="nn-metrics-grid">
        <div className="nn-stat-box">
          <div className="nn-stat-val">800+</div>
          <div className="nn-stat-lbl">LeetCode Problems Solved</div>
        </div>
        <div className="nn-stat-box">
          <div className="nn-stat-val">130+</div>
          <div className="nn-stat-lbl">Public GitHub Repositories</div>
        </div>
        <div className="nn-stat-box">
          <div className="nn-stat-val">1</div>
          <div className="nn-stat-lbl">IEEE Xplore Research Paper</div>
        </div>
        <div className="nn-stat-box">
          <div className="nn-stat-val">Go &amp; C++</div>
          <div className="nn-stat-lbl">Primary Systems Stack</div>
        </div>
      </div>

      <div style={{ minWidth: 0, maxWidth: "100%", width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--fg-muted)",
            marginBottom: "8px",
          }}
        >
          <span>GITHUB CONTRIBUTIONS</span>
          <span style={{ color: "var(--accent)" }}>ACTIVE MAINTAINER</span>
        </div>
        <div className="heatmap-scroll-wrap">
          <div className="heatmap-grid" id="github-heatmap"></div>
        </div>
      </div>
    </div>
  );
}
