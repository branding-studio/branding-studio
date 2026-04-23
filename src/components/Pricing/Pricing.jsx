import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Pricing.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { addDoc, collection, doc, getDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../firebase/firebaseConfig";

const defaultPricingData = {
  "Social Media Marketing": [
    {
      name: "Starter SM Mgt.",
      price: 10000,
      desc: "Basic uploading, stories, basic research, normal highlights.",
    },
    {
      name: "Advanced SM Mgt.",
      price: 15000,
      desc: "Uploading with SEO, premium stories, detailed research, premium highlights cover, reels cover page with theme.",
    },
    {
      name: "Pro SM Mgt.",
      price: 20000,
      desc: "Uploading with SEO, premium stories, detailed research, premium highlights cover, reels cover page with theme, content planning, content calendar and story planner.",
    },
    {
      name: "Basic Reel",
      price: 1000,
      desc: "Normal camera, basic editing, no raw data provided, no photoshoot.",
    },
    {
      name: "Advanced Reel",
      price: 2500,
      desc: "High-end camera, advanced editing, raw data provided and photoshoot if needed.",
    },
    {
      name: "Pro Reel",
      price: 5000,
      desc: "High-end camera, advanced editing, complete scripting, proper light setup, raw data provided and photoshoot if needed.",
    },
    {
      name: "Basic Posters",
      price: 500,
      desc: "Basic posters with limited changes.",
    },
    {
      name: "Advanced Posters",
      price: 1000,
      desc: "Premium poster design with proper concept and 5 free changes.",
    },
    {
      name: "Basic Ad Mgt. Fee",
      price: 10000,
      desc: "Only Meta Ads management with limited optimization.",
    },
    {
      name: "Advanced Ad Mgt. Fee",
      price: 20000,
      desc: "Meta and Google Ads management with daily optimizations, detailed reports and detailed research.",
    },
    {
      name: "Basic PR",
      price: 5000,
      desc: "Influencer management with content planning, 5 influencers/month. Influencer charges extra.",
    },
    {
      name: "Advanced PR",
      price: 10000,
      desc: "Influencer management with detailed content planning, 10 influencers/month. Influencer charges extra.",
    },
  ],

  "Ad Film Shoot": [
    {
      name: "Advanced Ads Creation",
      price: 10000,
      desc: "Normal camera, normal lens, mic, gimbal, normal light setup. Editing included.",
    },
    {
      name: "Pro Ads Creation",
      price: 20000,
      desc: "High-end camera with G-lens, mic, gimbal, good light setup, drone. Premium editing included.",
    },
  ],

  "Graphics and Branding": [
    {
      name: "Basic Brand Kit",
      price: 5000,
      desc: "Basic logo, color palette, typography and simple brand assets.",
    },
    {
      name: "Advanced Brand Kit",
      price: 10000,
      desc: "Premium logo concepts, brand guidelines, stationery and social media branding kit.",
    },
    {
      name: "Premium Brand Identity",
      price: 20000,
      desc: "Complete visual identity system, detailed branding assets and premium design support.",
    },
  ],
};

const defaultPackageOptions = [
  { value: "3", label: "3 Months Package", months: 3, discount: 0.05 },
  { value: "6", label: "6 Months Package", months: 6, discount: 0.1 },
  { value: "12", label: "Yearly Package", months: 12, discount: 0.15 },
];

const normalizePackageOptions = (options = defaultPackageOptions) =>
  options
    .filter((option) => option?.label && Number(option.months) > 0)
    .map((option, index) => ({
      value: String(option.value || option.months || index + 1),
      label: option.label,
      months: Number(option.months),
      discount:
        Number(option.discount) > 1
          ? Number(option.discount) / 100
          : Number(option.discount) || 0,
    }));

const Pricing = () => {
  const pdfRef = useRef(null);

  const [formData, setFormData] = useState({
    companyName: "",
    businessCategory: "",
    name: "",
    position: "",
    mailId: "",
    number: "",
    address: "",
    monthlyBudgetRange: "",
  });

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [previewServiceName, setPreviewServiceName] = useState("");
  const [pendingService, setPendingService] = useState("");
  const [pricingData, setPricingData] = useState(defaultPricingData);
  const [packageOptions, setPackageOptions] = useState(defaultPackageOptions);
  const [selectedPackage, setSelectedPackage] = useState("");

  const categoryOptions = useMemo(() => Object.keys(pricingData), [pricingData]);

  useEffect(() => {
    const loadPricing = async () => {
      try {
        const snap = await getDoc(doc(db, "pricing_settings", "main"));
        const categories = snap.data()?.categories;
        const storedPackageOptions = snap.data()?.packageOptions;

        if (Array.isArray(categories) && categories.length > 0) {
          const normalizedData = categories.reduce((acc, category) => {
            if (!category?.name || !Array.isArray(category.services)) {
              return acc;
            }

            acc[category.name] = category.services
              .filter((service) => service?.name && Number.isFinite(Number(service.price)))
              .map((service) => ({
                name: service.name,
                price: Number(service.price),
                desc: service.desc || "",
              }));

            return acc;
          }, {});

          if (Object.keys(normalizedData).length > 0) {
            setPricingData(normalizedData);
          }
        }

        if (Array.isArray(storedPackageOptions) && storedPackageOptions.length > 0) {
          const normalizedPackages = normalizePackageOptions(storedPackageOptions);

          if (normalizedPackages.length > 0) {
            setPackageOptions(normalizedPackages);
          }
        }
      } catch (error) {
        console.error("Failed to load pricing settings:", error);
      }
    };

    loadPricing();
  }, []);

  const serviceOptions = useMemo(() => {
    if (!selectedCategory) return [];
    return pricingData[selectedCategory] || [];
  }, [selectedCategory, pricingData]);

  useEffect(() => {
    if (selectedCategory && !categoryOptions.includes(selectedCategory)) {
      setSelectedCategory("");
      setSelectedServices([]);
      setPreviewServiceName("");
      setPendingService("");
    }
  }, [selectedCategory, categoryOptions]);

  const isFormComplete =
    formData.companyName &&
    formData.businessCategory &&
    formData.name &&
    formData.position &&
    formData.mailId &&
    formData.number &&
    formData.address &&
    formData.monthlyBudgetRange;

  useEffect(() => {
    if (
      selectedPackage &&
      !packageOptions.some((option) => option.value === selectedPackage)
    ) {
      setSelectedPackage("");
    }
  }, [selectedPackage, packageOptions]);

  useEffect(() => {
    if (!isFormComplete && (selectedCategory || selectedServices.length > 0)) {
      setSelectedCategory("");
      setSelectedServices([]);
      setPreviewServiceName("");
      setPendingService("");
      setSelectedPackage("");
    }
  }, [isFormComplete, selectedCategory, selectedServices.length]);

  const activePreviewService = useMemo(() => {
    if (!previewServiceName) return null;
    return (
      serviceOptions.find((item) => item.name === previewServiceName) || null
    );
  }, [previewServiceName, serviceOptions]);

  const totalPrice = useMemo(() => {
    return selectedServices.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }, [selectedServices]);

  const activePackage = useMemo(() => {
    return packageOptions.find((item) => item.value === selectedPackage) || null;
  }, [selectedPackage, packageOptions]);

  const packageBaseAmount = useMemo(() => {
    return activePackage ? totalPrice * activePackage.months : totalPrice;
  }, [totalPrice, activePackage]);

  const discountAmount = useMemo(() => {
    return activePackage
      ? Math.round(packageBaseAmount * activePackage.discount)
      : 0;
  }, [packageBaseAmount, activePackage]);

  const discountedPackageAmount = useMemo(() => {
    return packageBaseAmount - discountAmount;
  }, [packageBaseAmount, discountAmount]);

  const packageGstBeforeDiscount = useMemo(() => {
    return Math.round(packageBaseAmount * 0.18);
  }, [packageBaseAmount]);

  const gstAmount = useMemo(() => {
    return Math.round(discountedPackageAmount * 0.18);
  }, [discountedPackageAmount]);

  const grandTotal = useMemo(() => {
    return discountedPackageAmount + gstAmount;
  }, [discountedPackageAmount, gstAmount]);

  const packageTotalBeforeDiscount = useMemo(() => {
    return packageBaseAmount + packageGstBeforeDiscount;
  }, [packageBaseAmount, packageGstBeforeDiscount]);

  const totalSavedAmount = useMemo(() => {
    return packageTotalBeforeDiscount - grandTotal;
  }, [packageTotalBeforeDiscount, grandTotal]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let formattedValue = value;

    if (
      ["companyName", "businessCategory", "name", "position", "address"].includes(
        name
      )
    ) {
      formattedValue = value.charAt(0).toUpperCase() + value.slice(1);
    }

    if (name === "number") {
      let digits = value.replace(/\D/g, "");

      if (digits.startsWith("91")) {
        digits = digits.slice(2);
      }

      digits = digits.slice(0, 10);
      formattedValue = digits ? `+91 ${digits}` : "";
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const addService = (serviceName) => {
    if (!serviceName) return;

    const service = serviceOptions.find((s) => s.name === serviceName);
    if (!service) return;

    const alreadyAdded = selectedServices.find(
      (item) => item.name === service.name
    );

    if (alreadyAdded) {
      setPreviewServiceName(service.name);
      return;
    }

    setSelectedServices((prev) => [
      ...prev,
      {
        ...service,
        quantity: 1,
      },
    ]);

    setPreviewServiceName(service.name);
  };

  const handleAddSelectedService = () => {
    if (!pendingService) {
      alert("Please select a service first.");
      return;
    }

    addService(pendingService);
    setPendingService("");
  };

  const updateQuantity = (index, value) => {
    const qty = Math.max(1, Number(value) || 1);

    setSelectedServices((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, quantity: qty } : item
      )
    );
  };

  const removeService = (index) => {
    setSelectedServices((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setSelectedServices([]);
    setPreviewServiceName("");
    setPendingService("");
  };

  const generatePDF = async () => {
    if (!pdfRef.current) return;

    const canvas = await html2canvas(pdfRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const logoData = await new Promise((resolve) => {
      const logo = new Image();
      logo.crossOrigin = "anonymous";
      logo.onload = () => {
        const canvasLogo = document.createElement("canvas");
        canvasLogo.width = logo.naturalWidth;
        canvasLogo.height = logo.naturalHeight;
        const ctx = canvasLogo.getContext("2d");
        ctx.drawImage(logo, 0, 0);
        resolve(canvasLogo.toDataURL("image/png"));
      };
      logo.onerror = () => resolve(null);
      logo.src = "/assets/logo/branding-logo.png";
    });

    const pdfWidth = 210;
    const pdfHeight = 297;
    const pageMargin = 8;
    const imgWidth = pdfWidth - pageMargin * 2;
    const pageContentHeight = pdfHeight - pageMargin * 2;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = pageMargin;

    const addFooterLogo = () => {
      if (!logoData) return;
      pdf.addImage(logoData, "PNG", pdfWidth - 42, pdfHeight - 20, 28, 9);
    };

    pdf.addImage(imgData, "PNG", pageMargin, position, imgWidth, imgHeight);
    heightLeft -= pageContentHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight + pageMargin;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", pageMargin, position, imgWidth, imgHeight);
      addFooterLogo();
      heightLeft -= pageContentHeight;
    }

    pdf.save(`quotation-${formData.companyName || "branding-studio"}.pdf`);
  };

  const saveQuotationLead = async () => {
    await addDoc(collection(db, "quotation_leads"), {
      client: {
        companyName: formData.companyName.trim(),
        businessCategory: formData.businessCategory.trim(),
        name: formData.name.trim(),
        position: formData.position.trim(),
        email: formData.mailId.trim(),
        phone: formData.number.trim(),
        address: formData.address.trim(),
        monthlyBudgetRange: formData.monthlyBudgetRange.trim(),
      },
      pricing: {
        selectedCategory,
        monthlySubtotal: totalPrice,
        selectedPackage: activePackage
          ? {
              label: activePackage.label,
              months: activePackage.months,
              discountPercent: Math.round(activePackage.discount * 100),
            }
          : null,
        packageAmount: packageBaseAmount,
        gstBeforeDiscount: packageGstBeforeDiscount,
        totalBeforeDiscount: packageTotalBeforeDiscount,
        discountAmount,
        totalSavedAmount,
        amountAfterDiscount: discountedPackageAmount,
        gstAmount,
        grandTotal,
      },
      services: selectedServices.map((service) => ({
        name: service.name,
        price: service.price,
        quantity: service.quantity,
        total: service.price * service.quantity,
        desc: service.desc || "",
      })),
      createdAt: serverTimestamp(),
    });
  };

  const handleGenerateQuotation = async () => {
    const requiredFields = [
      formData.companyName,
      formData.businessCategory,
      formData.name,
      formData.position,
      formData.mailId,
      formData.number,
      formData.address,
      formData.monthlyBudgetRange,
    ];

    const isFormIncomplete = requiredFields.some((field) => !field.trim());

    if (isFormIncomplete) {
      alert("Please fill all client details before generating quotation.");
      return;
    }

    if (selectedServices.length === 0) {
      alert("Please add at least one service.");
      return;
    }

    try {
      await saveQuotationLead();
      await generatePDF();
    } catch (error) {
      console.error("Failed to save quotation lead:", error);
      alert("Quotation could not be saved. Please try again.");
    }
  };

  return (
    <section className="pricing-page">
      <div className="pricing-page__topbar">
        <div className="pricing-page__topbar-left">
          <span className="pricing-page__badge">Package Calculator</span>
          <h1 className="pricing-page__mini-title">Build Your Custom Package</h1>
          <p className="pricing-page__mini-subtitle">
            Select services, set quantity, and generate a quotation.
          </p>
        </div>

        <div className="pricing-page__topbar-right">
          <span>Date: {new Date().toLocaleDateString()}</span>
          <span>Category: {selectedCategory || "Not Selected"}</span>
        </div>
      </div>

      <div className="pricing-page__shell">
        <div className="pricing-page__grid">
          <div className="pricing-card pricing-card--form">
            <div className="pricing-card__head">
              <span className="pricing-card__eyebrow">Client Details</span>
              <h3>Fill the Details for Calculate Package</h3>
            </div>

            <div className="pricing-form">
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="businessCategory"
                placeholder="Business Category"
                value={formData.businessCategory}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="position"
                placeholder="Position"
                value={formData.position}
                onChange={handleInputChange}
              />
              <input
                type="email"
                name="mailId"
                placeholder="Mail id"
                value={formData.mailId}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="number"
                placeholder="Phone Number"
                value={formData.number}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="monthlyBudgetRange"
                placeholder="Monthly Budget Range"
                value={formData.monthlyBudgetRange}
                onChange={handleInputChange}
              />
            </div>

            {!isFormComplete ? (
              <div className="pricing-note">
                Please fill all client details to generate quotation.
              </div>
            ) : (
              <div className="pricing-note success">
                ✓ Client details completed
              </div>
            )}
          </div>

          <div className="pricing-card pricing-card--content">
            <div className="pricing-card__head pricing-card__head--center">
              <span className="pricing-card__eyebrow">Service Selection</span>
              <h3>Choose the services you need</h3>
              <p>
                Build your package step-by-step and see real-time pricing
                updates.
              </p>
            </div>

            <div className="pricing-selects">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  if (!isFormComplete) {
                    return;
                  }

                  handleCategoryChange(e);
                }}
                onMouseDown={(e) => {
                  if (!isFormComplete) {
                    e.preventDefault();
                    toast.info("Please fill client details first.", {
                      position: "top-right",
                      autoClose: 2400,
                      style: {
                        minWidth: "320px",
                        fontSize: "16px",
                        fontWeight: 700,
                        padding: "16px 18px",
                      },
                    });
                  }
                }}
              >
                <option value="">Select Category</option>
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                className="pricing-service-dropdown"
                value={pendingService}
                onChange={(e) => {
                  setPendingService(e.target.value);
                  setPreviewServiceName(e.target.value);
                }}
                disabled={!selectedCategory}
              >
                <option value="">
                  {selectedCategory ? "Select Services" : "Select category first"}
                </option>
                {serviceOptions.map((service) => (
                  <option key={service.name} value={service.name}>
                    {service.name} - ₹{service.price.toLocaleString("en-IN")}
                  </option>
                ))}
              </select>
            </div>

            {!isFormComplete && (
              <div className="pricing-alert pricing-alert--soft">
                Please fill all client details first. Category and services will
                unlock after that.
              </div>
            )}

            <div className="pricing-actions-row">
              <button
                type="button"
                className="pricing-btn pricing-btn--primary"
                onClick={handleAddSelectedService}
                disabled={!pendingService}
              >
                + Add Selected Service
              </button>

              <button
                type="button"
                className="pricing-btn pricing-btn--ghost"
                onClick={() => {
                  const serviceDropdown = document.querySelector(
                    ".pricing-service-dropdown"
                  );
                  serviceDropdown?.focus();
                }}
              >
                + Add More Services
              </button>
            </div>

            {selectedCategory && (
              <div className="pricing-alert">
                If service is not listed in this section, please contact via
                WhatsApp.
              </div>
            )}

            {activePreviewService && (
              <div className="pricing-preview">
                <div className="pricing-preview__top">
                  <span className="pricing-preview__tag">Preview</span>
                  <span className="pricing-preview__price">
                    ₹{activePreviewService.price.toLocaleString("en-IN")}/-
                  </span>
                </div>

                <h4>{activePreviewService.name}</h4>
                <p>{activePreviewService.desc}</p>
              </div>
            )}

            <div className="pricing-summary">
              <div className="pricing-summary__head">
                <div>
                  <span className="pricing-card__eyebrow">Package Summary</span>
                  <h3>Your Custom Package Summary</h3>
                </div>
                <div className="pricing-total-chip">
                  Total with GST: ₹{grandTotal.toLocaleString("en-IN")}/-
                </div>
              </div>

              <div className="pricing-table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Selected Service</th>
                      <th>Per Service Price</th>
                      <th>Nos. Of Qnt</th>
                      <th>Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedServices.length === 0 ? (
                      <tr>
                        <td colSpan="4">No service selected yet.</td>
                      </tr>
                    ) : (
                      selectedServices.map((service, index) => (
                        <tr key={`${service.name}-${index}`}>
                          <td>{service.name}</td>
                          <td>₹{service.price.toLocaleString("en-IN")}</td>
                          <td>
                            <input
                              type="number"
                              min="1"
                              value={service.quantity}
                              onChange={(e) =>
                                updateQuantity(index, e.target.value)
                              }
                              className="pricing-qty-input"
                            />
                          </td>
                          <td>
                            <div className="pricing-row-total">
                              <span>
                                ₹
                                {(service.price * service.quantity).toLocaleString(
                                  "en-IN"
                                )}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeService(index)}
                                className="pricing-remove-btn"
                              >
                                ✕
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="pricing-summary__footer">
                <div className="pricing-summary__totals">
                  <div className="pricing-summary__line">
                    <span>Monthly Subtotal</span>
                    <strong>₹{totalPrice.toLocaleString("en-IN")}/-</strong>
                  </div>
                  {selectedServices.length > 0 && (
                    <div className="pricing-package-picker">
                      <label htmlFor="packageDuration">
                        Choose Package Duration
                      </label>
                      <select
                        id="packageDuration"
                        value={selectedPackage}
                        onChange={(e) => setSelectedPackage(e.target.value)}
                      >
                        <option value="">Choose Package Duration</option>
                        {packageOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label} - {Math.round(option.discount * 100)}% Discount
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  {activePackage && (
                    <div className="pricing-summary__line">
                      <span>{activePackage.label} Amount</span>
                      <strong>₹{packageBaseAmount.toLocaleString("en-IN")}/-</strong>
                    </div>
                  )}
                  <div className="pricing-summary__line">
                    <span>GST (18%)</span>
                    <strong>
                      ₹
                      {(activePackage
                        ? packageGstBeforeDiscount
                        : gstAmount
                      ).toLocaleString("en-IN")}
                      /-
                    </strong>
                  </div>
                  <div className="pricing-summary__line pricing-summary__line--total">
                    <span>Total</span>
                    <strong>
                      ₹
                      {(activePackage
                        ? packageTotalBeforeDiscount
                        : grandTotal
                      ).toLocaleString("en-IN")}
                      /-
                    </strong>
                  </div>
                  {activePackage && <div className="pricing-summary__divider" />}
                  <div className="pricing-summary__line">
                    <span>
                      Discount (
                      {activePackage
                        ? `${Math.round(activePackage.discount * 100)}%`
                        : "No package selected"}
                      )
                    </span>
                    <strong>- ₹{discountAmount.toLocaleString("en-IN")}/-</strong>
                  </div>
                  <div className="pricing-summary__line pricing-summary__line--save">
                    <span>Total Saved Amount</span>
                    <strong>₹{totalSavedAmount.toLocaleString("en-IN")}/-</strong>
                  </div>
                  <div className="pricing-summary__final">
                    <span>
                      {activePackage
                        ? "Total Price with Discount"
                        : "Total Package Price"}
                    </span>
                    <strong>₹{grandTotal.toLocaleString("en-IN")}/-</strong>
                  </div>
                </div>

                <button
                  onClick={handleGenerateQuotation}
                  className="pricing-btn pricing-btn--gradient"
                >
                  Generate My Quotation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pdf-only-wrapper">
        <div
          ref={pdfRef}
          className={`pdf-quotation ${
            selectedServices.length <= 2 ? "pdf-quotation--compact" : ""
          }`}
        >
          <div className="pdf-quotation__header">
            <div className="pdf-quotation__brand">
              <img
                src="/assets/logo/branding-logo.png"
                alt="Brandingstudio logo"
                className="pdf-quotation__logo"
              />
            </div>
            <div className="pdf-quotation__meta">
              <p>
                <strong>Date:</strong> {new Date().toLocaleDateString()}
              </p>
              <p>
                <strong>Category:</strong> {selectedCategory || "Not Selected"}
              </p>
            </div>
          </div>

          <div className="pdf-quotation__section">
            <h2>Client Details</h2>
            <div className="pdf-quotation__client-grid">
              <div>
                <strong>Company Name:</strong> {formData.companyName || "-"}
              </div>
              <div>
                <strong>Business Category:</strong>{" "}
                {formData.businessCategory || "-"}
              </div>
              <div>
                <strong>Name:</strong> {formData.name || "-"}
              </div>
              <div>
                <strong>Position:</strong> {formData.position || "-"}
              </div>
              <div>
                <strong>Email:</strong> {formData.mailId || "-"}
              </div>
              <div>
                <strong>Phone:</strong> {formData.number || "-"}
              </div>
              <div>
                <strong>Address:</strong> {formData.address || "-"}
              </div>
              <div>
                <strong>Budget Range:</strong>{" "}
                {formData.monthlyBudgetRange || "-"}
              </div>
            </div>
          </div>

          <div className="pdf-quotation__section pdf-quotation__section--spaced">
            <h2>Selected Services</h2>

            <table className="pdf-quotation__table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedServices.length === 0 ? (
                  <tr>
                    <td colSpan="4">No services selected.</td>
                  </tr>
                ) : (
                  selectedServices.map((service, index) => (
                    <tr key={`${service.name}-${index}`}>
                      <td>
                        <div className="pdf-quotation__service-name">
                          {service.name}
                        </div>
                        <div className="pdf-quotation__service-desc">
                          {service.desc}
                        </div>
                      </td>
                      <td>₹{service.price.toLocaleString("en-IN")}</td>
                      <td>{service.quantity}</td>
                      <td>
                        ₹
                        {(service.price * service.quantity).toLocaleString(
                          "en-IN"
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="pdf-quotation__total pdf-quotation__total--spaced">
            <div className="pdf-quotation__total-breakdown">
              <span>Monthly Subtotal: ₹{totalPrice.toLocaleString("en-IN")}/-</span>
              {activePackage && (
                <>
                  <span>
                    Package: {activePackage.label} (
                    {Math.round(activePackage.discount * 100)}% discount)
                  </span>
                  <span>
                    Package Amount: ₹{packageBaseAmount.toLocaleString("en-IN")}/-
                  </span>
                  <span>
                    GST Before Discount: ₹
                    {packageGstBeforeDiscount.toLocaleString("en-IN")}/-
                  </span>
                  <span>
                    Total Before Discount: ₹
                    {packageTotalBeforeDiscount.toLocaleString("en-IN")}/-
                  </span>
                </>
              )}
              <span>
                Discount: ₹{discountAmount.toLocaleString("en-IN")}/-
              </span>
              <span>
                Total Saved: ₹{totalSavedAmount.toLocaleString("en-IN")}/-
              </span>
              <span>
                After Discount: ₹
                {discountedPackageAmount.toLocaleString("en-IN")}/-
              </span>
              <span>GST (18%): ₹{gstAmount.toLocaleString("en-IN")}/-</span>
            </div>
            <strong>₹{grandTotal.toLocaleString("en-IN")}/-</strong>
          </div>

          <div className="pdf-quotation__section pdf-quotation__section--spaced pdf-quotation__section--terms">
            <h2>Terms & Conditions</h2>
            <ul className="pdf-quotation__terms">
              <li>Quotation is valid for 7 days from the issue date.</li>
              <li>
                This is a prepaid service, and work will commence only after
                payment confirmation.
              </li>
              <li>Final delivery timelines depend on scope and approvals.</li>
              <li>
                Third-party ad spend, influencer charges, and production
                expenses are separate unless mentioned.
              </li>
              <li>
                Any additional revisions or scope changes may affect the final
                pricing.
              </li>
              <li>
                All prices mentioned above are exclusive of applicable taxes
                (18% GST).
              </li>
            </ul>
          </div>

          <div className="pdf-quotation__footer">
            <p>Thank you for choosing Brandingstudio.</p>
            <p>brandingstudio.team@gmail.com</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
