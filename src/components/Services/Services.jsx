
import React, { useMemo } from "react";
import "./Services.css";
import { motion, useReducedMotion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

import { FaShareAlt, FaVideo, FaSearch, FaLaptopCode } from "react-icons/fa";
import { FaPalette } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";

import Process from "../Process/Process";

const Services = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();

  const services = useMemo(
    () => [
      {
        label: "Content Creation",
        icon: <FaVideo />,
        to: "/services/film-making",
        desc: "Creative shoots, reels, ad films & high-impact brand content",
        tone: "a",
        img: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        label: "Social Media Marketing",
        icon: <FaShareAlt />,
        to: "/services/smo",
        desc: "Content, engagement & paid boosting",
        tone: "b",
        img: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        label: "Graphic Designing",
        icon: <FaPalette />,
        to: "/services/graphic-design",
        desc: "Visual identity, creatives & brand design",
        tone: "c",
        img: "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        label: "Website / Web Dev",
        icon: <FaLaptopCode />,
        to: "/services/website-development",
        desc: "Fast, conversion-focused websites",
        tone: "d",
        img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        label: "SEO",
        icon: <FaSearch />,
        to: "/services/seo",
        desc: "Technical + content-driven search growth",
        tone: "e",
        img: "https://images.unsplash.com/photo-1674027001834-719c347d1eca?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
    []
  );

  const wrapV = useMemo(
    () => ({
      hidden: {},
      show: {
        transition: prefersReducedMotion
          ? {}
          : { staggerChildren: 0.09, delayChildren: 0.05 },
      },
    }),
    [prefersReducedMotion]
  );

  const cardV = useMemo(
    () => ({
      hidden: prefersReducedMotion
        ? { opacity: 0 }
        : { opacity: 0, y: 18, scale: 0.985 },
      show: prefersReducedMotion
        ? { opacity: 1 }
        : {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
          },
    }),
    [prefersReducedMotion]
  );

  const mediaV = useMemo(
    () => ({
      rest: { scale: 1 },
      hover: prefersReducedMotion
        ? { scale: 1 }
        : { scale: 1.06, transition: { duration: 0.45, ease: "easeOut" } },
    }),
    [prefersReducedMotion]
  );

  const glowV = useMemo(
    () => ({
      rest: { opacity: 0.35, scale: 1 },
      hover: prefersReducedMotion
        ? { opacity: 0.35, scale: 1 }
        : { opacity: 0.65, scale: 1.08, transition: { duration: 0.45 } },
    }),
    [prefersReducedMotion]
  );

  const ctaV = useMemo(
    () => ({
      rest: { x: 0 },
      hover: prefersReducedMotion
        ? { x: 0 }
        : { x: 4, transition: { duration: 0.25, ease: "easeOut" } },
    }),
    [prefersReducedMotion]
  );

  const onCardKeyDown = (e, href) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navigate(href);
    }
  };

  return (
    <>
      <section className="wks-services v5">
        <div className="wks-services__shell">
          {/* header */}
          <header className="wks-services__head">
            <motion.div
              className="wks-services__kicker"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <span className="wks-services__spark" aria-hidden="true" />
              Branding Studios
            </motion.div>

            <motion.h2
              className="wks-services__title"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              Modern services for <span>fast brands</span>
            </motion.h2>

            <motion.p
              className="wks-services__sub"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.55, delay: 0.05, ease: "easeOut" }}
            >
              Creative + performance execution across content, design, marketing and web —
              made to convert and scale.
            </motion.p>
          </header>

          <motion.div
            className="wks-grid"
            variants={wrapV}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.22 }}
          >
            {services.map((s) => (
              <motion.article
                key={s.to}
                variants={cardV}
                className={`wks-tile wks-tile--${s.tone}`}
                role="button"
                tabIndex={0}
                onClick={() => navigate(s.to)}
                onKeyDown={(e) => onCardKeyDown(e, s.to)}
                aria-label={`Open ${s.label}`}
                whileHover="hover"
                initial="rest"
                animate="rest"
              >

                <div className="wks-tile__media" aria-hidden="true">
                  <motion.img
                    src={s.img}
                    alt=""
                    loading="lazy"
                    variants={mediaV}
                  />
                  <div className="wks-tile__overlay" />
                  <div className="wks-tile__noise" />
                  <motion.div className="wks-tile__glow" variants={glowV} />
                </div>

                <div className="wks-tile__top">
                  <motion.div
                    className="wks-tile__icon"
                    initial={prefersReducedMotion ? false : { scale: 0.92, opacity: 0 }}
                    whileInView={prefersReducedMotion ? {} : { scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    {s.icon}
                  </motion.div>

                  <span className="wks-tile__chip">Studio-grade</span>
                </div>

                <div className="wks-tile__body">
                  <h3 className="wks-tile__title">{s.label}</h3>
                  <p className="wks-tile__desc">{s.desc}</p>
                </div>

                <div className="wks-tile__foot">
                  <span className="wks-tile__meta">Learn • Build • Scale</span>

                  <motion.span className="wks-tile__cta" variants={ctaV}>
                    View <FaArrowRight />
                  </motion.span>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {location.pathname === "/services" && <Process />}
    </>
  );
};

export default Services;
