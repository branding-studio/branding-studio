// src/context/AdminContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";

const AdminContext = createContext(undefined);

// ---- Roles & permissions config ----
export const ROLES = {
  MASTER: "master",   // superuser
  ADMIN:  "all",      // your existing super-admin
  EDITOR: "editor",
  VIEWER: "viewer",
};

// Who can access the admin panel at all:
const PANEL_ACCESS_ROLES = [ROLES.MASTER, ROLES.ADMIN, ROLES.EDITOR]; // tweak if needed

// Ranking for "at least" checks
const ROLE_RANK = {
  [ROLES.VIEWER]: 0,
  [ROLES.EDITOR]: 1,
  [ROLES.ADMIN]:  2,
  [ROLES.MASTER]: 3,
};

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem("admin_info");
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  const buildAdminData = (uid, data) => ({
    uid,
    email: data.email,
    role: data.role || ROLES.VIEWER,
    perms: data.perms || [], // e.g. ["blog.write","users.manage"]
  });

  const isAllowedForPanel = (role) => PANEL_ACCESS_ROLES.includes(role);

  // auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      try {
        if (!user) {
          setAdmin(null);
          localStorage.removeItem("admin_info");
          setLoading(false);
          return;
        }

        const ref = doc(db, "admin", user.uid);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          setAdmin(null);
          localStorage.removeItem("admin_info");
          toast.error("Access denied");
          return;
        }

        const data = snap.data();
        const adminData = buildAdminData(user.uid, data);

        if (!isAllowedForPanel(adminData.role)) {
          setAdmin(null);
          localStorage.removeItem("admin_info");
          toast.error("Access denied");
          return;
        }

        setAdmin(adminData);
        localStorage.setItem("admin_info", JSON.stringify(adminData));
      } catch (e) {
        console.error("Auth check failed:", e);
        setAdmin(null);
        localStorage.removeItem("admin_info");
      } finally {
        setLoading(false);
      }
    });
    return unsub;
  }, []);

 // in AdminContext
const adminSignIn = async (email, password) => {
  const cred = await signInWithEmailAndPassword(auth, email, password);

  const ref = doc(db, "admin", cred.user.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await signOut(auth); // keep auth clean
    throw new Error("Access denied");
  }

  const data = snap.data();
  const adminData = buildAdminData(cred.user.uid, data);
  if (!isAllowedForPanel(adminData.role)) {
    await signOut(auth);
    throw new Error("Access denied");
  }

  setAdmin(adminData);
  localStorage.setItem("admin_info", JSON.stringify(adminData));
  await setPresence(cred.user.uid, "active");
  toast.success("Login successful");
};


const adminLogout = async () => {
try {
  const uid = auth.currentUser?.uid;
  if (uid) await setPresence(uid, "inactive");
  await signOut(auth);
  setAdmin(null);
  localStorage.removeItem("admin_info");
  toast.success("Logged out successfully");
} catch (e) {
  console.error(e);
  toast.error("Logout failed, please try again.");
}
};

  // ---------- helpers you can use anywhere ----------
  const hasRole = (...roles) => !!admin && roles.includes(admin.role);
  const hasAnyRole = (roles = []) => !!admin && roles.includes(admin.role);
  const hasMinRole = (required) =>
    !!admin && (ROLE_RANK[admin.role] ?? -1) >= (ROLE_RANK[required] ?? 999);

  const hasPerm = (perm) => !!admin && (admin.perms || []).includes(perm);

  const setPresence = async (uid, status) => {
  try {
    await updateDoc(doc(db, "admin", uid), {
      status,
      ...(status === "active"
        ? { lastLogin: serverTimestamp() }
        : { lastLogout: serverTimestamp(), lastSeen: serverTimestamp() }),
    });
  } catch (e) {
    // don't block UI on presence update
    console.warn("Presence update failed:", e);
  }
};


  const value = useMemo(
    () => ({
      admin,
      loading,
      adminSignIn,
      adminLogout,
      hasRole,
      hasAnyRole,
      hasMinRole,
      hasPerm,
      ROLES, 
    }),
    [admin, loading]
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export const useAdminContext = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdminContext must be used within <AdminProvider>");
  return ctx;
};
