import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import SectionReveal, { fadeUp } from "../components/SectionReveal";
import { SiLeetcode } from "react-icons/si";
import { FaTrophy, FaMedal } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { VscPassFilled } from "react-icons/vsc";
import { BiAdjust } from "react-icons/bi";
import { CgDanger } from "react-icons/cg";

const USERNAME = "vmnithwin";

const DifficultyCard = ({ label, count, total, color, icon: Icon }) => {
  const pct = total ? Math.round((count / total) * 100) : 0;
  return (
    <div className="glass-card" style={{ padding: "28px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-secondary)" }}>{label}</span>
        <Icon size={20} style={{ color }} />
      </div>
      <div style={{ marginBottom: "12px" }}>
        <span style={{ fontSize: "2.2rem", fontFamily: "var(--font-syne)", fontWeight: 700, color }}>{count}</span>
        <span style={{ fontSize: "0.85rem", marginLeft: "8px", color: "var(--text-muted)" }}>/ {total}</span>
      </div>
      <div className="progress-bar">
        <motion.div
          className="progress-fill"
          style={{ background: color }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: pct / 100 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      <p style={{ fontSize: "0.75rem", marginTop: "8px", color: "var(--text-muted)" }}>{pct}% solved</p>
    </div>
  );
};

const Leetcode = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(`https://leetcode-stats-api.herokuapp.com/${USERNAME}`);
        if (data && data.status !== "error") setStats(data);
      } catch (err) {
        console.error("LeetCode fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const totalSolved = stats ? (stats.easySolved || 0) + (stats.mediumSolved || 0) + (stats.hardSolved || 0) : 0;

  return (
    <SectionReveal id="leetcode">
      <div className="grid-bg" />
      <div className="container-main">
        {/* Header */}
        <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: "48px" }}>
          <span className="section-label">Competitive Coding</span>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontFamily: "var(--font-syne)", fontWeight: 700, marginTop: "16px", color: "var(--text-primary)" }}>
            LeetCode <span className="gradient-text">Stats</span>
          </h2>
          <p style={{ marginTop: "12px", fontSize: "1rem", maxWidth: "520px", margin: "12px auto 0", color: "var(--text-muted)" }}>
            Consistent problem solving — tracking my journey through algorithms and data structures.
          </p>
        </motion.div>

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "60px 0" }}>
            <motion.div
              style={{ width: "40px", height: "40px", borderRadius: "50%", border: "3px solid rgba(123,47,255,0.2)", borderTopColor: "var(--purple)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
          </div>
        ) : !stats ? (
          <motion.div variants={fadeUp} className="glass-card" style={{ padding: "48px", textAlign: "center", borderRadius: "24px" }}>
            <SiLeetcode size={44} style={{ margin: "0 auto 16px", color: "#FFA116" }} />
            <p style={{ color: "var(--text-muted)", marginBottom: "20px" }}>Unable to load LeetCode stats right now.</p>
            <a href={`https://leetcode.com/u/${USERNAME}/`} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <span>View Profile</span>
            </a>
          </motion.div>
        ) : (
          <>
            {/* Hero Card */}
            <motion.div variants={fadeUp} className="glass-card" style={{
              padding: "32px", marginBottom: "24px", borderRadius: "24px",
              display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "24px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <div style={{
                  width: "64px", height: "64px", borderRadius: "16px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "rgba(255,161,22,0.1)", border: "1px solid rgba(255,161,22,0.25)",
                }}>
                  <SiLeetcode size={30} style={{ color: "#FFA116" }} />
                </div>
                <div>
                  <p style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--text-muted)", marginBottom: "4px" }}>Total Solved</p>
                  <p className="gradient-text" style={{ fontSize: "2.5rem", fontFamily: "var(--font-syne)", fontWeight: 700, lineHeight: 1 }}>{totalSolved}</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "32px", textAlign: "center" }}>
                <div>
                  <p style={{ fontSize: "1.4rem", fontWeight: 700, fontFamily: "var(--font-syne)", color: "#FFA116" }}>
                    {stats.ranking ? `#${stats.ranking.toLocaleString()}` : "—"}
                  </p>
                  <p style={{ fontSize: "0.7rem", marginTop: "4px", color: "var(--text-muted)" }}>Global Rank</p>
                </div>
                <div>
                  <p style={{ fontSize: "1.4rem", fontWeight: 700, fontFamily: "var(--font-syne)", color: "var(--neon)" }}>
                    {stats.acceptanceRate ? `${Math.round(stats.acceptanceRate)}%` : "—"}
                  </p>
                  <p style={{ fontSize: "0.7rem", marginTop: "4px", color: "var(--text-muted)" }}>Acceptance</p>
                </div>
              </div>
              <a href={`https://leetcode.com/u/${USERNAME}/`} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: "10px 24px", fontSize: "0.85rem" }}>
                <span>View Profile</span>
              </a>
            </motion.div>

            {/* Difficulty Cards */}
            <motion.div variants={fadeUp} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "24px" }}>
              <DifficultyCard label="Easy" count={stats.easySolved || 0} total={stats.totalEasy || 0} color="#22C55E" icon={VscPassFilled} />
              <DifficultyCard label="Medium" count={stats.mediumSolved || 0} total={stats.totalMedium || 0} color="#EAB308" icon={BiAdjust} />
              <DifficultyCard label="Hard" count={stats.hardSolved || 0} total={stats.totalHard || 0} color="#EF4444" icon={CgDanger} />
            </motion.div>

            {/* Achievements */}
            <motion.div variants={fadeUp} className="glass-card" style={{ padding: "32px", borderRadius: "24px" }}>
              <h3 style={{ fontSize: "1.05rem", fontFamily: "var(--font-syne)", fontWeight: 600, color: "var(--text-primary)", marginBottom: "20px" }}>
                Achievements
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
                {[
                  { icon: FaMedal, color: "#EAB308", label: `${totalSolved}+ Solved`, sub: "All difficulties" },
                  { icon: FaTrophy, color: "#FFA116", label: "Contest Participant", sub: "Weekly & Biweekly" },
                  { icon: FaStar, color: "#7B2FFF", label: "Top Percentile", sub: "Weekly Contests" },
                ].map(({ icon: Icon, color, label, sub }) => (
                  <div key={label} style={{
                    display: "flex", alignItems: "center", gap: "14px",
                    padding: "14px", borderRadius: "14px",
                    background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)",
                  }}>
                    <div style={{
                      width: "42px", height: "42px", borderRadius: "12px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: `${color}12`, flexShrink: 0,
                    }}>
                      <Icon size={18} style={{ color }} />
                    </div>
                    <div>
                      <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)" }}>{label}</p>
                      <p style={{ fontSize: "0.7rem", marginTop: "2px", color: "var(--text-muted)" }}>{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </div>
    </SectionReveal>
  );
};

export default Leetcode;
