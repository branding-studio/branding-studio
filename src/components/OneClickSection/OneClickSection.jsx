import React, { forwardRef } from "react";
import "./OneClickSection.css";
import {
  FaShareAlt,      // SMO
  FaVideo,         // Video Editing
  FaSearch,        // SEO
  FaBullhorn,      // Google Ads (PPC)
  FaLaptopCode,    // Web Dev
  FaArrowRight,
  FaUserSecret
} from "react-icons/fa";
import { MdOutlineAutoGraph, MdInsights } from "react-icons/md";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const containerVariant = {
  initial: {},
  animate: { transition: { staggerChildren: 0.16, delayChildren: 0.04 } },
};

const cardVariant = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const TELEGRAM_URL = "https://t.me/darioharmon";

const openTelegram = (e) => {
    e?.preventDefault?.();
    const w = window.open(TELEGRAM_URL, "_blank", "noopener,noreferrer");
    if (!w) window.location.href = TELEGRAM_URL; 
  };

const OneClickSection = forwardRef((_, ref) => {
  const navigate = useNavigate();

  return (
    <section className="one-click one-click--brand" ref={ref} aria-label="Services overview">
      <motion.div
        className="one-click__grid"
        variants={containerVariant}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* PPC — HERO FEATURE */}
        <motion.div className="card card--wide card--feature ppc" variants={cardVariant}>
          <div className="card__header">
            <div className="card__icon" aria-hidden="true"><FaBullhorn /></div>
            <div className="card__eyebrow">Paid Growth</div>
          </div>

          <h3>Google Ads (PPC) That Scales</h3>
          <p>
            Search & Performance Max with clean GA4 + GTM tracking, SKAGs where useful,
            and weekly creative tests—built for ROAS and policy-safe growth.
          </p>

          {/* Industries Covered */}
          <div className="industries" role="group" aria-label="Industries covered">
            <h5>Industries Covered</h5>
            <div className="chips">
              <span className="chip chip--tag">Tech</span>
              <span className="chip chip--tag">Travel</span>
              <span className="chip chip--tag">Event</span>
              <span className="chip chip--tag">Real Estate</span>
            </div>
          </div>

          <div className="split">
            <button
              className="card__btn"
             onClick={openTelegram}
              aria-label="Launch PPC campaigns"
            >
              Launch Campaigns <FaArrowRight />
            </button>
            <div className="kpi" aria-label="Average CTR uplift">
              <span className="kpi__value">+32%</span>
              <span className="kpi__label">Avg. CTR Uplift</span>
            </div>
          </div>
        </motion.div>

        {/* SEO — TALL */}
        <motion.div className="card card--tall seo" variants={cardVariant}>
          <div className="card__pill"><FaSearch /> SEO</div>
          <h4>Technical + Content Wins</h4>
          <ul className="bullets">
            <li>90%+ technical audit score</li>
            <li>Topical clusters & internal links</li>
            <li>Policy-safe white-hat work</li>
          </ul>
          <div className="card__big-ico" aria-hidden="true"><MdOutlineAutoGraph /></div>
        </motion.div>

        {/* SMO — SMALL */}
        <motion.div className="card card--small smo" variants={cardVariant}>
          <div className="card__pill"><FaShareAlt /> SMO</div>
          <h5>Monthly Social Calendar</h5>
          <p>12–20 posts, captions, hashtags, engagement & optional boosting across FB/IG/YT/LinkedIn.</p>
        </motion.div>

        {/* WEB DEV — WIDE */}
        <motion.div className="card card--wide webdev" variants={cardVariant}>
          <div className="card__icon card__icon--outline" aria-hidden="true"><FaLaptopCode /></div>
          <h3>Fast, Conversion-First Websites</h3>
          <p>React / WordPress builds, Core Web Vitals, lightning UX, and landing-page kits that convert.</p>
          <div className="progress" aria-hidden="true">
            <span style={{ width: "88%" }} />
          </div>
          <button
            className="card__btn ghost"
            onClick={() => navigate("/services/website-development")}
          >
            View Web Packages <FaArrowRight />
          </button>
        </motion.div>

        {/* VIDEO — TALL */}
        <motion.div className="card card--tall video" variants={cardVariant}>
          <div className="card__pill"><FaVideo /> Video Editing</div>
          <h4>Shorts, Ads & Explainers</h4>
          <p>Hook in 3s, auto-captions, brand kit, and 9:16 • 1:1 • 16:9 exports ready for ads.</p>
          <div className="card__big-ico" aria-hidden="true"><MdInsights /></div>
        </motion.div>

        {/* OPTIMIZATION — SMALL */}
        <motion.div className="card card--small optimize" variants={cardVariant}>
          <h5>Live Performance Tuning</h5>
          <p>Creative split tests, bid strategies, audience expansion & weekly reporting across PPC/SEO/SMO/Video.</p>
          <div className="badge" aria-label="Policy and tracking ready">Policy-safe • GA4 ready</div>
        </motion.div>

        {/* ETHICAL HACKING — TALL */}
        <motion.div className="card card--tall hacking" variants={cardVariant}>
          <div className="card__pill"><FaUserSecret /> Ethical Hacking</div>
          <h4>Security Testing & Defense</h4>
          <ul className="bullets">
            <li>Penetration testing & vulnerability scans</li>
            <li>Network & application security checks</li>
            <li>Compliance-ready audit reporting</li>
          </ul>
          <button
            className="card__btn ghost"
            onClick={() => navigate("/services/ethical-hacking")}
          >
            Explore Security <FaArrowRight />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
});

export default OneClickSection;
