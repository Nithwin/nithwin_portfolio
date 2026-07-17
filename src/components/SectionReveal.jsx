import React from 'react';
import { motion } from 'framer-motion';

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 }
  }
};

export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } }
};

const SectionReveal = ({ children, id, className = '' }) => (
  <motion.section
    id={id}
    className={`relative section-padding overflow-hidden ${className}`}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: '-60px' }}
    variants={staggerContainer}
  >
    {children}
  </motion.section>
);

export default SectionReveal;
