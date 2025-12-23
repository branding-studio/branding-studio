import { Navigate, Outlet } from "react-router-dom";
import { useAdminContext } from "../context/AdminContext";

const AdminPrivateRoute = () => {
  const { admin, loading } = useAdminContext();
  if (loading) return <div style={{ padding: 24 }}>Checking access…</div>;
  if (!admin) return <Navigate to="/admin/login" replace />;
  return <Outlet />;
};

export default AdminPrivateRoute;
