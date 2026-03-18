import { useEffect } from 'react';

const DEFAULTS = {
  title: 'WebCairn | Création de Sites Vitrines',
  description: 'Des sites vitrines posés pierre après pierre — solides, visibles, faits pour durer.',
  canonical: 'https://webcairn.fr/',
  lang: 'fr',
};

const PAGE_SCHEMA_ATTR = 'data-page-jsonld';

export function usePageMeta({ title, description, canonical, lang, structuredData }) {
  useEffect(() => {
    const setMetaContent = (selector, content) => {
      const node = document.querySelector(selector);
      if (node) node.setAttribute('content', content);
    };

    const removePageJsonLd = () => {
      document.querySelectorAll(`script[type="application/ld+json"][${PAGE_SCHEMA_ATTR}]`).forEach((el) => el.remove());
    };

    const setPageJsonLd = (schema) => {
      removePageJsonLd();
      if (!schema) return;

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute(PAGE_SCHEMA_ATTR, 'true');
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    };

    document.title = title;

    setMetaContent('meta[name="description"]', description);
    setMetaContent('meta[property="og:title"]', title);
    setMetaContent('meta[property="og:description"]', description);
    setMetaContent('meta[property="og:url"]', canonical);
    setMetaContent('meta[property="twitter:title"]', title);
    setMetaContent('meta[property="twitter:description"]', description);
    setPageJsonLd(structuredData);

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
      setMetaContent('meta[name="description"]', DEFAULTS.description);
      setMetaContent('meta[property="og:title"]', DEFAULTS.title);
      setMetaContent('meta[property="og:description"]', DEFAULTS.description);
      setMetaContent('meta[property="og:url"]', DEFAULTS.canonical);
      setMetaContent('meta[property="twitter:title"]', DEFAULTS.title);
      setMetaContent('meta[property="twitter:description"]', DEFAULTS.description);
      removePageJsonLd();
      const canon = document.querySelector('link[rel="canonical"]');
      if (canon) canon.setAttribute('href', DEFAULTS.canonical);
      document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
      document.documentElement.setAttribute('lang', DEFAULTS.lang);
    };
  }, [title, description, canonical, lang, structuredData]);
}
