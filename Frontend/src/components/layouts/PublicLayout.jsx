import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { usePageTracking } from "@/hooks/usePageTracking";

export function PublicLayout() {
  usePageTracking();
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-on-primary focus:px-4 focus:py-2 focus:rounded-xl focus:font-bold"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
