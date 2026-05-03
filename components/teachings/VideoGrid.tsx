import type { Video } from '@/lib/youtube';
import { VideoCard } from './VideoCard';
import { cn } from '@/lib/utils';

export function VideoGrid({
  videos,
  className,
  emptyMessage = 'Aucune vidéo disponible pour le moment.',
}: {
  videos: Video[];
  className?: string;
  emptyMessage?: string;
}) {
  if (videos.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-muted/40 p-12 text-center text-foreground/60">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3',
        className,
      )}
    >
      {videos.map((video, idx) => (
        <VideoCard key={video.id} video={video} priority={idx < 3} />
      ))}
    </div>
  );
}
