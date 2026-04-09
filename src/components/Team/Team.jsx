import React, { useEffect, useState } from "react";
import "./Team.css";
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

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

const Team = () => {
  const [coreTeam, setCoreTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const snapshot = await getDocs(collection(db, "team"));

        const data = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((member) => member.type === "core" && member.isVisible === true)
          .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

        setCoreTeam(data);
      } catch (error) {
        console.error("Error fetching team:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

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

        {loading ? (
          <div className="team-loading">Loading team members...</div>
        ) : coreTeam.length === 0 ? (
          <div className="team-loading">No core team members found.</div>
        ) : (
          <div className="team-grid">
            {coreTeam.map((member) => (
              <div className="team-card" key={member.id}>
                <div className="team-card__image">
                  <img src={member.imageUrl} alt={member.name} />
                </div>

                <div className="team-card__content">
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        )}

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