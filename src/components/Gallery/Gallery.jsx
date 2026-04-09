import React, { useEffect, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaImages,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import "./Gallery.css";

const Gallery = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeItem, setActiveItem] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const q = query(collection(db, "gallery"), orderBy("sortOrder", "asc"));
        const snapshot = await getDocs(q);

        const data = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((item) => item.isVisible === true);

        setProjects(data);
      } catch (error) {
        console.error("Error fetching gallery:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const openModal = (item) => {
    setActiveItem(item);
    setActiveImageIndex(0);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setActiveItem(null);
    setActiveImageIndex(0);
    document.body.style.overflow = "";
  };

  const showPrev = () => {
    if (!activeItem?.images?.length) return;
    setActiveImageIndex((prev) =>
      prev === 0 ? activeItem.images.length - 1 : prev - 1
    );
  };

  const showNext = () => {
    if (!activeItem?.images?.length) return;
    setActiveImageIndex((prev) =>
      prev === activeItem.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className="gallery-section">
      <div className="gallery-bg-circle g-circle-1"></div>
      <div className="gallery-bg-circle g-circle-2"></div>

      <div className="gallery-container">
        <div className="gallery-header">
          <span className="gallery-badge">Our Recent Highlights</span>
          <h2>Moments, Milestones & Memories</h2>
          <p>
            Explore our recent events, recognitions, awards, and standout moments
            through a beautifully curated visual gallery.
          </p>
        </div>

        {loading && (
          <div className="gallery-loading-wrap">
            <div className="gallery-loading">Loading gallery...</div>
          </div>
        )}

        {!loading && projects.length === 0 && (
          <div className="gallery-loading-wrap">
            <div className="gallery-loading">No gallery items found.</div>
          </div>
        )}

        {!loading && projects.length > 0 && (
          <div className="gallery-grid">
            <AnimatePresence>
              {projects.map((project, index) => (
                <motion.article
                  key={project.id}
                  className="gallery-card"
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.55, delay: index * 0.06 }}
                  whileHover={{ y: -8 }}
                  onClick={() => openModal(project)}
                  layout
                >
                  <div className="card-image-box">
                    <img src={project.coverImage} alt={project.title} />

                    <div className="card-top-badges">
                      {project.eventDate ? (
                        <span className="card-date-badge">{project.eventDate}</span>
                      ) : null}

                      <span className="card-count-badge">
                        <FaImages />
                        {Array.isArray(project.images) ? project.images.length : 0}
                      </span>
                    </div>

                    <div className="card-overlay">
                      <div className="overlay-content">
                        <span className="overlay-pill">View Gallery</span>
                      </div>
                    </div>
                  </div>

                  <div className="card-info">
                    <h3>{project.title}</h3>
                    <p>
                      {project.description || "Click to explore this gallery item."}
                    </p>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <AnimatePresence>
        {activeItem && (
          <motion.div
            className="gallery-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="gallery-modal-backdrop" onClick={closeModal}></div>

            <motion.div
              className="gallery-modal-content"
              initial={{ scale: 0.96, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
            >
              <button className="gallery-close-btn" onClick={closeModal}>
                <FaTimes />
              </button>

              <div className="gallery-modal-left">
                <div className="gallery-modal-image-wrap">
                  <button className="gallery-arrow left" onClick={showPrev}>
                    <FaChevronLeft />
                  </button>

                  <img
                    src={activeItem.images?.[activeImageIndex] || activeItem.coverImage}
                    alt={activeItem.title}
                    className="gallery-modal-image"
                  />

                  <button className="gallery-arrow right" onClick={showNext}>
                    <FaChevronRight />
                  </button>
                </div>
              </div>

              <div className="gallery-modal-right">
                <div className="gallery-modal-meta">
                  {activeItem.eventDate ? (
                    <span className="gallery-modal-date">{activeItem.eventDate}</span>
                  ) : null}
                  <span className="gallery-modal-count">
                    {Array.isArray(activeItem.images) ? activeItem.images.length : 0} Photos
                  </span>
                </div>

                <h3>{activeItem.title}</h3>
                <p>{activeItem.description || "No description added."}</p>

                <div className="gallery-thumb-row">
                  {activeItem.images?.map((img, idx) => (
                    <button
                      key={idx}
                      className={`gallery-thumb ${idx === activeImageIndex ? "active" : ""}`}
                      onClick={() => setActiveImageIndex(idx)}
                    >
                      <img src={img} alt={`${activeItem.title} ${idx + 1}`} />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;