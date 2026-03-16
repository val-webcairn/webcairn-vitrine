import React, { useRef, useState, useEffect } from 'react';

/**
 * LazySection: Defers rendering of child content until element becomes visible.
 * Uses IntersectionObserver to detect when section enters viewport.
 * Reduces initial JS payload by deferring non-critical sections.
 */
export const LazySection = ({ children, className = '' }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {isVisible ? children : <div aria-hidden="true" className="h-96" />}
    </div>
  );
};
