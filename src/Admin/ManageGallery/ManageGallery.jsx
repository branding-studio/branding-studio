import React, { useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const ManageGallery = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [images, setImages] = useState([""]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (index, value) => {
    const updated = [...images];
    updated[index] = value;
    setImages(updated);
  };

  const addImageField = () => {
    setImages([...images, ""]);
  };

  const removeImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await addDoc(collection(db, "gallery"), {
        title,
        description,
        eventDate,
        coverImage,
        images,
        isVisible: true,
        sortOrder: Date.now(),
        createdAt: serverTimestamp(),
      });

      alert("Gallery added successfully");

      setTitle("");
      setDescription("");
      setEventDate("");
      setCoverImage("");
      setImages([""]);
    } catch (error) {
      console.error(error);
      alert("Error adding gallery");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Add Gallery Event</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: "700px" }}>
        
        <div style={{ marginBottom: "15px" }}>
          <label>Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Description</label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Event Date</label>
          <input
            type="text"
            placeholder="April 2026"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="form-control"
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Cover Image URL</label>
          <input
            type="text"
            required
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            className="form-control"
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Gallery Images</label>

          {images.map((img, index) => (
            <div key={index} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
              <input
                type="text"
                value={img}
                onChange={(e) => handleImageChange(index, e.target.value)}
                placeholder="Image URL"
                className="form-control"
              />

              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  style={{
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                  }}
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addImageField}
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "8px 12px",
              marginTop: "10px",
            }}
          >
            + Add More Images
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            background: "#16a34a",
            color: "white",
            padding: "10px 20px",
            border: "none",
            marginTop: "20px",
          }}
        >
          {loading ? "Adding..." : "Add Gallery"}
        </button>
      </form>
    </div>
  );
};

export default ManageGallery;