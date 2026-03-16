import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Image, MessageSquareQuote, UtensilsCrossed, CalendarClock, BadgePercent, Video, Languages, PenLine, Contrast } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08
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

const addonIcons = [
  FileText,
  Image,
  MessageSquareQuote,
  UtensilsCrossed,
  CalendarClock,
  BadgePercent,
  Video,
  Languages,
  PenLine,
  Contrast
];

export const AddonsSection = () => {
  const { t } = useLang();

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
      <div className="mb-16 md:mb-24">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.3em] text-[hsl(var(--primary))] font-semibold mb-4"
        >
          {t.pricing.addonsTitle}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-['Syne'] font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tighter"
        >
          {t.pricing.addonsHeading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base md:text-lg text-muted-foreground mt-4 max-w-md"
        >
          {t.pricing.addonsSub}
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-border max-w-5xl mx-auto"
      >
        {t.pricing.addons.map((item, idx) => {
          const Icon = addonIcons[idx] || FileText;

          return (
            <motion.article
              key={idx}
              variants={itemVariants}
              data-testid={`addon-card-${idx}`}
              className="group relative bg-background p-8 md:p-10 flex flex-col justify-between transition-colors duration-500 hover:bg-[hsl(var(--primary))]"
            >
              <div>
                <h3 className="text-[10px] tracking-[0.3em] font-bold text-muted-foreground group-hover:text-[hsl(var(--primary-foreground))]/60 transition-colors duration-500 block mb-6 flex items-center gap-2">
                  <Icon size={12} strokeWidth={2} className="inline-block" />
                  {item.name.toUpperCase()}
                </h3>

                <p className="text-sm text-muted-foreground group-hover:text-[hsl(var(--primary-foreground))]/70 transition-colors duration-500">
                  {item.desc}
                </p>
              </div>

              <div className="mt-8 flex items-end justify-between gap-3">
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground group-hover:text-[hsl(var(--primary-foreground))]/60 transition-colors duration-500">
                  {t.pricing.fromLabel}
                </span>
                <span className="font-['Syne'] font-extrabold text-3xl md:text-4xl tracking-tighter text-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors duration-500">
                  {item.price}
                </span>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
};
