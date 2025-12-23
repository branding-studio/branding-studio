import React from "react";
import { useNavigate } from "react-router-dom";
import { FaAngleRight, FaCheckCircle } from "react-icons/fa";
import "./SubFooterBanner.css";

const SubFooterBanner = ({
  kicker = "Need reliable help?",
  title = "Get started with your Tech Support Journey!",
  blurb = "Get fast, expert assistance for devices, apps, and connectivity—so downtime never slows you down.",
  points = [
    "24/7 remote assistance",
    "Secure troubleshooting",
    "Step-by-step resolutions",
  ],
  ctaLabel = "Start Support Now",
  ctaTo = "/contact",
}) => {
  const navigate = useNavigate();

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
            <button className="sfw-btn" onClick={() => navigate(ctaTo)}>
              {ctaLabel} <FaAngleRight />
            </button>
            <small className="sfw-note">No long waits. Quick resolution, every time.</small>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SubFooterBanner;
