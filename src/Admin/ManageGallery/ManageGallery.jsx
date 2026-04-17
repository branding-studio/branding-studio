import React, { useEffect, useMemo, useState } from "react";
import "./ManageGallery.css";
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

const createImageField = () => ({
  id: `gallery-image-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  kind: "new",
  file: null,
  preview: "",
});

const formatDisplayDate = (isoDate) => {
  if (!isoDate) return "";
  const [year, month, day] = isoDate.split("-");
  if (!year || !month || !day) return isoDate;
  return `${day}/${month}/${year}`;
};

const formatIsoDate = (displayDate) => {
  if (!displayDate) return "";
  const parts = displayDate.split("/");
  if (parts.length !== 3) return "";
  const [day, month, year] = parts;
  if (!day || !month || !year) return "";
  return `${year.padStart(4, "0")}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

const compressImage = (file, maxDimension = 720, quality = 0.68) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();

      img.onload = () => {
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
        const dataUrl = canvas.toDataURL("image/jpeg", quality);

        if (dataUrl.length > 300000) {
          reject(
            new Error("One of the selected images is still too large. Please use a smaller image.")
          );
          return;
        }

        resolve(dataUrl);
      };

      img.onerror = () => reject(new Error("Selected file is not a valid image."));
      img.src = reader.result;
    };

    reader.onerror = () => reject(new Error("Failed to read image file."));
    reader.readAsDataURL(file);
  });

const galleryRef = collection(db, "gallery");

const ManageGallery = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [existingCoverImage, setExistingCoverImage] = useState("");
  const [images, setImages] = useState([createImageField()]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [inputResetKey, setInputResetKey] = useState(0);

  const isEditing = !!editingId;

  const selectedGalleryFiles = useMemo(
    () => images.filter((item) => item.kind === "new" && item.file),
    [images]
  );

  const fetchGalleryItems = async () => {
    try {
      setFetching(true);
      const q = query(galleryRef, orderBy("sortOrder", "asc"));
      const snapshot = await getDocs(q);
      setGalleryItems(
        snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }))
      );
    } catch (error) {
      console.error("Failed to load gallery items:", error);
      setMessage({
        type: "error",
        text: "Failed to load gallery items.",
      });
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setEventDate("");
    setCoverImageFile(null);
    setCoverPreview("");
    setExistingCoverImage("");
    setImages([createImageField()]);
    setEditingId(null);
    setInputResetKey((prev) => prev + 1);
  };

  const handleCoverChange = (e) => {
    const file = e.target.files?.[0] || null;
    setCoverImageFile(file);
    setCoverPreview(file ? URL.createObjectURL(file) : existingCoverImage);
  };

  const handleImageChange = (id, file) => {
    setImages((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              file,
              preview: file ? URL.createObjectURL(file) : "",
            }
          : item
      )
    );
  };

  const addImageField = () => {
    setImages((prev) => [...prev, createImageField()]);
  };

  const removeImageField = (id) => {
    setImages((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      return updated.length > 0 ? updated : [createImageField()];
    });
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setTitle(item.title || "");
    setDescription(item.description || "");
    setEventDate(formatIsoDate(item.eventDate || ""));
    setCoverImageFile(null);
    setExistingCoverImage(item.coverImage || "");
    setCoverPreview(item.coverImage || "");
    setImages(
      Array.isArray(item.images) && item.images.length > 0
        ? item.images.map((image, index) => ({
            id: `existing-${item.id}-${index}`,
            kind: "existing",
            preview: image,
            value: image,
          }))
        : [createImageField()]
    );
    setMessage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteCard = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this gallery card?");
    if (!ok) return;

    try {
      await deleteDoc(doc(db, "gallery", id));
      if (editingId === id) {
        resetForm();
      }
      setMessage({
        type: "success",
        text: "Gallery card deleted successfully.",
      });
      await fetchGalleryItems();
    } catch (error) {
      console.error("Failed to delete gallery card:", error);
      setMessage({
        type: "error",
        text: "Failed to delete gallery card.",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    const existingImages = images
      .filter((item) => item.kind === "existing" && item.value)
      .map((item) => item.value);

    if (!isEditing && !coverImageFile) {
      setMessage({
        type: "error",
        text: "Please choose a cover image from your system.",
      });
      return;
    }

    if (
      !title.trim() ||
      !description.trim() ||
      !eventDate ||
      existingImages.length + selectedGalleryFiles.length === 0
    ) {
      setMessage({
        type: "error",
        text: "Please fill all required fields and keep at least one gallery image.",
      });
      return;
    }

    try {
      setLoading(true);

      const compressedNewImages = await Promise.all(
        selectedGalleryFiles.map((item) => compressImage(item.file, 720, 0.66))
      );

      const finalImages = [...existingImages, ...compressedNewImages];

      if (finalImages.length === 0) {
        throw new Error("At least one gallery image is required.");
      }

      const finalCoverImage = coverImageFile
        ? await compressImage(coverImageFile, 720, 0.66)
        : existingCoverImage;

      if (!finalCoverImage) {
        throw new Error("Please choose a cover image.");
      }

      const totalPayloadSize =
        finalCoverImage.length +
        finalImages.reduce((sum, image) => sum + image.length, 0);

      if (totalPayloadSize > 850000) {
        throw new Error(
          "Selected images are too large together. Please reduce the number of images or use smaller files."
        );
      }

      const payload = {
        title: title.trim(),
        description: description.trim(),
        eventDate: formatDisplayDate(eventDate),
        coverImage: finalCoverImage,
        images: finalImages,
        isVisible: true,
        updatedAt: serverTimestamp(),
      };

      if (isEditing) {
        await updateDoc(doc(db, "gallery", editingId), payload);
      } else {
        await addDoc(galleryRef, {
          ...payload,
          sortOrder: Date.now(),
          createdAt: serverTimestamp(),
        });
      }

      resetForm();
      setMessage({
        type: "success",
        text: isEditing
          ? "Gallery card updated successfully."
          : "Gallery added successfully.",
      });
      await fetchGalleryItems();
    } catch (error) {
      console.error("Error saving gallery:", error);
      setMessage({
        type: "error",
        text: error?.message || "Error saving gallery.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="manage-gallery">
      <header className="mg-header">
        <h2>{isEditing ? "Edit Gallery Event" : "Add Gallery Event"}</h2>
        <p>
          Add new gallery cards, edit existing ones, remove a full card, or
          delete individual images from a card.
        </p>
      </header>

      <div className="mg-grid">
        <div className="mg-card">
          <form onSubmit={handleSubmit} className="mg-form">
            <div className="mg-field">
              <label>Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mg-field">
              <label>Description</label>
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="mg-field">
              <label>Event Date</label>
              <input
                type="date"
                required
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
              <small className="mg-help">
                It will be shown as `DD/MM/YYYY` on the website.
              </small>
            </div>

            <div className="mg-field">
              <label>Cover Image</label>
              <input
                key={`cover-${inputResetKey}`}
                type="file"
                accept="image/*"
                onChange={handleCoverChange}
              />
              <small className="mg-help">
                {isEditing
                  ? "Choose a new image only if you want to replace the current cover."
                  : "Choose the main image from your system."}
              </small>

              {coverPreview ? (
                <img
                  src={coverPreview}
                  alt="Cover preview"
                  className="mg-cover-preview"
                />
              ) : null}
            </div>

            <div className="mg-field">
              <div className="mg-field-head">
                <label>Gallery Images</label>
                <button
                  type="button"
                  className="btn ghost"
                  onClick={addImageField}
                >
                  + Add More Images
                </button>
              </div>

              <div className="mg-image-list">
                {images.map((item, index) => (
                  <div className="mg-image-item" key={item.id}>
                    {item.kind === "existing" ? (
                      <>
                        <img
                          src={item.preview}
                          alt={`Gallery existing ${index + 1}`}
                          className="mg-thumb"
                        />
                        <button
                          type="button"
                          className="btn danger small"
                          onClick={() => removeImageField(item.id)}
                        >
                          Remove This Image
                        </button>
                      </>
                    ) : (
                      <>
                        <input
                          key={`${item.id}-${inputResetKey}`}
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleImageChange(item.id, e.target.files?.[0] || null)
                          }
                        />

                        {item.preview ? (
                          <img
                            src={item.preview}
                            alt={`Gallery preview ${index + 1}`}
                            className="mg-thumb"
                          />
                        ) : null}

                        {(images.length > 1 || index > 0) && (
                          <button
                            type="button"
                            className="btn danger small"
                            onClick={() => removeImageField(item.id)}
                          >
                            Remove Field
                          </button>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {message ? (
              <div className={`mg-alert ${message.type}`}>{message.text}</div>
            ) : null}

            <div className="mg-actions">
              <button type="submit" className="btn primary" disabled={loading}>
                {loading
                  ? isEditing
                    ? "Updating..."
                    : "Adding..."
                  : isEditing
                  ? "Update Gallery"
                  : "Add Gallery"}
              </button>

              {isEditing && (
                <button
                  type="button"
                  className="btn ghost"
                  onClick={resetForm}
                  disabled={loading}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="mg-card">
          <div className="mg-saved-head">
            <h3>Saved Gallery Cards</h3>
            <span>{fetching ? "Loading..." : `${galleryItems.length} items`}</span>
          </div>

          {fetching ? (
            <div className="mg-empty">Loading gallery cards...</div>
          ) : galleryItems.length === 0 ? (
            <div className="mg-empty">No gallery cards added yet.</div>
          ) : (
            <div className="mg-saved-list">
              {galleryItems.map((item) => (
                <article className="mg-saved-card" key={item.id}>
                  <div className="mg-saved-top">
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="mg-saved-cover"
                    />

                    <div className="mg-saved-content">
                      <div className="mg-saved-meta">{item.eventDate || "-"}</div>
                      <h4>{item.title || "Untitled"}</h4>
                      <p>{item.description || "No description added."}</p>
                      <div className="mg-count-chip">
                        {Array.isArray(item.images) ? item.images.length : 0} images
                      </div>
                    </div>
                  </div>

                  {Array.isArray(item.images) && item.images.length > 0 && (
                    <div className="mg-saved-thumbs">
                      {item.images.map((image, index) => (
                        <img
                          key={`${item.id}-${index}`}
                          src={image}
                          alt={`${item.title} ${index + 1}`}
                          className="mg-saved-thumb"
                        />
                      ))}
                    </div>
                  )}

                  <div className="mg-saved-actions">
                    <button
                      type="button"
                      className="btn primary small"
                      onClick={() => handleEdit(item)}
                    >
                      Edit Card
                    </button>
                    <button
                      type="button"
                      className="btn danger small"
                      onClick={() => handleDeleteCard(item.id)}
                    >
                      Delete Card
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ManageGallery;
