import React, { useEffect } from "react";
import { PricingSection } from "@/components/custom/PricingSection";
import { AddonsSection } from "@/components/custom/AddonsSection";
import { MaintenanceSection } from "@/components/custom/MaintenanceSection";
import { QuoteBuilderSection } from "@/components/custom/QuoteBuilderSection";
import { useLang } from "@/contexts/LanguageContext";
import { usePageMeta } from "@/hooks/usePageMeta";

export const PricingPage = () => {
  const { lang } = useLang();

  usePageMeta({
    title:
      lang === 'fr'
        ? 'Tarifs | WebCairn — Création de Sites Vitrines'
        : 'Pricing | WebCairn — Showcase Website Creation',
    description:
      lang === 'fr'
        ? 'Formules Essentiel à 490 € et Ascension à 990 €. Création de sites vitrines pour artisans et TPE. Devis personnalisé gratuit.'
        : 'Essential plan from €490 and Ascension from €990. Showcase websites for artisans and small businesses. Free personalized quote.',
    canonical: 'https://webcairn.fr/tarifs',
    lang,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-24 pb-16 min-h-screen">
      <PricingSection showLink={false} />
      <AddonsSection />
      <MaintenanceSection />
      <QuoteBuilderSection />
    </main>
  );
};
