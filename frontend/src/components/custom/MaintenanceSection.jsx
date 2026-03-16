import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 16 }
  }
};

export const MaintenanceSection = () => {
  const { t } = useLang();
  const maintenance = t.pricing.maintenance;

  if (!maintenance) return null;

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
      {/* Header */}
      <div className="mb-16 md:mb-24">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.3em] text-[hsl(var(--primary))] font-semibold mb-4"
        >
          {maintenance.overline}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-['Syne'] font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tighter"
        >
          {maintenance.heading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base md:text-lg text-muted-foreground mt-4 max-w-md"
        >
          {maintenance.terms}
        </motion.p>
      </div>

      {/* Plans */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-[1px] bg-border max-w-5xl mx-auto"
      >
        {maintenance.plans.map((plan, idx) => (
          <motion.article
            key={idx}
            variants={itemVariants}
            className="group relative bg-background flex flex-col transition-colors duration-500 hover:bg-[hsl(var(--primary))]"
          >
            {/* Plan header */}
            <div className="p-8 md:p-12">
              <h3 className="text-[10px] tracking-[0.3em] font-bold text-muted-foreground group-hover:text-[hsl(var(--primary-foreground))]/60 transition-colors duration-500 block mb-6">
                {plan.name.toUpperCase()}
              </h3>
              <div className="mb-2">
                <p className="font-['Syne'] font-extrabold text-3xl md:text-4xl tracking-tighter group-hover:text-[hsl(var(--primary-foreground))] transition-colors duration-500">
                  {plan.monthlyPrice}
                </p>
              </div>
              <p className="text-sm text-muted-foreground group-hover:text-[hsl(var(--primary-foreground))]/70 transition-colors duration-500 mb-2">
                {plan.commitment} — {plan.yearlyPrice}
              </p>
            </div>

            {/* Features */}
            <div className="px-8 md:px-12 pb-8 md:pb-12 space-y-3">
              {plan.features.map((feature, featureIdx) => (
                <div key={featureIdx} className="flex items-start gap-3">
                  <Check
                    size={14}
                    strokeWidth={2}
                    className="flex-shrink-0 mt-[3px] text-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors duration-500"
                  />
                  <div>
                    <span className="text-sm font-semibold text-foreground group-hover:text-[hsl(var(--primary-foreground))] transition-colors duration-500">
                      {feature.title}
                    </span>
                    {feature.desc && (
                      <span className="text-sm text-muted-foreground group-hover:text-[hsl(var(--primary-foreground))]/70 transition-colors duration-500">
                        {' — '}{feature.desc}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};
