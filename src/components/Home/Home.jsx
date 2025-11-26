import React from 'react'
import './Home.css'
import Hero from '../Hero/Hero'
import Services from '../Services/Services'
import Process from '../Process/Process'
import Strategies from '../Strategies/Strategies'
import Banner from '../Banner/Banner'
import OneClickSection from '../OneClickSection/OneClickSection'
import CircleFeature from '../CircleFeature/CircleFeature'
import SEOFeatures from '../SEOFeatures/SEOFeatures'
import FaqSection from '../FaqSection/FaqSection'
import ImpactOrbit from '../ImpactOrbit/ImpactOrbit'

const Home = () => {
  return (
    <div>
      <Hero />
      <OneClickSection />
      <Services />
      {/* <CircleFeature /> */}
      <ImpactOrbit />
      <Banner />
      <Process />
      <Strategies />
    
      <FaqSection />
       
    </div>
  )
}

export default Home
