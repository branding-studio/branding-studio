// MessageContext.jsx
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  writeBatch,
  getDocs,
} from "firebase/firestore";
import db from "../firebase/firebaseConfig"; // <-- adjust path to your firebase init

const MessageContext = createContext(null);
const STORAGE_KEY = "app_messages_v1";
const collRef = collection(db, "messages");

export const MessageProvider = ({ children,enableRead = false }) => {
  // 1) Fast local cache for first paint
  const [messages, setMessages] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // 2) Live Firestore subscription (authoritative)
  useEffect(() => {
    const q = query(collRef, orderBy("createdAt", "desc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const next = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setMessages(next);
      },
      (err) => {
        console.error("onSnapshot(messages) error:", err);
      }
    );
    return unsub;
  }, []);

  // 3) Persist to localStorage as a cache
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      /* ignore quota errors */
    }
  }, [messages]);

  // ======================
  // Firestore-backed APIs
  // ======================

  // Add a message (returns doc ref id)
  const addMessage = useCallback(async (msg) => {
    const payload = {
      text: msg?.text ?? "",
      author: msg?.author ?? "user",
      type: msg?.type ?? "contact",
      name: msg?.name ?? null,
      email: msg?.email ?? null,
      phone: msg?.phone ?? null,
      source: msg?.source ?? "context",
      meta: msg?.meta ?? null,
      createdAt: serverTimestamp(),
      updatedAt: null,
    };
    const ref = await addDoc(collRef, payload);
    return ref.id;
  }, []);

  // Update an existing message
  const updateMessage = useCallback(async (id, updates) => {
    const ref = doc(db, "messages", id);
    await updateDoc(ref, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  }, []);

  // Delete one message
  const deleteMessage = useCallback(async (id) => {
    const ref = doc(db, "messages", id);
    await deleteDoc(ref);
  }, []);

  // Clear all messages in the collection (careful!)
  const clearMessages = useCallback(async () => {
    // Batch delete to avoid rate limits
    const q = query(collRef);
    const snap = await getDocs(q);
    const batch = writeBatch(db);
    snap.forEach((d) => batch.delete(d.ref));
    await batch.commit();
  }, []);

  // Replace all messages with a given array
  // (Deletes everything then writes the provided list)
  const saveMessages = useCallback(async (nextMessages) => {
    if (!Array.isArray(nextMessages)) return;

    // 1) Delete all current
    const snap = await getDocs(query(collRef));
    const delBatch = writeBatch(db);
    snap.forEach((d) => delBatch.delete(d.ref));
    await delBatch.commit();

    // 2) Add new ones
    const addOps = nextMessages.map((m) =>
      addDoc(collRef, {
        text: m?.text ?? "",
        author: m?.author ?? "user",
        type: m?.type ?? "contact",
        name: m?.name ?? null,
        email: m?.email ?? null,
        phone: m?.phone ?? null,
        source: m?.source ?? "context",
        meta: m?.meta ?? null,
        createdAt: m?.createdAt ? m.createdAt : serverTimestamp(),
        updatedAt: m?.updatedAt ?? null,
      })
    );
    await Promise.all(addOps);
  }, []);

  const value = useMemo(
    () => ({
      messages,
      addMessage,
      updateMessage,
      deleteMessage,
      clearMessages,
      saveMessages,
    }),
    [messages, addMessage, updateMessage, deleteMessage, clearMessages, saveMessages]
  );

  return <MessageContext.Provider value={value}>{children}</MessageContext.Provider>;
};

export const useMessageContext = () => {
  const ctx = useContext(MessageContext);
  if (!ctx) throw new Error("useMessageContext must be used within a MessageProvider");
  return ctx;
};
