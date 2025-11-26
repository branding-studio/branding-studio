import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLocalContext } from "../../context/LocalContext";
import "./Hero.css";

import {
  FaShareAlt,
  FaSearch,
  FaBullhorn,
  FaUserSecret,
  FaLaptopCode,
} from "react-icons/fa";

const DEFAULT_HERO_IMG =
  "https://res.cloudinary.com/duv3inafo/image/upload/v1756629000/photo-1551836022-d5d88e9218df_tdl2r7.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.8, 0.25, 1] },
  },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const Hero = () => {
  const navigate = useNavigate();

  // ⬇️ Grab centralized helpers + webinfo
  const { webinfo, openTelegram } = useLocalContext();

  const brand = webinfo?.name || "Your Brand";
  const heroImage = webinfo?.heroImage || DEFAULT_HERO_IMG;

  const services = [
    {
      label: "SMO",
      icon: <FaShareAlt />,
      to: "/services/smo",
      desc: "Social posts, engagement & boosting",
    },
    {
      label: "SEO",
      icon: <FaSearch />,
      to: "/services/seo",
      desc: "White-hat technical + content",
    },
    {
      label: "Google Ads (PPC)",
      icon: <FaBullhorn />,
      to: "/services/google-ads-ppc",
      desc: "Tech Industry Covered",
    },
    {
      label: "Website / Web Dev",
      icon: <FaLaptopCode />,
      to: "/services/website-development",
      desc: "Fast, conversion-first builds",
    },
    {
      label: "Ethical Hacking",
      icon: <FaUserSecret />,
      to: "/services/ethical-hacking",
      desc: "Pen-testing, vulnerability assessment & cyber defense",
    },
  ];

  return (
    <section className="mk-hero mk-hero--enhanced" aria-label="Hero">
      {/* Background visuals */}
      <div className="mk-bg mk-bg--orbA" />
      <div className="mk-bg mk-bg--orbB" />
      <div className="mk-grid-dots" aria-hidden="true" />

      <motion.div
        className="mk-grid"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* LEFT */}
        <div className="mk-left">
          <motion.span className="mk-pill" variants={fadeUp}>
            {brand} • Tech Support
          </motion.span>

          <motion.h1 className="mk-title" variants={fadeUp}>
            Fast, Friendly <span className="mk-title-accent">Tech Support</span>
            <br />
            When You Need It
          </motion.h1>

          <motion.p className="mk-sub" variants={fadeUp}>
            We fix laptops, desktops, printers and Wi-Fi issues remotely or
            on-site. Secure, policy-safe workflows with clear pricing and simple
            updates.
          </motion.p>

          <motion.div className="mk-ctas" variants={fadeUp}>
            {/* ⬇️ Button now uses centralized openTelegram */}
            <button
              className="mk-btn mk-btn--primary"
              onClick={(e) => {
                e.preventDefault();
                openTelegram?.(); // centralized logic handles app/web/fallback
              }}
              aria-label="Get Tech Support on Telegram"
            >
              Get Tech Support on Telegram
            </button>

            <button
              className="mk-btn mk-btn--ghost"
              onClick={() => navigate("/services")}
              aria-label="Explore services"
            >
              Explore Services
            </button>
          </motion.div>

          {/* credibility chips */}
          <motion.ul className="mk-trust" variants={fadeUp}>
            <li>Secure remote sessions</li>
            <li>Clear, upfront steps</li>
            <li>Fast response</li>
          </motion.ul>
        </div>

        {/* RIGHT */}
        <motion.div
          className="mk-right"
          variants={fadeUp}
          transition={{ delay: 0.08 }}
        >
          <div className="mk-photo-wrap mk-photo-wrap--glow">
            <img
              src={heroImage}
              alt="Tech support specialist"
              className="mk-photo"
            />

            {/* Floating mini card – chart */}
            <motion.div
              className="mk-float mk-float--chart"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
            >
              <div className="mk-mini-card">
                <svg
                  className="mk-linechart"
                  viewBox="0 0 120 60"
                  preserveAspectRatio="none"
                >
                  <polyline
                    points="5,55 20,48 35,42 50,45 65,30 80,35 95,18 115,22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </svg>
                <p>Issue Resolution</p>
              </div>
            </motion.div>

            {/* Floating mini card – donut */}
            <motion.div
              className="mk-float mk-float--donut"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="mk-mini-card mk-mini-card--donut">
                <div className="mk-donut">
                  <div className="mk-donut-ring" />
                </div>
                <p>Quick Turnaround</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* SERVICES STRIP */}
      <motion.div
        className="mk-services mk-services--pro"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {services.map((s) => (
          <motion.button
            key={s.label}
            className="mk-service mk-service--card"
            variants={fadeUp}
            whileHover={{ y: -6 }}
            onClick={() => navigate(s.to)}
            aria-label={`${s.label} service`}
          >
            <span className="mk-ring">{s.icon}</span>
            <span className="mk-service-texts">
              <strong>{s.label}</strong>
              <small>{s.desc}</small>
            </span>
          </motion.button>
        ))}
      </motion.div>
    </section>
  );
};

export default Hero;
