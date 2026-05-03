/**
 * YouTube Data API v3 client
 * Docs : https://developers.google.com/youtube/v3
 */

const API_BASE = 'https://www.googleapis.com/youtube/v3';
const REVALIDATE_SECONDS = 3600; // 1h — préserve le quota gratuit (10 000 unités/jour)

export type Video = {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  thumbnailHigh?: string;
  publishedAt: string;
  channelId: string;
  channelTitle: string;
  duration?: string; // ISO 8601 (PT12M34S)
  viewCount?: string;
  likeCount?: string;
  playlistId?: string;
};

export type Playlist = {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  itemCount?: number;
  publishedAt: string;
};

class YouTubeError extends Error {
  constructor(message: string, public readonly status?: number) {
    super(message);
    this.name = 'YouTubeError';
  }
}

function getApiKey(): string {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) {
    throw new YouTubeError(
      'YOUTUBE_API_KEY manquante — copier .env.example en .env.local et renseigner la clé.',
    );
  }
  return key;
}

function getChannelId(): string {
  const id = process.env.YOUTUBE_CHANNEL_ID;
  if (!id) {
    throw new YouTubeError('YOUTUBE_CHANNEL_ID manquant.');
  }
  return id;
}

async function ytFetch<T>(path: string, params: Record<string, string | number>): Promise<T> {
  const url = new URL(`${API_BASE}/${path}`);
  url.searchParams.set('key', getApiKey());
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, String(v));
  }

  const res = await fetch(url.toString(), {
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new YouTubeError(
      `YouTube API ${res.status}: ${res.statusText}${body ? ` — ${body.slice(0, 200)}` : ''}`,
      res.status,
    );
  }

  return res.json() as Promise<T>;
}

const pickThumb = (snippet: {
  thumbnails?: { default?: { url: string }; medium?: { url: string }; high?: { url: string }; maxres?: { url: string } };
}) => {
  const t = snippet.thumbnails ?? {};
  return {
    medium: t.medium?.url ?? t.high?.url ?? t.default?.url ?? '',
    high: t.maxres?.url ?? t.high?.url ?? t.medium?.url ?? '',
  };
};

/**
 * Récupère les dernières vidéos de la chaîne (par date).
 * Coût : 100 unités par appel — utiliser avec parcimonie.
 */
export async function getLatestVideos(maxResults = 6): Promise<Video[]> {
  const channelId = getChannelId();
  const data = await ytFetch<{
    items: Array<{
      id: { videoId: string };
      snippet: {
        title: string;
        description: string;
        channelId: string;
        channelTitle: string;
        publishedAt: string;
        thumbnails: Record<string, { url: string }>;
      };
    }>;
  }>('search', {
    channelId,
    order: 'date',
    type: 'video',
    part: 'snippet',
    maxResults,
  });

  const videos: Video[] = data.items.map((item) => {
    const thumbs = pickThumb(item.snippet);
    return {
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnailUrl: thumbs.medium,
      thumbnailHigh: thumbs.high,
      publishedAt: item.snippet.publishedAt,
      channelId: item.snippet.channelId,
      channelTitle: item.snippet.channelTitle,
    };
  });

  // Optionnel : enrichir avec contentDetails / statistics en un seul appel batch
  if (videos.length > 0) {
    return enrichVideos(videos);
  }
  return videos;
}

/**
 * Vidéos d'une playlist (séries thématiques).
 * Coût : 1 unité par appel.
 */
export async function getVideosByPlaylistId(
  playlistId: string,
  maxResults = 50,
): Promise<Video[]> {
  const data = await ytFetch<{
    items: Array<{
      snippet: {
        title: string;
        description: string;
        channelId: string;
        channelTitle: string;
        publishedAt: string;
        resourceId: { videoId: string };
        thumbnails: Record<string, { url: string }>;
      };
    }>;
  }>('playlistItems', {
    part: 'snippet',
    playlistId,
    maxResults: Math.min(maxResults, 50),
  });

  const videos: Video[] = data.items
    .filter((it) => it.snippet.resourceId?.videoId)
    .map((item) => {
      const thumbs = pickThumb(item.snippet);
      return {
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnailUrl: thumbs.medium,
        thumbnailHigh: thumbs.high,
        publishedAt: item.snippet.publishedAt,
        channelId: item.snippet.channelId,
        channelTitle: item.snippet.channelTitle,
        playlistId,
      };
    });

  return enrichVideos(videos);
}

/**
 * Détail enrichi (durée, vues) — batch jusqu'à 50 vidéos par appel.
 * Coût : 1 unité par appel.
 */
export async function getVideoDetails(videoIds: string[]): Promise<Map<string, Pick<Video, 'duration' | 'viewCount' | 'likeCount'>>> {
  const map = new Map<string, Pick<Video, 'duration' | 'viewCount' | 'likeCount'>>();
  if (videoIds.length === 0) return map;

  // Batch par 50
  for (let i = 0; i < videoIds.length; i += 50) {
    const batch = videoIds.slice(i, i + 50);
    const data = await ytFetch<{
      items: Array<{
        id: string;
        contentDetails?: { duration: string };
        statistics?: { viewCount?: string; likeCount?: string };
      }>;
    }>('videos', {
      id: batch.join(','),
      part: 'contentDetails,statistics',
    });

    for (const item of data.items) {
      map.set(item.id, {
        duration: item.contentDetails?.duration,
        viewCount: item.statistics?.viewCount,
        likeCount: item.statistics?.likeCount,
      });
    }
  }
  return map;
}

async function enrichVideos(videos: Video[]): Promise<Video[]> {
  try {
    const details = await getVideoDetails(videos.map((v) => v.id));
    return videos.map((v) => {
      const d = details.get(v.id);
      return d ? { ...v, ...d } : v;
    });
  } catch {
    return videos;
  }
}

/**
 * Liste des playlists de la chaîne — utilisé pour générer les filtres "séries".
 * Coût : 1 unité par appel.
 */
export async function getChannelPlaylists(maxResults = 25): Promise<Playlist[]> {
  const channelId = getChannelId();
  const data = await ytFetch<{
    items: Array<{
      id: string;
      snippet: {
        title: string;
        description: string;
        publishedAt: string;
        thumbnails: Record<string, { url: string }>;
      };
      contentDetails?: { itemCount: number };
    }>;
  }>('playlists', {
    channelId,
    part: 'snippet,contentDetails',
    maxResults: Math.min(maxResults, 50),
  });

  return data.items.map((item) => {
    const thumbs = pickThumb(item.snippet);
    return {
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnailUrl: thumbs.medium,
      itemCount: item.contentDetails?.itemCount,
      publishedAt: item.snippet.publishedAt,
    };
  });
}

export { YouTubeError };

/**
 * Fallback safe : retourne [] en cas d'erreur (clé manquante, quota dépassé)
 * pour ne jamais casser le rendu d'une page publique.
 */
export async function safeGetLatestVideos(maxResults = 6): Promise<Video[]> {
  try {
    return await getLatestVideos(maxResults);
  } catch (err) {
    console.warn('[youtube] safeGetLatestVideos failed:', err instanceof Error ? err.message : err);
    return [];
  }
}

export async function safeGetChannelPlaylists(maxResults = 25): Promise<Playlist[]> {
  try {
    return await getChannelPlaylists(maxResults);
  } catch (err) {
    console.warn('[youtube] safeGetChannelPlaylists failed:', err instanceof Error ? err.message : err);
    return [];
  }
}

export async function safeGetVideosByPlaylistId(playlistId: string, maxResults = 50): Promise<Video[]> {
  try {
    return await getVideosByPlaylistId(playlistId, maxResults);
  } catch (err) {
    console.warn('[youtube] safeGetVideosByPlaylistId failed:', err instanceof Error ? err.message : err);
    return [];
  }
}

/**
 * Vidéos de la playlist officielle (curée par le pasteur).
 * Variable d'env : YOUTUBE_FEATURED_PLAYLIST_ID.
 */
export async function safeGetFeaturedPlaylistVideos(maxResults = 50): Promise<Video[]> {
  const playlistId = process.env.YOUTUBE_FEATURED_PLAYLIST_ID;
  if (!playlistId) {
    console.warn('[youtube] YOUTUBE_FEATURED_PLAYLIST_ID manquant — fallback sur les dernières vidéos.');
    return safeGetLatestVideos(maxResults);
  }
  return safeGetVideosByPlaylistId(playlistId, maxResults);
}
