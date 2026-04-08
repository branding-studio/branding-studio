import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import "./SubFooterBanner.css";

const SubFooterBanner = ({
  kicker = "Need help growing your brand?",
  title = "Chat with Support on WhatsApp — Get Help in Minutes",
  blurb = 
    "Get expert guidance on marketing, branding, and digital growth — tailored strategies that deliver real results.",
  points = [
    "Quick WhatsApp support",
    "Clear step-by-step resolution",
  ],
  ctaLabel = "WhatsApp Now",
  whatsappNumber = "91XXXXXXXXXX", // ✅ put number with country code (no +, no spaces)
  whatsappMessage = "Hi! I need tech support. Please help.", // optional
}) => {
  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <aside className="sfw">
      <div className="sfw-band">
        <div className="sfw-inner">
          <div className="sfw-copy">
            <span className="sfw-kicker">{kicker}</span>
            <h3 className="sfw-title">{title}</h3>
            <p className="sfw-blurb">{blurb}</p>

            {!!points?.length && (
              <ul className="sfw-points" aria-label="Highlights">
                {points.slice(0, 6).map((p) => (
                  <li key={p}>
                    <FaCheckCircle aria-hidden="true" /> {p}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="sfw-actions">
            <a
              className="sfw-btn"
              href={waLink}
              target="_blank"
              rel="noreferrer"
              aria-label="Chat on WhatsApp"
            >
              <FaWhatsapp aria-hidden="true" />
              {ctaLabel}
            </a>

            <small className="sfw-note">
              No long waits. Quick resolution, every time.
            </small>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SubFooterBanner;
