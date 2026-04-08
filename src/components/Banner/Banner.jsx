import React from "react";
import { useNavigate } from "react-router-dom";
import "./Banner.css";
import { motion } from "framer-motion";
import { useLocalContext } from "../../context/LocalContext";
import { FaWhatsapp } from "react-icons/fa";

const Banner = () => {
  const navigate = useNavigate();
  const { openWhatsApp, webinfo } = useLocalContext();

  const brand = webinfo?.name || "Branding Studios";

  return (
    <section className="elevate-banner">
      <motion.div
        className="elevate-banner-content"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.6 }}
      >
        <span className="banner-tag">Results-Driven Digital Marketing</span>

        <h2>
          Unlock <span>Scalable Growth</span> for Your Business
        </h2>

        <p>
          Data-driven campaigns. Creative storytelling. Relentless optimization.
          We align your brand with proven strategies that attract, convert, and
          retain customers at scale.
        </p>

        <div className="banner-actions">
          <button
            onClick={() =>
              openWhatsApp?.({
                message: `Hi ${brand}, I want to discuss scalable growth for my business.`,
                preferApp: true,
              })
            }
          >
            <FaWhatsapp /> Connect on WhatsApp
          </button>

          <button className="secondary-btn" onClick={() => navigate("/services")}>
            Explore Services
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default Banner;
