import React from 'react'

const Section = ({children, id}) => {
  return (
    <section id={id} className='relative p-[1rem]'>
        <div className='h-8 w-8 border-2 border-neonblue border-b-0 border-e-0 absolute top-0 left-0'></div>
        <div className='h-8 w-8 border-2 border-neonblue border-s-0 border-b-0 absolute top-0 right-0'></div>
        <div className='h-8 w-8 border-2 border-neonblue border-e-0 border-t-0 absolute bottom-0 left-0'></div>
        <div className='h-8 w-8 border-2 border-neonblue border-t-0 border-s-0 absolute bottom-0 right-0'></div>
        {
            children
        }
    </section>
  )
}

export default Section