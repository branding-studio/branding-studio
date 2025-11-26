import React, { useEffect, useMemo, useState, useCallback } from 'react';
import './BlogDash.css';
import BlogList from './BlogList';
import AddBlogForm from './AddBlogForm';
import AddCategoryModal from './AddCategoryModal';
import { useBlogContext } from "../../context/BlogContext";

const BlogDash = () => {
  const [showAddBlog, setShowAddBlog] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showSeoModal, setShowSeoModal] = useState(false);

  const [reloadBlogsTrigger, setReloadBlogsTrigger] = useState(0);
  const [reloadCateTrigger, setReloadCateTrigger] = useState(0);

  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [seoKeywords, setSeoKeywords] = useState('');

  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeCategoryDetails, setActiveCategoryDetails] = useState(null);

  const [blogs, setBlogs] = useState([]);
  const [allBlogs, setAllBlogs] = useState([]);

  // UI: search/sort
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // NEW: loading/busy flags
  const [loadingBlogs, setLoadingBlogs] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingCatDetails, setLoadingCatDetails] = useState(false);
  const [savingSEO, setSavingSEO] = useState(false);
  const [deletingCatId, setDeletingCatId] = useState(null);
  const [editingCatId, setEditingCatId] = useState(null);
  const [busyOverlay, setBusyOverlay] = useState(false); // global overlay for mutations

  const {
    fetchCategories,
    fetchCategoryById,
    fetchBlogs,
    fetchBlogsFromCategory,
    deleteCategory,
    updateCategory
  } = useBlogContext();

  useEffect(()=>{ document.title = "Admin | Manage Blogs" },[]);

  // Category details (when activeCategory changes)
  useEffect(() => {
    if (activeCategory === 'all') {
      setActiveCategoryDetails(null);
      return;
    }
    let cancelled = false;
    setLoadingCatDetails(true);
    (async () => {
      try {
        const details = await fetchCategoryById(activeCategory);
        if (!cancelled) {
          setActiveCategoryDetails(details);
          setSeoTitle(details?.seoTitle || '');
          setSeoDescription(details?.seoDescription || '');
          setSeoKeywords(details?.seoKeywords || '');
        }
      } catch (err) {
        console.error('Failed to fetch category details:', err);
        setActiveCategoryDetails(null);
      } finally {
        if (!cancelled) setLoadingCatDetails(false);
      }
    })();
    return () => { cancelled = true; };
  }, [activeCategory, fetchCategoryById]);

  // Blogs list
  useEffect(() => {
    let cancelled = false;
    setLoadingBlogs(true);
    (async () => {
      try {
        const all = await fetchBlogs();
        if (cancelled) return;
        setAllBlogs(all);
        const data = activeCategory === 'all' ? all : await fetchBlogsFromCategory(activeCategory);
        if (cancelled) return;
        setBlogs(data);
      } catch (err) {
        console.error('Failed to load blogs:', err);
      } finally {
        if (!cancelled) setLoadingBlogs(false);
      }
    })();
    return () => { cancelled = true; };
  }, [activeCategory, fetchBlogs, fetchBlogsFromCategory, reloadBlogsTrigger]);

  // Categories list
  const loadCategories = useCallback(async () => {
    setLoadingCategories(true);
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (err) {
      console.error('Failed to load categories', err);
    } finally {
      setLoadingCategories(false);
    }
  }, [fetchCategories]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories, reloadCateTrigger]);

  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm("Delete this category?")) return;
    setDeletingCatId(categoryId);
    setBusyOverlay(true);
    try {
      await deleteCategory(categoryId);
      await loadCategories();
      if (activeCategory === categoryId) setActiveCategory('all');
    } catch (error) {
      console.error("Failed to delete category", error);
    } finally {
      setDeletingCatId(null);
      setBusyOverlay(false);
    }
  };

  const handleEditCategory = (cat) => {
    const newName = prompt("Edit category name:", cat.name);
    if (!newName || newName === cat.name) return;
    setEditingCatId(cat.id);
    setBusyOverlay(true);
    updateCategory(cat.id, { name: newName })
      .then(loadCategories)
      .catch((err) => console.error("Failed to update category", err))
      .finally(() => {
        setEditingCatId(null);
        setBusyOverlay(false);
      });
  };

  const handleSaveSeo = async () => {
    setSavingSEO(true);
    setBusyOverlay(true);
    try {
      await updateCategory(activeCategory, {
        ...activeCategoryDetails,
        seoTitle,
        seoDescription,
        seoKeywords,
        updatedAt: new Date(),
      });
      setShowSeoModal(false);
    } catch (err) {
      console.error("Failed to save SEO settings", err);
    } finally {
      setSavingSEO(false);
      setBusyOverlay(false);
    }
  };

  const refreshBlogs = async () => {
    setLoadingBlogs(true);
    try {
      const all = await fetchBlogs();
      setAllBlogs(all);
      const data = activeCategory === 'all'
        ? all
        : await fetchBlogsFromCategory(activeCategory);
      setBlogs(data);
    } finally {
      setLoadingBlogs(false);
    }
  };

  const getBlogCount = (categoryId) =>
    allBlogs.filter(b => b.category === categoryId).length;

  // Visible list (search/sort)
  const visibleBlogs = useMemo(() => {
    let data = [...blogs];
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(b =>
        (b.title || '').toLowerCase().includes(q) ||
        (b.author || '').toLowerCase().includes(q) ||
        (b.seoDescription || '').toLowerCase().includes(q)
      );
    }
    if (sortBy === 'title') {
      data.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    } else if (sortBy === 'oldest') {
      data.sort((a, b) => {
        const A = (a.createdAt?.toDate?.() ?? a.createdAt ?? 0);
        const B = (b.createdAt?.toDate?.() ?? b.createdAt ?? 0);
        return new Date(A) - new Date(B);
      });
    } else {
      data.sort((a, b) => {
        const A = (a.createdAt?.toDate?.() ?? a.createdAt ?? 0);
        const B = (b.createdAt?.toDate?.() ?? b.createdAt ?? 0);
        return new Date(B) - new Date(A);
      });
    }
    return data;
  }, [blogs, search, sortBy]);

  return (
    <div className="blog-dash">
      {/* Sticky header */}
      <div className="bd-header">
        <div className="bd-title">
          <h1>Blog Manager</h1>
          <p>Write, organize, and optimize your posts.</p>
        </div>
        <div className="bd-actions">
          <button className="btn primary" onClick={() => setShowAddBlog(true)}>
            + Add Blog
          </button>
          <button className="btn subtle" onClick={() => setShowCategoryModal(true)}>
            + Category
          </button>
        </div>
      </div>

      {/* Quick stats */}
      <div className="bd-stats">
        <div className="stat">
          <span className="stat-label">Total Blogs</span>
          <span className="stat-value">{allBlogs.length}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Categories</span>
          <span className="stat-value">{categories.length}</span>
        </div>
        {activeCategory !== 'all' && activeCategoryDetails && (
          <div className="stat">
            <span className="stat-label">In “{activeCategoryDetails.name}”</span>
            <span className="stat-value">{getBlogCount(activeCategory)}</span>
          </div>
        )}
      </div>

      {/* Category pills */}
      <div className="bd-categories">
        {loadingCategories ? (
          <>
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="pill skeleton" />
            ))}
          </>
        ) : (
          <>
            <button
              className={`pill ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All <span className="pill-badge">{allBlogs.length}</span>
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`pill ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
                title={cat.name}
              >
                {cat.name} <span className="pill-badge">{getBlogCount(cat.id)}</span>
              </button>
            ))}
          </>
        )}
      </div>

      {/* Search + Sort */}
      <div className="bd-filters">
        <input
          className="input"
          type="text"
          placeholder="Search by title, author, or description…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="input select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="title">Title A–Z</option>
        </select>
      </div>

      {/* Category info + actions */}
      {activeCategory !== 'all' && (
        <div className="category-meta">
          {loadingCatDetails ? (
            <div className="meta-skeleton">
              <div className="line w40" />
              <div className="line w60" />
            </div>
          ) : activeCategoryDetails ? (
            <>
              <div className="category-meta-grid">
                <div>
                  <p><strong>Category:</strong> {activeCategoryDetails.name}</p>
                  <p>
                    <strong>Created:</strong>{' '}
                    {activeCategoryDetails.createdAt?.toDate
                      ? new Date(activeCategoryDetails.createdAt.toDate()).toLocaleDateString()
                      : (activeCategoryDetails.createdAt
                          ? new Date(activeCategoryDetails.createdAt).toLocaleDateString()
                          : '-')}
                  </p>
                </div>
                <div className="category-meta-actions">
                  <button
                    className="btn outline"
                    onClick={() => handleEditCategory(activeCategoryDetails)}
                    disabled={!!editingCatId || !!deletingCatId}
                  >
                    {editingCatId === activeCategoryDetails.id ? (
                      <span className="spinner-mini" />
                    ) : '✏️'} Edit
                  </button>
                  <button
                    className="btn danger"
                    onClick={() => handleDeleteCategory(activeCategoryDetails.id)}
                    disabled={!!editingCatId || !!deletingCatId}
                  >
                    {deletingCatId === activeCategoryDetails.id ? (
                      <span className="spinner-mini" />
                    ) : '🗑️'} Delete
                  </button>
                  <button
                    className="btn outline"
                    onClick={() => setShowSeoModal(true)}
                    disabled={!!editingCatId || !!deletingCatId}
                  >
                    🔍 SEO
                  </button>
                </div>
              </div>

              <div className="seo-details">
                <p><strong>SEO Title:</strong> {seoTitle || <em>Not set</em>}</p>
                <p><strong>Meta Description:</strong> {seoDescription || <em>Not set</em>}</p>
                <p><strong>Keywords:</strong> {seoKeywords || <em>Not set</em>}</p>
              </div>
            </>
          ) : null}
        </div>
      )}

      {/* List */}
      <div className="blog-list">
        {loadingBlogs ? (
          <div className="spinner-wrap">
            <div className="spinner-lg" />
          </div>
        ) : (
          <BlogList
            blogs={visibleBlogs}
            count="all"
            main={true}
            category={activeCategory}
            onRefresh={refreshBlogs}
          />
        )}
      </div>

      {/* SEO modal */}
      {showSeoModal && (
        <div className="seo-modal-overlay">
          <div className="seo-modal">
            <div className="seo-modal-head">
              <h2>Category SEO</h2>
              <button className="icon-btn" onClick={() => setShowSeoModal(false)}>✕</button>
            </div>

            <label>SEO Title</label>
            <input
              type="text"
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              placeholder="Enter SEO title"
            />

            <label>Meta Description</label>
            <textarea
              rows={4}
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              placeholder="Enter meta description"
            />

            <label>Keywords</label>
            <input
              type="text"
              value={seoKeywords}
              onChange={(e) => setSeoKeywords(e.target.value)}
              placeholder="e.g., blog, category, article"
            />

            <div className="seo-modal-actions">
              <button onClick={handleSaveSeo} className="btn primary" disabled={savingSEO}>
                {savingSEO ? <span className="spinner-mini" /> : null}
                {savingSEO ? ' Saving…' : ' Save'}
              </button>
              <button onClick={() => setShowSeoModal(false)} className="btn subtle" disabled={savingSEO}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add modals */}
      {showCategoryModal && (
        <AddCategoryModal
          onClose={() => setShowCategoryModal(false)}
          onSuccess={() => setReloadCateTrigger(prev => prev + 1)}
        />
      )}
      {showAddBlog && (
        <AddBlogForm
          onClose={() => setShowAddBlog(false)}
          onSuccess={() => setReloadBlogsTrigger(prev => prev + 1)}
        />
      )}

      {/* Global overlay during mutations */}
      {busyOverlay && (
        <div className="loading-overlay">
          <div className="spinner-lg" />
        </div>
      )}
    </div>
  );
};

export default BlogDash;
