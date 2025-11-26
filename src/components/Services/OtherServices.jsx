import React from "react";
import "./OtherServices.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaLightbulb,
  FaCode,
  FaPenNib,
  FaEnvelope,
  FaChartPie,
  FaSlidersH,
} from "react-icons/fa";

const otherServices = [
  {
    title: "Brand Strategy",
    description:
      "Shape your brand’s voice, visuals, and market positioning for long-term recognition and impact.",
    iconColor: "#0ea5e9",
    iconShadow: "rgba(14,165,233,0.3)",
    link: "/services/brand-strategy",
    icon: <FaLightbulb />,
  },
  {
    title: "Web Development",
    description:
      "Custom, responsive, and lightning-fast websites designed to convert visitors into customers.",
    iconColor: "#10b981",
    iconShadow: "rgba(16,185,129,0.3)",
    link: "/services/web-development",
    icon: <FaCode />,
  },
  {
    title: "Content Creation",
    description:
      "Engaging blogs, videos, graphics, and more — tailored to educate, inspire, and convert.",
    iconColor: "#ef4444",
    iconShadow: "rgba(239,68,68,0.3)",
    link: "/services/content-creation",
    icon: <FaPenNib />,
  },
  {
    title: "Email Marketing",
    description:
      "Drive repeat sales with automated campaigns, personalized flows, and performance tracking.",
    iconColor: "#6366f1",
    iconShadow: "rgba(99,102,241,0.3)",
    link: "/services/email-marketing",
    icon: <FaEnvelope />,
  },
  {
    title: "Conversion Optimization",
    description:
      "Test, tweak, and optimize your site for higher conversion rates and better ROI.",
    iconColor: "#eab308",
    iconShadow: "rgba(234,179,8,0.3)",
    link: "/services/conversion-optimization",
    icon: <FaSlidersH />,
  },
  {
    title: "Analytics & Reporting",
    description:
      "Know what’s working and what’s not with in-depth analytics dashboards and monthly reporting.",
    iconColor: "#f43f5e",
    iconShadow: "rgba(244,63,94,0.3)",
    link: "/services/analytics",
    icon: <FaChartPie />,
  },
];

const OtherServices = () => {
  const navigate = useNavigate();

  return (
    <section className="other-services">
      <div className="other-services-header">
        <h2>Explore More of What We Offer</h2>
        <p>Complementary services that amplify your marketing strategy.</p>
      </div>

      <div className="other-services-grid">
        {otherServices.map((service, index) => (
          <motion.div
            key={index}
            className="other-service-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            onClick={() => navigate(service.link)}
          >
            <div className="services-icon-wrapper">
              <div
                className="hexagon"
                style={{
                  fill: service.iconColor,
                  filter: `drop-shadow(4px 5px 4px ${service.iconShadow})`,
                }}
              >
                <svg viewBox="0 0 177.4 197.4">
                  <path d="M0,58.4v79.9c0,6.5,3.5,12.6,9.2,15.8l70.5,40.2c5.6,3.2,12.4,3.2,18,0l70.5-40.2c5.7-3.2,9.2-9.3,9.2-15.8V58.4 
                    c0-6.5-3.5-12.6-9.2-15.8L97.7,2.4c-5.6-3.2-12.4-3.2-18,0L9.2,42.5C3.5,45.8,0,51.8,0,58.4z" />
                </svg>
              </div>
              <div className="fa-icon">{service.icon}</div>
            </div>

            <div className="other-service-content">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <span className="other-service-link">Learn More →</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default OtherServices;
