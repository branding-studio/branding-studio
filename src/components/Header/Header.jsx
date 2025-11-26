import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaPhoneAlt, FaEnvelope, FaTelegramPlane } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useLocalContext } from "../../context/LocalContext";
import "./Header.css";
import TopHeader from "./TopHeader/TopHeader";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ⬇️ Grab centralized helpers from context
  const {
    webinfo = {},
    openTelegram,      // function to open Telegram (app/web with fallback)
    getTelegramUrl,    // function that returns a safe href (web/app)
  } = useLocalContext();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavigate = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  // Build an href for <a> (so right-click/open in new tab still works).
  // Prefer web URL for href (compatible everywhere); onClick will try app if available.
  const telegramHref = getTelegramUrl?.({ preferApp: false }) || "https://t.me/";

  return (
    <>
      <TopHeader />

      <header className={`clean-header ${scrolled ? "scrolled" : ""}`}>
        <div className="header-inner">
          <div className="logo" onClick={() => handleNavigate("/")}>
            <img src={webinfo.logo} alt={webinfo.name || "Logo"} />
          </div>

          <nav className="nav-links">
            {["/", "/services", "/our-strategies", "/blogs", "/contact"].map((path, i) => (
              <span
                key={path}
                className={location.pathname === path ? "active" : ""}
                onClick={() => handleNavigate(path)}
              >
                {["Home", "Services", "Our Strategies", "Blogs", "Contact Us"][i]}
              </span>
            ))}
          </nav>

          <div className="right-actions">
            {/* Telegram — uses centralized helpers */}
            <a
              className="telegram-btn"
              href={telegramHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Connect on Telegram${webinfo.telegramHandle ? ` @${webinfo.telegramHandle}` : ""}`}
              onClick={(e) => {
                // Let the centralized helper handle app/web + popup fallback
                e.preventDefault();
                openTelegram?.(); // uses default webinfo.telegramHandle
              }}
            >
              <FaTelegramPlane />
              <span>Connect</span>
            </a>

            <button
              className="call-now-btn"
              onClick={() => (window.location.href = `tel:${webinfo.phonecall}`)}
            >
              <FaPhoneAlt />
              <span>{webinfo.phone}</span>
            </button>

            <button
              className="menu-toggle"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <FaBars />
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div
          className={`mobile-drawer ${menuOpen ? "open" : ""}`}
          role="dialog"
          aria-modal="true"
        >
          <div className="drawer-header">
            <strong>{webinfo.name || "DM Agency"}</strong>
            <button
              className="close-icon"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <FaTimes />
            </button>
          </div>

          <div className="drawer-links">
            {["Home", "Services", "Our Strategies", "Blogs", "Contact Us"].map((text, i) => (
              <span
                key={i}
                onClick={() =>
                  handleNavigate(["/", "/services", "/our-strategies", "/blogs", "/contact"][i])
                }
              >
                {text}
              </span>
            ))}

            {/* Telegram in drawer — still uses centralized helpers */}
            <a
              className="drawer-telegram-btn"
              href={telegramHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                openTelegram?.();
              }}
            >
              <FaTelegramPlane />
              <span>Connect</span>
            </a>

            <button
              className="drawer-call-btn"
              onClick={() => (window.location.href = `tel:${webinfo.phonecall}`)}
            >
              <FaPhoneAlt />
              <span>{webinfo.phone}</span>
            </button>

            <button
              className="drawer-call-btn"
              onClick={() => (window.location.href = `mailto:${webinfo.email}`)}
            >
              <FaEnvelope />
              <span>{webinfo.email}</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
