import React from 'react';
import { useLang } from '@/contexts/LanguageContext';

export const Footer = () => {
  const { t } = useLang();

  return (
    <footer data-testid="footer" className="border-t border-border py-12 px-6 md:px-12 lg:px-20">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="font-['Syne'] font-extrabold text-lg tracking-tight">
            Web<span className="text-[hsl(var(--primary))]">Cairn</span>
          </span>
          <p className="text-sm text-muted-foreground mt-2">{t.footer.tagline}</p>
        </div>
        <p className="text-xs text-muted-foreground tracking-wider">
          &copy; {new Date().getFullYear()} WebCairn. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
};
