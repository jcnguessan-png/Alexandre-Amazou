'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { cn, formatDuration } from '@/lib/utils';

/**
 * Façade YouTube : ne charge l'iframe qu'au clic, en place dans la même
 * vignette aspect-video. Économise jusqu'à 1 Mo de JS/CSS par vidéo non
 * visionnée et garde l'utilisateur sur le site (lecture intégrée).
 */
export function VideoPlayer({
  videoId,
  title,
  thumbnailUrl,
  duration,
  className,
  autoplay = true,
  priority = false,
}: {
  videoId: string;
  title: string;
  thumbnailUrl?: string;
  /** Durée ISO 8601 (PT12M34S) — affichée en bas à droite */
  duration?: string;
  className?: string;
  autoplay?: boolean;
  priority?: boolean;
}) {
  const [activated, setActivated] = useState(false);
  const fallbackThumb = thumbnailUrl ?? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  if (activated) {
    return (
      <div
        className={cn(
          'relative aspect-video overflow-hidden rounded-lg bg-primary',
          className,
        )}
      >
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActivated(true)}
      aria-label={`Lire la vidéo : ${title}`}
      className={cn(
        'group relative aspect-video w-full overflow-hidden rounded-lg bg-primary focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2',
        className,
      )}
    >
      <Image
        src={fallbackThumb}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        priority={priority}
        unoptimized={fallbackThumb.startsWith('https://i.ytimg.com')}
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/10 to-transparent transition-opacity group-hover:opacity-90"
      />
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-secondary text-primary shadow-xl transition-transform group-hover:scale-110"
      >
        <Play size={28} className="ml-1 fill-current" />
      </span>
      {duration ? (
        <span className="absolute bottom-2 right-2 rounded bg-primary/90 px-2 py-0.5 text-xs font-medium text-primary-foreground">
          {formatDuration(duration)}
        </span>
      ) : null}
    </button>
  );
}
