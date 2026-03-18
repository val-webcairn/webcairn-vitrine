import React, { Suspense, lazy, useEffect } from "react";
import { PricingSection } from "@/components/custom/PricingSection";
import { LazySection } from "@/components/LazySection";
import { useLang } from "@/contexts/LanguageContext";
import { usePageMeta } from "@/hooks/usePageMeta";

const AddonsSection = lazy(() =>
  import("@/components/custom/AddonsSection").then((m) => ({ default: m.AddonsSection }))
);
const MaintenanceSection = lazy(() =>
  import("@/components/custom/MaintenanceSection").then((m) => ({ default: m.MaintenanceSection }))
);
const QuoteBuilderSection = lazy(() =>
  import("@/components/custom/QuoteBuilderSection").then((m) => ({ default: m.QuoteBuilderSection }))
);

const SectionFallback = () => <div aria-hidden="true" className="h-72" />;

export const PricingPage = () => {
  const { lang } = useLang();

  const pricingStructuredData =
    lang === 'fr'
      ? {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': 'https://webcairn.fr/tarifs#webpage',
          url: 'https://webcairn.fr/tarifs',
          name: 'Tarifs | WebCairn — Création de Sites Vitrines',
          inLanguage: 'fr-FR',
          mainEntity: {
            '@type': 'OfferCatalog',
            name: 'Tarifs WebCairn',
            itemListElement: [
              {
                '@type': 'Offer',
                name: 'Formule Essentiel',
                price: '490',
                priceCurrency: 'EUR',
                availability: 'https://schema.org/InStock',
                url: 'https://webcairn.fr/tarifs',
              },
              {
                '@type': 'Offer',
                name: 'Formule Ascension',
                price: '990',
                priceCurrency: 'EUR',
                availability: 'https://schema.org/InStock',
                url: 'https://webcairn.fr/tarifs',
              },
            ],
          },
        }
      : {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': 'https://webcairn.fr/tarifs#webpage-en',
          url: 'https://webcairn.fr/tarifs',
          name: 'Pricing | WebCairn — Showcase Website Creation',
          inLanguage: 'en',
          mainEntity: {
            '@type': 'OfferCatalog',
            name: 'WebCairn pricing',
            itemListElement: [
              {
                '@type': 'Offer',
                name: 'Essential plan',
                price: '490',
                priceCurrency: 'EUR',
                availability: 'https://schema.org/InStock',
                url: 'https://webcairn.fr/tarifs',
              },
              {
                '@type': 'Offer',
                name: 'Ascension plan',
                price: '990',
                priceCurrency: 'EUR',
                availability: 'https://schema.org/InStock',
                url: 'https://webcairn.fr/tarifs',
              },
            ],
          },
        };

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
    structuredData: pricingStructuredData,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-24 pb-16 min-h-screen">
      <PricingSection showLink={false} headingLevel="h1" />
      <LazySection anchorId="addons">
        <Suspense fallback={<SectionFallback />}>
          <AddonsSection />
        </Suspense>
      </LazySection>
      <LazySection anchorId="maintenance">
        <Suspense fallback={<SectionFallback />}>
          <MaintenanceSection />
        </Suspense>
      </LazySection>
      <LazySection anchorId="quote-builder">
        <Suspense fallback={<SectionFallback />}>
          <QuoteBuilderSection />
        </Suspense>
      </LazySection>
    </main>
  );
};
