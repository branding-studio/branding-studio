import React from "react";
import "./Disclaimer.css";
import { useLocalContext } from "../../context/LocalContext";

const formatDate = (v) => {
  const d = v instanceof Date ? v : new Date(v);
  return isNaN(d) ? "-" : d.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" });
};

const Disclaimer = () => {
  const { webinfo = {} } = useLocalContext();

  const company = webinfo.name || "Our Company";
  const email = webinfo.email || "hello@example.com";
  const phone = webinfo.phone || "—";
  const city = webinfo.addressCity || "your operating region";
  const lastUpdated = formatDate(webinfo.disclaimerUpdated || webinfo.legalUpdated || new Date());

  return (
    <section className="disc" role="main">
      {/* Header */}
      <header className="disc-header">
        <p className="disc-kicker">Legal</p>
        <h1 className="disc-title">Website Disclaimer</h1>
        <p className="disc-sub">
          This page explains important limitations that apply when you use our website and any
          information published on it.
        </p>
        <p className="disc-meta">Last updated: {lastUpdated}</p>
      </header>

      {/* Top TOC chips (mobile-first, scrollable) */}
      <nav className="disc-card disc-toc" aria-label="On this page">
        <h3>On this page</h3>
        <ul>
          <li><a href="#overview">Overview</a></li>
          <li><a href="#no-warranties">No warranties</a></li>
          <li><a href="#no-advice">Not professional advice</a></li>
          <li><a href="#external-links">External links</a></li>
          <li><a href="#user-resp">Your responsibilities</a></li>
          <li><a href="#liability">Limitation of liability</a></li>
          <li><a href="#availability">Availability &amp; uptime</a></li>
          <li><a href="#security">Security &amp; viruses</a></li>
          <li><a href="#testimonials">Testimonials &amp; case studies</a></li>
          <li><a href="#ip">Intellectual property</a></li>
          <li><a href="#changes">Changes to this notice</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* Body */}
      <article className="disc-card disc-body">
        <section id="overview" className="disc-section">
          <h2>1. Overview</h2>
          <p>
            The information on this website is provided by <strong>{company}</strong> for general
            informational purposes. While we aim to keep content accurate and current, it may not
            always reflect the latest developments, standards, or interpretations.
          </p>
        </section>

        <section id="no-warranties" className="disc-section">
          <h2>2. No warranties</h2>
          <p>
            The website, its content, and any downloadable materials are provided on an
            “as-is” and “as-available” basis. <strong>{company}</strong> makes no representations
            or warranties of any kind, express or implied, including but not limited to accuracy,
            completeness, timeliness, merchantability, fitness for a particular purpose, or
            non-infringement.
          </p>
        </section>

        <section id="no-advice" className="disc-section">
          <h2>3. Not professional advice</h2>
          <p>
            Nothing on this site constitutes legal, financial, tax, or technical advice. You should
            obtain advice from a qualified professional before acting on any information found here.
          </p>
        </section>

        <section id="external-links" className="disc-section">
          <h2>4. External links</h2>
          <p>
            Our site may link to third-party websites and services not operated or controlled by
            <strong> {company}</strong>. We are not responsible for their content, availability,
            security, or practices, and inclusion of a link does not imply endorsement.
          </p>
        </section>

        <section id="user-resp" className="disc-section">
          <h2>5. Your responsibilities</h2>
          <ul>
            <li>Evaluate the suitability of any information for your particular use case.</li>
            <li>Use appropriate safeguards when downloading files or clicking external links.</li>
            <li>Comply with applicable laws and respect third-party rights when using our content.</li>
          </ul>
        </section>

        <section id="liability" className="disc-section">
          <h2>6. Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, <strong>{company}</strong> will not be liable
            for any indirect, incidental, special, consequential, exemplary, or punitive damages,
            or for loss of profits, data, goodwill, or business opportunities, arising out of or
            related to your use of (or inability to use) this website or reliance on its content.
          </p>
        </section>

        <section id="availability" className="disc-section">
          <h2>7. Availability &amp; uptime</h2>
          <p>
            We may suspend, withdraw, or change any part of the website without notice. We do not
            guarantee that the site will be uninterrupted, secure, or free from errors.
          </p>
        </section>

        <section id="security" className="disc-section">
          <h2>8. Security &amp; viruses</h2>
          <p>
            Although we use reasonable safeguards, we do not warrant that the website or downloads
            are free of viruses or other harmful components. You are responsible for implementing
            suitable anti-virus protection and backup procedures.
          </p>
        </section>

        <section id="testimonials" className="disc-section">
          <h2>9. Testimonials &amp; case studies</h2>
          <p>
            Any testimonials, reviews, or case studies represent individual experiences and do not
            guarantee similar results. Outcomes depend on many factors beyond our control.
          </p>
        </section>

        <section id="ip" className="disc-section">
          <h2>10. Intellectual property</h2>
          <p>
            Unless otherwise stated, all content on this site is the intellectual property of
            <strong> {company}</strong> or its licensors. You may not reproduce, distribute, adapt,
            or create derivative works without prior written permission, except as permitted by law
            (e.g., fair use).
          </p>
        </section>

        <section id="changes" className="disc-section">
          <h2>11. Changes to this notice</h2>
          <p>
            We may update this disclaimer from time to time to reflect legal, technical, or
            operational changes. The updated version will be posted here with the revised
            “Last updated” date.
          </p>
        </section>

        <section id="contact" className="disc-section">
          <h2>12. Contact</h2>
          <p>
            Questions about this disclaimer? Email <a href={`mailto:${email}`}>{email}</a> or call{" "}
            <strong>{phone}</strong>. Our primary operating region is {city}.
          </p>
          <p className="disc-note">
            This notice is for general information only and does not create any contractual or legal
            rights beyond those set out in our Terms &amp; Conditions or other agreements.
          </p>
        </section>
      </article>
    </section>
  );
};

export default Disclaimer;
