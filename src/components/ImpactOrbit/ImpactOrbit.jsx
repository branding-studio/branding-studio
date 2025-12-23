import React from "react";
import { motion } from "framer-motion";
import {
  FaBullhorn,   // PPC
  FaSearch,     // SEO
  FaShareAlt,   // SMO
  FaVideo,      // Video
  FaLaptopCode, // Web Dev
} from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import "./ImpactOrbit.css";
import { useLocalContext } from "../../context/LocalContext";

const services = [
  { icon: <FaBullhorn />, label: "PPC", hint: "Google & PMax" },
  { icon: <FaSearch />, label: "SEO", hint: "Technical + Content" },
  { icon: <FaShareAlt />, label: "SMO", hint: "Posts & Boosting" },
  { icon: <FaVideo />, label: "Video", hint: "Shorts & Ads" },
  { icon: <FaLaptopCode />, label: "Web Dev", hint: "React / WP" },
  { icon: <MdSecurity />, label: "Ethical Hacking", hint: "Pentest" },
];

const kpis = [
  { value: "2.8x", label: "Median ROAS (PPC)" },
  { value: "+120%", label: "Organic Growth" },
  { value: "48–72h", label: "Video Turnaround" },
  { value: "88+", label: "CWV Performance" },
];

const fade = (i=0, d=0.55) => ({
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: d, delay: i * 0.08, ease: [0.25,0.8,0.25,1] } }
});

export default function ImpactOrbit() {

    const {webinfo} = useLocalContext();

  return (
    <section className="impact-orbit" aria-label="Impact Orbit – capabilities & KPIs">
      {/* Soft background field */}
      <div className="io-bg io-bg--a" aria-hidden="true" />
      <div className="io-bg io-bg--b" aria-hidden="true" />
      <div className="io-grid">
        {/* LEFT: Headline & Pitch */}
        <motion.div
          className="io-copy"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fade(0)}
        >
          <span className="io-pill">Your Growth Engine</span>
          <h2 className="io-title">
            One Stack. <span>Real Results.</span>
          </h2>
          <p className="io-sub">
            We pair fast web experiences, policy-safe acquisition and clear analytics to
            create compounding growth. Every channel tracked end-to-end—no guesswork.
          </p>

          <div className="io-highlights">
            <div className="io-chip">GA4 + GTM implemented</div>
            <div className="io-chip">Weekly reporting</div>
            <div className="io-chip">Policy-safe execution</div>
          </div>
        </motion.div>

        {/* RIGHT: Orbital services */}
        <motion.div
          className="io-orbit"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fade(0)}
        >
          <div className="io-core">
            <div className="io-core-ring" />
            <strong>{webinfo.name}</strong>
            <small>Growth Studio</small>
          </div>

          {/* Outer Orbit */}
          <div className="io-ring io-ring--outer">
            {services.map((s, i) => (
              <motion.button
                key={s.label}
                className={`io-node io-node--${i+1}`}
                title={s.label}
                variants={fade(i+1, 0.45)}
                whileHover={{ scale: 1.06 }}
                whileFocus={{ scale: 1.06 }}
              >
                <span className="io-node-ico">{s.icon}</span>
                <span className="io-node-text">
                  <b>{s.label}</b>
                  <em>{s.hint}</em>
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* KPI STRIP */}
      <div className="io-kpis">
        {kpis.map((k, i) => (
          <motion.div
            key={k.label}
            className="io-kpi"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fade(i)}
          >
            <span className="io-kpi-value">{k.value}</span>
            <span className="io-kpi-label">{k.label}</span>
          </motion.div>
        ))}
      </div>

      {/* INFO CARDS */}
      <div className="io-cards">
        <motion.article className="io-card" variants={fade(0)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h3>PPC Playbook</h3>
          <p>Search + Performance Max built on clean conversion events. Query-level learnings, creative testing, and budget rebalancing to chase ROAS.</p>
          <ul>
            <li>Industries: Tech, Travel, Event, Real Estate</li>
            <li>Shared negatives & SKAGs where useful</li>
            <li>Experiments every week</li>
          </ul>
        </motion.article>

        <motion.article className="io-card" variants={fade(1)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h3>SEO System</h3>
          <p>Technical foundations + topical depth. We build clusters, internal links and schema across fast, indexable pages.</p>
          <ul>
            <li>90%+ tech audit score targets</li>
            <li>Keyword intent mapping</li>
            <li>Policy-safe, white-hat</li>
          </ul>
        </motion.article>

        <motion.article className="io-card" variants={fade(2)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h3>Security First</h3>
          <p>Optional ethical hacking to harden exposed surfaces. Pentests with reproducible steps and prioritized fixes.</p>
          <ul>
            <li>Web/App, API & Network tests</li>
            <li>OWASP Top 10 coverage</li>
            <li>Remediation guidance</li>
          </ul>
        </motion.article>
      </div>
    </section>
  );
}
