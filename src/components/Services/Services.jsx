import React from "react";
import "./Services.css";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaBullhorn,
  FaSearch,
  FaShareAlt,
  FaVideo,
  FaLaptopCode,
   FaUserSecret
} from "react-icons/fa";
import Process from "../Process/Process";

const fadeCard = (i) => ({
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: "easeOut" },
  },
});

const Services = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const services = [
    {
      title: "Google Ads (PPC)",
      slug: "/services/google-ads-ppc",
      desc: "Performance Max + Search campaigns with GA4+GTM, policy-safe growth, and creative testing.",
      extras: [
        "Industries: Tech, Travel, Event, Real Estate",
        "Clean GA4 + GTM tracking",
      ],
      icon: <FaBullhorn />,
      badge: "Most Popular",
      color: "var(--accent-color)",
      shadow: "rgba(255, 122, 89, .35)",
    },
    {
      title: "SEO Services",
      slug: "/services/seo",
      desc: "White-hat technical + content SEO, topical clusters, and internal linking that builds long-term visibility.",
      icon: <FaSearch />,
      color: "var(--primary-color)",
      shadow: "rgba(0, 82, 204, .3)",
    },
    {
      title: "SMO",
      slug: "/services/smo",
      desc: "12–20 monthly posts across FB, IG, LinkedIn, YouTube — captions, hashtags & optional boosting.",
      icon: <FaShareAlt />,
      color: "var(--primary-color-light)",
      shadow: "rgba(146, 112, 204, .3)",
    },
    {
      title: "Video Editing",
      slug: "/services/video-editing",
      desc: "Shorts, ads & explainers with hooks in 3s, captions, branding, and multi-format exports (9:16 • 1:1 • 16:9).",
      icon: <FaVideo />,
      color: "var(--success-color)",
      shadow: "rgba(22, 163, 74, .28)",
    },
    {
      title: "Web Development",
      slug: "/services/website-development",
      desc: "React/WordPress builds, Core Web Vitals optimized, landing pages crafted for conversions.",
      icon: <FaLaptopCode />,
      color: "var(--primary-color-dark)",
      shadow: "rgba(10, 73, 168, .3)",
    },
     {
      title: "Ethical Hacking",
      slug: "/services/ethical-hacking",
      desc:
        "Penetration testing & vulnerability scans for apps, APIs and networks. Compliance-ready audit reporting and remediation guidance.",
      extras: [
        "Web/App, API & Network pentests",
        "OWASP Top 10 coverage + proof-of-concepts",
      ],
      icon: <FaUserSecret />,
      color: "var(--primary-color-dark)",
      shadow: "rgba(10, 73, 168, .30)",
    },
  ];

  return (
    <>
    <section className="services-pro services-pro--brand">
      <div className="services-pro-header">
        <h2>
          Your Growth Engine <span>Weboku Services</span>
        </h2>
        <p>Strategic. Conversion-focused. Policy-safe.</p>
      </div>

      <div className="services-pro-grid">
        {services.map((s, i) => (
          <motion.article
            key={s.title}
            className={`services-pro-card ${s.badge ? "highlight" : ""}`}
            variants={fadeCard(i)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            onClick={() => navigate(s.slug)}
            role="button"
            tabIndex={0}
          >
            {s.badge && <span className="services-ribbon">{s.badge}</span>}

            <div className="services-icon-wrapper">
              <div className="hexagon">
                <svg
                  viewBox="0 0 177.4 197.4"
                  style={{ filter: `drop-shadow(4px 5px 4px ${s.shadow})` }}
                >
                  <path
                    fill={s.color}
                    d="M0,58.4v79.9c0,6.5,3.5,12.6,9.2,15.8l70.5,40.2c5.6,3.2,12.4,3.2,18,0l70.5-40.2c5.7-3.2,9.2-9.3,9.2-15.8V58.4 
                    c0-6.5-3.5-12.6-9.2-15.8L97.7,2.4c-5.6-3.2-12.4-3.2-18,0L9.2,42.5C3.5,45.8,0,51.8,0,58.4z"
                  />
                </svg>
              </div>
              <div className="services-icon">{s.icon}</div>
            </div>

            <div className="services-pro-content">
              <h3>{s.title}</h3>
              <p>{s.desc}</p>

              {s.extras && (
                <ul className="services-bullets">
                  {s.extras.map((extra, idx) => (
                    <li key={idx}>{extra}</li>
                  ))}
                </ul>
              )}

              {s.title === "Web Development" && (
                <div className="services-progress">
                  <span style={{ width: "88%" }} />
                </div>
              )}

              <span className="services-pro-link">Learn More →</span>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
    {location.pathname === "/services" &&<Process />}
    </>
  );
};

export default Services;
