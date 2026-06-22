'use client';

import { useState } from 'react';

/**
 * Façade YouTube « click-to-load » : n'embarque l'iframe (et les cookies
 * YouTube) qu'au clic. Avant : un poster léger + bouton lecture.
 */
export function YouTubeFacade({
  playlistId,
  poster,
}: {
  playlistId: string;
  poster?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/videoseries?list=${playlistId}&autoplay=1&rel=0`}
        title="Enseignements du Pasteur Alexandre AMAZOU"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      className="yt-facade"
      style={poster ? { backgroundImage: `url(${poster})` } : undefined}
      aria-label="Lancer la lecture des enseignements (playlist officielle YouTube)"
      onClick={() => setLoaded(true)}
    >
      <span className="pv">
        <span className="play" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        <span className="t">Lancer les enseignements</span>
        <span className="s">Playlist officielle · YouTube</span>
      </span>
    </button>
  );
}
