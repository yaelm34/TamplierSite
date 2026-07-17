// ============================================================
//  CONTENU CENTRALISÉ — TAMPLIER AUTO SOURCING
//  Toute la copie éditoriale du site vit ici.
// ============================================================

export const site = {
  name: 'TAMPLIER AUTO SOURCING',
  shortName: 'TAS',
  legalName: 'TAMPLIER AUTO SOURCING SASU',
  tagline: 'Mandataire automobile premium, sportive & exception',
  city: 'Montpellier',
  url: 'https://www.tamplierautosourcing.fr',
  email: 'contact@tamplierautosourcing.fr',
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
  founderRole: 'Fondateur & Dirigeant',
  socials: [
    { name: 'LinkedIn', handle: '@TAMPLIER AUTO SOURCING', href: 'https://www.linkedin.com/' },
    { name: 'Instagram', handle: '@TAMPLIER AUTO SOURCING', href: 'https://www.instagram.com/' },
    { name: 'Facebook', handle: '@TAMPLIER AUTO SOURCING', href: 'https://www.facebook.com/' },
  ],
} as const;

export const seo = {
  title:
    'TAMPLIER AUTO SOURCING — Mandataire automobile premium, sportive & exception | Montpellier',
  description:
    "Mandataire automobile à Montpellier. Je source, audite, négocie et sécurise votre véhicule premium, sportif ou d'exception en France et en Europe. Un service de confiance 100 % sur mesure.",
  ogAlt: 'TAMPLIER AUTO SOURCING — mandataire automobile premium',
};

export const nav = [
  { label: 'Concept', href: '#concept' },
  { label: 'Méthode', href: '#methode' },
  { label: 'Offres', href: '#offres' },
  { label: 'Garanties', href: '#confiance' },
  { label: 'Contact', href: '#contact' },
] as const;

export const cta = {
  primary: { label: 'Démarrer mon projet', href: '#contact' },
  secondary: { label: 'Découvrir la méthode', href: '#methode' },
};

export const hero = {
  eyebrow: 'Mandataire automobile · Montpellier',
  // display words — set in italic/roman for editorial rhythm
  titleTop: 'Le mandataire',
  titleAccent: 'de confiance',
  titleBottom: 'pour votre auto',
  subtitle: 'Premium · Sportive · Exception',
  lead:
    "Confiez vos critères. J'active mon réseau en France et en Europe — je déniche, audite, négocie et sécurise.",
  scrollHint: 'Défiler',
  marquee: [
    'Sourcing',
    'Audit',
    'Négociation',
    'Import',
    'Livraison',
    'Garantie',
    'Sur mesure',
  ],
};

// Kinetic brand band — the network Anthony activates
export const brands = [
  'Porsche',
  'Aston Martin',
  'Ferrari',
  'Lamborghini',
  'Audi Sport',
  'Mercedes-AMG',
  'BMW M',
  'McLaren',
  'Bentley',
  'Maserati',
];

export const concept = {
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
};

export const steps = {
  eyebrow: 'La méthode',
  index: '02',
  title: 'Quatre étapes, zéro compromis',
  items: [
    {
      n: '01',
      title: 'Le Brief',
      text: 'Vous me confiez vos critères précis — modèle, motorisation, finitions, options indispensables, budget. Un mandat de recherche exclusif est alors établi.',
      image: 'detail-front',
      alt: "Détail de la calandre d'une Aston Martin, illustration aquarelle",
    },
    {
      n: '02',
      title: 'La Recherche — Le Sourcing',
      text: "À partir des données inscrites sur le mandat, je source la perle rare parmi les meilleures opportunités du marché : réseaux officiels, concessions, partenaires européens.",
      image: 'detail-wheel',
      alt: "Jante dorée d'une Porsche 911, illustration aquarelle",
    },
    {
      n: '03',
      title: "L'Audit & la Négociation",
      text: "Analyse chirurgicale de l'historique complet du véhicule — Car Vertical, Histovec, suivi d'entretien constructeur, factures — et négociation rigoureuse du prix de vente dans votre intérêt.",
      image: 'detail-rear',
      alt: "Face arrière d'une Audi RS5, illustration aquarelle",
    },
    {
      n: '04',
      title: 'La Livraison',
      text: 'Prise en main de votre véhicule avec gestion complète des démarches administratives — quitus fiscal, immatriculation provisoire WW. Véhicule révisé, garanti et prêt à rouler, clés en main. Livraison à domicile disponible sur devis.',
      image: 'detail-tail',
      alt: "Arrière d'une Porsche 911, illustration aquarelle",
    },
  ],
};

export const offers = {
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
};

export const partnership = {
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
};

export const trust = {
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
};

export const contact = {
  eyebrow: 'Prenons contact',
  index: '06',
  title: 'Parlons de votre projet',
  intro:
    'Décrivez votre projet en quelques mots. Réponse personnelle sous 24 heures.',
  packOptions: ['Executive', 'Premium', 'Prestige', 'Je ne sais pas encore'],
  fields: {
    successTitle: 'Message envoyé',
    successText: 'Merci. Votre demande a bien été transmise — je reviens vers vous très vite.',
    errorText: "L'envoi a échoué. Vous pouvez me joindre directement par téléphone ou e-mail.",
  },
};

export const legal = {
  companyLine:
    'TAMPLIER AUTO SOURCING – SASU au capital de 1 000 € – Siège social : 278 Rue Alexandra David Neel, 34730 Prades-le-Lez – 106 997 695 RCS de Montpellier – SIRET 106 997 695 00015 – TVA FR181069976965 – Code APE : 4511Z (Commerce de voitures automobiles)',
  capital: '1 000 €',
  rcs: '106 997 695 RCS de Montpellier',
  siret: '106 997 695 00015',
  tva: 'FR181069976965',
  ape: '4511Z (Commerce de voitures automobiles)',
};
