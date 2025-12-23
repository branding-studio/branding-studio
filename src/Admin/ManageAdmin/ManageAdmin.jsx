import React, { useEffect, useMemo, useState } from "react";
import {
  collection, doc, getDocs, orderBy, query,
  setDoc, updateDoc, deleteDoc, serverTimestamp
} from "firebase/firestore";
import {
  initializeApp, getApps, getApp
} from "firebase/app";
import {
  getAuth, createUserWithEmailAndPassword, signOut
} from "firebase/auth";
import { db, firebaseConfig } from "../../firebase/firebaseConfig";
import { useAdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import "./ManageAdmin.css";

const ROLES = [
  { value: "master", label: "Master (superuser)" },
  { value: "all", label: "Admin" },
  { value: "editor", label: "Editor" },
  { value: "viewer", label: "Viewer (readonly)" },
];

const STATUS = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

const ManageAdmin = () => {
  const { admin } = useAdminContext();
  const isMaster = admin?.role === "master";

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("editor");
  const [status, setStatus] = useState("active");
  const [tempPassword, setTempPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [editing, setEditing] = useState(null);
  const [editRow, setEditRow] = useState({
    email: "", name: "", role: "editor", status: "active",
  });

  const adminsRef = useMemo(() => collection(db, "admin"), []);

   useEffect(()=>{
      document.title = "Admin | Manage Admin"
    },[])
  

  // Secondary app/auth so current session (master) stays logged in
  const secondaryApp = useMemo(() => {
    const name = "SecondaryApp";
    const existing = getApps().find(a => a.name === name);
    return existing ?? initializeApp(firebaseConfig, name);
  }, []);
  const secondaryAuth = useMemo(() => getAuth(secondaryApp), [secondaryApp]);

  useEffect(() => {
    const load = async () => {
      try {
        const q = query(adminsRef, orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) {
        toast.error("Failed to load admins");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [adminsRef]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!email.trim() || !name.trim() || !tempPassword.trim()) {
      return toast.error("Email, Name and Temp Password are required");
    }
    setSubmitting(true);
    try {
      // 1) Create new user in SECONDARY auth (won’t affect your master session)
      const cred = await createUserWithEmailAndPassword(
        secondaryAuth,
        email.trim(),
        tempPassword.trim()
      );
      const uid = cred.user.uid;

      // (optional) immediately sign out secondary auth so it keeps no active session
      await signOut(secondaryAuth).catch(() => {});

      // 2) Write admin doc using the CURRENT (master) session & Firestore
      const payload = {
        email: email.trim(),
        name: name.trim(),
        role,
        status,
        createdAt: serverTimestamp(),
        lastUpdatedAt: serverTimestamp(),
      };
      await setDoc(doc(db, "admin", uid), payload);

      toast.success("Admin account created successfully");
      setItems(prev => [{ id: uid, ...payload }, ...prev]);

      // reset form
      setEmail(""); setName(""); setRole("editor"); setStatus("active"); setTempPassword("");
    } catch (e) {
      toast.error(e?.message || "Failed to create admin");
    } finally {
      setSubmitting(false);
    }
  };

  const startEdit = (row) => {
    setEditing(row.id);
    setEditRow({
      email: row.email || "",
      name: row.name || "",
      role: row.role || "editor",
      status: row.status || "active",
    });
  };

  const cancelEdit = () => {
    setEditing(null);
    setEditRow({ email: "", name: "", role: "editor", status: "active" });
  };

  const saveEdit = async (uidToUpdate) => {
    try {
      await updateDoc(doc(db, "admin", uidToUpdate), {
        ...editRow,
        lastUpdatedAt: serverTimestamp(),
      });
      toast.success("Admin updated");
      setItems(prev => prev.map(x => x.id === uidToUpdate ? { ...x, ...editRow } : x));
      cancelEdit();
    } catch (e) {
      toast.error(e?.message || "Failed to update admin");
    }
  };

  const remove = async (uidToDelete) => {
    if (uidToDelete === admin?.uid) return toast.error("You cannot delete yourself.");
    if (!window.confirm("Delete this admin? This only removes Firestore doc.")) return;
    try {
      await deleteDoc(doc(db, "admin", uidToDelete));
      setItems(prev => prev.filter(x => x.id !== uidToDelete));
      toast.success("Admin deleted from Firestore. (Auth user not removed.)");
    } catch (e) {
      toast.error(e?.message || "Failed to delete admin");
    }
  };

  if (!isMaster) {
    return (
      <div className="forbidden">
        <h2>403 — Forbidden</h2>
        <p>You need master role to manage admins.</p>
      </div>
    );
  }

  return (
    <div className="manage-admin">
      <h2>Manage Admins</h2>

      <form onSubmit={handleAdd} className="card form">
        <div className="grid-2">
          <div>
            <label className="lbl">Email</label>
            <input className="inp" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="lbl">Temp Password</label>
            <input className="inp" type="text" value={tempPassword} onChange={e => setTempPassword(e.target.value)} />
          </div>
        </div>

        <div className="grid-3">
          <div>
            <label className="lbl">Name</label>
            <input className="inp" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div>
            <label className="lbl">Role</label>
            <select className="inp" value={role} onChange={e => setRole(e.target.value)}>
              {ROLES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
            </select>
          </div>
          <div>
            <label className="lbl">Status</label>
            <select className="inp" value={status} onChange={e => setStatus(e.target.value)}>
              {STATUS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
        </div>

        <div className="actions">
          <button className="btn primary" type="submit" disabled={submitting}>
            {submitting ? "Creating…" : "Create Admin"}
          </button>
          <button
            className="btn ghost"
            type="button"
            onClick={() => {
              setEmail(""); setName(""); setTempPassword("");
              setRole("editor"); setStatus("active");
            }}
            disabled={submitting}
          >
            Reset
          </button>
        </div>
      </form>

      <div className="card">
        <div className="table-head">
          <h3>All Admins</h3>
          {loading && <span>Loading…</span>}
        </div>

        <div className="table-wrap">
          <table className="tbl">
            <thead>
              <tr>
                <th>UID</th><th>Email</th><th>Name</th><th>Role</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {!loading && items.length === 0 && (
                <tr><td colSpan="6">No admins.</td></tr>
              )}
              {items.map(row => {
                const isEditing = editing === row.id;
                return (
                  <tr key={row.id}>
                    <td className="mono">{row.id}</td>
                    <td>{isEditing
                      ? <input className="inp" value={editRow.email} onChange={e => setEditRow(r => ({ ...r, email: e.target.value }))} />
                      : row.email}</td>
                    <td>{isEditing
                      ? <input className="inp" value={editRow.name} onChange={e => setEditRow(r => ({ ...r, name: e.target.value }))} />
                      : row.name}</td>
                    <td>{isEditing
                      ? <select className="inp" value={editRow.role} onChange={e => setEditRow(r => ({ ...r, role: e.target.value }))}>
                          {ROLES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                        </select>
                      : row.role}</td>
                    <td>{isEditing
                      ? <select className="inp" value={editRow.status} onChange={e => setEditRow(r => ({ ...r, status: e.target.value }))}>
                          {STATUS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                        </select>
                      : row.status}</td>
                    <td>
                      {isEditing ? (
                        <>
                          <button className="btn primary" onClick={() => saveEdit(row.id)}>Save</button>
                          <button className="btn ghost" onClick={cancelEdit}>Cancel</button>
                        </>
                      ) : (
                        <>
                          <button className="btn" onClick={() => startEdit(row)}>Edit</button>
                          {isMaster && <button className="btn danger" onClick={() => remove(row.id)}>Delete</button>}
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageAdmin;
