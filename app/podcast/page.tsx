import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import { podcastInfo } from '@/data/podcasts';
import { safeGetPodcastFeed, formatPublishedAt } from '@/lib/podcast';
import { siteConfig } from '@/lib/site-config';
import { YouTubeFacade } from '@/components/home/dynamic/YouTubeFacade';
import './podcast.css';

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

// Revalidation à la minute — les ajouts depuis Spotify for Podcasters remontent vite.
export const revalidate = 60;

function Headphones({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <rect x="2.5" y="13" width="4.5" height="7" rx="1.6" />
      <rect x="17" y="13" width="4.5" height="7" rx="1.6" />
    </svg>
  );
}

function PlatformRow({ label, href, withRss }: { label: string; href?: string; withRss?: boolean }) {
  return (
    <div className="row">
      <span className="name">
        {withRss ? (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M5 3a16 16 0 0 1 16 16h-3A13 13 0 0 0 5 6V3zm0 6a10 10 0 0 1 10 10h-3A7 7 0 0 0 5 12V9zm1.5 6a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z" />
          </svg>
        ) : null}
        {label}
      </span>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          Écouter <span aria-hidden="true">↗</span>
        </a>
      ) : (
        <span className="soon">À venir</span>
      )}
    </div>
  );
}

export default async function PodcastPage() {
  const feed = await safeGetPodcastFeed();
  const episodes = feed?.episodes ?? [];
  const showImage = feed?.show.imageUrl;
  const hasPublicSpotify = Boolean(podcastInfo.spotifyShowUrl);

  return (
    <div className="dyn dyn-podcast" data-page="podcast">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', href: '/' },
          { name: 'Podcast', href: '/podcast' },
        ])}
      />

      {/* HERO */}
      <section className="pc-hero">
        <div className="inner">
          <div>
            <p className="eyebrow eyebrow-gold reveal">Podcast officiel</p>
            <h1 className="reveal" data-delay="1">
              <em>Séquences</em> Vérité
            </h1>
            <p className="tag reveal" data-delay="1">
              Le podcast du Pasteur Alexandre AMAZOU
            </p>
            <p className="desc reveal" data-delay="2">
              {podcastInfo.description}
            </p>
            <div className="cta reveal" data-delay="2">
              <a
                className="btn btn-gold"
                href={podcastInfo.youtubePlaylistUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Voir la playlist <span className="ar">→</span>
              </a>
              {podcastInfo.rssUrl ? (
                <a className="btn btn-ghost-gold" href={podcastInfo.rssUrl} target="_blank" rel="noopener noreferrer">
                  Flux RSS
                </a>
              ) : null}
            </div>
          </div>
          <div className="pc-cover reveal" data-delay="1" aria-hidden="true">
            {showImage ? (
              <Image
                src={showImage}
                alt=""
                fill
                sizes="(max-width: 880px) 320px, 460px"
                unoptimized
              />
            ) : (
              <>
                <Headphones className="hp" />
                <div className="nm">
                  SÉQUENCES
                  <br />
                  VÉRITÉ
                </div>
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
            <PlatformRow label="Spotify" href={podcastInfo.spotifyShowUrl} />
            <PlatformRow label="Apple Podcasts" href={podcastInfo.applePodcastUrl} />
            <PlatformRow label="Deezer" href={podcastInfo.deezerUrl} />
            <PlatformRow label="YouTube" href={podcastInfo.youtubePlaylistUrl} />
            <PlatformRow label="Flux RSS" href={podcastInfo.rssUrl} withRss />
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
              const listenHref =
                (hasPublicSpotify ? ep.spotifyEpisodeUrl : undefined) ?? podcastInfo.youtubePlaylistUrl;
              const art = ep.imageUrl ?? showImage;
              return (
                <article className="ep reveal" key={ep.id}>
                  <div className="art" aria-hidden="true">
                    {art ? (
                      <Image src={art} alt="" fill sizes="130px" unoptimized />
                    ) : (
                      <>
                        <Headphones className="hp" />
                        <div className="t">SÉQUENCES VÉRITÉ</div>
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
                    <a className="listen" href={listenHref} target="_blank" rel="noopener noreferrer">
                      Écouter l&apos;épisode <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </article>
              );
            })
          )}

          {/* Tous les épisodes, en vidéo */}
          <div className="pc-video reveal">
            <p className="lbl">Tous les épisodes · en vidéo</p>
            <h3>La playlist Séquences Vérité</h3>
            <div className="ytp">
              <YouTubeFacade
                playlistId={podcastInfo.youtubePlaylistId ?? siteConfig.youtube.featuredPlaylistId}
                title=""
                subtitle=""
                ariaLabel="Lancer la playlist Séquences Vérité"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
