import React, { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    nav: { services: 'Services', portfolio: 'Portfolio', pricing: 'Pricing', aides: 'Grants', contact: 'Contact' },
    hero: {
      overline: 'SHOWCASE WEBSITE CREATION',
      headline: 'YOUR SHOWCASE SITE, STONE BY STONE',
      sub: 'Showcase websites laid stone by stone — solid, visible, built to last.',
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
          price: '490 €',
          desc: 'The ideal start for your online presence.',
          features: ['One-page website', 'Responsive design', 'Contact form', 'Google Maps integration', 'GDPR compliance', 'Basic SEO', 'Delivery in 2 weeks'],
          cta: 'Choose Essential'
        },
        {
          name: 'Ascension',
          price: '990 €',
          desc: 'A more complete site to stand out.',
          features: ['Multi-page site (up to 5)', 'Advanced custom design', 'Photo gallery', 'Social media integration', 'GDPR compliance', 'Advanced SEO', 'Delivery in 3–4 weeks'],
          cta: 'Choose Ascension'
        }
      ],
      note: 'All prices are tax-inclusive (auto-entrepreneur, VAT-exempt).',
      fromLabel: 'Starting at',
      addonsTitle: 'ADD-ONS',
      addonsHeading: 'Options',
      addonsSub: 'Enhance your package with one or more add-ons. They can be included at the time of your quote or added at any point after your site goes live.',
      viewAllBtn: 'View complete options & prices',
      addons: [
        { name: 'Additional Page', desc: 'Beyond the chosen package, per extra page', price: '120 €' },
        { name: 'Photo Gallery', desc: 'For the Essential package — professional lightbox gallery', price: '180 €' },
        { name: 'Customer Reviews Section', desc: 'Google reviews or formatted client testimonials', price: '150 €' },
        { name: 'Restaurant Menu', desc: 'Menu page with sections, descriptions, and prices', price: '200 €' },
        { name: 'Online Booking', desc: 'Reservation widget integration (Calendly, etc.)', price: '120 €' },
        { name: 'Promotional Banner', desc: 'News banner or easily modifiable special offer', price: '90 €' },
        { name: 'Presentation Video', desc: 'YouTube / Vimeo video integration on the homepage', price: '80 €' },
        { name: 'Multilingual (2 languages)', desc: 'FR + EN version or any other language', price: '350 €' },
        { name: 'Light / Dark Theme', desc: 'Design with automatic/manual Dark Mode toggle', price: '150 €' }
      ],
      maintenance: {
        overline: 'MONTHLY MAINTENANCE',
        heading: 'Maintenance',
        terms: 'Subscriptions run on an annual basis, billed monthly, and can be cancelled with one month\'s notice before the annual renewal date.',
        plans: [
          {
            name: 'Essential Plan',
            monthlyPrice: '29 €/month',
            yearlyPrice: '348 €/year',
            commitment: '12-month commitment',
            features: [
              { title: 'Hosting & domain name', desc: 'Managed by WebCairn — you remain the owner, transferable at any time' },
              { title: 'Security updates', desc: 'Monitoring and fixes applied regularly' },
              { title: 'Monthly backups', desc: 'Full website backup every month' },
              { title: '1 minor update / month', desc: 'Text, photo, opening hours, prices — excluding redesign or new page' }
            ]
          },
          {
            name: 'Serenity Plan',
            monthlyPrice: '49 €/month',
            yearlyPrice: '588 €/year',
            commitment: '12-month commitment',
            features: [
              { title: 'Everything in Essential plan', desc: 'Hosting, domain, security, backups' },
              { title: 'Weekly backups', desc: 'Full backup every week' },
              { title: '3 minor updates / month', desc: 'Text, photo, opening hours, prices — excluding redesign or new page' },
              { title: 'Monthly performance report', desc: 'Traffic, Google positioning' }
            ]
          }
        ],
        reportExampleText: 'Example of the monthly SEO report delivered to clients subscribed to the €49/month plan.',
        reportDownloadLabel: 'Download sample report'
      },
      quote: {
        overline: 'QUOTE BUILDER',
        heading: 'Generate Your Quote',
        sub: 'Build an initial estimate in a few clicks. This preview is indicative and will be refined during the final personalized quote.',
        packageLabel: 'Website Package',
        addonsLabel: 'Add-ons',
        maintenanceLabel: 'Maintenance Subscription (optional)',
        noneLabel: 'No maintenance plan',
        summaryTitle: 'Estimate Summary',
        selectedLabel: 'Selected items',
        oneTimeTotalLabel: 'One-time project total',
        monthlyTotalLabel: 'Estimated monthly total',
        yearlyTotalLabel: 'Estimated yearly total',
        cta: 'Request this quote by email',
        note: 'This estimate is provided for guidance only and does not replace a contractual quote.'
      }
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
      close: 'Close'
    }
  },
  fr: {
    nav: { services: 'Services', portfolio: 'Réalisations', pricing: 'Tarifs', aides: 'Aides', contact: 'Contact' },
    hero: {
      overline: 'CRÉATION DE SITES VITRINES',
      headline: 'VOTRE SITE VITRINE, PIERRE APRÈS PIERRE',
      sub: 'Des sites vitrines posés pierre après pierre — solides, visibles, faits pour durer.',
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
          price: '490 €',
          desc: 'Le départ idéal pour votre présence en ligne.',
          features: ['Site one-page', 'Design responsive', 'Formulaire de contact', 'Intégration Google Maps', 'Conformité RGPD', 'SEO de base', 'Livraison en 2 semaines'],
          cta: 'Choisir Essentiel'
        },
        {
          name: 'Ascension',
          price: '990 €',
          desc: 'Un site plus complet pour vous démarquer.',
          features: ['Site multi-pages (jusqu\'à 5)', 'Design personnalisé avancé', 'Galerie photos', 'Intégration réseaux sociaux', 'Conformité RGPD', 'SEO avancé', 'Livraison en 3–4 semaines'],
          cta: 'Choisir Ascension'
        }
      ],
      note: 'Tous les prix sont TTC (auto-entrepreneur, TVA non applicable).',
      fromLabel: 'À partir de',
      addonsTitle: 'OPTIONS À LA CARTE',
      addonsHeading: 'Options',
      addonsSub: 'Complétez votre forfait avec une ou plusieurs options. Elles s\'ajoutent au moment du devis ou à tout moment après la mise en ligne de votre site.',
      viewAllBtn: 'Voir la liste complète des prix et options',
      addons: [
        { name: 'Page supplémentaire', desc: 'Au-delà du forfait choisi, par page additionnelle', price: '120 €' },
        { name: 'Galerie photos', desc: 'Pour le forfait Essentiel — galerie avec lightbox professionnelle', price: '180 €' },
        { name: 'Section avis clients', desc: 'Avis Google ou témoignages clients mis en forme', price: '150 €' },
        { name: 'Menu / carte restaurant', desc: 'Page carte avec sections, descriptions et tarifs', price: '200 €' },
        { name: 'Réservation en ligne', desc: 'Intégration d\'un widget de réservation (Calendly, etc.)', price: '120 €' },
        { name: 'Bandeau promotionnel', desc: 'Bannière d\'actualité ou offre spéciale facilement modifiable', price: '90 €' },
        { name: 'Vidéo de présentation', desc: 'Intégration d\'une vidéo YouTube / Vimeo en page d\'accueil', price: '80 €' },
        { name: 'Multilingue (2 langues)', desc: 'Version FR + EN ou toute autre langue', price: '350 €' },
        { name: 'Thème Clair / Sombre', desc: 'Option de bascule automatique/manuelle du mode inversé', price: '150 €' }
      ],
      maintenance: {
        overline: 'MAINTENANCE MENSUELLE',
        heading: 'Maintenance',
        terms: 'Les abonnements sont souscrits à l\'année, réglés mensuellement, et résiliables avec un préavis d\'un mois avant l\'échéance annuelle.',
        plans: [
          {
            name: 'Plan ESSENTIEL',
            monthlyPrice: '29 €/mois',
            yearlyPrice: '348 €/an',
            commitment: 'Engagement 12 mois',
            features: [
              { title: 'Hébergement & nom de domaine', desc: 'Géré par WebCairn — vous restez propriétaire, transférable à tout moment' },
              { title: 'Mises à jour de sécurité', desc: 'Surveillance et correctifs appliqués régulièrement' },
              { title: 'Sauvegardes mensuelles', desc: 'Sauvegarde complète du site chaque mois' },
              { title: '1 modification mineure / mois', desc: 'Texte, photo, horaires, tarif — hors refonte ou nouvelle page' }
            ]
          },
          {
            name: 'Plan SÉRÉNITÉ',
            monthlyPrice: '49 €/mois',
            yearlyPrice: '588 €/an',
            commitment: 'Engagement 12 mois',
            features: [
              { title: 'Tout le plan Essentiel', desc: 'Hébergement, domaine, sécurité, sauvegardes' },
              { title: 'Sauvegardes hebdomadaires', desc: 'Sauvegarde complète chaque semaine' },
              { title: '3 modifications mineures / mois', desc: 'Texte, photo, horaires, tarif — hors refonte ou nouvelle page' },
              { title: 'Rapport de performance mensuel', desc: 'Fréquentation, positionnement Google' }
            ]
          }
        ],
        reportExampleText: 'Exemple de rapport SEO mensuel transmis aux clients de l\'offre à 49 €/mois.',
        reportDownloadLabel: 'Télécharger un exemple de rapport'
      },
      quote: {
        overline: 'GÉNÉRATEUR DE DEVIS',
        heading: 'Générer Votre Devis',
        sub: 'Construisez une première estimation en quelques clics. Cette prévision est indicative et sera affinée lors du devis personnalisé final.',
        packageLabel: 'Forfait site',
        addonsLabel: 'Options à la carte',
        maintenanceLabel: 'Abonnement maintenance (optionnel)',
        noneLabel: 'Sans abonnement maintenance',
        summaryTitle: 'Récapitulatif estimatif',
        selectedLabel: 'Éléments sélectionnés',
        oneTimeTotalLabel: 'Total projet (paiement unique)',
        monthlyTotalLabel: 'Total mensuel estimé',
        yearlyTotalLabel: 'Total annuel estimé',
        cta: 'Demander ce devis par email',
        note: 'Cette estimation est fournie à titre indicatif et ne remplace pas un devis contractuel.'
      }
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
