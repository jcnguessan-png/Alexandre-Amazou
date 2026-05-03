export type PodcastEpisode = {
  id: string;
  title: string;
  description: string;
  publishedAt: string; // ISO
  duration: string; // ISO 8601 (PT45M)
  audioUrl?: string;
  spotifyUrl?: string;
  applePodcastUrl?: string;
  deezerUrl?: string;
  youtubeUrl?: string;
};

export const podcastInfo = {
  name: 'La Voix du Pasteur',
  description:
    "Le podcast officiel du Pasteur Alexandre AMAZOU : enseignements, méditations bibliques, échanges sur le leadership et la doctrine — chaque semaine.",
  // À renseigner une fois le podcast créé sur Spotify for Podcasters.
  spotifyShowUrl: '',
  applePodcastUrl: '',
  deezerUrl: '',
  rssUrl: '',
};

export const podcastEpisodes: PodcastEpisode[] = [
  // Placeholder — à brancher sur le flux RSS réel ou sur l'API Spotify Podcaster.
];
