import { Clock, Eye } from 'lucide-react';
import type { Video } from '@/lib/youtube';
import { formatDuration, formatViewCount, formatDateFR, cn } from '@/lib/utils';
import { VideoPlayer } from './VideoPlayer';

export function VideoCard({
  video,
  className,
  priority = false,
}: {
  video: Video;
  className?: string;
  priority?: boolean;
}) {
  return (
    <article className={cn('group flex flex-col', className)}>
      <VideoPlayer
        videoId={video.id}
        title={video.title}
        thumbnailUrl={video.thumbnailHigh ?? video.thumbnailUrl}
        duration={video.duration}
        priority={priority}
      />

      <div className="mt-4 flex flex-1 flex-col">
        <h3 className="line-clamp-2 text-base font-semibold leading-snug text-primary">
          {video.title}
        </h3>
        <div className="mt-2 flex items-center gap-4 text-xs text-foreground/60">
          <time dateTime={video.publishedAt}>{formatDateFR(video.publishedAt)}</time>
          {video.viewCount ? (
            <span className="inline-flex items-center gap-1">
              <Eye size={13} aria-hidden="true" />
              {formatViewCount(video.viewCount)}
            </span>
          ) : null}
          {video.duration ? (
            <span className="inline-flex items-center gap-1">
              <Clock size={13} aria-hidden="true" />
              {formatDuration(video.duration)}
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
