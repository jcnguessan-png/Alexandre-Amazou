import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema, podcastSchema } from '@/lib/schema';
import { podcasts, getPodcastBySlug } from '@/data/podcasts';
import { safeGetPodcastFeed, formatPublishedAt } from '@/lib/podcast';
import { YouTubeFacade } from '@/components/home/dynamic/YouTubeFacade';
import { Headphones, PlatformRow } from '@/components/podcast/shared';
import '../podcast.css';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return podcasts.map((p) => ({ slug: p.slug }));
}

// Revalidation toutes les 10 min — les nouveaux épisodes remontent vite.
export const revalidate = 600;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const show = getPodcastBySlug(params.slug);
  if (!show) return {};
  return {
    title: `Podcast — ${show.name}`,
    description: show.description.slice(0, 160),
    alternates: { canonical: `/podcast/${show.slug}` },
    openGraph: {
      title: `${show.name} — ${show.tagline}`,
      description: show.description.slice(0, 200),
      url: `/podcast/${show.slug}`,
    },
  };
}

export default async function PodcastShowPage({ params }: { params: Params }) {
  const show = getPodcastBySlug(params.slug);
  if (!show) notFound();

  const feed = await safeGetPodcastFeed(show.rssUrl);
  const episodes = feed?.episodes ?? [];
  const showImage = feed?.show.imageUrl;

  return (
    <div className="dyn dyn-podcast" data-page="podcast">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', href: '/' },
          { name: 'Podcast', href: '/podcast' },
          { name: show.name, href: `/podcast/${show.slug}` },
        ])}
      />
      <JsonLd data={podcastSchema(show, showImage)} />

      {/* HERO */}
      <section className="pc-hero">
        <div className="inner">
          <div>
            <p className="eyebrow eyebrow-gold reveal">
              <Link href="/podcast" style={{ color: 'inherit' }}>
                ← Tous les podcasts
              </Link>
            </p>
            <h1 className="reveal" data-delay="1">
              {show.name}
            </h1>
            <p className="tag reveal" data-delay="1">
              {show.tagline}
            </p>
            <p className="desc reveal" data-delay="2">
              {show.description}
            </p>
            <div className="cta reveal" data-delay="2">
              {show.youtubePlaylistUrl ? (
                <a className="btn btn-gold" href={show.youtubePlaylistUrl} target="_blank" rel="noopener noreferrer">
                  Voir la playlist <span className="ar">→</span>
                </a>
              ) : null}
              <a className="btn btn-ghost-gold" href={show.rssUrl} target="_blank" rel="noopener noreferrer">
                Flux RSS
              </a>
            </div>
          </div>
          <div className="pc-cover reveal" data-delay="1" aria-hidden="true">
            {showImage ? (
              <Image src={showImage} alt="" fill sizes="(max-width: 880px) 320px, 460px" unoptimized />
            ) : (
              <>
                <Headphones className="hp" />
                <div className="nm">{show.name}</div>
                <div className="by">Pasteur Alexandre Amazou</div>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="pc-body">
        {/* Aside : plateformes */}
        <aside className="pc-aside reveal">
          <Headphones className="hp" />
          <h2>Écouter sur votre plateforme</h2>
          <p>Abonnez-vous sur la plateforme de votre choix pour ne manquer aucun épisode.</p>
          <div className="pc-plat">
            <PlatformRow label="Spotify" href={show.spotifyShowUrl || undefined} />
            <PlatformRow label="Apple Podcasts" href={show.applePodcastUrl || undefined} />
            <PlatformRow label="Amazon Music" href={show.amazonMusicUrl || undefined} />
            {show.youtubePlaylistUrl ? <PlatformRow label="YouTube" href={show.youtubePlaylistUrl} /> : null}
            <PlatformRow label="Flux RSS" href={show.rssUrl} withRss />
          </div>
          <Link className="btn btn-ghost-gold" href="/newsletter">
            Être prévenu des nouveaux épisodes
          </Link>
        </aside>

        {/* Épisodes */}
        <div className="pc-eps">
          <h2 className="reveal">Derniers épisodes</h2>
          <div className="bar reveal" />

          {episodes.length === 0 ? (
            <div className="pc-empty reveal">
              Les premiers épisodes arrivent très bientôt — abonnez-vous dès maintenant pour ne
              rien manquer.
            </div>
          ) : (
            episodes.map((ep, index) => {
              // Le lien d'épisode privilégie la vidéo YouTube (« Regarder ») ; à
              // défaut, la page de l'épisode ou le flux (« Écouter »).
              const hasVideo = Boolean(show.youtubePlaylistUrl);
              const episodeHref = show.youtubePlaylistUrl ?? ep.spotifyEpisodeUrl ?? show.rssUrl;
              const episodeLabel = hasVideo ? "Regarder l'épisode" : "Écouter l'épisode";
              const art = ep.imageUrl ?? showImage;
              return (
                <article className="ep reveal" key={ep.id}>
                  <div className="art" aria-hidden="true">
                    {art ? (
                      <Image src={art} alt="" fill sizes="130px" unoptimized />
                    ) : (
                      <>
                        <Headphones className="hp" />
                        <div className="t">{show.name}</div>
                      </>
                    )}
                  </div>
                  <div>
                    <div className="meta">
                      <span className="num">Épisode {episodes.length - index}</span>
                      <span aria-hidden="true">•</span>
                      <time dateTime={ep.publishedAt}>{formatPublishedAt(ep.publishedAt)}</time>
                      {ep.durationLabel ? (
                        <>
                          <span aria-hidden="true">•</span>
                          <span>{ep.durationLabel}</span>
                        </>
                      ) : null}
                    </div>
                    <h3>{ep.title}</h3>
                    <p>{ep.description}</p>
                    {ep.audioUrl ? (
                      <audio controls preload="none" src={ep.audioUrl}>
                        Votre navigateur ne supporte pas la lecture audio.
                      </audio>
                    ) : null}
                    <a className="listen" href={episodeHref} target="_blank" rel="noopener noreferrer">
                      {episodeLabel} <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </article>
              );
            })
          )}

          {/* Tous les épisodes, en vidéo */}
          {show.youtubePlaylistId ? (
            <div className="pc-video reveal">
              <p className="lbl">Tous les épisodes · en vidéo</p>
              <h3>La playlist {show.name}</h3>
              <div className="ytp">
                <YouTubeFacade
                  playlistId={show.youtubePlaylistId}
                  title=""
                  subtitle=""
                  ariaLabel={`Lancer la playlist ${show.name}`}
                />
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
