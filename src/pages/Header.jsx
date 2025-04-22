import React from 'react'
import Navigation from '../components/navigation'

const Header = () => {
  return (
    <header className='fixed w-full top-0 z-50 bg-black' >
        <Navigation />
    </header>
  )
}

export default Header