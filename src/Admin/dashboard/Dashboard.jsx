import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, orderBy, query, limit, getCountFromServer } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useAdminContext } from "../../context/AdminContext";
import { useBlogContext } from "../../context/BlogContext";
import "./Dashboard.css";

const formatDate = (v) => {
  if (!v) return "-";
  const d = typeof v?.toDate === "function" ? v.toDate() : (typeof v === "string" ? new Date(v) : v);
  return isNaN(d?.getTime()) ? "-" : d.toLocaleDateString();
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { admin } = useAdminContext(); // 'master' | 'all' | 'editor' | 'viewer'
  const isMaster = admin?.role === "master";
  const { fetchCategories } = useBlogContext();

  const [totalBlogs, setTotalBlogs] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const blogsColRef = useMemo(() => collection(db, "_blogs"), []);

  useEffect(()=>{
        document.title = "Admin | Manage Dashboard"
      },[])

  useEffect(() => {
    const load = async () => {
      try {
        // total blog count
        const snapCount = await getCountFromServer(blogsColRef);
        setTotalBlogs(snapCount.data().count || 0);

        // recent 10 blogs
        const qRecent = query(blogsColRef, orderBy("createdAt", "desc"), limit(10));
        const snap = await getDocs(qRecent);
        const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setRecentBlogs(items);

        // categories count via context
        try {
          const cats = await fetchCategories();
          setCategoriesCount(Array.isArray(cats) ? cats.length : 0);
        } catch {
          // fallback: distinct categories from the fetched list (approx)
          const distinct = new Set(items.map((b) => b.category).filter(Boolean));
          setCategoriesCount(distinct.size);
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [blogsColRef, fetchCategories]);

  const handlePrimaryAction = () => {
    if (isMaster) {
      navigate("/admin/manage-admin");
    } else {
      navigate("/admin/blog");
    }
  };

  return (
    <div className="dashboard">
      {/* Top section: stats + primary action */}
      <div className="dash-top">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" aria-hidden>📝</div>
            <div className="stat-content">
              <div className="stat-label">Total Blogs</div>
              <div className="stat-value">{loading ? "…" : totalBlogs}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" aria-hidden>📂</div>
            <div className="stat-content">
              <div className="stat-label">Categories</div>
              <div className="stat-value">{loading ? "…" : categoriesCount}</div>
            </div>
          </div>
        </div>

        <div className="dash-actions">
          <button className="btn primary" onClick={handlePrimaryAction}>
            {isMaster ? "Manage Admin" : "Manage Blog"}
          </button>
          <button className="btn ghost" onClick={() => navigate("/admin/blog")}>
            See All Blogs
          </button>
        </div>
      </div>

      {/* Recent table */}
      <div className="panel">
        <div className="panel-head">
          <h3>Recent Blogs</h3>
          <span className="panel-sub">{loading ? "" : `${recentBlogs.length} shown`}</span>
        </div>

        {loading ? (
          <div className="muted">Loading…</div>
        ) : recentBlogs.length === 0 ? (
          <div className="empty">
            <div className="empty-card">
              <h4>No blogs yet</h4>
              <p>Create your first post to see it here.</p>
              <button className="btn primary" onClick={() => navigate("/admin/blog")}>Create Blog</button>
            </div>
          </div>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Author</th>
                  <th>Date</th>
                  <th className="th-id">ID</th>
                </tr>
              </thead>
              <tbody>
                {recentBlogs.map((b) => (
                  <tr key={b.id}>
                    <td className="title-cell">
                      <span className="title">{b.title || "-"}</span>
                    </td>
                    <td>
                      <span className="pill">{b.category || "-"}</span>
                    </td>
                    <td>{b.author || "-"}</td>
                    <td>{formatDate(b.createdAt || b.formattedDate)}</td>
                    <td className="id-cell">{b.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
