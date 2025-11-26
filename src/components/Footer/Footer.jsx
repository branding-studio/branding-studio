import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faPaperPlane,
  faPhone,
  faEnvelope,
  faLocationDot,
  faClock,
  faShieldHeart,
  faArrowRight,
  faMedal,
  faCheckDouble,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faYoutube,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { useLocalContext } from "../../context/LocalContext";
import { FaTelegramPlane } from "react-icons/fa";

const Footer = () => {
  const { webinfo, openTelegram } = useLocalContext();
  const brand = webinfo?.name || "Your Brand";

  return (
    <footer className="footerx" aria-label={`${brand} website footer`}>
      {/* Disclaimer */}
      <div className="footerx__disclaimer" role="note" aria-live="polite">
        <FontAwesomeIcon icon={faCircleInfo} />
        <p>
          We partner only with legitimate businesses. All work follows platform
          policies and local laws. <a href="/disclaimer">Read disclaimer</a>.
        </p>
      </div>

      {/* CTA Ribbon */}
      <section className="footerx__cta">
        <div className="footerx__cta-inner">
          <div className="footerx__cta-copy">
            <h3>Ready to accelerate growth?</h3>
            <p>Get a free plan—channels, budgets, and 90-day roadmap.</p>
          </div>
          <div className="footerx__cta-actions">
            <a className="btn btn--primary" onClick={()=>openTelegram()}>
                <FaTelegramPlane /> Connect Now
            </a>
            <a className="btn btn--ghost" href="/services">
              See Our Services 
            </a>
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="footerx__main">
        {/* Brand & Newsletter */}
        <div className="fcard fcard--brand">
          <div className="brand">
            
            <div className="brand__text">
              <img src={webinfo.logo} alt="" />
              {/* <h4>{brand}</h4> */}
              <p>Performance marketing, made simple—and measurable.</p>
            </div>
          </div>

          <form
            className="newsletter"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Subscribe to our newsletter"
          >
            <input
              type="email"
              placeholder="Your email address"
              aria-label="Email address"
              required
            />
            <button type="submit" aria-label="Subscribe">
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </form>

          <div className="socials" aria-label="Social links">
            <a href="#" aria-label="Facebook"><FontAwesomeIcon icon={faFacebookF} /></a>
            <a href="#" aria-label="Twitter"><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="#" aria-label="Instagram"><FontAwesomeIcon icon={faInstagram} /></a>
            <a href="#" aria-label="LinkedIn"><FontAwesomeIcon icon={faLinkedinIn} /></a>
            <a href="#" aria-label="YouTube"><FontAwesomeIcon icon={faYoutube} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <nav className="fcard fcard--links" aria-label="Footer quick links">
          <div>
            <h5>Solutions</h5>
            <ul>
              <li><a href="/services/google-ads-ppc">Google Ads (PPC)</a></li>
              <li><a href="/services/seo">SEO Services</a></li>
              <li><a href="/services/smo">Social Media (SMO)</a></li>
              <li><a href="/services/video-editing">Video Editing</a></li>
              <li><a href="/services/website-development">Web Development</a></li>
              <li><a href="/services/ethical-hacking">Ethical Hacking</a></li>
            </ul>
          </div>
          <div>
            <h5>Company</h5>
            <ul>
              <li><a href="/about">About {brand}</a></li>
              <li><a href="/blogs">Blogs</a></li>
              <li><a href="/our-strategies">Our Strategies</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <h5>Legal</h5>
            <ul>
              <li><a href="/privacy-policy">Privacy Policy</a></li>
              <li><a href="/terms-and-condition">Terms & Conditions</a></li>
              <li><a href="/disclaimer">Disclaimer</a></li>
            </ul>
          </div>
        </nav>

        {/* Contact */}
        <div className="fcard fcard--contact" aria-label="Contact information">
          <h5>Contact</h5>
          <ul className="contact-list">
            <li>
              <FontAwesomeIcon icon={faPhone} />{" "}
              <a href={`tel:${webinfo.phone}`}>{webinfo.phone}</a>
            </li>
            <li>
              <FontAwesomeIcon icon={faEnvelope} />{" "}
              <a href={`mailto:${webinfo.email}`}>{webinfo.email}</a>
            </li>
            <li>
              <FontAwesomeIcon icon={faLocationDot} />{" "}
              <span>Remote-first • Global</span>
            </li>
            <li>
              <FontAwesomeIcon icon={faClock} />{" "}
              <span>Mon–Fri • 9am–6pm</span>
            </li>
          </ul>

          <div className="badges">
            <span><FontAwesomeIcon icon={faShieldHeart} /> Policy-Safe</span>
            <span><FontAwesomeIcon icon={faMedal} /> Senior Team</span>
            <span><FontAwesomeIcon icon={faCheckDouble} /> GA4 + GTM</span>
          </div>
        </div>
      </section>

      {/* Trust Row */}
      <section className="footerx__trust">
        <div className="trust-item">
          <strong>2.8x</strong>
          <span>Median ROAS (PPC)</span>
        </div>
        <div className="trust-item">
          <strong>+120%</strong>
          <span>Organic Growth</span>
        </div>
        <div className="trust-item">
          <strong>48–72h</strong>
          <span>Video Turnaround</span>
        </div>
        <div className="trust-item">
          <strong>20+ countries</strong>
          <span>Global experience</span>
        </div>
      </section>

      {/* Bottom */}
      <div className="footerx__bottom">
        <p>© {new Date().getFullYear()} {brand}. All rights reserved.</p>
        <ul className="legal-mini">
          <li><a href="/privacy-policy">Privacy</a></li>
          <li><a href="/terms-and-condition">Terms</a></li>
          <li><a href="/disclaimer">Disclaimer</a></li>
          <li><a href="/contact">Support</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
