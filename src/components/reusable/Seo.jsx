import { useEffect } from "react";

function setMetaTag(name, content) {
  if (!name) return;
  const selector = `meta[name="${name}"]`;
  let tag = document.head.querySelector(selector);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }

  let value = "";
  if (Array.isArray(content)) {
    value = content.filter(Boolean).join(", ");
  } else if (typeof content === "string") {
    value = content;
  } else if (content != null) {
    value = String(content);
  }

  tag.setAttribute("content", value);
}

function removeMetaTag(name) {
  if (!name) return;
  const tag = document.head.querySelector(`meta[name="${name}"]`);
  if (tag) tag.remove();
}

function setLinkTag(rel, href) {
  if (!rel || !href) return;
  const selector = `link[rel="${rel}"]`;
  let tag = document.head.querySelector(selector);

  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", rel);
    document.head.appendChild(tag);
  }

  tag.setAttribute("href", href);
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
 * - robots?: string   // e.g. "index,follow" or "noindex,follow"
 */
export default function Seo({
  title,
  description,
  keywords,
  canonical,
  robots,
}) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    if (description !== undefined) {
      setMetaTag("description", description);
    }

    if (keywords !== undefined) {
      setMetaTag("keywords", keywords);
    }

    if (robots !== undefined) {
      setMetaTag("robots", robots);
    } else {
      removeMetaTag("robots");
    }

    if (canonical) {
      setLinkTag("canonical", canonical);
    } else {
      removeLinkTag("canonical");
    }

    return () => {};
  }, [title, description, keywords, canonical, robots]);

  return null;
}