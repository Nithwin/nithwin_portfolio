import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SectionReveal, { fadeUp } from "../components/SectionReveal";
import { RiSendPlaneLine, RiMailLine, RiMapPinLine, RiGithubLine, RiLinkedinLine, RiInstagramLine } from "react-icons/ri";
import { SiLeetcode } from "react-icons/si";
import { useTheme } from "../context/ThemeContext";

const Contact = () => {
  const { isDark } = useTheme();
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        e.target,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      toast.success("Message sent! I'll get back to you soon 🚀", { theme: isDark ? "dark" : "light" });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast.error("Failed to send. Please email me directly.", { theme: isDark ? "dark" : "light" });
    } finally {
      setSending(false);
    }
  };

  const contactInfo = [
    { icon: RiMailLine, label: "Email", value: "vmnithwin@gmail.com", href: "mailto:vmnithwin@gmail.com" },
    { icon: RiMapPinLine, label: "Location", value: "India", href: null },
  ];

  const socials = [
    { icon: RiGithubLine, href: "https://github.com/Nithwin", label: "GitHub" },
    { icon: RiLinkedinLine, href: "https://www.linkedin.com/in/nithwin-v-m-7b5b13252/", label: "LinkedIn" },
    { icon: RiInstagramLine, href: "https://www.instagram.com/_nithwin", label: "Instagram" },
    { icon: SiLeetcode, href: "https://leetcode.com/u/vmnithwin/", label: "LeetCode" },
  ];

  return (
    <SectionReveal id="contact">
      <div className="grid-bg" />
      <div className="container-main">
        {/* Header */}
        <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: "48px" }}>
          <span className="section-label">Get In Touch</span>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontFamily: "var(--font-syne)", fontWeight: 700, marginTop: "16px", color: "var(--text-primary)" }}>
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p style={{ marginTop: "12px", fontSize: "1rem", maxWidth: "500px", margin: "12px auto 0", color: "var(--text-muted)" }}>
            Whether you have a project in mind or just want to say hi — my inbox is always open.
          </p>
        </motion.div>

        {/* 2-column layout */}
        <motion.div variants={fadeUp} style={{ display: "flex", flexWrap: "wrap", gap: "32px" }}>
          {/* Left: Info */}
          <div style={{ flex: "1 1 300px", maxWidth: "400px", display: "flex", flexDirection: "column", gap: "16px" }}>
            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <div key={label} style={{
                display: "flex", alignItems: "center", gap: "14px", padding: "18px",
                borderRadius: "16px", background: "var(--bg-card)", border: "1px solid var(--border)",
              }}>
                <div style={{
                  width: "44px", height: "44px", borderRadius: "12px", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "rgba(123,47,255,0.1)", border: "1px solid rgba(123,47,255,0.2)",
                }}>
                  <Icon size={18} style={{ color: "var(--purple-light)" }} />
                </div>
                <div>
                  <p style={{ fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "2px" }}>{label}</p>
                  {href ? (
                    <a href={href} style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--text-primary)", textDecoration: "none" }}>{value}</a>
                  ) : (
                    <p style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--text-primary)" }}>{value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Social links */}
            <div style={{ padding: "20px", borderRadius: "16px", background: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "12px" }}>Find me on</p>
              <div style={{ display: "flex", gap: "10px" }}>
                {socials.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.12, y: -2 }}
                    style={{
                      width: "40px", height: "40px", borderRadius: "12px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: "rgba(123,47,255,0.08)", border: "1px solid rgba(123,47,255,0.15)",
                    }}
                  >
                    <Icon size={16} style={{ color: "var(--purple-light)" }} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* CTA card */}
            <div style={{
              padding: "24px", borderRadius: "16px", overflow: "hidden", position: "relative",
              background: "linear-gradient(135deg, rgba(123,47,255,0.12), rgba(0,212,255,0.06))",
              border: "1px solid rgba(123,47,255,0.2)",
            }}>
              <h3 style={{ fontSize: "1.05rem", fontFamily: "var(--font-syne)", fontWeight: 700, color: "var(--text-primary)", marginBottom: "8px" }}>
                Open to Opportunities
              </h3>
              <p style={{ fontSize: "0.85rem", lineHeight: 1.6, color: "var(--text-muted)" }}>
                Currently available for freelance projects and full-time roles. Let's build something amazing together!
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div style={{ flex: "1 1 400px" }}>
            <form ref={formRef} onSubmit={handleSubmit} className="glass-card" style={{ padding: "32px", borderRadius: "24px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "8px" }}>Name</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your Name" required className="form-input" />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "8px" }}>Email</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required className="form-input" />
                </div>
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "8px" }}>Subject</label>
                <input type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="What's this about?" className="form-input" />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "8px" }}>Message</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Tell me about your project..." required className="form-input" />
              </div>
              <motion.button
                type="submit"
                disabled={sending}
                whileHover={{ scale: sending ? 1 : 1.02 }}
                whileTap={{ scale: sending ? 1 : 0.98 }}
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center", padding: "16px", fontSize: "1rem", opacity: sending ? 0.7 : 1 }}
              >
                {sending ? (
                  <span style={{ display: "flex", alignItems: "center", gap: "8px", position: "relative", zIndex: 1 }}>
                    <motion.div
                      style={{ width: "16px", height: "16px", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff" }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    />
                    Sending...
                  </span>
                ) : (
                  <span style={{ display: "flex", alignItems: "center", gap: "8px", position: "relative", zIndex: 1 }}>
                    Send Message
                    <RiSendPlaneLine size={18} />
                  </span>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>

      <ToastContainer position="top-center" autoClose={5000} theme={isDark ? "dark" : "light"} />
    </SectionReveal>
  );
};

export default Contact;
