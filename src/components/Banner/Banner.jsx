import React from "react";
import { useNavigate } from "react-router-dom";
import "./Banner.css";
import { motion } from "framer-motion";
import { useLocalContext } from "../../context/LocalContext";
import { FaTelegram, FaTelegramPlane } from "react-icons/fa";

const Banner = () => {
  const navigate = useNavigate();
  const {openTelegram} = useLocalContext();

  return (
    <section className="elevate-banner">
      <motion.div
        className="elevate-banner-content"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.6 }}
      >
        <span className="banner-tag">Next-Level Marketing</span>
        <h2>
          Unlock <span>Scalable Growth</span> for Your Business
        </h2>
        <p>
          Data-driven campaigns. Creative storytelling. Relentless optimization.
          We align your brand with proven strategies that attract, convert, and
          retain customers at scale.
        </p>
        <div className="banner-actions">
          <button onClick={() => openTelegram()}><FaTelegramPlane /> Connect On Telegram</button>
          <button
            className="secondary-btn"
            onClick={() => navigate("/services")}
          >
            Explore Services
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default Banner;
