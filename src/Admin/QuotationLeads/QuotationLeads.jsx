import React, { useEffect, useMemo, useState } from "react";
import "./QuotationLeads.css";
import { db } from "../../firebase/firebaseConfig";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

const formatCurrency = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN")}/-`;

const formatDate = (timestamp) => {
  const date = timestamp?.toDate ? timestamp.toDate() : null;
  if (!date) return "-";

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const QuotationLeads = () => {
  const [leads, setLeads] = useState([]);
  const [activeLeadId, setActiveLeadId] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const leadsQuery = query(
        collection(db, "quotation_leads"),
        orderBy("createdAt", "desc")
      );
      const snap = await getDocs(leadsQuery);
      const nextLeads = snap.docs.map((leadDoc) => ({
        id: leadDoc.id,
        ...leadDoc.data(),
      }));

      setLeads(nextLeads);
      setActiveLeadId((current) => current || nextLeads[0]?.id || "");
    } catch (error) {
      console.error("Failed to load quotation leads:", error);
      setMessage({
        type: "error",
        text: "Failed to load quotation leads.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const activeLead = useMemo(
    () => leads.find((lead) => lead.id === activeLeadId) || leads[0],
    [leads, activeLeadId]
  );

  const deleteLead = async (leadId) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this quotation lead?"
    );

    if (!shouldDelete) return;

    try {
      await deleteDoc(doc(db, "quotation_leads", leadId));
      const remainingLeads = leads.filter((lead) => lead.id !== leadId);
      setLeads(remainingLeads);
      setActiveLeadId(remainingLeads[0]?.id || "");
      setMessage({
        type: "success",
        text: "Quotation lead deleted successfully.",
      });
    } catch (error) {
      console.error("Failed to delete quotation lead:", error);
      setMessage({
        type: "error",
        text: "Failed to delete quotation lead.",
      });
    }
  };

  return (
    <section className="quotation-leads">
      <header className="ql-header">
        <div>
          <span className="ql-eyebrow">Quotation Leads</span>
          <h2>Generated quotation enquiries</h2>
          <p>
            Every time a visitor generates a quotation, their details and
            selected package are saved here.
          </p>
        </div>
        <button type="button" className="ql-refresh" onClick={fetchLeads}>
          Refresh Leads
        </button>
      </header>

      {message && <div className={`ql-alert ${message.type}`}>{message.text}</div>}

      {loading ? (
        <div className="ql-empty">Loading quotation leads...</div>
      ) : leads.length === 0 ? (
        <div className="ql-empty">No quotation leads generated yet.</div>
      ) : (
        <div className="ql-layout">
          <aside className="ql-list">
            {leads.map((lead) => (
              <button
                type="button"
                key={lead.id}
                className={`ql-lead-card ${
                  activeLead?.id === lead.id ? "active" : ""
                }`}
                onClick={() => setActiveLeadId(lead.id)}
              >
                <strong>{lead.client?.companyName || "Unnamed Company"}</strong>
                <span>{lead.client?.name || "-"}</span>
                <small>{formatDate(lead.createdAt)}</small>
                <b>{formatCurrency(lead.pricing?.grandTotal)}</b>
              </button>
            ))}
          </aside>

          {activeLead && (
            <article className="ql-detail">
              <div className="ql-detail-head">
                <div>
                  <h3>{activeLead.client?.companyName || "Quotation Lead"}</h3>
                  <p>{formatDate(activeLead.createdAt)}</p>
                </div>
                <button
                  type="button"
                  className="ql-delete"
                  onClick={() => deleteLead(activeLead.id)}
                >
                  Delete Lead
                </button>
              </div>

              <div className="ql-grid">
                <div><span>Name</span><strong>{activeLead.client?.name || "-"}</strong></div>
                <div><span>Position</span><strong>{activeLead.client?.position || "-"}</strong></div>
                <div><span>Email</span><strong>{activeLead.client?.email || "-"}</strong></div>
                <div><span>Phone</span><strong>{activeLead.client?.phone || "-"}</strong></div>
                <div><span>Business Category</span><strong>{activeLead.client?.businessCategory || "-"}</strong></div>
                <div><span>Budget Range</span><strong>{activeLead.client?.monthlyBudgetRange || "-"}</strong></div>
                <div className="wide"><span>Address</span><strong>{activeLead.client?.address || "-"}</strong></div>
              </div>

              <div className="ql-section">
                <h4>Selected Services</h4>
                <div className="ql-table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Service</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(activeLead.services || []).map((service, index) => (
                        <tr key={`${service.name}-${index}`}>
                          <td>{service.name}</td>
                          <td>{formatCurrency(service.price)}</td>
                          <td>{service.quantity}</td>
                          <td>{formatCurrency(service.total)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="ql-section">
                <h4>Package Summary</h4>
                <div className="ql-summary">
                  <div><span>Category</span><strong>{activeLead.pricing?.selectedCategory || "-"}</strong></div>
                  <div><span>Package</span><strong>{activeLead.pricing?.selectedPackage?.label || "No package selected"}</strong></div>
                  <div><span>Monthly Subtotal</span><strong>{formatCurrency(activeLead.pricing?.monthlySubtotal)}</strong></div>
                  <div><span>Package Amount</span><strong>{formatCurrency(activeLead.pricing?.packageAmount)}</strong></div>
                  <div><span>Discount</span><strong>{formatCurrency(activeLead.pricing?.discountAmount)}</strong></div>
                  <div><span>Total Saved</span><strong>{formatCurrency(activeLead.pricing?.totalSavedAmount)}</strong></div>
                  <div><span>GST</span><strong>{formatCurrency(activeLead.pricing?.gstAmount)}</strong></div>
                  <div className="ql-final"><span>Final Total</span><strong>{formatCurrency(activeLead.pricing?.grandTotal)}</strong></div>
                </div>
              </div>
            </article>
          )}
        </div>
      )}
    </section>
  );
};

export default QuotationLeads;
