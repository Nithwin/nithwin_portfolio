import React from 'react'
import { motion } from "framer-motion";
import Hero from './Hero'
import About from './About'
import Leetcode from './Leetcode'
import Projects from './Projects'
import Skills from './Skills'
import Contact from './Contact'
import Footer from './Footer'
import Header from './Header'

const Main = () => {
  const mainVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const sectionVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };
  const headerVariants = {
    hidden: {opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.section
      variants={mainVariants}
      initial="hidden"
      animate="visible"
      className='flex flex-col px-[1.3rem] pt-[4.5rem] relative gap-5 lg:px-[3rem]'
    >
      <motion.div variants={headerVariants}>
        <Header />
      </motion.div>
      <motion.div variants={sectionVariants}>
        <Hero />
      </motion.div>
      <motion.div variants={sectionVariants}>
        <About />
      </motion.div>
      <motion.div variants={sectionVariants}>
        <Leetcode />
      </motion.div>
      <motion.div variants={sectionVariants}>
        <Projects />
      </motion.div>
      <motion.div variants={sectionVariants}>
        <Skills />
      </motion.div>
      <motion.div variants={sectionVariants}>
        <Contact />
      </motion.div>
      <motion.div variants={sectionVariants}>
        <Footer />
      </motion.div>
    </motion.section>
  )
}

export default Main