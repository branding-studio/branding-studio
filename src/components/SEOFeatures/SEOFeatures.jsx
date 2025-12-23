import React from "react";
import { motion } from "framer-motion";
import {
  faSitemap,
  faBugSlash,
  faServer,
  faPenFancy,
  faPaperPlane,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SEOFeatures.css";

const features = [
  {
    title: "Technical SEO Optimization",
    description: "We fix crawl errors, boost load speed, and optimize site architecture for search engines.",
    icon: faSitemap,
  },
  {
    title: "Penalty Diagnosis & Recovery",
    description: "Recover rankings with expert audits, backlink cleanup, and compliance improvements.",
    icon: faBugSlash,
  },
  {
    title: "Site Audits & Health Checks",
    description: "Get a full report on your site's SEO readiness and performance metrics.",
    icon: faServer,
  },
  {
    title: "SEO-Driven Content Strategy",
    description: "We align high-quality content with keyword opportunities and user intent.",
    icon: faPenFancy,
  },
  {
    title: "Content Promotion & Outreach",
    description: "Earn links and traffic through targeted outreach and digital PR efforts.",
    icon: faPaperPlane,
  },
  {
    title: "Monthly Reporting & Insights",
    description: "We deliver clear reports with insights, growth opportunities, and ROI analysis.",
    icon: faChartLine,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

const SEOFeatures = () => {
  return (
    <section className="seo-features">

      <motion.div 
      className="seo-intro"
      initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2>Drive Traffic with Targeted SEO Services</h2>
        <p>
          Our tailored strategies help your site rank better, reach the right audience,
          and turn visibility into real conversions.
        </p>
      </motion.div>

      <div className="feature-grid">
        {features.map((feature, i) => (
          <motion.div
            className="feature-card"
            key={i}
            variants={cardVariants}
            initial={cardVariants.hidden}
            whileInView={cardVariants.visible}
            custom={i}
            viewport={{ once: false, amount: 0.3 }}
          >
            <div className="feature-icon">
              <FontAwesomeIcon icon={feature.icon} />
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SEOFeatures;
