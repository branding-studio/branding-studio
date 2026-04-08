// OneClickSection.jsx (same content, minor structure upgrades)
import React, { forwardRef } from "react";
import "./OneClickSection.css";
import {
  FaShareAlt,
  FaVideo,
  FaSearch,
  FaLaptopCode,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";
import { FaPalette } from "react-icons/fa6";
import { MdOutlineAutoGraph, MdInsights } from "react-icons/md";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const containerVariant = {
  initial: {},
  animate: { transition: { staggerChildren: 0.14, delayChildren: 0.06 } },
};

const cardVariant = {
  initial: { opacity: 0, y: 26, scale: 0.992 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.56, ease: "easeOut" },
  },
};

const hoverLift = {
  y: -6,
  transition: { type: "spring", stiffness: 320, damping: 22 },
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
        {/* FEATURE — Film Making */}
        <motion.div className="card card--wide card--feature film" variants={cardVariant} whileHover={hoverLift}>
          <div className="card__header">
            <div className="card__icon card__icon--circle" aria-hidden="true">
              <FaVideo />
            </div>
            <div className="card__eyebrow">Content Creation</div>
          </div>

          <div className="card__body">
            <h3>High-impact content that looks premium and performs</h3>
            <p>
              End-to-end content creation for brands — from scripting and shoots to editing, reels,
              ad creatives, and platform-ready visual storytelling built to engage and convert.
            </p>
            <div className="industries" role="group" aria-label="What you get">
              <h5>What you get</h5>
              <div className="chips">
                <span className="chip chip--tag"><FaCheckCircle /> Content Strategy</span>
                <span className="chip chip--tag"><FaCheckCircle /> Shoot Planning</span>
                <span className="chip chip--tag"><FaCheckCircle /> Editing + Delivery</span>
                <span className="chip chip--tag"><FaCheckCircle /> Reels + Ads</span>
              </div>
            </div>
          </div>

          <div className="card__footer split">
            <button className="card__btn" onClick={() => navigate("/services/film-making")}>
              Explore Content Creation <FaArrowRight />
            </button>

            <div className="kpi" aria-label="Typical delivery timeline">
              <span className="kpi__value">3–7d</span>
              <span className="kpi__label">Typical Delivery</span>
            </div>
          </div>
        </motion.div>

        {/* SEO — TALL */}
        <motion.div className="card card--tall seo" variants={cardVariant} whileHover={hoverLift}>
          <div className="card__pill"><FaSearch /> SEO</div>

          <div className="card__body">
            <h4>Rank + convert (not just traffic)</h4>
            <ul className="bullets">
              <li>Technical fixes + Core Web Vitals</li>
              <li>Local SEO + service pages</li>
              <li>Content roadmap + on-page</li>
            </ul>
            <div className="card__big-ico" aria-hidden="true"><MdOutlineAutoGraph /></div>
          </div>

          <div className="card__footer">
            <button className="card__btn ghost" onClick={() => navigate("/services/seo")}>
              View SEO Plans <FaArrowRight />
            </button>
          </div>
        </motion.div>

        {/* Social Media — SMALL */}
        <motion.div className="card card--small smo" variants={cardVariant} whileHover={hoverLift}>
          <div className="card__pill"><FaShareAlt /> Social Media</div>

          <div className="card__body">
            <h5>Social Media Marketing</h5>
            <p>Monthly content + creatives, engagement, and optional paid boosting for leads.</p>
          </div>

          <div className="card__footer">
            <button className="card__btn ghost" onClick={() => navigate("/services/social-media-marketing")}>
              View Packages <FaArrowRight />
            </button>
          </div>
        </motion.div>

        {/* Web Dev — WIDE */}
        <motion.div className="card card--wide webdev" variants={cardVariant} whileHover={hoverLift}>
          <div className="card__header" style={{ gap: "1rem" }}>
            <div className="card__icon card__icon--circle card__icon--outline" aria-hidden="true">
              <FaLaptopCode />
            </div>
            <div className="card__eyebrow">Website / Web Dev</div>
          </div>

          <div className="card__body">
            <h3>Fast websites built for leads</h3>
            <p>
              Landing pages, business websites and scalable builds — clean UI, mobile-first layouts and
              strong performance.
            </p>

            <div className="progress" aria-hidden="true"><span style={{ width: "92%" }} /></div>
          </div>

          <div className="card__footer split">
            <button className="card__btn ghost" onClick={() => navigate("/pricing")}>
              View Web Packages <FaArrowRight />
            </button>

            <div className="kpi" aria-label="Performance focused">
              <span className="kpi__value">90+</span>
              <span className="kpi__label">Speed Score Target</span>
            </div>
          </div>
        </motion.div>

        {/* Design — TALL */}
        <motion.div className="card card--tall design" variants={cardVariant} whileHover={hoverLift}>
          <div className="card__pill"><FaPalette /> Design</div>

          <div className="card__body">
            <h4>Design that feels consistent everywhere</h4>
            <p>Brand kits, social creatives, ad banners, pitch decks — modern, clean, on-brand.</p>

            <div className="chips" style={{ marginTop: ".6rem" }}>
              <span className="chip">Brand Kit</span>
              <span className="chip">Ad Creatives</span>
              <span className="chip">Pitch Deck</span>
            </div>

            <div className="card__big-ico" aria-hidden="true"><MdInsights /></div>
          </div>

          <div className="card__footer">
            <button className="card__btn ghost" onClick={() => navigate("/gallery")}>
              View Design Work <FaArrowRight />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
});

export default OneClickSection;
