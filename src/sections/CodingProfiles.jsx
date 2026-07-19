import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import SectionReveal, { fadeUp } from "../components/SectionReveal";
import { SiLeetcode } from "react-icons/si";
import { FaGithub, FaCodeBranch, FaStar, FaUserFriends, FaRegCheckCircle, FaTrophy, FaExternalLinkAlt } from "react-icons/fa";
import { VscPassFilled } from "react-icons/vsc";
import { BiAdjust } from "react-icons/bi";
import { CgDanger } from "react-icons/cg";
import { RiGitRepositoryLine } from "react-icons/ri";
import { useTheme } from "../context/ThemeContext";

const USERNAME = "vmnithwin";
const GITHUB_USERNAME = "Nithwin";

const DifficultyCard = ({ label, count, total, color, icon: Icon }) => {
  const pct = total ? Math.round((count / total) * 100) : 0;
  return (
    <div className="difficulty-card" style={{ borderRadius: "16px", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)" }}>{label}</span>
        <Icon size={14} style={{ color }} />
      </div>
      <div style={{ marginBottom: "8px" }}>
        <span className="difficulty-count" style={{ fontFamily: "var(--font-syne)", fontWeight: 700, color }}>{count}</span>
        <span style={{ fontSize: "0.7rem", marginLeft: "4px", color: "var(--text-muted)" }}>/ {total}</span>
      </div>
      <div className="progress-bar" style={{ height: "4px", marginBottom: "6px" }}>
        <motion.div
          className="progress-fill"
          style={{ background: color, height: "100%" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: pct / 100 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      <p style={{ fontSize: "0.6rem", color: "var(--text-muted)", textAlign: "right" }}>{pct}% solved</p>
    </div>
  );
};

const StatItem = ({ icon: Icon, label, value, color }) => (
  <div className="gh-stat-item" style={{ display: "flex", alignItems: "center", gap: "10px", borderRadius: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)" }}>
    <div style={{ width: "32px", height: "32px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", background: `${color}15`, color: color, flexShrink: 0 }}>
      <Icon size={14} />
    </div>
    <div style={{ minWidth: 0 }}>
      <p className="gh-stat-value" style={{ fontWeight: 700, fontFamily: "var(--font-syne)", color: "var(--text-primary)", lineHeight: 1 }}>{value}</p>
      <p className="gh-stat-label" style={{ color: "var(--text-muted)", marginTop: "3px" }}>{label}</p>
    </div>
  </div>
);

const CodingProfiles = () => {
  const { isDark } = useTheme();
  const [lcStats, setLcStats] = useState(null);
  const [ghStats, setGhStats] = useState(null);
  const [loadingLc, setLoadingLc] = useState(true);
  const [loadingGh, setLoadingGh] = useState(true);

  useEffect(() => {
    const fetchLc = async () => {
      try {
        const { data } = await axios.get(`https://leetcode-api-faisalshohag.vercel.app/${USERNAME}`);
        if (data && data.totalQuestions) setLcStats(data);
      } catch (err) {
        console.error("LeetCode fetch error:", err);
      } finally {
        setLoadingLc(false);
      }
    };
    
    const fetchGh = async () => {
      try {
        const { data } = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}`);
        if (data && data.login) setGhStats(data);
      } catch (err) {
        console.error("GitHub fetch error:", err);
      } finally {
        setLoadingGh(false);
      }
    };

    fetchLc();
    fetchGh();
  }, []);

  // Compute acceptance rate if possible
  let lcAcceptance = "—";
  if (lcStats && lcStats.totalSubmissions) {
    const allSub = lcStats.totalSubmissions.find(s => s.difficulty === "All");
    if (allSub && allSub.submissions > 0) {
      lcAcceptance = Math.round((allSub.count / allSub.submissions) * 100) + "%";
    }
  }

  return (
    <SectionReveal id="coding-profiles">
      <div className="grid-bg" />
      <div className="container-main">
        {/* Header */}
        <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: "40px" }}>
          <span className="section-label">Developer Stats</span>
          <h2 className="cp-heading" style={{ fontFamily: "var(--font-syne)", fontWeight: 700, marginTop: "16px", color: "var(--text-primary)" }}>
            Coding <span className="gradient-text">Profiles</span>
          </h2>
          <p className="cp-subtitle" style={{ margin: "12px auto 0", color: "var(--text-muted)" }}>
            Tracking my journey through algorithms, open source, and daily contributions.
          </p>
        </motion.div>

        <div className="profiles-grid">
          {/* ==================== LEETCODE CARD ==================== */}
          <motion.div variants={fadeUp} className="profile-card glass-card">
            <div className="profile-header">
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div className="profile-icon" style={{ background: "rgba(255,161,22,0.1)", border: "1px solid rgba(255,161,22,0.25)", color: "#FFA116" }}>
                  <SiLeetcode size={24} />
                </div>
                <div>
                  <h3 className="profile-title" style={{ fontFamily: "var(--font-syne)", fontWeight: 700, color: "var(--text-primary)" }}>LeetCode</h3>
                  <a href={`https://leetcode.com/u/${USERNAME}/`} target="_blank" rel="noopener noreferrer" className="profile-link" style={{ color: "var(--text-muted)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    @{USERNAME} <FaExternalLinkAlt size={10} />
                  </a>
                </div>
              </div>
            </div>

            {loadingLc ? (
              <div className="loading-container"><div className="spinner" style={{ borderTopColor: "#FFA116" }} /></div>
            ) : !lcStats ? (
              <div className="error-container">Unable to load LeetCode stats right now.</div>
            ) : (
              <div className="profile-body">
                {/* Main Stats Row */}
                <div className="lc-stats-row" style={{ marginBottom: "20px" }}>
                  <div className="lc-solved-box" style={{ borderRadius: "16px", background: "rgba(255,161,22,0.05)", border: "1px solid rgba(255,161,22,0.15)", textAlign: "center" }}>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "4px" }}>Total Solved</p>
                    <p className="lc-solved-count" style={{ fontFamily: "var(--font-syne)", fontWeight: 700, color: "#FFA116", lineHeight: 1 }}>{lcStats.totalSolved}</p>
                  </div>
                  <div style={{ borderRadius: "16px", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", justifyContent: "center", gap: "10px", padding: "14px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Global Rank</span>
                      <span className="lc-rank-val" style={{ fontWeight: 700, color: "var(--text-primary)" }}>{lcStats.ranking ? `#${lcStats.ranking.toLocaleString()}` : "—"}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Acceptance</span>
                      <span className="lc-rank-val" style={{ fontWeight: 700, color: "var(--neon)" }}>{lcAcceptance}</span>
                    </div>
                  </div>
                </div>

                {/* Difficulty Grid */}
                <div className="difficulty-grid">
                  <DifficultyCard label="Easy" count={lcStats.easySolved} total={lcStats.totalEasy} color="#22C55E" icon={VscPassFilled} />
                  <DifficultyCard label="Medium" count={lcStats.mediumSolved} total={lcStats.totalMedium} color="#EAB308" icon={BiAdjust} />
                  <DifficultyCard label="Hard" count={lcStats.hardSolved} total={lcStats.totalHard} color="#EF4444" icon={CgDanger} />
                </div>
              </div>
            )}
          </motion.div>

          {/* ==================== GITHUB CARD ==================== */}
          <motion.div variants={fadeUp} className="profile-card glass-card">
            <div className="profile-header">
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div className="profile-icon" style={{ 
                  background: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)", 
                  border: isDark ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(0,0,0,0.1)", 
                  color: isDark ? "#FFFFFF" : "#0A0A12" 
                }}>
                  <FaGithub size={24} />
                </div>
                <div>
                  <h3 className="profile-title" style={{ fontFamily: "var(--font-syne)", fontWeight: 700, color: "var(--text-primary)" }}>GitHub</h3>
                  <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer" className="profile-link" style={{ color: "var(--text-muted)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    @{GITHUB_USERNAME} <FaExternalLinkAlt size={10} />
                  </a>
                </div>
              </div>
            </div>

            {loadingGh ? (
              <div className="loading-container"><div className="spinner" style={{ borderTopColor: isDark ? "#FFF" : "#0A0A12" }} /></div>
            ) : !ghStats ? (
              <div className="error-container">Unable to load GitHub stats right now.</div>
            ) : (
              <div className="profile-body" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                
                {/* GitHub Bio & Profile details */}
                <div className="gh-bio-row" style={{ marginBottom: "20px", display: "flex", gap: "14px", alignItems: "center" }}>
                  <img src={ghStats.avatar_url} alt="GitHub Avatar" className="gh-avatar" style={{ borderRadius: "50%", border: "2px solid rgba(255,255,255,0.1)" }} />
                  <div style={{ minWidth: 0 }}>
                    <h4 className="gh-name" style={{ fontWeight: 600, color: "var(--text-primary)" }}>{ghStats.name || GITHUB_USERNAME}</h4>
                    <p className="gh-bio" style={{ color: "var(--text-muted)", marginTop: "4px" }}>{ghStats.bio || "Open Source Enthusiast"}</p>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="gh-stats-grid" style={{ marginBottom: "20px", flex: 1 }}>
                  <StatItem icon={RiGitRepositoryLine} label="Public Repos" value={ghStats.public_repos} color="#7B2FFF" />
                  <StatItem icon={FaUserFriends} label="Followers" value={ghStats.followers} color="#00D4FF" />
                  <StatItem icon={FaRegCheckCircle} label="Following" value={ghStats.following} color="#22C55E" />
                  <StatItem icon={FaCodeBranch} label="Contributions" value="Active" color="#EAB308" />
                </div>

                {/* Quick CTA */}
                <a href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`} target="_blank" rel="noopener noreferrer" className="btn-outline gh-cta-btn" style={{ width: "100%", justifyContent: "center", borderRadius: "12px" }}>
                  <FaGithub size={14} />
                  <span>View Repositories</span>
                </a>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        /* ── Coding Profiles Section Heading ── */
        .cp-heading {
          font-size: clamp(1.8rem, 5vw, 3.5rem);
        }
        .cp-subtitle {
          font-size: 0.95rem;
          max-width: 520px;
        }

        /* ── Profiles Grid ── */
        .profiles-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
        }
        .profile-card {
          padding: 28px;
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          min-height: 400px;
        }
        .profile-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border);
        }
        .profile-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .profile-title {
          font-size: 1.25rem;
        }
        .profile-link {
          font-size: 0.8rem;
        }
        .profile-body {
          flex: 1;
        }
        .loading-container, .error-container {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: var(--text-muted);
        }
        .spinner {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 3px solid var(--border);
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* ── LeetCode Stats ── */
        .lc-stats-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .lc-solved-box {
          padding: 14px;
        }
        .lc-solved-count {
          font-size: 2rem;
        }
        .lc-rank-val {
          font-size: 0.85rem;
        }
        .difficulty-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        .difficulty-card {
          padding: 14px;
        }
        .difficulty-count {
          font-size: 1.4rem;
        }

        /* ── GitHub Stats ── */
        .gh-avatar {
          width: 56px;
          height: 56px;
        }
        .gh-name {
          font-size: 1rem;
        }
        .gh-bio {
          font-size: 0.8rem;
        }
        .gh-stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .gh-stat-item {
          padding: 10px 12px;
        }
        .gh-stat-value {
          font-size: 1rem;
        }
        .gh-stat-label {
          font-size: 0.65rem;
        }
        .gh-cta-btn {
          padding: 11px;
        }

        /* ════════ TABLET BREAKPOINT ════════ */
        @media (max-width: 960px) {
          .profiles-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .profile-card {
            min-height: auto;
          }
        }

        /* ════════ MOBILE BREAKPOINT ════════ */
        @media (max-width: 480px) {
          .cp-heading {
            font-size: 1.6rem;
          }
          .cp-subtitle {
            font-size: 0.85rem;
          }
          .profile-card {
            padding: 18px;
            border-radius: 18px;
          }
          .profile-header {
            margin-bottom: 16px;
            padding-bottom: 14px;
          }
          .profile-icon {
            width: 40px;
            height: 40px;
            border-radius: 12px;
          }
          .profile-icon svg {
            width: 20px;
            height: 20px;
          }
          .profile-title {
            font-size: 1.1rem;
          }
          .profile-link {
            font-size: 0.72rem;
          }

          /* LeetCode mobile */
          .lc-stats-row {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }
          .lc-solved-box {
            padding: 12px;
          }
          .lc-solved-count {
            font-size: 1.6rem;
          }
          .lc-rank-val {
            font-size: 0.78rem;
          }

          /* Difficulty cards — 3 columns but tighter */
          .difficulty-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 6px;
          }
          .difficulty-card {
            padding: 10px 8px;
            border-radius: 12px;
          }
          .difficulty-count {
            font-size: 1.1rem;
          }

          /* GitHub mobile */
          .gh-avatar {
            width: 44px;
            height: 44px;
          }
          .gh-name {
            font-size: 0.9rem;
          }
          .gh-bio {
            font-size: 0.75rem;
          }
          .gh-stats-grid {
            grid-template-columns: 1fr 1fr;
            gap: 8px;
          }
          .gh-stat-item {
            padding: 8px 10px;
            gap: 8px;
            border-radius: 10px;
          }
          .gh-stat-value {
            font-size: 0.9rem;
          }
          .gh-stat-label {
            font-size: 0.6rem;
          }
          .gh-cta-btn {
            padding: 10px;
            font-size: 0.82rem !important;
          }
        }

        /* ════════ VERY SMALL SCREENS ════════ */
        @media (max-width: 360px) {
          .profile-card {
            padding: 14px;
          }
          .difficulty-grid {
            grid-template-columns: 1fr 1fr 1fr;
            gap: 4px;
          }
          .difficulty-card {
            padding: 8px 6px;
          }
          .difficulty-count {
            font-size: 0.95rem;
          }
          .lc-solved-count {
            font-size: 1.3rem;
          }
          .gh-stats-grid {
            gap: 6px;
          }
        }
      `}</style>
    </SectionReveal>
  );
};

export default CodingProfiles;
