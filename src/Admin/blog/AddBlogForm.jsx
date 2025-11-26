import React, { useState, useEffect, useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useBlogContext } from "../../context/BlogContext";

// TIPTAP
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Color from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import Placeholder from "@tiptap/extension-placeholder";

import "./AddBlogForm.css";

const MenuButton = ({ onClick, active, title, children, disabled }) => (
  <button
    type="button"
    className={`tt-btn ${active ? "is-active" : ""}`}
    onClick={onClick}
    title={title}
    disabled={disabled}
  >
    {children}
  </button>
);

const slugify = (t) =>
  (t || "").toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "");

const AddBlogForm = ({ onClose, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [contentHTML, setContentHTML] = useState("");
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState("");
  const [imageLink, setImageLink] = useState("");

  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [author, setAuthor] = useState("");

  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [seoKeywords, setSeoKeywords] = useState("");
  const [categories, setCategories] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSource, setSubmitSource] = useState(null); // 'header' | 'aside' | null

  const navigate = useNavigate();
  const { fetchCategories, addBlog } = useBlogContext();

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    })();
  }, [fetchCategories]);

  const urlSlug = useMemo(() => slugify(title), [title]);

  const formatTitleForURL = (t) =>
    t.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "");

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImageBase64(String(reader.result || ""));
      reader.readAsDataURL(file);
      setImage(file);
    }
  };

  // TIPTAP
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Underline,
      Link.configure({
        openOnClick: true,
        autolink: true,
        validate: (href) => /^https?:\/\//.test(href),
      }),
      Image,
      TextStyle,
      Color,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: "Write your blog content here…" }),
    ],
    content: "",
    onUpdate: ({ editor }) => setContentHTML(editor.getHTML()),
  });

  const addImageFromUrl = useCallback(() => {
    const url = window.prompt("Image URL");
    if (url) editor?.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!imageBase64 && !imageLink) {
      toast.error("Please upload an image or provide an image URL");
      return;
    }
    if (!category) {
      toast.error("Please select a category");
      return;
    }
    if (!title || !contentHTML || !author || !date) {
      toast.error("Please fill all required fields");
      return;
    }

    const formattedTitle = formatTitleForURL(title);

    const blogData = {
      title,
      content: contentHTML,
      imageBase64,
      imageLink,
      category,
      createdAt: new Date(),
      formattedDate: date,
      author,
      urlSlug: formattedTitle,
      seoTitle,
      seoDescription,
      seoKeywords: seoKeywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean)
        .join(", "),
    };

    try {
      setIsSubmitting(true);
      await addBlog(category, blogData);

      // reset
      setTitle("");
      setContentHTML("");
      editor?.commands.clearContent(true);
      setImage(null);
      setImageBase64("");
      setCategory("");
      setDate("");
      setAuthor("");
      setImageLink("");
      setSeoTitle("");
      setSeoDescription("");
      setSeoKeywords("");

      onClose?.();
      onSuccess?.();
    } catch (err) {
      toast.error("Error uploading blog: " + err.message);
    } finally {
      setIsSubmitting(false);
      setSubmitSource(null);
    }
  };

  const canUndo = !!editor?.can().undo();
  const canRedo = !!editor?.can().redo();

  return (
    <div className="addblog">
      {/* Sticky header */}
      <div className="add-header">
        <div className="add-header-left">
          <button className="btn subtle" onClick={onClose} disabled={isSubmitting}>
            ✕ Close
          </button>
          <div>
            <h1>New Post</h1>
            <p>Create content, add media, and publish.</p>
          </div>
        </div>
        <div className="add-header-right">
          <div className="slug-chip">
            /blog/<span>{urlSlug || "your-slug"}</span>
          </div>

          {/* HEADER SUBMIT BUTTON */}
          <button
            className={`btn primary ${isSubmitting && submitSource === "header" ? "loading" : ""}`}
            form="create-blog-form"
            type="submit"
            onClick={() => setSubmitSource("header")}
            disabled={isSubmitting}
            aria-live="polite"
          >
            {isSubmitting && submitSource === "header" ? (
              <>
                <span className="spinner" aria-hidden="true" /> Saving…
              </>
            ) : (
              "Save Post"
            )}
          </button>
        </div>
      </div>

      <form id="create-blog-form" onSubmit={handleSubmit} className="add-grid" aria-busy={isSubmitting}>
        {/* Main */}
        <div className="add-main">
          {/* Content */}
          <div className="card">
            <div className="card-head">
              <h2>Content</h2>
            </div>

            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter blog title"
                required
                type="text"
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label>Body</label>
              <div className="tt-toolbar">
                <MenuButton onClick={() => editor?.chain().focus().toggleBold().run()} active={editor?.isActive("bold")} title="Bold">B</MenuButton>
                <MenuButton onClick={() => editor?.chain().focus().toggleItalic().run()} active={editor?.isActive("italic")} title="Italic">I</MenuButton>
                <MenuButton onClick={() => editor?.chain().focus().toggleUnderline().run()} active={editor?.isActive("underline")} title="Underline">U</MenuButton>
                <MenuButton onClick={() => editor?.chain().focus().toggleStrike().run()} active={editor?.isActive("strike")} title="Strike">S</MenuButton>

                <span className="tt-sep" />

                <MenuButton onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()} active={editor?.isActive("heading", { level: 1 })} title="H1">H1</MenuButton>
                <MenuButton onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} active={editor?.isActive("heading", { level: 2 })} title="H2">H2</MenuButton>
                <MenuButton onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} active={editor?.isActive("heading", { level: 3 })} title="H3">H3</MenuButton>

                <span className="tt-sep" />

                <MenuButton onClick={() => editor?.chain().focus().toggleBulletList().run()} active={editor?.isActive("bulletList")} title="Bulleted">• •</MenuButton>
                <MenuButton onClick={() => editor?.chain().focus().toggleOrderedList().run()} active={editor?.isActive("orderedList")} title="Numbered">1.</MenuButton>
                <MenuButton onClick={() => editor?.chain().focus().toggleBlockquote().run()} active={editor?.isActive("blockquote")} title="Quote">“”</MenuButton>
                <MenuButton onClick={() => editor?.chain().focus().toggleCodeBlock().run()} active={editor?.isActive("codeBlock")} title="Code">{`{}`}</MenuButton>

                <span className="tt-sep" />

                <MenuButton onClick={() => editor?.chain().focus().setTextAlign("left").run()} title="Align left">⟸</MenuButton>
                <MenuButton onClick={() => editor?.chain().focus().setTextAlign("center").run()} title="Align center">≡</MenuButton>
                <MenuButton onClick={() => editor?.chain().focus().setTextAlign("right").run()} title="Align right">⟹</MenuButton>
                <MenuButton onClick={() => editor?.chain().focus().unsetTextAlign().run()} title="Clear align">⟷</MenuButton>

                <span className="tt-sep" />

                <MenuButton
                  onClick={() => {
                    const url = window.prompt("Enter URL");
                    if (!url) return;
                    editor?.chain().focus().extendMarkRange("link").setLink({ href: url, target: "_blank" }).run();
                  }}
                  title="Insert link"
                >
                  🔗
                </MenuButton>

                <MenuButton onClick={addImageFromUrl} title="Insert image">🖼️</MenuButton>

                <span className="tt-sep" />

                <MenuButton onClick={() => editor?.chain().focus().undo().run()} disabled={!editor?.can().undo() || isSubmitting} title="Undo">↶</MenuButton>
                <MenuButton onClick={() => editor?.chain().focus().redo().run()} disabled={!editor?.can().redo() || isSubmitting} title="Redo">↷</MenuButton>
              </div>

              <div className="tt-editor-wrap">
                <EditorContent editor={editor} className="tiptap-editor" />
              </div>
            </div>
          </div>

          {/* Media */}
          <div className="card">
            <div className="card-head">
              <h2>Featured Image</h2>
            </div>

            <div className="form-row">
              <div className="col">
                <label htmlFor="image">Upload Image</label>
                <input id="image" type="file" onChange={handleImageChange} accept="image/*" disabled={isSubmitting} />
              </div>
              <div className="col">
                <label htmlFor="imageLink">Or Image URL</label>
                <input
                  id="imageLink"
                  type="url"
                  value={imageLink}
                  onChange={(e) => setImageLink(e.target.value)}
                  placeholder="https://..."
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {(imageBase64 || imageLink) && (
              <div className="preview-card">
                <img src={imageBase64 || imageLink} alt="Preview" />
              </div>
            )}
          </div>

          {/* SEO */}
          <div className="card">
            <div className="card-head">
              <h2>SEO</h2>
              <p className="subtle">Optional, but recommended for better discovery.</p>
            </div>

            <div className="form-group">
              <label htmlFor="seoTitle">SEO Title</label>
              <input
                id="seoTitle"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="SEO title"
                type="text"
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="seoDescription">SEO Description</label>
              <input
                id="seoDescription"
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder="SEO description"
                type="text"
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="seoKeywords">SEO Keywords</label>
              <input
                id="seoKeywords"
                value={seoKeywords}
                onChange={(e) => setSeoKeywords(e.target.value)}
                placeholder="e.g. antivirus, windows, printer"
                type="text"
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>

        {/* Aside */}
        <aside className="add-aside">
          <div className="card">
            <div className="card-head">
              <h3>Post Details</h3>
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                disabled={isSubmitting}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="col">
                <label htmlFor="author">Author</label>
                <input
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Enter author name"
                  required
                  type="text"
                  disabled={isSubmitting}
                />
              </div>
              <div className="col">
                <label htmlFor="date">Date</label>
                <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* ASIDE SUBMIT BUTTON */}
            <button
              type="submit"
              className={`btn primary full ${isSubmitting && submitSource === "aside" ? "loading" : ""}`}
              onClick={() => setSubmitSource("aside")}
              disabled={isSubmitting}
              aria-live="polite"
            >
              {isSubmitting && submitSource === "aside" ? (
                <>
                  <span className="spinner" aria-hidden="true" /> Adding…
                </>
              ) : (
                "Add Blog"
              )}
            </button>
          </div>
        </aside>
      </form>
    </div>
  );
};

export default AddBlogForm;
