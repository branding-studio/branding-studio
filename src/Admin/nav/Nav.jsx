import { useEffect, useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faFileAlt,
  faUser,
  faUserGear,
  faBars,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useAdminContext } from "../../context/AdminContext";
import "./Nav.css";

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { admin } = useAdminContext();
  const isMaster = admin?.role === "master";

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("adminSidebarCollapsed");
    if (saved) setCollapsed(saved === "1");
  }, []);

  const toggleCollapsed = () =>
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem("adminSidebarCollapsed", next ? "1" : "0");
      return next;
    });

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  const display = useMemo(
    () => admin?.displayName || admin?.name || admin?.email || "Admin",
    [admin]
  );

  const initials = useMemo(() => {
    const parts = String(display).split(" ").filter(Boolean);
    const first = parts[0]?.[0] || "A";
    const second = parts[1]?.[0] || "";
    return (first + second).toUpperCase();
  }, [display]);

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: faHome },
    ...(isMaster
      ? [{ name: "Admin", path: "/admin/manage-admin", icon: faUserGear }]
      : []),
    { name: "Manage Team", path: "/admin/manage-team", icon: faUser },
    { name: "Manage Gallery", path: "/admin/manage-gallery", icon: faFileAlt },
    { name: "Manage Pricing", path: "/admin/manage-pricing", icon: faFileAlt },
    { name: "Quotation Leads", path: "/admin/quotation-leads", icon: faFileAlt },
    {
      name: "Manage Samples",
      path: "/admin/manage-service-samples",
      icon: faFileAlt,
    }
    // { name: "Comments", path: "/admin/manage-comments", icon: faUser },
  ];

  return (
    <aside className={`admin-sidebar ${collapsed ? "is-collapsed" : ""}`}>
      {/* <div className="admin-sidebar-header">
        <button
          className="collapse-btn"
          onClick={toggleCollapsed}
          aria-label="Toggle sidebar"
          title={collapsed ? "Expand" : "Collapse"}
        >
          <FontAwesomeIcon icon={collapsed ? faBars : faChevronRight} />
        </button>
        <div className="brand" onClick={() => navigate("/admin/dashboard")}>
          <div className="brand-logo">A</div>
          <div className="brand-name">Admin</div>
        </div>
      </div> */}

      <ul className="admin-nav-list">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <li
              key={item.path}
              className={`admin-nav-item ${active ? "active" : ""}`}
            >
              <button
                onClick={() => navigate(item.path)}
                className="admin-nav-link"
                title={item.name}
                aria-current={active ? "page" : undefined}
              >
                <FontAwesomeIcon icon={item.icon} className="admin-nav-icon" />
                <span className="nav-text">{item.name}</span>
                {"count" in item && (
                  <span
                    className={`nav-badge ${collapsed ? "dot" : ""}`}
                    aria-label={`${item.count} items`}
                  >
                    {collapsed ? "" : item.count}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="admin-sidebar-footer">
        <div className="profile">
          <div className="avatar" aria-hidden>{initials}</div>
          <div className="profile-meta">
            <div className="profile-name" title={display}>
              {display}
            </div>
            <div className="profile-role">{admin?.role || "—"}</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Nav;
