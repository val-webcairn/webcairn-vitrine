import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';
import { useReducedMotion, useIsMobile } from '@/hooks/useAnimationPrefs';

export const HeroSection = () => {
  const { t } = useLang();
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  
  // Skip heavy animations on mobile or when reduced motion is preferred
  const shouldSkipAnimations = isMobile || prefersReducedMotion;

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
      <div aria-hidden="true" className="absolute top-16 right-6 md:right-20 text-[15rem] md:text-[25rem] lg:text-[20rem] font-['Syne'] font-extrabold leading-none text-foreground opacity-[0.03] select-none pointer-events-none">
        W
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 lg:pt-[18vh]">
        {/* Overline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xs md:text-sm tracking-[0.3em] text-muted-foreground font-medium mb-6 md:mb-8"
        >
          {t.hero.overline}
        </motion.p>

        {/* Main Headline */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 60, damping: 20, delay: 0.3 }}
            className="font-['Syne'] font-extrabold text-[2.5rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] tracking-tighter leading-[0.9] max-w-[16ch]"
          >
            {t.hero.headline}
          </motion.h1>
        </div>

        {/* Sub + CTA row */}
        <div className="mt-10 md:mt-16 lg:mt-8 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-base md:text-lg text-muted-foreground max-w-md leading-relaxed"
          >
            {t.hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex items-center gap-6"
          >
            <button
              data-testid="hero-cta-button"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group px-8 py-4 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-bold text-sm tracking-wider uppercase hover:translate-y-[-2px] transition-all duration-300 relative overflow-hidden"
            >
              <span className="relative z-10">{t.hero.cta}</span>
              <span className="absolute inset-0 bg-foreground translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="absolute inset-0 z-10 flex items-center justify-center font-bold text-sm tracking-wider uppercase text-background opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                {t.hero.cta}
              </span>
            </button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 md:mt-24 lg:mt-10 flex items-center gap-3 text-muted-foreground"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ArrowDown size={16} strokeWidth={1.5} />
          </motion.div>
          <span className="text-xs tracking-[0.2em] uppercase">{t.hero.scroll}</span>
        </motion.div>
      </div>

      {/* Right side image / visual */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="hidden lg:block absolute top-24 right-12 xl:right-24 w-[320px] xl:w-[400px] h-[480px] xl:h-[560px]"
      >
        <div className="relative w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1759192154601-d8849f778b57?crop=entropy&cs=srgb&fm=webp&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwxfHxiYWxhbmNlZCUyMHN0b25lcyUyMGNhaXJuJTIwYWJzdHJhY3QlMjBtaW5pbWFsaXN0fGVufDB8fHx8MTc3MjcwNjY2N3ww&ixlib=rb-4.1.0&q=80&w=600"
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
      </motion.div>
    </section>
  );
};
