import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Check } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

export const ServicesSection = () => {
  const { t } = useLang();
  const service = t.services.items[0];

  return (
    <section id="services" data-testid="services-section" className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
      {/* Header */}
      <div className="mb-16 md:mb-24">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.3em] text-[hsl(var(--primary))] font-semibold mb-4"
        >
          {t.services.overline}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-['Syne'] font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tighter"
        >
          {t.services.title}
        </motion.h2>
      </div>

      {/* Single service — full width card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ type: 'spring', stiffness: 80, damping: 20 }}
        data-testid="service-card-0"
        className="group bg-background border border-border p-10 md:p-16 transition-colors duration-500 hover:bg-[hsl(var(--primary))]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left — Title & description */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="text-[10px] tracking-[0.3em] font-bold text-muted-foreground group-hover:text-[hsl(var(--primary-foreground))]/60 transition-colors duration-500">
                  {service.tag}
                </span>
                <Globe
                  size={32}
                  strokeWidth={1}
                  className="text-foreground group-hover:text-[hsl(var(--primary-foreground))] transition-colors duration-500"
                />
              </div>
              <h3 className="font-['Syne'] font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight mb-6 group-hover:text-[hsl(var(--primary-foreground))] transition-colors duration-500">
                {service.title}
              </h3>
            </div>
            <p className="text-base md:text-lg text-muted-foreground group-hover:text-[hsl(var(--primary-foreground))]/80 transition-colors duration-500 leading-relaxed max-w-lg">
              {service.desc}
            </p>
          </div>

          {/* Right — Features list */}
          <div className="flex flex-col justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center border border-[hsl(var(--primary))] group-hover:border-[hsl(var(--primary-foreground))] transition-colors duration-500">
                    <Check
                      size={14}
                      strokeWidth={2}
                      className="text-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors duration-500"
                    />
                  </div>
                  <span className="text-sm md:text-base font-medium text-foreground group-hover:text-[hsl(var(--primary-foreground))] transition-colors duration-500">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-8 flex justify-end"
            >
              <button
                onClick={() => {
                  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-sm md:text-base font-medium tracking-wide text-foreground group-hover:text-[hsl(var(--primary-foreground))] transition-colors duration-500 hover:opacity-70 group-hover:hover:opacity-70"
              >
                {t.services.link}
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
