import React from "react";
import { HeroSection } from "@/components/custom/HeroSection";
import { ServicesSection } from "@/components/custom/ServicesSection";
import { PortfolioSection } from "@/components/custom/PortfolioSection";
import { PricingSection } from "@/components/custom/PricingSection";
import { AidesSection } from "@/components/custom/AidesSection";
import { ContactSection } from "@/components/custom/ContactSection";

export const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <PricingSection showLink={true} />
      <AidesSection />
      <ContactSection />
    </main>
  );
};
