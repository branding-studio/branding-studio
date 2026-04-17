import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { doc, getDoc } from "firebase/firestore";
import db from "../firebase/firebaseConfig";

const LocalContext = createContext();

const getWin = () => (typeof window !== "undefined" ? window : null);

const isLikelyMobile = () => {
  const w = getWin();
  if (!w) return false;
  const ua = w.navigator?.userAgent || "";
  return /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(ua);
};

const normalizeWaNumber = (raw = "") => String(raw).replace(/[^\d]/g, "");
const encodeMsg = (msg = "") => encodeURIComponent(String(msg));

export const LocalProvider = ({ children }) => {
  const [currentTFN, setCurrentTFN] = useState({
    intlFormat: "7788001422",
    localFormat: "7788001422",
  });

  const [webinfo, setwebinfo] = useState({
    name: "Branding Studios",
    phone: "7788001422",
    phonecall: "7788001422",
    logo: "https://brandingstudio.in/wp-content/uploads/2024/08/NEW-BS-LOGOOOO-1-copy-2-scaled.png",
    email: "brandingstudio.business@gmail.com",
    address:
      "1st Floor, F-4F - 53/2, Indradhanu Market, Complex, Nayapalli, Bhubaneswar",
    addressCity: "Odisha",

    telegramHandle: "",

   
    whatsappNumber: "917788001422",
  });


  useEffect(() => {
    const fetchTFN = async () => {
      try {
        const docRef = doc(db, "siteNumbers", "brandingstudios.com");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setCurrentTFN({
            intlFormat: data.numberIntl || "",
            localFormat: data.numberLocal || "",
          });
        } else {
          console.log("No such document! Keeping default numbers.");
        }
      } catch (error) {
        console.error("Error fetching TFN: ", error);
      }
    };

    fetchTFN();
  }, []);

  useEffect(() => {
    setwebinfo((prev) => ({
      ...prev,
      phone: currentTFN.localFormat || prev.phone,
      phonecall: currentTFN.intlFormat || prev.phonecall,
    }));
  }, [currentTFN]);


  const getTelegramUrl = ({ handle, preferApp } = {}) => {
    const h = (handle || webinfo.telegramHandle || "").replace(/^@/, "").trim();
    if (!h) return "";

    const useApp =
      typeof preferApp === "boolean" ? preferApp : isLikelyMobile();
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
   * getWhatsAppUrl
   * @param {Object} opts
   * @param {string} [opts.number] 
   * @param {string} [opts.message]
   * @param {boolean} [opts.preferApp] 
   * @returns {string} 
   */
  const getWhatsAppUrl = ({ number, message, preferApp } = {}) => {
    const raw = number || webinfo.whatsappNumber || "";
    const n = normalizeWaNumber(raw);
    if (!n) return "";

    const msg = message ? `?text=${encodeMsg(message)}` : "";

    const useApp =
      typeof preferApp === "boolean" ? preferApp : isLikelyMobile();

    if (useApp)
      return `wa://send?phone=${n}${message ? `&text=${encodeMsg(message)}` : ""}`;

    return `https://wa.me/${n}${msg}`;
  };

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