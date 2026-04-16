import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from "../../context/AdminContext";
import "./Dashboard.css";

const dashboardSections = [
  {
    title: "Manage Team",
    desc: "Update founder, co-founder, and core team members shown on the website.",
    path: "/admin/manage-team",
  },
  {
    title: "Manage Gallery",
    desc: "Add or remove gallery visuals that appear on the public website.",
    path: "/admin/manage-gallery",
  },
  {
    title: "Manage Pricing",
    desc: "Control categories, services, and pricing values for the pricing page.",
    path: "/admin/manage-pricing",
  },
  {
    title: "Manage Samples",
    desc: "Edit the sample videos and visuals shown inside each service detail page.",
    path: "/admin/manage-service-samples",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { admin } = useAdminContext();
  const isMaster = admin?.role === "master";

  useEffect(() => {
    document.title = "Admin | Manage Dashboard";
  }, []);

  return (
    <div className="dashboard">
      <section className="dash-hero">
        <div className="dash-hero__content">
          <span className="dash-hero__eyebrow">Admin Dashboard</span>
          <h2>Website content controls</h2>
          <p>
            From here you can manage the important website sections without
            touching the code.
          </p>
        </div>

        {isMaster && (
          <button
            type="button"
            className="btn primary"
            onClick={() => navigate("/admin/manage-admin")}
          >
            Manage Admin
          </button>
        )}
      </section>

      <section className="dash-overview">
        <div className="overview-card">
          <div className="overview-card__label">Logged in as</div>
          <div className="overview-card__value">
            {admin?.displayName || admin?.name || "Admin"}
          </div>
        </div>

        <div className="overview-card">
          <div className="overview-card__label">Role</div>
          <div className="overview-card__value">{admin?.role || "-"}</div>
        </div>

        <div className="overview-card">
          <div className="overview-card__label">Available sections</div>
          <div className="overview-card__value">{dashboardSections.length}</div>
        </div>
      </section>

      <section className="dash-sections">
        <div className="dash-sections__head">
          <h3>Quick Access</h3>
          <p>Open the section you want to manage.</p>
        </div>

        <div className="dash-grid">
          {dashboardSections.map((section) => (
            <article className="dash-card" key={section.path}>
              <h4>{section.title}</h4>
              <p>{section.desc}</p>
              <button
                type="button"
                className="btn ghost"
                onClick={() => navigate(section.path)}
              >
                Open Section
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
