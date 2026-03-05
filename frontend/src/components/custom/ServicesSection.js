import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Palette, Sparkles, Search } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

const icons = [Globe, Palette, Sparkles, Search];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 20 } }
};

export const ServicesSection = () => {
  const { t } = useLang();

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

      {/* Bento Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-border"
      >
        {t.services.items.map((item, i) => {
          const Icon = icons[i];
          const isLarge = i === 0;
          const isBottom = i === 3;
          return (
            <motion.div
              key={i}
              variants={itemVariants}
              data-testid={`service-card-${i}`}
              className={`group bg-background p-8 md:p-10 flex flex-col justify-between min-h-[320px] cursor-default transition-colors duration-500 hover:bg-[hsl(var(--primary))] ${
                isLarge ? 'lg:col-span-2 lg:row-span-2 lg:min-h-[640px]' : ''
              } ${isBottom ? 'lg:col-span-2' : ''}`}
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] tracking-[0.3em] font-bold text-muted-foreground group-hover:text-[hsl(var(--primary-foreground))]/60 transition-colors duration-500">
                    {item.tag}
                  </span>
                  <Icon
                    size={isLarge ? 32 : 24}
                    strokeWidth={1}
                    className="text-foreground group-hover:text-[hsl(var(--primary-foreground))] transition-colors duration-500"
                  />
                </div>
                <h3 className={`font-['Syne'] font-bold tracking-tight mb-4 group-hover:text-[hsl(var(--primary-foreground))] transition-colors duration-500 ${
                  isLarge ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'
                }`}>
                  {item.title}
                </h3>
              </div>
              <p className={`text-muted-foreground group-hover:text-[hsl(var(--primary-foreground))]/80 transition-colors duration-500 leading-relaxed ${
                isLarge ? 'text-base md:text-lg max-w-md' : 'text-sm'
              }`}>
                {item.desc}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};
