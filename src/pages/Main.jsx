import React from 'react'
import Hero from './Hero'
import About from './About'
import Leetcode from './Leetcode'
import Projects from './Projects'
import Skills from './Skills'
import Contact from './Contact'
import Footer from './Footer'
import Header from './Header'

const Main = () => {
  return (
    <section className='flex flex-col px-[1rem] pt-[4.5rem]'>
      <Header />
      <Hero />
      <About />
      <Leetcode />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </section>
  )
}

export default Main