import React, { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    nav: { services: 'Services', portfolio: 'Portfolio', about: 'About', pricing: 'Pricing', aides: 'Grants', contact: 'Contact' },
    hero: {
      overline: 'SHOWCASE WEBSITE CREATION — PACA REGION',
      headline: 'YOUR SHOWCASE SITE, STONE BY STONE',
      sub: 'I design and develop showcase websites for artisans and restaurant owners. Clean, fast, memorable — built to last like a cairn.',
      cta: 'Lay the first stone',
      scroll: 'Scroll to explore'
    },
    services: {
      overline: 'WHAT I DO',
      title: 'Services',
      items: [
        {
          title: 'Showcase Website Creation',
          desc: 'From design to deployment, I build your complete online presence. Responsive design, professional visuals, contact forms, Google Maps integration, SEO-optimized — everything you need to convert visitors into customers.',
          tag: 'CORE',
          features: ['Custom responsive design', 'Contact form & Maps', 'Basic SEO optimization', 'Performance & speed', 'Mobile-first approach', 'Content management']
        }
      ]
    },
    portfolio: {
      overline: 'SELECTED WORK',
      title: 'Portfolio',
      projects: [
        { name: 'La Fournée d\'Or', type: 'Artisan Bakery — Aix-en-Provence', year: '2025', desc: 'A warm, inviting showcase site for a traditional Provençal bakery. Online ordering and product gallery.' },
        { name: 'Le Mas Provençal', type: 'Gourmet Restaurant — Marseille', year: '2025', desc: 'An elegant digital presence for a fine dining restaurant. Online menu, reservations, and photo gallery.' },
        { name: 'Atelier Terre & Feu', type: 'Ceramic Artisan — Nice', year: '2024', desc: 'A refined portfolio for a ceramist. Workshop showcase, custom orders, and artisan story.' },
        { name: 'Pizzeria Da Marco', type: 'Artisan Pizzeria — Toulon', year: '2024', desc: 'A vibrant site for an artisan pizzeria. Menu, online ordering, and customer reviews.' }
      ]
    },
    about: {
      overline: 'ABOUT',
      title: 'The Builder',
      p1: 'I\'m Lilian, 19, web developer and auto-entrepreneur based in the PACA region. I\'m passionate about tech and design — I create showcase websites that truly represent artisans and local restaurant owners.',
      p2: 'Like a cairn that guides hikers on the trail, I build digital landmarks for your business. No unnecessary complexity — just beautiful, fast, effective sites that bring you clients.',
      stat1: { num: '10+', label: 'Projects Delivered' },
      stat2: { num: '100%', label: 'Client Satisfaction' },
      stat3: { num: '< 48h', label: 'Response Time' }
    },
    pricing: {
      overline: 'PRICING',
      title: 'Pricing',
      sub: 'Clear and transparent pricing, tailored to your needs. Each package is customizable.',
      plans: [
        {
          name: 'Essential',
          price: '400 – 600€',
          desc: 'The ideal start for your online presence.',
          features: ['One-page website', 'Responsive design', 'Contact form', 'Basic SEO', 'Google Maps integration', 'Delivery in 2 weeks'],
          cta: 'Choose Essential'
        },
        {
          name: 'Ascension',
          price: '800 – 1 200€',
          desc: 'A more complete site to stand out.',
          features: ['Multi-page site (up to 5)', 'Advanced custom design', 'Photo gallery', 'Advanced SEO', 'Social media integration', 'Delivery in 3–4 weeks'],
          cta: 'Choose Ascension'
        }
      ],
      note: 'All prices are tax-inclusive (auto-entrepreneur, VAT-exempt). Payment in 2 or 3 installments available.'
    },
    aides: {
      overline: 'GRANTS & FUNDING',
      title: 'Reduce the cost of your website',
      sub: 'Grants exist to finance your online presence. I help you find the programs available for your situation.',
      items: [
        {
          title: 'France Num',
          desc: 'The official government portal to find digital grants suited to your business. Get your free diagnostic.',
          amount: 'Variable',
          link: 'https://www.francenum.gouv.fr/aides-et-financement'
        },
        {
          title: 'Aides-Entreprises.fr',
          desc: 'The official search engine that lists all national, regional, and local subsidies you may be eligible for.',
          amount: 'All grants',
          link: 'https://www.aides-entreprises.fr'
        },
        {
          title: 'CCI Aix-Marseille',
          desc: 'Your local chamber of commerce regularly offers digital support programs for businesses in the Bouches-du-Rhône.',
          amount: 'Local',
          link: 'https://www.cciamp.com'
        }
      ],
      cta: 'CHECK MY ELIGIBILITY',
      ctaLink: 'https://www.francenum.gouv.fr/aides-et-financement',
      ctaSub: 'Free and no-obligation.'
    },
    contact: {
      overline: 'GET IN TOUCH',
      title: 'Let\'s Build',
      sub: 'Tell me about your project and I\'ll get back to you within 48 hours.',
      name: 'Your Name',
      email: 'Email Address',
      phone: 'Phone Number',
      activity: 'Your Activity',
      activityPlaceholder: 'e.g. Baker, Restaurant, Craftsman...',
      message: 'Tell me about your project',
      send: 'SEND SIGNAL',
      info: 'hello@webcairn.fr'
    },
    footer: {
      tagline: 'Showcase websites for artisans and restaurant owners in PACA.',
      rights: 'All rights reserved.',
      legal: 'Legal Notice',
      nav: { services: 'Services', portfolio: 'Portfolio', pricing: 'Pricing', contact: 'Contact' }
    },
    legal: {
      title: 'Legal Notice',
      editor: 'Website Editor',
      editorContent: 'Lilian Valette — EI (Individual Enterprise)\nSIRET: XXX XXX XXX XXXXX\nAddress: PACA Region, France\nEmail: hello@webcairn.fr\nPhone: On request',
      host: 'Hosting',
      hostContent: 'Vercel Inc.\n440 N Barranca Ave #4133\nCovina, CA 91723, USA',
      ip: 'Intellectual Property',
      ipContent: 'All content on this site (texts, images, graphics, logo) is the property of Lilian Valette / WebCairn and is protected by intellectual property laws. Any reproduction without prior authorization is prohibited.',
      data: 'Personal Data & GDPR',
      dataContent: 'Data collected via the contact form (name, email, phone, message) is used solely to respond to your request. No data is sold or shared with third parties. In accordance with the GDPR, you have the right to access, rectify, and delete your data by contacting hello@webcairn.fr.',
      cookies: 'Cookies',
      cookiesContent: 'This site does not use tracking cookies or third-party analytics tools.',
      close: 'Close'
    }
  },
  fr: {
    nav: { services: 'Services', portfolio: 'Réalisations', about: 'À propos', pricing: 'Tarifs', aides: 'Aides', contact: 'Contact' },
    hero: {
      overline: 'CRÉATION DE SITES VITRINES — RÉGION PACA',
      headline: 'VOTRE SITE VITRINE, PIERRE APRÈS PIERRE',
      sub: 'Je conçois et développe des sites vitrines pour artisans et restaurateurs. Clairs, rapides, mémorables — bâtis pour durer comme un cairn.',
      cta: 'Poser la première pierre',
      scroll: 'Défilez pour explorer'
    },
    services: {
      overline: 'CE QUE JE FAIS',
      title: 'Services',
      items: [
        {
          title: 'Création de Sites Vitrines',
          desc: 'Du design au déploiement, je construis votre présence en ligne complète. Design responsive, visuels professionnels, formulaire de contact, intégration Google Maps, optimisation SEO — tout ce qu\'il faut pour convertir vos visiteurs en clients.',
          tag: 'CŒUR DE MÉTIER',
          features: ['Design responsive sur mesure', 'Formulaire de contact & Maps', 'Optimisation SEO de base', 'Performance & rapidité', 'Approche mobile-first', 'Gestion de contenu']
        }
      ]
    },
    portfolio: {
      overline: 'RÉALISATIONS',
      title: 'Portfolio',
      projects: [
        { name: 'La Fournée d\'Or', type: 'Boulangerie artisanale — Aix-en-Provence', year: '2025', desc: 'Un site vitrine chaleureux pour une boulangerie provençale traditionnelle. Commande en ligne et galerie produits.' },
        { name: 'Le Mas Provençal', type: 'Restaurant gastronomique — Marseille', year: '2025', desc: 'Une présence digitale élégante pour un restaurant gastronomique. Menu en ligne, réservations et galerie photo.' },
        { name: 'Atelier Terre & Feu', type: 'Céramiste artisan — Nice', year: '2024', desc: 'Un portfolio raffiné pour un céramiste. Vitrine d\'atelier, commandes personnalisées et histoire artisanale.' },
        { name: 'Pizzeria Da Marco', type: 'Pizzeria artisanale — Toulon', year: '2024', desc: 'Un site vibrant pour une pizzeria artisanale. Carte, commande en ligne et avis clients.' }
      ]
    },
    about: {
      overline: 'À PROPOS',
      title: 'Le Bâtisseur',
      p1: 'Moi c\'est Lilian, 19 ans, développeur web et auto-entrepreneur en région PACA. Passionné par la tech et le design, je crée des sites vitrines qui représentent vraiment les artisans et restaurateurs locaux.',
      p2: 'Comme un cairn qui guide les randonneurs sur le sentier, je construis des repères digitaux pour votre activité. Pas de complexité inutile — juste des sites beaux, rapides et efficaces qui vous ramènent des clients.',
      stat1: { num: '10+', label: 'Projets Livrés' },
      stat2: { num: '100%', label: 'Satisfaction Client' },
      stat3: { num: '< 48h', label: 'Temps de Réponse' }
    },
    pricing: {
      overline: 'TARIFS',
      title: 'Tarifs',
      sub: 'Des tarifs clairs et transparents, adaptés à vos besoins. Chaque formule est personnalisable.',
      plans: [
        {
          name: 'Essentiel',
          price: '400 – 600€',
          desc: 'Le départ idéal pour votre présence en ligne.',
          features: ['Site one-page', 'Design responsive', 'Formulaire de contact', 'SEO de base', 'Intégration Google Maps', 'Livraison en 2 semaines'],
          cta: 'Choisir Essentiel'
        },
        {
          name: 'Ascension',
          price: '800 – 1 200€',
          desc: 'Un site plus complet pour vous démarquer.',
          features: ['Site multi-pages (jusqu\'à 5)', 'Design personnalisé avancé', 'Galerie photos', 'SEO avancé', 'Intégration réseaux sociaux', 'Livraison en 3–4 semaines'],
          cta: 'Choisir Ascension'
        }
      ],
      note: 'Tous les prix sont TTC (auto-entrepreneur, TVA non applicable). Paiement en 2 ou 3 fois possible.'
    },
    aides: {
      overline: 'AIDES & FINANCEMENTS',
      title: 'Réduisez le coût de votre site',
      sub: 'Des aides existent pour financer votre présence en ligne. Je vous indique les dispositifs disponibles pour votre situation.',
      items: [
        {
          title: 'France Num',
          desc: 'Le portail officiel de l\'État pour trouver les aides numériques adaptées à votre entreprise. Faites votre diagnostic gratuitement.',
          amount: 'Variable',
          link: 'https://www.francenum.gouv.fr/aides-et-financement'
        },
        {
          title: 'Aides-Entreprises.fr',
          desc: 'Le moteur de recherche officiel qui recense toutes les subventions nationales, régionales et locales auxquelles vous pouvez prétendre.',
          amount: 'Toutes aides',
          link: 'https://www.aides-entreprises.fr'
        },
        {
          title: 'CCI Aix-Marseille',
          desc: 'Votre chambre de commerce locale propose régulièrement des dispositifs d\'accompagnement numérique pour les entreprises des Bouches-du-Rhône.',
          amount: 'Local',
          link: 'https://www.cciamp.com'
        }
      ],
      cta: 'VÉRIFIER MON ÉLIGIBILITÉ',
      ctaLink: 'https://www.francenum.gouv.fr/aides-et-financement',
      ctaSub: 'Gratuit et sans engagement'
    },
    contact: {
      overline: 'CONTACT',
      title: 'Construisons',
      sub: 'Parlez-moi de votre projet et je vous recontacte sous 48h.',
      name: 'Votre Nom',
      email: 'Adresse Email',
      phone: 'Téléphone',
      activity: 'Votre Activité',
      activityPlaceholder: 'ex. Boulanger, Restaurateur, Artisan...',
      message: 'Parlez-moi de votre projet',
      send: 'ENVOYER LE SIGNAL',
      info: 'hello@webcairn.fr'
    },
    footer: {
      tagline: 'Sites vitrines pour artisans et restaurateurs en PACA.',
      rights: 'Tous droits réservés.',
      legal: 'Mentions légales',
      nav: { services: 'Services', portfolio: 'Réalisations', pricing: 'Tarifs', contact: 'Contact' }
    },
    legal: {
      title: 'Mentions Légales',
      editor: 'Éditeur du site',
      editorContent: 'Lilian Valette — EI (Entreprise Individuelle)\nSIRET : XXX XXX XXX XXXXX\nAdresse : Région PACA, France\nEmail : hello@webcairn.fr\nTéléphone : Sur demande',
      host: 'Hébergement',
      hostContent: 'Vercel Inc.\n440 N Barranca Ave #4133\nCovina, CA 91723, USA',
      ip: 'Propriété intellectuelle',
      ipContent: 'L\'ensemble du contenu de ce site (textes, images, graphismes, logo) est la propriété de Lilian Valette / WebCairn et est protégé par les lois relatives à la propriété intellectuelle. Toute reproduction sans autorisation préalable est interdite.',
      data: 'Données personnelles & RGPD',
      dataContent: 'Les données collectées via le formulaire de contact (nom, email, téléphone, message) sont utilisées uniquement pour répondre à votre demande. Aucune donnée n\'est vendue ni partagée avec des tiers. Conformément au RGPD, vous disposez d\'un droit d\'accès, de rectification et de suppression de vos données en contactant hello@webcairn.fr.',
      cookies: 'Cookies',
      cookiesContent: 'Ce site n\'utilise pas de cookies de suivi ni d\'outils d\'analyse tiers.',
      close: 'Fermer'
    }
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('webcairn-lang') || 'fr';
    }
    return 'fr';
  });

  const toggleLang = () => {
    const next = lang === 'en' ? 'fr' : 'en';
    setLang(next);
    localStorage.setItem('webcairn-lang', next);
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLang must be used within LanguageProvider');
  return context;
};
