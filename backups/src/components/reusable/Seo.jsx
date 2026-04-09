import { useEffect } from "react";

function normaliseContent(content) {
  if (Array.isArray(content)) {
    return content.filter(Boolean).join(", ").trim();
  }

  if (typeof content === "string") {
    return content.trim();
  }

  if (content != null) {
    return String(content).trim();
  }

  return "";
}

function setMetaTag(name, content) {
  if (!name) return;

  const value = normaliseContent(content);
  const selector = `meta[name="${name}"]`;
  let tag = document.head.querySelector(selector);

  if (!value) {
    if (tag) tag.remove();
    return;
  }

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", value);
}

function removeMetaTag(name) {
  if (!name) return;
  const tag = document.head.querySelector(`meta[name="${name}"]`);
  if (tag) tag.remove();
}

function setPropertyMetaTag(property, content) {
  if (!property) return;

  const value = normaliseContent(content);
  const selector = `meta[property="${property}"]`;
  let tag = document.head.querySelector(selector);

  if (!value) {
    if (tag) tag.remove();
    return;
  }

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", value);
}

function removePropertyMetaTag(property) {
  if (!property) return;
  const tag = document.head.querySelector(`meta[property="${property}"]`);
  if (tag) tag.remove();
}

function toAbsoluteUrl(url) {
  if (!url || typeof window === "undefined") return "";

  try {
    return new URL(url, window.location.origin).toString();
  } catch {
    return "";
  }
}

function setLinkTag(rel, href) {
  if (!rel) return;

  const value = normaliseContent(href);
  const selector = `link[rel="${rel}"]`;
  let tag = document.head.querySelector(selector);

  if (!value) {
    if (tag) tag.remove();
    return;
  }

  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", rel);
    document.head.appendChild(tag);
  }

  tag.setAttribute("href", value);
}

function removeLinkTag(rel) {
  if (!rel) return;
  const tag = document.head.querySelector(`link[rel="${rel}"]`);
  if (tag) tag.remove();
}

/**
 * Seo component
 *
 * Props:
 * - title: string
 * - description: string
 * - keywords: string | string[]
 * - canonical?: string
 * - robots?: string
 */
export default function Seo({
  title,
  description,
  keywords,
  canonical,
  robots,
}) {
  useEffect(() => {
    const absoluteCanonical = canonical ? toAbsoluteUrl(canonical) : "";

    if (title) {
      document.title = title.trim();
    }

    setMetaTag("description", description);
    setMetaTag("keywords", keywords);

    if (robots !== undefined) {
      setMetaTag("robots", robots);
    } else {
      removeMetaTag("robots");
    }

    if (absoluteCanonical) {
      setLinkTag("canonical", absoluteCanonical);
    } else {
      removeLinkTag("canonical");
    }

    setPropertyMetaTag("og:title", title);
    setPropertyMetaTag("og:description", description);
    setPropertyMetaTag("og:url", absoluteCanonical);

    return () => {};
  }, [title, description, keywords, canonical, robots]);

  return null;
}