import React from "react";
import { motion } from "framer-motion";
import {
  FaVideo,
  FaHashtag,
  FaPaintBrush,
  FaLaptopCode,
  FaSearch,
} from "react-icons/fa";
import "./ImpactOrbit.css";
import { useLocalContext } from "../../context/LocalContext";

const services = [
  { icon: <FaVideo />, label: "Film Making", hint: "Ads & Cinematic" },
  { icon: <FaHashtag />, label: "Social Media", hint: "Trends & Reach" },
  { icon: <FaPaintBrush />, label: "Graphic Design", hint: "Brand Identity" },
  { icon: <FaLaptopCode />, label: "Web Dev", hint: "React / Next.js" },
  { icon: <FaSearch />, label: "SEO", hint: "Rank & Traffic" },
];

const kpis = [
  { value: "Studio", label: "Quality Grade" },
  { value: "+150%", label: "Engagement" },
  { value: "48h", label: "Edit Turnaround" },
  { value: "Top 3", label: "Ranking Goal" },
];

const fade = (i = 0, d = 0.55) => ({
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: d, delay: i * 0.12, ease: "easeOut" },
  },
});

export default function ImpactOrbit() {
  const { webinfo } = useLocalContext();

  return (
    <section className="impact-orbit" aria-label="Impact Orbit – capabilities & KPIs">
      <div className="io-glow io-glow--1" />
      <div className="io-glow io-glow--2" />
      <div className="io-dots" aria-hidden="true" />

      <div className="io-grid">
        {/* LEFT */}
        <motion.div
          className="io-copy"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fade(0)}
        >
          <span className="io-badge">FULL-STACK GROWTH</span>

          <h2 className="io-title">
            Creative Soul.
            <br />
            <span>Digital Brain.</span>
          </h2>

          <p className="io-sub">
            We blend studio-grade visuals with hard-hitting data strategies.
            <br />
            From cinematic ad films to high-conversion websites, we build the entire ecosystem your
            brand needs to scale.
          </p>

          <div className="io-tags">
            <span>Studio-Grade Content</span>
            <span>Data-Driven SEO</span>
            <span>Policy-Safe Ads</span>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          className="io-visual"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fade(0.2)}
        >
          <div className="io-orbit-frame">
            {/* Fixed Ring */}
            <div className="io-orbit-ring" aria-hidden="true" />

            {/* Orbiting Wrapper (DO NOT aria-hide because you hover inside it) */}
            <div className="io-orbit-anim">
              {services.map((s, i) => (
                <div
                  key={s.label}
                  className="io-node"
                  style={{ "--i": i }}
                >
                  {/* Hover scale ONLY inner */}
                  <motion.div
                    className="io-node-inner"
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  >
                    <div className="io-node-icon">{s.icon}</div>
                    <div className="io-node-detail">
                      <b>{s.label}</b>
                      <span>{s.hint}</span>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Center Core (topmost) */}
            <div className="io-core">
              <div className="io-core-content">
                <strong>{webinfo?.name || "Branding Studio"}</strong>
                <small>HUB</small>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* KPI STRIP */}
      <motion.div
        className="io-kpi-bar"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fade(0.35)}
      >
        {kpis.map((k, i) => (
          <div key={i} className="io-kpi-item">
            <span className="io-kpi-val">{k.value}</span>
            <span className="io-kpi-lbl">{k.label}</span>
          </div>
        ))}
      </motion.div>

      {/* Cards */}
      <div className="io-deck">
        <motion.div
          className="io-card"
          variants={fade(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="io-card-head">
            <FaVideo /> Visual Storytelling
          </div>
          <p>
            We don’t just post; we produce. Ad films, cinematic reels, and brand shoots that capture
            attention instantly.
          </p>
        </motion.div>

        <motion.div
          className="io-card"
          variants={fade(0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="io-card-head">
            <FaLaptopCode /> Digital Experience
          </div>
          <p>
            Websites that load fast and convert visitors. Built with modern stacks + deep SEO
            integration to compound traffic.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
