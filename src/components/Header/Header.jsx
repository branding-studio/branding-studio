import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaPhoneAlt, FaTelegramPlane } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useLocalContext } from "../../context/LocalContext"; 
import "./Header.css";
import TopHeader from "./TopHeader/TopHeader";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const {
    webinfo = {},
    openTelegram,
    getTelegramUrl,
  } = useLocalContext();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const handleNavigate = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  const telegramHref = getTelegramUrl?.({ preferApp: false }) || "https://t.me/";

  return (
    <>
      <TopHeader />

      <header className={`apple-header ${scrolled ? "scrolled" : ""}`}>
        {/* FIX: 
            1. width: "100%" to span the screen.
            2. padding: "0 8.8rem" is used for desktop to match your TopHeader.css exactly.
            3. We use a ternary operator to switch back to smaller padding on mobile so the header doesn't break on phones.
        */}
        <div 
          className="apple-container" 
          style={{ 
            maxWidth: "100%", 
            width: "100%", 
            padding: isMobile ? "0 1rem" : "0 8.8rem", 
            boxSizing: "border-box" 
          }}
        >
          {/* 1. Logo Section */}
          <div className="apple-logo" onClick={() => handleNavigate("/")}>
            <img src={webinfo.logo} alt={webinfo.name || "Logo"} />
          </div>

          {/* 2. Desktop Navigation (Centered) */}
          <nav className="apple-nav">
            {["Home", "Services", "Our Strategies", "Blogs", "Contact Us"].map((text, i) => {
              const path = ["/", "/services", "/our-strategies", "/blogs", "/contact"][i];
              return (
                <span
                  key={path}
                  className={location.pathname === path ? "active" : ""}
                  onClick={() => handleNavigate(path)}
                >
                  {text}
                </span>
              );
            })}
          </nav>

          {/* 3. Right Actions (Telegram, Call, Mobile Toggle) */}
          <div className="apple-actions">
            
            {/* Telegram - Minimalist Icon Style */}
            <a
              className="apple-icon-btn telegram"
              href={telegramHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Connect on Telegram"
              onClick={(e) => {
                e.preventDefault();
                openTelegram?.();
              }}
            >
              <FaTelegramPlane />
            </a>

            {/* Call Button - Minimalist */}
            <button
              className="apple-icon-btn call"
              onClick={() => (window.location.href = `tel:${webinfo.phonecall}`)}
              aria-label="Call Us"
            >
              <FaPhoneAlt />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="apple-menu-toggle"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <FaBars />
            </button>
          </div>
        </div>

        {/* Mobile Drawer (Overlay Style) */}
        <div className={`apple-mobile-overlay ${menuOpen ? "open" : ""}`}>
          <div className="apple-mobile-header">
             <div className="mobile-logo-text">{webinfo.name || "Menu"}</div>
            <button className="close-btn" onClick={() => setMenuOpen(false)}>
              <FaTimes />
            </button>
          </div>

          <div className="apple-mobile-links">
            {["Home", "Services", "Our Strategies", "Blogs", "Contact Us"].map((text, i) => {
               const path = ["/", "/services", "/our-strategies", "/blogs", "/contact"][i];
               return (
                <span key={i} onClick={() => handleNavigate(path)}>
                  {text}
                </span>
              )
            })}
            
            <div className="mobile-divider"></div>

            <a
              href={telegramHref}
              className="mobile-action-link"
              onClick={(e) => {
                e.preventDefault();
                openTelegram?.();
              }}
            >
              <FaTelegramPlane /> Connect Telegram.
            </a>
            
            <a href={`tel:${webinfo.phonecall}`} className="mobile-action-link">
              <FaPhoneAlt /> {webinfo.phone || "Call Us"}
            </a>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;