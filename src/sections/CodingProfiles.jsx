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

const USERNAME = "vmnithwin";
const GITHUB_USERNAME = "Nithwin";

const DifficultyCard = ({ label, count, total, color, icon: Icon }) => {
  const pct = total ? Math.round((count / total) * 100) : 0;
  return (
    <div style={{ padding: "16px", borderRadius: "16px", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)" }}>{label}</span>
        <Icon size={16} style={{ color }} />
      </div>
      <div style={{ marginBottom: "8px" }}>
        <span style={{ fontSize: "1.6rem", fontFamily: "var(--font-syne)", fontWeight: 700, color }}>{count}</span>
        <span style={{ fontSize: "0.75rem", marginLeft: "4px", color: "var(--text-muted)" }}>/ {total}</span>
      </div>
      <div className="progress-bar" style={{ height: "4px", marginBottom: "6px" }}>
        <motion.div
          className="progress-fill"
          style={{ background: color, height: "100%" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: pct / 100 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      <p style={{ fontSize: "0.65rem", color: "var(--text-muted)", textAlign: "right" }}>{pct}% solved</p>
    </div>
  );
};

const StatItem = ({ icon: Icon, label, value, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)" }}>
    <div style={{ width: "36px", height: "36px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", background: `${color}15`, color: color }}>
      <Icon size={16} />
    </div>
    <div>
      <p style={{ fontSize: "1.1rem", fontWeight: 700, fontFamily: "var(--font-syne)", color: "var(--text-primary)", lineHeight: 1 }}>{value}</p>
      <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "4px" }}>{label}</p>
    </div>
  </div>
);

const CodingProfiles = () => {
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
        <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: "48px" }}>
          <span className="section-label">Developer Stats</span>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontFamily: "var(--font-syne)", fontWeight: 700, marginTop: "16px", color: "var(--text-primary)" }}>
            Coding <span className="gradient-text">Profiles</span>
          </h2>
          <p style={{ marginTop: "12px", fontSize: "1rem", maxWidth: "520px", margin: "12px auto 0", color: "var(--text-muted)" }}>
            Tracking my journey through algorithms, open source, and daily contributions.
          </p>
        </motion.div>

        <div className="profiles-grid">
          {/* ==================== LEETCODE CARD ==================== */}
          <motion.div variants={fadeUp} className="profile-card glass-card">
            <div className="profile-header">
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div className="profile-icon" style={{ background: "rgba(255,161,22,0.1)", border: "1px solid rgba(255,161,22,0.25)", color: "#FFA116" }}>
                  <SiLeetcode size={28} />
                </div>
                <div>
                  <h3 style={{ fontSize: "1.4rem", fontFamily: "var(--font-syne)", fontWeight: 700, color: "var(--text-primary)" }}>LeetCode</h3>
                  <a href={`https://leetcode.com/u/${USERNAME}/`} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.85rem", color: "var(--text-muted)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}>
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
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
                  <div style={{ padding: "16px", borderRadius: "16px", background: "rgba(255,161,22,0.05)", border: "1px solid rgba(255,161,22,0.15)", textAlign: "center" }}>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "4px" }}>Total Solved</p>
                    <p style={{ fontSize: "2.2rem", fontFamily: "var(--font-syne)", fontWeight: 700, color: "#FFA116", lineHeight: 1 }}>{lcStats.totalSolved}</p>
                  </div>
                  <div style={{ padding: "16px", borderRadius: "16px", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", justifyContent: "center", gap: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Global Rank</span>
                      <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)" }}>{lcStats.ranking ? `#${lcStats.ranking.toLocaleString()}` : "—"}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Acceptance</span>
                      <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--neon)" }}>{lcAcceptance}</span>
                    </div>
                  </div>
                </div>

                {/* Difficulty Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
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
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div className="profile-icon" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#FFFFFF" }}>
                  <FaGithub size={28} />
                </div>
                <div>
                  <h3 style={{ fontSize: "1.4rem", fontFamily: "var(--font-syne)", fontWeight: 700, color: "var(--text-primary)" }}>GitHub</h3>
                  <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.85rem", color: "var(--text-muted)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    @{GITHUB_USERNAME} <FaExternalLinkAlt size={10} />
                  </a>
                </div>
              </div>
            </div>

            {loadingGh ? (
              <div className="loading-container"><div className="spinner" style={{ borderTopColor: "#FFF" }} /></div>
            ) : !ghStats ? (
              <div className="error-container">Unable to load GitHub stats right now.</div>
            ) : (
              <div className="profile-body" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                
                {/* GitHub Bio & Profile details */}
                <div style={{ marginBottom: "24px", display: "flex", gap: "16px", alignItems: "center" }}>
                  <img src={ghStats.avatar_url} alt="GitHub Avatar" style={{ width: "64px", height: "64px", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.1)" }} />
                  <div>
                    <h4 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--text-primary)" }}>{ghStats.name || GITHUB_USERNAME}</h4>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "4px" }}>{ghStats.bio || "Open Source Enthusiast"}</p>
                  </div>
                </div>

                {/* Stats Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px", flex: 1 }}>
                  <StatItem icon={RiGitRepositoryLine} label="Public Repos" value={ghStats.public_repos} color="#7B2FFF" />
                  <StatItem icon={FaUserFriends} label="Followers" value={ghStats.followers} color="#00D4FF" />
                  <StatItem icon={FaRegCheckCircle} label="Following" value={ghStats.following} color="#22C55E" />
                  <StatItem icon={FaCodeBranch} label="Contributions" value="Active" color="#EAB308" />
                </div>

                {/* Quick CTA */}
                <a href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ width: "100%", justifyContent: "center", padding: "12px", borderRadius: "12px" }}>
                  <FaGithub size={14} />
                  <span>View Repositories</span>
                </a>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        .profiles-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }
        .profile-card {
          padding: 32px;
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          min-height: 420px;
        }
        .profile-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .profile-icon {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
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
          border: 3px solid rgba(255,255,255,0.1);
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 960px) {
          .profiles-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .profile-card {
            min-height: auto;
          }
        }
        @media (max-width: 480px) {
          .profile-card {
            padding: 24px;
          }
          .profile-header {
            margin-bottom: 24px;
            padding-bottom: 16px;
          }
        }
      `}</style>
    </SectionReveal>
  );
};

export default CodingProfiles;
