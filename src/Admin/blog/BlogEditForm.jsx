import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useBlogContext } from "../../context/BlogContext";

// Tiptap
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";

import "./BlogEditForm.css";

const slugify = (str) =>
  str.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

const MenuButton = ({ onClick, active, title, disabled, children }) => (
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

const BlogEditForm = () => {
  const navigate = useNavigate();
  const { selectedBlog, fetchCategories, updateBlog } = useBlogContext();

  const [title, setTitle] = useState("");
  const [contentHTML, setContentHTML] = useState("");
  const [category, setCategory] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [urlSlug, setUrlSlug] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [seoKeywords, setSeoKeywords] = useState("");
  const [categories, setCategories] = useState([]);

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

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      TextStyle,
      Color,
      Underline,
      Link.configure({ openOnClick: true, autolink: true }),
      Image,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: "Edit your post…" }),
    ],
    content: "",
    onUpdate: ({ editor }) => setContentHTML(editor.getHTML()),
  });

  useEffect(() => {
    if (!selectedBlog) return;
    setTitle(selectedBlog.title || "");
    setCategory(selectedBlog.category || "");
    setImageBase64(selectedBlog.imageBase64 || "");
    setImageLink(selectedBlog.imageLink || "");
    setAuthor(selectedBlog.author || "");
    setDate(selectedBlog.date || "");
    setUrlSlug(selectedBlog.urlSlug || "");
    setSeoTitle(selectedBlog.seoTitle || "");
    setSeoDescription(selectedBlog.seoDescription || "");
    setSeoKeywords(selectedBlog.seoKeywords || "");

    if (editor) {
      const html = selectedBlog.content || "";
      editor.commands.setContent(html || "<p></p>", false);
      setContentHTML(html);
    }
  }, [selectedBlog, editor]);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setUrlSlug(slugify(newTitle));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImageBase64(String(reader.result || ""));
    reader.readAsDataURL(file);
  };

  const addImageFromUrl = useCallback(() => {
    const url = window.prompt("Image URL");
    if (url) editor?.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !contentHTML || !category || !author || !date || !urlSlug) {
      toast.error("All fields are required!");
      return;
    }

    try {
      await updateBlog(
        selectedBlog.id,
        {
          title,
          content: contentHTML,
          category,
          imageBase64,
          imageLink,
          author,
          date,
          urlSlug,
          seoTitle,
          seoDescription,
          seoKeywords,
        },
        category
      );

      toast.success("Blog updated successfully!");
      navigate("/admin/blog");
    } catch (error) {
      toast.error("Error updating blog: " + error.message);
    }
  };

  const handleBackClick = () => navigate("/admin/blog");

  const canUndo = !!editor?.can().undo();
  const canRedo = !!editor?.can().redo();

  return (
    <div className="editblog">
      {/* Sticky header */}
      <div className="edit-header">
        <div className="edit-header-left">
          <button onClick={handleBackClick} className="back-btn">← Back</button>
          <div>
            <h1>Edit Post</h1>
            <p>Update content, media, and SEO.</p>
          </div>
        </div>
        <div className="edit-header-right">
          <div className="slug-chip" title="URL Slug">
            /blog/<span>{urlSlug || "your-slug"}</span>
          </div>
          <button form="blog-edit-form" type="submit" className="btn primary">Save Changes</button>
        </div>
      </div>

      <form onSubmit={handleSubmit} id="blog-edit-form" className="edit-grid">
        {/* Main */}
        <div className="edit-main">
          {/* Content Card */}
          <div className="card">
            <div className="card-head">
              <h2>Content</h2>
            </div>

            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="Enter blog title"
                required
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

                <MenuButton onClick={() => editor?.chain().focus().undo().run()} disabled={!canUndo} title="Undo">↶</MenuButton>
                <MenuButton onClick={() => editor?.chain().focus().redo().run()} disabled={!canRedo} title="Redo">↷</MenuButton>
              </div>

              <EditorContent editor={editor} className="tiptap" />
            </div>
          </div>

          {/* Media Card */}
          <div className="card">
            <div className="card-head">
              <h2>Featured Image</h2>
            </div>

            <div className="form-row">
              <div className="col">
                <label htmlFor="image">Upload Image</label>
                <input id="image" type="file" onChange={handleImageChange} accept="image/*" />
              </div>
              <div className="col">
                <label htmlFor="imageLink">Or Image URL</label>
                <input
                  id="imageLink"
                  type="url"
                  value={imageLink}
                  onChange={(e) => setImageLink(e.target.value)}
                  placeholder="https://..."
                />
              </div>
            </div>

            {(imageBase64 || imageLink) && (
              <div className="preview-card">
                <img src={imageBase64 || imageLink} alt="Preview" />
              </div>
            )}
          </div>

          {/* SEO Card */}
          <div className="card">
            <div className="card-head">
              <h2>SEO</h2>
              <p className="subtle">Optional, but recommended for better discovery.</p>
            </div>

            <div className="form-group">
              <label htmlFor="seoTitle">SEO Title</label>
              <input
                id="seoTitle"
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="Enter SEO Title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="seoDescription">SEO Description</label>
              <input
                id="seoDescription"
                type="text"
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder="Enter SEO Description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="seoKeywords">SEO Keywords (comma separated)</label>
              <input
                id="seoKeywords"
                type="text"
                value={seoKeywords}
                onChange={(e) => setSeoKeywords(e.target.value)}
                placeholder="keyword, another, phrase"
              />
            </div>
          </div>
        </div>

        {/* Aside */}
        <aside className="edit-aside">
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
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Author name"
                  required
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
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="urlSlug">URL Slug</label>
              <input
                id="urlSlug"
                type="text"
                value={urlSlug}
                onChange={(e) => setUrlSlug(slugify(e.target.value))}
                placeholder="auto-generated-from-title"
              />
              <p className="help">This forms the URL of the post.</p>
            </div>

            <button type="submit" className="btn primary full">Update Blog</button>
          </div>
        </aside>
      </form>
    </div>
  );
};

export default BlogEditForm;
