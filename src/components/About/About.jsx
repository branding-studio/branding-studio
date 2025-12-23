import React, { useState } from "react";
import "./About.css";
import {
  FaArrowRight,
  FaBolt,
  FaChartLine,
  FaCogs,
  FaHandshake,
  FaBullseye,
  FaLightbulb,
  FaLaptopCode,
  FaUsers,
  FaCheckCircle,
  FaShieldAlt,
  FaAward,
  FaQuestionCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useLocalContext } from "../../context/LocalContext";

const fade = (d = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10% 0px -10% 0px" },
  transition: { duration: 0.55, ease: "easeOut", delay: d },
});

const About = () => {
  const { webinfo = {} } = useLocalContext();
  const brand = webinfo?.name || "Our Brand";

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState(null);

  const osCards = [
    {
      icon: <FaChartLine />,
      title: "Insight → Strategy",
      desc:
        "We convert market and customer signals into a clear positioning and channel plan.",
      tags: ["ICP", "Messaging", "Channel mix"],
      color: "#1e40af",
    },
    {
      icon: <FaCogs />,
      title: "Enable → Launch",
      desc:
        "Creative, tracking, and ops wired up for fast, reliable test cycles across the funnel.",
      tags: ["Creative system", "Clean data", "Playbooks"],
      color: "#0ea5e9",
    },
    {
      icon: <FaBullseye />,
      title: "Measure → Learn",
      desc:
        "We prove what works with incrementality and iterate with ruthless focus on ROI.",
      tags: ["KPI rigor", "A/B & holdouts", "Attribution"],
      color: "#10b981",
    },
    {
      icon: <FaBolt />,
      title: "Scale → Systemize",
      desc:
        "Wins become repeatable processes—documented, automated, and predictable.",
      tags: ["SOPs", "Automation", "Forecasting"],
      color: "#f59e0b",
    },
  ];

  const differentiators = [
    { icon: <FaShieldAlt />, title: "Transparency-first", desc: "Clear budgets, clear KPIs, clear reporting—every sprint." },
    { icon: <FaLightbulb />, title: "Creative with context", desc: "Ideas shaped by data, not guesswork or trends." },
    { icon: <FaLaptopCode />, title: "Tech-forward ops", desc: "AI-assisted workflows, quality control, and speed." },
    { icon: <FaHandshake />, title: "Aligned incentives", desc: "We optimize for profitable growth—not impressions." },
  ];

  const testimonials = [
    {
      quote:
        "They built a growth system we could actually run. Clarity improved, CAC dropped, and the pipeline became predictable.",
      author: "Head of Growth, SaaS",
    },
    {
      quote:
        "We went from scattered campaigns to a single roadmap with weekly insights. The difference in momentum is night and day.",
      author: "Founder, D2C",
    },
    {
      quote:
        "Their discipline in testing and documentation means our wins keep compounding. It’s not just a campaign—it’s an engine.",
      author: "CMO, Services",
    },
  ];

  const stats = [
    { value: "8+", label: "Years Operating" },
    { value: "97%", label: "Client Retention" },
    { value: "1.2K+", label: "Campaigns Shipped" },
    { value: "50M+", label: "Qualified Reach" },
  ];

  const faqs = [
    {
      q: "What will the first 30 days look like?",
      a: "Discovery, data audit, strategy alignment, measurement plan, and a first test wave across 1–2 channels with weekly insights.",
    },
    {
      q: "How do you report performance?",
      a: "We tie spend to revenue using agreed KPIs, clean tracking, experimentation logs, and short weekly debriefs.",
    },
    {
      q: "Do you work with in-house teams?",
      a: "Yes. We integrate with your team, fill gaps, and leave behind playbooks so the system keeps running.",
    },
    {
      q: "How fast do results show up?",
      a: "Most clients see meaningful signals in under 30 days; compounding efficiency typically appears in 60–90 days.",
    },
  ];

  return (
    <section className="about-v3">
      {/* HERO */}
      <motion.header className="hero-v3" {...fade()}>
        <div className="hero-wrap">
          <span className="pill">About {brand}</span>
          <h1>
            We turn marketing into a <span className="focus">repeatable growth system</span>.
          </h1>
          <p className="lead">
            Fewer moving parts, stronger signals, and a roadmap you can trust. From
            strategy to scale, we build engines that compound.
          </p>
          <div className="cta-row">
            <a href="/contact" className="btn btn-primary">
              Start a discovery <FaArrowRight />
            </a>
            <a href="/pricing" className="btn btn-quiet">
              View pricing
            </a>
          </div>

          <div className="facts">
            <div className="fact">
              <strong>3–5x</strong>
              <span>Typical ROAS lift</span>
            </div>
            <div className="fact">
              <strong>&lt;30d</strong>
              <span>First meaningful wins</span>
            </div>
            <div className="fact">
              <strong>End-to-end</strong>
              <span>Strategy → Ops</span>
            </div>
          </div>
        </div>
      </motion.header>

      {/* SNAPSHOT STRIP */}
      <motion.section className="snapshot" {...fade(0.05)}>
        <div className="chip"><FaAward /> Outcome-driven SOWs</div>
        <div className="chip"><FaCheckCircle /> Weekly insight loops</div>
        <div className="chip"><FaShieldAlt /> Clean data & QA</div>
        <div className="chip"><FaUsers /> In-house friendly</div>
      </motion.section>

      {/* JOURNEY TIMELINE (Mission, Vision, Values) */}
      <motion.section className="timeline" {...fade(0.1)}>
        <h2>Our journey to outcomes</h2>
        <ol className="steps">
          <li>
            <div className="dot" />
            <div className="step-body">
              <h3>Mission</h3>
              <p>
                Turn spend into growth with disciplined experimentation, KPI rigor, and fast execution.
              </p>
            </div>
          </li>
          <li>
            <div className="dot" />
            <div className="step-body">
              <h3>Vision</h3>
              <p>
                Marketing that feels like a growth engine—reliable, repeatable, and easy to scale.
              </p>
            </div>
          </li>
          <li>
            <div className="dot" />
            <div className="step-body">
              <h3>Values</h3>
              <p>
                Clarity over complexity, speed with craftsmanship, and integrity in data and delivery.
              </p>
            </div>
          </li>
        </ol>
      </motion.section>

      {/* OPERATING SYSTEM GRID */}
      <motion.section className="os-grid" {...fade(0.15)}>
        <h2>The operating system for growth</h2>
        <p className="lead">
          Four workstreams that plug into your team and compound over time.
        </p>
        <div className="grid">
          {osCards.map((c, i) => (
            <motion.article className="os-card" key={i} whileHover={{ y: -4 }}>
              <div className="os-icon" style={{ backgroundColor: c.color }}>
                {c.icon}
              </div>
              <h4>{c.title}</h4>
              <p>{c.desc}</p>
              <div className="tags">
                {c.tags.map((t) => (
                  <span className="tag" key={t}>{t}</span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>

      {/* DIFFERENTIATORS */}
      <motion.section className="diff" {...fade(0.2)}>
        <h2>What makes us different</h2>
        <div className="diff-list">
          {differentiators.map((d, i) => (
            <div className="diff-item" key={i}>
              <div className="diff-icon">{d.icon}</div>
              <div className="diff-copy">
                <h5>{d.title}</h5>
                <p>{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* METRICS RIBBON */}
      <motion.section className="ribbon" {...fade(0.25)}>
        {stats.map((s) => (
          <div key={s.label} className="kpi">
            <div className="kpi-value">{s.value}</div>
            <div className="kpi-label">{s.label}</div>
          </div>
        ))}
      </motion.section>

      {/* TESTIMONIALS (text-only) */}
      <motion.section className="testimonials" {...fade(0.3)}>
        <h2>What partners say</h2>
        <div className="quotes">
          {testimonials.map((t, i) => (
            <blockquote key={i} className="quote">
              <p>“{t.quote}”</p>
              <footer>— {t.author}</footer>
            </blockquote>
          ))}
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section className="faq" {...fade(0.35)}>
        <h2>Frequently asked</h2>
        <div className="faq-list">
          {faqs.map((f, i) => {
            const open = openFaq === i;
            return (
              <div
                key={i}
                className={`faq-item ${open ? "open" : ""}`}
                role="button"
                tabIndex={0}
                onClick={() => setOpenFaq(open ? null : i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setOpenFaq(open ? null : i);
                }}
                aria-expanded={open}
              >
                <div className="faq-q">
                  <FaQuestionCircle />
                  <span>{f.q}</span>
                </div>
                <div className="faq-a">
                  <p>{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section className="cta" {...fade(0.4)}>
        <div className="cta-inner">
          <div>
            <h3>Ready to design a 90-day growth plan?</h3>
            <p className="muted">
              We’ll map the highest-leverage bets and how to test them—fast.
            </p>
          </div>
          <div className="cta-actions">
            <a href="/contact" className="btn btn-primary">
              Book a call <FaArrowRight />
            </a>
            <a href="/case-studies" className="btn btn-quiet">
              See case studies
            </a>
          </div>
        </div>
      </motion.section>
    </section>
  );
};

export default About;
