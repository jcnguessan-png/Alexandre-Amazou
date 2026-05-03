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
    title: 'La réalité du monde des esprits',
    subtitle: 'Tome 1 — Réédition 2026',
    coverImage: '/images/livres/la-realite-du-monde-des-esprits.png',
    coverLayout: 'pub-poster',
    description:
      "Une plongée biblique rigoureuse dans la cosmologie spirituelle : comment le monde des esprits — créé par Dieu et divisé en deux camps après la chute de Lucifer — gouverne les destinées personnelles, familiales et nationales. Cette réédition 2026 enrichie est un enseignement de référence pour comprendre les enjeux invisibles de la vie chrétienne, accompagnée d'un livret de 40 jours d'application pratique.",
    themes: ['monde-spirituel', 'foi'],
    datePublished: '2026',
    excerptFile: 'la-realite-du-monde-des-esprits-partie-1.mdx',
    status: 'available',
    featured: true,
    companion: {
      title: 'Livret de 40 jours',
      description:
        "Un compagnon pratique pour ancrer dans la prière, la méditation et l'action les vérités du livre — un cycle de 40 jours pour passer de la connaissance à l'expérience.",
      pdfUrl: '/livres/livret-40-jours-la-realite-du-monde-des-esprits.pdf',
    },
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
    title: 'Comment préparer et réussir une nouvelle année',
    subtitle: 'Avec Mon Journal de Victoire',
    coverImage: '/images/livres/preparer-et-reussir-une-nouvelle-annee.png',
    coverLayout: 'pub-poster',
    description:
      "Best-seller. Aborder une nouvelle année sans plan, c'est se condamner à répéter les mêmes saisons. Ce manuel développe une méthode prophétique éprouvée pour discerner les directions divines, fixer des objectifs alignés sur sa vocation, et tenir le cap toute l'année — avec un Journal de Victoire pour suivre concrètement ses combats et ses percées.",
    themes: ['leadership', 'reussite', 'foi'],
    datePublished: '2025',
    status: 'available',
    bestseller: true,
    companion: {
      title: 'Mon Journal de Victoire',
      description:
        "52 semaines de suivi prophétique : objectifs, prière, méditation, journal de gratitude — un compagnon pour ne plus laisser une année passer sans victoires marquantes.",
    },
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
