import React from "react";
import "./Ourteam.css";

const defaultMembers = [
  {
    name: "Aisha Sharma",
    role: "Lead Instructor",
    bio: "Designs engaging assessments and mentors the content crew.",
    email: "aisha@example.com",
    links: { linkedin: "#", github: "#" },
  },
  {
    name: "Rohan Patel",
    role: "Frontend Engineer",
    bio: "Builds fast, accessible UIs that feel delightful.",
    email: "rohan@example.com",
    links: { linkedin: "#", github: "#" },
  },
  {
    name: "Meera Iyer",
    role: "Content Strategist",
    bio: "Curates question banks and ensures syllabus alignment.",
    email: "meera@example.com",
    links: { linkedin: "#", github: "#" },
  },
  {
    name: "Arjun Verma",
    role: "Backend Engineer",
    bio: "Loves clean APIs, performance, and coffee.",
    email: "arjun@example.com",
    links: { linkedin: "#", github: "#" },
  },
  {
    name: "Kavya Nair",
    role: "UX Designer",
    bio: "Turns complexity into simple, beautiful flows.",
    email: "kavya@example.com",
    links: { linkedin: "#", github: "#" },
  },
  {
    name: "Dev Malik",
    role: "Data Analyst",
    bio: "Finds insights in results and boosts learning outcomes.",
    email: "dev@example.com",
    links: { linkedin: "#", github: "#" },
  },
];

function initialsOf(name = "") {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const Ourteam = ({ members = defaultMembers, title = "Our Team", subtitle = "The people behind QuizCraft" }) => {
  return (
    <section className="team" aria-label="Our Team">
      <header className="team-header">
        <h2 className="team-title">{title}</h2>
        {subtitle && <p className="team-subtitle">{subtitle}</p>}
      </header>

      <div className="team-grid">
        {members.map((m) => (
          <article className="team-card" key={m.email || m.name}>
            {/* Avatar */}
            <div className="avatar" aria-hidden="true">
              {/* If you have images later: <img src={m.photo} alt={`${m.name} avatar`} /> */}
              <div className="avatar-fallback">{initialsOf(m.name)}</div>
            </div>

            {/* Info */}
            <h3 className="name">{m.name}</h3>
            <p className="role">{m.role}</p>
            {m.bio && <p className="bio">{m.bio}</p>}

            {/* Links (optional) */}
            {(m.links || m.email) && (
              <div className="socials">
                {m.links?.linkedin && (
                  <a href={m.links.linkedin} className="icon-btn" aria-label="LinkedIn">
                    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                      <path fill="currentColor" d="M4.98 3.5A2.5 2.5 0 102.5 6a2.5 2.5 0 002.48-2.5zM3 8.98h4v12H3v-12zM9 8.98h3.83v1.64h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1v6.31h-4v-5.6c0-1.33-.03-3.04-1.86-3.04-1.86 0-2.14 1.45-2.14 2.95v5.69H9v-12z"/>
                    </svg>
                  </a>
                )}
                {m.links?.github && (
                  <a href={m.links.github} className="icon-btn" aria-label="GitHub">
                    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                      <path fill="currentColor" d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.77.6-3.36-1.18-3.36-1.18-.45-1.15-1.1-1.46-1.1-1.46-.9-.63.07-.62.07-.62 1 .07 1.52 1.04 1.52 1.04.89 1.53 2.34 1.09 2.9.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.67-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.6 9.6 0 015 0c1.9-1.29 2.74-1.02 2.74-1.02.56 1.37.21 2.39.1 2.64.64.69 1.03 1.58 1.03 2.67 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.86v2.76c0 .26.18.58.69.48A10 10 0 0012 2z"/>
                    </svg>
                  </a>
                )}
                {m.email && (
                  <a href={`mailto:${m.email}`} className="icon-btn" aria-label="Email">
                    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                      <path fill="currentColor" d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </a>
                )}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};

export default Ourteam;
