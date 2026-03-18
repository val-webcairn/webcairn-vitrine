import React from 'react';
import ReactDOM from 'react-dom/client';
import { flushSync } from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import App from '@/App';

const renderWithRoot = (initialEntries = ['/']) => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = ReactDOM.createRoot(container);

  flushSync(() => {
    root.render(
      <MemoryRouter initialEntries={initialEntries}>
        <App />
      </MemoryRouter>
    );
  });

  return {
    container,
    unmount: () => {
      root.unmount();
      container.remove();
    },
  };
};

const waitForCondition = async (condition, timeout = 1500, interval = 25) => {
  const startedAt = Date.now();
  while (!condition()) {
    if (Date.now() - startedAt > timeout) {
      throw new Error('Timed out while waiting for condition');
    }
    await new Promise((resolve) => setTimeout(resolve, interval));
  }
};

const getMeta = (selector) => document.querySelector(selector)?.getAttribute('content');

const getCanonicalHref = () => document.querySelector('link[rel="canonical"]')?.getAttribute('href');

const getPageJsonLd = () => {
  const node = document.querySelector('script[type="application/ld+json"][data-page-jsonld]');
  if (!node) return null;
  return JSON.parse(node.textContent || '{}');
};

const ensureHeadTag = (selector, createTag) => {
  if (document.querySelector(selector)) return;
  const node = createTag();
  document.head.appendChild(node);
};

const seedHeadTags = () => {
  ensureHeadTag('meta[name="description"]', () => {
    const node = document.createElement('meta');
    node.setAttribute('name', 'description');
    node.setAttribute('content', '');
    return node;
  });

  ensureHeadTag('link[rel="canonical"]', () => {
    const node = document.createElement('link');
    node.setAttribute('rel', 'canonical');
    node.setAttribute('href', 'https://webcairn.fr/');
    return node;
  });

  ensureHeadTag('meta[property="og:title"]', () => {
    const node = document.createElement('meta');
    node.setAttribute('property', 'og:title');
    node.setAttribute('content', '');
    return node;
  });

  ensureHeadTag('meta[property="og:description"]', () => {
    const node = document.createElement('meta');
    node.setAttribute('property', 'og:description');
    node.setAttribute('content', '');
    return node;
  });

  ensureHeadTag('meta[property="og:url"]', () => {
    const node = document.createElement('meta');
    node.setAttribute('property', 'og:url');
    node.setAttribute('content', '');
    return node;
  });

  ensureHeadTag('meta[property="twitter:title"]', () => {
    const node = document.createElement('meta');
    node.setAttribute('property', 'twitter:title');
    node.setAttribute('content', '');
    return node;
  });

  ensureHeadTag('meta[property="twitter:description"]', () => {
    const node = document.createElement('meta');
    node.setAttribute('property', 'twitter:description');
    node.setAttribute('content', '');
    return node;
  });
};

describe('App page head tags', () => {
  beforeEach(() => {
    seedHeadTags();
  });

  it('sets expected tags on home route /', async () => {
    const view = renderWithRoot(['/']);

    await waitForCondition(() => document.title.includes('WebCairn'));

    expect(document.title).toBe('WebCairn | Création de Sites Vitrines');
    expect(getMeta('meta[name="description"]')).toBe('Des sites vitrines posés pierre après pierre — solides, visibles, faits pour durer.');
    expect(getCanonicalHref()).toBe('https://webcairn.fr/');
    expect(getMeta('meta[property="og:title"]')).toBe('WebCairn | Création de Sites Vitrines');
    expect(getMeta('meta[property="og:description"]')).toBe('Des sites vitrines posés pierre après pierre — solides, visibles, faits pour durer.');
    expect(getMeta('meta[property="og:url"]')).toBe('https://webcairn.fr/');
    expect(getMeta('meta[property="twitter:title"]')).toBe('WebCairn | Création de Sites Vitrines');
    expect(getMeta('meta[property="twitter:description"]')).toBe('Des sites vitrines posés pierre après pierre — solides, visibles, faits pour durer.');
    expect(getPageJsonLd()?.['@type']).toBe('WebPage');
    expect(getPageJsonLd()?.url).toBe('https://webcairn.fr/');
    expect(view.container.querySelectorAll('h1').length).toBe(1);

    view.unmount();
  });

  it('sets expected tags on pricing route /tarifs', async () => {
    const view = renderWithRoot(['/tarifs']);

    await waitForCondition(() => document.title.includes('Tarifs | WebCairn'));

    expect(document.title).toBe('Tarifs | WebCairn — Création de Sites Vitrines');
    expect(getMeta('meta[name="description"]')).toBe('Formules Essentiel à 490 € et Ascension à 990 €. Création de sites vitrines pour artisans et TPE. Devis personnalisé gratuit.');
    expect(getCanonicalHref()).toBe('https://webcairn.fr/tarifs');
    expect(getMeta('meta[property="og:title"]')).toBe('Tarifs | WebCairn — Création de Sites Vitrines');
    expect(getMeta('meta[property="og:description"]')).toBe('Formules Essentiel à 490 € et Ascension à 990 €. Création de sites vitrines pour artisans et TPE. Devis personnalisé gratuit.');
    expect(getMeta('meta[property="og:url"]')).toBe('https://webcairn.fr/tarifs');
    expect(getMeta('meta[property="twitter:title"]')).toBe('Tarifs | WebCairn — Création de Sites Vitrines');
    expect(getMeta('meta[property="twitter:description"]')).toBe('Formules Essentiel à 490 € et Ascension à 990 €. Création de sites vitrines pour artisans et TPE. Devis personnalisé gratuit.');
    expect(getPageJsonLd()?.mainEntity?.['@type']).toBe('OfferCatalog');
    expect(getPageJsonLd()?.mainEntity?.itemListElement?.length).toBe(2);
    expect(view.container.querySelectorAll('h1').length).toBe(1);

    view.unmount();
  });
});
