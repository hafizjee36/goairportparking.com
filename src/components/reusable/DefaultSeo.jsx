import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * DefaultSeo component
 * 
 * Sets default SEO values for pages that don't have explicit SEO.
 * This component should be placed in App.jsx to ensure every route has basic SEO.
 */
export default function DefaultSeo() {
  const location = useLocation();
  
  useEffect(() => {
    // Small delay to let page-specific SEO run first if it exists
    const timer = setTimeout(() => {
      // Only set default title if the current title is the default HTML title or empty
      if (!document.title || document.title === 'Go Airport Parking LTD') {
        document.title = 'Go Airport Parking - Compare & Book Airport Parking Deals';
      }
      
      // Set default meta description if not already set
      const descMeta = document.head.querySelector('meta[name="description"]');
      if (!descMeta || !descMeta.content || descMeta.content === '') {
        const meta = descMeta || document.createElement('meta');
        meta.setAttribute('name', 'description');
        meta.setAttribute('content', 'Compare and book cheap airport parking at all major UK airports. Save up to 60% on meet & greet, park & ride, and long stay parking.');
        if (!descMeta) document.head.appendChild(meta);
      }
      
      // Set default keywords if not already set
      const keywordsMeta = document.head.querySelector('meta[name="keywords"]');
      if (!keywordsMeta || !keywordsMeta.content || keywordsMeta.content === '') {
        const meta = keywordsMeta || document.createElement('meta');
        meta.setAttribute('name', 'keywords');
        meta.setAttribute('content', 'airport parking, cheap parking, UK airports, meet and greet, park and ride');
        if (!keywordsMeta) document.head.appendChild(meta);
      }
    }, 50); // 50ms delay to let page-specific SEO run first
    
    return () => clearTimeout(timer);
  }, [location.pathname]); // Run on every route change
  
  return null;
}
