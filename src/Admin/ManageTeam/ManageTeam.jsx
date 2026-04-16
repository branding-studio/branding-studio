import React, { useEffect, useMemo, useRef, useState } from "react";
import "./ManageTeam.css";
import { db } from "../../firebase/firebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

const initialForm = {
  type: "core",
  name: "",
  role: "",
  description: "",
  imageUrl: "",
  isVisible: true,
  sortOrder: 1,
};

const ManageTeam = () => {
  const [form, setForm] = useState(initialForm);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const imageInputRef = useRef(null);

  const teamRef = collection(db, "team");
  const isLeadershipType = form.type === "founder" || form.type === "cofounder";

  const compressImage = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const maxDimension = 480;
          const scale = Math.min(1, maxDimension / Math.max(img.width, img.height));
          const canvas = document.createElement("canvas");
          canvas.width = Math.round(img.width * scale);
          canvas.height = Math.round(img.height * scale);

          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("Canvas is not supported in this browser."));
            return;
          }

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const optimizedDataUrl = canvas.toDataURL("image/jpeg", 0.68);

          if (optimizedDataUrl.length > 300000) {
            reject(
              new Error("Photo is still too large after compression. Please use a smaller image.")
            );
            return;
          }

          resolve(optimizedDataUrl);
        };
        img.onerror = () => reject(new Error("Selected file is not a valid image."));
        img.src = reader.result;
      };
      reader.onerror = () => reject(new Error("Failed to read image file."));
      reader.readAsDataURL(file);
    });

  const fetchTeamMembers = async () => {
    try {
      setFetching(true);
      const q = query(teamRef, orderBy("sortOrder", "asc"));
      const snap = await getDocs(q);
      const rows = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setTeamMembers(rows);
    } catch (error) {
      console.error("Failed to fetch team members:", error);
      setMessage({
        type: "error",
        text: "Failed to load team members.",
      });
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "sortOrder"
          ? Number(value)
          : value,
    }));
  };

  const isValid = useMemo(() => {
    return (
      form.type &&
      form.name.trim() &&
      form.role.trim() &&
      (form.imageUrl.trim() || selectedImage) &&
      Number.isFinite(Number(form.sortOrder))
    );
  }, [form, selectedImage]);

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
    setMessage(null);
    setSelectedImage(null);
    setPreviewImage("");
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0] || null;
    setSelectedImage(file);
    setPreviewImage(file ? URL.createObjectURL(file) : form.imageUrl || "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!isValid || loading) {
      setMessage({
        type: "error",
        text: "Please fill all required fields correctly.",
      });
      return;
    }

    try {
      setLoading(true);
      let uploadedImageUrl = form.imageUrl.trim();

      if (selectedImage) {
        uploadedImageUrl = await compressImage(selectedImage);
      }

      const payload = {
        type: form.type,
        name: form.name.trim(),
        role: form.role.trim(),
        description: form.type === "core" ? "" : form.description.trim(),
        imageUrl: uploadedImageUrl,
        isVisible: !!form.isVisible,
        sortOrder: Number(form.sortOrder) || 1,
        updatedAt: serverTimestamp(),
      };

      const duplicateLeadership = teamMembers.find(
        (member) => member.type === form.type && member.id !== editingId
      );

      if ((form.type === "founder" || form.type === "cofounder") && duplicateLeadership) {
        throw new Error(
          `A ${form.type === "founder" ? "Founder" : "Co-Founder"} already exists. Please edit the existing entry instead of adding a new one.`
        );
      }

      if (editingId) {
        await updateDoc(doc(db, "team", editingId), payload);
        setMessage({
          type: "success",
          text: "Team member updated successfully.",
        });
      } else {
        await addDoc(teamRef, {
          ...payload,
          createdAt: serverTimestamp(),
        });
        setMessage({
          type: "success",
          text: "Team member added successfully.",
        });
      }

      await fetchTeamMembers();
      resetForm();
      setMessage({
        type: "success",
        text: editingId
          ? "Team member updated successfully."
          : "Team member added successfully.",
      });
    } catch (error) {
      console.error("Save failed:", error);
      setMessage({
        type: "error",
        text: error?.message || "Something went wrong while saving.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (member) => {
    setEditingId(member.id);
    setForm({
      type: member.type || "core",
      name: member.name || "",
      role: member.role || "",
      description: member.description || "",
      imageUrl: member.imageUrl || "",
      isVisible: member.isVisible ?? true,
      sortOrder: member.sortOrder ?? 1,
    });
    setSelectedImage(null);
    setPreviewImage(member.imageUrl || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this team member?");
    if (!ok) return;

    try {
      await deleteDoc(doc(db, "team", id));
      setMessage({
        type: "success",
        text: "Team member deleted successfully.",
      });
      if (editingId === id) resetForm();
      await fetchTeamMembers();
    } catch (error) {
      console.error("Delete failed:", error);
      setMessage({
        type: "error",
        text: "Failed to delete team member.",
      });
    }
  };

  const handleToggleVisibility = async (member) => {
    try {
      await updateDoc(doc(db, "team", member.id), {
        isVisible: !member.isVisible,
        updatedAt: serverTimestamp(),
      });
      await fetchTeamMembers();
    } catch (error) {
      console.error("Visibility update failed:", error);
      setMessage({
        type: "error",
        text: "Failed to update visibility.",
      });
    }
  };

  return (
    <section className="manage-team">
      <header className="mt-header">
        <h2>Manage Team</h2>
        <p>
          Add, update, hide, or delete Founder, Co-Founder, and Core Team members.
        </p>
      </header>

      <form className="mt-form" onSubmit={handleSubmit}>
        <div className="mt-grid">
          <div className="mt-card">
            <h3 className="mt-card-title">Team Member Details</h3>

            <div className="mt-field">
              <label htmlFor="type">Team Section *</label>
              <select
                id="type"
                name="type"
                value={form.type}
                onChange={handleChange}
              >
                <option value="core">Core Team</option>
                <option value="founder">Founder</option>
                <option value="cofounder">Co-Founder</option>
              </select>
            </div>

            <div className="mt-field">
              <label htmlFor="name">Name *</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Rahul Sharma"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="mt-row-2">
              <div className="mt-field">
                <label htmlFor="role">Role *</label>
                <input
                  id="role"
                  name="role"
                  type="text"
                  placeholder="Video Editor"
                  value={form.role}
                  onChange={handleChange}
                />
              </div>

              <div className="mt-field">
                <label htmlFor="sortOrder">Display Order *</label>
                <input
                  id="sortOrder"
                  name="sortOrder"
                  type="number"
                  min="1"
                  placeholder="1"
                  value={form.sortOrder}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mt-field">
              <label htmlFor="teamPhoto">Photo *</label>
              <input
                id="teamPhoto"
                name="teamPhoto"
                type="file"
                accept="image/*"
                ref={imageInputRef}
                onChange={handleImageChange}
              />
              <p className="mt-field-help">
                Choose an image from your system. It will be uploaded automatically.
              </p>
            </div>

            {isLeadershipType ? (
              <div className="mt-field">
                <label htmlFor="description">Description (optional)</label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  placeholder="Short description..."
                  value={form.description}
                  onChange={handleChange}
                />
              </div>
            ) : null}

            <div className="mt-check">
              <input
                id="isVisible"
                name="isVisible"
                type="checkbox"
                checked={form.isVisible}
                onChange={handleChange}
              />
              <label htmlFor="isVisible">Show on website</label>
            </div>
          </div>

          <div className="mt-card">
            <h3 className="mt-card-title">Preview</h3>

            <div className="mt-preview-card">
              <div className="mt-preview-image">
                {previewImage || form.imageUrl ? (
                  <img src={previewImage || form.imageUrl} alt={form.name || "Preview"} />
                ) : (
                  <div className="mt-preview-placeholder">No Image</div>
                )}
              </div>

              <div className="mt-preview-content">
                <h4>{form.name || "Team Member Name"}</h4>
                <p className="mt-preview-role-tag">
                  {form.type === "founder"
                    ? "Founder"
                    : form.type === "cofounder"
                    ? "Co-Founder"
                    : "Core Team"}
                </p>
                <p className="mt-preview-role">{form.role || "Role / Designation"}</p>
                {isLeadershipType && form.description ? (
                  <p className="mt-preview-desc">{form.description}</p>
                ) : null}
                <span className={`mt-visibility ${form.isVisible ? "show" : "hide"}`}>
                  {form.isVisible ? "Visible on website" : "Hidden from website"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {message && (
          <div className={`mt-alert ${message.type}`}>
            {message.text}
          </div>
        )}

        <div className="mt-actions">
          <button className="btn primary" type="submit" disabled={loading}>
            {loading
              ? editingId
                ? "Updating..."
                : "Saving..."
              : editingId
              ? "Update Member"
              : "Save Member"}
          </button>

          <button
            className="btn ghost"
            type="button"
            onClick={resetForm}
            disabled={loading}
          >
            Clear
          </button>
        </div>
      </form>

      <section className="mt-saved">
        <div className="mt-saved-head">
          <h3>Saved Team Members</h3>
          <p>These members will appear in the Leadership or Core Team sections.</p>
        </div>

        {fetching ? (
          <div className="mt-empty">Loading team members...</div>
        ) : teamMembers.length === 0 ? (
          <div className="mt-empty">No team members added yet.</div>
        ) : (
          <div className="mt-member-grid">
            {teamMembers.map((member) => (
              <article className="mt-member-card" key={member.id}>
                <div className="mt-member-img">
                  <img src={member.imageUrl} alt={member.name} />
                </div>

                <div className="mt-member-body">
                  <h4>{member.name}</h4>
                  <span className={`mt-member-type mt-member-type--${member.type || "core"}`}>
                    {member.type === "founder"
                      ? "Founder"
                      : member.type === "cofounder"
                      ? "Co-Founder"
                      : "Core Team"}
                  </span>
                  <p>{member.role}</p>

                  <div className="mt-member-meta">
                    <span>Order: {member.sortOrder}</span>
                    <span className={member.isVisible ? "active" : "inactive"}>
                      {member.isVisible ? "Visible" : "Hidden"}
                    </span>
                  </div>

                  <div className="mt-member-actions">
                    <button
                      className="btn small"
                      type="button"
                      onClick={() => handleEdit(member)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn small ghost"
                      type="button"
                      onClick={() => handleToggleVisibility(member)}
                    >
                      {member.isVisible ? "Hide" : "Show"}
                    </button>

                    <button
                      className="btn small danger"
                      type="button"
                      onClick={() => handleDelete(member.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </section>
  );
};

export default ManageTeam;
