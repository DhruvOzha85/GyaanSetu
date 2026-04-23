import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Tracks page views. Wires into Google Analytics 4 if VITE_GA_ID is set —
 * otherwise it's a no-op that you can extend with any analytics provider.
 */
export function usePageTracking() {
  const location = useLocation();
  useEffect(() => {
    const gaId = import.meta.env.VITE_GA_ID;
    if (!gaId) return;

    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("config", gaId, { page_path: location.pathname + location.search });
    }
  }, [location.pathname, location.search]);
}
