import React, { useEffect } from "react";
import "@/App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Navigation } from "@/components/custom/Navigation";
import { Footer } from "@/components/custom/Footer";
import { Toaster } from "@/components/ui/sonner";
import { HomePage } from "@/pages/HomePage";
import { PricingPage } from "@/pages/PricingPage";

const ScrollToAnchor = () => {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [hash]);
  return null;
};

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="grain-overlay min-h-screen bg-background text-foreground flex flex-col">
          <Navigation />
          <ScrollToAnchor />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tarifs" element={<PricingPage />} />
            </Routes>
          </div>
          <Footer />
          <Toaster position="bottom-right" />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
