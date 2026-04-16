import React, { useEffect, useMemo, useState } from "react";
import "./ManageServiceSamples.css";
import { db } from "../../firebase/firebaseConfig";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import {
  serviceSampleDefaults,
  serviceSampleLabels,
} from "../../utils/serviceSamples";

const serviceKeys = Object.keys(serviceSampleDefaults);

const cloneDefaults = () =>
  serviceKeys.reduce((acc, key) => {
    acc[key] = serviceSampleDefaults[key].map((sample) => ({ ...sample }));
    return acc;
  }, {});

const normalizeServices = (storedServices = {}) =>
  serviceKeys.reduce((acc, key) => {
    const storedSamples = Array.isArray(storedServices[key]) ? storedServices[key] : [];

    acc[key] =
      storedSamples.length > 0
        ? storedSamples.map((sample, index) => ({
            id: sample.id || `${key}-${index + 1}`,
            type: sample.type === "photo" ? "photo" : "video",
            title: sample.title || "",
            category: sample.category || "",
            thumb: sample.thumb || "",
            link: sample.link || "",
          }))
        : serviceSampleDefaults[key].map((sample) => ({ ...sample }));

    return acc;
  }, {});

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

  const updateSample = (sampleId, field, value) => {
    setServices((prev) => ({
      ...prev,
      [activeService]: prev[activeService].map((sample) =>
        sample.id === sampleId ? { ...sample, [field]: value } : sample
      ),
    }));
  };

  const addSample = () => {
    setServices((prev) => ({
      ...prev,
      [activeService]: [
        ...prev[activeService],
        {
          id: `sample-${Date.now()}`,
          type: "video",
          title: "",
          category: "",
          thumb: "",
          link: "",
        },
      ],
    }));
  };

  const removeSample = (sampleId) => {
    setServices((prev) => ({
      ...prev,
      [activeService]: prev[activeService].filter((sample) => sample.id !== sampleId),
    }));
  };

  const handleSave = async () => {
    const sanitized = serviceKeys.reduce((acc, key) => {
      acc[key] = (services[key] || [])
        .filter((sample) => sample.title.trim() && sample.thumb.trim() && sample.link.trim())
        .map((sample) => ({
          id: sample.id,
          type: sample.type === "photo" ? "photo" : "video",
          title: sample.title.trim(),
          category: sample.category.trim(),
          thumb: sample.thumb.trim(),
          link: sample.link.trim(),
        }));
      return acc;
    }, {});

    try {
      setLoading(true);
      await setDoc(doc(db, "service_samples", "main"), {
        services: sanitized,
        updatedAt: serverTimestamp(),
      });
      setMessage({
        type: "success",
        text: "Service samples updated successfully.",
      });
    } catch (error) {
      console.error("Failed to save service samples:", error);
      setMessage({
        type: "error",
        text: "Failed to save service samples.",
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
                  Add image or video sample cards for this service page. Use a
                  thumbnail image and the final link you want the card to open.
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
                            updateSample(sample.id, "type", e.target.value)
                          }
                        >
                          <option value="video">Video</option>
                          <option value="photo">Photo</option>
                        </select>
                      </div>

                      <div className="mss-field">
                        <label>Category</label>
                        <input
                          type="text"
                          value={sample.category}
                          onChange={(e) =>
                            updateSample(sample.id, "category", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="mss-field">
                      <label>Title</label>
                      <input
                        type="text"
                        value={sample.title}
                        onChange={(e) =>
                          updateSample(sample.id, "title", e.target.value)
                        }
                      />
                    </div>

                    <div className="mss-field">
                      <label>Thumbnail URL</label>
                      <input
                        type="text"
                        value={sample.thumb}
                        onChange={(e) =>
                          updateSample(sample.id, "thumb", e.target.value)
                        }
                      />
                    </div>

                    <div className="mss-field">
                      <label>Open Link</label>
                      <input
                        type="text"
                        value={sample.link}
                        onChange={(e) =>
                          updateSample(sample.id, "link", e.target.value)
                        }
                      />
                    </div>
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
