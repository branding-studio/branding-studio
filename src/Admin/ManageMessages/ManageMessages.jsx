import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useMessageContext } from "../../context/MessageContext";
import "./ManageMessages.css";

const safeDate = (ts) => {
  // Supports Firestore Timestamp, millis, or missing
  try {
    if (!ts) return "-";
    if (typeof ts === "number") return new Date(ts).toLocaleString();
    if (ts?.seconds) return new Date(ts.seconds * 1000).toLocaleString();
    if (ts?.toDate) return ts.toDate().toLocaleString();
  } catch {}
  return "-";
};

const ManageMessages = () => {
  const { messages, deleteMessage, clearMessages } = useMessageContext();

  const [query, setQuery] = useState("");
  const [type, setType] = useState("all"); // contact | context | all
  const [author, setAuthor] = useState("all"); // user | admin | all
  const [sort, setSort] = useState("newest"); // newest | oldest
  const [confirmingClear, setConfirmingClear] = useState(false);

  useEffect(() => {
    document.title = "Admin | Manage Messages";
  }, []);

  const filtered = useMemo(() => {
    let list = Array.isArray(messages) ? [...messages] : [];
    if (type !== "all") list = list.filter((m) => (m.type || "contact") === type);
    if (author !== "all") list = list.filter((m) => (m.author || "user") === author);

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((m) => {
        const name = `${m.name || ""} ${m.last || ""}`.toLowerCase();
        return (
          (m.text || m.message || "").toLowerCase().includes(q) ||
          (m.email || "").toLowerCase().includes(q) ||
          (m.phone || "").toLowerCase().includes(q) ||
          name.includes(q)
        );
      });
    }

    list.sort((a, b) => {
      const aT = a.createdAt?.seconds ? a.createdAt.seconds * 1000 : a.createdAt || 0;
      const bT = b.createdAt?.seconds ? b.createdAt.seconds * 1000 : b.createdAt || 0;
      return sort === "newest" ? bT - aT : aT - bT;
    });

    return list;
  }, [messages, query, type, author, sort]);

const onDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this message? This action cannot be undone.")) {
    return;
  }
  try {
    await deleteMessage(id);
    toast.success("Message deleted.");
  } catch (e) {
    console.error(e);
    toast.error("Failed to delete message.");
  }
};

const onClearAll = async () => {
  if (!window.confirm("This will permanently delete all messages. Are you sure?")) {
    return;
  }
  try {
    await clearMessages();
    toast.success("All messages cleared.");
    setConfirmingClear(false);
  } catch (e) {
    console.error(e);
    toast.error("Failed to clear messages.");
  }
};


  return (
    <div className="manage-messages">
      <div className="mm-header">
        <div>
          <h2>Customer Messages</h2>
          <p className="mm-sub">Live from Firestore via MessageContext</p>
        </div>
        <div className="mm-actions">
          {!confirmingClear ? (
            <button className="btn danger" onClick={() => setConfirmingClear(true)}>
              Clear All
            </button>
          ) : (
            <div className="confirm-wrap">
              <span>Clear all messages?</span>
              <button className="btn danger" onClick={onClearAll}>Yes</button>
              <button className="btn" onClick={() => setConfirmingClear(false)}>No</button>
            </div>
          )}
        </div>
      </div>

      <div className="mm-toolbar">
        <input
          className="mm-input"
          placeholder="Search by name, email, phone, or message…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="mm-filters">
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="all">All Types</option>
            <option value="contact">Contact</option>
            <option value="context">Context</option>
          </select>

          <select value={author} onChange={(e) => setAuthor(e.target.value)}>
            <option value="all">All Authors</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mm-empty">No messages found.</p>
      ) : (
        <div className="mm-table-wrap">
          <table className="mm-table">
            <thead>
              <tr>
                <th>Name / Email</th>
                <th>Phone</th>
                <th>Type</th>
                <th>Author</th>
                <th>Message</th>
                <th>Date</th>
                <th className="col-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id}>
                  <td>
                    <div className="cell-main">
                      <div className="name">{m.name || `${m.first || ""} ${m.last || ""}` || "—"}</div>
                      <div className="email">{m.email || "—"}</div>
                    </div>
                  </td>
                  <td>{m.phone || "—"}</td>
                  <td>
                    <span className={`badge badge-${(m.type || "contact").toLowerCase()}`}>
                      {m.type || "contact"}
                    </span>
                  </td>
                  <td>
                    <span className={`badge badge-neutral`}>
                      {m.author || "user"}
                    </span>
                  </td>
                  <td className="cell-message">{m.text || m.message || "—"}</td>
                  <td>{safeDate(m.createdAt)}</td>
                  <td className="cell-actions">
                    {m.email && (
                      <a className="btn small" href={`mailto:${m.email}?subject=Re:%20Your%20message`}>
                        Reply
                      </a>
                    )}
                    <button
                      className="btn small"
                      onClick={() => {
                        navigator.clipboard?.writeText(m.text || m.message || "");
                        toast.success("Message copied.");
                      }}
                    >
                      Copy
                    </button>
                    <button className="btn small danger" onClick={() => onDelete(m.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageMessages;
