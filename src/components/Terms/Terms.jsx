import React from "react";
import "./Terms.css";
import { useLocalContext } from "../../context/LocalContext";

const Terms = () => {
  const { webinfo = {} } = useLocalContext();

  const company = webinfo.name || "Our Company";
  const email = webinfo.email || "hello@example.com";
  const phone = webinfo.phone || "—";
  const city = webinfo.addressCity || "your operating region";

  return (
    <section className="terms" role="main">
      {/* Header */}
      <header className="terms-header">
        <p className="terms-kicker">Legal</p>
        <h1 className="terms-title">Terms &amp; Conditions</h1>
        <p className="terms-sub">
          Please read these Terms &amp; Conditions carefully. By accessing or using our
          website, products, or services, you agree to be bound by these terms.
        </p>
      </header>

      {/* Content Grid: TOC + Body */}
      <div className="terms-grid">
        {/* Sticky TOC on desktop */}
        <aside className="terms-aside" aria-label="Table of contents">
          <nav className="terms-card terms-toc">
            <h3>On this page</h3>
            <ol>
              <li><a href="#intro">Introduction</a></li>
              <li><a href="#definitions">Definitions</a></li>
              <li><a href="#acceptance">Acceptance &amp; Eligibility</a></li>
              <li><a href="#services">Scope of Services</a></li>
              <li><a href="#fees">Fees, Taxes &amp; Invoicing</a></li>
              <li><a href="#scope-changes">Scope Changes</a></li>
              <li><a href="#client-resp">Client Responsibilities</a></li>
              <li><a href="#ip">Intellectual Property</a></li>
              <li><a href="#third-party">Third-Party &amp; Open Source</a></li>
              <li><a href="#confidentiality">Confidentiality &amp; Data</a></li>
              <li><a href="#warranty">Warranties &amp; Disclaimers</a></li>
              <li><a href="#liability">Limitation of Liability</a></li>
              <li><a href="#indemnity">Indemnification</a></li>
              <li><a href="#termination">Term, Suspension &amp; Termination</a></li>
              <li><a href="#force-majeure">Force Majeure</a></li>
              <li><a href="#publicity">Publicity &amp; Non-Solicitation</a></li>
              <li><a href="#law">Governing Law &amp; Disputes</a></li>
              <li><a href="#notices">Notices</a></li>
              <li><a href="#misc">Miscellaneous</a></li>
              <li><a href="#contact">Contact</a></li>
            </ol>
          </nav>
        </aside>

        {/* Main body */}
        <article className="terms-content">
          <div className="terms-card">
            <section id="intro" className="terms-section">
              <h2>1. Introduction</h2>
              <p>
                Welcome to <strong>{company}</strong>. These Terms &amp; Conditions
                (“<em>Terms</em>”) govern your access to and use of our website, products,
                and professional services (collectively, the “<em>Services</em>”). By using
                the Services, you agree to these Terms and any documents referenced here.
              </p>
            </section>

            <section id="definitions" className="terms-section">
              <h2>2. Definitions</h2>
              <ul>
                <li><strong>“Client”</strong> means the individual or entity procuring the Services.</li>
                <li><strong>“Deliverables”</strong> means work product we provide under an order, proposal, or statement of work (“SOW”).</li>
                <li><strong>“Pre-Existing IP”</strong> means materials, know-how, code, or tools owned or controlled by a party before the engagement or developed independently of it.</li>
                <li><strong>“Agreement”</strong> means these Terms together with any SOW, proposal, or order referencing them.</li>
              </ul>
            </section>

            <section id="acceptance" className="terms-section">
              <h2>3. Acceptance &amp; Eligibility</h2>
              <p>
                You must be at least 18 years old and have the authority to bind the Client to
                this Agreement. If you access the Services on behalf of an organization, you
                represent that you are authorized to accept these Terms for that organization.
              </p>
            </section>

            <section id="services" className="terms-section">
              <h2>4. Scope of Services</h2>
              <p>
                We provide consulting, design, branding, marketing, web/app development, and
                automation Services. Specific scope, milestones, assumptions, timelines, and
                acceptance criteria will be set out in a signed SOW or proposal.
              </p>
              <div className="terms-callout">
                <strong>Note:</strong> Any discovery, audits, or prototypes are
                non-binding and informational unless explicitly stated as Deliverables.
              </div>
            </section>

            <section id="fees" className="terms-section">
              <h2>5. Fees, Taxes &amp; Invoicing</h2>
              <ul>
                <li><strong>Fees.</strong> Fees are as stated in the applicable SOW/proposal. Unless otherwise stated, expenses (e.g., stock assets, licenses, travel) are billable.</li>
                <li><strong>Taxes.</strong> Fees are exclusive of applicable taxes which the Client shall bear.</li>
                <li><strong>Invoicing &amp; Payment.</strong> Invoices are due as specified in the SOW (default Net-7). Late amounts may incur interest at 1.5% per month (or the maximum permitted by law) and may result in suspension of Services.</li>
                <li><strong>Currency.</strong> Unless stated, all amounts are in INR.</li>
              </ul>
            </section>

            <section id="scope-changes" className="terms-section">
              <h2>6. Scope Changes</h2>
              <p>
                Work outside the agreed scope requires a written change order that may adjust
                price, timeline, and Deliverables. We will not commence out-of-scope work
                without Client’s written approval.
              </p>
            </section>

            <section id="client-resp" className="terms-section">
              <h2>7. Client Responsibilities</h2>
              <ul>
                <li>Provide timely feedback, approvals, access, and accurate information.</li>
                <li>Ensure content, data, and materials supplied by Client do not infringe third-party rights and comply with applicable law.</li>
                <li>Acknowledge that delays in inputs or approvals may extend timelines.</li>
              </ul>
            </section>

            <section id="ip" className="terms-section">
              <h2>8. Intellectual Property</h2>
              <ul>
                <li><strong>Ownership of Deliverables.</strong> Subject to full and final payment, the Client owns the final Deliverables expressly listed in the SOW, excluding our Pre-Existing IP and third-party components.</li>
                <li><strong>License to Pre-Existing IP.</strong> To the extent our Pre-Existing IP is embedded in Deliverables, we grant Client a non-exclusive, worldwide, royalty-free license to use it solely as part of the Deliverables.</li>
                <li><strong>Portfolio Rights.</strong> Unless the SOW states otherwise, <strong>{company}</strong> may reference non-confidential Deliverables in portfolios and case studies.</li>
              </ul>
            </section>

            <section id="third-party" className="terms-section">
              <h2>9. Third-Party Services &amp; Open Source</h2>
              <p>
                The Services may rely on third-party platforms, APIs, libraries, hosting, or
                open-source software. Such components are subject to their own terms; Client is
                responsible for relevant accounts, fees, and compliance. We are not liable for
                outages or changes by third parties.
              </p>
            </section>

            <section id="confidentiality" className="terms-section">
              <h2>10. Confidentiality &amp; Data Protection</h2>
              <ul>
                <li>Each party will protect the other’s confidential information with reasonable care and use it only for performing this Agreement.</li>
                <li>We implement commercially reasonable administrative, technical, and physical safeguards for Client data we process.</li>
                <li>We may disclose confidential information if required by law, after giving notice where legally permitted.</li>
              </ul>
            </section>

            <section id="warranty" className="terms-section">
              <h2>11. Warranties &amp; Disclaimers</h2>
              <ul>
                <li>We warrant that we will perform the Services in a professional and workmanlike manner.</li>
                <li>
                  Except as expressly stated, the Services and Deliverables are provided
                  “as-is” without warranties of merchantability, fitness for a particular
                  purpose, or non-infringement. We do not guarantee specific business outcomes
                  (e.g., rankings, traffic, revenue).
                </li>
              </ul>
            </section>

            <section id="liability" className="terms-section">
              <h2>12. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, neither party will be liable for any
                indirect, incidental, special, consequential, or punitive damages, or loss of
                profits, revenues, or data. Our aggregate liability under this Agreement shall
                not exceed the fees paid by Client for the specific Service giving rise to the
                claim in the 3 months preceding the event.
              </p>
            </section>

            <section id="indemnity" className="terms-section">
              <h2>13. Indemnification</h2>
              <p>
                Each party will defend and indemnify the other against third-party claims
                arising from (a) materials supplied by that party infringing third-party
                rights; or (b) violation of law or these Terms by that party, subject to prompt
                notice and reasonable cooperation.
              </p>
            </section>

            <section id="termination" className="terms-section">
              <h2>14. Term, Suspension &amp; Termination</h2>
              <ul>
                <li>These Terms apply from the date you first use the Services and continue until terminated.</li>
                <li>Either party may terminate an SOW for convenience with written notice as specified in the SOW.</li>
                <li>We may suspend or terminate for material breach, unlawful use, or non-payment after notice and an opportunity to cure (where applicable).</li>
                <li>Upon termination, Client shall pay for all work performed and committed costs through the effective termination date.</li>
              </ul>
            </section>

            <section id="force-majeure" className="terms-section">
              <h2>15. Force Majeure</h2>
              <p>
                Neither party is liable for delays or failures caused by events beyond
                reasonable control (e.g., acts of God, internet/hosting outages, governmental
                action, labor disputes).
              </p>
            </section>

            <section id="publicity" className="terms-section">
              <h2>16. Publicity &amp; Non-Solicitation</h2>
              <ul>
                <li>Unless restricted in an SOW, we may list Client name and logo in a customer list or portfolio.</li>
                <li>For 12 months after an engagement, neither party will solicit to hire the other’s personnel who directly worked on the engagement, except via general public recruitment.</li>
              </ul>
            </section>

            <section id="law" className="terms-section">
              <h2>17. Governing Law &amp; Dispute Resolution</h2>
              <p>
                These Terms are governed by the laws of India. Courts having jurisdiction in
                {` ${city} `}shall have exclusive jurisdiction, subject to any mandatory arbitration
                or mediation requirements that may be agreed in an SOW.
              </p>
            </section>

            <section id="notices" className="terms-section">
              <h2>18. Notices</h2>
              <p>
                Formal notices must be sent by email to <strong>{email}</strong> and are
                deemed given when received (or the next business day, if sent after business
                hours). Operational communications may occur via project tools.
              </p>
            </section>

            <section id="misc" className="terms-section">
              <h2>19. Miscellaneous</h2>
              <ul>
                <li><strong>Entire Agreement.</strong> These Terms and the applicable SOW(s) constitute the entire agreement and supersede prior discussions.</li>
                <li><strong>Severability.</strong> If any provision is unenforceable, the remainder remains in effect.</li>
                <li><strong>Assignment.</strong> Neither party may assign without the other’s consent, except to an affiliate or in a merger/acquisition.</li>
                <li><strong>No Waiver.</strong> Failure to enforce a provision is not a waiver.</li>
              </ul>
            </section>

            <section id="contact" className="terms-section">
              <h2>20. Contact</h2>
              <p>
                Questions about these Terms? Write to <strong>{email}</strong> or call{" "}
                <strong>{phone}</strong>. We’re happy to help.
              </p>
            </section>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Terms;
