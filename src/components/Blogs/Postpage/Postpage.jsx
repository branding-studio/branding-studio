import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useBlogContext } from "../../../context/BlogContext";
import { SEO } from "../../../utils/SEO";
import "./Postpage.css";

const slugify = (t = "") =>
  t.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

const toDate = (v) => {
  if (!v) return null;
  if (typeof v?.toDate === "function") return v.toDate();
  if (typeof v === "string") return new Date(v);
  return v;
};
const toISO = (v) => {
  const d = toDate(v);
  return d && !isNaN(d.getTime()) ? d.toISOString() : undefined;
};
const formatDate = (v) => {
  const d = toDate(v);
  return !d || isNaN(d.getTime())
    ? "-"
    : d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
};
const plainText = (html = "") => html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
const estimateReadMins = (html = "") =>
  Math.max(1, Math.round(plainText(html).split(/\s+/).filter(Boolean).length / 220));

const SITE_NAME = "Weboku";

function Loading() {
  return (
    <div className="postpage loading-wrap">
      <div className="skeleton hero" />
      <div className="skeleton title" />
      <div className="skeleton lines" />
      <div className="skeleton lines" />
      <div className="skeleton lines" />
    </div>
  );
}

export default function Postpage() {
  const { category: categoryParam, slug } = useParams();
  const { fetchBlogs, fetchBlogsFromCategory, fetchCategories } = useBlogContext();

  const [post, setPost] = useState(null);
  const [catMap, setCatMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const cats = await fetchCategories().catch(() => []);
        if (!cancelled) {
          const map = {};
          (cats || []).forEach((c) => (map[c.id] = c.name || c.id));
          setCatMap(map);
        }
        let list = await fetchBlogs().catch(() => []);
        let found =
          list.find(
            (b) =>
              b.category === categoryParam &&
              (b.urlSlug || slugify(b.title || "")) === slug
          ) || null;
        if (!found) {
          const catList = await fetchBlogsFromCategory(categoryParam).catch(() => []);
          found =
            catList.find(
              (b) =>
                (b.urlSlug || slugify(b.title || "")) === slug
            ) || null;
        }
        if (!cancelled) setPost(found);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [categoryParam, slug, fetchBlogs, fetchBlogsFromCategory, fetchCategories]);

  const view = useMemo(() => {
    if (!post) return null;
    const title = post.title || "Untitled";
    const catId = post.category || "uncategorized";
    const catName = catMap[catId] || catId;
    const date = post.createdAt || post.formattedDate;
    const readMins = estimateReadMins(post.content || "");
    const cover = post.imageLink || post.imageBase64 || "";

    const ORIGIN =
      typeof window !== "undefined" ? window.location.origin : "https://example.com";
    const path = `/blogs/${catId}/${post.urlSlug || slugify(title)}`;
    const canonical = `${ORIGIN}${path}`;

    const metaTitle = `${post.seoTitle?.trim() || title} | ${SITE_NAME}`;
    const metaDesc =
      post.seoDescription?.trim() ||
      plainText(post.content || "").slice(0, 160);
    const keywords = (post.seoKeywords || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .join(", ");
    const publishedTime = toISO(date);
    const modifiedTime = toISO(post.updatedAt || date);
    const ogImage = post.imageLink || undefined;

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": { "@type": "WebPage", "@id": canonical },
      "headline": title,
      "description": metaDesc,
      ...(ogImage ? { image: [ogImage] } : {}),
      ...(post.author ? { author: { "@type": "Person", "name": post.author } } : {}),
      "publisher": { "@type": "Organization", "name": SITE_NAME },
      ...(publishedTime ? { datePublished: publishedTime } : {}),
      ...(modifiedTime ? { dateModified: modifiedTime } : {}),
      "articleSection": catName,
      ...(keywords ? { keywords } : {}),
    };

    return {
      title,
      catId,
      catName,
      date,
      readMins,
      cover,
      meta: {
        metaTitle,
        metaDesc,
        keywords,
        canonical,
        publishedTime,
        modifiedTime,
        ogImage,
        jsonLd,
      },
    };
  }, [post, catMap]);

  if (loading) return <Loading />;

  if (!post || !view) {
    return (
      <div className="postpage notfound">
        <h1>Post not found</h1>
        <p>The article you’re looking for doesn’t exist or may have been moved.</p>
        <Link className="back-link" to="/blogs">← Back to all posts</Link>
      </div>
    );
  }

  const { title, catId, catName, date, readMins, cover, meta } = view;

  return (
    <div className="postpage light-bg">
      <SEO {...{
        title: meta.metaTitle,
        description: meta.metaDesc,
        keywords: meta.keywords,
        canonical: meta.canonical,
        ogImage: meta.ogImage,
        ogType: "article",
        article: {
          publishedTime: meta.publishedTime,
          modifiedTime: meta.modifiedTime,
          section: catName,
          author: post.author,
        },
        twitterCard: meta.ogImage ? "summary_large_image" : "summary",
        jsonLd: meta.jsonLd
      }} />

            {/* Back tracker / breadcrumb */}
      <nav className="post-breadcrumb" aria-label="Breadcrumb">
        <button
          className="back-chip"
          type="button"
          onClick={() => {
            if (window.history.length > 1) window.history.back();
            else window.location.href = "/blogs";
          }}
        >
          ← Back
        </button>

        <div className="crumbs">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/blogs">Blogs</Link>
          <span>/</span>
          <Link to={`/blogs?cat=${encodeURIComponent(catId)}`}>{catName}</Link>
          <span>/</span>
          <span className="current">{title}</span>
        </div>
      </nav>


      {cover && (
        <figure className="post-hero">
          <img src={cover} alt={title} />
        </figure>
      )}

      <header className="post-head">
        <div className="post-meta-top">
          <Link className="pill" to={`/blogs?cat=${encodeURIComponent(catId)}`}>
            {catName}
          </Link>
          <span className="muted">
            {formatDate(date)} · {readMins} min read
          </span>
        </div>
        <h1 className="post-title">{title}</h1>
        {post.author && <div className="post-author">By {post.author}</div>}
      </header>

      <article
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.content || "" }}
      />

      <footer className="post-footer">
        <Link className="back-link" to="/blogs">← Back to all posts</Link>
      </footer>
    </div>
  );
}
