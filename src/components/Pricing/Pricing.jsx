import React from "react";
import { FaCheck, FaArrowRight } from "react-icons/fa";
import "./Pricing.css";
import { useLocalContext } from "../../context/LocalContext";

const Pricing = () => {
  const { openWhatsApp } = useLocalContext();

  const plans = [
    {
      id: 1,
      title: "Starter",
      // Removed subtitle "Monthly Package 1"
      price: "₹7,999",
      features: [
        "Complete Social Media Mgt.",
        "FB, Insta & Google",
        "Basic Branding & Visuals",
        "Google & Meta Ads Setup",
        "Unique Brand Strategy",
      ],
      highlight: false,
    },
    {
      id: 2,
      title: "Basic",
      price: "₹19,999",
      features: [
        "Everything in Starter",
        "8 Basic Reel Shoots",
        "4 Creative Static Posts",
        "Festival & Event Posts",
        "₹5,000 Ads Budget Included",
        "Community Management",
      ],
      highlight: false,
    },
    {
      id: 3,
      title: "Advanced",
      price: "₹29,999",
      features: [
        "Everything in Basic",
        "12 Creative Reel Shoots",
        "8 Creative Posts",
        "Professional Content Writing",
        "Premium Logo & Visiting Card",
        "₹5,000 Ads Budget Included",
        "1 Logo Animation (Comp.)",
      ],
      highlight: true,
    },
    {
      id: 4,
      title: "Premium",
      price: "₹49,999",
      features: [
        "Everything in Advanced",
        "15 Creative Reel Shoots",
        "15 Premium Posts",
        "Complete Stationery Kit",
        "₹10,000 Ads Budget Included",
        "Business Consultation",
        "GMB SEO & Optimization",
        "Influencer Mgt. / Photoshoot",
      ],
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="pricing-section">
      <div className="pricing-bg-circle circle-1"></div>
      <div className="pricing-bg-circle circle-2"></div>

      <div className="pricing-container">
        <div className="pricing-header">
          <span className="pricing-badge">Simple Pricing</span>
          <h2>Choose the plan that fits your growth</h2>
          <p>Transparent pricing. No hidden fees. Cancel anytime.</p>
        </div>

        <div className="pricing-grid">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`pricing-card ${plan.highlight ? "highlight" : ""}`}
            >
              {plan.highlight && <div className="popular-tag">Most Popular</div>}
              
              <div className="card-content">
                <div className="card-head">
                  <span className="plan-name">{plan.title}</span>
                  <h3 className="plan-price">
                    {plan.price} <span className="gst">+ GST</span>
                  </h3>
                  {/* Removed plan.subtitle paragraph here */}
                </div>

                <div className="card-divider"></div>

                <ul className="feature-list">
                  {plan.features.map((feature, i) => (
                    <li key={i}>
                      <span className="icon-check">
                        <FaCheck />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="card-action">
                  <button
                    className={`btn-pricing ${plan.highlight ? "btn-glow" : ""}`}
                    onClick={() => {
                      if (openWhatsApp) {
                        openWhatsApp({
                          message: `Hi, I am interested in the ${plan.title} Plan (${plan.price})`,
                        });
                      }
                    }}
                  >
                    <span>Get Started</span> <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;