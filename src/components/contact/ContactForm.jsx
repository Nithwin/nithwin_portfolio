import React, { useState } from "react";
import { FaPaperPlane, FaCheck } from "react-icons/fa";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [contactStatus, setContactStatus] = useState("idle");

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactStatus("sending");

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (serviceId && templateId && publicKey) {
      try {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: contactForm.name,
            from_email: contactForm.email,
            message: contactForm.message,
          },
          publicKey
        );
        setContactStatus("success");
        setContactForm({
          name: "",
          email: "",
          message: "",
        });
        setTimeout(() => setContactStatus("idle"), 5000);
        return;
      } catch (err) {
        console.warn("EmailJS send failed, opening mailto fallback:", err);
      }
    }

    // Graceful native mailto fallback
    const subject = encodeURIComponent(`Message from ${contactForm.name}`);
    const body = encodeURIComponent(
      `Hi Nithwin,\n\nName: ${contactForm.name}\nEmail: ${contactForm.email}\n\nMessage:\n${contactForm.message}\n`
    );
    window.location.href = `mailto:vmnithwin@gmail.com?subject=${subject}&body=${body}`;
    setContactStatus("success");
    setContactForm({
      name: "",
      email: "",
      message: "",
    });
    setTimeout(() => setContactStatus("idle"), 5000);
  };

  return (
    <form
      className="contact-form-card reveal-item"
      onSubmit={handleContactSubmit}
    >
      <div className="contact-form-row">
        <div className="contact-form-field">
          <label className="contact-form-label" htmlFor="contact-name">YOUR NAME *</label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            type="text"
            required
            className="contact-input contact-form-input"
            placeholder="John Doe"
            value={contactForm.name}
            onChange={(e) =>
              setContactForm({ ...contactForm, name: e.target.value })
            }
          />
        </div>
        <div className="contact-form-field">
          <label className="contact-form-label" htmlFor="contact-email">YOUR EMAIL *</label>
          <input
            id="contact-email"
            name="email"
            autoComplete="email"
            type="email"
            required
            className="contact-input contact-form-input"
            placeholder="john@example.com"
            value={contactForm.email}
            onChange={(e) =>
              setContactForm({ ...contactForm, email: e.target.value })
            }
          />
        </div>
      </div>

      <div className="contact-form-field">
        <label className="contact-form-label" htmlFor="contact-message">YOUR MESSAGE *</label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          className="contact-textarea contact-form-textarea"
          placeholder="Tell me about your project, team, or opportunity..."
          value={contactForm.message}
          onChange={(e) =>
            setContactForm({ ...contactForm, message: e.target.value })
          }
        />
      </div>

      <div className="contact-form-actions">
        <button
          type="submit"
          className="contact-submit-btn btn-primary"
          disabled={contactStatus === "sending"}
          data-cursor="SEND"
        >
          {contactStatus === "sending" ? (
            <span>TRANSMITTING MESSAGE...</span>
          ) : contactStatus === "success" ? (
            <>
              <FaCheck />
              <span>MESSAGE SENT SUCCESSFULLY</span>
            </>
          ) : (
            <>
              <FaPaperPlane />
              <span>TRANSMIT DISPATCH ↗</span>
            </>
          )}
        </button>
      </div>

      {contactStatus === "success" && (
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            color: "var(--accent)",
            marginTop: "12px",
            textAlign: "center",
          }}
        >
          ✓ Thanks for reaching out! I typically reply within 24 hours.
        </p>
      )}
    </form>
  );
}
