import React from "react";
import "./Testimonials.css";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const testimonials = [
  {
    name: "Ananya R.",
    role: "Marketing Head, Urban Bloom",
    feedback:
      "Their digital campaigns delivered results beyond our expectations. Conversions doubled in just 6 weeks!",
  },
  {
    name: "Rohit S.",
    role: "Founder, DevSpark",
    feedback:
      "The team is sharp, creative, and extremely professional. They handled everything from SEO to PPC with finesse.",
  },
  {
    name: "Priya M.",
    role: "Ecom Head, StyleNest",
    feedback:
      "Amazing experience! Our ROI improved drastically, and their insights helped shape our brand presence online.",
  },
  {
    name: "Karan T.",
    role: "CTO, LearnTech",
    feedback:
      "Our product launches have never been smoother. They bring clarity and strategy into execution.",
  },
  {
    name: "Neha D.",
    role: "Head of Growth, FitFuel",
    feedback:
      "From content to conversions, everything improved. Their team became an extension of ours.",
  },
  {
    name: "Siddharth P.",
    role: "Operations Lead, RetailDeck",
    feedback:
      "Clear communication, actionable insights, and a team that really understands ecommerce. Highly recommended!",
  },
  {
    name: "Megha S.",
    role: "Brand Manager, PureGlow",
    feedback:
      "They understood our audience perfectly and delivered messaging that truly resonated.",
  },
  {
    name: "Akash J.",
    role: "Founder, TechNest",
    feedback:
      "Campaign performance exceeded every benchmark. A++ strategy and execution.",
  },
  {
    name: "Divya R.",
    role: "Director, WellnessMart",
    feedback:
      "Smart, creative, and on-time. Their digital execution turned our idea into traction.",
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <motion.div
        className="testimonial-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2>What Our Clients Say</h2>
        <p>Real impact, real results. Hear from those we've partnered with.</p>
      </motion.div>

      <Swiper
        modules={[Navigation, Autoplay]}
        slidesPerView={3}
        spaceBetween={30}
        navigation
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="testimonial-swiper"
      >
        {testimonials.map((t, index) => (
          <SwiperSlide key={index}>
            <motion.div
              className="testimonial-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="testimonial-text">“{t.feedback}”</p>
              <div className="testimonial-author">
                <div className="author-name">{t.name}</div>
                {/* <div className="author-role">{t.role}</div> */}
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
