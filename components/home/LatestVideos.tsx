import Link from 'next/link';
import { ArrowRight, Clock, Eye } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { VideoCard } from '@/components/teachings/VideoCard';
import { VideoPlayer } from '@/components/teachings/VideoPlayer';
import type { Video } from '@/lib/youtube';
import { formatDateFR, formatDuration, formatViewCount } from '@/lib/utils';

export function LatestVideos({ videos }: { videos: Video[] }) {
  const [featured, ...rest] = videos;
  const others = rest.slice(0, 4);

  return (
    <section
      aria-labelledby="latest-videos-heading"
      className="bg-muted/30 py-14 md:py-20"
    >
      <div className="container">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionTitle
            as="h2"
            eyebrow="Mes derniers enseignements"
            title="La parole, sans concession"
            description="Prédications, séminaires et émissions — chaque semaine, une nouvelle exhortation pour fortifier votre foi et votre marche avec Dieu."
            className="md:max-w-xl"
          />
          <Button asChild variant="outline" size="md" className="md:flex-shrink-0">
            <Link href="/mes-enseignements">
              Voir tous mes enseignements
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Button>
        </div>

        {featured ? (
          <div className="mt-12 space-y-12">
            <article className="mx-auto max-w-5xl">
              <div className="overflow-hidden rounded-xl shadow-lg ring-1 ring-border/60">
                <VideoPlayer
                  videoId={featured.id}
                  title={featured.title}
                  thumbnailUrl={featured.thumbnailHigh ?? featured.thumbnailUrl}
                  duration={featured.duration}
                  priority
                />
              </div>

              <div className="mt-6">
                <h3 className="text-balance font-heading text-2xl font-semibold leading-snug text-primary md:text-3xl">
                  {featured.title}
                </h3>
                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-foreground/60">
                  <time dateTime={featured.publishedAt}>
                    {formatDateFR(featured.publishedAt)}
                  </time>
                  {featured.viewCount ? (
                    <span className="inline-flex items-center gap-1.5">
                      <Eye size={14} aria-hidden="true" />
                      {formatViewCount(featured.viewCount)} vues
                    </span>
                  ) : null}
                  {featured.duration ? (
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={14} aria-hidden="true" />
                      {formatDuration(featured.duration)}
                    </span>
                  ) : null}
                </div>
              </div>
            </article>

            {others.length > 0 ? (
              <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                {others.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            ) : null}
          </div>
        ) : (
          <div className="mt-12 rounded-lg border border-dashed border-border bg-muted/40 p-12 text-center text-foreground/60">
            Les enseignements seront affichés dès que la clé YouTube API sera renseignée.
          </div>
        )}
      </div>
    </section>
  );
}
