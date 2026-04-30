import { useEffect } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import Nav from "../Admin/nav/Nav";
import TopNav from "../Admin/nav/TopNav";
import { useAdminContext } from "../context/AdminContext";
import "./AdminLayout.css";


const AdminLayout = () => {
  const location = useLocation();
  const isLogin = location.pathname === "/admin/login";
  const { admin } = useAdminContext();


   useEffect(()=>{
      document.title = "Admin | Dashboard"
    },[])

  if (location.pathname === "/admin") {
    return admin
      ? <Navigate to="/admin/dashboard" replace />
      : <Navigate to="/admin/login" replace />;
  }


  return (
    <div className="admin-layout-shell">
      {!isLogin && <TopNav />}

      <div className={`admin-layout-frame ${isLogin ? "is-login" : ""}`}>
        {!isLogin && (
          <aside className="admin-layout-side">
            <Nav />
          </aside>
        )}
        <main className="admin-layout-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
