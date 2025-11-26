// Contact.jsx — Light, pro split layout with sticky rail + accessible form (10px root sizing)
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faLocationDot,
  faClock,
  faPaperPlane,
  faArrowRight,
  faCircleQuestion,
  faCheck,
  faLifeRing,
  faScrewdriverWrench,
  faFileInvoice,
} from "@fortawesome/free-solid-svg-icons";
import "./Contact.css";
import { useLocalContext } from "../../context/LocalContext";
import { useMessageContext } from "../../context/MessageContext";
import { toast } from "react-toastify";

const fx = (d = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: d, ease: "easeOut" },
  viewport: { once: true, amount: 0.2 },
});

export default function Contact() {
  const { webinfo = {} } = useLocalContext();
  const { addMessage } = useMessageContext();

  const phone = webinfo.phone || "";
  const phoneHref = webinfo.phonecall || phone || "";
  const email = webinfo.email || "";
  const address = webinfo.address || "Remote • India based";

  const [sending, setSending] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    website: "", // honeypot
  });

  const onChange = (e) =>
    setForm((f) => ({
      ...f,
      [e.target.name]: e.target.value,
    }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.website) return; // honeypot trap

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill out Name, Email, and Message.");
      return;
    }

    try {
      setSending(true);
      await addMessage({
        type: "contact",
        text: form.message.trim(),
        author: "user",
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        source: "contact-v4",
        meta: { subject: form.subject.trim() || null },
      });
      toast.success("Thanks! We’ll reply within a day.");
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        website: "",
      });
      window?.dataLayer?.push({ event: "contact_submit", origin: "contact-v4" });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const FaqItem = ({ i, q, a }) => {
    const open = faqOpen === i;
    return (
      <div className={`cv4-faq-item ${open ? "open" : ""}`}>
        <button
          className="cv4-faq-q"
          onClick={() => setFaqOpen(open ? null : i)}
          aria-expanded={open}
        >
          <FontAwesomeIcon icon={faCircleQuestion} />
          <span>{q}</span>
          <span className="cv4-faq-caret" aria-hidden="true">▾</span>
        </button>
        <div className="cv4-faq-a">
          <p>{a}</p>
        </div>
      </div>
    );
  };

  return (
    <section className="cv4-wrap" role="main">
      {/* HERO */}
      <header className="cv4-hero">
        <motion.div className="cv4-hero-copy" {...fx(0)}>
          <span className="cv4-pill">Let’s work together</span>
          <h1>Tell us what you’re building</h1>
          <p className="cv4-lead">
            Share a quick brief and we’ll respond with scope options, timelines, and the
            next right step—no fluff, just practical guidance.
          </p>
          <ul className="cv4-points" role="list">
            <li>
              <FontAwesomeIcon icon={faCheck} /> 24-hour response
            </li>
            <li>
              <FontAwesomeIcon icon={faCheck} /> Transparent pricing ranges
            </li>
            <li>
              <FontAwesomeIcon icon={faCheck} /> Friendly technical guidance
            </li>
          </ul>
        </motion.div>

        <motion.aside className="cv4-hero-rail" {...fx(0.05)}>
          <h3>Quick contact</h3>
          <ul className="cv4-contacts" role="list">
            <li>
              <span className="cv4-label">
                <FontAwesomeIcon icon={faPhone} /> Phone
              </span>
              <a
                href={phoneHref ? `tel:${phoneHref}` : "#"}
                aria-disabled={!phoneHref}
              >
                {phone || "—"}
              </a>
            </li>
            <li>
              <span className="cv4-label">
                <FontAwesomeIcon icon={faEnvelope} /> Email
              </span>
              <a href={email ? `mailto:${email}` : "#"} aria-disabled={!email}>
                {email || "—"}
              </a>
            </li>
            <li>
              <span className="cv4-label">
                <FontAwesomeIcon icon={faClock} /> Hours
              </span>
              <span>24 / 7</span>
            </li>
            <li>
              <span className="cv4-label">
                <FontAwesomeIcon icon={faLocationDot} /> Location
              </span>
              <span>{address}</span>
            </li>
          </ul>
          <a
            className="cv4-btn ghost full"
            href={email ? `mailto:${email}` : "#"}
            aria-disabled={!email}
          >
            Write an email <FontAwesomeIcon icon={faArrowRight} />
          </a>
        </motion.aside>
      </header>

      {/* SUPPORT STRIP */}
      <motion.section className="cv4-support" {...fx(0.1)}>
        <article>
          <span className="cv4-ico">
            <FontAwesomeIcon icon={faLifeRing} />
          </span>
          <h4>Sales</h4>
          <p>Ideas, quotes, timelines, and scope questions.</p>
        </article>
        <article>
          <span className="cv4-ico">
            <FontAwesomeIcon icon={faScrewdriverWrench} />
          </span>
          <h4>Tech</h4>
          <p>Integrations, APIs, performance, deployment.</p>
        </article>
        <article>
          <span className="cv4-ico">
            <FontAwesomeIcon icon={faFileInvoice} />
          </span>
          <h4>Billing</h4>
          <p>Invoices, renewals, vendor forms, NDAs.</p>
        </article>
      </motion.section>

      {/* MAIN GRID */}
      <div className="cv4-grid">
        {/* FORM */}
        <motion.section className="cv4-card" {...fx(0.12)}>
          <form onSubmit={onSubmit} noValidate>
            {/* Honeypot */}
            <input
              className="cv4-hp"
              type="text"
              name="website"
              value={form.website}
              onChange={onChange}
              tabIndex="-1"
              autoComplete="off"
              aria-hidden="true"
            />

            <div className="cv4-row">
              <div className="cv4-field">
                <label htmlFor="name">Your Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Jane Doe"
                  autoComplete="name"
                  inputMode="text"
                  value={form.name}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="cv4-field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jane@company.com"
                  autoComplete="email"
                  inputMode="email"
                  value={form.email}
                  onChange={onChange}
                  required
                />
              </div>
            </div>

            <div className="cv4-row">
              <div className="cv4-field">
                <label htmlFor="phone">Phone (optional)</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  autoComplete="tel"
                  inputMode="tel"
                  value={form.phone}
                  onChange={onChange}
                />
              </div>
              <div className="cv4-field">
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Project, question, or idea"
                  value={form.subject}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="cv4-field">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                rows="7"
                placeholder="Tell us a bit about what you need…"
                value={form.message}
                onChange={onChange}
                required
              />
            </div>

            <div className="cv4-actions">
              <button
                className="cv4-btn solid"
                type="submit"
                disabled={sending}
                aria-busy={sending}
              >
                <FontAwesomeIcon icon={faPaperPlane} />{" "}
                {sending ? "Sending…" : "Send message"}
              </button>
              <span className="cv4-note">We usually reply within one business day.</span>
            </div>
          </form>

          {/* FAQ */}
          <div className="cv4-faq">
            <h3>Questions people ask</h3>
            <FaqItem
              i={0}
              q="Can you share an estimate before a full brief?"
              a="Yes. Share a rough scope and we’ll send a ballpark with ranges and assumptions."
            />
            <FaqItem
              i={1}
              q="Do you work with WordPress and React both?"
              a="Yes. We recommend based on content needs, performance goals, and your in-house skills."
            />
            <FaqItem
              i={2}
              q="How soon can we start?"
              a="Discovery can start this week. Build slots depend on scope; we’ll propose realistic dates."
            />
          </div>
        </motion.section>

        {/* STICKY RAIL */}
        <motion.aside className="cv4-card cv4-rail" {...fx(0.16)}>
          <div className="cv4-rail-group">
            <h4>
              <FontAwesomeIcon icon={faPhone} /> Contact
            </h4>
            <a
              className="cv4-rail-link"
              href={phoneHref ? `tel:${phoneHref}` : "#"}
              aria-disabled={!phoneHref}
            >
              {phone || "—"}
            </a>
            <a
              className="cv4-rail-link"
              href={email ? `mailto:${email}` : "#"}
              aria-disabled={!email}
            >
              {email || "—"}
            </a>
          </div>

          <div className="cv4-rail-group">
            <h4>
              <FontAwesomeIcon icon={faLocationDot} /> Location
            </h4>
            <p className="cv4-rail-text">{address}</p>
          </div>

          <div className="cv4-rail-group">
            <h4>
              <FontAwesomeIcon icon={faClock} /> Hours
            </h4>
            <p className="cv4-rail-text">24 / 7</p>
          </div>

          <div className="cv4-rail-cta">
            <a
              className="cv4-btn ghost"
              href={email ? `mailto:${email}` : "#"}
              aria-disabled={!email}
            >
              Write an email <FontAwesomeIcon icon={faArrowRight} />
            </a>
          </div>
        </motion.aside>
      </div>

      {/* MAP (optional; easy to remove) */}
      <motion.div className="cv4-map" {...fx(0.2)}>
        <iframe
          title="Our location"
          src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1133.4349689740786!2d82.68855341570786!3d26.05460732842823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1755008614848!5m2!1sen!2sin`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </motion.div>
    </section>
  );
}
