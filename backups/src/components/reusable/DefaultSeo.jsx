import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function DefaultSeo() {
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      // =============================
      // DEFAULT META
      // =============================

      if (!document.title || document.title === "Go Airport Parking LTD") {
        document.title =
          "Go Airport Parking - Compare & Book Airport Parking Deals";
      }

      const descMeta = document.head.querySelector(
        'meta[name="description"]'
      );
      if (!descMeta || !descMeta.content) {
        const meta = descMeta || document.createElement("meta");
        meta.setAttribute("name", "description");
        meta.setAttribute(
          "content",
          "Compare and book cheap airport parking at all major UK airports. Save up to 60% on meet & greet, park & ride, and long stay parking."
        );
        if (!descMeta) document.head.appendChild(meta);
      }

      const keywordsMeta = document.head.querySelector(
        'meta[name="keywords"]'
      );
      if (!keywordsMeta || !keywordsMeta.content) {
        const meta = keywordsMeta || document.createElement("meta");
        meta.setAttribute("name", "keywords");
        meta.setAttribute(
          "content",
          "airport parking, cheap parking, UK airports, meet and greet, park and ride"
        );
        if (!keywordsMeta) document.head.appendChild(meta);
      }

      // =============================
      // STRUCTURED DATA (SCHEMA)
      // =============================

      // Remove existing schema to avoid duplicates
      const existingSchema = document.getElementById("default-schema");
      if (existingSchema) existingSchema.remove();

      const schema = {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": "https://www.goairportparking.com/#organization",
            name: "Go Airport Parking",
            url: "https://www.goairportparking.com/",
            logo: "https://www.goairportparking.com/goairport logo.jpg",
            sameAs: [],
          },
          {
            "@type": "WebSite",
            "@id": "https://www.goairportparking.com/#website",
            url: "https://www.goairportparking.com/",
            name: "Go Airport Parking",
            publisher: {
              "@id": "https://www.goairportparking.com/#organization",
            },
          },
        ],
      };

      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "default-schema";
      script.innerHTML = JSON.stringify(schema);

      document.head.appendChild(script);
    }, 50);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return null;
}