// ContactFormPopup.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useMessageContext } from "../../context/MessageContext";
import "./ContactFormPopup.css";
import { toast } from "react-toastify";

const ContactFormPopup = () => {
  const { addMessage } = useMessageContext();

  const initialIsDesktop = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth >= 1280;
  }, []);

  const [isOpen, setIsOpen] = useState(false); // start closed; will open after 2s
  const [isDesktop, setIsDesktop] = useState(initialIsDesktop);
  const [submitting, setSubmitting] = useState(false);
  const hasAutoOpened = useRef(false); // guard to run auto-open only once
  const autoOpenTimer = useRef(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Keep desktop flag in sync on resize
  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 1280);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Auto-open after 2s (desktop only); run once
  useEffect(() => {
    if (hasAutoOpened.current) return;
    if (!isDesktop) return;
    autoOpenTimer.current = setTimeout(() => {
      setIsOpen(true);
      hasAutoOpened.current = true;
    }, 2000);
    return () => {
      if (autoOpenTimer.current) clearTimeout(autoOpenTimer.current);
    };
  }, [isDesktop]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Basic validation (HTML required still applies)
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      setSubmitting(true);
      // Save to context (and Firebase)
      const savedId = await addMessage({
        type: "contact",
        text: form.message.trim(),
        author: "user",
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        source: "contact-popup",
        meta: { fromPopup: true },
      });

      toast.success("Thanks! We’ll get back to you within a day.");
      // Reset + close
      setForm({ name: "", email: "", phone: "", message: "" });
      setIsOpen(false);
      console.log("Message saved with ID:", savedId);
    } catch (err) {
      console.error("Error saving message:", err);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {isOpen ? (
        <div
          className="contact-popup"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-popup-title"
        >
          <div className="contact-popup-header">
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <FontAwesomeIcon icon={faEnvelope} />
              <span id="contact-popup-title">Contact Us</span>
            </div>
            <button
              className="popup-close-btn"
              aria-label="Close contact form"
              onClick={() => setIsOpen(false)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          <div className="contact-popup-subhead">We’ll get back to you within a day.</div>

          <form className="contact-popup-form" onSubmit={onSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={onChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={onChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone (optional)"
              value={form.phone}
              onChange={onChange}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="4"
              value={form.message}
              onChange={onChange}
              required
            />

            {submitting ? (
              <button type="submit" disabled className="contact-submit-btn" style={{ opacity: 0.6 }}>
                <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: "0.6rem" }} />
                Sending Messages ...
              </button>
            ) : (
              <button type="submit" className="contact-submit-btn">
                <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: "0.6rem" }} />
                Send Message
              </button>
            )}

            <p className="contact-privacy">We respect your privacy. No spam—ever.</p>
          </form>
        </div>
      ) : (
        <button
          className="contact-popup-icon"
          aria-label="Open contact form"
          onClick={() => {
            // If user opens manually, mark as opened to stop the timer effect later
            hasAutoOpened.current = true;
            setIsOpen(true);
          }}
          title="Contact us"
        >
          <FontAwesomeIcon icon={faEnvelope} />
        </button>
      )}
    </>
  );
};

export default ContactFormPopup;
