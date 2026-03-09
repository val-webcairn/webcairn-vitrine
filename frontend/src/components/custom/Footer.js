import React, { useState } from 'react';
import { useLang } from '@/contexts/LanguageContext';
import { LegalModal } from '@/components/custom/LegalModal';

export const Footer = () => {
  const { t, isLegalOpen, setLegalOpen } = useLang();

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <footer data-testid="footer" className="border-t border-border py-12 px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {/* Brand */}
          <div>
            <span className="font-['Syne'] font-extrabold text-lg tracking-tight">
              Web<span className="text-[hsl(var(--primary))]">Cairn</span>
            </span>
            <p className="text-sm text-muted-foreground mt-2 max-w-xs">{t.footer.tagline}</p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4 font-semibold">Navigation</p>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(t.footer.nav).map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="text-sm text-foreground hover:text-[hsl(var(--primary))] transition-colors duration-300 text-left"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div className="flex flex-col items-start md:items-end justify-between">
            <button
              data-testid="legal-link"
              onClick={() => setLegalOpen(true)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 underline underline-offset-4"
            >
              {t.footer.legal}
            </button>
            <p className="text-xs text-muted-foreground tracking-wider mt-4 md:mt-0">
              &copy; {new Date().getFullYear()} WebCairn. {t.footer.rights}
            </p>
          </div>
        </div>
      </footer>

      <LegalModal isOpen={isLegalOpen} onClose={() => setLegalOpen(false)} />
    </>
  );
};
