'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Façade YouTube « click-to-load » réutilisable : n'embarque l'iframe (et les
 * cookies YouTube) qu'au clic. Avant : un poster léger + bouton lecture.
 * Le conteneur (tuile, .yt3, .ytp…) fournit le ratio/positionnement ; la façade
 * remplit ce conteneur en absolu.
 */
export function YouTubeFacade({
  playlistId,
  videoId,
  poster,
  title = 'Lancer les enseignements',
  subtitle = 'Playlist officielle · YouTube',
  ariaLabel = 'Lancer la lecture des enseignements',
  className,
}: {
  playlistId?: string;
  videoId?: string;
  poster?: string;
  title?: string;
  subtitle?: string;
  ariaLabel?: string;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  const src = videoId
    ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`
    : `https://www.youtube-nocookie.com/embed/videoseries?list=${playlistId}&autoplay=1&rel=0`;

  if (loaded) {
    return (
      <iframe
        src={src}
        title={title || 'Vidéo YouTube'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      className={cn('yt-facade', poster && 'has-poster', className)}
      style={poster ? { backgroundImage: `url(${poster})` } : undefined}
      aria-label={ariaLabel}
      onClick={() => setLoaded(true)}
    >
      <span className="pv">
        <span className="play" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        {title ? <span className="t">{title}</span> : null}
        {subtitle ? <span className="s">{subtitle}</span> : null}
      </span>
    </button>
  );
}
