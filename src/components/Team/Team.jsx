import React from "react";
import "./Team.css";

const leadershipTeam = [
  {
    name: "Founder Name",
    role: "Founder",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=80",
    description:
      "Leading Branding Studios with vision, creativity, and a strong focus on building brands that grow.",
  },
  {
    name: "Co-Founder Name",
    role: "Co-Founder / CEO",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
    description:
      "Driving operations, strategy, and client success with a sharp eye on quality and business growth.",
  },
];

const coreTeam = [
  {
    name: "Video Editor Name",
    role: "Video Editor",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Social Media Manager Name",
    role: "Social Media Manager",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Graphic Designer Name",
    role: "Graphic Designer",
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Cinematographer Name",
    role: "Cinematographer",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "HR Name",
    role: "HR",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Office Manager Name",
    role: "Office Manager",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80",
  },
];

const Team = () => {
  return (
    <section className="team-page">
      <div className="team-page__container">
        <div className="team-hero">
          <span className="team-badge">Branding Studios • Our Team</span>
          <h1>Meet the Team Behind the Brand</h1>
          <p>
            The people who bring strategy, creativity, storytelling, and
            execution together to build powerful digital experiences.
          </p>
        </div>

        <div className="team-section-head">
          <span>Leadership</span>
          <h2>The people shaping Branding Studios</h2>
        </div>

        <div className="leadership-grid">
          {leadershipTeam.map((member, index) => (
            <div className="leadership-card" key={index}>
              <div className="leadership-card__image">
                <img src={member.image} alt={member.name} />
              </div>

              <div className="leadership-card__content">
                <span className="role-pill">{member.role}</span>
                <h3>{member.name}</h3>
                <p>{member.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="team-section-head team-section-head--space">
          <span>Core Team</span>
          <h2>The specialists turning ideas into impact</h2>
        </div>

        <div className="team-grid">
          {coreTeam.map((member, index) => (
            <div className="team-card" key={index}>
              <div className="team-card__image">
                <img src={member.image} alt={member.name} />
              </div>

              <div className="team-card__content">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="team-cta">
          <span className="team-badge">Work With Us</span>
          <h2>Want to build your brand with our team?</h2>
          <p>
            From strategy to execution, our team helps brands grow with clarity,
            creativity, and performance.
          </p>
          <a href="/contact" className="team-cta__btn">
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default Team;