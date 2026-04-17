import { createContext, useContext, useMemo, useState, useCallback } from "react";
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch,
  serverTimestamp,
} from "firebase/firestore";
import { toast } from "react-toastify";

const BlogContext = createContext(undefined);

const slugify = (str = "") =>
  str.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

export const BlogProvider = ({ children }) => {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [allComments, setAllComments] = useState([]);

  const addCategory = useCallback(async (name) => {
    try {
      const id = slugify(name);
      await setDoc(doc(db, "categories", id), {
        name,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      toast.success("Category added");
      return id;
    } catch (e) {
      console.error(e);
      toast.error("Failed to add category");
      throw e;
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const q = query(collection(db, "categories"));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    } catch (e) {
      console.error(e);
      toast.error("Failed to fetch categories");
      return [];
    }
  }, []);

  const fetchCategoryById = useCallback(async (id) => {
    const ref = doc(db, "categories", id);
    const snap = await getDoc(ref);
    if (!snap.exists()) throw new Error("Category not found");
    return { id: snap.id, ...snap.data() };
  }, []);

  const deleteCategory = useCallback(async (id) => {
    try {
      await deleteDoc(doc(db, "categories", id));
      toast.success("Category deleted");
    } catch (e) {
      console.error(e);
      toast.error("Failed to delete category");
      throw e;
    }
  }, []);

  const updateCategory = useCallback(async (id, patch) => {
    try {
      await updateDoc(doc(db, "categories", id), {
        ...patch,
        updatedAt: serverTimestamp(),
      });
      toast.success("Category updated");
      return id;
    } catch (e) {
      console.error(e);
      toast.error("Failed to update category");
      throw e;
    }
  }, []);

  const fetchBlogs = useCallback(async () => {
    try {
      const q = query(collection(db, "_blogs"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    } catch (e) {
      console.error(e);
      toast.error("Failed to fetch blogs");
      return [];
    }
  }, []);

  const fetchBlogsFromCategory = useCallback(async (categoryId) => {
   try {
  const q = query(
    collection(db, "_blogs"),
    where("category", "==", categoryId),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
} catch (e) {
  console.error(e);
  if (e.code === "failed-precondition" && /index/.test(e.message)) {
    // Extract link if present
    const link = (e.message.match(/https?:\/\/[^\s)]+/g) || [])[0];
    toast.error("Firestore needs a composite index for this query.");
    if (link) console.log("Create the index here:", link);
  } else {
    toast.error("Failed to fetch category blogs");
  }
  return [];
}

  }, []);

  const addBlog = useCallback(async (categoryId, blogData) => {
    try {
      const batch = writeBatch(db);
      const globalRef = doc(collection(db, "_blogs"));
      const payload = {
        ...blogData,
        category: categoryId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      batch.set(globalRef, payload);
      const catRef = doc(db, `categories/${categoryId}/blogs`, globalRef.id);
      batch.set(catRef, payload);

      await batch.commit();
      toast.success("Blog added");
      return globalRef.id;
    } catch (e) {
      console.error(e);
      toast.error("Failed to add blog");
      throw e;
    }
  }, []);

  const deleteBlog = useCallback(async (blogId, categoryId) => {
    try {
      const batch = writeBatch(db);
      batch.delete(doc(db, "_blogs", blogId));
      if (categoryId) batch.delete(doc(db, `categories/${categoryId}/blogs`, blogId));
      await batch.commit();
      toast.success("Blog deleted");
    } catch (e) {
      console.error(e);
      toast.error("Failed to delete blog");
      throw e;
    }
  }, []);

  const updateBlog = useCallback(async (blogId, updatedData, newCategoryId) => {
    try {
      const globalRef = doc(db, "_blogs", blogId);
      const snap = await getDoc(globalRef);
      if (!snap.exists()) throw new Error("Blog not found");
      const oldCategoryId = snap.data().category;
      const batch = writeBatch(db);
      const payload = { ...updatedData, updatedAt: serverTimestamp(), category: newCategoryId };
      batch.update(globalRef, payload);

      if (oldCategoryId === newCategoryId) {
        const mirrorRef = doc(db, `categories/${oldCategoryId}/blogs`, blogId);
        batch.set(mirrorRef, payload, { merge: true });
      } else {
        const newMirrorRef = doc(db, `categories/${newCategoryId}/blogs`, blogId);
        batch.set(newMirrorRef, payload);
        const oldMirrorRef = doc(db, `categories/${oldCategoryId}/blogs`, blogId);
        batch.delete(oldMirrorRef);
      }

      await batch.commit();
      toast.success("Blog updated");
    } catch (e) {
      console.error(e);
      toast.error("Failed to update blog");
      throw e;
    }
  }, []);

  const fetchComments = useCallback(async () => {
    try {
      const snap = await getDocs(collectionGroup(db, "comments"));
      const data = snap.docs.map((d) => {
        const v = d.data();
        return {
          id: d.id,
          ...v,
          path: d.ref.path,
          approved: String(v.approved) === "true" || v.approved === true,
        };
      });
      setAllComments(data);
      return data;
    } catch (e) {
      console.error(e);
      toast.error("Failed to fetch comments");
      return [];
    }
  }, []);

  const updateCommentApproval = useCallback(async (commentId, path, currentStatus) => {
    try {
      await updateDoc(doc(db, path), { approved: !currentStatus });
      setAllComments((prev) =>
        prev.map((c) => (c.id === commentId ? { ...c, approved: !currentStatus } : c))
      );
      toast.success(`Comment ${!currentStatus ? "approved" : "disapproved"}`);
    } catch (e) {
      console.error(e);
      toast.error("Failed to update comment");
      throw e;
    }
  }, []);

  const selectBlog = useCallback((blog) => setSelectedBlog(blog), []);

  const value = useMemo(
    () => ({
      // selection
      selectedBlog,
      selectBlog,
      // categories
      fetchCategories,
      addCategory,
      deleteCategory,
      updateCategory,
      fetchCategoryById,
      // blogs
      fetchBlogs,
      fetchBlogsFromCategory,
      addBlog,
      deleteBlog,
      updateBlog,
      // comments
      fetchComments,
      updateCommentApproval,
      allComments,
    }),
    [
      selectedBlog,
      // fns
      selectBlog,
      fetchCategories,
      addCategory,
      deleteCategory,
      updateCategory,
      fetchCategoryById,
      fetchBlogs,
      fetchBlogsFromCategory,
      addBlog,
      deleteBlog,
      updateBlog,
      fetchComments,
      updateCommentApproval,
      allComments,
    ]
  );

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

export const useBlogContext = () => {
  const ctx = useContext(BlogContext);
  if (!ctx) throw new Error("useBlogContext must be used within <BlogProvider>");
  return ctx;
};
