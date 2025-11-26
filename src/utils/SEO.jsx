// src/components/SEO.jsx
import { useEffect } from "react";

const KEY = "data-react-seo";

function upsertMetaByName(name, content) {
  if (!content) return null;
  let el = document.head.querySelector(`meta[name="${name}"][${KEY}]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    el.setAttribute(KEY, "1");
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
  return el;
}

function upsertMetaByProp(prop, content) {
  if (!content) return null;
  let el = document.head.querySelector(`meta[property="${prop}"][${KEY}]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", prop);
    el.setAttribute(KEY, "1");
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
  return el;
}

function upsertLink(rel, href) {
  if (!href) return null;
  let el = document.head.querySelector(`link[rel="${rel}"][${KEY}]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    el.setAttribute(KEY, "1");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
  return el;
}

function upsertJsonLd(id, json) {
  if (!json) return null;
  let el = document.head.querySelector(
    `script[type="application/ld+json"][${KEY}][data-id="${id}"]`
  );
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.setAttribute(KEY, "1");
    el.setAttribute("data-id", id);
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(json);
  return el;
}

export function SEO({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogType = "article",
  article = {}, // { publishedTime, modifiedTime, section, author }
  twitterCard = "summary_large_image",
  jsonLd, // object
}) {
  useEffect(() => {
    const prevTitle = document.title;
    if (title) document.title = title;

    const created = [
      upsertMetaByName("description", description),
      upsertMetaByName("keywords", keywords),
      upsertLink("canonical", canonical),

      // Open Graph
      upsertMetaByProp("og:title", title),
      upsertMetaByProp("og:description", description),
      upsertMetaByProp("og:url", canonical),
      upsertMetaByProp("og:type", ogType),
      ogImage ? upsertMetaByProp("og:image", ogImage) : null,
      article.section ? upsertMetaByProp("article:section", article.section) : null,
      article.publishedTime ? upsertMetaByProp("article:published_time", article.publishedTime) : null,
      article.modifiedTime ? upsertMetaByProp("article:modified_time", article.modifiedTime) : null,
      article.author ? upsertMetaByProp("article:author", article.author) : null,

      // Twitter
      upsertMetaByName("twitter:card", twitterCard),
      upsertMetaByName("twitter:title", title),
      upsertMetaByName("twitter:description", description),
      ogImage ? upsertMetaByName("twitter:image", ogImage) : null,
    ];

    const json = jsonLd ? upsertJsonLd("main", jsonLd) : null;

    return () => {
      created.filter(Boolean).forEach((el) => el.remove());
      if (json) json.remove();
      if (title) document.title = prevTitle;
    };
  }, [
    title,
    description,
    keywords,
    canonical,
    ogImage,
    ogType,
    article.publishedTime,
    article.modifiedTime,
    article.section,
    article.author,
    twitterCard,
    jsonLd,
  ]);

  return null;
}
