import React, { useEffect } from "react";
import { PricingSection } from "@/components/custom/PricingSection";
import { AddonsSection } from "@/components/custom/AddonsSection";
import { MaintenanceSection } from "@/components/custom/MaintenanceSection";

export const PricingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-24 pb-16 min-h-screen">
      <PricingSection showLink={false} />
      <AddonsSection />
      <MaintenanceSection />
    </main>
  );
};
