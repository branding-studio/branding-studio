import React from "react";
import "./TelegramFixed.css";
import { FaTelegramPlane } from "react-icons/fa";
import { useLocalContext } from "../../context/LocalContext";


const TelegramFixed = ({
  handle,
  label = "Connect",
  position = "right",
  topOffset = "50%",
  hrefOverride,
  showLabelMdUp = true,
  pulse = true,
}) => {
  const { openTelegram, getTelegramUrl, webinfo = {} } = useLocalContext();
  const telegramUrl =
    hrefOverride ||
    (handle ? `https://t.me/${handle.replace(/^@/, "")}` : null) ||
    getTelegramUrl?.({ preferApp: false }) || 
    "https://t.me/";

  return (
    <div
      className="tgfab-wrap"
      data-position={position}
      style={{ top: topOffset }}
      aria-hidden="false"
    >
      <a
        className={`tgfab ${pulse ? "pulse" : ""}`}
        href={telegramUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          e.preventDefault();
          openTelegram?.({ handle }); 
        }}
        aria-label={`Open Telegram @${
          handle || webinfo.telegramHandle || "contact"
        }`}
      >
        <FaTelegramPlane className="tgfab-ico" aria-hidden="true" />
        <span className={`tgfab-label ${showLabelMdUp ? "md-up" : ""}`}>
          {label}
        </span>
      </a>
    </div>
  );
};

export default TelegramFixed;
