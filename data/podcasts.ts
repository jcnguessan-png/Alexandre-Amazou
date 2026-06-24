/**
 * Émissions de podcast du Pasteur Alexandre AMAZOU.
 *
 * Métadonnées statiques ; les épisodes sont récupérés à la volée depuis le flux
 * RSS de chaque émission via lib/podcast.ts (safeGetPodcastFeed). Pour ajouter
 * une nouvelle émission : ajouter une entrée au tableau `podcasts`.
 */

export type PodcastShow = {
  /** Identifiant d'URL : /podcast/<slug> */
  slug: string;
  name: string;
  tagline: string;
  description: string;
  /** Flux RSS officiel — source des épisodes (audio) affichés sur le site. */
  rssUrl: string;
  /** Émission mise en avant (tête d'affiche du hub /podcast). */
  featured?: boolean;
  /** Plateformes d'écoute — laissées vides tant que la distribution n'est pas
   *  validée par la plateforme ; les boutons restent masqués dans ce cas. */
  spotifyShowUrl?: string;
  applePodcastUrl?: string;
  amazonMusicUrl?: string;
  deezerUrl?: string;
  /** Version vidéo : playlist YouTube de l'émission. */
  youtubePlaylistId?: string;
  youtubePlaylistUrl?: string;
};

export const podcasts: PodcastShow[] = [
  {
    slug: 'pasteur-jai-une-question',
    name: "Pasteur, j'ai une question",
    tagline: 'Le Pasteur Alexandre AMAZOU répond à vos questions',
    description:
      "Et si tu posais enfin ta question au pasteur ? Chaque mardi et vendredi, le Pasteur Alexandre AMAZOU répond à vos questions — spirituelles, pratiques, personnelles — avec la Parole de Dieu pour seule boussole. Des réponses courtes, franches et bibliques pour avancer.",
    rssUrl:
      'https://media.rss.com/pasteur-j-ai-une-question-by-pasteur-alexandre-amazou/feed.xml',
    featured: true,
    spotifyShowUrl: 'https://open.spotify.com/show/033E4Yh4A0tS2fIzidJbkV',
    applePodcastUrl: '', // distribution Apple en erreur côté rss.com — à brancher quand corrigée
    amazonMusicUrl:
      "https://music.amazon.fr/podcasts/7ca38e03-d531-4485-a14d-f7b53ecc3d43/pasteur-j'ai-une-question-by-pasteur-alexandre-amazou",
    deezerUrl: '',
    youtubePlaylistId: 'PL1j6au4j0Fs7SizoeI8Qa3Bg9LZ3X90jb',
    youtubePlaylistUrl:
      'https://www.youtube.com/playlist?list=PL1j6au4j0Fs7SizoeI8Qa3Bg9LZ3X90jb',
  },
  {
    slug: 'sequences-verite',
    name: 'Séquences Vérité',
    tagline: 'Le podcast officiel du Pasteur Alexandre AMAZOU',
    description:
      "Des séquences courtes, denses et pratiques pour comprendre les lois spirituelles qui gouvernent ta vie : combat spirituel, leadership chrétien, autorité du croyant, vie de prière, vision et destinée. Un enseignement biblique sans concession — pour quiconque refuse de vivre en défaite.",
    rssUrl: 'https://anchor.fm/s/11269faec/podcast/rss',
    spotifyShowUrl: '',
    applePodcastUrl: '',
    deezerUrl: '',
    youtubePlaylistId: 'PL1j6au4j0Fs59kGmxcy7Dcbi5Tu6NuLfd',
    youtubePlaylistUrl:
      'https://www.youtube.com/playlist?list=PL1j6au4j0Fs59kGmxcy7Dcbi5Tu6NuLfd',
  },
];

export const featuredPodcast: PodcastShow = podcasts.find((p) => p.featured) ?? podcasts[0]!;

export const getPodcastBySlug = (slug: string): PodcastShow | undefined =>
  podcasts.find((p) => p.slug === slug);
