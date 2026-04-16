import React, { useEffect, useState } from "react";
import "./Team.css";
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const fallbackLeadershipTeam = [
  {
    id: "founder-fallback",
    type: "founder",
    name: "Arabinda Swain",
    role: "Founder",
    imageUrl: "/assets/team/arabinda-swain.jpg",
    description:
      "Leading Branding Studios with vision, creativity, and a strong focus on building brands that grow.",
  },
  {
    id: "cofounder-fallback",
    type: "cofounder",
    name: "Namrata Hotaa",
    role: "Co-Founder / CEO",
    imageUrl: "/assets/team/namrata-hotaa.jpg",
    description:
      "Driving operations, strategy, and client success with a sharp eye on quality and business growth.",
  },
];

const fallbackCoreTeam = [
  {
    id: "priyanka-lenka",
    name: "Priyanka Lenka",
    role: "HR",
    imageUrl: "/assets/team/priyanka-lenka.jpg",
  },
  {
    id: "norbert-ekka",
    name: "Norbert Ekka",
    role: "Video Editor",
    imageUrl: "/assets/team/norbert-ekka.jpg",
  },
];

const Team = () => {
  const [leadershipTeam, setLeadershipTeam] = useState([]);
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
          }));

        const visibleMembers = data.filter((member) => member.isVisible === true);

        const leadershipData = visibleMembers
          .filter(
            (member) => member.type === "founder" || member.type === "cofounder"
          )
          .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

        const coreData = visibleMembers
          .filter((member) => member.type === "core")
          .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

        setLeadershipTeam(leadershipData);
        setCoreTeam(coreData);
      } catch (error) {
        console.error("Error fetching team:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  const visibleLeadershipTeam =
    leadershipTeam.length > 0 ? leadershipTeam : fallbackLeadershipTeam;
  const visibleCoreTeam = coreTeam.length > 0 ? coreTeam : fallbackCoreTeam;

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
          {visibleLeadershipTeam.map((member) => (
            <div className="leadership-card" key={member.id}>
              <div className="leadership-card__image">
                <img src={member.imageUrl} alt={member.name} />
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
        ) : (
          <div className="team-grid">
            {visibleCoreTeam.map((member) => (
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
