import React, { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLang } from '@/contexts/LanguageContext';
import { useNavigate, useLocation } from 'react-router-dom';

export const Navigation = () => {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getSectionTarget = (id) => {
    return document.getElementById(id) || document.querySelector(`[data-anchor="${id}"]`);
  };

  const scrollTo = (id) => {
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
    } else {
      getSectionTarget(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileOpen(false);
  };

  const navLinks = [
    { id: 'services', label: t.nav.services },
    { id: 'portfolio', label: t.nav.portfolio },
    { id: 'pricing', label: t.nav.pricing },
    { id: 'aides', label: t.nav.aides },
    { id: 'contact', label: t.nav.contact },
  ];

  return (
    <>
      <nav
        data-testid="main-navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/50'
          : 'bg-transparent'
          }`}
      >
        <div className="w-full px-6 md:px-12 lg:px-20 py-4 flex items-center justify-between">
          {/* Logo */}
          <button
            data-testid="nav-logo"
            onClick={() => {
              if (location.pathname !== '/') navigate('/');
              else window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-['Syne'] font-extrabold text-xl tracking-tight text-foreground hover:text-[hsl(var(--primary))] transition-colors duration-300"
          >
            Web<span className="text-[hsl(var(--primary))]">Cairn</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                data-testid={`nav-link-${link.id}`}
                onClick={() => scrollTo(link.id)}
                className="text-sm font-medium tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[hsl(var(--primary))] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              data-testid="lang-toggle"
              onClick={toggleLang}
              className="h-8 px-3 text-xs font-bold tracking-widest border border-border hover:border-foreground transition-all duration-300 uppercase"
            >
              {lang === 'en' ? 'FR' : 'EN'}
            </button>
            <button
              data-testid="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="h-8 w-8 flex items-center justify-center border border-border hover:border-foreground transition-all duration-300"
            >
              {theme === 'light' ? '◐' : '◑'}
            </button>
            <button
              data-testid="mobile-menu-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle mobile menu"
              className="md:hidden h-8 w-8 flex items-center justify-center border border-border hover:border-foreground transition-all duration-300"
            >
              {mobileOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          data-testid="mobile-menu"
          className="fixed inset-0 z-40 bg-background pt-24 px-6"
        >
          <div className="flex flex-col gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-4xl font-['Syne'] font-bold tracking-tighter text-left text-foreground hover:text-[hsl(var(--primary))] transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
