import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBuilding, FaPlane, FaTicketAlt, FaHome,
  FaGoogle, FaMicrosoft, FaFacebook, FaLinkedin, FaTwitter, FaYoutube,
  FaCheckCircle, FaTelegramPlane
} from "react-icons/fa";
import "./Ppc.css";
import { useLocalContext } from "../../../context/LocalContext";

const slugify = (s) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const Ppc = () => {
  const navigate = useNavigate();
  const { openTelegram, getTelegramUrl } = useLocalContext();

  const [active, setActive] = useState(null);     // for pill highlight
  const [current, setCurrent] = useState(null);   // which group to render

  // ====== DATA ======
  const groups = useMemo(
    () => [
      {
        title: "Tech & Finance",
        icon: <FaBuilding />,
        blurb:
          "Performance-focused PPC for finance and tech — compliant copy, high-intent keywords, conversion-first landers.",
        subs: [
          { name: "Printer Support", desc: "Intent-led search ads for printer support & drivers.", path: "/services/printer" },
          { name: "Antivirus", desc: "Acquisition & renewals; brand-safe copy banks.", path: "/services/antivirus" },
          { name: "Router Support", desc: "Troubleshooting & setup leads with call-only variants.", path: "/services/router" },
          { name: "Brokerage & Investing", desc: "Complex-compliant funnels for demat & broker signups.", path: "/services/brokerage" },
        ],
      },
      {
        title: "Travel",
        icon: <FaPlane />,
        blurb:
          "Search, Display, and PMAX for high-ROAS travel funnels — from discovery to checkout.",
        subs: [
          { name: "Car Rental", desc: "City/airport clusters with dynamic ads.", path: "/services/car-rental" },
          { name: "Train Booking", desc: "Query mining & schedule intent.", path: "/services/train" },
          { name: "Bus Booking", desc: "Route clusters with dayparting.", path: "/services/bus" },
          { name: "Hotel Booking", desc: "Geo × star-rating segmentation.", path: "/services/hotel" },
          { name: "Holiday Packages", desc: "Lead forms + WhatsApp handoff.", path: "/services/holiday" },
          { name: "Mixed Flights", desc: "PMAX + branded defense strategy.", path: "/services/flights" },
          { name: "Cruise Booking", desc: "Affinity + in-market audiences.", path: "/services/cruise" },
        ],
      },
      {
        title: "Events",
        icon: <FaTicketAlt />,
        blurb:
          "Hyper-local and national event campaigns — structured ad groups, real-time budgets, precise audiences.",
        subs: [{ name: "Ticketing", desc: "Local demand capture & remarketing.", path: "/services/ticketing" }],
      },
      {
        title: "Real Estate",
        icon: <FaHome />,
        blurb:
          "Buyer & seller lead gen with pre-qualification flows and CRM-ready integrations.",
        subs: [{ name: "Real Estate Leads", desc: "SQFT, budget & locality filters.", path: "/services/real-estate" }],
      },
    ],
    []
  );

  const networks = [
    { icon: <FaGoogle />, label: "Google Ads" },
    { icon: <FaMicrosoft />, label: "Microsoft Ads" },
    { icon: <FaFacebook />, label: "Meta (FB/IG)" },
    { icon: <FaLinkedin />, label: "LinkedIn" },
    { icon: <FaTwitter />, label: "Twitter/X" },
    { icon: <FaYoutube />, label: "YouTube" },
  ];

  const deliverables = [
    "Account & campaign structure",
    "Keyword + negatives strategy",
    "Ad copy & asset variants",
    "GA4/GTM conversion tracking",
    "Landing page recommendations",
    "Budget pacing & weekly guardrails",
    "Monthly insights & next tests",
  ];

  const steps = [
    { t: "Discover", d: "Goals, audiences, baselines, and constraints." },
    { t: "Plan", d: "Structure, keywords, ads, and measurement plan." },
    { t: "Build", d: "Campaigns, tracking, and landing experiences." },
    { t: "Launch", d: "QA, budgets, and first-week pacing." },
    { t: "Optimize", d: "Queries, bids, creative, and LTV signals." },
    { t: "Scale", d: "Expand high-ROAS segments & test new bets." },
  ];

  /* ===== Pricing & Engagement ===== */
  const pricing = {
    setupLabel: "Setup + Domain + Hosting + Website",
    setupPrice: "₹50,000",
    mgmtFee: "20% of campaign billing",
  };

  const fromYourSide = [
    "Fresh toll-free number",
    "Fresh billing details",
    "PAN card",
    "Credit card",
    "Aadhaar card",
  ];

  const engagementNotes = [
    "20-day campaign setup guarantee*",
    "Campaign creation & management only (no outbound sales calling)",
    "24/7 live support",
  ];

  // ====== Single-section routing (hash-aware) ======
  const ids = useMemo(() => groups.map((g) => slugify(g.title)), [groups]);

  // Initialize current to hash (if valid) else first group ("Tech & Finance")
  useEffect(() => {
    if (!ids.length || typeof window === "undefined") return;
    const hash = decodeURIComponent(window.location.hash.replace("#", ""));
    const first = ids[0];
    const initial = ids.includes(hash) ? hash : first;
    setCurrent(initial);
    setActive(initial);
  }, [ids]);

  // Listen to manual hash changes (e.g., back/forward)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onHash = () => {
      const h = decodeURIComponent(window.location.hash.replace("#", ""));
      if (ids.includes(h)) {
        setCurrent(h);
        setActive(h);
        // optional scroll to nav for better context
        const nav = document.querySelector(".ppc2-centerNav");
        if (nav) nav.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [ids]);

  const changeSection = (id) => {
    setCurrent(id);
    setActive(id);
    if (typeof window !== "undefined") {
      if (window.history?.replaceState) {
        window.history.replaceState(null, "", `#${id}`);
      } else {
        window.location.hash = id;
      }
      const nav = document.querySelector(".ppc2-centerNav");
      if (nav) nav.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const currentGroup = useMemo(
    () => groups.find((g) => slugify(g.title) === current),
    [groups, current]
  );

  // Centralized Telegram URL for right-click/copy; openTelegram handles the click
  const telegramHref = getTelegramUrl?.({ preferApp: false }) || "https://t.me/";

  // ====== RENDER ======
  return (
    <div className="ppc2-shell">
      {/* Decorative background */}
      <div aria-hidden className="ppc2-backdrop" />

      <main className="ppc2-main">
        {/* Hero */}
        <header className="ppc2-hero">
          <div className="ppc2-heroBadge">PPC & Lead Gen</div>
          <h1>Scale high-intent leads with creative + data</h1>
          <p>
            A conversion-first PPC stack for complex categories. Clean structure, resilient tracking,
            and experiments that actually move revenue.
          </p>

          <div className="ppc2-stats">
            <div className="ppc2-stat">
              <span className="ppc2-statNum">30–60%</span>
              <span className="ppc2-statLbl">lower CPL in 6–8 weeks*</span>
            </div>
            <div className="ppc2-stat">
              <span className="ppc2-statNum">100%+</span>
              <span className="ppc2-statLbl">tracking coverage (GA4 + GTM)</span>
            </div>
            <div className="ppc2-stat">
              <span className="ppc2-statNum">Weekly</span>
              <span className="ppc2-statLbl">guardrails & pacing</span>
            </div>
          </div>
        </header>

        {/* Centered NAV (tabs) */}
        <nav className="ppc2-centerNav" aria-label="Sections" role="tablist">
          <ul className="ppc2-centerNavList">
            {groups.map((g) => {
              const id = slugify(g.title);
              const isActive = active === id;
              return (
                <li key={id}>
                  <button
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={id}
                    id={`${id}-tab`}
                    className={`ppc2-centerNavItem ${isActive ? "is-active" : ""}`}
                    onClick={() => changeSection(id)}
                  >
                    <i className="ppc2-centerNavIco" aria-hidden>{g.icon}</i>
                    <span>{g.title}</span>
                    <span className="ppc2-dot" aria-hidden />
                  </button>
                </li>
              );
            })}
          </ul>

          <a
            className="ppc2-btn ppctg ppc2-centerNavCta"
            href={telegramHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              openTelegram?.();
            }}
            aria-label="Connect on Telegram"
          >
            <FaTelegramPlane />
            <span>Talk on Telegram</span>
          </a>
        </nav>

        {/* Render ONLY the current group */}
        {currentGroup && (
          <section
            id={slugify(currentGroup.title)}
            role="tabpanel"
            aria-labelledby={`${slugify(currentGroup.title)}-tab`}
            className="ppc2-section ppc2-section--alt"
          >
            <div className="ppc2-sechead">
              <div className="ppc2-ico" aria-hidden>{currentGroup.icon}</div>
              <div>
                <h2>{currentGroup.title}</h2>
                <p>{currentGroup.blurb}</p>
              </div>
            </div>

            <div className="ppc2-grid">
              {currentGroup.subs.map((s) => (
                <article key={s.name} className="ppc2-card">
                  <div className="ppc2-cardGlow" aria-hidden />
                  <header className="ppc2-cardHead">
                    <h3>{s.name}</h3>
                  </header>
                  <p className="ppc2-cardText">{s.desc}</p>
                  <div className="ppc2-actions">
                    <a
                      className="ppc2-btn ppctone"
                      href={telegramHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.preventDefault();
                        openTelegram?.();
                      }}
                      aria-label={`Connect on Telegram about ${s.name}`}
                    >
                      <FaTelegramPlane />
                      <span>Connect</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Networks */}
        <section className="ppc2-slab">
          <div className="ppc2-slabHead">
            <h3>Networks we run</h3>
            <p>Right channel, right format — measured against your revenue goals.</p>
          </div>
          <ul className="ppc2-chips">
            {networks.map((n) => (
              <li key={n.label} className="ppc2-chip">
                <i aria-hidden>{n.icon}</i> {n.label}
              </li>
            ))}
          </ul>
        </section>

        {/* Deliverables */}
        <section className="ppc2-slab">
          <div className="ppc2-slabHead">
            <h3>What you get</h3>
            <p>Clear, actionable output that drives results and accountability.</p>
          </div>
          <ul className="ppc2-list">
            {deliverables.map((d) => (
              <li key={d}>
                <FaCheckCircle /> <span>{d}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Process */}
        <section className="ppc2-steps">
          <div className="ppc2-slabHead">
            <h3>How we work</h3>
            <p>Transparent steps from discovery to scale.</p>
          </div>
          <ol className="ppc2-stepsGrid">
            {steps.map((s, i) => (
              <li key={s.t} className="ppc2-stepCard">
                <span className="ppc2-stepNum">{i + 1}</span>
                <div>
                  <h4>{s.t}</h4>
                  <p>{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Pricing & Engagement */}
        <section id="plan-terms" className="ppc2-pricing">
          <div className="ppc2-slabHead">
            <h3>Pricing & Engagement</h3>
            <p>Transparent setup, clear management fee, and what we’ll need to get you live.</p>
          </div>

          <div className="ppc2-pricingGrid">
            {/* Price card */}
            <article className="ppc2-priceCard">
              <header className="ppc2-priceHead">
                <h4>Plan</h4>
              </header>

              <ul className="ppc2-list ppc2-list--tight">
                <li>
                  <FaCheckCircle />
                  <span>
                    {pricing.setupLabel} — <strong className="ppc2-price">{pricing.setupPrice}</strong>
                  </span>
                </li>
                <li>
                  <FaCheckCircle />
                  <span>Management fee — <strong className="ppc2-fee">{pricing.mgmtFee}</strong></span>
                </li>
                <li>
                  <FaCheckCircle />
                  <span>Structured build: account, campaigns, tracking, and landers</span>
                </li>
              </ul>
            </article>

            {/* From your side */}
            <article className="ppc2-termsCard">
              <header className="ppc2-priceHead">
                <h4>From your side</h4>
              </header>
              <ul className="ppc2-list">
                {fromYourSide.map((x) => (
                  <li key={x}>
                    <FaCheckCircle />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </article>

            {/* Notes */}
            <article className="ppc2-termsCard">
              <header className="ppc2-priceHead">
                <h4>Engagement notes</h4>
              </header>
              <ul className="ppc2-list">
                {engagementNotes.map((x) => (
                  <li key={x}>
                    <FaCheckCircle />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
              <p className="ppc2-footnote">
                * The 20-day guarantee refers to the <strong>campaign setup & launch timeline</strong> once required
                assets and access are received. It’s not a guarantee of specific CPL/ROAS outcomes.
              </p>
            </article>
          </div>

          <div className="ppc2-pricingCTA">
            <a
              className="ppc2-btn ppcprime"
              href={telegramHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                openTelegram?.();
              }}
              aria-label="Discuss pricing & terms on Telegram"
            >
              <FaTelegramPlane />
              <span>Discuss details</span>
            </a>
          </div>
        </section>

        {/* Bottom Callout */}
        <section className="ppc2-banner">
          <div className="ppc2-bannerIn">
            <div className="ppc2-bannerText">
              <h3>Let’s plan your PPC funnel</h3>
              <p>Share the vertical, target geos and lead goals — we’ll propose the plan.</p>
            </div>
            <a
              className="ppc2-btn ppcprime"
              href={telegramHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                openTelegram?.();
              }}
              aria-label="Connect now on Telegram with a PPC Strategist"
            >
              <FaTelegramPlane />
              <span>Connect now</span>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Ppc;
