import React from 'react'
import HeroArea from '../components/home/HeroArea'
import Services from '../components/home/Services'
import AboutUs from '../components/home/AboutUs'
import Classes from '../components/home/Classes'
import Plans from '../components/home/Plans'

const HomePage = () => {
  return (
    <div className="min-h-screen ">
      <HeroArea />
      <Services />
      <AboutUs/>
      <Classes/>
      <Plans/>
    </div>
  )
}

export default HomePage