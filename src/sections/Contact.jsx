import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiMailLine, RiMapPinLine, RiSendPlaneLine, RiGithubLine, RiLinkedinLine, RiInstagramLine } from "react-icons/ri";
import { SiLeetcode } from "react-icons/si";
import { useTheme } from "../context/ThemeContext";

const SOCIALS = [
  { icon: RiGithubLine, href: "https://github.com/Nithwin", label: "GitHub" },
  { icon: RiLinkedinLine, href: "https://www.linkedin.com/in/nithwin-v-m-7b5b13252/", label: "LinkedIn" },
  { icon: RiInstagramLine, href: "https://www.instagram.com/_nithwin", label: "Instagram" },
  { icon: SiLeetcode, href: "https://leetcode.com/u/vmnithwin/", label: "LeetCode" },
];

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
      toast.error("Failed to send. Please email me directly at vmnithwin@gmail.com", { theme: isDark ? "dark" : "light" });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section-block">
      <div className="container">
        <div className="section-header-row">
          <div>
            <span className="eyebrow">Get In Touch</span>
            <h2 className="section-title">
              Let's <span style={{ color: "var(--accent)" }}>Connect</span>
            </h2>
          </div>
          <p className="section-subtitle">
            Whether you have a project in mind or just want to say hi — my inbox is always open.
          </p>
        </div>

        <div className="contact-layout">
          {/* Info column */}
          <div className="contact-info-col">
            {[
              { icon: RiMailLine, label: "Email", value: "vmnithwin@gmail.com", href: "mailto:vmnithwin@gmail.com" },
              { icon: RiMapPinLine, label: "Location", value: "India", href: null },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="contact-info-item">
                <div className="contact-info-icon">
                  <Icon size={18} />
                </div>
                <div>
                  <div className="contact-info-key">{label}</div>
                  {href ? (
                    <a href={href} className="contact-info-val" style={{ color: "var(--fg)" }}>
                      {value}
                    </a>
                  ) : (
                    <div className="contact-info-val">{value}</div>
                  )}
                </div>
              </div>
            ))}

            <div className="contact-socials-row">
              <div className="contact-socials-label">Find me on</div>
              <div className="contact-socials-list">
                {SOCIALS.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="contact-social-btn"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            <div className="contact-avail-card">
              <div className="contact-avail-title">
                <span className="contact-avail-dot" />
                Open to Opportunities
              </div>
              <p className="contact-avail-desc">
                Currently available for freelance projects and full-time roles.
                Let's build something amazing together!
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="contact-form"
          >
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Name *</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Subject *</label>
              <input
                type="text"
                name="subject"
                className="form-input"
                value={form.subject}
                onChange={handleChange}
                placeholder="What's this about?"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Message *</label>
              <textarea
                name="message"
                className="form-textarea"
                value={form.message}
                onChange={handleChange}
                placeholder="Your message here..."
                required
              />
            </div>

            <button type="submit" className="form-submit-btn" disabled={sending}>
              {sending ? (
                <>
                  <div className="spinner" style={{ width: 18, height: 18, margin: 0, borderWidth: 2 }} />
                  Sending...
                </>
              ) : (
                <>
                  <RiSendPlaneLine size={16} />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={4000} />
    </section>
  );
};

export default Contact;
