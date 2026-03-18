import React from 'react';
import { ArrowDown } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';
import { useReducedMotion, useIsMobile } from '@/hooks/useAnimationPrefs';
import '@/components/custom/HeroSection.css';

export const HeroSection = () => {
  const { t } = useLang();
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  return (
    <section
      data-testid="hero-section"
      className="relative min-h-screen flex items-end pb-16 md:pb-24 lg:pb-12 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.04]">
        <div className="absolute top-1/4 right-1/6 w-[400px] h-[400px] rounded-full border border-foreground" />
        <div className="absolute top-1/3 right-1/4 w-[250px] h-[250px] rounded-full border border-foreground" />
      </div>

      {/* Large background number */}
      <div aria-hidden="true" className="hidden md:block absolute top-16 right-6 md:right-20 text-[15rem] md:text-[25rem] lg:text-[20rem] font-['Syne'] font-extrabold leading-none text-foreground opacity-[0.03] select-none pointer-events-none">
        W
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 lg:pt-[18vh]">
        {/* Overline */}
        <p className="hero-overline text-xs md:text-sm tracking-[0.3em] text-muted-foreground font-medium mb-6 md:mb-8">
          {t.hero.overline}
        </p>

        {/* Main Headline */}
        <div className="overflow-hidden">
          <h1 className="hero-headline font-['Syne'] font-extrabold text-[2.5rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] tracking-tighter leading-[0.9] max-w-[16ch]">
            {t.hero.headline}
          </h1>
        </div>

        {/* Sub + CTA row */}
        <div className="mt-10 md:mt-16 lg:mt-8 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <p className="hero-subtext text-base md:text-lg text-muted-foreground max-w-md leading-relaxed">
            {t.hero.sub}
          </p>

          <div className="hero-cta-wrapper flex items-center gap-6">
            <button
              data-testid="hero-cta-button"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="cta-button"
            >
              {t.hero.cta}
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll-indicator mt-16 md:mt-24 lg:mt-10 flex items-center gap-3 text-muted-foreground">
          <div className="hero-scroll-arrow">
            <ArrowDown size={16} strokeWidth={1.5} />
          </div>
          <span className="text-xs tracking-[0.2em] uppercase">{t.hero.scroll}</span>
        </div>
      </div>

      {/* Right side image / visual */}
      <div className="hero-image-wrapper hidden lg:block absolute top-24 right-12 xl:right-24 w-[320px] xl:w-[400px] h-[480px] xl:h-[560px]">
        <div className="relative w-full h-full">
          <img
            src="/images/hero/cairn-hero.webp"
            alt="Cairn stones"
            width="600"
            height="840"
            decoding="async"
            fetchPriority="high"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
          {/* Gradient fade on left edge for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--background))] via-[hsl(var(--background)/0.4)] to-transparent w-2/5" />
          {/* Gradient fade on bottom edge */}
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background))] to-transparent to-40%" />
          <div className="absolute -bottom-4 -left-4 w-full h-full border border-[hsl(var(--primary))] -z-10" />
        </div>
      </div>
    </section>
  );
};
