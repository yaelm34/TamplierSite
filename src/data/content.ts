// ============================================================
//  CONTENU CENTRALISÉ — TAMPLIER AUTO SOURCING
//  Bilingue FR / EN. Toute la copie éditoriale du site vit ici.
//
//  - `site`   : identité (langue-indépendante)
//  - `brands` : réseau de constructeurs (noms propres, partagés)
//  - `legal`  : identifiants légaux FR (partagés)
//  - getContent(locale) : renvoie le pack FR ou EN (via Astro.currentLocale)
// ============================================================

export type Locale = 'fr' | 'en';
export const locales: Locale[] = ['fr', 'en'];
export const defaultLocale: Locale = 'fr';

// --- Identité, langue-indépendante -------------------------------------------
export const site = {
  name: 'TAMPLIER AUTO SOURCING',
  shortName: 'TAS',
  legalName: 'TAMPLIER AUTO SOURCING SASU',
  city: 'Montpellier',
  url: 'https://www.tamplierautosourcing.fr',
  email: 'contact@tamplierautosourcing.com',
  phone: '06 40 30 78 77',
  phoneIntl: '+33640307877',
  address: {
    street: '278 Rue Alexandra David Neel',
    postalCode: '34730',
    locality: 'Prades-le-Lez',
    region: 'Montpellier',
    country: 'FR',
  },
  founder: 'TAMPLIER Anthony',
  // Pas de `socials` : les liens LinkedIn / Instagram / Facebook pointaient vers
  // les pages d'accueil des plateformes, pas vers de vrais comptes. Affichés, ils
  // menaient l'internaute dans le vide ; injectés dans le `sameAs` du JSON-LD, ils
  // affirmaient à Google une identité que rien ne confirmait. Le jour où les vrais
  // comptes existent, les remettre ICI suffit — et penser à réalimenter `sameAs`
  // dans Base.astro, qui est le seul endroit où ça compte pour le référencement.
} as const;

// --- Réseau de constructeurs (noms propres, partagés) ------------------------
export const brands = [
  'Porsche',
  'Aston Martin',
  'Ferrari',
  'Lamborghini',
  'Audi RS',
  'Mercedes-AMG',
  'BMW M',
  'McLaren',
  'Bentley',
  'Maserati',
];

// --- Identifiants légaux FR (partagés) ---------------------------------------
export const legal = {
  companyLine:
    'TAMPLIER AUTO SOURCING – SASU au capital de 1 000 € – Siège social : 278 Rue Alexandra David Neel, 34730 Prades-le-Lez – 106 997 695 RCS de Montpellier – SIRET 106 997 695 00015 – TVA FR181069976965 – Code APE : 4511Z (Commerce de voitures automobiles)',
  capital: '1 000 €',
  rcs: '106 997 695 RCS de Montpellier',
  siret: '106 997 695 00015',
  tva: 'FR181069976965',
  ape: '4511Z (Commerce de voitures automobiles)',
};

// =============================================================================
//  PACK FRANÇAIS
// =============================================================================
const fr = {
  htmlLang: 'fr',
  ogLocale: 'fr_FR',

  seo: {
    // Mot-clé + ville EN TÊTE, marque en fin. Google n'affiche qu'une soixantaine
    // de caractères : l'ancien titre commençait par 22 caractères de nom de marque
    // — que personne ne cherche encore — et « Montpellier » tombait dans la partie
    // tronquée, alors que c'est le mot-clé local qui fait venir les clients.
    title:
      'Mandataire automobile premium à Montpellier | TAMPLIER AUTO SOURCING',
    // ~155 caractères : au-delà, Google coupe. L'ancienne version en faisait 192,
    // la promesse « 100 % sur mesure » n'était jamais visible dans les résultats.
    description:
      "Mandataire automobile à Montpellier : je source, audite, négocie et sécurise votre véhicule premium, sportif ou d'exception en France et en Europe.",
    ogAlt: 'TAMPLIER AUTO SOURCING — mandataire automobile premium',
    // Libellé de la prestation pour le JSON-LD (schema.org/Service).
    serviceType: 'Mandataire automobile — sourcing, audit, négociation et import de véhicules premium',
    keywords:
      "mandataire automobile, sourcing automobile, voiture premium, voiture sportive, voiture d'exception, import automobile Europe, achat véhicule Allemagne, mandataire Montpellier, Porsche, Ferrari, Lamborghini, Aston Martin",
  },

  nav: [
    { label: 'Concept', href: '#concept' },
    { label: 'Méthode', href: '#methode' },
    { label: 'Offres', href: '#offres' },
    { label: 'Garanties', href: '#confiance' },
    { label: 'Contact', href: '#contact' },
  ],

  cta: {
    primary: { label: 'Démarrer mon projet', href: '#contact' },
    secondary: { label: 'Découvrir la méthode', href: '#methode' },
  },

  hero: {
    eyebrow: 'Mandataire automobile · Montpellier',
    titleTop: "L'art du sourcing",
    titleAccent: 'automobile.',
    lead:
      "Recherche, audit, négociation et livraison de véhicules premium, sportifs et d'exception — en France et en Europe.",
    marquee: ['Sourcing', 'Audit', 'Négociation', 'Import', 'Livraison', 'Garantie', 'Sur mesure'],
  },

  manifesto: {
    text: "Dénicher la perle rare n'est pas une question de chance. C'est une méthode, un réseau, une exigence.",
    goldWords: ['méthode', 'réseau', 'exigence'],
    author: 'Anthony Tamplier — Fondateur',
  },

  concept: {
    eyebrow: 'La maison',
    index: '01',
    title: 'Le Concept',
    lead: "Une voiture d'exception ne se cherche pas seul.",
    paragraphs: [
      "Vous avez le projet d'acquérir une sportive ou une premium ? J'active mon réseau en France et en Europe pour dénicher, auditer, négocier et sécuriser votre futur véhicule.",
      "Un accompagnement 100 % sur mesure — de l'expression de votre besoin jusqu'à la remise des clés.",
    ],
    stats: [
      { value: 2, suffix: '', label: 'Continents de sourcing', hint: 'France & Europe' },
      { value: 100, suffix: ' %', label: 'Sur mesure' },
      { value: 24, suffix: ' mois', label: 'Garantie possible' },
    ],
  },

  steps: {
    eyebrow: 'La méthode',
    index: '02',
    title: 'Quatre étapes, zéro compromis',
    items: [
      {
        n: '01',
        title: 'Le Brief',
        text: 'Vous me confiez vos critères précis — modèle, motorisation, finitions, options indispensables, budget. Un mandat de recherche exclusif est alors établi.',
        image: 'lebrief',
        alt: "Deux personnes attablées définissant le cahier des charges d'une Porsche 911 affichée à l'écran, illustration aquarelle",
      },
      {
        n: '02',
        title: 'La Recherche — Le Sourcing',
        text: "À partir des données inscrites sur le mandat, je source la perle rare parmi les meilleures opportunités du marché : réseaux officiels, concessions, partenaires européens.",
        image: 'recherche',
        alt: "Sourcing d'une Porsche 911 : relevé sur tablette au contact du véhicule, illustration aquarelle",
      },
      {
        n: '03',
        title: "L'Audit & la Négociation",
        text: "Analyse chirurgicale de l'historique complet du véhicule — Car Vertical, Histovec, suivi d'entretien constructeur, factures — et négociation rigoureuse du prix de vente dans votre intérêt.",
        image: 'audit',
        alt: "Audit technique d'une Porsche 911 : inspection tablette en main et fiche de contrôle, illustration aquarelle",
      },
      {
        n: '04',
        title: 'La Livraison',
        text: 'Prise en main de votre véhicule avec gestion complète des démarches administratives — quitus fiscal, immatriculation provisoire WW. Véhicule révisé, garanti et prêt à rouler, clés en main. Livraison à domicile disponible sur devis.',
        image: 'livraison',
        alt: "Remise des clés : poignée de main devant une Porsche 911 sur son camion porte-voiture, illustration aquarelle",
      },
    ],
  },

  offers: {
    eyebrow: 'Accompagnement',
    index: '03',
    title: 'Trois formules, une exigence',
    intro: 'Choisissez la profondeur de recherche à la mesure de votre projet.',
    packs: [
      {
        name: 'Pack Executive',
        price: '1 990 € TTC',
        tag: 'Recherche idéale en France',
        featured: false,
        features: [
          'Sourcing ciblé selon mandat',
          'Audit historique et technique complet',
          'Négociation rigoureuse du prix de vente',
          "Démarches d'immatriculation française (carte grise / malus)",
          'Activation des garanties (garantie constructeur ou extension panne mécanique de 6 à 24 mois)',
        ],
      },
      {
        name: 'Pack Premium',
        price: '2 990 € TTC',
        tag: "Le choix de l'exigence européenne (Allemagne, Suède, Italie…)",
        featured: true,
        badge: 'Le plus choisi',
        inherit: "Inclut l'intégralité du Pack Executive, enrichi de :",
        features: [
          'Sourcing élargi aux réseaux officiels des constructeurs européens',
          'Négociation européenne internationale',
          'Gestion totale des formalités d’importation (quitus fiscal, plaques WW provisoires)',
          'Transfert et sécurisation de la garantie européenne constructeur',
        ],
      },
      {
        name: 'Pack Prestige',
        price: 'Sur devis',
        priceNote: 'minimum 3 % de la valeur du véhicule',
        tag: "Véhicules d'exception, supercars et modèles rares (Ferrari, Lamborghini, Aston Martin, Porsche…)",
        featured: false,
        intro:
          "Destiné aux véhicules d'une valeur supérieure à 200 000 € ou hautement spécifiques.",
        features: [
          "Audit ultra-poussé de la traçabilité et de l'état d'origine",
          'Prestation personnalisée selon la complexité du dossier',
        ],
      },
    ],
    deliveryNote: {
      title: 'Livraison & convoyage',
      text: "Les frais de transport et de rapatriement du véhicule ne sont pas inclus dans les packs. Les livraisons par chauffeur sont facturées sur la base d'un forfait kilométrique de 0,70 € TTC par kilomètre parcouru entre le lieu de départ du véhicule et le lieu de livraison (carburant et péages inclus). Pour un transport par camion-plateau, un devis personnalisé est établi.",
    },
    choosePremium: 'Choisir Premium',
    requestQuote: 'Demander un devis',
  },

  partnership: {
    eyebrow: 'Partenariat exclusif',
    index: '04',
    brandA: 'TAMPLIER AUTO SOURCING',
    brandB: 'SKYN WRAP',
    title: 'Protection carrosserie PPF',
    paragraphs: [
      "Une protection intégrale de votre carrosserie peut vous être proposée par notre partenaire spécialisé SKYN WRAP. Le film de protection de carrosserie (PPF) protège idéalement votre véhicule contre les impacts de gravillons, les aléas du temps, les rayures du quotidien et les chocs légers.",
      "Grâce à ce procédé haut de gamme, votre automobile conserve tout son éclat et sa valeur d'origine au fil des années.",
    ],
    note: 'Tarif : à déterminer sur devis personnalisé. Prestation réalisée avant la livraison si souhaité.',
    artAlt: 'Véhicule premium protégé par film PPF, illustration aquarelle',
  },

  trust: {
    eyebrow: 'Notre engagement',
    index: '05',
    title: 'Sécurité, confiance & transparence',
    items: [
      {
        icon: 'shield',
        title: 'Garantie panne',
        text: "Tous nos véhicules bénéficient de la garantie constructeur en cours de validité ou d'une extension de garantie panne mécanique européenne complète de 6 à 24 mois.",
      },
      {
        icon: 'vault',
        title: 'Sécurisation absolue des fonds',
        text: "Pour une transparence totale, vous réglez le prix du véhicule par virement bancaire sécurisé directement à la concession vendeuse. Aucun fonds destiné à l'achat de la voiture ne transite par notre entreprise. Nos honoraires font l'objet d'une facturation distincte.",
      },
      {
        icon: 'route',
        title: 'Livraison sur-mesure',
        text: 'La mise en main se fait selon votre préférence : à notre agence, dans les ateliers de notre partenaire SKYN WRAP, ou directement à votre domicile (convoyage personnalisé sur devis).',
      },
      {
        icon: 'handshake',
        title: 'Honoraires de performance',
        text: "Intégrés au mandat de recherche, des honoraires de performance équivalents à 50 % de la remise obtenue sur le prix d'affichage sont appliqués. Si le prix est non négociable (prix plancher), aucun frais supplémentaire n'est appliqué : seul le forfait de votre pack est dû.",
      },
    ],
  },

  contact: {
    eyebrow: 'Prenons contact',
    title: 'Un projet ?',
    titleAccent: 'Parlons-en.',
    intro: 'Décrivez votre projet en quelques mots. Réponse personnelle sous 24 heures.',
    packOptions: ['Executive', 'Premium', 'Prestige', 'Je ne sais pas encore'],
    fields: {
      successTitle: 'Message envoyé',
      successText: 'Merci. Votre demande a bien été transmise — je reviens vers vous très vite.',
      errorText: "L'envoi a échoué. Vous pouvez me joindre directement par téléphone ou e-mail.",
    },
  },

  legalPages: {
    back: "Retour à l'accueil",
  },

  // Dictionnaire d'interface (libellés inline hors copie éditoriale)
  ui: {
    founderRole: 'Fondateur & Dirigeant',
    skipLink: 'Aller au contenu principal',
    homeAria: 'accueil',
    navMain: 'Navigation principale',
    navMobile: 'Navigation mobile',
    navSecondary: 'Navigation secondaire',
    menuOpen: 'Ouvrir le menu',
    menuClose: 'Fermer le menu',
    langLabel: 'English version',
    langCode: 'EN',
    scroll: 'Défiler',
    heroBannerAlt: "Véhicule d'exception, illustration aquarelle — TAMPLIER Auto Sourcing",
    conceptArtAlt: 'Aston Martin DB de profil, illustration aquarelle premium',
    conceptCaption: 'Aston Martin DB — profil',
    region: 'France & Europe',
    brandsAria: 'Réseau de constructeurs',
    brandsEyebrow: 'Un réseau activé en France & en Europe',
    contactInterlocutor: 'Interlocuteur',
    contactHeadOffice: 'Siège social',
    contactPhone: 'Téléphone',
    contactEmail: 'E-mail',
    fieldName: 'Nom',
    fieldEmail: 'E-mail',
    fieldPhone: 'Téléphone',
    fieldPack: 'Pack souhaité',
    fieldBudget: 'Budget',
    fieldVehicle: 'Véhicule recherché',
    fieldMessage: 'Message',
    formReply: 'Réponse personnelle sous 24 h.',
    formSubmit: 'Envoyer ma demande',
    formSending: 'Envoi en cours…',
    mailSubject: 'Demande de projet',
    mailOpening: 'Votre logiciel de messagerie va s’ouvrir…',
    mailToDefine: 'à définir',
    footerDesc:
      "Mandataire automobile spécialisé dans le sourcing de véhicules premium, sportifs et d'exception, en France et en Europe.",
    footerNav: 'Navigation',
    footerLegal: 'Mentions légales',
    footerPrivacy: 'Politique de confidentialité',
    footerContact: 'Contact',
    footerRights: 'Tous droits réservés.',
  },
};

// =============================================================================
//  PACK ANGLAIS
// =============================================================================
const en: typeof fr = {
  htmlLang: 'en',
  ogLocale: 'en_US',

  seo: {
    title:
      'Premium car buying agent in Montpellier | TAMPLIER AUTO SOURCING',
    description:
      'Independent car buying agent in Montpellier, France. I source, inspect, negotiate and secure your premium, sports or exceptional car across Europe.',
    ogAlt: 'TAMPLIER AUTO SOURCING — premium car buying agent',
    serviceType: 'Car buying agent — sourcing, audit, negotiation and import of premium vehicles',
    keywords:
      'car buying agent, car sourcing, premium car, sports car, exceptional car, luxury car import Europe, buy car from Germany, car agent France, Porsche, Ferrari, Lamborghini, Aston Martin',
  },

  nav: [
    { label: 'Concept', href: '#concept' },
    { label: 'Method', href: '#methode' },
    { label: 'Packages', href: '#offres' },
    { label: 'Guarantees', href: '#confiance' },
    { label: 'Contact', href: '#contact' },
  ],

  cta: {
    primary: { label: 'Start my project', href: '#contact' },
    secondary: { label: 'Discover the method', href: '#methode' },
  },

  hero: {
    eyebrow: 'Car buying agent · Montpellier, France',
    titleTop: 'The art of car',
    titleAccent: 'sourcing.',
    lead:
      'Search, inspection, negotiation and delivery of premium, sports and exceptional cars — across France and Europe.',
    marquee: ['Sourcing', 'Inspection', 'Negotiation', 'Import', 'Delivery', 'Warranty', 'Bespoke'],
  },

  manifesto: {
    text: 'Finding the rare gem is not a matter of luck. It is a method, a network, a standard.',
    goldWords: ['method', 'network', 'standard'],
    author: 'Anthony Tamplier — Founder',
  },

  concept: {
    eyebrow: 'The house',
    index: '01',
    title: 'The Concept',
    lead: 'An exceptional car should never be hunted alone.',
    paragraphs: [
      'Planning to acquire a sports or premium car? I activate my network across France and Europe to find, inspect, negotiate and secure your future vehicle.',
      'A fully bespoke service — from defining your brief to handing over the keys.',
    ],
    stats: [
      { value: 2, suffix: '', label: 'Sourcing regions', hint: 'France & Europe' },
      { value: 100, suffix: ' %', label: 'Bespoke' },
      { value: 24, suffix: ' months', label: 'Warranty available' },
    ],
  },

  steps: {
    eyebrow: 'The method',
    index: '02',
    title: 'Four steps, zero compromise',
    items: [
      {
        n: '01',
        title: 'The Brief',
        text: 'You entrust me with your exact criteria — model, engine, trim, must-have options, budget. An exclusive search mandate is then drawn up.',
        image: 'lebrief',
        alt: 'Two people at a table setting the brief for a Porsche 911 shown on screen, watercolour illustration',
      },
      {
        n: '02',
        title: 'The Search — Sourcing',
        text: 'From the criteria set out in the mandate, I source the rare gem among the best opportunities on the market: official networks, dealerships, European partners.',
        image: 'recherche',
        alt: 'Sourcing a Porsche 911: on-site assessment on a tablet, watercolour illustration',
      },
      {
        n: '03',
        title: 'Inspection & Negotiation',
        text: "A surgical analysis of the vehicle's full history — Car Vertical, Histovec, manufacturer service records, invoices — and rigorous negotiation of the sale price in your interest.",
        image: 'audit',
        alt: 'Technical audit of a Porsche 911: inspection with a tablet and a checklist, watercolour illustration',
      },
      {
        n: '04',
        title: 'Delivery',
        text: 'Handover of your vehicle with full management of administrative formalities — tax clearance, temporary WW registration. Serviced, warrantied and road-ready, keys in hand. Home delivery available on quote.',
        image: 'livraison',
        alt: 'Handover: a handshake beside a Porsche 911 on its car transporter, watercolour illustration',
      },
    ],
  },

  offers: {
    eyebrow: 'Service',
    index: '03',
    title: 'Three packages, one standard',
    intro: 'Choose the depth of search that matches your project.',
    packs: [
      {
        name: 'Executive Package',
        price: '€1,990 incl. VAT',
        tag: 'Ideal search within France',
        featured: false,
        features: [
          'Targeted sourcing per mandate',
          'Complete history and technical inspection',
          'Rigorous negotiation of the sale price',
          'French registration formalities (registration document / CO₂ tax)',
          'Warranty activation (manufacturer warranty or mechanical breakdown extension, 6 to 24 months)',
        ],
      },
      {
        name: 'Premium Package',
        price: '€2,990 incl. VAT',
        tag: 'The choice for European sourcing (Germany, Sweden, Italy…)',
        featured: true,
        badge: 'Most chosen',
        inherit: 'Includes the full Executive Package, enriched with:',
        features: [
          'Sourcing extended to the official networks of European manufacturers',
          'International European negotiation',
          'Full management of import formalities (tax clearance, temporary WW plates)',
          'Transfer and securing of the European manufacturer warranty',
        ],
      },
      {
        name: 'Prestige Package',
        price: 'On quote',
        priceNote: 'minimum 3% of the vehicle value',
        tag: 'Exceptional cars, supercars and rare models (Ferrari, Lamborghini, Aston Martin, Porsche…)',
        featured: false,
        intro: 'For vehicles worth over €200,000 or highly specific ones.',
        features: [
          'Ultra-deep audit of traceability and original condition',
          'Bespoke service tailored to the complexity of the case',
        ],
      },
    ],
    deliveryNote: {
      title: 'Delivery & transport',
      text: 'Transport and repatriation costs are not included in the packages. Driver deliveries are billed on a per-kilometre basis of €0.70 incl. VAT per kilometre driven between the vehicle pick-up point and the delivery location (fuel and tolls included). For transport by flatbed truck, a bespoke quote is drawn up.',
    },
    choosePremium: 'Choose Premium',
    requestQuote: 'Request a quote',
  },

  partnership: {
    eyebrow: 'Exclusive partnership',
    index: '04',
    brandA: 'TAMPLIER AUTO SOURCING',
    brandB: 'SKYN WRAP',
    title: 'PPF paint protection',
    paragraphs: [
      'Full bodywork protection can be offered through our specialist partner SKYN WRAP. Paint Protection Film (PPF) is the ideal shield for your vehicle against stone chips, weathering, everyday scratches and light impacts.',
      'Thanks to this premium process, your car keeps all its shine and original value over the years.',
    ],
    note: 'Pricing: to be determined on a bespoke quote. Applied before delivery if desired.',
    artAlt: 'Premium vehicle protected by PPF film, watercolour illustration',
  },

  trust: {
    eyebrow: 'Our commitment',
    index: '05',
    title: 'Security, trust & transparency',
    items: [
      {
        icon: 'shield',
        title: 'Breakdown warranty',
        text: 'Every vehicle comes with a valid manufacturer warranty or a complete European mechanical breakdown warranty extension of 6 to 24 months.',
      },
      {
        icon: 'vault',
        title: 'Absolute security of funds',
        text: 'For total transparency, you pay the vehicle price by secure bank transfer directly to the selling dealership. No funds intended to purchase the car ever pass through our company. Our fees are invoiced separately.',
      },
      {
        icon: 'route',
        title: 'Bespoke delivery',
        text: 'Handover takes place as you prefer: at our office, at our partner SKYN WRAP’s workshops, or directly at your home (bespoke transport on quote).',
      },
      {
        icon: 'handshake',
        title: 'Performance-based fees',
        text: 'Built into the search mandate, performance fees equal to 50% of the discount obtained on the list price apply. If the price is non-negotiable (floor price), no additional fee applies: only your package fee is due.',
      },
    ],
  },

  contact: {
    eyebrow: 'Get in touch',
    title: 'A project?',
    titleAccent: "Let's talk.",
    intro: 'Describe your project in a few words. A personal reply within 24 hours.',
    packOptions: ['Executive', 'Premium', 'Prestige', 'Not sure yet'],
    fields: {
      successTitle: 'Message sent',
      successText: 'Thank you. Your request has been received — I’ll get back to you very soon.',
      errorText: 'Sending failed. You can reach me directly by phone or email.',
    },
  },

  legalPages: {
    back: 'Back to home',
  },

  ui: {
    founderRole: 'Founder & Director',
    skipLink: 'Skip to main content',
    homeAria: 'home',
    navMain: 'Main navigation',
    navMobile: 'Mobile navigation',
    navSecondary: 'Secondary navigation',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    langLabel: 'Version française',
    langCode: 'FR',
    scroll: 'Scroll',
    heroBannerAlt: 'Exceptional vehicle, watercolour illustration — TAMPLIER Auto Sourcing',
    conceptArtAlt: 'Aston Martin DB in profile, premium watercolour illustration',
    conceptCaption: 'Aston Martin DB — profile',
    region: 'France & Europe',
    brandsAria: 'Network of manufacturers',
    brandsEyebrow: 'A network activated across France & Europe',
    contactInterlocutor: 'Your contact',
    contactHeadOffice: 'Head office',
    contactPhone: 'Phone',
    contactEmail: 'Email',
    fieldName: 'Name',
    fieldEmail: 'Email',
    fieldPhone: 'Phone',
    fieldPack: 'Preferred package',
    fieldBudget: 'Budget',
    fieldVehicle: 'Vehicle wanted',
    fieldMessage: 'Message',
    formReply: 'A personal reply within 24 h.',
    formSubmit: 'Send my request',
    formSending: 'Sending…',
    mailSubject: 'Project request',
    mailOpening: 'Your email app is about to open…',
    mailToDefine: 'to define',
    footerDesc:
      'Car buying agent specialising in sourcing premium, sports and exceptional vehicles, across France and Europe.',
    footerNav: 'Navigation',
    footerLegal: 'Legal notice',
    footerPrivacy: 'Privacy policy',
    footerContact: 'Contact',
    footerRights: 'All rights reserved.',
  },
};

export function getContent(locale?: string | null) {
  return locale === 'en' ? en : fr;
}
