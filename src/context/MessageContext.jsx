
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
import db from "../firebase/firebaseConfig"; 

const MessageContext = createContext(null);
const STORAGE_KEY = "app_messages_v1";
const collRef = collection(db, "messages");

export function MessageProvider({ children, enableRead = false }) {
  const [messages, setMessages] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

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

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
    }
  }, [messages]);

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

  const updateMessage = useCallback(async (id, updates) => {
    const ref = doc(db, "messages", id);
    await updateDoc(ref, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  }, []);

  const deleteMessage = useCallback(async (id) => {
    const ref = doc(db, "messages", id);
    await deleteDoc(ref);
  }, []);

  const clearMessages = useCallback(async () => {
    const q = query(collRef);
    const snap = await getDocs(q);
    const batch = writeBatch(db);
    snap.forEach((d) => batch.delete(d.ref));
    await batch.commit();
  }, []);

  const saveMessages = useCallback(async (nextMessages) => {
    if (!Array.isArray(nextMessages)) return;
    const snap = await getDocs(query(collRef));
    const delBatch = writeBatch(db);
    snap.forEach((d) => delBatch.delete(d.ref));
    await delBatch.commit();

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
}

export function useMessageContext() {
  const ctx = useContext(MessageContext);
  if (!ctx) throw new Error("useMessageContext must be used within a MessageProvider");
  return ctx;
}
