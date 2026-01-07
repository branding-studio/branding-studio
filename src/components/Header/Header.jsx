// src/components/Header/Header.jsx
import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
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

  const { webinfo = {}, openWhatsApp } = useLocalContext();

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

  const handleWhatsApp = () => {
    openWhatsApp?.({
      message: `Hi ${webinfo?.name || "Branding Studio"}, I’d like to connect.`,
      preferApp: true,
    });
  };

  return (
    <>
      <TopHeader />

      <header className={`apple-header ${scrolled ? "scrolled" : ""}`}>
        <div
          className="apple-container"
          style={{
            maxWidth: "100%",
            width: "100%",
            padding: isMobile ? "0 1rem" : "0 6rem",
            boxSizing: "border-box",
          }}
        >
          {/* 1. Logo Section */}
          <div className="apple-logo" onClick={() => handleNavigate("/")}>
            <img src={webinfo.logo} alt={webinfo.name || "Logo"} />
          </div>

          {/* 2. Desktop Navigation */}
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

          {/* 3. Right Actions (WhatsApp, Call, Mobile Toggle) */}
          <div className="apple-actions">
            {/* WhatsApp - Minimalist Icon */}
            <button
              type="button"
              className="apple-icon-btn whatsapp"
              aria-label="Connect on WhatsApp"
              onClick={handleWhatsApp}
            >
              <FaWhatsapp />
            </button>

            {/* Call Button */}
            <button
              type="button"
              className="apple-icon-btn call"
              onClick={() => (window.location.href = `tel:${webinfo.phonecall}`)}
              aria-label="Call Us"
            >
              <FaPhoneAlt />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="apple-menu-toggle"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <FaBars />
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <div className={`apple-mobile-overlay ${menuOpen ? "open" : ""}`}>
          <div className="apple-mobile-header">
            <div className="mobile-logo-text">{webinfo.name || "Menu"}</div>
            <button type="button" className="close-btn" onClick={() => setMenuOpen(false)}>
              <FaTimes />
            </button>
          </div>

          <div className="apple-mobile-links">
            {["Home", "Services", "Our Strategies", "Blogs", "Contact Us"].map((text, i) => {
              const path = ["/", "/services", "/our-strategies", "/blogs", "/contact"][i];
              return (
                <span key={path} onClick={() => handleNavigate(path)}>
                  {text}
                </span>
              );
            })}

            <div className="mobile-divider"></div>

            {/* WhatsApp link */}
            <a
              href="#"
              className="mobile-action-link"
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(false);
                handleWhatsApp();
              }}
            >
              <FaWhatsapp /> Connect on WhatsApp
            </a>

            {/* Call link */}
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
