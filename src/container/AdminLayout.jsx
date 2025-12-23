import { useEffect } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import Nav from "../Admin/nav/Nav";
import TopNav from "../Admin/nav/TopNav";
import { useAdminContext } from "../context/AdminContext";


const AdminLayout = () => {
  const location = useLocation();
  const isLogin = location.pathname === "/admin/login";
  const { admin } = useAdminContext();


   useEffect(()=>{
      document.title = "Admin | Dashboard"
    },[])

  // Redirect /admin root
  if (location.pathname === "/admin") {
    return admin
      ? <Navigate to="/admin/dashboard" replace />
      : <Navigate to="/admin/login" replace />;
  }

  
  

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      {!isLogin && <TopNav />}

      <div style={{ display: "flex", width: "100%", height: !isLogin ? "calc(100vh - 60px)" : "100vh" }}>
        {!isLogin && (
          <aside style={{ width: 250, flexShrink: 0 }}>
            <Nav />
          </aside>
        )}
        <main style={{ flex: 1, overflowY: "auto" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
