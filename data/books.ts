/**
 * Catalogue officiel des ouvrages du Pasteur Alexandre AMAZOU.
 *
 * Source : biographie officielle (data/biographie-source.docx).
 *
 * Couvertures :
 *  - Les fichiers déposés dans /public/images/livres/ sont des scans
 *    recto-verso (4ème de couv à gauche + 1ère de couv à droite). Le composant
 *    <BookCoverImage> les recadre automatiquement sur la 1ère de couv via
 *    `object-position: right` (cf. coverLayout = 'recto-verso').
 *  - Pour les ouvrages sans cover dédiée, le fallback éditorial doré sur
 *    fond bleu nuit prend le relais (zéro image cassée).
 */

export type BookTheme =
  | 'leadership'
  | 'foi'
  | 'priere'
  | 'famille'
  | 'monde-spirituel'
  | 'reussite'
  | 'heritage'
  | 'finances';

export const bookThemes: { id: BookTheme; label: string }[] = [
  { id: 'leadership', label: 'Leadership' },
  { id: 'foi', label: 'Foi' },
  { id: 'priere', label: 'Prière' },
  { id: 'famille', label: 'Famille' },
  { id: 'monde-spirituel', label: 'Monde spirituel' },
  { id: 'reussite', label: 'Réussite' },
  { id: 'heritage', label: 'Héritage' },
  { id: 'finances', label: 'Finances' },
];

export type BookStatus = 'available' | 'out-of-stock' | 'coming-soon';

/** Format de la couverture pour piloter le recadrage CSS */
export type CoverLayout =
  | 'recto-verso' // scan complet 4ème + 1ère de couv → object-position: right
  | 'pub-poster' // visuel marketing avec le livre centré → object-position: center
  | 'front-only'; // 1ère de couv seule (idéal) → object-position: center

export type Companion = {
  title: string;
  description: string;
  pdfUrl?: string;
  pages?: number;
};

export type Book = {
  slug: string;
  title: string;
  subtitle?: string;
  coverImage: string;
  coverLayout?: CoverLayout;
  description: string;
  themes: BookTheme[];
  isbn?: string;
  datePublished: string; // YYYY ou YYYY-MM
  excerptFile?: string; // chemin relatif data/excerpts/{slug}.mdx
  /** URL produit Amazon (ASIN direct). Si absent, fallback sur l'Author Store. */
  amazonUrl?: string;
  pdfUrl?: string;
  status: BookStatus;
  featured?: boolean;
  bestseller?: boolean;
  /** Ouvrage compagnon : livret, journal, manuel d'accompagnement */
  companion?: Companion;
};

export const books: Book[] = [
  {
    slug: 'la-realite-du-monde-des-esprits-tome-1',
    title: 'La Réalité du Monde des Esprits',
    subtitle: 'Réédition 2026 — Nouvelle Édition Révisée et Augmentée',
    coverImage: '/images/livres/realite-monde-esprits-2026.png',
    coverLayout: 'front-only',
    isbn: '978-9-8253-4938-23',
    description:
      "Best-seller depuis sa première parution en 2021, ce livre revient en 2026 dans une édition entièrement révisée et augmentée — préface de la Pasteure Laurette AMAZOU, structure enrichie en cinq actes (Éveil, Formation, Armement, Combat, Domination) et quinze chapitres. Une plongée biblique rigoureuse dans la cosmologie spirituelle : comment le monde des esprits — créé par Dieu, divisé en deux royaumes après la chute de Lucifer — gouverne réellement les destinées personnelles, familiales et nationales. Chaque chapitre se conclut par des points à retenir, des questions de réflexion, une prière guidée et des versets à mémoriser, pour transformer la lecture en expérience.",
    themes: ['monde-spirituel', 'foi'],
    datePublished: '2026',
    excerptFile: 'la-realite-du-monde-des-esprits-partie-1.mdx',
    status: 'available',
    featured: true,
    bestseller: true,
    companion: {
      title: '40 Jours de Combat Spirituel',
      description:
        "Le livret de prière officiel inspiré du livre — un parcours quotidien de 40 jours en cinq semaines (lecture, verset clé, méditation, prière déclarée, application, journal) pour passer de la connaissance à l'expérience. Disponible également comme ouvrage à part entière.",
    },
  },
  {
    slug: '40-jours-de-combat-spirituel',
    title: '40 Jours de Combat Spirituel',
    subtitle: 'Le livret de prière officiel — inspiré du best-seller',
    coverImage: '/images/livres/40-jours-combat-spirituel.png',
    coverLayout: 'front-only',
    isbn: '9798259008977',
    description:
      "Programme de prière de 40 jours inspiré de « La Réalité du Monde des Esprits ». Cinq semaines pensées comme cinq actes — l'Éveil, la Formation, l'Armement, le Combat, la Domination — qui mènent le croyant pas à pas de l'ignorance à la victoire. Chaque jour propose un passage à lire, un verset-clé, une méditation, une prière déclarée à haute voix, une application pratique et un espace journal. Utilisable seul, en couple ou en groupe (cellule de maison, étude biblique). 40 jours pour ne plus combattre à l'aveugle.",
    themes: ['priere', 'monde-spirituel', 'foi'],
    datePublished: '2026',
    status: 'available',
  },
  {
    slug: 'le-transfert-de-l-iniquite',
    title: "Le transfert de l'iniquité par les liens du sang",
    coverImage: '/images/livres/le-transfert-de-l-iniquite.jpg',
    coverLayout: 'recto-verso',
    description:
      "Best-seller. Les iniquités transmises de génération en génération par les liens génétiques constituent un véritable fardeau spirituel. Cet enseignement bâtit à solution pour rompre l'héritage maléfique, refuser ses effets et bénéficier d'un diagnostic complet pour libérer son existence et celle de sa descendance — pour qui veut changer son histoire et susciter une nouvelle génération.",
    themes: ['monde-spirituel', 'famille', 'heritage'],
    datePublished: '2025',
    status: 'available',
    bestseller: true,
  },
  {
    slug: 'comment-preparer-et-reussir-une-nouvelle-annee',
    title: 'Comment préparer et réussir une nouvelle année ?',
    subtitle: 'Manuel complet de guerre spirituelle pour les temps prophétiques',
    coverImage: '/images/livres/preparer-et-reussir-une-nouvelle-annee.jpg',
    coverLayout: 'front-only',
    isbn: '9798272678249',
    description:
      "Best-seller. Une nouvelle année n'est pas un simple changement de calendrier — c'est un champ de bataille spirituel où se jouent les enjeux éternels d'une destinée. Fruit de plus de vingt ans de ministère et d'une révélation stratégique reçue par l'auteur, ce manuel dévoile les lois spirituelles qui gouvernent les cycles temporels : les quatre portes prophétiques de l'année (équinoxes et solstices), les quatre armes de commandement (Prière de Commandement, Puissance du Sacrifice, Loi de l'Honneur, Loi des Prémices), les protocoles pratiques de préparation (diagnostic, guerre prophétique, programmation), des cas concrets et un plan d'action personnalisé. Pour ne plus subir l'année — la commander.",
    themes: ['leadership', 'reussite', 'foi', 'priere'],
    datePublished: '2025-11',
    excerptFile: 'comment-preparer-et-reussir-une-nouvelle-annee.mdx',
    status: 'available',
    bestseller: true,
    companion: {
      title: 'Mon Journal de Victoire',
      description:
        "Le compagnon spirituel officiel : un journal mensuel pour mettre en pratique les quatre armes de commandement, suivre vos jeûnes, écrire vos décrets et documenter vos victoires tout au long de l'année. Disponible également comme ouvrage à part entière.",
    },
  },
  {
    slug: 'mon-journal-de-victoire',
    title: 'Mon Journal de Victoire',
    subtitle: 'Édition 2026 — Compagnon spirituel de guerre prophétique',
    coverImage: '/images/livres/mon-journal-de-victoire.png',
    coverLayout: 'front-only',
    isbn: '9798276847542',
    description:
      "Plus qu'un agenda ou un carnet de notes : un véritable arsenal de guerre spirituelle. Pensé pour accompagner les révélations du livre « Comment préparer et réussir une nouvelle année », ce journal transforme la théorie en pratique quotidienne. Chaque mois, des espaces dédiés pour définir vos objectifs spirituels et naturels, écrire vos prières et décrets, planifier vos jeûnes et sacrifices, activer la Loi de l'Honneur et la Loi des Prémices, documenter vos victoires. Conçu autour des quatre armes de commandement, il vous fait passer de la passivité à l'autorité — mois après mois. Votre saison de conquête commence ici.",
    themes: ['priere', 'reussite', 'leadership', 'foi'],
    datePublished: '2025-11',
    status: 'available',
  },
  {
    slug: 'la-faveur-des-peres',
    title: 'La Faveur des Pères',
    coverImage: '/images/livres/la-faveur-des-peres.png',
    coverLayout: 'recto-verso',
    description:
      "Découvrez le pouvoir générationnel de la bénédiction paternelle dans l'Écriture. Ce livre dévoile comment la faveur transmise par les pères façonne la trajectoire des fils — et pourquoi tout chrétien doit reconquérir ce lien spirituel essentiel pour entrer dans son héritage.",
    themes: ['famille', 'heritage', 'leadership'],
    datePublished: '2024',
    status: 'available',
  },
  {
    slug: 'les-hommes-de-la-race-de-dieu',
    title: 'Les Hommes de la Race de Dieu',
    coverImage: '/images/livres/les-hommes-de-la-race-de-dieu.png',
    coverLayout: 'recto-verso',
    description:
      "Une exhortation prophétique destinée à former une génération de croyants qui portent le sceau de la nature divine. À partir des figures bibliques majeures, le Pasteur Alexandre AMAZOU décline les caractéristiques, les épreuves et les responsabilités des hommes appelés à représenter Dieu sur la terre.",
    themes: ['leadership', 'foi'],
    datePublished: '2023',
    status: 'available',
  },
  {
    slug: 'le-secret-des-prieres-non-exaucees',
    title: 'Le secret des prières non exaucées',
    coverImage: '/images/livres/la-verite-sur-les-prieres-non-exaucees.png',
    coverLayout: 'recto-verso',
    description:
      "Pourquoi certaines prières restent-elles sans réponse ? Cet ouvrage met en lumière les obstacles spirituels, les principes ignorés et les ajustements de cœur nécessaires pour que la prière devienne le canal puissant que Dieu a institué. Un manuel pratique pour intercesseurs et croyants exigeants.",
    themes: ['priere', 'foi'],
    datePublished: '2023',
    status: 'available',
  },
  {
    slug: 'le-protocole-d-acces-a-la-gloire-de-dieu',
    title: "Le Protocole d'accès à la Gloire de Dieu",
    coverImage: '/images/livres/le-protocole-d-acces-a-la-gloire-de-dieu.png',
    coverLayout: 'recto-verso',
    description:
      "La gloire de Dieu n'est pas accessible n'importe comment : elle obéit à un protocole — sanctification, consécration, alignement, offrande. Ce livre déroule pas à pas les conditions bibliques qui permettent au croyant de pénétrer dans la dimension où la présence de Dieu se manifeste avec puissance.",
    themes: ['foi', 'priere'],
    datePublished: '2022',
    status: 'available',
  },
  {
    slug: 'reussir-sa-vie-tome-1',
    title: 'Réussir sa vie',
    subtitle: 'Tome 1',
    coverImage: '/images/livres/reussir-sa-vie.png',
    coverLayout: 'recto-verso',
    description:
      "Réussir sa vie selon Dieu, c'est accomplir le projet pour lequel Il nous a créés — et non simplement collectionner des succès. Manuel de leadership chrétien éprouvé, cet ouvrage trace les étapes incontournables : vocation, vision, valeurs, vertus, victoire — pour quiconque veut laisser une empreinte éternelle.",
    themes: ['leadership', 'reussite'],
    datePublished: '2021',
    status: 'available',
  },
  {
    slug: 'devenir-riche-pour-dieu',
    title: 'Devenir riche pour Dieu',
    coverImage: '/images/livres/devenir-riche-pour-dieu.png',
    coverLayout: 'recto-verso',
    description:
      "La richesse n'est pas un péché ; elle est un mandat lorsqu'elle finance le Royaume. Ce livre développe une théologie chrétienne et africaine de l'argent : produire pour Dieu, gérer pour Dieu, multiplier pour Dieu — afin que les ressources nécessaires à la mission ne manquent plus jamais à l'Église.",
    themes: ['finances', 'leadership', 'foi'],
    datePublished: '2020',
    status: 'available',
  },
  {
    slug: 'commencer-et-bien-finir-sa-vie',
    title: 'Commencer et bien finir sa vie',
    coverImage: '/images/livres/commencer-et-bien-finir-sa-vie.png',
    description:
      "Beaucoup commencent fort et terminent dans la défaite. Cet enseignement révèle les principes spirituels qui permettent non seulement de bien démarrer son appel, mais surtout de tenir jusqu'à la dernière ligne — héritage, persévérance et fidélité à la vocation reçue.",
    themes: ['leadership', 'reussite', 'heritage'],
    datePublished: '2019',
    status: 'available',
  },
  {
    slug: 'devenir-la-meilleure-version-de-soi',
    title: 'Devenir la meilleure version de soi',
    coverImage: '/images/livres/devenir-la-meilleure-version-de-soi.png',
    description:
      "Dieu vous a créé avec un potentiel précis ; ce livre vous donne les clés bibliques pour identifier ce potentiel, le développer méthodiquement et l'incarner pleinement. Un parcours de transformation personnelle ancré dans l'Écriture pour quiconque refuse la médiocrité spirituelle.",
    themes: ['leadership', 'reussite', 'foi'],
    datePublished: '2019',
    status: 'available',
  },
];

export const featuredBook = books.find((b) => b.featured) ?? books[0]!;

export const getBookBySlug = (slug: string): Book | undefined =>
  books.find((b) => b.slug === slug);

export const getRelatedBooks = (current: Book, max = 3): Book[] =>
  books
    .filter((b) => b.slug !== current.slug)
    .filter((b) => b.themes.some((t) => current.themes.includes(t)))
    .slice(0, max);

export const filterBooks = (theme?: BookTheme): Book[] =>
  theme ? books.filter((b) => b.themes.includes(theme)) : books;

export const bestsellerBooks = (): Book[] => books.filter((b) => b.bestseller);
