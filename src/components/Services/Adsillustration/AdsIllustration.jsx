import React from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSearch, FaDesktop, FaYoutube, FaFacebook, FaInstagram, FaFacebookMessenger,FaBullseye, FaChartLine, FaBolt } from "react-icons/fa";
import "./AdsIllustration.css";

const AdsIllustration = () => {
  const location = useLocation();

  const googleIntro =
    "Google Ads is an online advertising platform that lets you show targeted ads across Google Search, YouTube, and millions of partner websites. It helps businesses reach customers exactly when they’re searching for related products or services.";
  const metaIntro =
    "Meta Ads allow you to advertise across Facebook, Instagram, Messenger, and Audience Network, connecting with audiences based on interests, demographics, and behaviors.";

  const googleAdsContent = [
    { title: "Search Ads", desc: "Show ads on Google Search results to people actively searching for your services.", icon: <FaSearch /> },
    { title: "Display Ads", desc: "Reach potential customers across websites with visually appealing display banners.", icon: <FaDesktop /> },
    { title: "YouTube Ads", desc: "Engage audiences with video ads before, during, or after YouTube videos.", icon: <FaYoutube /> },
  ];

  const metaAdsContent = [
    { title: "Facebook Ads", desc: "Target users directly on Facebook with precision demographics and interest targeting.", icon: <FaFacebook /> },
    { title: "Instagram Ads", desc: "Show visually striking ads in Instagram feeds, stories, and reels.", icon: <FaInstagram /> },
    { title: "Messenger Ads", desc: "Connect with users inside Messenger conversations for personal engagement.", icon: <FaFacebookMessenger /> },
  ];

 const processSteps = [
  {
    icon: <FaBullseye />,
    title: "Goal Discovery",
    text: "We start by understanding your business objectives, audience, and desired outcomes."
  },
  {
    icon: <FaSearch />,
    title: "Strategy Blueprint",
    text: "Crafting a tailored ad plan with the right platforms, targeting, and creative direction."
  },
  {
    icon: <FaDesktop />,
    title: "Creative & Setup",
    text: "Designing high-impact visuals, writing compelling ad copy, and launching your campaigns."
  },
  {
    icon: <FaChartLine />,
    title: "Ongoing Optimization",
    text: "Monitoring daily, refining targeting, and adjusting bids for maximum ROI."
  },
  {
    icon: <FaBolt />,
    title: "Performance Reporting",
    text: "Delivering transparent reports with actionable insights to fuel future growth."
  }
];


  const isGoogleAds = location.pathname.includes("/services/ads/google-ads");
  const heading = isGoogleAds ? "Google Ads Services" : "Meta Ads Services";
  const introText = isGoogleAds ? googleIntro : metaIntro;
  const data = isGoogleAds ? googleAdsContent : metaAdsContent;
  const themeClass = isGoogleAds ? "google-theme" : "meta-theme";

  return (
    <div className={`ads-illustration ${themeClass}`}>
      {/* Hero Section */}
      <section className="ads-hero">
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="ads-hero-text"
  >
    <p className="ads-hero-tagline">
      {isGoogleAds ? "Maximize Your Visibility on Google" : "Reach Millions on Facebook & Instagram"}
    </p>
    <h1>{heading}</h1>
    <p>{introText}</p>

  
    <div className="ads-hero-cta">
      <a href="/contact" className="cta-btn">Get Started Today</a>
    </div>
  </motion.div>

 <div className="ads-hero-right">

  <motion.img
    src={
      isGoogleAds
        ? "https://res.cloudinary.com/dqdngisww/image/upload/v1755007245/Google-Ads-agency_axkim5.png"
        : "https://res.cloudinary.com/dqdngisww/image/upload/v1755007210/Meta-Subscription-and-Social-Media-Management_hlwhni.webp"
    }
    alt="Illustration"
    className="ads-hero-img"
     initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
  />

   <ul className="ads-hero-benefits">
  <li>
    <FaBullseye className="benefit-icon" /> Target the right audience with precision
  </li>
  <li>
    <FaChartLine className="benefit-icon" /> Optimize for maximum return on investment
  </li>
  <li>
    <FaBolt className="benefit-icon" /> Data-driven strategies that deliver results
  </li>
</ul>
 </div>
  
</section>


      {/* Services Section */}
     <section className="ads-services">
      <motion.div
       initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
  <p className="ads-subtitle">OUR SERVICES</p>
 <h2 className="ads-heading">What We Offer</h2>
  <p className="ads-description">
    {/* You can keep or remove this description depending on need */}
    We provide tailored solutions to help your brand reach the right audience
    with the right message at the right time.
  </p>

  <div className="ads-services-grid">
    {data.map((item, idx) => (
      <motion.div
        key={idx}
        className="ads-service-card"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: idx * 0.15 }}
      >
        <div className="ads-icon-wrapper">
          <div className="ads-icon-bg">{item.icon}</div>
        </div>
        <h3>{item.title}</h3>
        <p>{item.desc}</p>
      </motion.div>
    ))}
  </div>
  </motion.div>
</section>


      {/* Process Section */}
     <section className="ads-process-section">
      <motion.div  initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}>
  <h2 className="ads-process-title">Our Campaign Workflow</h2>
  <p className="ads-process-subtitle">
    A results-driven process that blends strategy, creativity, and data for unstoppable growth.
  </p>

  <div className="ads-process-timeline">
    {processSteps.map((step, idx) => (
      <motion.div className="ads-process-item" key={idx}  initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}>
        <div className="ads-process-icon">{step.icon}</div>
        <div className="ads-process-content">
          <h3>{step.title}</h3>
          <p>{step.text}</p>
        </div>
      </motion.div>
    ))}
  </div>
  </motion.div>
</section>


    </div>
  );
};

export default AdsIllustration;
