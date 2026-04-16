import React, { useEffect, useMemo, useState } from "react";
import "./ManagePricing.css";
import { db } from "../../firebase/firebaseConfig";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

const defaultCategories = [
  {
    id: "social-media-marketing",
    name: "Social Media Marketing",
    services: [
      {
        id: "starter-sm-mgt",
        name: "Starter SM Mgt.",
        price: 10000,
        desc: "Basic uploading, stories, basic research, normal highlights.",
      },
      {
        id: "advanced-sm-mgt",
        name: "Advanced SM Mgt.",
        price: 15000,
        desc: "Uploading with SEO, premium stories, detailed research, premium highlights cover, reels cover page with theme.",
      },
      {
        id: "pro-sm-mgt",
        name: "Pro SM Mgt.",
        price: 20000,
        desc: "Uploading with SEO, premium stories, detailed research, premium highlights cover, reels cover page with theme, content planning, content calendar and story planner.",
      },
    ],
  },
  {
    id: "ad-film-shoot",
    name: "Ad Film Shoot",
    services: [
      {
        id: "advanced-ads-creation",
        name: "Advanced Ads Creation",
        price: 10000,
        desc: "Normal camera, normal lens, mic, gimbal, normal light setup. Editing included.",
      },
      {
        id: "pro-ads-creation",
        name: "Pro Ads Creation",
        price: 20000,
        desc: "High-end camera with G-lens, mic, gimbal, good light setup, drone. Premium editing included.",
      },
    ],
  },
  {
    id: "graphics-and-branding",
    name: "Graphics and Branding",
    services: [
      {
        id: "basic-brand-kit",
        name: "Basic Brand Kit",
        price: 5000,
        desc: "Basic logo, color palette, typography and simple brand assets.",
      },
      {
        id: "advanced-brand-kit",
        name: "Advanced Brand Kit",
        price: 10000,
        desc: "Premium logo concepts, brand guidelines, stationery and social media branding kit.",
      },
      {
        id: "premium-brand-identity",
        name: "Premium Brand Identity",
        price: 20000,
        desc: "Complete visual identity system, detailed branding assets and premium design support.",
      },
    ],
  },
];

const createId = (value) =>
  String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || `item-${Date.now()}`;

const normalizeCategories = (categories = defaultCategories) =>
  categories.map((category, categoryIndex) => ({
    id: category.id || createId(category.name || `category-${categoryIndex + 1}`),
    name: category.name || `Category ${categoryIndex + 1}`,
    services: Array.isArray(category.services)
      ? category.services.map((service, serviceIndex) => ({
          id:
            service.id ||
            createId(service.name || `service-${categoryIndex + 1}-${serviceIndex + 1}`),
          name: service.name || "",
          price: Number(service.price) || 0,
          desc: service.desc || "",
        }))
      : [],
  }));

const ManagePricing = () => {
  const [categories, setCategories] = useState(defaultCategories);
  const [activeCategoryId, setActiveCategoryId] = useState(defaultCategories[0].id);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const loadPricing = async () => {
      try {
        setFetching(true);
        const snap = await getDoc(doc(db, "pricing_settings", "main"));
        const storedCategories = snap.data()?.categories;

        if (Array.isArray(storedCategories) && storedCategories.length > 0) {
          const normalized = normalizeCategories(storedCategories);
          setCategories(normalized);
          setActiveCategoryId(normalized[0].id);
        } else {
          const normalized = normalizeCategories(defaultCategories);
          setCategories(normalized);
          setActiveCategoryId(normalized[0].id);
        }
      } catch (error) {
        console.error("Failed to load pricing settings:", error);
        setMessage({
          type: "error",
          text: "Failed to load pricing settings.",
        });
      } finally {
        setFetching(false);
      }
    };

    loadPricing();
  }, []);

  const activeCategory = useMemo(
    () => categories.find((category) => category.id === activeCategoryId) || categories[0],
    [categories, activeCategoryId]
  );

  const updateCategory = (categoryId, updates) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === categoryId ? { ...category, ...updates } : category
      )
    );
  };

  const updateService = (categoryId, serviceId, field, value) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id !== categoryId
          ? category
          : {
              ...category,
              services: category.services.map((service) =>
                service.id === serviceId
                  ? {
                      ...service,
                      [field]: field === "price" ? Number(value) || 0 : value,
                    }
                  : service
              ),
            }
      )
    );
  };

  const addCategory = () => {
    const nextIndex = categories.length + 1;
    const newCategory = {
      id: `category-${Date.now()}`,
      name: `New Category ${nextIndex}`,
      services: [],
    };

    setCategories((prev) => [...prev, newCategory]);
    setActiveCategoryId(newCategory.id);
    setMessage(null);
  };

  const removeCategory = (categoryId) => {
    if (categories.length === 1) {
      setMessage({
        type: "error",
        text: "At least one pricing category is required.",
      });
      return;
    }

    setCategories((prev) => prev.filter((category) => category.id !== categoryId));

    if (activeCategoryId === categoryId) {
      const remaining = categories.filter((category) => category.id !== categoryId);
      setActiveCategoryId(remaining[0]?.id || "");
    }
  };

  const addService = (categoryId) => {
    const newService = {
      id: `service-${Date.now()}`,
      name: "",
      price: 0,
      desc: "",
    };

    setCategories((prev) =>
      prev.map((category) =>
        category.id === categoryId
          ? { ...category, services: [...category.services, newService] }
          : category
      )
    );
  };

  const removeService = (categoryId, serviceId) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              services: category.services.filter((service) => service.id !== serviceId),
            }
          : category
      )
    );
  };

  const handleSave = async () => {
    const sanitizedCategories = categories.map((category) => ({
      id: category.id,
      name: category.name.trim(),
      services: category.services
        .filter((service) => service.name.trim())
        .map((service) => ({
          id: service.id,
          name: service.name.trim(),
          price: Number(service.price) || 0,
          desc: service.desc.trim(),
        })),
    }));

    const hasInvalidCategory = sanitizedCategories.some((category) => !category.name);
    const hasEmptyServices = sanitizedCategories.some(
      (category) => category.services.length === 0
    );

    if (hasInvalidCategory) {
      setMessage({
        type: "error",
        text: "Every pricing category needs a name.",
      });
      return;
    }

    if (hasEmptyServices) {
      setMessage({
        type: "error",
        text: "Each category must have at least one service before saving.",
      });
      return;
    }

    try {
      setLoading(true);
      await setDoc(doc(db, "pricing_settings", "main"), {
        categories: sanitizedCategories,
        updatedAt: serverTimestamp(),
      });
      setMessage({
        type: "success",
        text: "Pricing page updated successfully.",
      });
    } catch (error) {
      console.error("Failed to save pricing settings:", error);
      setMessage({
        type: "error",
        text: "Failed to save pricing settings.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="manage-pricing">
      <header className="mp-header">
        <h2>Manage Pricing</h2>
        <p>
          Update pricing categories and services here. The public pricing page
          will use these values automatically.
        </p>
      </header>

      <div className="mp-layout">
        <aside className="mp-sidebar">
          <div className="mp-sidebar-head">
            <h3>Categories</h3>
            <button type="button" className="btn primary" onClick={addCategory}>
              + Add Category
            </button>
          </div>

          <div className="mp-category-list">
            {categories.map((category) => (
              <button
                type="button"
                key={category.id}
                className={`mp-category-btn ${
                  activeCategoryId === category.id ? "active" : ""
                }`}
                onClick={() => setActiveCategoryId(category.id)}
              >
                <span>{category.name}</span>
                <small>{category.services.length} services</small>
              </button>
            ))}
          </div>
        </aside>

        <div className="mp-main">
          {fetching ? (
            <div className="mp-empty">Loading pricing settings...</div>
          ) : activeCategory ? (
            <>
              <div className="mp-card">
                <div className="mp-card-head">
                  <div>
                    <h3>Category Details</h3>
                    <p>Rename this category or remove it if no longer needed.</p>
                  </div>
                  <button
                    type="button"
                    className="btn danger"
                    onClick={() => removeCategory(activeCategory.id)}
                  >
                    Delete Category
                  </button>
                </div>

                <div className="mp-field">
                  <label htmlFor="categoryName">Category Name</label>
                  <input
                    id="categoryName"
                    type="text"
                    value={activeCategory.name}
                    onChange={(e) =>
                      updateCategory(activeCategory.id, { name: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="mp-card">
                <div className="mp-card-head">
                  <div>
                    <h3>Services</h3>
                    <p>Add, edit, or remove service rows for this category.</p>
                  </div>
                  <button
                    type="button"
                    className="btn primary"
                    onClick={() => addService(activeCategory.id)}
                  >
                    + Add Service
                  </button>
                </div>

                {activeCategory.services.length === 0 ? (
                  <div className="mp-empty">No services added yet.</div>
                ) : (
                  <div className="mp-service-list">
                    {activeCategory.services.map((service, index) => (
                      <article className="mp-service-card" key={service.id}>
                        <div className="mp-service-head">
                          <h4>Service {index + 1}</h4>
                          <button
                            type="button"
                            className="btn small danger"
                            onClick={() => removeService(activeCategory.id, service.id)}
                          >
                            Remove
                          </button>
                        </div>

                        <div className="mp-grid-2">
                          <div className="mp-field">
                            <label>Service Name</label>
                            <input
                              type="text"
                              value={service.name}
                              onChange={(e) =>
                                updateService(
                                  activeCategory.id,
                                  service.id,
                                  "name",
                                  e.target.value
                                )
                              }
                            />
                          </div>

                          <div className="mp-field">
                            <label>Price</label>
                            <input
                              type="number"
                              min="0"
                              value={service.price}
                              onChange={(e) =>
                                updateService(
                                  activeCategory.id,
                                  service.id,
                                  "price",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>

                        <div className="mp-field">
                          <label>Description</label>
                          <textarea
                            rows={3}
                            value={service.desc}
                            onChange={(e) =>
                              updateService(
                                activeCategory.id,
                                service.id,
                                "desc",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>

              {message && (
                <div className={`mp-alert ${message.type}`}>{message.text}</div>
              )}

              <div className="mp-actions">
                <button
                  type="button"
                  className="btn primary"
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Pricing"}
                </button>
              </div>
            </>
          ) : (
            <div className="mp-empty">Select a category to begin.</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ManagePricing;
