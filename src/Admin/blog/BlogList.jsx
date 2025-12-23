import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BlogList.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash, faFolder, faCalendarDays, faClock } from "@fortawesome/free-solid-svg-icons";
import { useBlogContext } from "../../context/BlogContext";

const BlogList = ({ blogs = [], count = 'all', main = false, onRefresh }) => {
  const navigate = useNavigate();
  const { selectBlog, deleteBlog } = useBlogContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 200);
    return () => clearTimeout(t);
  }, [blogs]);

  const formatDate = (date) => {
    if (!date) return '';
    const parsed = new Date(date?.seconds ? date.seconds * 1000 : date);
    if (isNaN(parsed)) return '';
    return parsed.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const timeSince = (date) => {
    if (!date) return '';
    const d = new Date(date?.seconds ? date.seconds * 1000 : date);
    const diff = Date.now() - d.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days <= 0) return 'today';
    if (days === 1) return '1 day ago';
    if (days < 30) return `${days} days ago`;
    const months = Math.floor(days / 30);
    if (months === 1) return '1 month ago';
    return `${months} months ago`;
  };

  const goToBlog = (blog) => {
    selectBlog(blog);
    const formattedTitle = (blog.title || '').toLowerCase().replace(/\s+/g, '-');
    navigate(`/blogs/${blog.category}/${formattedTitle}`);
  };

  const handleEdit = (blog) => {
    selectBlog(blog);
    navigate('/admin/blog/edit');
  };

  const handleDelete = async (blog) => {
    if (window.confirm(`Delete "${blog.title}"? This cannot be undone.`)) {
      try {
        await deleteBlog(blog.id, blog.category);
        onRefresh && onRefresh();
      } catch (err) {
        console.error("Delete error:", err.message);
      }
    }
  };

  const displayedBlogs = count === 'all' ? blogs : blogs.slice(0, parseInt(count, 10));

  if (isLoading) {
    return (
      <div className="spinner-container">
        <div className="spinner" />
      </div>
    );
  }

  if (!displayedBlogs?.length) {
    return (
      <div className="blogs-empty">
        <div className="empty-card">
          <h3>No posts yet</h3>
          <p>Create your first article to see it here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="blogs">
      <div className="blogs-head">
        <h2>Posts</h2>
        <span className="count-chip">{displayedBlogs.length}</span>
      </div>

      <div className="blogs-grid">
        {displayedBlogs.map((blog) => {
          const shortText = (blog.content || '').replace(/<[^>]+>/g, '').slice(0, 180);
          const isLong = (blog.content || '').replace(/<[^>]+>/g, '').length > 180;

          return (
            <article key={blog.id} className="blog-card" onClick={() => goToBlog(blog)}>
              {(blog.imageBase64 || blog.imageLink) ? (
                <div className="card-media">
                  <img src={blog.imageBase64 || blog.imageLink} alt={blog.title || 'Blog image'} />
                </div>
              ) : (
                <div className="card-media placeholder" aria-hidden />
              )}

              <div className="card-body">
                <div className="card-topline">
                  <span className="pill pill-cat">
                    <FontAwesomeIcon icon={faFolder} />
                    {blog.category}
                  </span>
                  <span className="pill pill-time" title={formatDate(blog.createdAt)}>
                    <FontAwesomeIcon icon={faClock} />
                    {timeSince(blog.createdAt)}
                  </span>
                </div>

                <h3 className="card-title">{blog.title}</h3>

                <p className="card-excerpt">
                  {shortText}
                  {isLong && '… '}
                  {isLong && (
                    <button
                      className="read-more"
                      onClick={(e) => {
                        e.stopPropagation();
                        goToBlog(blog);
                      }}
                    >
                      Read more
                    </button>
                  )}
                </p>

                <div className="card-meta">
                  <span className="meta">
                    <FontAwesomeIcon icon={faCalendarDays} />
                    {formatDate(blog.formattedDate) || formatDate(blog.createdAt)}
                  </span>
                  {blog.author && <span className="meta">by {blog.author}</span>}
                </div>

                {main && (
                  <div className="card-actions" onClick={(e) => e.stopPropagation()}>
                    <button className="btn ghost" onClick={() => handleEdit(blog)}>
                      <FontAwesomeIcon icon={faPencil} /> Edit
                    </button>
                    <button className="btn danger" onClick={() => handleDelete(blog)}>
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </button>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default BlogList;
