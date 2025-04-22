import React, { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaCodepen } from "react-icons/fa";
import { HiDocument } from "react-icons/hi";
import { motion } from "framer-motion";

const Footer = () => {
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.2;
    }
  }, []);
  return (
    <footer className="w-full bg-background/90 backdrop-blur-sm border-t border-primary/40 relative">
      <div className="max-w-7xl mx-auto px-4 py-8 relative">
        <motion.div
        initial={{
          opacity: 0,
          y: 50, // Adding initial y offset for better entrance
        }}
        whileInView={{
          opacity: 1,
          y: 0, // Animate to normal position
        }}
        viewport={{
          margin: "-100px",
          once: false,
        }}
        transition={{
          duration: 0.8, // Animation duration
          delay: 0.2, // Delay before animation starts
          ease: "easeOut", // Smoother easing function
        }} className="flex flex-col items-center space-y-6">
          <div className="relative flex flex-col items-center gap-6 lg:flex-row lg:justify-between lg:items-stretch lg:w-full ">
            <div className="h-[4rem] lg:h-[4rem] flex justify-center items-center">
              <video
                ref={videoRef}
                src="./assets/nithwin.mp4"
                loop
                muted
                autoPlay
                playsInline
                className="h-full w-full backdrop-blur-3xl cursor-pointer"
              />
            </div>
            {/* Main Navigation */}
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
              <a href="#home" className="hover:text-primary transition-colors">
                Home
              </a>
              <a href="#about" className="hover:text-primary transition-colors">
                About
              </a>
              <a
                href="#projects"
                className="hover:text-primary transition-colors"
              >
                Projects
              </a>
              <a
                href="#skills"
                className="hover:text-primary transition-colors"
              >
                Skills
              </a>
              <a
                href="#contact"
                className="hover:text-primary transition-colors"
              >
                Contact
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-6 ">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-primary transition-colors"
              >
                <FaGithub />
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-primary transition-colors"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://instagram.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-primary transition-colors"
              >
                <FaInstagram />
              </a>
              <a
                href="https://codepen.io/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-primary transition-colors"
              >
                <FaCodepen />
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-primary transition-colors"
              >
                <HiDocument />
              </a>
            </div>
          </div>
          {/* Legal Links */}
          <div className="flex flex-col items-center gap-6 lg:flex-row-reverse lg:justify-between lg:w-full">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm">
              <a
                href="/privacy-policy"
                className="hover:text-primary transition-colors"
              >
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-primary transition-colors">
                Terms of Use
              </a>
              <button className="hover:text-primary transition-colors">
                Cookie Preferences
              </button>
            </div>

      <div className="absolute top-[20.5rem] left-[4.5rem] lg:-top-4 lg:left-[20rem] w-30 h-30 lg:w-[40rem] bg-primary/15 rounded-full blur-3xl mix-blend-plus-lighter -z-50"></div>
      <div className="absolute top-[16rem] left-[5.5rem] lg:-top-4 lg:left-[20rem] w-30 h-30 lg:w-[40rem] bg-primary/15 rounded-full blur-3xl mix-blend-plus-lighter -z-50"></div>
            {/* Copyright */}
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} Nithwin V M. All rights reserved.
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
