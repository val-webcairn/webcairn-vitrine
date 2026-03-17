import { useEffect } from 'react';

const DEFAULTS = {
  title: 'WebCairn | Création de Sites Vitrines',
  description: 'Des sites vitrines posés pierre après pierre — solides, visibles, faits pour durer.',
  canonical: 'https://webcairn.fr/',
  lang: 'fr',
};

export function usePageMeta({ title, description, canonical, lang }) {
  useEffect(() => {
    document.title = title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) canonicalLink.setAttribute('href', canonical);

    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    const addHreflang = (hreflang, href) => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = hreflang;
      link.href = href;
      document.head.appendChild(link);
    };
    addHreflang('fr', canonical);
    addHreflang('x-default', canonical);

    document.documentElement.setAttribute('lang', lang === 'en' ? 'en' : 'fr');

    return () => {
      document.title = DEFAULTS.title;
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute('content', DEFAULTS.description);
      const canon = document.querySelector('link[rel="canonical"]');
      if (canon) canon.setAttribute('href', DEFAULTS.canonical);
      document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
      document.documentElement.setAttribute('lang', DEFAULTS.lang);
    };
  }, [title, description, canonical, lang]);
}
