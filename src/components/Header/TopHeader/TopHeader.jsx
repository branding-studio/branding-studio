import React from "react";
import { FaInstagram, FaYoutube, FaEnvelope } from "react-icons/fa";
import "./TopHeader.css";
import { useLocalContext } from "../../../context/LocalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const TopHeader = () => {
  const { webinfo } = useLocalContext();

  return (
    <div className="top-header">
      <div className="top-header__left">
        <a href={`mailto:${webinfo.email}`} className="top-header__email">
          <FontAwesomeIcon icon={faEnvelope} /> <span>{webinfo.email}</span>
        </a>
      </div>
      <div className="top-header__right">
        {/* 1. YouTube */}
        <a
          href="https://www.youtube.com/@brandingstudioteam"
          target="_blank"
          rel="noreferrer"
          aria-label="YouTube"
        >
          <FaYoutube />
        </a>

        {/* 2. Instagram */}
        <a
          href="https://www.instagram.com/brandingstudio.in/"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
        >
          <FaInstagram />
        </a>

        {/* 3. Mail Icon */}
        <a href={`mailto:${webinfo.email}`} aria-label="Email">
          <FaEnvelope />
        </a>
      </div>
    </div>
  );
};

export default TopHeader;