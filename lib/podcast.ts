/**
 * Lecture du flux RSS du podcast Anchor / Spotify for Podcasters.
 *
 * Le flux est revalidé toutes les heures (revalidate: 3600 sur la page).
 * En cas d'erreur réseau ou de parsing, les fonctions safe* retournent un
 * tableau vide pour ne pas casser le rendu de la page.
 */

import { XMLParser } from 'fast-xml-parser';

export type PodcastShow = {
  title: string;
  description: string;
  imageUrl?: string;
  link?: string;
  language?: string;
  author?: string;
};

export type PodcastEpisode = {
  id: string;
  title: string;
  description: string; // HTML strippé
  descriptionHtml: string; // brut, avec balises (utile si on veut un rendu riche)
  publishedAt: string; // ISO
  durationSeconds?: number;
  durationLabel?: string; // ex. "8 min"
  audioUrl?: string;
  imageUrl?: string;
  spotifyEpisodeUrl?: string;
};

export type PodcastFeed = {
  show: PodcastShow;
  episodes: PodcastEpisode[];
};

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  cdataPropName: '__cdata',
  parseTagValue: true,
  trimValues: true,
});

function unwrapCdata(value: unknown): string {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return String(value);
  if (typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    if (typeof obj.__cdata === 'string') return obj.__cdata;
    if (typeof obj['#text'] === 'string') return obj['#text'] as string;
  }
  return '';
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function parseDuration(raw: unknown): { seconds?: number; label?: string } {
  const s = unwrapCdata(raw);
  if (!s) return {};
  // Format "HH:MM:SS" ou "MM:SS" ou nombre de secondes
  const parts = s.split(':').map((p) => parseInt(p, 10));
  let seconds: number | undefined;
  if (parts.length === 3) seconds = parts[0]! * 3600 + parts[1]! * 60 + parts[2]!;
  else if (parts.length === 2) seconds = parts[0]! * 60 + parts[1]!;
  else if (parts.length === 1 && !Number.isNaN(parts[0])) seconds = parts[0];
  if (!seconds || Number.isNaN(seconds)) return {};
  const minutes = Math.round(seconds / 60);
  const label = minutes < 60 ? `${minutes} min` : `${Math.floor(minutes / 60)} h ${minutes % 60} min`;
  return { seconds, label };
}

/**
 * Récupère et parse le flux RSS du podcast (Anchor/Spotify for Podcasters).
 * Throw en cas d'erreur réseau ou de parsing — utiliser `safeGetPodcastFeed`
 * pour un fallback gracieux.
 */
export async function getPodcastFeed(rssUrl: string): Promise<PodcastFeed> {
  if (!rssUrl) {
    throw new Error('rssUrl manquant');
  }

  // Timeout dur : un flux lent/bloqué ne doit jamais figer le build ni une page
  // (safeGetPodcastFeed renverra null → état « épisodes bientôt » + ISR ensuite).
  const res = await fetch(rssUrl, {
    headers: { 'User-Agent': 'AlexandreAmazouSite/1.0 (+https://alexandreamazou.com)' },
    next: { revalidate: 600 },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) {
    throw new Error(`RSS fetch failed: ${res.status} ${res.statusText}`);
  }
  const xml = await res.text();
  const parsed = parser.parse(xml);
  const channel = parsed?.rss?.channel;
  if (!channel) throw new Error('Flux RSS invalide : channel introuvable');

  const show: PodcastShow = {
    title: unwrapCdata(channel.title),
    description: unwrapCdata(channel.description),
    imageUrl:
      channel['itunes:image']?.['@_href'] ??
      unwrapCdata(channel.image?.url) ??
      undefined,
    link: unwrapCdata(channel.link) || undefined,
    language: unwrapCdata(channel.language) || undefined,
    author:
      unwrapCdata(channel['itunes:author']) ||
      unwrapCdata(channel.author) ||
      undefined,
  };

  const items = Array.isArray(channel.item)
    ? channel.item
    : channel.item
      ? [channel.item]
      : [];

  const episodes: PodcastEpisode[] = items.map((item: Record<string, unknown>) => {
    const guid = unwrapCdata(item.guid) || unwrapCdata(item.title);
    const descriptionHtml = unwrapCdata(item.description);
    const duration = parseDuration(item['itunes:duration']);
    const enclosure = (item.enclosure ?? {}) as Record<string, string>;
    const itunesImage = (item['itunes:image'] ?? {}) as Record<string, string>;
    const link = unwrapCdata(item.link);

    return {
      id: guid,
      title: unwrapCdata(item.title),
      description: stripHtml(descriptionHtml),
      descriptionHtml,
      publishedAt: new Date(unwrapCdata(item.pubDate)).toISOString(),
      durationSeconds: duration.seconds,
      durationLabel: duration.label,
      audioUrl: enclosure['@_url'] || undefined,
      imageUrl: itunesImage['@_href'] || undefined,
      spotifyEpisodeUrl: link || undefined,
    };
  });

  // Tri du plus récent au plus ancien (par sécurité — Anchor le fait déjà)
  episodes.sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));

  return { show, episodes };
}

export async function safeGetPodcastFeed(rssUrl: string): Promise<PodcastFeed | null> {
  try {
    return await getPodcastFeed(rssUrl);
  } catch (err) {
    console.warn('[podcast] safeGetPodcastFeed failed:', err instanceof Error ? err.message : err);
    return null;
  }
}

export function formatPublishedAt(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
