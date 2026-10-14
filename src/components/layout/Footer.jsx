import React from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const Footer = () => {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-inner">
          <p className="footer-copy">
            © 2025 Nithwin V M — Crafted with precision.
          </p>
          <div className="footer-links">
            <a href="https://github.com/Nithwin" target="_blank" rel="noopener noreferrer" className="footer-link">
              <FaGithub size={16} />
            </a>
            <a href="https://www.linkedin.com/in/nithwin-v-m-7b5b13252/" target="_blank" rel="noopener noreferrer" className="footer-link">
              <FaLinkedin size={16} />
            </a>
            <a href="https://www.instagram.com/_nithwin" target="_blank" rel="noopener noreferrer" className="footer-link">
              <FaInstagram size={16} />
            </a>
            <a href="https://leetcode.com/u/vmnithwin/" target="_blank" rel="noopener noreferrer" className="footer-link">
              <SiLeetcode size={16} />
            </a>
          </div>
          <button className="back-to-top" onClick={scrollTop}>
            ↑ Top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
