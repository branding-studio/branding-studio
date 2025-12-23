import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMailchimp } from "react-icons/fa";
import "./TopHeader.css";
import { useLocalContext } from "../../../context/LocalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const TopHeader = () => {

    const {webinfo} = useLocalContext();

  return (
    <div className="top-header">
      <div className="top-header__left">
        <a href={`mailto:${webinfo.email}`} className="top-header__email">
          <FontAwesomeIcon icon={faEnvelope} /> <span>{webinfo.email}</span>
        </a>
      </div>
      <div className="top-header__right">
        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <FaFacebookF />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer">
          <FaTwitter />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          <FaInstagram />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer">
          <FaLinkedinIn />
        </a>
      </div>
    </div>
  );
};

export default TopHeader;
