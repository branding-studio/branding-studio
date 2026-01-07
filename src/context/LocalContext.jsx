import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { doc, getDoc } from "firebase/firestore";
import db from "../firebase/firebaseConfig";

const LocalContext = createContext();

/**
 * Small safe window getter (avoids SSR errors)
 */
const getWin = () => (typeof window !== "undefined" ? window : null);

/**
 * Basic mobile detection (for preferApp hint)
 */
const isLikelyMobile = () => {
  const w = getWin();
  if (!w) return false;
  const ua = w.navigator?.userAgent || "";
  return /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(ua);
};

/**
 * Normalize WhatsApp number:
 * - keep digits only
 * - MUST include country code (e.g. 91xxxxxxxxxx)
 */
const normalizeWaNumber = (raw = "") => String(raw).replace(/[^\d]/g, "");

/**
 * Encode message safely for URL
 */
const encodeMsg = (msg = "") => encodeURIComponent(String(msg));

export const LocalProvider = ({ children }) => {
  const [currentTFN, setCurrentTFN] = useState({
    intlFormat: "",
    localFormat: "",
  });

  const [webinfo, setwebinfo] = useState({
    name: "Branding Studio",
    phone: "",
    phonecall: "",
    logo:
      "https://brandingstudio.in/wp-content/uploads/2024/08/NEW-BS-LOGOOOO-1-copy-2-scaled.png",
    email: "contact@digiborr.com",
    address:
      "19, Ashoka Rd, Janpath, Connaught Place, New Delhi, Delhi 110001, India",
    addressCity: "New Delhi",

    /**
     * 🔹 Default Telegram handle
     * Examples: "darioharmon" (no leading @)
     */
    telegramHandle: "darioharmon",

    /**
     * 🔹 Default WhatsApp number
     * IMPORTANT: include country code, digits only preferred.
     * Example: "919876543210"
     */
    whatsappNumber: "91XXXXXXXXXX",
  });

  // Fetch TFN from Firebase
  useEffect(() => {
    const fetchTFN = async () => {
      try {
        const docRef = doc(db, "siteNumbers", "weboku.com");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setCurrentTFN({
            intlFormat: data.numberIntl || "",
            localFormat: data.numberLocal || "",
          });
        } else {
          console.log("No such document!");
          setCurrentTFN({ intlFormat: "", localFormat: "" });
        }
      } catch (error) {
        console.error("Error fetching TFN: ", error);
      }
    };

    fetchTFN();
  }, []);

  // Map TFN to webinfo fields
  useEffect(() => {
    setwebinfo((prev) => ({
      ...prev,
      phone: currentTFN.localFormat,
      phonecall: currentTFN.intlFormat,
    }));
  }, [currentTFN]);

  /**
   * ============= Telegram helpers (centralized) =============
   */
  const getTelegramUrl = ({ handle, preferApp } = {}) => {
    const h = (handle || webinfo.telegramHandle || "").replace(/^@/, "").trim();
    if (!h) return "";

    const useApp = typeof preferApp === "boolean" ? preferApp : isLikelyMobile();
    return useApp
      ? `tg://resolve?domain=${encodeURIComponent(h)}`
      : `https://t.me/${encodeURIComponent(h)}`;
  };

  const openTelegram = ({ handle, preferApp } = {}) => {
    const w = getWin();
    const url = getTelegramUrl({ handle, preferApp });
    if (!w || !url) return false;

    try {
      const popup = w.open(url, "_blank", "noopener,noreferrer");
      if (popup) return true;

      w.location.href = url;
      return true;
    } catch (e) {
      if (url.startsWith("tg://")) {
        const httpsUrl = getTelegramUrl({ handle, preferApp: false });
        try {
          const popup2 = w.open(httpsUrl, "_blank", "noopener,noreferrer");
          if (popup2) return true;
          w.location.href = httpsUrl;
          return true;
        } catch {
          w.location.href = httpsUrl;
          return true;
        }
      }
      return false;
    }
  };

  const getTelegramOnClick = ({ handle, preferApp } = {}) => {
    return (e) => {
      e?.preventDefault?.();
      openTelegram({ handle, preferApp });
    };
  };

  /**
   * ============= WhatsApp helpers (same pattern as Telegram) =============
   */

  /**
   * getWhatsAppUrl
   * @param {Object} opts
   * @param {string} [opts.number] - digits with country code (e.g. 9198xxxxxx). Falls back to webinfo.whatsappNumber
   * @param {string} [opts.message] - optional prefilled message
   * @param {boolean} [opts.preferApp] - if true, try wa:// on mobile
   * @returns {string} deep link to WhatsApp chat
   */
  const getWhatsAppUrl = ({ number, message, preferApp } = {}) => {
    const raw = number || webinfo.whatsappNumber || "";
    const n = normalizeWaNumber(raw);
    if (!n) return "";

    const msg = message ? `?text=${encodeMsg(message)}` : "";

    // If preferApp not provided, default to app link on mobile browsers.
    const useApp = typeof preferApp === "boolean" ? preferApp : isLikelyMobile();

    // Mobile app deep link:
    // Note: wa:// works on many devices, but not all browsers.
    if (useApp) return `wa://send?phone=${n}${message ? `&text=${encodeMsg(message)}` : ""}`;

    // Web link:
    return `https://wa.me/${n}${msg}`;
  };

  /**
   * openWhatsApp
   * Opens WhatsApp link in a new tab; if blocked, fallback to same tab.
   * If wa:// fails, fallback to https://wa.me
   */
  const openWhatsApp = ({ number, message, preferApp } = {}) => {
    const w = getWin();
    const url = getWhatsAppUrl({ number, message, preferApp });
    if (!w || !url) return false;

    try {
      const popup = w.open(url, "_blank", "noopener,noreferrer");
      if (popup) return true;

      w.location.href = url;
      return true;
    } catch (e) {
      // Fallback to https if wa:// blocked
      if (url.startsWith("wa://")) {
        const httpsUrl = getWhatsAppUrl({ number, message, preferApp: false });
        try {
          const popup2 = w.open(httpsUrl, "_blank", "noopener,noreferrer");
          if (popup2) return true;
          w.location.href = httpsUrl;
          return true;
        } catch {
          w.location.href = httpsUrl;
          return true;
        }
      }
      return false;
    }
  };

  const getWhatsAppOnClick = ({ number, message, preferApp } = {}) => {
    return (e) => {
      e?.preventDefault?.();
      openWhatsApp({ number, message, preferApp });
    };
  };

  // Memoize helpers so consumers don't rerender unnecessarily
  const value = useMemo(
    () => ({
      webinfo,
      setwebinfo,

      // Telegram helpers:
      getTelegramUrl,
      openTelegram,
      getTelegramOnClick,

      // WhatsApp helpers:
      getWhatsAppUrl,
      openWhatsApp,
      getWhatsAppOnClick,
    }),
    [webinfo]
  );

  return (
    <LocalContext.Provider value={value}>{children}</LocalContext.Provider>
  );
};

export const useLocalContext = () => useContext(LocalContext);
