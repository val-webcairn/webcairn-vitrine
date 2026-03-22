import { readFile } from 'node:fs/promises';
import path from 'node:path';

const distDir = path.resolve('dist');

const ROUTES = [
  {
    name: '/',
    filePath: path.join(distDir, 'index.html'),
    expected: {
      title: 'WebCairn | Creation de Sites Vitrines',
      description: 'Des sites vitrines poses pierre apres pierre - solides, visibles, faits pour durer.',
      canonical: 'https://webcairn.fr/',
      ogUrl: 'https://webcairn.fr/',
      jsonLdNeedles: ['"@context": "https://schema.org"', '"@graph"'],
    },
  },
  {
    name: '/tarifs',
    filePath: path.join(distDir, 'tarifs', 'index.html'),
    expected: {
      title: 'Tarifs | WebCairn - Creation de Sites Vitrines',
      description:
        'Formules Essentiel a 490 EUR et Ascension a 990 EUR. Creation de sites vitrines pour artisans et TPE. Devis personnalise gratuit.',
      canonical: 'https://webcairn.fr/tarifs',
      ogUrl: 'https://webcairn.fr/tarifs',
      jsonLdNeedles: ['"@type": "WebPage"', '"OfferCatalog"'],
    },
  },
];

const includesOrFail = (html, needle, label, routeName, failures) => {
  if (!html.includes(needle)) {
    failures.push(`${routeName}: missing ${label}`);
  }
};

const checkRoute = async (route) => {
  const html = await readFile(route.filePath, 'utf8');
  const failures = [];

  includesOrFail(html, `<title>${route.expected.title}</title>`, 'title', route.name, failures);
  includesOrFail(
    html,
    `<meta name="description" content="${route.expected.description}" />`,
    'meta description',
    route.name,
    failures
  );
  includesOrFail(
    html,
    `<link rel="canonical" href="${route.expected.canonical}" />`,
    'canonical link',
    route.name,
    failures
  );
  includesOrFail(
    html,
    `<meta property="og:url" content="${route.expected.ogUrl}" />`,
    'og:url',
    route.name,
    failures
  );

  const jsonLdMatch = html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/i);
  if (!jsonLdMatch) {
    failures.push(`${route.name}: missing json-ld script`);
  } else {
    for (const needle of route.expected.jsonLdNeedles) {
      includesOrFail(jsonLdMatch[1], needle, `json-ld content (${needle})`, route.name, failures);
    }
  }

  return failures;
};

const main = async () => {
  const failures = [];

  for (const route of ROUTES) {
    const routeFailures = await checkRoute(route);
    failures.push(...routeFailures);
  }

  if (failures.length > 0) {
    for (const failure of failures) {
      process.stderr.write(`${failure}\n`);
    }
    process.exit(1);
  }

  process.stdout.write('Static SEO bot-view checks passed for / and /tarifs.\n');
};

main().catch((error) => {
  process.stderr.write(`${error.message}\n`);
  process.exit(1);
});
