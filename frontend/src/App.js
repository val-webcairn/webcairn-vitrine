import React from "react";
import "@/App.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Navigation } from "@/components/custom/Navigation";
import { HeroSection } from "@/components/custom/HeroSection";
import { ServicesSection } from "@/components/custom/ServicesSection";
import { PortfolioSection } from "@/components/custom/PortfolioSection";
import { AboutSection } from "@/components/custom/AboutSection";
import { ContactSection } from "@/components/custom/ContactSection";
import { Footer } from "@/components/custom/Footer";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="grain-overlay min-h-screen bg-background text-foreground">
          <Navigation />
          <main>
            <HeroSection />
            <ServicesSection />
            <PortfolioSection />
            <AboutSection />
            <ContactSection />
          </main>
          <Footer />
          <Toaster position="bottom-right" />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
