import type { Metadata } from 'next';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { TeachingsBrowser } from '@/components/teachings/TeachingsBrowser';
import { JsonLd } from '@/components/seo/JsonLd';
import { safeGetFeaturedPlaylistVideos } from '@/lib/youtube';
import { videoObjectSchema, breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Mes enseignements',
  description:
    "Tous les enseignements bibliques du Pasteur Alexandre AMAZOU : prédications, séries, séminaires et émissions. Foi, leadership, monde spirituel, prière, famille — la doctrine biblique sans concession.",
  alternates: { canonical: '/mes-enseignements' },
  openGraph: {
    title: 'Mes enseignements – Pasteur Alexandre AMAZOU',
    description:
      'Toute la chaîne YouTube officielle du Pasteur Alexandre AMAZOU, organisée par séries et thématiques.',
    url: '/mes-enseignements',
  },
};

export const revalidate = 3600;

export default async function TeachingsPage() {
  // On affiche uniquement la playlist officielle curée par le pasteur
  const videos = await safeGetFeaturedPlaylistVideos(50);

  return (
    <div className="container py-16 md:py-20">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', href: '/' },
          { name: 'Mes enseignements', href: '/mes-enseignements' },
        ])}
      />
      {videos.map((v) => (
        <JsonLd key={v.id} data={videoObjectSchema(v)} />
      ))}

      <SectionTitle
        as="h1"
        eyebrow="Espace médias"
        title="Mes enseignements"
        description="Plus de 30 années de prédications, séminaires et émissions — accessibles librement. Que cette parole vous fortifie, vous corrige et vous équipe pour la mission que Dieu a placée sur votre vie."
      />

      {videos.length > 0 ? (
        <TeachingsBrowser videos={videos} />
      ) : (
        <div className="rounded-lg border border-dashed border-border bg-muted/40 p-12 text-center">
          <p className="text-foreground/70">
            La galerie d'enseignements sera disponible dès que la clé{' '}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm">YOUTUBE_API_KEY</code> sera renseignée dans{' '}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm">.env.local</code>.
          </p>
          <p className="mt-3 text-sm text-foreground/50">
            En attendant, retrouvez la chaîne officielle directement sur{' '}
            <a
              href="https://www.youtube.com/channel/UCi2WIBsPCQycQK2NYwKA61Q"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-secondary underline-offset-4 hover:underline"
            >
              YouTube
            </a>
            .
          </p>
        </div>
      )}
    </div>
  );
}
