/**
 * Psy Gbevimi - Contenus repris à l'identique du site d'origine (psygbevimi.com)
 * Seule la mise en page change. Guillemets français « », espaces insécables
 * avant la ponctuation haute (: ; ? !) et points médians ·
 */

export const API_URL = 'https://api.psygbevimi.com';
export const WHATSAPP_PHONE = '2290129231212';
export const DISPLAY_PHONE = '+229 01 29 23 12 12';
export const CONTACT_EMAIL = 'psygbevimi@gmail.com';
export const YOUTUBE_URL = 'https://youtube.com/@PsyGbevimi';
export const BOOK_ORDER_URL = 'http://livre.psygbevimi.com';

// Images locales (public/images)
export const IMAGES = {
  founder: '/images/fondateur.jpeg',
  book: '/images/livre.png',
};

export const createWhatsAppUrl = (message: string): string => {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
};

export const DEFAULT_BOOKING_MESSAGE =
  'Bonjour Psy Gbevimi, je souhaite réserver mon appel découverte gratuit. Je viens de la page « Accueil ».';

export const DEFAULT_QUESTION_MESSAGE =
  'Bonjour Psy Gbevimi, j\'ai une question. Je viens de la page « FAQ ».';

export const DEFAULT_BOOK_MESSAGE =
  'Bonjour Psy Gbevimi, j\'ai une question sur le livre « Accédez au bonheur authentique ». Je viens de la page « Le livre ».';

export const NAV_LINKS = [
  { label: 'Accompagnements', href: '/accompagnements' },
  { label: 'Tests gratuits', href: '/tests' },
  { label: 'Le livre', href: '/livre' },
  { label: 'Articles', href: '/tous-les-articles' },
  { label: 'L\'initiative', href: '/initiative' },
];

export const HERO_DATA = {
  eyebrow: 'Initiative pour le bonheur et la santé mentale',
  title: 'Retrouvez calme, clarté et confiance, avec une équipe qui vous écoute vraiment.',
  paragraph:
    'Psy Gbevimi accompagne adultes, jeunes et entreprises vers une vie plus sereine : écoute, programmes, tests gratuits et une communauté qui avance ensemble. Le premier échange est offert.',
  primaryCta: 'Réserver mon appel',
  secondaryCta: 'Faire le test gratuit · 5 min',
  badges: ['Gratuit', '≈ 20 minutes', 'Sur WhatsApp', 'Confidentiel'],
  quote: 'Reste toujours positif dans la quête d\'une vie heureuse',
  teamName: 'L\'équipe Psy Gbevimi',
  teamStatus: 'Répond sur WhatsApp',
};

export const REASSURANCE_DATA = [
  { value: '3 programmes', label: 'adultes, jeunes, entreprises.' },
  { value: 'Tests gratuits', label: 'faire le point en 5 minutes.' },
  { value: 'Fondée par un psychologue clinicien', label: 'fonctionnaire humanitaire international.' },
];

export interface ThoughtItem {
  id: string;
  text: string;
  programId: 'sante' | 'coaching' | 'jeune';
  programName: string;
  indentDesktop: string;
}

export const RECOGNIZE_DATA: {
  eyebrow: string;
  title: string;
  intro: string;
  thoughts: ThoughtItem[];
} = {
  eyebrow: 'Vous vous reconnaissez ?',
  title: 'Et si votre plus grande richesse était enfouie là où vous ne regardez jamais ?',
  intro: '',
  thoughts: [
    { id: 'thought-1', text: '« Je rumine et je dors mal. »', programId: 'sante', programName: 'Santé mentale', indentDesktop: '0%' },
    { id: 'thought-2', text: '« Des blessures du passé me pèsent encore. »', programId: 'sante', programName: 'Santé mentale', indentDesktop: '12%' },
    { id: 'thought-3', text: '« Je suis épuisé·e au travail. »', programId: 'coaching', programName: 'Coaching & développement', indentDesktop: '4%' },
    { id: 'thought-4', text: '« Je manque de confiance en moi. »', programId: 'coaching', programName: 'Coaching & développement', indentDesktop: '16%' },
    { id: 'thought-5', text: '« J\'ai perdu le sens de ce que je fais. »', programId: 'coaching', programName: 'Coaching & développement', indentDesktop: '2%' },
    { id: 'thought-6', text: '« Mon ado se cherche. »', programId: 'jeune', programName: 'Pour un jeune', indentDesktop: '10%' },
  ],
};

export interface ProgramItem {
  id: 'sante' | 'coaching' | 'jeune' | 'entreprise';
  title: string;
  description: string;
  badge: string;
  buttonLabel: string;
  /** Page détaillée du programme (absente pour « Pour un jeune » : réservation WhatsApp) */
  slug?: string;
}

export const PROGRAMS_DATA: {
  eyebrow: string;
  title: string;
  programs: ProgramItem[];
} = {
  eyebrow: 'Choisissez votre chemin',
  title: 'Un accompagnement pour chaque situation',
  programs: [
    {
      id: 'sante',
      title: 'Santé mentale',
      description:
        'Anxiété, stress, dépression, deuil, blessures du passé. Consultations individuelles et groupes de soutien.',
      badge: 'Premier échange gratuit',
      buttonLabel: 'Découvrir',
      slug: 'mental-health-wellbeing',
    },
    {
      id: 'coaching',
      title: 'Coaching & développement',
      description:
        'Confiance en soi, discipline, objectifs de vie. Coaching structuré et ateliers pratiques.',
      badge: 'Premier échange gratuit',
      buttonLabel: 'Découvrir',
      slug: 'coaching-needs',
    },
    {
      id: 'jeune',
      title: 'Pour un jeune',
      description:
        'Confiance, résilience, discipline, intelligence émotionnelle et projet de vie.',
      badge: 'Premier échange gratuit',
      buttonLabel: 'Découvrir',
    },
    {
      id: 'entreprise',
      title: 'Pour mon entreprise',
      description:
        'Prévention du burn-out, ateliers, évaluation du bien-être au travail.',
      badge: 'Sur devis',
      buttonLabel: 'Découvrir',
      slug: 'workplace-wellness',
    },
  ],
};

export const YOUTH_BOOKING_MESSAGE =
  'Bonjour Psy Gbevimi, je souhaite réserver mon appel découverte gratuit pour un jeune. Je viens de la page « Accompagnements ».';

export interface ProgramService {
  title: string;
  description: string;
  duree: string;
  modalites: string;
}

export interface ProgramDetail {
  slug: string;
  eyebrow: string;
  title: string;
  intro: string;
  target: string;
  approach: string;
  format: string;
  methodology: string;
  services: ProgramService[];
  testName: string;
}

export const PROGRAM_DETAILS: ProgramDetail[] = [
  {
    slug: 'mental-health-wellbeing',
    eyebrow: 'Programme Santé mentale',
    title: 'Programme Santé Mentale',
    intro:
      'Un accompagnement complet pour votre bien-être mental et votre développement personnel. Consultations individuelles, thérapie familiale, groupes de soutien et accompagnement du trauma.',
    target: 'Adultes en quête d\'une vie plus heureuse',
    approach: 'Basée sur des preuves',
    format: 'Flexible et adapté',
    methodology:
      'Approches basées sur la TCC, la résolution de problèmes et le développement du bien-être personnel. Intégration de la thérapie systémique et familiale pour un accompagnement holistique.',
    services: [
      { title: 'Consultations individuelles', description: 'Accompagnement personnalisé avec TCC et résolution de problèmes', duree: 'À personnaliser', modalites: 'Présentiel ou téléconsultation' },
      { title: 'Thérapie familiale et systémique', description: 'Travail sur les dynamiques familiales et relationnelles', duree: 'À personnaliser', modalites: 'Présentiel ou téléconsultation' },
      { title: 'Groupes de soutien thématiques', description: 'Espaces sûrs pour apprendre et partager', duree: '4-8 semaines', modalites: 'En ligne sécurisée' },
      { title: 'Accompagnement du trauma', description: 'Support spécialisé pour les traumatismes sévères', duree: 'À personnaliser', modalites: 'Présentiel ou téléconsultation' },
    ],
    testName: 'Échelle de Bien-Être Intérieur',
  },
  {
    slug: 'coaching-needs',
    eyebrow: 'Programme Coaching & développement personnel',
    title: 'Programme Coaching & Développement Personnel',
    intro:
      'Plan sur mesure pour soutenir vos progrès, votre développement personnel et votre cheminement vers une vie réussie et heureuse. Accompagnement structuré, ateliers de compétences, programmes de développement et suivi régulier pour vous aider à atteindre vos objectifs personnels.',
    target: 'Adultes cherchant à optimiser leur bonheur et épanouissement',
    approach: 'Basée sur des preuves',
    format: 'Flexible et adapté',
    methodology:
      'Approche basée sur la clarification des valeurs, la fixation d\'objectifs SMART, le développement des habitudes positives et la gestion émotionnelle. Focus sur l\'autonomisation et la transformation durable.',
    services: [
      { title: 'Coaching personnel structuré', description: 'Programme intensif pour clarifier vos objectifs et construire votre plan d\'action', duree: '8-12 semaines', modalites: 'Séances individuelles en ligne ou présentiel' },
      { title: 'Ateliers de compétences', description: 'Respiration, pleine conscience, gratitude et planification d\'objectifs', duree: '4-8 semaines', modalites: 'En ligne ou en groupe présentiel' },
      { title: 'Programmes de développement personnel', description: 'Formations et ressources pour l\'épanouissement et la résilience', duree: 'À personnaliser', modalites: 'En ligne avec ressources téléchargeables' },
      { title: 'Suivi et réévaluation', description: 'Check-ins réguliers et ajustement des objectifs personnels', duree: 'Continu selon les besoins', modalites: 'Flexibles selon vos besoins' },
    ],
    testName: 'Échelle de Besoin en Coaching et Développement Personnel',
  },
  {
    slug: 'workplace-wellness',
    eyebrow: 'Programme Bien-être en entreprise',
    title: 'Programme Bien-Être en Entreprise',
    intro:
      'Soutien global pour favoriser un environnement de travail sain et orienté vers le développement personnel et le succès.',
    target: 'Employés et professionnels',
    approach: 'Basée sur des preuves',
    format: 'Flexible et adapté',
    methodology:
      'Approche holistique combinant mindfulness, TCC pour le stress, coaching en gestion émotionnelle et développement personnel. Integration d\'indicateurs de bonheur et de sens au travail pour une culture d\'entreprise positive.',
    services: [
      { title: 'Programmes de mindfulness et gestion du stress', description: 'Formations et pratiques pour cultiver la sérénité au travail', duree: '4-12 semaines', modalites: 'Sessions en ligne ou sur site' },
      { title: 'Coaching mental individuel', description: 'Accompagnement personnalisé pour les employés et cadres', duree: 'À personnaliser', modalites: 'En ligne ou présentiel' },
      { title: 'Formations en communication et gestion émotionnelle', description: 'Compétences essentielles pour un environnement de travail sain', duree: '2-4 semaines', modalites: 'Ateliers en présentiel ou en ligne' },
      { title: 'Rapports et indicateurs de bien-être', description: 'Évaluation du climat organisationnel et recommandations', duree: 'Rapports réguliers', modalites: 'Analyses de données et recommandations' },
    ],
    testName: 'Test d\'Évaluation du Bien-Être en Entreprise',
  },
];

export const PROGRAM_PAGE_COMMON = {
  back: 'Retour aux programmes',
  targetLabel: 'Public cible',
  approachLabel: 'Approche',
  formatLabel: 'Format',
  methodologyTitle: 'Notre Méthodologie',
  servicesTitle: 'Nos Services',
  durationLabel: 'Durée :',
  modalitiesLabel: 'Modalités :',
  evaluateTitle: 'Évaluez-vous',
  evaluateText:
    'Commencez par notre test d\'auto-évaluation pour identifier vos besoins spécifiques et recevoir des recommandations personnalisées.',
  startTitle: 'Démarrez dès maintenant',
  startText: 'Le premier échange est gratuit : environ 20 minutes sur WhatsApp pour parler de vos objectifs.',
  cta: 'Réserver mon appel gratuit',
  faqTitle: 'Questions Fréquentes',
  faq: [
    {
      question: 'Quel format me convient le mieux ?',
      answer: 'Nos services sont disponibles en présentiel, téléconsultation ou en ligne selon vos préférences et votre emploi du temps.',
    },
    {
      question: 'Quelle est la durée type d\'un accompagnement ?',
      answer: 'Chaque programme est personnalisé. En moyenne, comptez entre 4-12 semaines selon vos objectifs. Un test initial vous aidera à déterminer votre parcours idéal.',
    },
    {
      question: 'Puis-je bénéficier d\'un premier rendez-vous gratuit ?',
      answer: 'Oui ! Nous proposons une consultation initiale pour discuter de vos besoins et trouver le programme qui vous convient.',
    },
    {
      question: 'Mes données sont-elles sécurisées ?',
      answer: 'Absolument. Nous garantissons la confidentialité et la sécurité de vos données en conformité avec les régulations de protection des données.',
    },
  ],
};

export const STEPS_DATA = {
  eyebrow: 'Comment ça se passe',
  title: 'Trois étapes, aucune pression',
  steps: [
    { number: 1, title: 'Vous écrivez sur WhatsApp', description: 'Le message est déjà rédigé. Il suffit de l\'envoyer.' },
    { number: 2, title: 'Appel découverte gratuit', description: 'Environ 20 minutes pour comprendre votre situation, sans engagement.' },
    { number: 3, title: 'Votre accompagnement', description: 'Un plan clair, en ligne ou à Cotonou, payable par Mobile Money.' },
  ],
  cta: 'Réserver mon appel',
};

export const FOUNDER_DATA = {
  eyebrow: 'Le fondateur',
  photoAlt: 'GBÈVIMI C. F. Houénon, fondateur de Psy Gbevimi',
  title: 'Une initiative portée par GBÈVIMI C. F. Houénon',
  paragraph:
    'Psychologue clinicien et psychothérapeute, il a fondé Psy Gbevimi après des années de missions humanitaires. L\'initiative transmet ce qu\'il a appris sur le terrain : le bonheur s\'apprend, et il se partage.',
  credentials: [
    'Psychologie clinique',
    'Psychothérapeute et Fonctionnaire humanitaire international',
    'Auteur de « Accédez au bonheur authentique »',
  ],
  quote: 'Reste toujours positif dans la quête d\'une vie heureuse',
  cta: 'Découvrir l\'initiative',
};

export const INITIATIVE_DATA = {
  eyebrow: 'L\'initiative Psy Gbevimi',
  title: 'Apprendre à vivre heureux, et à rendre les autres plus heureux.',
  intro:
    'Nous croyons que chaque personne possède en elle la capacité de construire une vie plus heureuse. Mais le bonheur demande de l\'apprentissage. Psy Gbevimi est un espace pour l\'apprendre, ensemble.',
  missionEyebrow: 'Notre mission',
  missionTitle: 'Se connaître · Comprendre · Grandir · Aimer · Être heureux',
  missionParagraphs: [
    'Apprendre à se connaître, à comprendre ses émotions, à construire des relations saines, à surmonter les difficultés, à apprécier ce que l\'on possède et à donner du sens à son existence : voilà ce que Psy Gbevimi aide chacun à faire.',
    'Nous ne cherchons pas la perfection, mais le progrès. Et nous savons qu\'une vie véritablement heureuse est une vie qui contribue aussi au bonheur de ceux qui nous entourent.',
  ],
  actionsEyebrow: 'Ce que nous faisons',
  actionsTitle: 'Cinq façons d\'agir',
  actions: [
    { title: 'Accompagner', text: 'Écoute, consultations et coaching pour les adultes, en ligne ou à Cotonou.' },
    { title: 'Faire grandir les jeunes', text: 'Un programme pour développer confiance, discipline et projet de vie.' },
    { title: 'Prendre soin des équipes', text: 'Ateliers et prévention du burn-out pour les entreprises et organisations.' },
    { title: 'Aider chacun à faire le point', text: 'Des tests d\'auto-évaluation gratuits, avec des conseils personnalisés.' },
    { title: 'Transmettre', text: 'Articles, vidéos YouTube et le livre « Accédez au bonheur authentique ».' },
  ],
  valuesEyebrow: 'Nos valeurs',
  valuesTitle: 'Les principes qui guident chaque programme et chaque échange',
  values: [
    { title: 'Épanouissement', text: 'Apprendre à construire une vie qui nous ressemble.' },
    { title: 'Conscience', text: 'Mieux se connaître pour comprendre ses pensées, ses émotions et ses comportements.' },
    { title: 'Bienveillance', text: 'Cultiver la bienveillance envers soi-même et envers les autres.' },
    { title: 'Respect', text: 'Reconnaître la valeur et la dignité de chaque personne.' },
    { title: 'Écoute', text: 'Prendre le temps de comprendre avant de juger.' },
    { title: 'Partage', text: 'Transmettre les connaissances, les expériences et les encouragements.' },
    { title: 'Résilience', text: 'Apprendre à se relever et à grandir à travers les difficultés.' },
    { title: 'Responsabilité', text: 'Comprendre que notre manière de vivre influence notre entourage et notre société.' },
    { title: 'Paix intérieure', text: 'Rechercher l\'équilibre, la sérénité et l\'harmonie.' },
  ],
};

export const TESTS_HOME_DATA = {
  eyebrow: 'Test gratuit · 10 minutes · Confidentiel',
  title: 'Où en êtes-vous, vraiment ?',
  text: '50 questions pour faire le point sur votre bien-être intérieur, avec des conseils personnalisés à la fin.',
  primaryCta: 'Commencer le test',
  secondaryCta: 'Voir les 3 tests',
  disclaimer:
    'Ces tests sont des mesures rapides d\'auto-évaluation. Ils ne remplacent pas un avis professionnel. En cas de détresse intense ou de danger, contactez sans attendre les services d\'urgence.',
  badge: '50 questions',
  description:
    'Une échelle générale pour explorer vos ressources et vos perceptions du bien-être mental, du fonctionnement psychologique positif et d’un bonheur durable.',
  dimensionsTitle: 'Dix dimensions explorées',
  dimensions: [
    'Bien-être émotionnel',
    'Équilibre psychologique',
    'Estime et confiance en soi',
    'Résilience',
    'Gestion du stress et des émotions',
    'Relations positives et soutien social',
    'Sens, valeurs et direction de vie',
    'Autonomie et responsabilité',
    'Accomplissement et développement personnel',
    'Bonheur durable et satisfaction de vie',
  ],
  startUrl: '/evaluation/mental-health-wellbeing/ebei',
};

export const TESTS_PAGE_DATA = {
  eyebrow: 'Tests gratuits',
  title: 'Faites le point, en quelques minutes.',
  intro:
    'Trois tests d\'auto-évaluation pour mieux comprendre où vous en êtes, avec des conseils personnalisés à la fin. Vos réponses restent confidentielles.',
  tests: [
    {
      programme: 'Programme Santé mentale',
      title: 'Échelle de Bien-Être Intérieur',
      audience: 'Adultes en quête d\'une vie plus heureuse',
      duration: '10 minutes',
      questions: '50 questions',
      url: '/evaluation/mental-health-wellbeing/ebei',
    },
    {
      programme: 'Programme Coaching & développement personnel',
      title: 'Échelle de Besoin en Coaching et Développement Personnel',
      audience: 'Adultes cherchant à optimiser leur bonheur et épanouissement',
      duration: '5-8 minutes',
      questions: '23 questions',
      url: '/evaluation/coaching-needs/ebcdp',
    },
    {
      programme: 'Programme Bien-être en entreprise',
      title: 'Test d\'Évaluation du Bien-Être en Entreprise',
      audience: 'Employés et professionnels',
      duration: '10 minutes',
      questions: '40 questions',
      url: '/evaluation/workplace-wellness/workplace-wellness',
    },
  ],
  startLabel: 'Commencer',
  disclaimer:
    'Ces tests sont des mesures rapides d\'auto-évaluation. Ils ne constituent pas un diagnostic et ne remplacent pas un avis professionnel. En cas de détresse intense ou de danger immédiat, contactez sans attendre les services d\'urgence.',
};

export const BOOK_DATA = {
  eyebrow: 'Le livre du fondateur',
  title: 'Accédez au bonheur authentique',
  subtitle: 'Parcours personnel, conseils et astuces pratiques',
  homeDescription:
    'Parcours personnel, conseils et astuces pratiques. Préfacé par le Dr Tandjama Adama Coulibaly · Éditions Fous Sans Frontières.',
  meta: [
    { label: 'Auteur', value: 'GBÈVIMI C. F. Houénon' },
    { label: 'Préface', value: 'Dr Tandjama Adama Coulibaly' },
    { label: 'Éditeur', value: 'Éditions Fous Sans Frontières' },
  ],
  pitch:
    'Un livre pour comprendre comment se relever, encore et encore, et accéder à un bonheur authentique. À travers la sagesse de l\'aigle, la force des noms et des panégyriques et les lois invisibles de l\'identité, l\'auteur partage des outils concrets de développement personnel.',
  price: '15 000 F CFA',
  priceSub: 'ou 23 €',
  homePriceSub: 'ou 23 € · Mobile Money ou carte',
  primaryCta: 'Commander le livre',
  questionCta: 'Une question sur le livre ?',
  secondaryCta: 'Découvrir le livre',
  payment: 'Paiement en ligne par Mobile Money ou carte.',
  contentEyebrow: 'Ce que vous y trouverez',
  contentTitle: 'Un livre à vivre, pas seulement à lire',
  features: [
    'Un parcours personnel transformé en méthode pour avancer',
    'La sagesse de l\'aigle, la force des noms et des panégyriques',
    'Des outils concrets de développement personnel',
  ],
  authorEyebrow: 'L\'auteur',
  authorName: 'GBÈVIMI C. F. Houénon',
  authorText:
    'Psychologue clinicien et psychothérapeute, fondateur de l\'initiative Psy Gbevimi. Il a mené des missions humanitaires, et partage chaque mois des outils pour mieux vivre sur sa chaîne YouTube.',
};

export const COMMUNITY_DATA = {
  eyebrow: 'La communauté des Aiglons & Aiglonnes',
  pillars: [
    'Mon bonheur, mon engagement.',
    'Le bonheur des autres, ma contribution.',
    'Une humanité plus heureuse, notre vision.',
  ],
  homeParagraph:
    'Les membres de la communauté Psy Gbevimi se reconnaissent sous un même nom : Aiglon pour les hommes, Aiglonne pour les femmes. Ensemble, ils apprennent à vivre heureux et à rendre les autres plus heureux.',
  cta: 'Découvrir la communauté',
  pageEyebrow: 'La communauté',
  pageTitle: 'Les Aiglons & Aiglonnes',
  pageParagraph:
    'Les membres de la communauté Psy Gbevimi se reconnaissent sous une appellation commune : Aiglon pour les hommes, Aiglonne pour les femmes. Elle exprime notre appartenance, notre fraternité et notre engagement pour une vie plus heureuse.',
  joinCta: 'Rejoindre la communauté',
  beEyebrow: 'Être Aiglon ou Aiglonne',
  beTitle: 'C\'est choisir de…',
  verbs: [
    { verb: 'Apprendre', text: 'pour mieux se connaître.' },
    { verb: 'Comprendre', text: 'pour mieux vivre.' },
    { verb: 'Aimer', text: 'pour mieux se relier aux autres.' },
    { verb: 'Grandir', text: 'pour devenir une meilleure version de soi-même.' },
    { verb: 'Partager', text: 'pour contribuer au bonheur des autres.' },
    { verb: 'S\'engager', text: 'pour construire une société plus humaine, plus équilibrée et plus heureuse.' },
  ],
  spiritEyebrow: 'L\'esprit Psy Gbevimi',
  spiritTitle: 'Ce qui nous rassemble',
  spirit: [
    'Un Aiglon cherche à comprendre.',
    'Il cultive le bonheur.',
    'Il travaille sur lui-même.',
    'Il respecte et accompagne les autres.',
    'Il choisit la paix plutôt que le conflit.',
    'Il contribue positivement à son environnement.',
  ],
  mottoEyebrow: 'Notre devise',
  mottoTitle: 'Un Aiglon ne cherche pas la perfection : il cherche le progrès.',
  mottoText: 'Il apprend, il questionne, il écoute, il évolue. Il tombe parfois, mais il se relève.',
};

export const ARTICLE_CATEGORIES = ['Tous', 'Développement Personnel', 'Sagesse & Bien-être', 'Santé Mentale'] as const;

export const ARTICLES_DATA = {
  eyebrow: 'Articles',
  title: 'Lire, comprendre, en parler',
  intro:
    'Santé mentale, confiance en soi, jeunesse, travail : des articles pour mieux vivre, et une question à la fin de chacun pour en discuter.',
  searchLabel: 'Rechercher un article',
  homeEyebrow: 'Articles & vidéos',
  homeTitle: 'Lire, regarder, en parler',
  videoBlock: {
    eyebrow: 'Vidéos',
    title: 'Leçons de vie, santé mentale, jeunesse et réussite',
    description: 'De nouvelles vidéos chaque mois sur la chaîne YouTube Psy Gbevimi.',
    cta: 'Regarder sur YouTube',
    url: YOUTUBE_URL,
  },
  allArticlesCta: 'Tous les articles',
};

export const FAQ_DATA = {
  eyebrow: 'Questions fréquentes',
  title: 'Avant de nous écrire',
  items: [
    {
      question: 'Le premier échange est-il vraiment gratuit ?',
      answer:
        'Oui. L\'appel découverte dure environ 20 minutes, sans engagement ni paiement. Il sert à comprendre votre situation et à vous orienter vers l\'accompagnement le plus adapté.',
    },
    {
      question: 'Qui va m\'accompagner ?',
      answer:
        'Un membre de l\'équipe Psy Gbevimi, choisi selon votre besoin. L\'initiative a été fondée par GBÈVIMI C. F. Houénon, psychologue clinicien et psychothérapeute.',
    },
    {
      question: 'Comment se passe une séance en ligne ?',
      answer:
        'Par appel vidéo ou sur WhatsApp, dans les mêmes conditions de confidentialité qu\'en présentiel. Les séances peuvent aussi avoir lieu à Cotonou.',
    },
    {
      question: 'Puis-je payer par Mobile Money ?',
      answer:
        'Oui. Les programmes se règlent en ligne par Mobile Money (MTN, Moov, Celtiis…) ou par carte bancaire.',
    },
    {
      question: 'Ce que je dis reste-t-il confidentiel ?',
      answer:
        'Oui. Ce que vous partagez reste entre vous et l\'équipe qui vous accompagne, tenue au secret professionnel. Pour en savoir plus, lisez notre politique de confidentialité.',
    },
    {
      question: 'Combien de temps dure un accompagnement ?',
      answer:
        'Cela dépend de vos objectifs : de quelques séances à des programmes de 8 à 12 semaines. Nous en parlons ensemble lors du premier échange.',
    },
    {
      question: 'Les tests en ligne remplacent-ils une consultation ?',
      answer:
        'Non. Ce sont des mesures rapides d\'auto-évaluation pour faire le point. Elles ne constituent pas un diagnostic.',
    },
    {
      question: 'Intervenez-vous en entreprise ?',
      answer:
        'Oui : ateliers, prévention du burn-out et évaluation du bien-être au travail, sur devis. Écrivez-nous sur WhatsApp pour en parler.',
    },
  ],
  bottomText: 'Une autre question ? Posez-la directement sur WhatsApp.',
  bottomCta: 'Poser ma question',
};

export const FIRST_STEP_DATA = {
  eyebrow: 'Le premier pas',
  title: 'Un premier échange gratuit, sans engagement',
  text: 'Écrivez-nous sur WhatsApp ou appelez-nous. Un membre de l\'équipe vous répond, puis nous prenons environ 20 minutes pour comprendre votre situation et voir ce qui peut vous aider.',
  cta: 'Réserver mon appel',
  phoneDisplay: DISPLAY_PHONE,
  phoneLink: `tel:+${WHATSAPP_PHONE}`,
  disclaimer: 'En cas de détresse intense ou de danger immédiat, contactez sans attendre les services d\'urgence.',
};

export const CONTACT_DATA = {
  eyebrow: 'Contact',
  title: 'Parlons-en.',
  intro:
    'Le plus simple est de nous écrire sur WhatsApp : le premier échange est gratuit. Vous pouvez aussi nous laisser un message ci-dessous.',
  whatsappTitle: 'Sur WhatsApp',
  whatsappText: 'Un message suffit. Il est déjà rédigé pour vous.',
  whatsappCta: 'Réserver mon appel',
  phoneLabel: 'Téléphone',
  emailLabel: 'E-mail',
  whereLabel: 'Où',
  where: 'Cotonou, Bénin, et en ligne',
  formTitle: 'Laisser un message',
  fields: {
    prenom: 'Prénom',
    nom: 'Nom',
    email: 'E-mail',
    phone: 'Téléphone (facultatif)',
    message: 'Votre message',
  },
  privacy: 'Vos informations servent uniquement à vous répondre.',
  privacyLink: 'Voir notre politique de confidentialité.',
  submit: 'Envoyer',
};

export const FOOTER_DATA = {
  name: 'Psy Gbevimi',
  tagline: 'Une initiative pour apprendre à vivre heureux et à rendre les autres plus heureux. Cotonou & en ligne.',
  youtubeLabel: 'Psy Gbevimi sur YouTube',
  youtubeUrl: YOUTUBE_URL,
  groups: [
    {
      title: 'Accompagner',
      links: [
        { label: 'Santé mentale', href: '/program/mental-health-wellbeing' },
        { label: 'Coaching & développement', href: '/program/coaching-needs' },
        { label: 'Bien-être en entreprise', href: '/program/workplace-wellness' },
      ],
    },
    {
      title: 'Découvrir',
      links: [
        { label: 'L\'initiative', href: '/initiative' },
        { label: 'La communauté', href: '/communaute' },
        { label: 'Tests gratuits', href: '/tests' },
        { label: 'Le livre', href: '/livre' },
        { label: 'Articles', href: '/tous-les-articles' },
        { label: 'Questions fréquentes', href: '/faq' },
      ],
    },
  ],
  contactTitle: 'Contact',
  whatsappLabel: `WhatsApp · ${DISPLAY_PHONE}`,
  email: CONTACT_EMAIL,
  writeUs: 'Nous écrire',
  copyright: '© 2026 Psy Gbevimi. Tous droits réservés.',
  legal: [
    { label: 'Politique de confidentialité', href: '/confidentialite' },
    { label: 'Mentions légales', href: '/mentions-legales' },
    { label: 'Conditions d\'utilisation', href: '/cgu' },
  ],
  footerWhatsAppMessage: 'Bonjour Psy Gbevimi, j\'ai une question. Je viens de la page « Footer ».',
};
