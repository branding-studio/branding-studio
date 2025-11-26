import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaShieldAlt, FaBug, FaServer, FaCloud, FaMobileAlt, FaSitemap,
  FaProjectDiagram, FaClipboardCheck, FaBalanceScale, FaHandshake,
  FaAngleRight, FaCheckCircle, FaLock, FaExclamationTriangle, FaTelegramPlane
} from "react-icons/fa";
import "./Eh.css";
import { useLocalContext } from "../../../context/LocalContext";

const Eh = () => {
  const navigate = useNavigate();
  const { openTelegram, getTelegramUrl, webinfo = {} } = useLocalContext();

  const services = [
    { icon: <FaBug />, title: "Web App Penetration Testing", copy: "Authorized testing of web applications for common and business-logic weaknesses.", bullets: ["OWASP Top 10 coverage", "Auth/Session review", "Logic & abuse cases"] },
    { icon: <FaSitemap />, title: "API Security Review", copy: "Assess REST/GraphQL APIs for authentication, rate limits, and data exposure.", bullets: ["Endpoint discovery", "Auth scopes & tokens", "Input/IDOR checks"] },
    { icon: <FaServer />, title: "Network & Infrastructure", copy: "External/Internal assessments of hosts and services to reduce attack surface.", bullets: ["Service exposure review", "Config hardening gaps", "Segmentation hints"] },
    { icon: <FaCloud />, title: "Cloud Posture Assessment", copy: "High-level review of AWS/Azure/GCP posture, identity, and storage exposure.", bullets: ["Identity & roles overview", "Storage policies scan", "Public surface map"] },
    { icon: <FaMobileAlt />, title: "Mobile App Review", copy: "Evaluate Android/iOS apps and API usage at a high level for common risks.", bullets: ["Traffic protections", "Sensitive data handling", "Store config review"] },
    { icon: <FaProjectDiagram />, title: "Red Team (Assume Breach)", copy: "Goal-oriented exercises to test detection & response under strict legal scope.", bullets: ["Rules of engagement", "Detection insights", "Executive debrief"] },
    { icon: <FaClipboardCheck />, title: "Secure SDLC & Threat Modeling", copy: "Bake security into delivery with lightweight models and developer-ready guidance.", bullets: ["Threat scenarios", "Abuser stories", "Release checklists"] },
    { icon: <FaHandshake />, title: "Bug Bounty Setup & Triage", copy: "Design bounty scope, intake, and triage to handle reports effectively.", bullets: ["Program scope & policy", "Triage workflow", "Researcher comms"] },
    { icon: <FaBalanceScale />, title: "Compliance Readiness", copy: "Prep evidence and controls for SOC 2/ISO 27001/PCI at a pragmatic level.", bullets: ["Gap overview", "Remediation plan", "Evidence pointers"] },
  ];

  const steps = [
    { t: "Scope", d: "Define systems, rules of engagement, and success metrics." },
    { t: "Legal", d: "Written authorization, NDA, and change freeze windows." },
    { t: "Assess", d: "Authorized testing within scope and agreed time windows." },
    { t: "Report", d: "Clear findings with severity, impact, and remediation advice." },
    { t: "Fix", d: "Support dev/ops with clarifications and retest criteria." },
    { t: "Retest", d: "Verify fixes and issue a closure summary." },
  ];

  const deliverables = [
    "Executive summary",
    "Technical findings report",
    "Reproduction steps",
    "Severity & risk matrix",
    "Remediation guidance",
    "Retest & closure note",
    "Backlog/Jira-ready items",
    "Walk-through call (optional)",
  ];

  const scopeZones = [
    { title: "Apps & Domains", inscope: ["Owned domains", "Staging mirror (safe data)", "Primary web app"], outscope: ["Third-party vendors", "Employee devices", "Phishing/social engineering"] },
    { title: "APIs", inscope: ["REST/GraphQL you own", "Sandbox keys provided", "Partner APIs with consent"], outscope: ["Rate-limit/DoS attacks", "3rd-party APIs w/o approval", "Prod data tampering"] },
    { title: "Cloud & Infra", inscope: ["Provided account(s)", "Public buckets/endpoints", "CIS baseline review"], outscope: ["Tenant escape attempts", "Crypto-mining tests", "Unapproved network scans"] },
    { title: "Network", inscope: ["Externally exposed hosts", "VPN test ranges (if approved)", "Config hardening review"], outscope: ["Physical intrusion", "DDoS", "Out-of-window scans"] },
  ];

  const methods = [
    "OWASP ASVS/Top 10 coverage",
    "Manual + tool-assisted testing",
    "Grey/Black-box per scope",
    "Evidence-driven findings",
  ];
  const tooling = [
    "Intercept proxies",
    "Service discovery",
    "Static/DAST (on request)",
    "Cloud posture checks",
    "CI retest scripts",
  ];

  const toc = [
    "1. Executive Summary",
    "2. Method & Scope",
    "3. Testing Windows & Constraints",
    "4. Findings (by severity)",
    "5. Risk & Impact",
    "6. Remediation Guidance",
    "7. Evidence & Repro Steps",
    "8. Retest Notes & Closure",
  ];

  /* ===== Sticky quick-nav (scrollspy) ===== */
  const sections = useMemo(
    () => [
      { id: "services", label: "Services" },
      { id: "process", label: "Process" },
      { id: "scope", label: "Scope" },
      { id: "methods", label: "Methods" },
      { id: "reporting", label: "Reporting" },
      { id: "deliver", label: "Deliverables" },
      { id: "cta", label: "Start" },
    ],
    []
  );
  const [active, setActive] = useState("services");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [sections]);

  const jump = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    if (typeof window !== "undefined" && window.history?.replaceState) {
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  // Safe href for right-click/copy; openTelegram handles app/web fallback on click.
  const telegramHref = getTelegramUrl?.({ preferApp: false }) || "https://t.me/";

  return (
    <main className="eh">
      {/* Sticky rail / quick-nav */}
      <aside className="eh__rail" aria-label="Page sections">
        <div className="rail__brand">
          <div className="rail__logo"><FaShieldAlt /></div>
          <div>
            <strong>Security Services</strong>
            <small>Authorized only</small>
          </div>
        </div>
        <ul className="rail__nav">
          {sections.map((s) => (
            <li key={s.id}>
              <button
                className={`rail__chip ${active === s.id ? "is-active" : ""}`}
                onClick={() => jump(s.id)}
                aria-current={active === s.id ? "page" : undefined}
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="ppc2-ctaRail">
          <a
            className="ppc2-btn ppctg"
            href={telegramHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              openTelegram?.(); // centralized handler from context
            }}
            aria-label={`Connect on Telegram${webinfo.telegramHandle ? ` @${webinfo.telegramHandle}` : ""}`}
          >
            <FaTelegramPlane />
            <span>Talk on Telegram</span>
          </a>
        </div>
      </aside>

      <div className="eh__main">
        {/* HERO */}
        <header className="eh__hero">
          <span className="eh__eyebrow">Security Services</span>
          <h1>Ethical Hacking & Offensive Security</h1>
          <p>
            Authorized, goal-driven assessments to harden your apps, APIs, cloud, and
            network—focused on clarity, safety, and real-world risk reduction.
          </p>

          <div className="eh__badges">
            <span><FaShieldAlt /> Authorized Only</span>
            <span><FaLock /> NDA & Confidential</span>
            <span><FaClipboardCheck /> PTES / OWASP Aligned</span>
            <span><FaCheckCircle /> Clear Remediation</span>
          </div>

          <button className="btn btn--primary" onClick={() => navigate("/contact")}>
            Talk to Security Team <FaAngleRight />
          </button>

          <div className="eh__legal">
            <strong>Legal note:</strong> All activities are performed <em>only</em> with
            written authorization under a signed SOW/MSA and defined scope.
          </div>
        </header>

        {/* SERVICES */}
        <section id="services" className="eh__grid">
          {services.map((s) => (
            <article className="eh__card" key={s.title}>
              <div className="eh__card-head">
                <div className="eh__icon">{s.icon}</div>
                <h2>{s.title}</h2>
              </div>
              <p className="eh__copy">{s.copy}</p>
              <ul className="eh__list">
                {s.bullets.map((b) => (
                  <li key={b}><FaCheckCircle /> {b}</li>
                ))}
              </ul>
              {/* <div className="eh__ribbon"><FaExclamationTriangle /> Safe, authorized testing only</div> */}
            </article>
          ))}
        </section>

        {/* PROCESS */}
        <section id="process" className="eh__process">
          <div className="eh__head">
            <h3>How engagements run</h3>
            <p>Crystal-clear steps that protect your systems and your team.</p>
          </div>
          <ol className="eh__steps">
            {steps.map((s, i) => (
              <li className="eh__step" key={s.t}>
                <span className="eh__num">{i + 1}</span>
                <div>
                  <h4>{s.t}</h4>
                  <p>{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* SCOPE & RULES */}
        <section id="scope" className="eh__scope">
          <div className="eh__head">
            <h3>Scope & Rules</h3>
            <p>What’s in and out—no surprises, no gray areas.</p>
          </div>
          <div className="scope-grid">
            {scopeZones.map((z) => (
              <article className="scope-card" key={z.title}>
                <h4>{z.title}</h4>
                <div className="scope-cols">
                  <div>
                    <strong>In-scope</strong>
                    <ul className="scope-list">
                      {z.inscope.map((i) => (
                        <li key={i}><FaCheckCircle /> {i}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <strong>Out-of-scope</strong>
                    <ul className="scope-list scope-list--out">
                      {z.outscope.map((o) => (
                        <li key={o}>⛔ {o}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* METHODS & TOOLING */}
        <section id="methods" className="eh__methods">
          <div className="eh__head">
            <h3>Methods & Tooling</h3>
            <p>Industry-aligned process with evidence-driven results.</p>
          </div>
          <div className="method-wrap">
            <div>
              <h4>Methods</h4>
              <ul className="eh__chips">
                {methods.map((m) => <li className="eh__chip" key={m}>{m}</li>)}
              </ul>
            </div>
            <div>
              <h4>Tooling (high-level)</h4>
              <ul className="eh__chips">
                {tooling.map((t) => <li className="eh__chip" key={t}>{t}</li>)}
              </ul>
            </div>
          </div>
          <p className="eh__note">
            We never perform destructive testing (e.g., DoS). Activities are strictly within written authorization.
          </p>
        </section>

        {/* REPORTING & EVIDENCE */}
        <section id="reporting" className="eh__reporting">
          <div className="eh__head">
            <h3>Reporting & Evidence</h3>
            <p>Clear summaries for leadership and actionable detail for engineers.</p>
          </div>
          <ul className="toc">
            {toc.map((x) => <li key={x}>{x}</li>)}
          </ul>
          <div className="eh__cta">
            <button className="btn btn--primary" onClick={() => navigate("/contact")}>
              Request sample report <FaAngleRight />
            </button>
          </div>
        </section>

        {/* DELIVERABLES */}
        <section id="deliver" className="eh__deliver">
          <div className="eh__head">
            <h3>What you get</h3>
            <p>Everything you need to fix fast and prove closure.</p>
          </div>
          <ul className="eh__list eh__list--cards">
            {deliverables.map((d) => <li key={d}><FaCheckCircle /> {d}</li>)}
          </ul>
        </section>

        {/* FINAL CTA */}
        <section id="cta" className="eh__cta-bar">
          <div className="eh__cta-inner">
            <div className="eh__cta-copy">
              <h3>Ready to run an authorized assessment?</h3>
              <p>Share your scope and windows—get a safe, clear plan and timeline.</p>
            </div>
            <button className="btn btn--primary" onClick={() => navigate("/contact")}>
              Start an Authorized Engagement <FaAngleRight />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Eh;
