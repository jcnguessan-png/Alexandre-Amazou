import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import { podcasts } from '@/data/podcasts';
import { safeGetPodcastFeed } from '@/lib/podcast';
import { DynPageHero } from '@/components/layout/DynPageHero';
import { Headphones } from '@/components/podcast/shared';
import './podcast.css';

export const metadata: Metadata = {
  title: 'Podcasts',
  description:
    "Les podcasts du Pasteur Alexandre AMAZOU : « Pasteur, j'ai une question » (vos questions, ses réponses) et « Séquences Vérité » (enseignements courts et puissants). En audio et en vidéo.",
  alternates: { canonical: '/podcast' },
};

// Revalidation toutes les 10 min (pochettes + derniers épisodes des flux).
export const revalidate = 600;

export default async function PodcastHubPage() {
  // Pochette + dernier épisode + nombre d'épisodes de chaque émission, en parallèle.
  const feeds = await Promise.all(podcasts.map((p) => safeGetPodcastFeed(p.rssUrl)));

  return (
    <div className="dyn dyn-podcast-hub" data-page="podcast">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', href: '/' },
          { name: 'Podcast', href: '/podcast' },
        ])}
      />

      <DynPageHero
        eyebrow="Podcasts"
        title={
          <>
            Les <em>podcasts</em> du Pasteur
          </>
        }
        lead="Deux rendez-vous pour nourrir ta foi : « Pasteur, j'ai une question » (tes questions, ses réponses) et « Séquences Vérité » (enseignements courts et puissants). En audio et en vidéo."
      />

      <div className="page-body">
        <div className="pod-grid">
          {podcasts.map((show, i) => {
            const feed = feeds[i];
            const cover = feed?.show.imageUrl;
            const latest = feed?.episodes[0];
            const count = feed?.episodes.length ?? 0;
            return (
              <Link
                className="pod-card reveal"
                href={`/podcast/${show.slug}`}
                key={show.slug}
                data-delay={i ? '1' : undefined}
              >
                <div className="pod-cover">
                  {cover ? (
                    <Image src={cover} alt="" fill sizes="(max-width: 860px) 100vw, 160px" unoptimized />
                  ) : (
                    <Headphones className="hp" />
                  )}
                  {show.featured ? <span className="pod-badge">À la une</span> : null}
                </div>
                <div className="pod-body">
                  <h2>{show.name}</h2>
                  <p className="pod-tag">{show.tagline}</p>
                  <p className="pod-desc">{show.description}</p>
                  <div className="pod-meta">
                    {count > 0 ? (
                      <span>
                        {count} épisode{count > 1 ? 's' : ''}
                      </span>
                    ) : null}
                    {latest ? <span className="pod-latest">Dernier : « {latest.title} »</span> : null}
                  </div>
                  <span className="pod-go">
                    Voir l&apos;émission <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
