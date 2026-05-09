/**
 * Métadonnées statiques du podcast Séquences Vérité.
 *
 * Les épisodes sont récupérés à la volée depuis le flux RSS Anchor/Spotify
 * via lib/podcast.ts (safeGetPodcastFeed). Voir app/podcast/page.tsx.
 */

export const podcastInfo = {
  name: 'Séquences Vérité',
  tagline: 'Le podcast officiel du Pasteur Alexandre AMAZOU',
  description:
    "Des séquences courtes, denses et pratiques pour comprendre les lois spirituelles qui gouvernent ta vie : combat spirituel, leadership chrétien, autorité du croyant, vie de prière, vision et destinée. Un enseignement biblique sans concession — pour quiconque refuse de vivre en défaite.",

  // Flux RSS officiel (Anchor / Spotify for Podcasters) — utilisé par le site
  // pour afficher les épisodes audio.
  rssUrl: 'https://anchor.fm/s/11269faec/podcast/rss',

  // Plateformes d'écoute (audio) — URLs publiques à renseigner une fois la
  // distribution validée par chaque plateforme (24-72h après création).
  spotifyShowUrl: '', // ex. https://open.spotify.com/show/<id>
  applePodcastUrl: '',
  deezerUrl: '',

  // Version vidéo : playlist YouTube "Séquences Vérité"
  youtubePlaylistId: 'PL1j6au4j0Fs59kGmxcy7Dcbi5Tu6NuLfd',
  youtubePlaylistUrl:
    'https://www.youtube.com/playlist?list=PL1j6au4j0Fs59kGmxcy7Dcbi5Tu6NuLfd',
} as const;
