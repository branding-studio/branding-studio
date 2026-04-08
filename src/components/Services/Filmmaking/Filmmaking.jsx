import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaVideo,
  FaFilm,
  FaMicrophoneAlt,
  FaPhotoVideo,
  FaMagic,
  FaCheckCircle,
  FaWhatsapp,
  FaAngleRight,
  FaCamera,
  FaPlayCircle,
  FaImage,
} from "react-icons/fa";
import "./Filmmaking.css";
import { useLocalContext } from "../../../context/LocalContext";

const Filmmaking = () => {
  const navigate = useNavigate();
  const { openWhatsApp, getWhatsAppUrl } = useLocalContext();

  /** ===== Samples ===== */
  const [sampleFilter, setSampleFilter] = useState("all");

  const samples = [
    {
      id: 1,
      type: "video",
      title: "Fashion Brand Ad Film",
      category: "Ad Film",
      thumb: "/assets/samples/film-video-1.jpg",
      link: "https://www.youtube.com/",
    },
    {
      id: 2,
      type: "video",
      title: "Restaurant Promo Reel",
      category: "Promo Reel",
      thumb: "/assets/samples/film-video-2.jpg",
      link: "https://www.youtube.com/",
    },
    {
      id: 3,
      type: "photo",
      title: "Product Shoot Setup",
      category: "Behind the Scenes",
      thumb: "/assets/samples/film-photo-1.jpg",
      link: "/assets/samples/film-photo-1.jpg",
    },
    {
      id: 4,
      type: "photo",
      title: "Brand Campaign Still",
      category: "Campaign Visual",
      thumb: "/assets/samples/film-photo-2.jpg",
      link: "/assets/samples/film-photo-2.jpg",
    },
    {
      id: 5,
      type: "video",
      title: "Corporate Introduction Film",
      category: "Corporate Film",
      thumb: "/assets/samples/film-video-3.jpg",
      link: "https://www.youtube.com/",
    },
    {
      id: 6,
      type: "photo",
      title: "Lighting & Set Direction",
      category: "Production Still",
      thumb: "/assets/samples/film-photo-3.jpg",
      link: "/assets/samples/film-photo-3.jpg",
    },
  ];

  const filteredSamples =
    sampleFilter === "all"
      ? samples
      : samples.filter((item) => item.type === sampleFilter);

  /** ===== Services ===== */
  const services = [
    {
      icon: <FaFilm />,
      title: "Ad Films & TVCs",
      copy: "High-impact commercials designed to grab attention in the first 3 seconds and drive brand recall.",
      bullets: ["Script to Screen", "TV & Social formats", "High-end production"],
    },
    {
      icon: <FaVideo />,
      title: "Corporate Films",
      copy: "Tell your company's story. We produce interviews, office tours, and culture videos that build trust.",
      bullets: ["Founder interviews", "Company profiles", "CSR documentation"],
    },
    {
      icon: <FaCamera />,
      title: "Product Cinematography",
      copy: "Make your product the hero. Studio-grade lighting and motion control to showcase details flawlessly.",
      bullets: ["360° rotation", "Macro shots", "Lifestyle integration"],
    },
    {
      icon: <FaPhotoVideo />,
      title: "Event Coverage",
      copy: "Capture the energy of your events. We turn conferences and launch parties into dynamic highlight reels.",
      bullets: ["Multi-cam setup", "Same-day edits", "Live streaming"],
    },
    {
      icon: <FaMagic />,
      title: "VFX & Motion Graphics",
      copy: "Add that extra layer of magic. From simple title animations to complex 3D compositing.",
      bullets: ["2D/3D Animation", "Green screen keying", "Logo intros"],
    },
    {
      icon: <FaMicrophoneAlt />,
      title: "Sound Design",
      copy: "Audio is half the experience. We provide professional voiceovers, foley, and licensed scores.",
      bullets: ["Voiceover recording", "Audio mixing", "SFX libraries"],
    },
  ];

  /** ===== Scope ===== */
  const scope = [
    {
      title: "Pre-Production",
      bullets: [
        "Scriptwriting",
        "Storyboarding",
        "Location scouting",
        "Casting & Crewing",
      ],
    },
    {
      title: "Production",
      bullets: [
        "4K/6K Cinema Cameras",
        "Professional Lighting",
        "Directing",
        "Set Design",
      ],
    },
    {
      title: "Post-Production",
      bullets: [
        "Offline/Online Editing",
        "Color Grading (DI)",
        "Sound Mixing",
        "VFX & CGI",
      ],
    },
    {
      title: "Delivery",
      bullets: [
        "Multi-format export",
        "Social cuts (9:16)",
        "Broadcast standards",
        "Archival",
      ],
    },
  ];

  /** ===== Tiers ===== */
  const tiers = [
    { tier: "Social", desc: "Reels & Shorts for rapid growth" },
    { tier: "Brand", desc: "High-value Ads & Corporate films" },
    { tier: "Cinema", desc: "Documentaries & TV Commercials" },
  ];

  const stack = [
    "Adobe Premiere Pro",
    "DaVinci Resolve",
    "After Effects",
    "Final Cut Pro",
    "Cinema 4D",
    "RED / Arri Cameras",
    "Sony FX Series",
  ];

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

  const metrics = [
    "Viewer Retention",
    "Brand Recall",
    "Shareability",
    "Conversion Rate",
    "Click-Through Rate",
    "Watch Time",
  ];

  /* ===== Sticky rail / scroll-spy ===== */
  const ids = useMemo(
    () => [
      "samples",
      "services",
      "scope",
      "tiers",
      "process",
      "stack",
      "deliverables",
      "metrics",
      "cta",
    ],
    []
  );

  const labels = {
    samples: "Samples",
    services: "Services",
    scope: "Production Scope",
    tiers: "Packages",
    process: "Process",
    stack: "Gear & Soft",
    deliverables: "Deliverables",
    metrics: "Impact",
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
  };

  const whatsappHref = getWhatsAppUrl
    ? getWhatsAppUrl({
        message: "Hi! I am interested in filmmaking services.",
        preferApp: false,
      })
    : "#";

  return (
    <main className="film_services">
      <aside className="film__rail" aria-label="Page sections">
        <div className="rail__brand">
          <div className="rail__logo">CC</div>
          <div>
            <strong>Content Creation</strong>
            <small>Photo • Video • Reels</small>
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
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (openWhatsApp) {
                e.preventDefault();
                openWhatsApp({
                  message: "Hi! I am interested in content creation services.",
                });
              }
            }}
          >
            <FaWhatsapp /> <span>Talk on WhatsApp</span>
          </a>
        </div>
      </aside>

      <div className="film__main">
        <header className="film__hero">
          <span className="film__eyebrow">Content Creation & Production</span>
          <h1>
            Content that captures.
            <br />
           Visuals that convert.
          </h1>
          <p>
            From reels and ad shoots to product photos, promo videos, and branded
            campaigns — we create high-impact content that helps your brand stand
            out and perform across platforms.
          </p>

          <div className="film__hero-cta">
            <button
              className="btn btn--primary"
              onClick={() => navigate("/contact")}
            >
              Start Content Project <FaAngleRight />
            </button>
          </div>
        </header>

        <section id="samples" className="film__samples">
          <div className="film__head">
            <h3>Our Content Samples</h3>
            <p>
              Explore selected photo and video samples including reels, ad shoots,
              product visuals, promo edits, and branded campaign content.
            </p>
          </div>

          <div className="film__sample-filters">
            <button
              className={`film__filter-btn ${sampleFilter === "all" ? "is-active" : ""}`}
              onClick={() => setSampleFilter("all")}
            >
              All
            </button>
            <button
              className={`film__filter-btn ${sampleFilter === "video" ? "is-active" : ""}`}
              onClick={() => setSampleFilter("video")}
            >
              Videos
            </button>
            <button
              className={`film__filter-btn ${sampleFilter === "photo" ? "is-active" : ""}`}
              onClick={() => setSampleFilter("photo")}
            >
              Photos
            </button>
          </div>

          <div className="film__samples-grid">
            {filteredSamples.map((item) => (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="film__sample-card"
              >
                <div className="film__sample-thumb">
                  <img src={item.thumb} alt={item.title} />
                  <div className="film__sample-overlay">
                    {item.type === "video" ? <FaPlayCircle /> : <FaImage />}
                  </div>
                </div>

                <div className="film__sample-content">
                  <span className="film__sample-type">{item.category}</span>
                  <h4>{item.title}</h4>
                  <button type="button" className="film__sample-btn">
                    {item.type === "video" ? "Watch Sample" : "View Sample"}
                  </button>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="services" className="film__grid">
          {services.map((s) => (
            <article key={s.title} className="film__card">
              <div className="film__card-head">
                <div className="film__icon">{s.icon}</div>
                <h2>{s.title}</h2>
              </div>
              <p className="film__copy">{s.copy}</p>
              <ul className="film__list">
                {s.bullets.map((b) => (
                  <li key={b}>
                    <FaCheckCircle /> {b}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section id="scope" className="film__scope">
          <div className="film__head">
            <h3>Content Capabilities</h3>
            <p>End-to-end planning, shooting, editing, and delivery for modern brand content.</p>
          </div>
          <div className="scope__grid">
            {scope.map((g) => (
              <article key={g.title} className="scope__card">
                <h4>{g.title}</h4>
                <ul>
                  {g.bullets.map((b) => (
                    <li key={b}>
                      <FaCheckCircle /> <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="tiers" className="film__influencer">
          <div className="film__head">
            <h3>Content Packages</h3>
            <p>Flexible content solutions for startups, growing brands, and enterprise campaigns.</p>
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

        <section id="process" className="film__process">
          <div className="film__head">
            <h3>How We Create</h3>
            <p>A clear workflow for planning, producing, and delivering high-performing content.</p>
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

        <section id="stack" className="film__stack">
          <div className="film__head">
            <h3>Tools, Gear & Editing Stack</h3>
            <p>
              We use professional cameras, lighting, and editing tools to create polished content for every platform.
            </p>
          </div>
          <ul className="film__chips">
            {stack.map((x) => (
              <li className="film__chip" key={x}>
                {x}
              </li>
            ))}
          </ul>
        </section>

        <section id="deliverables" className="film__deliver">
          <div className="film__head">
            <h3>What you receive</h3>
            <p>Final content assets ready for social media, ads, websites, and brand campaigns.</p>
          </div>
          <ul className="film__list film__list--cards">
            {deliverables.map((d) => (
              <li key={d}>
                <FaCheckCircle /> {d}
              </li>
            ))}
          </ul>
        </section>

        <section id="metrics" className="film__kpis">
          <div className="film__head">
            <h3>Content Performance</h3>
            <p>Great content should do more than look good — it should drive attention, engagement, and action.</p>
          </div>
          <ul className="film__chips">
            {metrics.map((k) => (
              <li key={k} className="film__chip">
                {k}
              </li>
            ))}
          </ul>
        </section>

        <section id="cta" className="film__cta">
          <div className="film__cta-inner">
            <div className="film__cta-copy">
              <h3>Ready to create standout content?</h3>
              <p>Let’s build photo and video content that strengthens your brand and drives results.</p>
            </div>
            <button
              className="btn btn--primary"
              onClick={() => navigate("/contact")}
            >
              Book a Content Call<FaAngleRight />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Filmmaking;