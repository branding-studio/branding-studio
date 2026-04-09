import React, { useEffect, useMemo, useState } from "react";
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

  const teamRef = collection(db, "team");

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
      form.name.trim() &&
      form.role.trim() &&
      form.imageUrl.trim() &&
      Number.isFinite(Number(form.sortOrder))
    );
  }, [form]);

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
    setMessage(null);
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

    const payload = {
      name: form.name.trim(),
      role: form.role.trim(),
      description: form.description.trim(),
      imageUrl: form.imageUrl.trim(),
      isVisible: !!form.isVisible,
      sortOrder: Number(form.sortOrder) || 1,
      type: "core",
      updatedAt: serverTimestamp(),
    };

    try {
      setLoading(true);

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

      resetForm();
      await fetchTeamMembers();
    } catch (error) {
      console.error("Save failed:", error);
      setMessage({
        type: "error",
        text: "Something went wrong while saving.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (member) => {
    setEditingId(member.id);
    setForm({
      name: member.name || "",
      role: member.role || "",
      description: member.description || "",
      imageUrl: member.imageUrl || "",
      isVisible: member.isVisible ?? true,
      sortOrder: member.sortOrder ?? 1,
    });
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
          Add, update, hide, or delete core team members. Founder and Co-Founder
          stay hardcoded on the public page.
        </p>
      </header>

      <form className="mt-form" onSubmit={handleSubmit}>
        <div className="mt-grid">
          <div className="mt-card">
            <h3 className="mt-card-title">Team Member Details</h3>

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
              <label htmlFor="imageUrl">Photo URL *</label>
              <input
                id="imageUrl"
                name="imageUrl"
                type="text"
                placeholder="https://example.com/team-member.jpg"
                value={form.imageUrl}
                onChange={handleChange}
              />
            </div>

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
                {form.imageUrl ? (
                  <img src={form.imageUrl} alt={form.name || "Preview"} />
                ) : (
                  <div className="mt-preview-placeholder">No Image</div>
                )}
              </div>

              <div className="mt-preview-content">
                <h4>{form.name || "Team Member Name"}</h4>
                <p className="mt-preview-role">{form.role || "Role / Designation"}</p>
                {form.description ? (
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
          <p>These members will appear in the Core Team section.</p>
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