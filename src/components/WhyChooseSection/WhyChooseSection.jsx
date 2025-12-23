import {
  FaBullhorn,
  FaSearchDollar,
  FaChartLine,
  FaHandshake,
  FaRocket,
  FaLaptopCode,
  FaLightbulb,
  FaUsers
} from "react-icons/fa";
import { motion } from "framer-motion";
import './WhyChooseSection.css'

const features = [
  {
    icon: <FaBullhorn />,
    title: "Full-Funnel Campaigns",
    desc: "We cover the entire customer journey — from awareness to conversion across Google, Meta & more.",
    color: "#3b82f6",
  },
  {
    icon: <FaSearchDollar />,
    title: "ROI-Driven SEO",
    desc: "Keyword research, content, backlinks, and technical audits tailored for long-term visibility and ROI.",
    color: "#facc15",
  },
  {
    icon: <FaChartLine />,
    title: "Data-First Strategy",
    desc: "We use real-time analytics and insights to inform decisions and continuously optimize performance.",
    color: "#8b5cf6",
  },
  {
    icon: <FaHandshake />,
    title: "Transparent Partnership",
    desc: "Clear KPIs, weekly updates, and full access to reporting — so you always know what’s happening.",
    color: "#10b981",
  },
  {
    icon: <FaRocket />,
    title: "Fast, Agile Execution",
    desc: "No bottlenecks. We move fast with lean processes and startup-ready marketing systems.",
    color: "#ec4899",
  },
  {
    icon: <FaLaptopCode />,
    title: "Landing Page Optimization",
    desc: "We build and test high-converting landing pages integrated with your CRM and analytics.",
    color: "#0ea5e9",
  },
  {
  icon: <FaUsers />,
  title: "Dedicated Account Manager",
  desc: "Every client gets a dedicated strategist to ensure smooth communication, clarity, and consistent support.",
  color: "#f97316", // Orange
},
{
  icon: <FaLightbulb />,
  title: "Creative Ad Strategy",
  desc: "We craft compelling ad creatives and messaging that align with your brand and engage your audience effectively.",
  color: "#a855f7", // Violet
},

];

export default function WhyChooseSection() {
  return (
    <motion.section
      className="why-choose-section"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
    >
      <div className="why-choose-header">
        <p className="why-choose-subtitle">Why Choose Us</p>
        <h2 className="why-choose-title">
          Trusted by 200+ Brands for Growth-Driven Digital Marketing
        </h2>
        <p className="why-choose-desc">
          We bring strategy, execution, and performance together under one roof — from SEO to ads to landing pages.
        </p>
      </div>

      <div className="why-choose-grid">
        {features.map((item, idx) => (
          <div className="why-card-new" key={idx}>
            <div
              className="why-icon-circle"
              style={{ backgroundColor: item.color }}
            >
              {item.icon}
            </div>
            <h4>{item.title}</h4>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
