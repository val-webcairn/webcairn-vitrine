import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MoveRight } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

const projectImages = [
  'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
  'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80',
  'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80',
];

export const PortfolioSection = () => {
  const { t } = useLang();
  const scrollRef = useRef(null);
  const [isInteracting, setIsInteracting] = useState(false);

  // Triple projects arrays to allow a long seamless continuous scroll
  const displayProjects = [...t.portfolio.projects, ...t.portfolio.projects, ...t.portfolio.projects];
  const displayImages = [...projectImages, ...projectImages, ...projectImages];

  // Auto-scroll logic
  useEffect(() => {
    let animationId;
    let accum = 0;

    const scroll = () => {
      if (!isInteracting && scrollRef.current) {
        accum += 0.8; // pixels per frame
        if (accum >= 1) {
          scrollRef.current.scrollLeft += Math.floor(accum);
          accum -= Math.floor(accum);
        }
      }
      animationId = window.requestAnimationFrame(scroll);
    };

    animationId = window.requestAnimationFrame(scroll);
    return () => window.cancelAnimationFrame(animationId);
  }, [isInteracting]);

  // Pause the scroll permanently when the user interacts
  const handleInteraction = () => {
    if (!isInteracting) {
      setIsInteracting(true);
    }
  };

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
          ref={scrollRef}
          onPointerDown={handleInteraction}
          onTouchStart={handleInteraction}
          onWheel={handleInteraction}
          className="flex gap-6 px-6 md:px-12 lg:px-20 overflow-x-auto hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayProjects.map((project, i) => (
            <motion.div
              key={i}
              onClick={() => {
                handleInteraction();
                if (project.link) {
                  window.open(project.link, '_blank', 'noopener,noreferrer');
                }
              }}
              data-testid={`portfolio-project-card-${i}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.1 }}
              className={`group flex-shrink-0 w-[85vw] sm:w-[350px] md:w-[450px] ${project.link ? 'cursor-pointer' : ''}`}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[4/5] mb-5 pointer-events-none rounded-sm">
                <img
                  src={displayImages[i]}
                  alt={project.name}
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
