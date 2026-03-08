import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useAnimationFrame } from 'framer-motion';
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
  const containerRef = useRef(null);
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const offsetX = useRef(0);
  const dragStartX = useRef(0);
  const dragOffsetAtStart = useRef(0);
  const singleSetWidth = useRef(0);
  const animationSpeed = 0.5; // pixels per frame

  // We triple the projects array for seamless infinite loop
  const tripleProjects = [...t.portfolio.projects, ...t.portfolio.projects, ...t.portfolio.projects];
  const tripleImages = [...projectImages, ...projectImages, ...projectImages];

  // Measure one set width
  useEffect(() => {
    const measure = () => {
      if (carouselRef.current) {
        // Total scroll width divided by 3 sets = one set
        singleSetWidth.current = carouselRef.current.scrollWidth / 3;
      }
    };
    measure();
    const timeout = setTimeout(measure, 500);
    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', measure);
    };
  }, [t.portfolio.projects]);

  // Continuous animation loop
  useAnimationFrame(() => {
    if (isDragging || isHovered || singleSetWidth.current === 0) return;

    offsetX.current -= animationSpeed;

    // When scrolled past one full set, jump back seamlessly
    if (Math.abs(offsetX.current) >= singleSetWidth.current) {
      offsetX.current += singleSetWidth.current;
    }
    // If dragged to positive territory, wrap forward
    if (offsetX.current > 0) {
      offsetX.current -= singleSetWidth.current;
    }

    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(${offsetX.current}px)`;
    }
  });

  // Drag handlers
  const handlePointerDown = useCallback((e) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragOffsetAtStart.current = offsetX.current;
    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId);
    }
  }, []);

  const handlePointerMove = useCallback((e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartX.current;
    offsetX.current = dragOffsetAtStart.current + dx;

    // Wrap around during drag
    if (singleSetWidth.current > 0) {
      if (Math.abs(offsetX.current) >= singleSetWidth.current) {
        offsetX.current += singleSetWidth.current;
        dragOffsetAtStart.current += singleSetWidth.current;
      }
      if (offsetX.current > 0) {
        offsetX.current -= singleSetWidth.current;
        dragOffsetAtStart.current -= singleSetWidth.current;
      }
    }

    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(${offsetX.current}px)`;
    }
  }, [isDragging]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

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

      {/* Infinite horizontal scroll projects */}
      <div
        ref={containerRef}
        className="cursor-grab active:cursor-grabbing select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          ref={carouselRef}
          className="flex gap-6 px-6 md:px-12 lg:px-20 w-max will-change-transform"
          style={{ transform: `translateX(${offsetX.current}px)` }}
        >
          {tripleProjects.map((project, i) => (
            <motion.div
              key={i}
              data-testid={`portfolio-project-${i % t.portfolio.projects.length}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % t.portfolio.projects.length) * 0.1 }}
              className="group flex-shrink-0 w-[300px] sm:w-[350px] md:w-[450px]"
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[4/5] mb-5 pointer-events-none rounded-sm">
                <img
                  src={tripleImages[i]}
                  alt={project.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-all duration-500" />
                <div className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center border border-background/30 text-background opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm">
                  <ArrowUpRight size={16} strokeWidth={1.5} />
                </div>
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
