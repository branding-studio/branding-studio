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
  const context = useLocalContext();
  const webinfo = context?.webinfo;

  return (
    <section className="impact-orbit" aria-label="Impact Orbit">
      {/* Background Elements */}
      <div className="io-glow io-glow--1" />
      <div className="io-glow io-glow--2" />
      <div className="io-dots" aria-hidden="true" />

      <div className="io-grid">
        {/* --- LEFT SIDE: TEXT --- */}
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

        {/* --- RIGHT SIDE: ORBIT --- */}
        <motion.div
          className="io-visual"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fade(0.2)}
        >
          <div className="io-orbit-frame">
            
            {/* --- NEW: WAVE RIPPLES ADDED HERE --- */}
            {/* These pulse outward from behind the center hub */}
            <div className="io-wave" style={{ animationDelay: "0s" }} />
            <div className="io-wave" style={{ animationDelay: "1s" }} />
            <div className="io-wave" style={{ animationDelay: "2s" }} />

            {/* Dashed Ring */}
            <div className="io-orbit-ring" aria-hidden="true" />

            {/* Orbit Animation Wrapper */}
            <div className="io-orbit-anim">
              {services.map((s, i) => (
                <div key={s.label} className="io-node" style={{ "--i": i }}>
                  
                  {/* LAYER 2: Counter-Spin Wrapper */}
                  <div className="io-node-counter">
                    
                    {/* LAYER 3: Static Correction (Inner Card) */}
                    <div className="io-node-inner">
                      <div className="io-node-icon">{s.icon}</div>
                      <div className="io-node-detail">
                        <b>{s.label}</b>
                        <span>{s.hint}</span>
                      </div>
                    </div>

                  </div>

                </div>
              ))}
            </div>

            {/* BIG CENTER HUB */}
            <div className="io-core">
              <strong>{webinfo?.name || "Branding Studio"}</strong>
              <small>HUB</small>
            </div>
          </div>
        </motion.div>
      </div>

      {/* KPI BAR */}
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
    </section>
  );
}