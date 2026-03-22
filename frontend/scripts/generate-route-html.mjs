import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const distDir = path.resolve('dist');
const indexPath = path.join(distDir, 'index.html');
const pricingDir = path.join(distDir, 'tarifs');
const pricingPath = path.join(pricingDir, 'index.html');

const HOME_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': 'https://webcairn.fr/#business',
      name: 'WebCairn',
      description: 'Creation de sites vitrines pour artisans, restaurateurs et TPE en Provence.',
      url: 'https://webcairn.fr',
      email: 'contact@webcairn.fr',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '139 Bis Chemin de la Bonde',
        addressLocality: 'Gardanne',
        postalCode: '13120',
        addressCountry: 'FR',
      },
      areaServed: [
        { '@type': 'City', name: 'Aix-en-Provence' },
        { '@type': 'City', name: 'Marseille' },
        { '@type': 'City', name: 'Nice' },
        { '@type': 'City', name: 'Toulon' },
        { '@type': 'State', name: "Provence-Alpes-Cote d'Azur" },
      ],
      priceRange: '490 EUR - 990 EUR',
      image: 'https://webcairn.fr/images/social/webcairn-social-share-banner.jpg',
    },
    {
      '@type': 'Service',
      '@id': 'https://webcairn.fr/#service',
      name: 'Creation de Sites Vitrines',
      provider: { '@id': 'https://webcairn.fr/#business' },
      description:
        'Creation de sites vitrines sur mesure pour artisans, restaurateurs et TPE. Design responsive, SEO, formulaire de contact, integration Google Maps, conformite RGPD.',
      areaServed: 'FR',
      offers: [
        {
          '@type': 'Offer',
          name: 'Formule Essentiel',
          price: '490',
          priceCurrency: 'EUR',
          description: 'Site one-page responsive livre en 2 semaines.',
        },
        {
          '@type': 'Offer',
          name: 'Formule Ascension',
          price: '990',
          priceCurrency: 'EUR',
          description: "Site multi-pages jusqu'a 5 pages, livre en 3 a 4 semaines.",
        },
      ],
    },
  ],
};

const PRICING_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://webcairn.fr/tarifs#webpage',
  url: 'https://webcairn.fr/tarifs',
  name: 'Tarifs | WebCairn - Creation de Sites Vitrines',
  inLanguage: 'fr-FR',
  mainEntity: {
    '@type': 'OfferCatalog',
    name: 'Tarifs WebCairn',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Formule Essentiel',
        price: '490',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        url: 'https://webcairn.fr/tarifs',
      },
      {
        '@type': 'Offer',
        name: 'Formule Ascension',
        price: '990',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        url: 'https://webcairn.fr/tarifs',
      },
    ],
  },
};

const ROUTES = {
  home: {
    title: 'WebCairn | Creation de Sites Vitrines',
    description: 'Des sites vitrines poses pierre apres pierre - solides, visibles, faits pour durer.',
    canonical: 'https://webcairn.fr/',
    jsonLd: HOME_JSON_LD,
  },
  pricing: {
    title: 'Tarifs | WebCairn - Creation de Sites Vitrines',
    description:
      'Formules Essentiel a 490 EUR et Ascension a 990 EUR. Creation de sites vitrines pour artisans et TPE. Devis personnalise gratuit.',
    canonical: 'https://webcairn.fr/tarifs',
    jsonLd: PRICING_JSON_LD,
  },
};

const replaceTagContent = (html, regex, replacement, label) => {
  if (!regex.test(html)) {
    throw new Error(`Unable to locate ${label} in index.html`);
  }
  return html.replace(regex, replacement);
};

const applyHeadValues = (html, values) => {
  let next = html;

  next = replaceTagContent(
    next,
    /<title>[\s\S]*?<\/title>/i,
    `<title>${values.title}</title>`,
    'title'
  );

  next = replaceTagContent(
    next,
    /<meta name="description" content="[\s\S]*?"\s*\/>/i,
    `<meta name="description" content="${values.description}" />`,
    'meta description'
  );

  next = replaceTagContent(
    next,
    /<link rel="canonical" href="[\s\S]*?"\s*\/>/i,
    `<link rel="canonical" href="${values.canonical}" />`,
    'canonical link'
  );

  next = replaceTagContent(
    next,
    /<link rel="alternate" hreflang="fr" href="[\s\S]*?"\s*\/>/i,
    `<link rel="alternate" hreflang="fr" href="${values.canonical}" />`,
    'hreflang fr link'
  );

  next = replaceTagContent(
    next,
    /<link rel="alternate" hreflang="x-default" href="[\s\S]*?"\s*\/>/i,
    `<link rel="alternate" hreflang="x-default" href="${values.canonical}" />`,
    'hreflang x-default link'
  );

  next = replaceTagContent(
    next,
    /<meta property="og:url" content="[\s\S]*?"\s*\/>/i,
    `<meta property="og:url" content="${values.canonical}" />`,
    'og:url'
  );

  next = replaceTagContent(
    next,
    /<meta property="og:title" content="[\s\S]*?"\s*\/>/i,
    `<meta property="og:title" content="${values.title}" />`,
    'og:title'
  );

  next = replaceTagContent(
    next,
    /<meta property="og:description" content="[\s\S]*?"\s*\/>/i,
    `<meta property="og:description" content="${values.description}" />`,
    'og:description'
  );

  next = replaceTagContent(
    next,
    /<meta property="twitter:title" content="[\s\S]*?"\s*\/>/i,
    `<meta property="twitter:title" content="${values.title}" />`,
    'twitter:title'
  );

  next = replaceTagContent(
    next,
    /<meta property="twitter:description" content="[\s\S]*?"\s*\/>/i,
    `<meta property="twitter:description" content="${values.description}" />`,
    'twitter:description'
  );

  const serializedJsonLd = JSON.stringify(values.jsonLd, null, 2)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e');

  next = replaceTagContent(
    next,
    /<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/i,
    `<script type="application/ld+json" data-page-jsonld>\n${serializedJsonLd}\n  </script>`,
    'json-ld script'
  );

  return next;
};

const main = async () => {
  const indexHtml = await readFile(indexPath, 'utf8');

  const homeHtml = applyHeadValues(indexHtml, ROUTES.home);
  const pricingHtml = applyHeadValues(indexHtml, ROUTES.pricing);

  await writeFile(indexPath, homeHtml, 'utf8');
  await mkdir(pricingDir, { recursive: true });
  await writeFile(pricingPath, pricingHtml, 'utf8');

  process.stdout.write('Generated static HTML heads for / and /tarifs.\n');
};

main().catch((error) => {
  process.stderr.write(`${error.message}\n`);
  process.exit(1);
});
