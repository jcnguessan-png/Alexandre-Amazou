import type { Metadata } from 'next';
import { Headphones, Rss } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import { podcastInfo, podcastEpisodes } from '@/data/podcasts';

export const metadata: Metadata = {
  title: 'Podcast — La Voix du Pasteur',
  description:
    "Le podcast officiel du Pasteur Alexandre AMAZOU : enseignements, méditations bibliques, échanges sur le leadership et la doctrine. Disponible sur Spotify, Apple Podcasts et Deezer.",
  alternates: { canonical: '/podcast' },
};

export default function PodcastPage() {
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
          eyebrow="Podcast"
          title={podcastInfo.name}
          description={podcastInfo.description}
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <aside className="rounded-lg border border-border bg-muted/30 p-6 md:p-8">
            <Headphones className="text-secondary" size={36} aria-hidden="true" />
            <h2 className="mt-4 font-heading text-xl font-semibold text-primary">
              Écouter sur votre plateforme
            </h2>
            <p className="mt-3 text-sm text-foreground/70">
              Le podcast sera disponible prochainement sur les principales
              plateformes d'écoute. Inscrivez-vous à la newsletter pour être
              prévenu·e du lancement.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-center justify-between text-foreground/60">
                <span>Spotify</span>
                <span className="text-xs uppercase tracking-wide text-secondary">À venir</span>
              </li>
              <li className="flex items-center justify-between text-foreground/60">
                <span>Apple Podcasts</span>
                <span className="text-xs uppercase tracking-wide text-secondary">À venir</span>
              </li>
              <li className="flex items-center justify-between text-foreground/60">
                <span>Deezer</span>
                <span className="text-xs uppercase tracking-wide text-secondary">À venir</span>
              </li>
              <li className="flex items-center justify-between text-foreground/60">
                <span>YouTube</span>
                <a
                  href="https://www.youtube.com/channel/UCi2WIBsPCQycQK2NYwKA61Q"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:text-secondary"
                >
                  Écouter →
                </a>
              </li>
            </ul>
            <div className="mt-6 border-t border-border pt-6">
              <Button asChild variant="outline" size="sm" className="w-full">
                <a href="/newsletter">Être prévenu·e du lancement</a>
              </Button>
            </div>
          </aside>

          <section aria-labelledby="episodes-heading">
            <h2 id="episodes-heading" className="font-heading text-2xl font-semibold text-primary">
              Derniers épisodes
            </h2>
            <span className="mt-3 block h-[2px] w-12 bg-secondary" aria-hidden="true" />

            {podcastEpisodes.length === 0 ? (
              <div className="mt-8 rounded-lg border border-dashed border-border bg-background p-8 text-center">
                <Rss className="mx-auto text-secondary" size={32} aria-hidden="true" />
                <p className="mt-4 text-foreground/70">
                  Le podcast est en préparation. Les premiers épisodes
                  arrivent bientôt — restez connecté·e !
                </p>
              </div>
            ) : (
              <ol className="mt-8 space-y-4">
                {podcastEpisodes.map((ep) => (
                  <li
                    key={ep.id}
                    className="rounded-lg border border-border bg-background p-5"
                  >
                    <h3 className="font-semibold text-primary">{ep.title}</h3>
                    <p className="mt-2 text-sm text-foreground/70">{ep.description}</p>
                  </li>
                ))}
              </ol>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
