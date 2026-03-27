import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MoveRight } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

const projectImages = [
  '/images/portfolio/project-2.webp',
  '/images/portfolio/project-3.webp',
  '/images/portfolio/project-4.webp',
];

const PortfolioCard = ({ project, imageSrc, index }) => {
  const cardClass = `group flex-shrink-0 w-[85vw] sm:w-[350px] md:w-[450px] ${project.link ? 'cursor-pointer' : ''}`;
  const motionProps = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { delay: (index % 4) * 0.1 },
  };

  const cardContent = (
    <>
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/5] mb-5 pointer-events-none rounded-sm">
        <img
          src={imageSrc}
          alt={project.name}
          width="760"
          height="950"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          draggable={false}
        />
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-all duration-500" />

        {/* External Link Icon */}
        {project.link && (
          <div className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center border border-background/30 text-background opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm">
            <ArrowUpRight size={16} strokeWidth={1.5} />
          </div>
        )}

        {/* Fictitious Badge */}
        {project.badge && (
          <div className="absolute top-4 left-4 px-3 py-1.5 bg-background/95 text-foreground text-[9px] uppercase font-extrabold tracking-[0.2em] backdrop-blur-md rounded-sm border border-border pointer-events-auto">
            {project.badge}
          </div>
        )}
      </div>

      {/* Info */}
      <div>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-['Syne'] font-bold text-lg md:text-xl tracking-tight group-hover:text-[hsl(var(--primary))] transition-colors duration-300">
              {project.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">{project.type}</p>
          </div>
          <span className="text-xs text-muted-foreground tracking-wider mt-1 border border-border px-2 py-1 rounded-full">{project.year}</span>
        </div>
        <p className="text-sm text-muted-foreground mt-4 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-3">
          {project.desc}
        </p>
      </div>
    </>
  );

  if (project.link) {
    return (
      <motion.a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        data-testid={`portfolio-project-card-${index}`}
        className={cardClass}
        {...motionProps}
      >
        {cardContent}
      </motion.a>
    );
  }

  return (
    <motion.div
      data-testid={`portfolio-project-card-${index}`}
      className={cardClass}
      {...motionProps}
    >
      {cardContent}
    </motion.div>
  );
};

export const PortfolioSection = () => {
  const { t } = useLang();

  return (
    <section id="portfolio" data-testid="portfolio-section" className="py-16 md:py-20 overflow-hidden">
      {/* Header */}
      <div className="px-6 md:px-12 lg:px-20 mb-8 md:mb-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.3em] text-[hsl(var(--primary))] font-semibold mb-4 flex items-center gap-3"
        >
          {t.portfolio.overline}
        </motion.p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-['Syne'] font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tighter"
          >
            {t.portfolio.title}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 text-sm font-semibold text-muted-foreground lg:hidden"
          >
            <MoveRight size={18} className="text-[hsl(var(--primary))]" /> Explorer
          </motion.div>
        </div>
      </div>

      {/* Horizontal scroll projects */}
      <div className="w-full mt-12 md:mt-24 pb-8 relative">
        <style>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <div
          className="flex gap-6 px-6 md:px-12 lg:px-20 overflow-x-auto overflow-y-hidden touch-auto hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {t.portfolio.projects.map((project, i) => (
            <PortfolioCard
              key={i}
              project={project}
              imageSrc={projectImages[i]}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
