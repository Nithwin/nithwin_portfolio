import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  SiLeetcode,
} from "react-icons/si";
import {
  FaGithub, FaCodeBranch, FaStar, FaUserFriends, FaExternalLinkAlt,
} from "react-icons/fa";
import { VscPassFilled } from "react-icons/vsc";
import { BiAdjust } from "react-icons/bi";
import { CgDanger } from "react-icons/cg";
import { RiGitRepositoryLine } from "react-icons/ri";

const LC_USER = "vmnithwin";
const GH_USER = "Nithwin";

const CodingProfiles = () => {
  const [lcStats, setLcStats] = useState(null);
  const [ghStats, setGhStats] = useState(null);
  const [loadingLc, setLoadingLc] = useState(true);
  const [loadingGh, setLoadingGh] = useState(true);
  const sectionRef = useRef(null);
  const diffBarsRef = useRef([]);

  useEffect(() => {
    axios.get(`https://leetcode-api-faisalshohag.vercel.app/${LC_USER}`)
      .then(({ data }) => { if (data?.totalQuestions) setLcStats(data); })
      .catch(() => {})
      .finally(() => setLoadingLc(false));

    axios.get(`https://api.github.com/users/${GH_USER}`)
      .then(({ data }) => { if (data?.login) setGhStats(data); })
      .catch(() => {})
      .finally(() => setLoadingGh(false));
  }, []);

  // Animate progress bars on intersection
  useEffect(() => {
    if (!lcStats) return;
    const total = lcStats.totalQuestions || 1;
    const diffs = [
      { count: lcStats.easySolved || 0, color: "#22C55E" },
      { count: lcStats.mediumSolved || 0, color: "#F97316" },
      { count: lcStats.hardSolved || 0, color: "#EF4444" },
    ];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          diffBarsRef.current.forEach((bar, i) => {
            if (bar) {
              setTimeout(() => {
                bar.style.transform = `scaleX(${diffs[i].count / total})`;
              }, i * 120);
            }
          });
        }
      });
    }, { threshold: 0.3 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, [lcStats]);

  // Section reveal
  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".reveal") || [];
    const obs = new IntersectionObserver(
      (e) => e.forEach((en) => en.isIntersecting && en.target.classList.add("revealed")),
      { threshold: 0.05 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  let lcAcceptance = "—";
  if (lcStats?.totalSubmissions) {
    const all = lcStats.totalSubmissions.find((s) => s.difficulty === "All");
    if (all?.submissions > 0) {
      lcAcceptance = Math.round((all.count / all.submissions) * 100) + "%";
    }
  }

  const diffs = lcStats
    ? [
        { label: "Easy", count: lcStats.easySolved || 0, total: lcStats.totalEasy || 0, color: "#22C55E", Icon: VscPassFilled },
        { label: "Med", count: lcStats.mediumSolved || 0, total: lcStats.totalMedium || 0, color: "#F97316", Icon: BiAdjust },
        { label: "Hard", count: lcStats.hardSolved || 0, total: lcStats.totalHard || 0, color: "#EF4444", Icon: CgDanger },
      ]
    : [];

  return (
    <section id="coding-profiles" className="section-block" ref={sectionRef}>
      <div className="container">
        <div className="section-header-row reveal">
          <div>
            <span className="eyebrow">Developer Stats</span>
            <h2 className="section-title">Coding Profiles</h2>
          </div>
          <p className="section-subtitle">
            Tracking my journey through algorithms, open source, and daily contributions.
          </p>
        </div>

        <div className="profiles-grid">
          {/* ── LeetCode Card ── */}
          <div className="profile-card reveal">
            <div className="profile-header">
              <div
                className="profile-icon"
                style={{ background: "rgba(255,161,22,0.1)", border: "1px solid rgba(255,161,22,0.25)" }}
              >
                <SiLeetcode size={22} style={{ color: "#FFA116" }} />
              </div>
              <div>
                <div className="profile-title">LeetCode</div>
                <a
                  href={`https://leetcode.com/u/${LC_USER}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="profile-handle"
                >
                  @{LC_USER} <FaExternalLinkAlt size={9} />
                </a>
              </div>
            </div>

            {loadingLc ? (
              <div className="loading-container"><div className="spinner" style={{ borderTopColor: "#FFA116" }} /></div>
            ) : !lcStats ? (
              <p style={{ color: "var(--fg-muted)", fontSize: "13px", padding: "16px 0" }}>
                Unable to load LeetCode stats right now.
              </p>
            ) : (
              <div>
                {/* Main stats row */}
                <div className="lc-stats-row">
                  <div className="lc-solved-box">
                    <p className="lc-solved-label">Total Solved</p>
                    <p className="lc-solved-big">{lcStats.totalSolved}</p>
                  </div>
                  <div className="lc-meta-box">
                    <div className="lc-meta-row">
                      <span className="lc-meta-key">Global Rank</span>
                      <span className="lc-meta-val" style={{ color: "#FFA116" }}>
                        {lcStats.ranking ? `#${lcStats.ranking.toLocaleString()}` : "—"}
                      </span>
                    </div>
                    <div className="lc-meta-row">
                      <span className="lc-meta-key">Acceptance</span>
                      <span className="lc-meta-val" style={{ color: "#22C55E" }}>
                        {lcAcceptance}
                      </span>
                    </div>
                    <div className="lc-meta-row">
                      <span className="lc-meta-key">Streak</span>
                      <span className="lc-meta-val">
                        {lcStats.totalActiveDays || "—"}d
                      </span>
                    </div>
                  </div>
                </div>

                {/* Difficulty breakdown */}
                <div className="difficulty-grid">
                  {diffs.map((d, i) => (
                    <div key={d.label} className="diff-card">
                      <div className="diff-label">
                        {d.label}
                        <d.Icon size={12} style={{ color: d.color }} />
                      </div>
                      <div className="diff-count" style={{ color: d.color }}>{d.count}</div>
                      <div className="diff-progress">
                        <div
                          ref={(el) => { diffBarsRef.current[i] = el; }}
                          className="diff-bar"
                          style={{ background: d.color }}
                        />
                      </div>
                      <div style={{ fontSize: "10px", color: "var(--fg-muted)", marginTop: "4px", textAlign: "right" }}>
                        / {d.total}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── GitHub Card ── */}
          <div className="profile-card reveal reveal-delay-1">
            <div className="profile-header">
              <div
                className="profile-icon"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid var(--border-strong)" }}
              >
                <FaGithub size={22} style={{ color: "var(--fg)" }} />
              </div>
              <div>
                <div className="profile-title">GitHub</div>
                <a
                  href={`https://github.com/${GH_USER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="profile-handle"
                >
                  @{GH_USER} <FaExternalLinkAlt size={9} />
                </a>
              </div>
            </div>

            {loadingGh ? (
              <div className="loading-container"><div className="spinner" /></div>
            ) : !ghStats ? (
              <p style={{ color: "var(--fg-muted)", fontSize: "13px", padding: "16px 0" }}>
                Unable to load GitHub stats right now.
              </p>
            ) : (
              <div>
                {/* Bio */}
                {ghStats.bio && (
                  <p style={{ fontSize: "13.5px", color: "var(--fg-muted)", lineHeight: 1.55, marginBottom: "20px" }}>
                    {ghStats.bio}
                  </p>
                )}

                {/* Stats grid */}
                <div className="gh-stats-grid">
                  {[
                    { Icon: RiGitRepositoryLine, label: "Public Repos", val: ghStats.public_repos, color: "#FF3B1D" },
                    { Icon: FaUserFriends, label: "Followers", val: ghStats.followers, color: "#00D4FF" },
                    { Icon: FaCodeBranch, label: "Following", val: ghStats.following, color: "#22C55E" },
                    { Icon: FaStar, label: "Public Gists", val: ghStats.public_gists, color: "#F97316" },
                  ].map(({ Icon, label, val, color }) => (
                    <div key={label} className="gh-stat-item">
                      <div className="gh-stat-icon" style={{ background: `${color}15`, color }}>
                        <Icon size={14} />
                      </div>
                      <div>
                        <div className="gh-stat-val">{val ?? "—"}</div>
                        <div className="gh-stat-key">{label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Profile CTA */}
                <a
                  href={`https://github.com/${GH_USER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ marginTop: "24px", width: "100%", justifyContent: "center" }}
                >
                  <FaGithub size={14} />
                  View GitHub Profile
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodingProfiles;
