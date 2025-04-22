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
    <section className='flex flex-col px-[1.3rem] pt-[4.5rem] relative gap-5 lg:px-[3rem]'>
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