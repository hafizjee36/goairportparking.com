import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GoogleAnalytics = ({ trackingId }) => {
  const location = useLocation();
  const isBrowser = typeof window !== "undefined";
  const isGTM = !!trackingId && trackingId.startsWith("GTM-");
  const isGA =
    !!trackingId &&
    (trackingId.startsWith("G-") || trackingId.startsWith("UA-"));

  useEffect(() => {
    if (!isBrowser || !trackingId) return;

    // console.log('📊 GoogleAnalytics: Route changed to', location.pathname);

    if (isGTM && window.dataLayer) {
      // Push both a standard pageview event AND update the dataLayer
      // This ensures GTM tags fire properly
      window.dataLayer.push({
        event: "virtualPageview", // Custom event name that GTM can listen to
        page: {
          path: location.pathname + location.search,
          title: document.title,
          url: window.location.href,
        },
        // Also include flat structure for easier access
        pagePath: location.pathname + location.search,
        pageTitle: document.title,
        pageUrl: window.location.href,
      });

      // console.log("✅ GTM virtualPageview pushed:", {
      //   pagePath: location.pathname + location.search,
      //   pageTitle: document.title,
      // });
    } else if (isGA && window.gtag) {
      window.gtag("config", trackingId, {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname + location.search,
      });
      // console.log("✅ GA4 pageview sent:", location.pathname);
    } else if (isGTM && !window.dataLayer) {
      console.warn(
        "⚠️ GTM dataLayer not found. Make sure GTM is loaded in index.html"
      );
    }
  }, [isBrowser, isGTM, isGA, location, trackingId]);

  return null;
};

export default GoogleAnalytics;
