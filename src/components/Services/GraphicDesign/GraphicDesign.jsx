import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPenNib,
  FaLayerGroup,
  FaPalette,
  FaVectorSquare,
  FaImage,
  FaDesktop,
  FaBookOpen,
  FaBezierCurve,
  FaCheckCircle,
  FaAngleRight,
  FaShapes,
  FaWhatsapp,
  FaPlayCircle,
} from "react-icons/fa";
import "./GraphicDesign.css";
import { useLocalContext } from "../../../context/LocalContext";

const GraphicDesign = () => {
  const navigate = useNavigate();
  const { openWhatsApp, getWhatsAppUrl } = useLocalContext();

  const [sampleFilter, setSampleFilter] = useState("all");

  /** ===== Samples ===== */
  const samples = [
    {
      id: 1,
      type: "photo",
      title: "Premium Poster Design",
      category: "Poster Creative",
      thumb: "/assets/samples/design-photo-1.jpg",
      link: "/assets/samples/design-photo-1.jpg",
    },
    {
      id: 2,
      type: "photo",
      title: "Brand Identity Board",
      category: "Branding",
      thumb: "/assets/samples/design-photo-2.jpg",
      link: "/assets/samples/design-photo-2.jpg",
    },
    {
      id: 3,
      type: "video",
      title: "Logo Reveal Animation",
      category: "Motion Design",
      thumb: "/assets/samples/design-video-1.jpg",
      link: "https://www.youtube.com/",
    },
    {
      id: 4,
      type: "photo",
      title: "Social Media Creative Set",
      category: "Social Kit",
      thumb: "/assets/samples/design-photo-3.jpg",
      link: "/assets/samples/design-photo-3.jpg",
    },
    {
      id: 5,
      type: "video",
      title: "UI Walkthrough Preview",
      category: "UI Showcase",
      thumb: "/assets/samples/design-video-2.jpg",
      link: "https://www.youtube.com/",
    },
    {
      id: 6,
      type: "photo",
      title: "Packaging Mockup",
      category: "Packaging Design",
      thumb: "/assets/samples/design-photo-4.jpg",
      link: "/assets/samples/design-photo-4.jpg",
    },
  ];

  const filteredSamples =
    sampleFilter === "all"
      ? samples
      : samples.filter((item) => item.type === sampleFilter);

  /** ===== Services ===== */
  const services = [
    {
      icon: <FaPenNib />,
      title: "Brand Identity",
      copy: "More than just a logo. We build cohesive visual systems: typography, color palettes, and voice guides.",
      bullets: ["Logo design", "Brand guidelines", "Visual strategy"],
    },
    {
      icon: <FaDesktop />,
      title: "UI/UX Design",
      copy: "User-centric interfaces for web and mobile. We design clean, accessible, and high-converting experiences.",
      bullets: ["Wireframing", "High-fidelity UI", "Interactive prototypes"],
    },
    {
      icon: <FaLayerGroup />,
      title: "Social Media Kits",
      copy: "Stop the scroll with consistent, on-brand creatives for Instagram, LinkedIn, and Twitter.",
      bullets: ["Post templates", "Story assets", "Carousel design"],
    },
    {
      icon: <FaBookOpen />,
      title: "Marketing Print",
      copy: "Tangible assets that leave a mark. Brochures, flyers, and business cards ready for high-quality print.",
      bullets: ["Brochures & Flyers", "Packaging design", "Event signage"],
    },
    {
      icon: <FaVectorSquare />,
      title: "Vector Illustration",
      copy: "Custom iconography and illustrations to replace generic stock photos and own your unique look.",
      bullets: ["Icon sets", "Character design", "Isometrics"],
    },
    {
      icon: <FaImage />,
      title: "Photo Manipulation",
      copy: "High-end retouching, composites, and product mockups that make your inventory look professional.",
      bullets: ["Product editing", "Compositing", "Color correction"],
    },
    {
      icon: <FaBezierCurve />,
      title: "Presentation Design",
      copy: "Pitch decks and sales presentations that keep audiences engaged and communicate value clearly.",
      bullets: ["Pitch decks", "Data visualization", "Template systems"],
    },
    {
      icon: <FaShapes />,
      title: "Packaging Design",
      copy: "Shelf-popping structural design and labeling that communicates quality and complies with regulations.",
      bullets: ["Label design", "Box die-cuts", "3D Mockups"],
    },
  ];

  /** ===== Scope ===== */
  const scope = [
    {
      title: "Brand Strategy",
      bullets: [
        "Market research",
        "Competitor visual audit",
        "Moodboarding",
        "Tone of voice",
      ],
    },
    {
      title: "Digital Assets",
      bullets: [
        "Social media templates",
        "Email newsletter design",
        "Web banners/ads",
        "App icons",
      ],
    },
    {
      title: "Print Collateral",
      bullets: [
        "Stationery (Cards, Letterheads)",
        "Merchandise",
        "Large format (Billboards)",
        "Packaging",
      ],
    },
    {
      title: "User Interface",
      bullets: [
        "Design systems",
        "Component libraries",
        "Responsive layouts",
        "Accessibility checks",
      ],
    },
    {
      title: "Maintenance",
      bullets: [
        "Asset management",
        "Template updates",
        "Regular creative refreshes",
      ],
    },
  ];

  /** ===== Tiers ===== */
  const tiers = [
    { tier: "Startup", desc: "Essential identity & social kit" },
    { tier: "Growth", desc: "Full web UI & marketing collateral" },
    { tier: "Enterprise", desc: "Comprehensive design system & retainer" },
  ];

  const stack = [
    "Adobe Photoshop",
    "Adobe Illustrator",
    "Figma",
    "Adobe InDesign",
    "Canva (Client Handoff)",
    "After Effects",
    "Sketch",
    "Procreate",
  ];

  const steps = [
    {
      t: "Brief",
      d: "Understanding your audience, goals, and aesthetic preferences.",
    },
    { t: "Research", d: "Competitor analysis and visual moodboarding." },
    { t: "Concept", d: "Drafting initial sketches and exploring directions." },
    { t: "Iterate", d: "Refining the chosen concept based on your feedback." },
    {
      t: "Polish",
      d: "Final detailing, color proofing, and accessibility checks.",
    },
    { t: "Handoff", d: "Delivery of all source files and exported assets." },
  ];

  const deliverables = [
    "Source files (AI, PSD, FIG)",
    "Print-ready PDFs (CMYK)",
    "Web-optimized assets (SVG, WEBP)",
    "Brand Guidelines Book",
    "Social Media Template files",
    "Font & Asset licenses",
    "Mockups for usage context",
  ];

  const metrics = [
    "Brand Consistency",
    "Click-Through Rate (Ads)",
    "Engagement Lift",
    "Visual Recall",
    "Conversion Rate (UI)",
    "Print Quality Accuracy",
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
    scope: "Design Scope",
    tiers: "Tiers",
    process: "Process",
    stack: "Toolkit",
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
    if (typeof window !== "undefined" && window.history?.replaceState) {
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  const whatsappHref = getWhatsAppUrl
    ? getWhatsAppUrl({
        message: "Hi! I am interested in Graphic Design services.",
        preferApp: false,
      })
    : "#";

  return (
    <main className="design_services">
      <aside className="design__rail" aria-label="Page sections">
        <div className="rail__brand">
          <div className="rail__logo">DSGN</div>
          <div>
            <strong>Graphic Design</strong>
            <small>Visuals + Strategy</small>
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
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (openWhatsApp) {
                e.preventDefault();
                openWhatsApp({
                  message: "Hi! I am interested in Graphic Design services.",
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

      <div className="design__main">
        <header className="design__hero">
          <span className="design__eyebrow">Creative & Visual Strategy</span>
          <h1>
            Design that speaks. <br />
            Identity that sells.
          </h1>
          <p>
            From pixel-perfect UI to print-ready packaging. We craft visual
            systems that elevate your brand authority and drive engagement.
          </p>

          <div className="design__hero-cta">
            <button
              className="btn btn--primary"
              onClick={() => navigate("/contact")}
            >
              Start a Project <FaAngleRight />
            </button>
          </div>
        </header>

        <section id="samples" className="design__samples">
          <div className="design__head">
            <h3>Our Work Samples</h3>
            <p>
              Explore selected branding work, poster creatives, social design
              kits, packaging mockups, and motion-based visual samples.
            </p>
          </div>

          <div className="design__sample-filters">
            <button
              className={`design__filter-btn ${sampleFilter === "all" ? "is-active" : ""}`}
              onClick={() => setSampleFilter("all")}
            >
              All
            </button>
            <button
              className={`design__filter-btn ${sampleFilter === "video" ? "is-active" : ""}`}
              onClick={() => setSampleFilter("video")}
            >
              Videos
            </button>
            <button
              className={`design__filter-btn ${sampleFilter === "photo" ? "is-active" : ""}`}
              onClick={() => setSampleFilter("photo")}
            >
              Photos
            </button>
          </div>

          <div className="design__samples-grid">
            {filteredSamples.map((item) => (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="design__sample-card"
              >
                <div className="design__sample-thumb">
                  <img src={item.thumb} alt={item.title} />
                  <div className="design__sample-overlay">
                    {item.type === "video" ? <FaPlayCircle /> : <FaImage />}
                  </div>
                </div>

                <div className="design__sample-content">
                  <span className="design__sample-type">{item.category}</span>
                  <h4>{item.title}</h4>
                  <button type="button" className="design__sample-btn">
                    {item.type === "video" ? "Watch Sample" : "View Sample"}
                  </button>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="services" className="design__grid">
          {services.map((s) => (
            <article key={s.title} className="design__card">
              <div className="design__card-head">
                <div className="design__icon">{s.icon}</div>
                <h2>{s.title}</h2>
              </div>
              <p className="design__copy">{s.copy}</p>
              <ul className="design__list">
                {s.bullets.map((b) => (
                  <li key={b}>
                    <FaCheckCircle /> {b}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section id="scope" className="design__scope">
          <div className="design__head">
            <h3>Design Capabilities</h3>
            <p>
              A full-spectrum studio handling everything from initial concept to
              final production.
            </p>
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

        <section id="tiers" className="design__influencer">
          <div className="design__head">
            <h3>Engagement Models</h3>
            <p>
              Flexible options suited for startups, scale-ups, and enterprise
              needs.
            </p>
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

        <section id="process" className="design__process">
          <div className="design__head">
            <h3>Creative Process</h3>
            <p>From chaos to clarity: how we bring ideas to life.</p>
          </div>
          <ol className="design__steps">
            {steps.map((s, i) => (
              <li key={s.t} className="design__step">
                <span className="design__num">{i + 1}</span>
                <div>
                  <h4>{s.t}</h4>
                  <p>{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="stack" className="design__stack">
          <div className="design__head">
            <h3>Industry Standard Tools</h3>
            <p>
              We use the best tools to ensure compatibility and scalability.
            </p>
          </div>
          <ul className="design__chips">
            {stack.map((x) => (
              <li className="design__chip" key={x}>
                {x}
              </li>
            ))}
          </ul>
        </section>

        <section id="deliverables" className="design__deliver">
          <div className="design__head">
            <h3>What you receive</h3>
            <p>organized, editable, and ready-to-use assets.</p>
          </div>
          <ul className="design__list design__list--cards">
            {deliverables.map((d) => (
              <li key={d}>
                <FaCheckCircle /> {d}
              </li>
            ))}
          </ul>
          <div className="design__deliver-cta">
            <button
              className="btn btn--primary"
              onClick={() => navigate("/contact")}
            >
              View File Standards <FaAngleRight />
            </button>
          </div>
        </section>

        <section id="metrics" className="design__kpis">
          <div className="design__head">
            <h3>Design Impact</h3>
            <p>Great design isn't just decoration; it drives metrics.</p>
          </div>
          <ul className="design__chips">
            {metrics.map((k) => (
              <li key={k} className="design__chip">
                {k}
              </li>
            ))}
          </ul>
        </section>

        <section id="cta" className="design__cta">
          <div className="design__cta-inner">
            <div className="design__cta-copy">
              <h3>Ready to upgrade your brand?</h3>
              <p>
                Tell us your vision—we'll create the visuals that tell your
                story.
              </p>
            </div>
            <button
              className="btn btn--primary"
              onClick={() => navigate("/contact")}
            >
              Contact Design Team <FaAngleRight />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default GraphicDesign;