import React, { useEffect, useMemo, useState } from "react";
import "./ManageServiceSamples.css";
import { db, storage } from "../../firebase/firebaseConfig";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  serviceSampleDefaults,
  serviceSampleLabels,
} from "../../utils/serviceSamples";

const serviceKeys = Object.keys(serviceSampleDefaults);

const createSample = (id = `sample-${Date.now()}`) => ({
  id,
  type: "video",
  source: "url",
  title: "",
  category: "",
  thumb: "",
  link: "",
  mediaFile: null,
  thumbFile: null,
  thumbPreview: "",
});

const cloneDefaults = () =>
  serviceKeys.reduce((acc, key) => {
    acc[key] = serviceSampleDefaults[key].map((sample) => ({
      ...createSample(sample.id),
      type: sample.type === "photo" ? "photo" : "video",
      source: "url",
      title: sample.title || "",
      category: sample.category || "",
      thumb: sample.thumb || "",
      link: sample.link || "",
      thumbPreview: sample.thumb || "",
    }));
    return acc;
  }, {});

const normalizeServices = (storedServices = {}) =>
  serviceKeys.reduce((acc, key) => {
    const storedSamples = Array.isArray(storedServices[key]) ? storedServices[key] : [];

    acc[key] =
      storedSamples.length > 0
        ? storedSamples.map((sample, index) => ({
            ...createSample(sample.id || `${key}-${index + 1}`),
            type: sample.type === "photo" ? "photo" : "video",
            source: "url",
            title: sample.title || "",
            category: sample.category || "",
            thumb: sample.thumb || "",
            link: sample.link || "",
            thumbPreview: sample.thumb || "",
          }))
        : cloneDefaults()[key];

    return acc;
  }, {});

const uploadFileToStorage = async (file, folder) => {
  const sanitizedName = file.name.replace(/\s+/g, "-").toLowerCase();
  const fileRef = ref(storage, `${folder}/${Date.now()}-${sanitizedName}`);
  await uploadBytes(fileRef, file);
  return getDownloadURL(fileRef);
};

const createVideoThumbnail = (file) =>
  new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const video = document.createElement("video");

    video.preload = "metadata";
    video.muted = true;
    video.playsInline = true;
    video.src = objectUrl;

    const cleanup = () => {
      URL.revokeObjectURL(objectUrl);
    };

    video.onloadeddata = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 360;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          cleanup();
          reject(new Error("Canvas is not supported in this browser."));
          return;
        }

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          (blob) => {
            cleanup();
            if (!blob) {
              reject(new Error("Failed to generate a thumbnail for the selected video."));
              return;
            }

            const thumbFile = new File([blob], `thumb-${Date.now()}.jpg`, {
              type: "image/jpeg",
            });
            resolve({
              file: thumbFile,
              preview: URL.createObjectURL(blob),
            });
          },
          "image/jpeg",
          0.75
        );
      } catch (error) {
        cleanup();
        reject(error);
      }
    };

    video.onerror = () => {
      cleanup();
      reject(new Error("Selected file is not a valid video."));
    };
  });

const ManageServiceSamples = () => {
  const [services, setServices] = useState(cloneDefaults);
  const [activeService, setActiveService] = useState(serviceKeys[0]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const loadSamples = async () => {
      try {
        setFetching(true);
        const snap = await getDoc(doc(db, "service_samples", "main"));
        const storedServices = snap.data()?.services || {};
        setServices(normalizeServices(storedServices));
      } catch (error) {
        console.error("Failed to load service samples:", error);
        setMessage({
          type: "error",
          text: "Failed to load saved samples. Showing current defaults.",
        });
      } finally {
        setFetching(false);
      }
    };

    loadSamples();
  }, []);

  const activeSamples = useMemo(
    () => services[activeService] || [],
    [services, activeService]
  );

  const updateSample = (sampleId, updates) => {
    setServices((prev) => ({
      ...prev,
      [activeService]: prev[activeService].map((sample) =>
        sample.id === sampleId ? { ...sample, ...updates } : sample
      ),
    }));
  };

  const addSample = () => {
    setServices((prev) => ({
      ...prev,
      [activeService]: [...prev[activeService], createSample()],
    }));
  };

  const removeSample = (sampleId) => {
    setServices((prev) => ({
      ...prev,
      [activeService]: prev[activeService].filter((sample) => sample.id !== sampleId),
    }));
  };

  const handleMediaFileChange = async (sampleId, file) => {
    if (!file) {
      updateSample(sampleId, { mediaFile: null });
      return;
    }

    try {
      if (activeSamples.find((item) => item.id === sampleId)?.type === "video") {
        const generatedThumb = await createVideoThumbnail(file);
        updateSample(sampleId, {
          mediaFile: file,
          thumbFile: generatedThumb.file,
          thumbPreview: generatedThumb.preview,
        });
      } else {
        updateSample(sampleId, {
          mediaFile: file,
          thumbPreview: URL.createObjectURL(file),
        });
      }
    } catch (error) {
      console.error("Failed to process local media:", error);
      setMessage({
        type: "error",
        text: error?.message || "Failed to process the selected file.",
      });
    }
  };

  const handleThumbFileChange = (sampleId, file) => {
    updateSample(sampleId, {
      thumbFile: file || null,
      thumbPreview: file ? URL.createObjectURL(file) : "",
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setMessage(null);

      const sanitized = {};

      for (const key of serviceKeys) {
        const builtSamples = [];

        for (const sample of services[key] || []) {
          const title = sample.title.trim();
          const category = sample.category.trim();
          const source = sample.source === "local" ? "local" : "url";
          let thumb = sample.thumb.trim();
          let link = sample.link.trim();

          if (!title) continue;

          if (source === "local") {
            if (sample.type === "photo") {
              if (!sample.mediaFile && !thumb && !link) continue;

              if (sample.mediaFile) {
                const photoUrl = await uploadFileToStorage(
                  sample.mediaFile,
                  `service-samples/${key}/photos`
                );
                thumb = photoUrl;
                link = photoUrl;
              }
            } else {
              if (!sample.mediaFile && !link) continue;

              if (sample.mediaFile) {
                link = await uploadFileToStorage(
                  sample.mediaFile,
                  `service-samples/${key}/videos`
                );
              }

              if (sample.thumbFile) {
                thumb = await uploadFileToStorage(
                  sample.thumbFile,
                  `service-samples/${key}/thumbs`
                );
              }
            }
          }

          if (!thumb || !link) {
            throw new Error(
              `Please complete both thumbnail and media fields for "${title}".`
            );
          }

          builtSamples.push({
            id: sample.id,
            type: sample.type === "photo" ? "photo" : "video",
            title,
            category,
            thumb,
            link,
          });
        }

        sanitized[key] = builtSamples;
      }

      await setDoc(doc(db, "service_samples", "main"), {
        services: sanitized,
        updatedAt: serverTimestamp(),
      });

      setServices(normalizeServices(sanitized));
      setMessage({
        type: "success",
        text: "Service samples updated successfully.",
      });
    } catch (error) {
      console.error("Failed to save service samples:", error);
      setMessage({
        type: "error",
        text: error?.message || "Failed to save service samples.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="manage-service-samples">
      <header className="mss-header">
        <h2>Manage Service Samples</h2>
        <p>
          Update the sample photos and videos shown inside each service detail
          page from one admin screen.
        </p>
      </header>

      <div className="mss-layout">
        <aside className="mss-sidebar">
          <h3>Services</h3>
          <div className="mss-service-list">
            {serviceKeys.map((key) => (
              <button
                type="button"
                key={key}
                className={`mss-service-btn ${activeService === key ? "active" : ""}`}
                onClick={() => setActiveService(key)}
              >
                {serviceSampleLabels[key]}
              </button>
            ))}
          </div>
        </aside>

        <div className="mss-main">
          <div className="mss-card">
            <div className="mss-card-head">
              <div>
                <h3>{serviceSampleLabels[activeService]} Samples</h3>
                <p>
                  Add image or video sample cards for this service page. You
                  can either paste URLs or upload media from the system.
                </p>
              </div>
              <button type="button" className="btn primary" onClick={addSample}>
                + Add Sample
              </button>
            </div>

            {fetching ? (
              <div className="mss-empty">Loading saved samples...</div>
            ) : activeSamples.length === 0 ? (
              <div className="mss-empty">
                No samples added yet for this service. Click `Add Sample` to
                create one.
              </div>
            ) : (
              <div className="mss-sample-list">
                {activeSamples.map((sample, index) => (
                  <article className="mss-sample-card" key={sample.id}>
                    <div className="mss-sample-head">
                      <h4>Sample {index + 1}</h4>
                      <button
                        type="button"
                        className="btn small danger"
                        onClick={() => removeSample(sample.id)}
                      >
                        Remove
                      </button>
                    </div>

                    <div className="mss-grid-2">
                      <div className="mss-field">
                        <label>Type</label>
                        <select
                          value={sample.type}
                          onChange={(e) =>
                            updateSample(sample.id, {
                              type: e.target.value,
                              mediaFile: null,
                              thumbFile: null,
                              thumbPreview: sample.source === "url" ? sample.thumb : "",
                            })
                          }
                        >
                          <option value="video">Video</option>
                          <option value="photo">Photo</option>
                        </select>
                      </div>

                      <div className="mss-field">
                        <label>Source</label>
                        <select
                          value={sample.source}
                          onChange={(e) =>
                            updateSample(sample.id, {
                              source: e.target.value,
                              mediaFile: null,
                              thumbFile: null,
                              thumbPreview: e.target.value === "url" ? sample.thumb : "",
                              thumb: e.target.value === "url" ? sample.thumb : "",
                              link: e.target.value === "url" ? sample.link : "",
                            })
                          }
                        >
                          <option value="url">URL</option>
                          <option value="local">Upload from system</option>
                        </select>
                      </div>
                    </div>

                    <div className="mss-grid-2">
                      <div className="mss-field">
                        <label>Category</label>
                        <input
                          type="text"
                          value={sample.category}
                          onChange={(e) =>
                            updateSample(sample.id, { category: e.target.value })
                          }
                        />
                      </div>

                      <div className="mss-field">
                        <label>Title</label>
                        <input
                          type="text"
                          value={sample.title}
                          onChange={(e) =>
                            updateSample(sample.id, { title: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    {sample.source === "url" ? (
                      <>
                        {sample.type === "photo" ? (
                          <div className="mss-field">
                            <label>Photo URL</label>
                            <input
                              type="text"
                              value={sample.link}
                              onChange={(e) =>
                                updateSample(sample.id, {
                                  link: e.target.value,
                                  thumb: e.target.value,
                                  thumbPreview: e.target.value,
                                })
                              }
                            />
                            <small className="mss-help">
                              For photo URLs, the same image is used for both thumbnail and open link.
                            </small>
                          </div>
                        ) : (
                          <>
                            <div className="mss-field">
                              <label>Video URL</label>
                              <input
                                type="text"
                                value={sample.link}
                                onChange={(e) =>
                                  updateSample(sample.id, { link: e.target.value })
                                }
                              />
                            </div>

                            <div className="mss-field">
                              <label>Thumbnail URL</label>
                              <input
                                type="text"
                                value={sample.thumb}
                                onChange={(e) =>
                                  updateSample(sample.id, {
                                    thumb: e.target.value,
                                    thumbPreview: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="mss-field">
                          <label>{sample.type === "photo" ? "Choose Photo" : "Choose Video"}</label>
                          <input
                            type="file"
                            accept={sample.type === "photo" ? "image/*" : "video/*"}
                            onChange={(e) =>
                              handleMediaFileChange(sample.id, e.target.files?.[0] || null)
                            }
                          />
                        </div>

                        {sample.type === "video" && (
                          <div className="mss-field">
                            <label>Thumbnail</label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                handleThumbFileChange(sample.id, e.target.files?.[0] || null)
                              }
                            />
                            <small className="mss-help">
                              A thumbnail is auto-generated for uploaded videos. You can replace it here.
                            </small>
                          </div>
                        )}
                      </>
                    )}

                    {sample.thumbPreview ? (
                      <div className="mss-preview">
                        <img src={sample.thumbPreview} alt={sample.title || "Sample preview"} />
                      </div>
                    ) : null}
                  </article>
                ))}
              </div>
            )}
          </div>

          {message && <div className={`mss-alert ${message.type}`}>{message.text}</div>}

          <div className="mss-actions">
            <button
              type="button"
              className="btn primary"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Samples"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageServiceSamples;
