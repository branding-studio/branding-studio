import React from "react";
import "./Strategies.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullhorn,
  faFeather,
  faNetworkWired,
  faUserShield,
  faChartLine,
  faCogs
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import ImpactOrbit from "../ImpactOrbit/ImpactOrbit";

const strategyItems = [
  {
    icon: faBullhorn,
    title: "Performance Marketing",
    description:
      "ROI-first paid strategies across Google Ads, Meta, and emerging platforms — designed to convert, not just click.",
    gradient: "linear-gradient(135deg, #1e40af, #3b82f6)",
  },
  {
    icon: faFeather,
    title: "Brand Storytelling",
    description:
      "We merge creativity with data, building narratives and visuals that leave lasting impressions.",
    gradient: "linear-gradient(135deg, #9333ea, #d946ef)",
  },
  {
    icon: faNetworkWired,
    title: "Omnichannel CX",
    description:
      "From ads to email to SEO, we unify experiences for seamless customer journeys and stronger brand recall.",
    gradient: "linear-gradient(135deg, #0ea5e9, #22d3ee)",
  },
  {
    icon: faUserShield,
    title: "Security & Trust",
    description:
      "Digital frameworks built with compliance, privacy, and protection at the core — trust without compromise.",
    gradient: "linear-gradient(135deg, #f59e0b, #f97316)",
  },
  {
    icon: faChartLine,
    title: "Data-Driven Insights",
    description:
      "We harness analytics, dashboards, and AI-driven insights to constantly refine campaigns and maximize ROI.",
    gradient: "linear-gradient(135deg, #16a34a, #4ade80)",
  },
  {
    icon: faCogs,
    title: "Automation & Scale",
    description:
      "From CRM to ad automation, we build scalable systems that save time, reduce cost, and accelerate growth.",
    gradient: "linear-gradient(135deg, #06b6d4, #3b82f6)",
  },
];

const fadeUp = (i) => ({
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  },
});

const Strategies = () => {
  const location = useLocation();

  return (
    <>
      <section className="strategies-modern">
        <motion.div
          className="strategies-modern-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp(0)}
        >
          <h2>Strategies That Power Tomorrow’s Growth</h2>
          <p>
            More than traffic — we design end-to-end systems that create
            measurable impact, brand authority, and compounding ROI.
          </p>
        </motion.div>

        <div className="strategies-modern-grid">
          {strategyItems.map((item, index) => (
            <motion.div
              className="strategy-modern-card-pro"
              key={index}
              style={{
                background: item.gradient,
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp(index + 1)}
            >
              <div className="strategy-icon">
                <FontAwesomeIcon icon={item.icon} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {location.pathname === "/our-strategies" && <ImpactOrbit />}
    </>
  );
};

export default Strategies;
