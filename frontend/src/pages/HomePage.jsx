import React from "react";
import { HeroSection } from "@/components/custom/HeroSection";
import { ServicesSection } from "@/components/custom/ServicesSection";
import { PortfolioSection } from "@/components/custom/PortfolioSection";
import { PricingSection } from "@/components/custom/PricingSection";
import { AidesSection } from "@/components/custom/AidesSection";
import { ContactSection } from "@/components/custom/ContactSection";
import { LazySection } from "@/components/LazySection";

export const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <LazySection>
        <ServicesSection />
      </LazySection>
      <LazySection>
        <PortfolioSection />
      </LazySection>
      <LazySection>
        <PricingSection showLink={true} />
      </LazySection>
      <LazySection>
        <AidesSection />
      </LazySection>
      <LazySection>
        <ContactSection />
      </LazySection>
    </main>
  );
};
