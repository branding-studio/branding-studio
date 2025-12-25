import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
// FIX: Removed FaClapperboard, Added FaCamera
import {
  FaVideo, FaFilm, FaMicrophoneAlt, FaPhotoVideo, FaCut, FaMagic,
  FaCheckCircle, FaTelegramPlane, FaAngleRight, FaPlayCircle, FaCamera
} from "react-icons/fa";
import "./Filmmaking.css"; 
import { useLocalContext } from "../../../context/LocalContext";

const Filmmaking = () => {
  const navigate = useNavigate();
  const { openTelegram, getTelegramUrl } = useLocalContext();

  /** ===== Services ===== */
  const services = [
    { icon: <FaFilm/>, title: "Ad Films & TVCs", copy: "High-impact commercials designed to grab attention in the first 3 seconds and drive brand recall.", bullets: ["Script to Screen", "TV & Social formats", "High-end production"] },
    { icon: <FaVideo/>, title: "Corporate Films", copy: "Tell your company's story. We produce interviews, office tours, and culture videos that build trust.", bullets: ["Founder interviews", "Company profiles", "CSR documentation"] },
    // FIX: Used FaCamera here instead of FaClapperboard
    { icon: <FaCamera/>, title: "Product Cinematography", copy: "Make your product the hero. Studio-grade lighting and motion control to showcase details flawlessly.", bullets: ["360° rotation", "Macro shots", "Lifestyle integration"] },
    { icon: <FaPhotoVideo/>, title: "Event Coverage", copy: "Capture the energy of your events. We turn conferences and launch parties into dynamic highlight reels.", bullets: ["Multi-cam setup", "Same-day edits", "Live streaming"] },
    { icon: <FaMagic/>, title: "VFX & Motion Graphics", copy: "Add that extra layer of magic. From simple title animations to complex 3D compositing.", bullets: ["2D/3D Animation", "Green screen keying", "Logo intros"] },
    { icon: <FaMicrophoneAlt/>, title: "Sound Design", copy: "Audio is half the experience. We provide professional voiceovers, foley, and licensed scores.", bullets: ["Voiceover recording", "Audio mixing", "SFX libraries"] },
  ];

  /** ===== Scope ===== */
  const scope = [
    { title: "Pre-Production", bullets: ["Scriptwriting", "Storyboarding", "Location scouting", "Casting & Crewing"] },
    { title: "Production", bullets: ["4K/6K Cinema Cameras", "Professional Lighting", "Directing", "Set Design"] },
    { title: "Post-Production", bullets: ["Offline/Online Editing", "Color Grading (DI)", "Sound Mixing", "VFX & CGI"] },
    { title: "Delivery", bullets: ["Multi-format export", "Social cuts (9:16)", "Broadcast standards", "Archival"] },
  ];

  /** ===== Tiers ===== */
  const tiers = [
    { tier: "Social", desc: "Reels & Shorts for rapid growth" },
    { tier: "Brand", desc: "High-value Ads & Corporate films" },
    { tier: "Cinema", desc: "Documentaries & TV Commercials" },
  ];

  const stack = ["Adobe Premiere Pro", "DaVinci Resolve", "After Effects", "Final Cut Pro", "Cinema 4D", "RED / Arri Cameras", "Sony FX Series"];

  const steps = [
    { t: "Concept", d: "Brainstorming the core idea and script development." },
    { t: "Pre-Prod", d: "Logistics, storyboarding, and gear preparation." },
    { t: "Shoot", d: "On-set production capturing the raw footage." },
    { t: "Edit", d: "Assembling the narrative and pacing the cuts." },
    { t: "Grade & Mix", d: "Color correction and audio engineering." },
    { t: "Deliver", d: "Final render in required formats." },
  ];

  const deliverables = [
    "Master File (4K ProRes)",
    "Web Versions (H.264/H.265)",
    "Vertical Cuts (Reels/TikTok)",
    "Clean Feed (No text)",
    "Project Files (Optional)",
    "Raw Footage (Optional)",
    "Music License Docs",
  ];

  const metrics = ["Viewer Retention", "Brand Recall", "Shareability", "Conversion Rate", "Click-Through Rate", "Watch Time"];

  /* ===== Sticky rail / scroll-spy ===== */
  const ids = useMemo(() => [
    "services", "scope", "tiers", "process", "stack", "deliverables", "metrics", "cta"
  ], []);

  const labels = {
    services: "Services",
    scope: "Production Scope",
    tiers: "Packages",
    process: "Process",
    stack: "Gear & Soft",
    deliverables: "Deliverables",
    metrics: "Impact",
    cta: "Start"
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
  };

  // Safe check for context
  const telegramHref = getTelegramUrl ? getTelegramUrl({ preferApp: false }) : "https://t.me/";

  return (
    <main className="film_services">
      {/* Sticky rail */}
      <aside className="film__rail" aria-label="Page sections">
        <div className="rail__brand">
          <div className="rail__logo">FLM</div>
          <div>
            <strong>Filmmaking</strong>
            <small>Production House</small>
          </div>
        </div>
        <ul className="rail__nav">
          {ids.map((id) => (
            <li key={id}>
              <button
                className={`rail__chip ${active === id ? "is-active" : ""}`}
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
               if(openTelegram) {
                 e.preventDefault();
                 openTelegram();
               }
            }}
          >
            <FaTelegramPlane /> <span>Talk on Telegram</span>
          </a>
        </div>
      </aside>

      {/* Main column */}
      <div className="film__main">
        {/* HERO */}
        <header className="film__hero">
          <span className="film__eyebrow">Cinematic & Commercial</span>
          <h1>Stories that move.<br/>Visuals that sell.</h1>
          <p>From 15-second ads to full-scale brand documentaries. We create studio-grade video content that captivates audiences and elevates your brand.</p>

          <div className="film__hero-cta">
            <button className="btn btn--primary" onClick={() => navigate("/contact")}>
              Start Production <FaAngleRight />
            </button>
          </div>
        </header>

        {/* SERVICES */}
        <section id="services" className="film__grid">
          {services.map((s) => (
            <article key={s.title} className="film__card">
              <div className="film__card-head">
                <div className="film__icon">{s.icon}</div>
                <h2>{s.title}</h2>
              </div>
              <p className="film__copy">{s.copy}</p>
              <ul className="film__list">
                {s.bullets.map((b) => <li key={b}><FaCheckCircle/> {b}</li>)}
              </ul>
            </article>
          ))}
        </section>

        {/* SCOPE */}
        <section id="scope" className="film__scope">
          <div className="film__head">
            <h3>Production Capabilities</h3>
            <p>End-to-end management of the entire production pipeline.</p>
          </div>
          <div className="scope__grid">
            {scope.map((g) => (
              <article key={g.title} className="scope__card">
                <h4>{g.title}</h4>
                <ul>
                  {g.bullets.map((b) => <li key={b}><FaCheckCircle/> <span>{b}</span></li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* TIERS */}
        <section id="tiers" className="film__influencer">
          <div className="film__head">
            <h3>Production Levels</h3>
            <p>Scaled solutions for startups, agencies, and enterprises.</p>
          </div>
          <div className="infl__grid">
            {tiers.map((t) => (
              <article key={t.tier} className="infl__card">
                <div className="infl__tier">{t.tier}</div>
                <div className="infl__desc">{t.desc}</div>
              </article>
            ))}
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" className="film__process">
          <div className="film__head">
            <h3>The Workflow</h3>
            <p>A structured approach to creative chaos.</p>
          </div>
          <ol className="film__steps">
            {steps.map((s, i) => (
              <li key={s.t} className="film__step">
                <span className="film__num">{i + 1}</span>
                <div>
                  <h4>{s.t}</h4>
                  <p>{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* STACK */}
        <section id="stack" className="film__stack">
          <div className="film__head">
            <h3>Studio Gear & Tech</h3>
            <p>We use cinema-grade equipment and industry standard software.</p>
          </div>
          <ul className="film__chips">
            {stack.map((x) => <li className="film__chip" key={x}>{x}</li>)}
          </ul>
        </section>

        {/* DELIVERABLES */}
        <section id="deliverables" className="film__deliver">
          <div className="film__head">
            <h3>What you receive</h3>
            <p>Mastered assets ready for broadcast and social.</p>
          </div>
          <ul className="film__list film__list--cards">
            {deliverables.map((d) => <li key={d}><FaCheckCircle/> {d}</li>)}
          </ul>
        </section>

        {/* IMPACT */}
        <section id="metrics" className="film__kpis">
          <div className="film__head">
            <h3>Video ROI</h3>
            <p>Video is the highest converting medium. Here is what matters.</p>
          </div>
          <ul className="film__chips">
            {metrics.map((k) => <li key={k} className="film__chip">{k}</li>)}
          </ul>
        </section>

        {/* CTA */}
        <section id="cta" className="film__cta">
          <div className="film__cta-inner">
            <div className="film__cta-copy">
              <h3>Ready to roll camera?</h3>
              <p>Let's create a visual experience that defines your brand.</p>
            </div>
            <button className="btn btn--primary" onClick={() => navigate("/contact")}>
              Book a Shoot <FaAngleRight />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Filmmaking;