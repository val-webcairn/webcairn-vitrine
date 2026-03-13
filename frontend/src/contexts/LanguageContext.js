import React, { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    nav: { services: 'Services', portfolio: 'Portfolio', pricing: 'Pricing', aides: 'Grants', contact: 'Contact' },
    hero: {
      overline: 'SHOWCASE WEBSITE CREATION',
      headline: 'YOUR SHOWCASE SITE, STONE BY STONE',
      sub: 'I design and develop showcase websites for artisans and restaurant owners. Clean, fast, memorable — built to last like a cairn.',
      cta: 'Lay the first stone',
      scroll: 'Scroll to explore'
    },
    services: {
      overline: 'WHAT I DO',
      title: 'Services',
      link: 'See pricing →',
      items: [
        {
          title: 'Showcase Website Creation',
          desc: 'From design to deployment, I build your complete online presence. Responsive design, professional visuals, contact forms, Google Maps integration, SEO-optimized — everything you need to convert visitors into customers.',
          tag: 'CORE',
          features: ['Custom responsive design', 'Contact form & Maps', 'Basic SEO optimization', 'Performance & speed', 'Mobile-first approach', 'Content management', 'GDPR Compliance included']
        }
      ]
    },
    portfolio: {
      overline: 'SELECTED WORK',
      title: 'Portfolio',
      projects: [
        { name: 'La Fournée d\'Or', type: 'Artisan Bakery — Aix-en-Provence', year: '2025', desc: 'A warm, inviting showcase site for a traditional Provençal bakery. Online ordering and product gallery.', badge: 'Fictitious Site' },
        { name: 'Le Mas Provençal', type: 'Gourmet Restaurant — Aix-en-Provence', year: '2025', desc: 'A fine dining experience in the heart of Aix. Provençal market cuisine by chef Marc Vidal, online menu and booking.', link: 'https://lemasprovencal.netlify.app/', badge: 'Fictitious Site' },
        { name: 'Atelier Terre & Feu', type: 'Ceramic Artisan — Nice', year: '2024', desc: 'A refined portfolio for a ceramist. Workshop showcase, custom orders, and artisan story.', badge: 'Fictitious Site' },
        { name: 'Pizzeria Da Marco', type: 'Artisan Pizzeria — Toulon', year: '2024', desc: 'A vibrant site for an artisan pizzeria. Menu, online ordering, and customer reviews.', badge: 'Fictitious Site' }
      ]
    },

    pricing: {
      overline: 'PRICING',
      title: 'Pricing',
      sub: 'Packages designed for artisans and small businesses. Every project includes a free, personalized quote.',
      plans: [
        {
          name: 'Essential',
          price: '400 – 600€',
          desc: 'The ideal start for your online presence.',
          features: ['One-page website', 'Responsive design', 'Contact form', 'Basic SEO', 'Google Maps integration', 'GDPR compliant site & legal notices included', 'Delivery in 2 weeks'],
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
      note: 'All prices are tax-inclusive (auto-entrepreneur, VAT-exempt).'
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
          link: 'https://www.francenum.gouv.fr/aides-financieres'
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
      ctaLink: 'https://www.francenum.gouv.fr/aides-financieres',
      ctaSub: 'Free and no-obligation.'
    },
    contact: {
      overline: 'GET IN TOUCH',
      title: 'Let\'s Build',
      sub: 'Tell me about your project and I\'ll get back to you within 48 hours.',
      name: 'Your Name',
      email: 'Email Address',
      activity: 'Your Activity',
      activityPlaceholder: 'e.g. Baker, Restaurant, Craftsman...',
      message: 'Tell me about your project',
      send: 'Send my request',
      successTitle: 'Message sent!',
      successDesc: 'Your message has been successfully sent.',
      errorTitle: 'Error sending',
      errorDesc: 'An error occurred while sending your message.',
      info: 'contact@webcairn.fr',
      gdprText: 'Your data is used solely to respond to your request. See our ',
      gdprLink: 'Legal Notice'
    },
    footer: {
      tagline: 'Showcase websites for artisans and restaurant owners.',
      rights: 'All rights reserved.',
      legal: 'Legal Notice',
      nav: { services: 'Services', portfolio: 'Portfolio', pricing: 'Pricing', contact: 'Contact' }
    },
    legal: {
      title: 'Legal Notice',
      editor: 'Website Editor',
      editorContent: 'Lilian Valette — Micro-entreprise (Individual Entrepreneur)\nSIRET: 10201852000019\nCommercial Name: WebCairn\nAddress: 139 Bis Chemin de la Bonde, 13120 Gardanne, France\nEmail: contact@webcairn.fr\nPublication Director: Lilian Valette\nVAT not applicable — art. 293 B of CGI (basic exemption)',
      host: 'Hosting',
      hostContent: 'Netlify, Inc.\n512 2nd Street, Suite 200\nSan Francisco, CA 94107, USA\nhttps://www.netlify.com',
      ip: 'Intellectual Property',
      ipContent: 'All content on this site (texts, images, graphics, logo) is the property of Lilian Valette / WebCairn and is protected by intellectual property laws. Any reproduction without prior authorization is prohibited.',
      data: 'Personal Data & GDPR',
      dataContent: 'Data collected via the contact form (name, email, message) is used solely to respond to your request. It is kept for a maximum of 12 months. No data is sold or shared with third parties. In accordance with the GDPR, you have the right to access, rectify, and delete your data by contacting contact@webcairn.fr. You also have the right to lodge a complaint with the CNIL (www.cnil.fr).',
      cookies: 'Cookies',
      cookiesContent: 'This site does not use tracking cookies or third-party analytics tools.',
      close: 'Close'
    }
  },
  fr: {
    nav: { services: 'Services', portfolio: 'Réalisations', pricing: 'Tarifs', aides: 'Aides', contact: 'Contact' },
    hero: {
      overline: 'CRÉATION DE SITES VITRINES',
      headline: 'VOTRE SITE VITRINE, PIERRE APRÈS PIERRE',
      sub: 'Je conçois et développe des sites vitrines pour artisans et restaurateurs. Clairs, rapides, mémorables — bâtis pour durer comme un cairn.',
      cta: 'Poser la première pierre',
      scroll: 'Défilez pour explorer'
    },
    services: {
      overline: 'CE QUE JE FAIS',
      title: 'Services',
      link: 'Voir les tarifs →',
      items: [
        {
          title: 'Création de Sites Vitrines',
          desc: 'Du design au déploiement, je construis votre présence en ligne pour que vos prochains clients vous trouvent sur Google et vous contactent directement depuis leur téléphone.',
          tag: 'CŒUR DE MÉTIER',
          features: ['Design responsive sur mesure', 'Formulaire de contact & Maps', 'Optimisation SEO de base', 'Performance & rapidité', 'Approche mobile-first', 'Mise en ligne & déploiement', 'Conformité RGPD incluse']
        }
      ]
    },
    portfolio: {
      overline: 'RÉALISATIONS',
      title: 'Portfolio',
      projects: [
        { name: 'La Fournée d\'Or', type: 'Boulangerie artisanale — Aix-en-Provence', year: '2025', desc: 'Un site vitrine chaleureux pour une boulangerie provençale traditionnelle. Commande en ligne et galerie produits.', badge: 'Site Fictif' },
        { name: 'Le Mas Provençal', type: 'Restaurant gastronomique — Aix-en-Provence', year: '2025', desc: 'Une table gastronomique au cœur d\'Aix. Cuisine provençale du marché par le chef Marc Vidal, réservations et menu en ligne.', link: 'https://lemasprovencal.netlify.app/', badge: 'Site Fictif' },
        { name: 'Atelier Terre & Feu', type: 'Céramiste artisan — Nice', year: '2024', desc: 'Un portfolio raffiné pour un céramiste. Vitrine d\'atelier, commandes personnalisées et histoire artisanale.', badge: 'Site Fictif' },
        { name: 'Pizzeria Da Marco', type: 'Pizzeria artisanale — Toulon', year: '2024', desc: 'Un site vibrant pour une pizzeria artisanale. Carte, commande en ligne et avis clients.', badge: 'Site Fictif' }
      ]
    },

    pricing: {
      overline: 'TARIFS',
      title: 'Tarifs',
      sub: 'Des formules pensées pour les artisans et TPE. Chaque projet fait l\'objet d\'un devis personnalisé et gratuit.',
      plans: [
        {
          name: 'Essentiel',
          price: '400 – 600€',
          desc: 'Le départ idéal pour votre présence en ligne.',
          features: ['Site one-page', 'Design responsive', 'Formulaire de contact', 'SEO de base', 'Intégration Google Maps', 'Site conforme RGPD & mentions légales incluses', 'Livraison en 2 semaines'],
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
      note: 'Tous les prix sont TTC (auto-entrepreneur, TVA non applicable).'
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
          link: 'https://www.francenum.gouv.fr/aides-financieres'
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
      ctaLink: 'https://www.francenum.gouv.fr/aides-financieres',
      ctaSub: 'Gratuit et sans engagement'
    },
    contact: {
      overline: 'CONTACT',
      title: 'Construisons',
      sub: 'Parlez-moi de votre projet et je vous recontacte sous 48h.',
      name: 'Votre Nom',
      email: 'Adresse Email',
      activity: 'Votre Activité',
      activityPlaceholder: 'ex. Boulanger, Restaurateur, Artisan...',
      message: 'Parlez-moi de votre projet',
      send: 'Envoyer ma demande',
      successTitle: 'Message envoyé !',
      successDesc: 'Votre message a bien été envoyé.',
      errorTitle: 'Erreur d\'envoi',
      errorDesc: 'Une erreur s\'est produite lors de l\'envoi de votre message.',
      info: 'contact@webcairn.fr',
      gdprText: 'Vos données sont utilisées uniquement pour répondre à votre demande. Voir nos ',
      gdprLink: 'Mentions légales'
    },
    footer: {
      tagline: 'Sites vitrines pour artisans et restaurateurs.',
      rights: 'Tous droits réservés.',
      legal: 'Mentions légales',
      nav: { services: 'Services', portfolio: 'Réalisations', pricing: 'Tarifs', contact: 'Contact' }
    },
    legal: {
      title: 'Mentions Légales',
      editor: 'Éditeur du site',
      editorContent: 'Lilian Valette — Micro-entreprise (Entrepreneur Individuel)\nSIRET : 10201852000019\nNom commercial : WebCairn\nAdresse : 139 Bis Chemin de la Bonde, 13120 Gardanne, France\nEmail : contact@webcairn.fr\nDirecteur de la publication : Lilian Valette\nTVA non applicable — art. 293 B du CGI (franchise en base)',
      host: 'Hébergement',
      hostContent: 'Netlify, Inc.\n512 2nd Street, Suite 200\nSan Francisco, CA 94107, USA\nhttps://www.netlify.com',
      ip: 'Propriété intellectuelle',
      ipContent: 'L\'ensemble du contenu de ce site (textes, images, graphismes, logo) est la propriété de Lilian Valette / WebCairn et est protégé par les lois relatives à la propriété intellectuelle. Toute reproduction sans autorisation préalable est interdite.',
      data: 'Données personnelles & RGPD',
      dataContent: 'Les données collectées via le formulaire de contact (nom, email, message) sont utilisées uniquement pour répondre à votre demande. Elles sont conservées pendant une durée maximale de 12 mois. Aucune donnée n\'est vendue ni partagée avec des tiers. Conformément au RGPD, vous disposez d\'un droit d\'accès, de rectification et de suppression de vos données en contactant contact@webcairn.fr. Vous disposez également du droit d\'introduire une réclamation auprès de la CNIL (www.cnil.fr).',
      cookies: 'Cookies',
      cookiesContent: 'Ce site n\'utilise pas de cookies de suivi ni d\'outils d\'analyse tiers.',
      close: 'Fermer'
    }
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [isLegalOpen, setLegalOpen] = useState(false);
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
    <LanguageContext.Provider value={{ lang, toggleLang, t, isLegalOpen, setLegalOpen }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLang must be used within LanguageProvider');
  return context;
};
