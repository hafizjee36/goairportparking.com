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

/**
 * Seo component
 *
 * Props:
 * - title: string
 * - description: string
 * - keywords: string | string[]
 * - canonical?: string
 */
export default function Seo({ title, description, keywords, canonical }) {
  useEffect(() => {
    // Store the previous title to restore if needed
    const previousTitle = document.title;
    
    // Always update title if provided
    if (title) {
      document.title = title;
    }
    
    if (description !== undefined) setMetaTag("description", description);
    if (keywords !== undefined) setMetaTag("keywords", keywords);
    if (canonical) setLinkTag("canonical", canonical);
    
    // Cleanup function - this ensures that when the component unmounts,
    // the next page's SEO component will properly set its values
    return () => {
      // Don't restore old title on unmount - let the next page set it
      // This prevents the "sticky title" issue
    };
  }, [title, description, keywords, canonical]);

  return null;
}
