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

  const { webinfo = {}, openWhatsApp } = useLocalContext();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavigate = (path) => {
    setMenuOpen(false);
    navigate(path);
    window.scrollTo(0, 0);
  };

  const handleWhatsApp = () => {
    openWhatsApp?.({
      message: `Hi ${webinfo?.name || "Branding Studio"}, I’d like to connect.`,
      preferApp: true,
    });
  };

  const menuItems = [
    { text: "Home", path: "/" },
    { text: "Services", path: "/services" },
    { text: "Pricing", path: "/pricing" },
    { text: "Our Strategies", path: "/our-strategies" },
    { text: "Gallery", path: "/gallery" },
    { text: "Contact Us", path: "/contact" },
    { text: "Our Team", path: "/team" },
  ];

  return (
    <>
      <TopHeader />

      <header className={`apple-header ${scrolled ? "scrolled" : ""}`}>
        <div className="apple-container">
          <div className="apple-logo" onClick={() => handleNavigate("/")}>
            <img src="/assets/logo/branding-logo.png" alt="Branding Studio" />
          </div>

          <nav className="apple-nav">
            {menuItems.map((item) => (
              <span
                key={item.text}
                className={location.pathname === item.path ? "active" : ""}
                onClick={() => handleNavigate(item.path)}
              >
                {item.text}
              </span>
            ))}
          </nav>

          <div className="apple-actions">
            <button
              type="button"
              className="apple-icon-btn whatsapp"
              onClick={handleWhatsApp}
            >
              <FaWhatsapp />
            </button>

            <button
              type="button"
              className="apple-icon-btn call"
              onClick={() => (window.location.href = `tel:${webinfo.phonecall}`)}
            >
              <FaPhoneAlt />
            </button>

            <button
              type="button"
              className="apple-menu-toggle"
              onClick={() => setMenuOpen(true)}
            >
              <FaBars />
            </button>
          </div>
        </div>

        <div className={`apple-mobile-overlay ${menuOpen ? "open" : ""}`}>
          <div className="apple-mobile-header">
            <div
              className="mobile-logo-container"
              onClick={() => handleNavigate("/")}
            >
              <img
                src="/assets/logo/branding-logo.png"
                alt="Branding Studio"
                className="mobile-logo-img"
              />
            </div>

            <button
              className="close-btn"
              onClick={() => setMenuOpen(false)}
            >
              <FaTimes />
            </button>
          </div>

          <div className="apple-mobile-links">
            {menuItems.map((item) => (
              <span
                key={item.text}
                onClick={() => handleNavigate(item.path)}
              >
                {item.text}
              </span>
            ))}

            <div className="mobile-divider"></div>

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

            <a
              href={`tel:${webinfo.phonecall}`}
              className="mobile-action-link"
            >
              <FaPhoneAlt /> {webinfo.phone || "Call Us"}
            </a>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;