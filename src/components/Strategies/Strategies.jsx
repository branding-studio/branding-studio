import React from "react";
import "./Strategies.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faHashtag,
  faPaintBrush,
  faLaptopCode,
  faSearch
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import ImpactOrbit from "../ImpactOrbit/ImpactOrbit";

const strategyItems = [
  {
    icon: faVideo,
    title: "Cinematic Film Making",
    description:
      "Studio-grade ad films, brand stories, and corporate shoots. We produce visual narratives that capture attention instantly.",
    gradient: "linear-gradient(135deg, #1e40af, #3b82f6)",
  },
  {
    icon: faHashtag,
    title: "Social Media Dominance",
    description:
      "Trend-driven content creation and engagement strategies designed to explode your reach and build a loyal community.",
    gradient: "linear-gradient(135deg, #9333ea, #d946ef)",
  },
  {
    icon: faPaintBrush,
    title: "Creative Graphic Design",
    description:
      "Scroll-stopping visuals and premium brand identity designs that define your personality and set you apart from competitors.",
    gradient: "linear-gradient(135deg, #f59e0b, #f97316)",
  },
  {
    icon: faLaptopCode,
    title: "High-Performance Web Dev",
    description:
      "Blazing fast, SEO-ready websites built on React & Next.js. We engineer digital experiences that convert visitors into customers.",
    gradient: "linear-gradient(135deg, #0ea5e9, #22d3ee)",
  },
  {
    icon: faSearch,
    title: "Strategic SEO Growth",
    description:
      "Technical optimization and data-backed content strategies to secure top rankings and drive sustainable organic traffic.",
    gradient: "linear-gradient(135deg, #16a34a, #4ade80)",
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
            From cinematic visuals to high-performance code, we design end-to-end
            systems that create brand authority and compounding ROI.
          </p>
        </motion.div>

        {/* UPDATED DESIGN: 
            Changed from Grid to Flexbox to handle 5 items gracefully.
            - justify-content: center -> Centers the 2 items in the last row.
            - flex-wrap: wrap -> Allows items to flow naturally.
            - gap: 2rem -> Maintains spacing.
        */}
        <div 
          className="strategies-modern-container"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "2rem",
            padding: "0 1rem",
            maxWidth: "1200px",
            margin: "0 auto"
          }}
        >
          {strategyItems.map((item, index) => (
            <motion.div
              className="strategy-modern-card-pro"
              key={index}
              style={{
                background: item.gradient,
                flex: "1 1 300px", /* Grow, Shrink, Basis: Cards won't get smaller than 300px */
                maxWidth: "360px", /* Prevents cards from getting too wide on large screens */
                width: "100%",     /* Ensures it takes space on mobile */
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