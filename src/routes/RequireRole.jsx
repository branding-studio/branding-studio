// routes/RequireRole.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAdminContext } from "../context/AdminContext";

const RequireRole = ({ roles = [] }) => {
  const { admin, loading } = useAdminContext();

  if (loading) return <div style={{ padding: 24 }}>Checking access…</div>;
  if (!admin) return <Navigate to="/admin/login" replace />;

  // if roles not provided, allow any signed-in admin
  if (roles.length === 0) return <Outlet />;

  const allowed = roles.includes(admin.role);
  return allowed ? <Outlet /> : <Navigate to="/admin/forbidden" replace />;
};

export default RequireRole;
