import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch, FaCode, FaSitemap, FaBolt, FaMapMarkerAlt, FaGlobe,
  FaShoppingCart, FaChartLine, FaExchangeAlt, FaFileAlt, FaTelegramPlane,
  FaAngleRight, FaCheckCircle
} from "react-icons/fa";
import "./Seo.css";
import { useLocalContext } from "../../../context/LocalContext";

const Seo = () => {
  const navigate = useNavigate();
  const { openTelegram, getTelegramUrl } = useLocalContext();

  /** ===== Services ===== */
  const services = [
    { icon: <FaFileAlt/>, title: "SEO Audit", copy: "A full technical + content audit: indexation, speed, on-page, internal links, and search demand.", bullets: ["Crawl & index review", "CWV + speed checks", "Quick-win roadmap"] },
    { icon: <FaCode/>, title: "Technical SEO", copy: "Fix the foundations: clean HTML, structured data, canonical/robots rules, and scalable templates.", bullets: ["Schema & metadata", "Sitemaps/robots", "Canonical/redirect logic"] },
    { icon: <FaSearch/>, title: "On-Page SEO", copy: "Intent-matched pages with strong internal linking, headings, and content that actually answers queries.", bullets: ["Keyword mapping", "Title/H1 templates", "Internal link hubs"] },
    { icon: <FaBolt/>, title: "Core Web Vitals", copy: "Performance tuning to pass LCP/CLS/INP using image optimization, code splitting, and caching.", bullets: ["Image/CDN optimization", "Script hygiene", "Vitals monitoring"] },
    { icon: <FaMapMarkerAlt/>, title: "Local SEO", copy: "Own the map pack: GBP optimization, citations, local pages, and review strategy.", bullets: ["GBP setup & posts", "NAP/citations", "Location pages"] },
    { icon: <FaShoppingCart/>, title: "E-commerce SEO", copy: "Product/category growth with filters, canonicalization, and product schema for rich results.", bullets: ["PLP/PDP templates", "Facet controls", "Product schema"] },
    { icon: <FaGlobe/>, title: "International SEO", copy: "Expand globally with the right site structure, language tags, and geo targeting.", bullets: ["Hreflang strategy", "ccTLD/subfolder plan", "Geo rules"] },
    { icon: <FaSitemap/>, title: "Site Architecture", copy: "Design a scalable structure that spreads link equity and makes discovery effortless.", bullets: ["Topic clusters", "Breadcrumbs", "Hub & spoke"] },
    { icon: <FaChartLine/>, title: "Measurement & Reporting", copy: "Clarity on what’s working: GA4 + GSC dashboards, goals, and cohort views.", bullets: ["GA4/GSC setup", "Goal tracking", "Monthly insights"] },
    { icon: <FaExchangeAlt/>, title: "Migrations", copy: "Safely move platforms or URLs with redirect maps and parity checks to protect traffic.", bullets: ["URL mapping", "Pre/post checks", "Soft launch plan"] },
  ];

  /** ===== Program scope (from image) ===== */
  const scope = [
    { title: "On-Page SEO", bullets: ["Keyword research & optimization","URL structure optimization","Content optimization","Image optimization","Internal linking","Mobile-friendly optimization"] },
    { title: "Off-Page SEO", bullets: ["Link building","Social media integration","Local SEO (if applicable)","Online reputation management"] },
    { title: "Technical SEO", bullets: ["Website speed optimization","XML sitemap","robots.txt","Schema markup"] },
    { title: "Reporting & Analysis", bullets: ["Keyword ranking reports","Traffic & conversion analytics","Competitor analysis"] },
    { title: "Customization & Planning", bullets: ["Strategy and planning","Continuous optimization"] },
  ];

  /** ===== Influencer tiers (from image) ===== */
  const influencer = [
    { tier: "Micro", desc: "10k–15k followers" },
    { tier: "Macro", desc: "100k–1M followers" },
    { tier: "Mega", desc: "Above 1M followers" },
  ];

  const stack = ["Google Search Console","GA4","Tag Manager","PageSpeed Insights","Lighthouse","Screaming Frog","Ahrefs/SEMrush","Looker Studio"];

  const steps = [
    { t: "Discover", d: "Goals, baselines, and technical/content discovery." },
    { t: "Audit", d: "Crawl, vitals, indexation, and opportunity map." },
    { t: "Fix", d: "High-impact technical + on-page improvements first." },
    { t: "Build", d: "Content & internal-link hubs around priority topics." },
    { t: "Measure", d: "Dashboards, goals, and cohort reporting." },
    { t: "Iterate", d: "Test, learn, and scale what works." },
  ];

  const deliverables = [
    "Technical audit & prioritized fixes",
    "Keyword map & intent clusters",
    "Metadata & schema templates",
    "Internal linking playbook",
    "Content briefs (priority topics)",
    "GA4/GSC dashboards",
    "Monthly insights & next steps",
  ];

  const kpis = ["Non-branded clicks","Quality impressions","Top-3 keyword count","Pages indexed","Core Web Vitals pass rate","CTR & SERP features","Leads/revenue attribution"];

  /* ===== Sticky rail / scroll-spy ===== */
  const ids = useMemo(() => [
    "services","program-scope","influencer","process","stack","deliverables","kpis","cta"
  ], []);
  const labels = {
    services:"Services",
    "program-scope":"SEO Program",
    influencer:"Influencer",
    process:"Process",
    stack:"Tools",
    deliverables:"Deliverables",
    kpis:"KPIs",
    cta:"Start"
  };
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [ids]);

  const jump = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    if (typeof window !== "undefined" && window.history?.replaceState) {
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  // Centralized Telegram URL for right-click/copy; click uses openTelegram()
  const telegramHref = getTelegramUrl?.({ preferApp: false }) || "https://t.me/";

  return (
    <main className="seo_services">
      {/* Sticky rail */}
      <aside className="seo__rail" aria-label="Page sections">
        <div className="rail__brand">
          <div className="rail__logo">SEO</div>
          <div>
            <strong>Search Optimization</strong>
            <small>Technical + Content</small>
          </div>
        </div>
        <ul className="rail__nav">
          {ids.map((id) => (
            <li key={id}>
              <button
                className={`rail__chip ${active === id ? "is-active" : ""}`}
                onClick={() => jump(id)}
                aria-current={active === id ? "page" : undefined}
              >
                {labels[id]}
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
              openTelegram?.();
            }}
            aria-label="Connect on Telegram"
          >
            <FaTelegramPlane />
            <span>Talk on Telegram</span>
          </a>
        </div>
      </aside>

      {/* Main column */}
      <div className="seo__main">
        {/* HERO */}
        <header className="seo__hero">
          <span className="seo__eyebrow">Search Engine Optimization</span>
          <h1>Rank higher. Grow organic traffic—sustainably.</h1>
          <p>Technical excellence meets content strategy. We tune your site for discovery, speed, and conversion—then measure what matters.</p>

          <div className="seo__hero-cta">
            <button className="btn btn--primary" onClick={() => navigate("/contact")}>
              Contact Us <FaAngleRight />
            </button>
          </div>
        </header>

        {/* SERVICES */}
        <section id="services" className="seo__grid">
          {services.map((s) => (
            <article key={s.title} className="seo__card">
              <div className="seo__card-head">
                <div className="seo__icon">{s.icon}</div>
                <h2>{s.title}</h2>
              </div>
              <p className="seo__copy">{s.copy}</p>
              <ul className="seo__list">
                {s.bullets.map((b) => <li key={b}><FaCheckCircle/> {b}</li>)}
              </ul>
            </article>
          ))}
        </section>

        {/* PROGRAM SCOPE */}
        <section id="program-scope" className="seo__scope">
          <div className="seo__head">
            <h3>SEO Program Scope</h3>
            <p>Everything needed across On-page, Off-page, Technical, Reporting and ongoing Optimization.</p>
          </div>
          <div className="scope__grid">
            {scope.map((g) => (
              <article key={g.title} className="scope__card">
                <h4>{g.title}</h4>
                <ul>
                  {g.bullets.map((b) => (
                    <li key={b}><FaCheckCircle/> <span>{b}</span></li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* INFLUENCER */}
        <section id="influencer" className="seo__influencer">
          <div className="seo__head">
            <h3>Influencer Marketing</h3>
            <p>Creator partnerships to amplify launches, content and link velocity.</p>
          </div>
          <div className="infl__grid">
            {influencer.map((t) => (
              <article key={t.tier} className="infl__card">
                <div className="infl__tier">{t.tier}</div>
                <div className="infl__desc">{t.desc}</div>
              </article>
            ))}
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" className="seo__process">
          <div className="seo__head">
            <h3>How we work</h3>
            <p>Clear steps from kickoff to compounding growth.</p>
          </div>
          <ol className="seo__steps">
            {steps.map((s, i) => (
              <li key={s.t} className="seo__step">
                <span className="seo__num">{i + 1}</span>
                <div>
                  <h4>{s.t}</h4>
                  <p>{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* STACK */}
        <section id="stack" className="seo__stack">
          <div className="seo__head">
            <h3>Tools & stack</h3>
            <p>Modern, proven tools—matched to your team and roadmap.</p>
          </div>
          <ul className="seo__chips">
            {stack.map((x) => <li className="seo__chip" key={x}>{x}</li>)}
          </ul>
        </section>

        {/* DELIVERABLES */}
        <section id="deliverables" className="seo__deliver">
          <div className="seo__head">
            <h3>What you get</h3>
            <p>Actionable output that your team can ship quickly.</p>
          </div>
          <ul className="seo__list seo__list--cards">
            {deliverables.map((d) => <li key={d}><FaCheckCircle/> {d}</li>)}
          </ul>
          <div className="seo__deliver-cta">
            <button className="btn btn--primary" onClick={() => navigate("/contact")}>
              See deliverables checklist <FaAngleRight />
            </button>
          </div>
        </section>

        {/* KPIs */}
        <section id="kpis" className="seo__kpis">
          <div className="seo__head">
            <h3>Metrics that matter</h3>
            <p>We align work to measurable business outcomes.</p>
          </div>
          <ul className="seo__chips">
            {kpis.map((k) => <li key={k} className="seo__chip">{k}</li>)}
          </ul>
        </section>

        {/* CTA */}
        <section id="cta" className="seo__cta">
          <div className="seo__cta-inner">
            <div className="seo__cta-copy">
              <h3>Ready to grow organic traffic?</h3>
              <p>Tell us your goals—get a custom plan with timelines and next steps.</p>
            </div>
            <button className="btn btn--primary" onClick={() => navigate("/contact")}>
              Contact SEO Team <FaAngleRight />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Seo;
