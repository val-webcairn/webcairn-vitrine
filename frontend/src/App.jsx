import React, { Suspense, lazy, useEffect, useState } from "react";
import "@/App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Navigation } from "@/components/custom/Navigation";
import { Footer } from "@/components/custom/Footer";
import { HomePage } from "@/pages/HomePage";
import { useIsMobile } from "@/hooks/useAnimationPrefs";

const PricingPage = lazy(() =>
  import("@/pages/PricingPage").then((m) => ({ default: m.PricingPage }))
);
const Toaster = lazy(() =>
  import("@/components/ui/sonner").then((m) => ({ default: m.Toaster }))
);

const ScrollToAnchor = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const anchorId = hash.startsWith("#") ? hash.slice(1) : hash;
    let attempts = 0;
    let timeoutId;

    const scrollToTarget = () => {
      const target =
        document.querySelector(hash) ||
        document.querySelector(`[data-anchor="${anchorId}"]`);

      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      attempts += 1;
      if (attempts < 20) {
        timeoutId = setTimeout(scrollToTarget, 60);
      }
    };

    timeoutId = setTimeout(scrollToTarget, 80);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [hash]);

  return null;
};

const MobileAnimationController = () => {
  const isMobile = useIsMobile();
  useEffect(() => {
    if (isMobile) {
      document.documentElement.setAttribute("data-mobile-reduced", "true");
    } else {
      document.documentElement.removeAttribute("data-mobile-reduced");
    }
  }, [isMobile]);
  return null;
};

function App() {
  const [showToaster, setShowToaster] = useState(false);

  useEffect(() => {
    let timeoutId;
    let idleId;

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(() => setShowToaster(true), { timeout: 2000 });
    } else {
      timeoutId = setTimeout(() => setShowToaster(true), 1200);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (idleId && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
    };
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <MobileAnimationController />
        <div className="grain-overlay min-h-screen bg-background text-foreground flex flex-col">
          <Navigation />
          <ScrollToAnchor />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/tarifs"
                element={
                  <Suspense fallback={<div aria-hidden="true" className="min-h-[40vh]" />}>
                    <PricingPage />
                  </Suspense>
                }
              />
            </Routes>
          </div>
          <Footer />
          {showToaster && (
            <Suspense fallback={null}>
              <Toaster position="bottom-right" />
            </Suspense>
          )}
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
