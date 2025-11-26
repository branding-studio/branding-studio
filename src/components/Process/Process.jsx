import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlassChart,
  faRoute,
  faPalette,
  faRocket,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import "./Process.css";

const steps = [
  {
    title: "Discovery & Research",
    description:
      "We dive deep into your industry, competitors, and audience to build a clear foundation for growth.",
    icon: faMagnifyingGlassChart,
  },
  {
    title: "Strategic Roadmap",
    description:
      "Custom funnels designed to align SEO, PPC, social, and automation with your goals.",
    icon: faRoute,
  },
  {
    title: "Creative Development",
    description:
      "Our designers and copywriters craft stunning visuals and persuasive messaging that convert.",
    icon: faPalette,
  },
  {
    title: "Launch & Activation",
    description:
      "From ads to SEO to content, we activate campaigns across the right channels for maximum reach.",
    icon: faRocket,
  },
  {
    title: "Optimization & Scale",
    description:
      "Performance is tracked in real time; we test, refine, and double down on what drives ROI.",
    icon: faChartLine,
  },
];

const fadeIn = (i) => ({
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  },
});

const Process = () => {
  return (
    <section className="process-section">
      <motion.div
        className="process-intro"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn(0)}
      >
        <span className="process-tag">Our Workflow</span>
        <h2>Your Growth Journey in 5 Steps</h2>
        <p>
          Every campaign we run follows a proven process designed to uncover
          opportunities, launch with impact, and grow with precision.
        </p>
      </motion.div>

      <div className="process-timeline">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className={`process-step ${index % 2 === 0 ? "left" : "right"}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn(index + 1)}
          >
            <div className="process-icon">
              <FontAwesomeIcon icon={step.icon} />
            </div>
            <div className="process-content">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Process;
