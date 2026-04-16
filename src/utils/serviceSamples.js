import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const serviceSampleDefaults = {
  filmmaking: [
    {
      id: "film-1",
      type: "video",
      title: "Fashion Brand Ad Film",
      category: "Ad Film",
      thumb: "/assets/samples/film-video-1.jpg",
      link: "https://www.youtube.com/",
    },
    {
      id: "film-2",
      type: "video",
      title: "Restaurant Promo Reel",
      category: "Promo Reel",
      thumb: "/assets/samples/film-video-2.jpg",
      link: "https://www.youtube.com/",
    },
    {
      id: "film-3",
      type: "photo",
      title: "Product Shoot Setup",
      category: "Behind the Scenes",
      thumb: "/assets/samples/film-photo-1.jpg",
      link: "/assets/samples/film-photo-1.jpg",
    },
    {
      id: "film-4",
      type: "photo",
      title: "Brand Campaign Still",
      category: "Campaign Visual",
      thumb: "/assets/samples/film-photo-2.jpg",
      link: "/assets/samples/film-photo-2.jpg",
    },
    {
      id: "film-5",
      type: "video",
      title: "Corporate Introduction Film",
      category: "Corporate Film",
      thumb: "/assets/samples/film-video-3.jpg",
      link: "https://www.youtube.com/",
    },
    {
      id: "film-6",
      type: "photo",
      title: "Lighting & Set Direction",
      category: "Production Still",
      thumb: "/assets/samples/film-photo-3.jpg",
      link: "/assets/samples/film-photo-3.jpg",
    },
  ],
  webdev: [
    {
      id: "web-1",
      type: "photo",
      title: "Startup Landing Page",
      category: "Landing Page",
      thumb: "/assets/samples/web-photo-1.jpg",
      link: "/assets/samples/web-photo-1.jpg",
    },
    {
      id: "web-2",
      type: "photo",
      title: "E-commerce Product Page",
      category: "E-commerce UI",
      thumb: "/assets/samples/web-photo-2.jpg",
      link: "/assets/samples/web-photo-2.jpg",
    },
    {
      id: "web-3",
      type: "video",
      title: "Website Interaction Demo",
      category: "UI Motion",
      thumb: "/assets/samples/web-video-1.jpg",
      link: "https://www.youtube.com/",
    },
    {
      id: "web-4",
      type: "photo",
      title: "Dashboard Interface View",
      category: "Web App",
      thumb: "/assets/samples/web-photo-3.jpg",
      link: "/assets/samples/web-photo-3.jpg",
    },
    {
      id: "web-5",
      type: "video",
      title: "Responsive Website Walkthrough",
      category: "Mobile Preview",
      thumb: "/assets/samples/web-video-2.jpg",
      link: "https://www.youtube.com/",
    },
    {
      id: "web-6",
      type: "photo",
      title: "Premium Website Hero Section",
      category: "Hero Layout",
      thumb: "/assets/samples/web-photo-4.jpg",
      link: "/assets/samples/web-photo-4.jpg",
    },
  ],
  seo: [
    {
      id: "seo-1",
      type: "photo",
      title: "Keyword Ranking Growth Snapshot",
      category: "Ranking Report",
      thumb: "/assets/samples/seo-photo-1.jpg",
      link: "/assets/samples/seo-photo-1.jpg",
    },
    {
      id: "seo-2",
      type: "photo",
      title: "Search Console Performance Graph",
      category: "GSC Analytics",
      thumb: "/assets/samples/seo-photo-2.jpg",
      link: "/assets/samples/seo-photo-2.jpg",
    },
    {
      id: "seo-3",
      type: "video",
      title: "SEO Audit Walkthrough",
      category: "Audit Demo",
      thumb: "/assets/samples/seo-video-1.jpg",
      link: "https://www.youtube.com/",
    },
    {
      id: "seo-4",
      type: "photo",
      title: "Technical SEO Checklist View",
      category: "Technical SEO",
      thumb: "/assets/samples/seo-photo-3.jpg",
      link: "/assets/samples/seo-photo-3.jpg",
    },
    {
      id: "seo-5",
      type: "video",
      title: "Local SEO Results Preview",
      category: "Local SEO",
      thumb: "/assets/samples/seo-video-2.jpg",
      link: "https://www.youtube.com/",
    },
    {
      id: "seo-6",
      type: "photo",
      title: "Traffic Improvement Dashboard",
      category: "Analytics Report",
      thumb: "/assets/samples/seo-photo-4.jpg",
      link: "/assets/samples/seo-photo-4.jpg",
    },
  ],
  smo: [
    {
      id: "smo-1",
      type: "video",
      title: "Instagram Reel Campaign",
      category: "Reel Strategy",
      thumb: "/assets/samples/smo-video-1.jpg",
      link: "https://www.youtube.com/",
    },
    {
      id: "smo-2",
      type: "photo",
      title: "Carousel Creative Set",
      category: "Static Design",
      thumb: "/assets/samples/smo-photo-1.jpg",
      link: "/assets/samples/smo-photo-1.jpg",
    },
    {
      id: "smo-3",
      type: "video",
      title: "Brand Awareness Promo",
      category: "Social Campaign",
      thumb: "/assets/samples/smo-video-2.jpg",
      link: "https://www.youtube.com/",
    },
    {
      id: "smo-4",
      type: "photo",
      title: "Festival Post Series",
      category: "Content Calendar",
      thumb: "/assets/samples/smo-photo-2.jpg",
      link: "/assets/samples/smo-photo-2.jpg",
    },
    {
      id: "smo-5",
      type: "video",
      title: "UGC + Performance Cut",
      category: "Paid Assist",
      thumb: "/assets/samples/smo-video-3.jpg",
      link: "https://www.youtube.com/",
    },
    {
      id: "smo-6",
      type: "photo",
      title: "Engagement Story Pack",
      category: "Stories Design",
      thumb: "/assets/samples/smo-photo-3.jpg",
      link: "/assets/samples/smo-photo-3.jpg",
    },
  ],
  graphicDesign: [
    {
      id: "design-1",
      type: "photo",
      title: "Premium Poster Design",
      category: "Poster Creative",
      thumb: "/assets/samples/design-photo-1.jpg",
      link: "/assets/samples/design-photo-1.jpg",
    },
    {
      id: "design-2",
      type: "photo",
      title: "Brand Identity Board",
      category: "Branding",
      thumb: "/assets/samples/design-photo-2.jpg",
      link: "/assets/samples/design-photo-2.jpg",
    },
    {
      id: "design-3",
      type: "video",
      title: "Logo Reveal Animation",
      category: "Motion Design",
      thumb: "/assets/samples/design-video-1.jpg",
      link: "https://www.youtube.com/",
    },
    {
      id: "design-4",
      type: "photo",
      title: "Social Media Creative Set",
      category: "Social Kit",
      thumb: "/assets/samples/design-photo-3.jpg",
      link: "/assets/samples/design-photo-3.jpg",
    },
    {
      id: "design-5",
      type: "video",
      title: "UI Walkthrough Preview",
      category: "UI Showcase",
      thumb: "/assets/samples/design-video-2.jpg",
      link: "https://www.youtube.com/",
    },
    {
      id: "design-6",
      type: "photo",
      title: "Packaging Mockup",
      category: "Packaging Design",
      thumb: "/assets/samples/design-photo-4.jpg",
      link: "/assets/samples/design-photo-4.jpg",
    },
  ],
};

export const serviceSampleLabels = {
  filmmaking: "Content Creation",
  webdev: "Website Development",
  seo: "SEO",
  smo: "Social Media Marketing",
  graphicDesign: "Graphic Designing",
};

export const useManagedServiceSamples = (serviceKey) => {
  const [samples, setSamples] = useState(serviceSampleDefaults[serviceKey] || []);

  useEffect(() => {
    const loadSamples = async () => {
      try {
        const snap = await getDoc(doc(db, "service_samples", "main"));
        const services = snap.data()?.services || {};
        const managedSamples = services[serviceKey];

        if (Array.isArray(managedSamples) && managedSamples.length > 0) {
          setSamples(
            managedSamples.map((sample, index) => ({
              id: sample.id || `${serviceKey}-${index + 1}`,
              type: sample.type === "video" ? "video" : "photo",
              title: sample.title || "",
              category: sample.category || "",
              thumb: sample.thumb || "",
              link: sample.link || "",
            }))
          );
        }
      } catch (error) {
        console.error(`Failed to load ${serviceKey} samples:`, error);
      }
    };

    loadSamples();
  }, [serviceKey]);

  return samples;
};
