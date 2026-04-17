import React from "react";
import "./WhatsappFixed.css";
import { FaWhatsapp } from "react-icons/fa";
import { useLocalContext } from "../../context/LocalContext";

const WhatsappFixed = ({
  number, 
  message = "Hi! I need help.", 
  label = "Chat",
  position = "right",
  topOffset = "50%",
  hrefOverride,
  showLabelMdUp = true,
  pulse = true,
  preferApp, 
}) => {
  const { openWhatsApp, getWhatsAppUrl, webinfo = {} } = useLocalContext();

  const whatsappUrl =
    hrefOverride ||
    (number
      ? `https://wa.me/${String(number).replace(/[^\d]/g, "")}${
          message ? `?text=${encodeURIComponent(message)}` : ""
        }`
      : null) ||
    getWhatsAppUrl?.({ message, preferApp: false }) || 
    "https://wa.me/";

  const displayNumber =
    String(number || webinfo.whatsappNumber || "").replace(/[^\d]/g, "") || "support";

  return (
    <div
      className="wafab-wrap"
      data-position={position}
      style={{ top: topOffset }}
      aria-hidden="false"
    >
      <a
        className={`wafab ${pulse ? "pulse" : ""}`}
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          e.preventDefault();
          openWhatsApp?.({ number, message, preferApp });
        }}
        aria-label={`Open WhatsApp chat ${displayNumber}`}
      >
        <FaWhatsapp className="wafab-ico" aria-hidden="true" />
        <span className={`wafab-label ${showLabelMdUp ? "md-up" : ""}`}>
          {label}
        </span>
      </a>
    </div>
  );
};

export default WhatsappFixed;
