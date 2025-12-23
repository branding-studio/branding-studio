import React, { useState } from "react";
import "./FaqSection.css";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const faqData = [
  {
    question: "Why should I choose your agency?",
    answer:
      "We blend creativity with performance marketing. Every campaign is tracked end-to-end with GA4 + GTM so you get both transparency and results.",
  },
  {
    question: "How long before I see ROI from campaigns?",
    answer:
      "Quick-win campaigns like PPC show results within weeks, while SEO and brand strategies usually compound over 3–6 months.",
  },
  {
    question: "Do you provide custom strategies?",
    answer:
      "Yes. Every client receives a tailored growth roadmap aligned to industry, budget, and KPIs — never a one-size-fits-all plan.",
  },
  {
    question: "Can you work with my in-house team?",
    answer:
      "Absolutely. We often plug into existing marketing, design, or dev teams to accelerate performance without disrupting workflows.",
  },
  {
    question: "What’s your support like after launch?",
    answer:
      "We provide ongoing optimization, reporting, and dedicated account managers. Think of us as your long-term growth partner.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="faq-section">
      <div className="faq-header">
        <span className="faq-pill">Support Hub</span>
        <h2>Your Questions, Answered</h2>
        <p>
          Everything you need to know about our services, processes, and
          results. Can’t find your question?{" "}
          <a href="/contact">Contact our team</a>.
        </p>
      </div>

      <div className="faq-list">
        {faqData.map((faq, index) => (
          <motion.div
            key={index}
            className={`faq-item ${openIndex === index ? "active" : ""}`}
            onClick={() => toggleFAQ(index)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <div className="faq-question">
              <h4>{faq.question}</h4>
              <FaChevronDown
                className={`icon ${openIndex === index ? "rotate" : ""}`}
              />
            </div>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  className="faq-answer"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p>{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
