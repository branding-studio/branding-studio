import React from "react";
import "./PrivacyPolicy.css";
import { useLocalContext } from "../../context/LocalContext";

const PrivacyPolicy = () => {
  const { webinfo = {} } = useLocalContext();

  const company = webinfo.name || "Our Company";
  const email = webinfo.email || "hello@example.com";
  const phone = webinfo.phone || "—";
  const city = webinfo.addressCity || "your operating region";

  return (
    <section className="privacy" role="main">
      {/* Header */}
      <header className="privacy-header">
        <p className="privacy-kicker">Legal</p>
        <h1 className="privacy-title">Privacy Policy</h1>
        <p className="privacy-sub">
          Your privacy matters. This policy explains what we collect, how we use it, and the
          choices you have. By using our website or services, you agree to this policy.
        </p>
        <p className="privacy-meta">Last updated: 31 Aug 2025</p>
      </header>

      {/* Grid: TOC + Body */}
      <div className="privacy-grid">
        {/* Sticky table of contents */}
        <aside className="privacy-aside" aria-label="Table of contents">
          <nav className="privacy-card privacy-toc">
            <h3>On this page</h3>
            <ol>
              <li><a href="#intro">Introduction</a></li>
              <li><a href="#who">Who we are</a></li>
              <li><a href="#data-we-collect">Data we collect</a></li>
              <li><a href="#lawful-bases">Lawful bases</a></li>
              <li><a href="#how-we-use">How we use data</a></li>
              <li><a href="#cookies">Cookies &amp; tracking</a></li>
              <li><a href="#analytics-ads">Analytics &amp; ads</a></li>
              <li><a href="#sharing">Sharing &amp; transfers</a></li>
              <li><a href="#retention">Data retention</a></li>
              <li><a href="#security">Security</a></li>
              <li><a href="#rights">Your rights</a></li>
              <li><a href="#children">Children’s privacy</a></li>
              <li><a href="#changes">Changes to this policy</a></li>
              <li><a href="#contact">Contact</a></li>
            </ol>
          </nav>
        </aside>

        {/* Main content */}
        <article className="privacy-content">
          <div className="privacy-card">
            <section id="intro" className="privacy-section">
              <h2>1. Introduction</h2>
              <p>
                At <strong>{company}</strong>, we respect your privacy. This Privacy Policy
                describes how we collect, use, disclose, and safeguard your information when
                you use our website, products, or professional services (“<em>Services</em>”).
                If you do not agree with this policy, please do not use the Services.
              </p>
              <div className="privacy-callout">
                <strong>Note:</strong> This summary is for transparency and does not replace
                any specific agreement (proposal/SOW) you sign with us.
              </div>
            </section>

            <section id="who" className="privacy-section">
              <h2>2. Who we are</h2>
              <p>
                <strong>Data Controller:</strong> {company}. We primarily operate in {city}.
                You can reach us at <a href={`mailto:${email}`}>{email}</a> or {phone}.
              </p>
            </section>

            <section id="data-we-collect" className="privacy-section">
              <h2>3. Data we collect</h2>
              <h3>3.1 Information you provide</h3>
              <ul>
                <li><strong>Contact details</strong> (e.g., name, email, phone).</li>
                <li><strong>Business context</strong> (project brief, requirements, content).</li>
                <li><strong>Billing</strong> (handled by payment providers; limited data on our side).</li>
                <li><strong>Support communications</strong> (messages, attachments).</li>
              </ul>
              <h3>3.2 Automatic information</h3>
              <ul>
                <li><strong>Usage</strong> (pages viewed, referring URLs, features used).</li>
                <li><strong>Device &amp; tech</strong> (IP address, browser/OS, screen size).</li>
                <li><strong>Cookies/local storage</strong> for preferences, analytics, and security.</li>
              </ul>
              <h3>3.3 From third parties</h3>
              <ul>
                <li>Service partners (e.g., hosting, analytics, payment, CRM tools).</li>
                <li>Public sources where you have made business info available.</li>
              </ul>
            </section>

            <section id="lawful-bases" className="privacy-section">
              <h2>4. Lawful bases</h2>
              <p>Depending on your location and the activity, we process data under:</p>
              <ul>
                <li><strong>Consent</strong> (e.g., newsletters, optional cookies).</li>
                <li><strong>Contract</strong> (to deliver Services you request).</li>
                <li><strong>Legitimate interests</strong> (security, product improvement, limited direct B2B communications).</li>
                <li><strong>Legal obligation</strong> (tax, fraud prevention, compliance).</li>
              </ul>
            </section>

            <section id="how-we-use" className="privacy-section">
              <h2>5. How we use data</h2>
              <ul>
                <li>To provide, maintain, and improve the Services.</li>
                <li>To respond to inquiries and deliver support.</li>
                <li>To personalize content and measure performance.</li>
                <li>To send service updates or marketing with your consent (you can opt out).</li>
                <li>To protect against fraud, abuse, or violations of our Terms.</li>
              </ul>
            </section>

            <section id="cookies" className="privacy-section">
              <h2>6. Cookies &amp; tracking</h2>
              <p>
                We use cookies and similar technologies (e.g., local storage) for core
                functionality, analytics, and remembering preferences. You can control cookies
                via your browser settings; functionality may be affected if disabled.
              </p>
            </section>

            <section id="analytics-ads" className="privacy-section">
              <h2>7. Analytics &amp; advertising</h2>
              <p>
                We may use privacy-aware analytics to understand usage and improve the
                experience. If we run ads or remarketing, identifiers may be used as permitted
                by your consent and applicable law. Where required, we honor “Do Not Track”
                preferences and consent choices to the extent supported by our tools.
              </p>
            </section>

            <section id="sharing" className="privacy-section">
              <h2>8. Sharing &amp; international transfers</h2>
              <ul>
                <li><strong>We don’t sell personal data.</strong></li>
                <li>We share data with vetted vendors who help operate the Services (e.g., hosting, email, payments, analytics) under confidentiality and data protection commitments.</li>
                <li>Data may be processed outside your country. Where applicable, we use legally recognized safeguards for transfers.</li>
              </ul>
            </section>

            <section id="retention" className="privacy-section">
              <h2>9. Data retention</h2>
              <p>
                We retain personal data only as long as necessary to deliver the Services,
                meet legal obligations, resolve disputes, and enforce agreements. Retention
                periods vary by data type and context.
              </p>
            </section>

            <section id="security" className="privacy-section">
              <h2>10. Security</h2>
              <p>
                We use reasonable administrative, technical, and organizational safeguards
                (e.g., HTTPS, access controls). However, no method of transmission or storage
                is 100% secure; you use the Services at your own risk.
              </p>
            </section>

            <section id="rights" className="privacy-section">
              <h2>11. Your rights</h2>
              <p>
                Your rights depend on your jurisdiction. Subject to verification and
                exceptions, you may have the right to:
              </p>
              <ul>
                <li>Access, correct, or delete your personal data.</li>
                <li>Object to or restrict certain processing.</li>
                <li>Withdraw consent where processing is based on consent.</li>
                <li>Portability of data you provided, in a usable format.</li>
                <li>Complain to a data protection authority or designated grievance officer.</li>
              </ul>
              <p>
                To exercise rights, contact <a href={`mailto:${email}`}>{email}</a>. We may
                request information to verify your identity and respond within a reasonable
                period as required by applicable law (e.g., India’s DPDP Act, GDPR).
              </p>
            </section>

            <section id="children" className="privacy-section">
              <h2>12. Children’s privacy</h2>
              <p>
                Our Services are not directed to individuals under 16. We do not knowingly
                collect personal data from children. If you believe a child provided us
                personal data, contact us to request deletion.
              </p>
            </section>

            <section id="changes" className="privacy-section">
              <h2>13. Changes to this policy</h2>
              <p>
                We may update this policy to reflect operational or legal changes. We’ll post
                the new version here and update the “Last updated” date. Significant changes
                may be communicated through additional notice.
              </p>
            </section>

            <section id="contact" className="privacy-section">
              <h2>14. Contact</h2>
              <p>
                Questions about this Privacy Policy? Email{" "}
                <a href={`mailto:${email}`}>{email}</a> or call <strong>{phone}</strong>.
              </p>
              <p className="privacy-disclaimer">
                This policy is provided for general informational purposes and does not
                constitute legal advice.
              </p>
            </section>
          </div>
        </article>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
