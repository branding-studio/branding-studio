import React, { useMemo, useState } from "react";
import "./ManageTeam.css";
import { db, storage } from "../firebase"; // <-- adjust the path if needed
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytesResumable,
} from "firebase/storage";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  designation: "",
  description: "",
  skills: "",                 // comma-separated
  workingSince: "",           // yyyy-mm-dd
  status: "active",           // active | inactive
  employmentType: "full_time",// full_time | part_time | contractor | intern
  location: "",
  socials: {
    linkedin: "",
    github: "",
    twitter: "",
    website: "",
  },
  avatarFile: null,           // File
};

const emailRe =
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

function sanitizePhone(v) {
  // keep digits, +, and spaces
  return v.replace(/[^\d+\s]/g, "");
}

function parseSkills(s) {
  return s
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
}

const ManageTeam = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState(null);

  const isValid = useMemo(() => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!emailRe.test(form.email)) e.email = "Valid email is required.";
    if (form.phone && !/^[\d+\s-]{7,20}$/.test(sanitizePhone(form.phone))) {
      e.phone = "Phone looks invalid.";
    }
    if (!form.designation.trim())
      e.designation = "Designation is required.";
    if (!form.workingSince)
      e.workingSince = "Working since (date) is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // nested socials
    if (name.startsWith("socials.")) {
      const key = name.split(".")[1];
      setForm((f) => ({
        ...f,
        socials: { ...f.socials, [key]: value },
      }));
      return;
    }
    if (name === "phone") {
      setForm((f) => ({ ...f, phone: sanitizePhone(value) }));
      return;
    }
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleAvatar = (e) => {
    const file = e.target.files?.[0] || null;
    setForm((f) => ({ ...f, avatarFile: file }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setErrors({});
    setProgress(0);
    setMessage(null);
  };

  const saveToFirestore = async (payload) => {
    const id = form.email.trim().toLowerCase(); // email as doc id
    const ref = doc(db, "team", id);

    // set createdAt only if doc doesn't exist yet
    const snap = await getDoc(ref);
    const base = {
      ...payload,
      updatedAt: serverTimestamp(),
    };
    if (!snap.exists()) base.createdAt = serverTimestamp();

    // Upsert with merge so you can update individual fields safely
    await setDoc(ref, base, { merge: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!isValid || saving) return;
    setSaving(true);
    setProgress(0);

    try {
      // 1) Prepare avatar upload (optional)
      let avatarUrl = "";
      if (form.avatarFile) {
        const ext = form.avatarFile.name.split(".").pop() || "jpg";
        const fileRef = storageRef(
          storage,
          `team_avatars/${form.email.toLowerCase()}.${ext}`
        );
        const task = uploadBytesResumable(fileRef, form.avatarFile);
        await new Promise((resolve, reject) => {
          task.on(
            "state_changed",
            (snap) => {
              const pct = Math.round(
                (snap.bytesTransferred / snap.totalBytes) * 100
              );
              setProgress(pct);
            },
            reject,
            resolve
          );
        });
        avatarUrl = await getDownloadURL(task.snapshot.ref);
      }

      // 2) Build payload
      const payload = {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        designation: form.designation.trim(),
        description: form.description.trim(),
        skills: parseSkills(form.skills),
        workingSince: form.workingSince
          ? Timestamp.fromDate(new Date(form.workingSince))
          : null,
        status: form.status,
        employmentType: form.employmentType,
        location: form.location.trim(),
        socials: {
          linkedin: form.socials.linkedin.trim(),
          github: form.socials.github.trim(),
          twitter: form.socials.twitter.trim(),
          website: form.socials.website.trim(),
        },
        ...(avatarUrl ? { avatarUrl } : {}),
      };

      // 3) Save
      await saveToFirestore(payload);

      setMessage({ type: "success", text: "Team member saved successfully." });
      // Keep form but clear file/progress
      setForm((f) => ({ ...f, avatarFile: null }));
      setProgress(0);
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text:
          err?.message ||
          "Something went wrong while saving. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="manage-team">
      <header className="mt-header">
        <h2>Manage Team</h2>
        <p>Add or update a team member. Saved to <code>team/&lt;email&gt;</code>.</p>
      </header>

      <form className="mt-form" onSubmit={handleSubmit}>
        {/* Left column */}
        <div className="mt-grid">
          <div className="mt-card">
            <h3 className="mt-card-title">Profile</h3>

            <div className="mt-field">
              <label htmlFor="name">Name *</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Aisha Sharma"
              />
              {errors.name && <p className="mt-error">{errors.name}</p>}
            </div>

            <div className="mt-row-2">
              <div className="mt-field">
                <label htmlFor="email">Email (doc id) *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="aisha@example.com"
                />
                {errors.email && <p className="mt-error">{errors.email}</p>}
              </div>

              <div className="mt-field">
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                />
                {errors.phone && <p className="mt-error">{errors.phone}</p>}
              </div>
            </div>

            <div className="mt-row-2">
              <div className="mt-field">
                <label htmlFor="designation">Designation *</label>
                <input
                  id="designation"
                  name="designation"
                  type="text"
                  value={form.designation}
                  onChange={handleChange}
                  placeholder="Lead Instructor"
                />
                {errors.designation && (
                  <p className="mt-error">{errors.designation}</p>
                )}
              </div>

              <div className="mt-field">
                <label htmlFor="location">Location</label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Bengaluru, IN"
                />
              </div>
            </div>

            <div className="mt-field">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={form.description}
                onChange={handleChange}
                placeholder="Short bio or responsibilities…"
              />
            </div>

            <div className="mt-row-2">
              <div className="mt-field">
                <label htmlFor="skills">Skills (comma-separated)</label>
                <input
                  id="skills"
                  name="skills"
                  type="text"
                  value={form.skills}
                  onChange={handleChange}
                  placeholder="React, Firebase, UX"
                />
              </div>

              <div className="mt-field">
                <label htmlFor="workingSince">Working Since *</label>
                <input
                  id="workingSince"
                  name="workingSince"
                  type="date"
                  value={form.workingSince}
                  onChange={handleChange}
                />
                {errors.workingSince && (
                  <p className="mt-error">{errors.workingSince}</p>
                )}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="mt-card">
            <h3 className="mt-card-title">Meta & Social</h3>

            <div className="mt-row-2">
              <div className="mt-field">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="mt-field">
                <label htmlFor="employmentType">Employment Type</label>
                <select
                  id="employmentType"
                  name="employmentType"
                  value={form.employmentType}
                  onChange={handleChange}
                >
                  <option value="full_time">Full-time</option>
                  <option value="part_time">Part-time</option>
                  <option value="contractor">Contractor</option>
                  <option value="intern">Intern</option>
                </select>
              </div>
            </div>

            <div className="mt-field">
              <label htmlFor="linkedin">LinkedIn</label>
              <input
                id="linkedin"
                name="socials.linkedin"
                type="url"
                value={form.socials.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            <div className="mt-field">
              <label htmlFor="github">GitHub</label>
              <input
                id="github"
                name="socials.github"
                type="url"
                value={form.socials.github}
                onChange={handleChange}
                placeholder="https://github.com/username"
              />
            </div>
            <div className="mt-field">
              <label htmlFor="twitter">Twitter</label>
              <input
                id="twitter"
                name="socials.twitter"
                type="url"
                value={form.socials.twitter}
                onChange={handleChange}
                placeholder="https://twitter.com/username"
              />
            </div>
            <div className="mt-field">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="socials.website"
                type="url"
                value={form.socials.website}
                onChange={handleChange}
                placeholder="https://example.com"
              />
            </div>

            <div className="mt-field">
              <label htmlFor="avatar">Avatar (optional)</label>
              <input id="avatar" type="file" accept="image/*" onChange={handleAvatar} />
              {progress > 0 && progress < 100 && (
                <div className="mt-progress">
                  <div className="mt-progress-bar" style={{ width: `${progress}%` }} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        {message && (
          <div
            className={`mt-alert ${message.type === "error" ? "error" : "success"}`}
            role="status"
          >
            {message.text}
          </div>
        )}

        <div className="mt-actions">
          <button className="btn primary" type="submit" disabled={saving || !isValid}>
            {saving ? "Saving…" : "Save Member"}
          </button>
          <button className="btn ghost" type="button" onClick={resetForm} disabled={saving}>
            Clear
          </button>
        </div>
      </form>
    </section>
  );
};

export default ManageTeam;
