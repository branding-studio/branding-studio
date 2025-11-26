import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaVideo,
  FaFilm,
  FaMobileAlt,
  FaPlayCircle,
  FaMagic,
  FaMusic,
  FaClosedCaptioning,
  FaPalette,
  FaImage,
  FaYoutube,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaCloudUploadAlt,
  FaFolderOpen,
  FaAngleRight,
  FaCheckCircle,
  FaTelegramPlane
} from "react-icons/fa";
import "./Videoediting.css";
import { useLocalContext } from "../../../context/LocalContext";

const Videoediting = () => {
  const navigate = useNavigate();
  const { openTelegram, getTelegramUrl } = useLocalContext();

  const services = [
    {
      icon: <FaMobileAlt />,
      title: "Reels & Shorts",
      copy: "Hook-first edits for IG/FB/YouTube—snappy pacing and native feel.",
      bullets: ["Auto-captions", "1:1 / 9:16 / 16:9", "Trend-aware cuts"],
    },
    {
      icon: <FaFilm />,
      title: "Product / Ad Edits",
      copy: "High-conversion edits for paid and organic—clean, clear, on-brand.",
      bullets: ["UGC + studio mixes", "Offer/CTA overlays", "A/B cut variants"],
    },
    {
      icon: <FaVideo />,
      title: "Corporate & Explainers",
      copy: "Narrative-led videos that simplify complex topics and drive action.",
      bullets: ["Script assist", "B-roll & stock", "Branded lower-thirds"],
    },
    {
      icon: <FaPlayCircle />,
      title: "Events & Highlights",
      copy: "Tight recaps and emotive highlights with tasteful transitions.",
      bullets: ["Multi-cam sync", "Music timing", "Logo stings"],
    },
    {
      icon: <FaYoutube />,
      title: "YouTube Long-form",
      copy: "Retention-optimized storytelling—chapters, hooks, and pacing.",
      bullets: ["Pattern interrupts", "End screens/cards", "SEO-ready assets"],
    },
    {
      icon: <FaMagic />,
      title: "Motion Graphics",
      copy: "Clean kinetic type, animated icons, and logo reveals.",
      bullets: ["Title packs", "Callouts", "Lottie-ready exports"],
    },
    {
      icon: <FaPalette />,
      title: "Color & Sound",
      copy: "Final polish for a premium look and feel.",
      bullets: ["DaVinci grade", "Noise cleanup", "SFX & music beds"],
    },
    {
      icon: <FaClosedCaptioning />,
      title: "Subtitles & Localization",
      copy: "Accessible captions and multi-language variants.",
      bullets: ["Burn-in or SRT/VTT", "Brand fonts", "Glossary consistency"],
    },
    {
      icon: <FaImage />,
      title: "Thumbnails & Creatives",
      copy: "Scroll-stopping thumbnails and cover frames.",
      bullets: ["A/B options", "PSD/FIG source", "Platform-specific sizes"],
    },
  ];

  const steps = [
    { t: "Brief", d: "Goals, audience, references, brand kit." },
    { t: "Assets", d: "Footage intake via Drive/Frame.io; rights cleared.", i: <FaCloudUploadAlt /> },
    { t: "Edit", d: "Rough cut → story pass → timing & rhythm." },
    { t: "Review", d: "Time-coded comments; clear change list.", i: <FaFolderOpen /> },
    { t: "Polish", d: "Color, sound, motion, captions, QC." },
    { t: "Deliver", d: "Master + social ratios, codecs, and source (optional)." },
  ];

  const stack = [
    "Premiere Pro",
    "After Effects",
    "DaVinci Resolve",
    "Audition",
    "Frame.io",
    "Figma",
    "Google Drive",
    "CapCut (mobile cuts)",
  ];

  const deliverables = [
    "Master file (ProRes/H.264)",
    "Social ratios (16:9 / 9:16 / 1:1)",
    "SRT/VTT captions & burn-ins",
    "Thumbnail pack (A/B options)",
    "Edit log & version notes",
    "Music license info",
    "Project files (optional handoff)",
  ];

  const ratios = ["16:9", "9:16", "1:1", "4:5", "21:9 hero", "GIF/WebM loops"];
  const codecs = ["H.264", "HEVC (H.265)", "ProRes 422", "DNxHD/HR", "AAC audio", "WAV stems"];

  /* ===== Sticky rail + scroll spy ===== */
  const ids = useMemo(() => ["services","process","stack","deliver","presets","cta"], []);
  const labels = { services:"Services", process:"Process", stack:"Tools", deliver:"Deliverables", presets:"Presets", cta:"Start" };
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
    <main className="ve">
      {/* Sticky rail */}
      <aside className="ve__rail" aria-label="Page sections">
        <div className="rail__brand">
          <div className="rail__logo">VID</div>
          <div>
            <strong>Video Editing</strong>
            <small>Edits & Post</small>
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
      <div className="ve__main">
        {/* HERO */}
        <header className="ve__hero">
          <span className="ve__eyebrow">Creative Services</span>
          <h1>Video Editing & Post-Production</h1>
          <p>
            Conversion-minded edits for social, ads, events, and long-form. We cut fast,
            keep it on-brand, and deliver in every format you need.
          </p>

          <div className="ve__badges">
            <span><FaYoutube /> 16:9 / 9:16 / 1:1</span>
            <span><FaMusic /> Royalty-safe music</span>
            <span><FaClosedCaptioning /> Captions ready</span>
          </div>

          <div className="ve__hero-cta">
            <button className="btn btn--primary" onClick={() => navigate("/contact")}>
              Start a Project <FaAngleRight />
            </button>
          </div>
        </header>

        {/* SERVICES */}
        <section id="services" className="ve__grid">
          {services.map((s) => (
            <article className="ve__card" key={s.title}>
              <div className="ve__card-head">
                <div className="ve__icon">{s.icon}</div>
                <h2>{s.title}</h2>
              </div>
              <p className="ve__copy">{s.copy}</p>
              <ul className="ve__list">
                {s.bullets.map((b) => (
                  <li key={b}><FaCheckCircle /> {b}</li>
                ))}
              </ul>
              <button
                className="btn btn--ghost"
                onClick={() => navigate("/contact")}
                aria-label={`Contact about ${s.title}`}
              >
                Contact about {s.title} <FaAngleRight />
              </button>
            </article>
          ))}
        </section>

        {/* PROCESS */}
        <section id="process" className="ve__process">
          <div className="ve__head">
            <h3>How we work</h3>
            <p>Simple, collaborative, and built for speed.</p>
          </div>
          <ol className="ve__steps">
            {steps.map((s, i) => (
              <li className="ve__step" key={s.t}>
                <span className="ve__num">{i + 1}</span>
                <div>
                  <h4>{s.t}</h4>
                  <p>{s.d}</p>
                </div>
                {s.i ? <i className="ve__step-ico">{s.i}</i> : null}
              </li>
            ))}
          </ol>
        </section>

        {/* STACK */}
        <section id="stack" className="ve__stack">
          <div className="ve__head">
            <h3>Tools & delivery</h3>
            <p>Modern, proven tools—matched to your brand and platforms.</p>
          </div>
          <ul className="ve__chips">
            {stack.map((x) => (
              <li className="ve__chip" key={x}>{x}</li>
            ))}
          </ul>
          <div className="ve__socials">
            <span><FaYoutube /> YouTube</span>
            <span><FaInstagram /> Instagram</span>
            <span><FaFacebook /> Facebook</span>
            <span><FaLinkedin /> LinkedIn</span>
          </div>
        </section>

        {/* DELIVERABLES */}
        <section id="deliver" className="ve__deliver">
          <div className="ve__head">
            <h3>What you get</h3>
            <p>Everything you need to publish confidently—no guesswork.</p>
          </div>
          <ul className="ve__list ve__list--cards">
            {deliverables.map((d) => (
              <li key={d}><FaCheckCircle /> {d}</li>
            ))}
          </ul>
          <div className="ve__deliver-cta">
            <button className="btn btn--primary" onClick={() => navigate("/contact")}>
              See deliverables checklist <FaAngleRight />
            </button>
          </div>
        </section>

        {/* PRESETS (ratios + codecs) */}
        <section id="presets" className="ve__presets">
          <div className="ve__head">
            <h3>Presets & Exports</h3>
            <p>We deliver the right ratios and codecs for every platform.</p>
          </div>
          <div className="ve__preset-grids">
            <article className="ve__card">
              <h4>Aspect Ratios</h4>
              <ul className="ve__chips">
                {ratios.map((r) => <li key={r} className="ve__chip">{r}</li>)}
              </ul>
            </article>
            <article className="ve__card">
              <h4>Codecs & Audio</h4>
              <ul className="ve__chips">
                {codecs.map((c) => <li key={c} className="ve__chip">{c}</li>)}
              </ul>
            </article>
          </div>
        </section>

        {/* CTA */}
        <section id="cta" className="ve__cta">
          <div className="ve__cta-inner">
            <div className="ve__cta-copy">
              <h3>Need edits in multiple formats?</h3>
              <p>We’ll deliver masters + platform ratios with captions and clean exports.</p>
            </div>
            <button className="btn btn--primary" onClick={() => navigate("/contact")}>
              Talk to an Editor <FaAngleRight />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Videoediting;
