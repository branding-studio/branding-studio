import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBolt,
  FaCheckCircle,
  FaMobileAlt,
  FaSearch,
  FaRocket,
  FaShieldAlt,
  FaTachometerAlt,
  FaFigma,
  FaReact,
  FaWordpress,
  FaServer,
  FaPaintBrush,
  FaDatabase,
  FaCloud,
  FaLock,
  FaProjectDiagram,
  FaSyncAlt,
  FaCogs,
  FaRobot,
  FaBug,
  FaFilePdf,
  FaTerminal,
  FaAngleRight,
  FaWhatsapp,
  FaPlayCircle,
  FaImage,
  FaLaptopCode,
} from "react-icons/fa";
import "./Webdev.css";
import { useLocalContext } from "../../../context/LocalContext";

/* Anim */
const fadeUp = (i = 0, d = 0.55) => ({
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: d, delay: i * 0.08, ease: [0.25, 0.8, 0.25, 1] },
  },
});

/* Content */
const process = [
  {
    icon: <FaFigma />,
    title: "UX & Wireframes",
    copy: "User flows, low-fi wireframes, and a flexible component grid that maps to your goals.",
  },
  {
    icon: <FaPaintBrush />,
    title: "Visual Design",
    copy: "Brand-aligned UI, motion micro-interactions, and a modular design system.",
  },
  {
    icon: <FaReact />,
    title: "Build & Integrate",
    copy: "React/Next.js or WordPress build, with APIs, CMS, forms, and analytics wired in.",
  },
  {
    icon: <FaTachometerAlt />,
    title: "Optimize & Ship",
    copy: "Core Web Vitals, SEO, accessibility, security hardening, then launch + monitor.",
  },
];

const stack = [
  { label: "React / Next.js", icon: <FaReact /> },
  { label: "WordPress", icon: <FaWordpress /> },
  { label: "Node / API", icon: <FaServer /> },
  { label: "GA4 + GTM", icon: <FaTachometerAlt /> },
  { label: "SEO / Schema", icon: <FaSearch /> },
  { label: "Figma", icon: <FaFigma /> },
];

const outcomes = [
  {
    icon: <FaBolt />,
    title: "Lightning-Fast",
    copy: "Sub-2.5s LCP, snappy interactions, and optimized assets.",
  },
  {
    icon: <FaMobileAlt />,
    title: "Mobile-First",
    copy: "Designed for thumbs, tested on real devices, built to scale.",
  },
  {
    icon: <FaSearch />,
    title: "SEO-Ready",
    copy: "Semantic HTML, schema, redirects, XML sitemap, and clean URLs.",
  },
  {
    icon: <FaRocket />,
    title: "Conversion-First",
    copy: "Clear offers, frictionless forms, social proof, and CRO patterns.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure by Default",
    copy: "Hardened stack, headers, reCAPTCHA, and vulnerability checks.",
  },
  {
    icon: <FaCheckCircle />,
    title: "Easy to Manage",
    copy: "Reusable sections, CMS handoff, and docs your team will use.",
  },
];

const backend = [
  {
    icon: <FaServer />,
    title: "API Layer",
    bullets: [
      "Node.js (Express/Nest)",
      "REST / GraphQL / tRPC",
      "Versioning & rate limits",
    ],
  },
  {
    icon: <FaDatabase />,
    title: "Data & ORM",
    bullets: [
      "Postgres / MySQL / Mongo",
      "Prisma / TypeORM",
      "Migrations & backups",
    ],
  },
  {
    icon: <FaLock />,
    title: "Auth & Security",
    bullets: ["JWT / OAuth / SSO", "RBAC & audit logs", "OWASP hardening"],
  },
  {
    icon: <FaSyncAlt />,
    title: "Queues & Realtime",
    bullets: ["Redis + BullMQ", "Webhooks / WebSockets", "CRON & workers"],
  },
  {
    icon: <FaCloud />,
    title: "Infra & DevOps",
    bullets: ["Docker & CI/CD", "Vercel / AWS", "Observability & alerts"],
  },
  {
    icon: <FaProjectDiagram />,
    title: "Integrations",
    bullets: ["Stripe / PayPal", "SendGrid / Twilio", "CMS / CRM APIs"],
  },
];

const puppeteerServices = [
  {
    icon: <FaRobot />,
    title: "Visual QA",
    bullets: ["Screenshots across breakpoints", "DOM/state assertions"],
  },
  {
    icon: <FaBug />,
    title: "Flow Tests",
    bullets: ["Signup & checkout", "Form validation & errors"],
  },
  {
    icon: <FaFilePdf />,
    title: "PDF & Docs",
    bullets: ["HTML → PDF invoices", "Batch receipts & tickets"],
  },
  {
    icon: <FaCogs />,
    title: "Ops Automation",
    bullets: ["CMS ops macros", "Bulk updates (with permissions)"],
  },
  {
    icon: <FaTachometerAlt />,
    title: "Vitals Snapshots",
    bullets: ["INP/LCP capture", "Warm-cache checks"],
  },
  {
    icon: <FaTerminal />,
    title: "CLI & Schedules",
    bullets: ["CRON jobs", "Serverless triggers"],
  },
];

const puppeteerSnippet = `import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 900 });
  await page.goto('https://example.com', { waitUntil: 'networkidle2' });
  const hero = await page.$('header, .hero, [data-hero]');
  if (!hero) throw new Error('Hero not found');
  await page.screenshot({ path: 'homepage.png', fullPage: true });
  await page.pdf({ path: 'homepage.pdf', format: 'A4', printBackground: true });
  await browser.close();
})().catch(err => { console.error(err); process.exit(1); });`;

export default function Webdev() {
  const navigate = useNavigate();
  const { openWhatsApp, getWhatsAppUrl } = useLocalContext();
  const [sampleFilter, setSampleFilter] = useState("all");

  const samples = [
    {
      id: 1,
      type: "photo",
      title: "Business Website Landing Page",
      category: "Landing Page",
      thumb: "/assets/samples/web-photo-1.jpg",
      link: "/assets/samples/web-photo-1.jpg",
    },
    {
      id: 2,
      type: "photo",
      title: "Dashboard UI Mockup",
      category: "Dashboard Design",
      thumb: "/assets/samples/web-photo-2.jpg",
      link: "/assets/samples/web-photo-2.jpg",
    },
    {
      id: 3,
      type: "video",
      title: "Website Walkthrough Demo",
      category: "Web Preview",
      thumb: "/assets/samples/web-video-1.jpg",
      link: "https://www.youtube.com/",
    },
    {
      id: 4,
      type: "photo",
      title: "Mobile Responsive Preview",
      category: "Responsive UI",
      thumb: "/assets/samples/web-photo-3.jpg",
      link: "/assets/samples/web-photo-3.jpg",
    },
    {
      id: 5,
      type: "video",
      title: "Interactive Website Demo",
      category: "UI Motion",
      thumb: "/assets/samples/web-video-2.jpg",
      link: "https://www.youtube.com/",
    },
    {
      id: 6,
      type: "photo",
      title: "E-commerce Product Page",
      category: "E-commerce",
      thumb: "/assets/samples/web-photo-4.jpg",
      link: "/assets/samples/web-photo-4.jpg",
    },
  ];

  const filteredSamples =
    sampleFilter === "all"
      ? samples
      : samples.filter((item) => item.type === sampleFilter);

  const ids = useMemo(
    () => [
      "hero",
      "samples",
      "outcomes",
      "process",
      "stack",
      "backend",
      "automation",
      "cta",
    ],
    []
  );

  const labels = {
    hero: "Intro",
    samples: "Samples",
    outcomes: "Outcomes",
    process: "Process",
    stack: "Tools",
    backend: "Backend",
    automation: "Automation",
    cta: "Start",
  };

  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
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

  const whatsappHref = getWhatsAppUrl
    ? getWhatsAppUrl({
        message: "Hi! I am interested in Web Development services.",
        preferApp: false,
      })
    : "#";

  return (
    <main className="webdev services-grid">
      <aside className="wd__rail" aria-label="Page sections">
        <div className="rail__brand">
          <div className="rail__logo">WD</div>
          <div>
            <strong>Web Development</strong>
            <small>Sites & Landing Pages</small>
          </div>
        </div>

        <ul className="rail__nav">
          {ids.map((id) => (
            <li key={id}>
              <button
                className={`rail__chip ${active === id ? "is-active" : ""}`}
                aria-current={active === id ? "page" : undefined}
                onClick={() => jump(id)}
              >
                {labels[id]}
              </button>
            </li>
          ))}
        </ul>

        <div className="ppc2-ctaRail">
          <a
            className="ppc2-btn ppctg"
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (openWhatsApp) {
                e.preventDefault();
                openWhatsApp({
                  message: "Hi! I am interested in Web Development services.",
                });
              }
            }}
            aria-label="Connect on WhatsApp"
          >
            <FaWhatsapp />
            <span>Talk on WhatsApp</span>
          </a>
        </div>
      </aside>

      <div className="wd__main">
        <section id="hero" className="webdev__hero">
          <motion.div
            className="webdev__hero-inner"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp(0)}
          >
            <span className="wd-pill">Web Development</span>
            <h1>
              Fast, Conversion-First <span>Websites &amp; Landing Pages</span>
            </h1>
            <p>
              We design and build modern websites that load fast, rank well, and
              convert— powered by React/Next.js or WordPress, with clean APIs
              and Core Web Vitals tuning.
            </p>
            <div className="wd-cta-row">
              <button
                className="btn btn--primary"
                onClick={() => navigate("/contact")}
              >
                Get a Free Build Plan <FaAngleRight />
              </button>
              <button
                className="btn btn--ghost"
                onClick={() => navigate("/our-strategies")}
              >
                See How We Work
              </button>
            </div>
            <ul className="wd-badges" aria-label="Key highlights">
              <li>Core Web Vitals</li>
              <li>SEO + Schema</li>
              <li>GA4 + GTM</li>
              <li>A/B-Ready</li>
            </ul>
          </motion.div>
        </section>

        <section id="samples" className="wd__samples">
          <div className="wd-section-head">
            <h2>Our Work Samples</h2>
            <p>
              Explore selected websites, landing pages, dashboards, responsive
              previews, and interactive web project samples.
            </p>
          </div>

          <div className="wd__sample-filters">
            <button
              className={`wd__filter-btn ${sampleFilter === "all" ? "is-active" : ""}`}
              onClick={() => setSampleFilter("all")}
            >
              All
            </button>
            <button
              className={`wd__filter-btn ${sampleFilter === "video" ? "is-active" : ""}`}
              onClick={() => setSampleFilter("video")}
            >
              Videos
            </button>
            <button
              className={`wd__filter-btn ${sampleFilter === "photo" ? "is-active" : ""}`}
              onClick={() => setSampleFilter("photo")}
            >
              Photos
            </button>
          </div>

          <div className="wd__samples-grid">
            {filteredSamples.map((item) => (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="wd__sample-card"
              >
                <div className="wd__sample-thumb">
                  <img src={item.thumb} alt={item.title} />
                  <div className="wd__sample-overlay">
                    {item.type === "video" ? <FaPlayCircle /> : <FaImage />}
                  </div>
                </div>

                <div className="wd__sample-content">
                  <span className="wd__sample-type">{item.category}</span>
                  <h4>{item.title}</h4>
                  <button type="button" className="wd__sample-btn">
                    {item.type === "video" ? "Watch Sample" : "View Sample"}
                  </button>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="outcomes" className="webdev__outcomes">
          <div className="wd-section-head">
            <h2>Built for performance, designed to convert</h2>
            <p>
              Everything we ship is measurable, maintainable, and
              marketing-ready.
            </p>
          </div>
          <div className="wd-grid">
            {outcomes.map((o, i) => (
              <motion.article
                key={o.title}
                className="wd-card"
                variants={fadeUp(i)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
              >
                <div className="wd-ico">{o.icon}</div>
                <h3>{o.title}</h3>
                <p>{o.copy}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="process" className="webdev__process">
          <div className="wd-section-head">
            <h2>Our build process</h2>
            <p>
              Transparent from kickoff to launch—so you always know what’s next.
            </p>
          </div>
          <ol className="wd-steps">
            {process.map((s, i) => (
              <motion.li
                key={s.title}
                className="wd-step"
                variants={fadeUp(i)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
              >
                <div className="wd-step-ico">{s.icon}</div>
                <div className="wd-step-body">
                  <h4>{s.title}</h4>
                  <p>{s.copy}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </section>

        <section id="stack" className="webdev__stack">
          <div className="wd-section-head">
            <h2>Tech we love</h2>
            <p>Modern, proven tools—chosen to match your team and roadmap.</p>
          </div>
          <div className="wd-chips">
            {stack.map((t) => (
              <span key={t.label} className="wd-chip">
                <i>{t.icon}</i> {t.label}
              </span>
            ))}
          </div>
        </section>

        <section id="backend" className="webdev__backend">
          <div className="wd-section-head">
            <h2>Backend & Data</h2>
            <p>
              Strong foundations—clean APIs, reliable data, secure auth, and
              production-ready infra.
            </p>
          </div>
          <div className="bd-grid">
            {backend.map((b, i) => (
              <motion.article
                key={b.title}
                className="bd-card"
                variants={fadeUp(i)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
              >
                <div className="bd-ico">{b.icon}</div>
                <h3>{b.title}</h3>
                <ul>
                  {b.bullets.map((x) => (
                    <li key={x}>
                      <FaCheckCircle /> {x}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="automation" className="webdev__automation">
          <div className="wd-section-head">
            <h2>Automation & QA (Puppeteer)</h2>
            <p>
              Headless browser scripts for visual QA, flows, PDFs, and
              repeatable ops—safe and permissioned.
            </p>
          </div>

          <div className="auto-grid">
            {puppeteerServices.map((a, i) => (
              <motion.article
                key={a.title}
                className="auto-card"
                variants={fadeUp(i)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
              >
                <div className="auto-ico">{a.icon}</div>
                <h3>{a.title}</h3>
                <ul>
                  {a.bullets.map((x) => (
                    <li key={x}>
                      <FaCheckCircle /> {x}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>

          <div className="auto-snippet">
            <div className="auto-snippet-head">
              <strong>Example: screenshot + PDF generator</strong>
              <small>Run as a CI job or serverless function</small>
            </div>
            <pre className="code">
              <code>{puppeteerSnippet}</code>
            </pre>
            <p className="auto-note">
              Use only on your own sites or with written permission. Respect
              robots.txt and terms of service.
            </p>
            <div className="auto-cta">
              <button
                className="btn btn--primary"
                onClick={() => navigate("/contact")}
              >
                Ask about Automation <FaAngleRight />
              </button>
              <button
                className="btn btn--ghost"
                onClick={() => navigate("/our-strategies")}
              >
                See QA Workflow
              </button>
            </div>
          </div>
        </section>

        <section id="cta" className="webdev__cta">
          <div className="wd-cta-inner">
            <div className="wd-cta-copy">
              <h3>Ready to build something fast?</h3>
              <p>
                Tell us your goals—get a free plan with timelines and budget
                ranges.
              </p>
            </div>
            <div className="wd-cta-actions">
              <button
                className="btn btn--primary"
                onClick={() => navigate("/contact")}
              >
                Get My Plan <FaAngleRight />
              </button>
              <button
                className="btn btn--ghost"
                onClick={() => navigate("/our-strategies")}
              >
                Explore Our Approach
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}