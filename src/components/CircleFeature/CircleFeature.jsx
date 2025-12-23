import React from "react";
import { motion } from "framer-motion";
import "./CircleFeature.css";
import {
  FaChartLine,
  FaBullhorn,
  FaCodeBranch,
  FaUsers,
  FaRocket,
} from "react-icons/fa";

const stats = [
  { label: "Brands Scaled", value: "850+", color: "#2563eb" },
  { label: "Campaign Wins", value: "37+", color: "#db2777" },
  { label: "Years Experience", value: "8+", color: "#10b981" },
  { label: "Projects Delivered", value: "190+", color: "#f59e0b" },
];

const icons = [
  { icon: FaChartLine, label: "Analytics" },
  { icon: FaBullhorn, label: "Promotion" },
  { icon: FaCodeBranch, label: "Automation" },
  { icon: FaUsers, label: "Engagement" },
  { icon: FaRocket, label: "Growth" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const CircleFeature = () => {
  return (
    <section className="circle-feature-alt">
      <motion.div
        className="feature-intro"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeInUp}
        custom={0}
      >
        <span className="feature-tag">Marketing</span>
        <h2 className="feature-title">Campaign Engine</h2>
        <p>
          Our full-stack marketing solution blends automation, analytics, and
          creativity to drive real growth and customer engagement.
        </p>
      </motion.div>

      <div className="feature-icons-grid">
        {icons.map(({ icon: Icon, label }, i) => (
          <motion.div
            key={i}
            className="feature-icon-card"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            custom={i + 1}
          >
            <div className="icon-circle">
              <Icon />
            </div>
            <p>{label}</p>
          </motion.div>
        ))}
      </div>

      <div className="feature-stats-panel">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            className="stat-card-alt"
            style={{ borderColor: stat.color }}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            custom={i + icons.length}
          >
            <h3 style={{ color: stat.color }}>{stat.value}</h3>
            <p>{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CircleFeature;
