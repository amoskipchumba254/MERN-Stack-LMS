import React from 'react'
import Hero from '../../componenets/student/hero'
import Companies from '../../componenets/student/Companies'
import CoursesSection from '../../componenets/student/CoursesSection'
import TestimonialsSection from '../../componenets/student/TestimonialsSection'
import CallToAction from '../../componenets/student/CallToAction'
import Footer from '../../componenets/student/Footer'

const Home = () => {
  return (
    <div className='flex flex-col items-center space-y-7 text-center'>
        <Hero />
        <Companies />
        <CoursesSection />
        <TestimonialsSection />
        <CallToAction/>
        <Footer />
    </div>
  )
}

export default Home