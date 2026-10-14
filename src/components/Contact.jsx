import React from "react";
import ContactInfo from "./contact/ContactInfo";
import ContactForm from "./contact/ContactForm";

export default function Contact() {
  return (
    <section className="section-block" id="contact">
      <div className="section-header-row">
        <div>
          <span className="eyebrow">CONTACT</span>
          <h2 className="section-title">Let's Connect</h2>
        </div>
        <p className="work-desc" style={{ maxWidth: "44ch", fontSize: "14.5px" }}>
          Interested in working together, discussing a role, or having a chat?
          Feel free to reach out directly or drop a message below.
        </p>
      </div>

      <div className="contact-grid">
        <ContactInfo />
        <ContactForm />
      </div>
    </section>
  );
}
