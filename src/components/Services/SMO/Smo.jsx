import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHashtag, FaCalendarAlt, FaComments, FaChartLine, FaBullhorn, FaUsers,
  FaPaintBrush, FaSearch, FaPlayCircle, FaImages, FaAngleRight, FaCheckCircle,
  FaShieldAlt, FaTrophy, FaInstagram, FaFacebook, FaLinkedin, FaYoutube,
  FaPinterestP, FaRedditAlien, FaTelegramPlane, FaTwitter
} from "react-icons/fa";
import "./Smo.css";
import { useLocalContext } from "../../../context/LocalContext";

const Smo = () => {
  const navigate = useNavigate();
  const { openTelegram, getTelegramUrl } = useLocalContext();

  /* ===== Core services ===== */
  const services = [
    { icon: <FaTrophy />, title: "Strategy & Playbooks", copy: "Positioning, tone, and content pillars mapped to goals—brand-safe and scalable.", bullets: ["Audience & competitors", "Pillars & themes", "Voice & guardrails"] },
    { icon: <FaPaintBrush />, title: "Content & Creatives", copy: "Reels, carousels, banners, and shorts—native-first design for each platform.", bullets: ["Templates & kits", "Hook-first copy", "CTA overlays"] },
    { icon: <FaHashtag />, title: "Social SEO & Hashtags", copy: "Search-friendly captions, tags, and structure for discoverability.", bullets: ["Keyword mapping", "Hashtag clusters", "Alt text & naming"] },
    { icon: <FaCalendarAlt />, title: "Calendar & Publishing", copy: "Consistent, automated posting with campaign themes and launch windows.", bullets: ["Monthly calendar", "Best-time scheduling", "UTM hygiene"] },
    { icon: <FaComments />, title: "Community & Moderation", copy: "Faster replies and safer comments with macros and escalation rules.", bullets: ["Response macros", "Crisis playbook", "Spam filtering"] },
    { icon: <FaUsers />, title: "Influencers & UGC", copy: "Creator collabs and rights-ready UGC to boost credibility and reach.", bullets: ["Creator shortlist", "Briefs & approvals", "Usage rights"] },
    { icon: <FaShieldAlt />, title: "Reputation & Reviews", copy: "Proactive review asks and on-brand responses across listings.", bullets: ["Listing setup", "Review funnels", "Policy-safe replies"] },
    { icon: <FaSearch />, title: "Listening & Trends", copy: "Track mentions, share-of-voice, and trends to join the right conversations.", bullets: ["Keyword alerts", "Competitor SOV", "Trend picks"] },
    { icon: <FaChartLine />, title: "Analytics & Reporting", copy: "Clarity on what works—growth, reach, saves, clicks, and assisted conversions.", bullets: ["Looker dashboards", "Post cohort views", "Monthly insights"] },
    { icon: <FaBullhorn />, title: "Paid Assist (Boosts)", copy: "Light paid support for winners—only boosts and whitelisting (no pricing here).", bullets: ["Top-post boosts", "Spark/whitelist", "Creative variants"] },
  ];

  /* ===== Platform packages (from image) ===== */
  const packages = [
    {
      icon: <FaInstagram />, name: "Instagram Marketing",
      badges: ["45 Posts", "10 Reels", "Daily Stories"],
      bullets: [
        "Festival posts or reels", "Create highlights", "Comments pinning",
        "Messages reply", "Regular profile optimization", "Instagram account analytics"
      ]
    },
    {
      icon: <FaFacebook />, name: "Facebook Marketing",
      badges: ["45 Posts", "10 Reels", "Daily Stories"],
      bullets: [
        "Festival posts or reels", "Create highlights", "Comments pinning",
        "Messages reply", "Facebook groups interaction", "Regular profile optimization", "Facebook account analytics"
      ]
    },
    {
      icon: <FaLinkedin />, name: "LinkedIn Marketing",
      badges: ["Informative & tech posts", "Blog publishing"],
      bullets: [
        "Festival posts or reels", "Create highlights", "Daily connections",
        "Comments pinning", "Messages reply", "Groups interaction",
        "Regular profile optimization", "LinkedIn account analytics"
      ]
    },
    {
      icon: <FaYoutube />, name: "YouTube Marketing",
      badges: ["YouTube Shorts"],
      bullets: [
        "Channel hygiene basics", "Title/thumbnail templates", "Comment moderation",
        "Playlists & end screens", "Monthly analytics snapshot"
      ]
    },
  ];

  const paidAds = [
    "Target audience analysis",
    "Campaign setup",
    "Ad graphic design",
    "Ad testing",
    "Ad optimization",
    "Ad analytics",
  ];

  const formats = [
    { i: <FaPlayCircle />, t: "Reels/Shorts" },
    { i: <FaImages />, t: "Carousels" },
    { i: <FaImages />, t: "Banners" },
    { i: <FaImages />, t: "Stories" },
    { i: <FaImages />, t: "Thumbnails" },
  ];

  const steps = [
    { t: "Discover", d: "Goals, audience, audit, and brand kit." },
    { t: "Plan", d: "Pillars, calendar, formats, KPIs." },
    { t: "Create", d: "Design, copy, subtitles, templates." },
    { t: "Publish", d: "Approvals, scheduling, UTM & QC." },
    { t: "Engage", d: "Replies, moderation, and UGC." },
    { t: "Measure", d: "Dashboards, insights, next tests." },
  ];

  const platforms = [
    { i: <FaInstagram />, t: "Instagram" },
    { i: <FaFacebook />, t: "Facebook" },
    { i: <FaLinkedin />, t: "LinkedIn" },
    { i: <FaYoutube />, t: "YouTube" },
    { i: <FaTwitter />, t: "Twitter/X" },
    { i: <FaPinterestP />, t: "Pinterest" },
    { i: <FaRedditAlien />, t: "Reddit" },
    { i: <FaTelegramPlane />, t: "Telegram" },
  ];

  const deliverables = [
    "Channel strategy & content pillars",
    "Monthly content calendar",
    "Template packs (reels/carousels)",
    "Caption/hashtag banks",
    "UTM & link tracking hygiene",
    "Community macros & escalation",
    "Monthly insights & next tests",
  ];

  const kpis = [
    "Reach & impressions",
    "Saves & shares",
    "Engagement rate",
    "Link clicks",
    "Profile visits",
    "Follower growth (QoQ)",
    "Assisted conversions",
  ];

  const policies = [
    { title: "Brand Safety", copy: "Guardrails for tone, topics, and visuals across platforms." },
    { title: "Moderation Rules", copy: "Macros, triage lanes, and escalation paths for risky comments." },
    { title: "Creator Rights", copy: "Usage rights, whitelisting terms, and disclosures for UGC/influencers." },
    { title: "Crisis Playbook", copy: "Clear owners, response timelines, and approval flow." },
    { title: "Compliance", copy: "Platform policies and ad disclosures (where applicable)." },
  ];

  /* ===== Sticky rail / scroll-spy ===== */
  const ids = useMemo(
    () => ["services","packages","formats","process","stack","deliver","kpis","policies","ads","cta"],
    []
  );
  const labels = {
    services: "Services",
    packages: "Packages",
    formats: "Formats & Platforms",
    process: "Process",
    stack: "Tools",
    deliver: "Deliverables",
    kpis: "KPIs",
    policies: "Policies",
    ads: "Paid Ads",
    cta: "Start",
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
    <main className="smo_services">
      {/* Sticky rail */}
      <aside className="smo__rail" aria-label="Page sections">
        <div className="rail__brand">
          <div className="rail__logo">SMO</div>
          <div>
            <strong>Social Marketing</strong>
            <small>Native-first content</small>
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
      <div className="smo__main">
        {/* HERO */}
        <header className="smo__hero">
          <span className="smo__eyebrow">Social Media Marketing & Optimization</span>
          <h1>Grow reach. Earn saves. Drive clicks.</h1>
          <p>We plan, design, and publish native-first content that earns attention, builds community, and nudges action—without spammy tactics.</p>

          <div className="smo__badges">
            <span><FaPlayCircle /> Reels/Shorts ready</span>
            <span><FaHashtag /> Social SEO</span>
            <span><FaChartLine /> Measurable KPIs</span>
          </div>

          <button className="btn btn--primary" onClick={() => navigate("/contact")}>
            Get SMO Plan <FaAngleRight />
          </button>
        </header>

        {/* SERVICES */}
        <section id="services" className="smo__grid">
          {services.map((s) => (
            <article className="smo__card" key={s.title}>
              <div className="smo__card-head">
                <div className="smo__icon">{s.icon}</div>
                <h2>{s.title}</h2>
              </div>
              <p className="smo__copy">{s.copy}</p>
              <ul className="smo__list">
                {s.bullets.map((b) => <li key={b}><FaCheckCircle /> {b}</li>)}
              </ul>
            </article>
          ))}
        </section>

        {/* PACKAGES */}
        <section id="packages" className="smo__packages">
          <div className="smo__head">
            <h3>Platform Packages</h3>
            <p>Monthly deliverables by channel—clear counts and routines.</p>
          </div>
          <div className="pkg__grid">
            {packages.map((p) => (
              <article key={p.name} className="pkg__card">
                <header className="pkg__head">
                  <div className="pkg__ico">{p.icon}</div>
                  <h4>{p.name}</h4>
                </header>
                <ul className="pkg__badges">
                  {p.badges.map((b) => <li key={b}>{b}</li>)}
                </ul>
                <ul className="pkg__list">
                  {p.bullets.map((b) => (
                    <li key={b}><FaCheckCircle /> <span>{b}</span></li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* FORMATS & PLATFORMS */}
        <section id="formats" className="smo__stack">
          <div className="smo__head">
            <h3>Formats & Platforms</h3>
            <p>We tailor content to native behaviors and feeds.</p>
          </div>
          <ul className="smo__chips">
            {formats.map((f) => (
              <li className="smo__chip" key={f.t}><i>{f.i}</i> {f.t}</li>
            ))}
          </ul>
          <ul className="smo__chips smo__chips--platforms">
            {platforms.map((p) => (
              <li className="smo__chip" key={p.t}><i>{p.i}</i> {p.t}</li>
            ))}
          </ul>
        </section>

        {/* PROCESS */}
        <section id="process" className="smo__process">
          <div className="smo__head">
            <h3>How we work</h3>
            <p>Simple, collaborative, and consistent.</p>
          </div>
          <ol className="smo__steps">
            {steps.map((s, i) => (
              <li className="smo__step" key={s.t}>
                <span className="smo__num">{i + 1}</span>
                <div>
                  <h4>{s.t}</h4>
                  <p>{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* TOOLS */}
        <section id="stack" className="smo__stack">
          <div className="smo__head">
            <h3>Tools & Collaboration</h3>
            <p>We work in your stack—drive, figma, scheduler, and dashboards.</p>
          </div>
          <ul className="smo__chips">
            {["Figma templates","Meta Business Suite","Hootsuite/Buffer","Looker/GA4","Sheets/Notion"].map((x) => (
              <li className="smo__chip" key={x}>{x}</li>
            ))}
          </ul>
        </section>

        {/* DELIVERABLES */}
        <section id="deliver" className="smo__deliver">
          <div className="smo__head">
            <h3>What you get</h3>
            <p>Tangible assets and routines that keep social humming.</p>
          </div>
          <ul className="smo__list smo__list--cards">
            {deliverables.map((d) => <li key={d}><FaCheckCircle /> {d}</li>)}
          </ul>
          <div className="smo__deliver-cta">
            <button className="btn btn--primary" onClick={() => navigate("/contact")}>
              See deliverables checklist <FaAngleRight />
            </button>
          </div>
        </section>

        {/* KPIs */}
        <section id="kpis" className="smo__kpis">
          <div className="smo__head">
            <h3>Metrics that matter</h3>
            <p>We measure impact, not vanity alone.</p>
          </div>
          <ul className="smo__chips">
            {kpis.map((k) => <li key={k} className="smo__chip">{k}</li>)}
          </ul>
        </section>

        {/* POLICIES */}
        <section id="policies" className="smo__policies">
          <div className="smo__head">
            <h3>Brand safety & policies</h3>
            <p>Clear rules to protect your brand and audience.</p>
          </div>
          <div className="smo__policy-cards">
            {policies.map((p) => (
              <article className="smo__policy" key={p.title}>
                <div className="smo__policy-icon"><FaShieldAlt /></div>
                <div>
                  <h4>{p.title}</h4>
                  <p>{p.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* PAID ADS */}
        <section id="ads" className="smo__ads">
          <div className="smo__head">
            <h3>Paid Ads Support</h3>
            <p>When organic winners deserve a push.</p>
          </div>
          <ul className="smo__list smo__ads-list">
            {paidAds.map((x) => <li key={x}><FaCheckCircle /> {x}</li>)}
          </ul>
        </section>

        {/* CTA */}
        <section id="cta" className="smo__cta">
          <div className="smo__cta-inner">
            <div className="smo__cta-copy">
              <h3>Ready to level up your social?</h3>
              <p>Tell us your goals—get a clear calendar and creative kit.</p>
            </div>
            <button className="btn btn--primary" onClick={() => navigate("/contact")}>
              Talk to SMO Team <FaAngleRight />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Smo;
