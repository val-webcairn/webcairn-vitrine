import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

const projectImages = [
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
  'https://images.unsplash.com/photo-1767725185080-5e8bffbfaee9?w=800&q=80',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80',
  'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80',
];

export const PortfolioSection = () => {
  const { t } = useLang();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);

  return (
    <section id="portfolio" data-testid="portfolio-section" className="py-24 md:py-32 overflow-hidden">
      {/* Header */}
      <div className="px-6 md:px-12 lg:px-20 mb-16 md:mb-24">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.3em] text-[hsl(var(--primary))] font-semibold mb-4"
        >
          {t.portfolio.overline}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-['Syne'] font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tighter"
        >
          {t.portfolio.title}
        </motion.h2>
      </div>

      {/* Horizontal scroll projects */}
      <div ref={containerRef}>
        <motion.div style={{ x }} className="flex gap-6 px-6 md:px-12 lg:px-20">
          {t.portfolio.projects.map((project, i) => (
            <motion.div
              key={i}
              data-testid={`portfolio-project-${i}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex-shrink-0 w-[320px] md:w-[400px] cursor-pointer"
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[4/5] mb-5">
                <img
                  src={projectImages[i]}
                  alt={project.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-all duration-500" />
                <div className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center border border-background/30 text-background opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm">
                  <ArrowUpRight size={16} strokeWidth={1.5} />
                </div>
              </div>

              {/* Info */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-['Syne'] font-bold text-lg tracking-tight group-hover:text-[hsl(var(--primary))] transition-colors duration-300">
                    {project.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{project.type}</p>
                </div>
                <span className="text-xs text-muted-foreground tracking-wider mt-1">{project.year}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="mt-24 overflow-hidden border-t border-b border-border py-5">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, j) => (
            <div key={j} className="flex items-center gap-8 mr-8">
              {t.portfolio.projects.map((p, i) => (
                <React.Fragment key={i}>
                  <span className="font-['Syne'] font-bold text-2xl md:text-4xl tracking-tighter text-muted-foreground/30">
                    {p.name}
                  </span>
                  <span className="text-[hsl(var(--primary))] text-xl">&#9670;</span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
