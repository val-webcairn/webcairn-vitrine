import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/contexts/LanguageContext';

export const AboutSection = () => {
  const { t } = useLang();

  const stats = [t.about.stat1, t.about.stat2, t.about.stat3];

  return (
    <section id="about" data-testid="about-section" className="py-24 md:py-32 lg:py-16 px-6 md:px-12 lg:px-20">
      {/* Header */}
      <div className="mb-16 md:mb-24 lg:mb-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.3em] text-[hsl(var(--primary))] font-semibold mb-4"
        >
          {t.about.overline}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-['Syne'] font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tighter"
        >
          {t.about.title}
        </motion.h2>
      </div>

      {/* Split content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-16">
        {/* Left - Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 60, damping: 20 }}
          className="relative"
        >
          <div className="aspect-[3/4] lg:aspect-[5/4] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1772391756679-430042790939?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDZ8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjcmVhdGl2ZSUyMG9mZmljZSUyMHRlYW0lMjB3b3JraW5nJTIwYWJzdHJhY3R8ZW58MHx8fHwxNzcyNzA2NjY4fDA&ixlib=rb-4.1.0&q=85&w=800"
              alt="Team"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Decorative border offset */}
          <div className="absolute -bottom-4 -right-4 w-full h-full border border-[hsl(var(--primary))]/30 -z-10" />
        </motion.div>

        {/* Right - Text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 60, damping: 20, delay: 0.2 }}
          className="flex flex-col justify-center"
        >
          <p className="text-lg md:text-xl lg:text-lg leading-relaxed text-foreground mb-8 lg:mb-5">
            {t.about.p1}
          </p>
          <p className="text-base lg:text-sm text-muted-foreground leading-relaxed mb-12 lg:mb-8">
            {t.about.p2}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-0 border-t border-border">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                data-testid={`about-stat-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className={`pt-6 ${i < 2 ? 'border-r border-border' : ''} ${i === 1 ? 'pl-3 pr-3 md:pl-6 md:pr-6' : i === 2 ? 'pl-3 md:pl-6' : 'pr-3 md:pr-6'}`}
              >
                <span className="font-['Syne'] font-extrabold text-2xl md:text-4xl lg:text-3xl tracking-tighter text-[hsl(var(--primary))]">
                  {stat.num}
                </span>
                <p className="text-xs md:text-sm text-muted-foreground tracking-wider uppercase mt-2">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
