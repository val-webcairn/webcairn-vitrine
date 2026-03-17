import React, { Suspense, lazy } from "react";
import { HeroSection } from "@/components/custom/HeroSection";
import { LazySection } from "@/components/LazySection";
import { useLang } from "@/contexts/LanguageContext";
import { usePageMeta } from "@/hooks/usePageMeta";

const ServicesSection = lazy(() =>
  import("@/components/custom/ServicesSection").then((m) => ({ default: m.ServicesSection }))
);
const PortfolioSection = lazy(() =>
  import("@/components/custom/PortfolioSection").then((m) => ({ default: m.PortfolioSection }))
);
const PricingSection = lazy(() =>
  import("@/components/custom/PricingSection").then((m) => ({ default: m.PricingSection }))
);
const AidesSection = lazy(() =>
  import("@/components/custom/AidesSection").then((m) => ({ default: m.AidesSection }))
);
const ContactSection = lazy(() =>
  import("@/components/custom/ContactSection").then((m) => ({ default: m.ContactSection }))
);

const SectionFallback = () => <div aria-hidden="true" className="h-96" />;

export const HomePage = () => {
  const { lang } = useLang();

  usePageMeta({
    title:
      lang === 'fr'
        ? 'WebCairn | Création de Sites Vitrines'
        : 'WebCairn | Showcase Website Creation',
    description:
      lang === 'fr'
        ? 'Des sites vitrines posés pierre après pierre — solides, visibles, faits pour durer.'
        : 'Showcase websites laid stone by stone — solid, visible, built to last.',
    canonical: 'https://webcairn.fr/',
    lang,
  });

  return (
    <main>
      <HeroSection />
      <LazySection anchorId="services">
        <Suspense fallback={<SectionFallback />}>
          <ServicesSection />
        </Suspense>
      </LazySection>
      <LazySection anchorId="portfolio">
        <Suspense fallback={<SectionFallback />}>
          <PortfolioSection />
        </Suspense>
      </LazySection>
      <LazySection anchorId="pricing">
        <Suspense fallback={<SectionFallback />}>
          <PricingSection showLink={true} />
        </Suspense>
      </LazySection>
      <LazySection anchorId="aides">
        <Suspense fallback={<SectionFallback />}>
          <AidesSection />
        </Suspense>
      </LazySection>
      <LazySection anchorId="contact">
        <Suspense fallback={<SectionFallback />}>
          <ContactSection />
        </Suspense>
      </LazySection>
    </main>
  );
};
