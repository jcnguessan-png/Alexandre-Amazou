import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Headphones, Rss, Youtube, ExternalLink, Play } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import { podcastInfo } from '@/data/podcasts';
import { safeGetPodcastFeed, formatPublishedAt } from '@/lib/podcast';

export const metadata: Metadata = {
  title: `Podcast — ${podcastInfo.name}`,
  description: podcastInfo.description,
  alternates: { canonical: '/podcast' },
  openGraph: {
    title: `${podcastInfo.name} — ${podcastInfo.tagline}`,
    description: podcastInfo.description,
    url: '/podcast',
  },
};

// Revalidation à la minute — les ajouts/modifs depuis Spotify for Podcasters
// remontent rapidement sur le site sans rebuild.
export const revalidate = 60;

export default async function PodcastPage() {
  const feed = await safeGetPodcastFeed();
  const episodes = feed?.episodes ?? [];
  const showImage = feed?.show.imageUrl;
  const hasPublicSpotify = Boolean(podcastInfo.spotifyShowUrl);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', href: '/' },
          { name: 'Podcast', href: '/podcast' },
        ])}
      />

      <div className="container py-16 md:py-20">
        <SectionTitle
          as="h1"
          eyebrow="Podcast officiel"
          title={podcastInfo.name}
          description={podcastInfo.description}
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.6fr]">
          {/* ── Aside : plateformes d'écoute ───────────────────────── */}
          <aside className="rounded-lg border border-border bg-muted/30 p-6 md:p-8 lg:sticky lg:top-28 lg:self-start">
            <Headphones className="text-secondary" size={36} aria-hidden="true" />
            <h2 className="mt-4 font-heading text-xl font-semibold text-primary">
              Écouter sur votre plateforme
            </h2>
            <p className="mt-3 text-sm text-foreground/70">
              Abonne-toi sur la plateforme de ton choix pour ne manquer
              aucun épisode.
            </p>

            <ul className="mt-6 space-y-3 text-sm">
              <PlatformRow
                label="Spotify"
                href={podcastInfo.spotifyShowUrl}
                fallbackLabel="À venir"
              />
              <PlatformRow
                label="Apple Podcasts"
                href={podcastInfo.applePodcastUrl}
                fallbackLabel="À venir"
              />
              <PlatformRow
                label="Deezer"
                href={podcastInfo.deezerUrl}
                fallbackLabel="À venir"
              />
              <PlatformRow
                label="YouTube"
                href={podcastInfo.youtubePlaylistUrl}
              />
              <PlatformRow
                label="Flux RSS"
                href={podcastInfo.rssUrl}
                icon={<Rss size={14} aria-hidden="true" />}
              />
            </ul>

            <div className="mt-6 border-t border-border pt-6">
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href="/newsletter">Être prévenu·e des nouveaux épisodes</Link>
              </Button>
            </div>
          </aside>

          {/* ── Liste des épisodes audio (RSS) ──────────────────────── */}
          <section aria-labelledby="episodes-heading">
            <h2
              id="episodes-heading"
              className="font-heading text-2xl font-semibold text-primary"
            >
              Derniers épisodes
            </h2>
            <span className="mt-3 block h-[2px] w-12 bg-secondary" aria-hidden="true" />

            {episodes.length === 0 ? (
              <div className="mt-8 rounded-lg border border-dashed border-border bg-background p-8 text-center">
                <Rss className="mx-auto text-secondary" size={32} aria-hidden="true" />
                <p className="mt-4 text-foreground/70">
                  Les premiers épisodes arrivent très bientôt — abonne-toi
                  dès maintenant pour ne rien manquer.
                </p>
              </div>
            ) : (
              <ol className="mt-8 space-y-5">
                {episodes.map((ep, index) => (
                  <li
                    key={ep.id}
                    className="rounded-lg border border-border bg-background p-5 transition hover:border-secondary/40 hover:shadow-sm md:p-6"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:gap-6">
                      {showImage ? (
                        <div className="relative aspect-square w-full max-w-[140px] flex-shrink-0 self-start overflow-hidden rounded-md bg-muted md:w-32">
                          <Image
                            src={showImage}
                            alt=""
                            fill
                            sizes="140px"
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      ) : null}

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-foreground/55">
                          <span className="font-semibold text-secondary">
                            Épisode {episodes.length - index}
                          </span>
                          <span aria-hidden="true">•</span>
                          <time dateTime={ep.publishedAt}>
                            {formatPublishedAt(ep.publishedAt)}
                          </time>
                          {ep.durationLabel ? (
                            <>
                              <span aria-hidden="true">•</span>
                              <span>{ep.durationLabel}</span>
                            </>
                          ) : null}
                        </div>

                        <h3 className="mt-2 font-heading text-lg font-semibold leading-snug text-primary md:text-xl">
                          {ep.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                          {ep.description}
                        </p>

                        {ep.audioUrl ? (
                          <audio
                            controls
                            preload="none"
                            className="mt-4 w-full"
                            src={ep.audioUrl}
                          >
                            Votre navigateur ne supporte pas la lecture audio.
                          </audio>
                        ) : null}

                        {hasPublicSpotify && ep.spotifyEpisodeUrl ? (
                          <div className="mt-3">
                            <a
                              href={ep.spotifyEpisodeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-medium text-secondary hover:underline"
                            >
                              Écouter sur Spotify
                              <ExternalLink size={12} aria-hidden="true" />
                            </a>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </section>
        </div>

        {/* ── Section vidéo : playlist YouTube ──────────────────────── */}
        <section
          aria-labelledby="video-heading"
          className="mt-20 border-t border-border pt-16"
        >
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
            <div>
              <p className="font-quote text-sm uppercase tracking-[0.22em] text-secondary">
                Aussi en vidéo
              </p>
              <h2
                id="video-heading"
                className="mt-3 font-heading text-2xl font-semibold leading-tight text-primary md:text-3xl"
              >
                La playlist Séquences Vérité sur YouTube
              </h2>
              <span className="mt-4 block h-[2px] w-12 bg-secondary" aria-hidden="true" />
              <p className="mt-5 text-base leading-relaxed text-foreground/80">
                Chaque épisode du podcast est aussi disponible en vidéo
                sur la chaîne YouTube officielle. Lis-les directement ici
                ou ouvre la playlist complète pour t'abonner et activer la
                cloche.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="primary" size="md">
                  <a
                    href={podcastInfo.youtubePlaylistUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Youtube size={18} aria-hidden="true" />
                    Voir la playlist sur YouTube
                  </a>
                </Button>
                <Button asChild variant="outline" size="md">
                  <Link href="/mes-enseignements">
                    <Play size={16} aria-hidden="true" />
                    Tous les enseignements
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-muted shadow-md">
              <iframe
                title="Playlist YouTube — Séquences Vérité"
                src={`https://www.youtube-nocookie.com/embed/videoseries?list=${podcastInfo.youtubePlaylistId}&rel=0`}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function PlatformRow({
  label,
  href,
  fallbackLabel = 'À venir',
  icon,
}: {
  label: string;
  href?: string;
  fallbackLabel?: string;
  icon?: React.ReactNode;
}) {
  if (!href) {
    return (
      <li className="flex items-center justify-between text-foreground/60">
        <span className="flex items-center gap-2">
          {icon}
          {label}
        </span>
        <span className="text-xs uppercase tracking-wide text-secondary">
          {fallbackLabel}
        </span>
      </li>
    );
  }
  return (
    <li className="flex items-center justify-between text-foreground/80">
      <span className="flex items-center gap-2">
        {icon}
        {label}
      </span>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-primary transition hover:text-secondary"
      >
        Écouter
        <ExternalLink size={12} aria-hidden="true" />
      </a>
    </li>
  );
}
