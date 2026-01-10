import React, { useState } from "react";
import { FaExternalLinkAlt, FaFileAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "./Gallery.css";

const Gallery = () => {
  // Static Project Data
  const projects = [
    {
      id: 1,
      title: "Neon Brand Identity",
      category: "Branding",
      image:
        "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800",
      link: "#",
      docLink: "#",
    },
    {
      id: 2,
      title: "Fintech App UI/UX",
      category: "UI Design",
      image:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800",
      link: "#",
      docLink: "",
    },
    {
      id: 3,
      title: "Eco E-commerce",
      category: "Web Dev",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
      link: "#",
      docLink: "#",
    },
    {
      id: 4,
      title: "Modern Architecture",
      category: "Photography",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
      link: "#",
      docLink: "",
    },
    {
      id: 5,
      title: "Social Media Campaign",
      category: "Marketing",
      image:
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800",
      link: "#",
      docLink: "#",
    },
    {
      id: 6,
      title: "Crypto Dashboard",
      category: "UI Design",
      image:
        "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?auto=format&fit=crop&q=80&w=800",
      link: "#",
      docLink: "",
    },
  ];

  return (
    <section className="gallery-section">
      {/* Background Decor */}
      <div className="gallery-bg-circle g-circle-1"></div>
      <div className="gallery-bg-circle g-circle-2"></div>

      <div className="gallery-container">
        <div className="gallery-header">
          <span className="gallery-badge">Our Portfolio</span>
          <h2>Crafting Digital Excellence</h2>
          <p>
            A curated selection of our best work. Where strategy meets stunning
            design.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="gallery-grid">
          <AnimatePresence>
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="gallery-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                layout
              >
                <div className="card-image-box">
                  <img src={project.image} alt={project.title} />
                  
                  {/* Hover Overlay */}
                  <div className="card-overlay">
                    <div className="overlay-content">
                        <span className="overlay-category">{project.category}</span>
                        <div className="overlay-actions">
                            {project.link && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noreferrer"
                                className="overlay-btn"
                                title="View Live"
                            >
                                <FaExternalLinkAlt />
                            </a>
                            )}
                            {project.docLink && (
                            <a
                                href={project.docLink}
                                target="_blank"
                                rel="noreferrer"
                                className="overlay-btn secondary"
                                title="View Document"
                            >
                                <FaFileAlt />
                            </a>
                            )}
                        </div>
                    </div>
                  </div>
                </div>
                
                <div className="card-info">
                  <h3>{project.title}</h3>
                  <span className="info-category">{project.category}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Gallery;