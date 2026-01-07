// src/components/Hero/Hero.jsx
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLocalContext } from "../../context/LocalContext";
import "./Hero.css";

import { FaShareAlt, FaSearch, FaLaptopCode, FaVideo, FaPalette } from "react-icons/fa";

const DEFAULT_HERO_IMG =
  "https://brandingstudio.in/wp-content/uploads/2025/04/Untitled-Instagram-Post-45-5.gif";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.8, 0.25, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.06 } },
};

const floatIn = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] },
  },
};

const Hero = () => {
  const navigate = useNavigate();
  const { webinfo, openWhatsApp } = useLocalContext();

  const brand = webinfo?.name || "Branding Studio";
  const heroImage = webinfo?.heroImage || DEFAULT_HERO_IMG;

  const services = [
    {
      label: "Film Making",
      icon: <FaVideo />,
      to: "/services/film-making",
      desc: "Ad films, reels & brand stories",
    },
    {
      label: "Social Media Marketing",
      icon: <FaShareAlt />,
      to: "/services/smo",
      desc: "Content + paid growth campaigns",
    },
    {
      label: "Graphic Designing",
      icon: <FaPalette />,
      to: "/services/graphic-design",
      desc: "Brand identity & creatives",
    },
    {
      label: "Website Development",
      icon: <FaLaptopCode />,
      to: "/services/website-development",
      desc: "Fast, premium, conversion-led sites",
    },
    {
      label: "SEO",
      icon: <FaSearch />,
      to: "/services/seo",
      desc: "Rank, traffic & authority building",
    },
  ];

  return (
    <section className="mk-hero mk-hero--v2" aria-label="Hero">
      {/* Ambient background */}
      <div className="mk-bg mk-bg--orbA" />
      <div className="mk-bg mk-bg--orbB" />
      <div className="mk-grid-dots" aria-hidden="true" />

      <motion.div className="mk-shell" variants={stagger} initial="hidden" animate="visible">
        {/* TOP GRID */}
        <div className="mk-grid">
          {/* LEFT */}
          <div className="mk-left">
            <motion.div className="mk-eyebrow" variants={fadeUp}>
              <span className="mk-pill">{brand}</span>
              <span className="mk-dot" />
              <span className="mk-eyetext">Creative + Digital Growth Partner</span>
            </motion.div>

            <motion.h1 className="mk-title" variants={fadeUp}>
              <span className="mk-title-accent">Cinematic Creativity.</span>
              <br />
              Strategy that Converts.
            </motion.h1>

            <motion.p className="mk-sub" variants={fadeUp}>
              We craft high-impact films, social content, brand visuals, and websites that help you
              <b> stand out</b>, <b>build trust</b>, and <b>generate leads</b> — consistently.
            </motion.p>

            <motion.div className="mk-ctas" variants={fadeUp}>
             <button
  className="mk-btn mk-btn--primary"
  onClick={(e) => {
    e.preventDefault();
    openWhatsApp?.({
      message: `Hi ${brand}, I want to discuss branding & digital growth.`,
      preferApp: true,
    });
  }}
  aria-label="Get Started on WhatsApp"
>
  Get Started on WhatsApp
</button>


              <button
                className="mk-btn mk-btn--ghost"
                onClick={() => navigate("/services")}
                aria-label="Explore services"
              >
                Explore Services
              </button>
            </motion.div>

            <motion.div className="mk-badges" variants={fadeUp}>
              <div className="mk-badge">
                <strong>24–72 hrs</strong>
                <span>First deliverable</span>
              </div>
              <div className="mk-badge">
                <strong>Content + Ads</strong>
                <span>Growth engine</span>
              </div>
              <div className="mk-badge">
                <strong>Design to Dev</strong>
                <span>End-to-end</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT */}
          <motion.div className="mk-right" variants={fadeUp} transition={{ delay: 0.06 }}>
            <div className="mk-media">
              <div className="mk-media-frame">
                <img src={heroImage} alt="Branding Studio hero visual" className="mk-photo" loading="eager" />
                <div className="mk-media-shine" aria-hidden="true" />
              </div>

              {/* Mini KPI cards */}
              <motion.div className="mk-kpi mk-kpi--a" variants={floatIn}>
                <div className="mk-kpi-icon">↗</div>
                <div className="mk-kpi-text">
                  <strong>Lead Growth</strong>
                  <span>Better reach + conversions</span>
                </div>
              </motion.div>

              <motion.div className="mk-kpi mk-kpi--b" variants={floatIn}>
                <div className="mk-kpi-icon">⚡</div>
                <div className="mk-kpi-text">
                  <strong>Quick Turnaround</strong>
                  <span>Fast delivery cycles</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* SERVICES */}
        <motion.div className="mk-services mk-services--v2" variants={stagger} initial="hidden" animate="visible">
          {services.map((s) => (
            <motion.button
              key={s.label}
              className="mk-service"
              variants={fadeUp}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(s.to)}
              aria-label={`${s.label} service`}
            >
              <span className="mk-ring">{s.icon}</span>
              <span className="mk-service-texts">
                <strong>{s.label}</strong>
                <small>{s.desc}</small>
              </span>
              <span className="mk-arrow" aria-hidden="true">
                →
              </span>
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
