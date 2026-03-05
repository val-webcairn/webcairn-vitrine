import React, { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    nav: { services: 'Services', portfolio: 'Portfolio', about: 'About', contact: 'Contact' },
    hero: {
      overline: 'WEB DEVELOPMENT AGENCY',
      headline: 'WE BUILD DIGITAL MONUMENTS',
      sub: 'Stability in a chaotic web. We craft showcase websites that stand like cairns — simple, striking, enduring.',
      cta: 'Start Climbing',
      scroll: 'Scroll to explore'
    },
    services: {
      overline: 'WHAT WE DO',
      title: 'Services',
      items: [
        {
          title: 'Showcase Sites',
          desc: 'Clean, fast, memorable. We design and develop single-page and multi-page showcase websites that turn visitors into clients. No bloat, no complexity — just clarity.',
          tag: 'CORE'
        },
        {
          title: 'Art Direction',
          desc: 'Every pixel tells a story. We define your visual identity — from color palettes to typography systems — so your brand speaks before you do.',
          tag: 'IDENTITY'
        },
        {
          title: 'Motion & Interaction',
          desc: 'Static is dead. We add meaningful animations and micro-interactions that make your site feel alive without sacrificing performance.',
          tag: 'CRAFT'
        },
        {
          title: 'SEO & Performance',
          desc: 'Beautiful is nothing if invisible. We optimize every site for search engines and speed, ensuring your monument is found and loads instantly.',
          tag: 'REACH'
        }
      ]
    },
    portfolio: {
      overline: 'SELECTED WORK',
      title: 'Portfolio',
      projects: [
        { name: 'Maison Aurore', type: 'Interior Design Studio', year: '2024' },
        { name: 'Alpiniste Coffee', type: 'Specialty Coffee Brand', year: '2024' },
        { name: 'Atelier Verre', type: 'Glasswork Artisan', year: '2023' },
        { name: 'Nordic Trails', type: 'Adventure Travel Agency', year: '2023' },
        { name: 'Jardin Sonore', type: 'Music Festival', year: '2023' }
      ]
    },
    about: {
      overline: 'WHO WE ARE',
      title: 'The Architects',
      p1: 'WebCairn was born from a simple belief: the web has too much noise and not enough craft. We are a small team of designers and developers based in France who obsess over details.',
      p2: 'Like the cairns that guide hikers through fog, we build digital landmarks — simple structures that show the way. No databases, no payment systems, no unnecessary complexity. Just beautiful, fast, purposeful websites.',
      stat1: { num: '47+', label: 'Projects Delivered' },
      stat2: { num: '100%', label: 'Client Satisfaction' },
      stat3: { num: '< 1s', label: 'Avg Load Time' }
    },
    contact: {
      overline: 'GET IN TOUCH',
      title: 'Let\'s Build',
      sub: 'Ready to plant your monument on the web? Drop us a line.',
      name: 'Your Name',
      email: 'Email Address',
      message: 'Tell us about your project',
      send: 'SEND SIGNAL',
      info: 'hello@webcairn.fr'
    },
    footer: {
      tagline: 'Building digital monuments since 2021.',
      rights: 'All rights reserved.'
    }
  },
  fr: {
    nav: { services: 'Services', portfolio: 'Réalisations', about: 'À propos', contact: 'Contact' },
    hero: {
      overline: 'AGENCE DE DÉVELOPPEMENT WEB',
      headline: 'ON BÂTIT DES MONUMENTS DIGITAUX',
      sub: 'Stabilité dans un web chaotique. Nous créons des sites vitrines qui se dressent comme des cairns — simples, frappants, durables.',
      cta: 'Commencer l\'ascension',
      scroll: 'Défilez pour explorer'
    },
    services: {
      overline: 'CE QUE NOUS FAISONS',
      title: 'Services',
      items: [
        {
          title: 'Sites Vitrines',
          desc: 'Clairs, rapides, mémorables. Nous concevons et développons des sites vitrines mono ou multi-pages qui transforment les visiteurs en clients. Pas de superflu — que de la clarté.',
          tag: 'COEUR'
        },
        {
          title: 'Direction Artistique',
          desc: 'Chaque pixel raconte une histoire. Nous définissons votre identité visuelle — des palettes de couleurs aux systèmes typographiques — pour que votre marque parle avant vous.',
          tag: 'IDENTITÉ'
        },
        {
          title: 'Motion & Interaction',
          desc: 'Le statique est mort. Nous ajoutons des animations et micro-interactions significatives qui donnent vie à votre site sans sacrifier la performance.',
          tag: 'SAVOIR-FAIRE'
        },
        {
          title: 'SEO & Performance',
          desc: 'Le beau ne sert à rien s\'il est invisible. Nous optimisons chaque site pour les moteurs de recherche et la vitesse.',
          tag: 'VISIBILITÉ'
        }
      ]
    },
    portfolio: {
      overline: 'TRAVAUX SÉLECTIONNÉS',
      title: 'Réalisations',
      projects: [
        { name: 'Maison Aurore', type: 'Studio de Design Intérieur', year: '2024' },
        { name: 'Alpiniste Coffee', type: 'Marque de Café de Spécialité', year: '2024' },
        { name: 'Atelier Verre', type: 'Artisan Verrier', year: '2023' },
        { name: 'Nordic Trails', type: 'Agence de Voyages d\'Aventure', year: '2023' },
        { name: 'Jardin Sonore', type: 'Festival de Musique', year: '2023' }
      ]
    },
    about: {
      overline: 'QUI SOMMES-NOUS',
      title: 'Les Architectes',
      p1: 'WebCairn est né d\'une conviction simple : le web a trop de bruit et pas assez de savoir-faire. Nous sommes une petite équipe de designers et développeurs basée en France, obsédés par les détails.',
      p2: 'Comme les cairns qui guident les randonneurs dans le brouillard, nous construisons des repères digitaux — des structures simples qui montrent le chemin. Pas de bases de données, pas de systèmes de paiement, pas de complexité inutile. Juste des sites beaux, rapides et utiles.',
      stat1: { num: '47+', label: 'Projets Livrés' },
      stat2: { num: '100%', label: 'Satisfaction Client' },
      stat3: { num: '< 1s', label: 'Temps de Chargement Moyen' }
    },
    contact: {
      overline: 'NOUS CONTACTER',
      title: 'Construisons',
      sub: 'Prêt à planter votre monument sur le web ? Écrivez-nous.',
      name: 'Votre Nom',
      email: 'Adresse Email',
      message: 'Parlez-nous de votre projet',
      send: 'ENVOYER LE SIGNAL',
      info: 'hello@webcairn.fr'
    },
    footer: {
      tagline: 'On bâtit des monuments digitaux depuis 2021.',
      rights: 'Tous droits réservés.'
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
