"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface UnifiedPageLayoutProps {
  children: React.ReactNode;
}

/**
 * UnifiedPageLayout — The wrapper component for all public sub-pages.
 * Mirrors the home page's structural shell:
 *   - Header at the top
 *   - Padded white bg container for page content
 *   - Footer at the bottom
 * Uses normal scrolling (no snap) since sub-pages have variable content length.
 */
export default function UnifiedPageLayout({ children }: UnifiedPageLayoutProps) {
  return (
    <div
      className="h-screen w-full overflow-y-auto overflow-x-hidden font-sans bg-white scroll-smooth"
      id="page-scroll"
    >
      {/* Header */}
      <Header />

      {/* Page Content */}
      <div className="w-full flex flex-col min-h-screen">
        {children}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
