import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/HeroSection';
import { StatsSection } from '@/components/home/StatsSection';
import { LatestBook } from '@/components/home/LatestBook';
import { LatestVideos } from '@/components/home/LatestVideos';
import { NewsletterBanner } from '@/components/home/NewsletterBanner';
import { TestimonialsSlider } from '@/components/home/TestimonialsSlider';
import { AboutTeaser } from '@/components/home/AboutTeaser';
import { featuredBook } from '@/data/books';
import { testimonials } from '@/data/testimonials';
import { safeGetFeaturedPlaylistVideos } from '@/lib/youtube';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: `${siteConfig.name} – Site officiel`,
  description:
    "Pasteur Alexandre AMAZOU — enseignant biblique, Bishop, fondateur de l'ABMCI, auteur de onze ouvrages dont deux best-sellers. Découvrez les enseignements, livres, podcast et la newsletter officielle.",
  alternates: { canonical: '/' },
};

// ISR : revalidation toutes les heures pour la page d'accueil
// (les vidéos YouTube changent ; le reste est statique)
export const revalidate = 3600;

export default async function HomePage() {
  const videos = await safeGetFeaturedPlaylistVideos(6);

  return (
    <>
      <HeroSection />
      <StatsSection />
      <LatestBook book={featuredBook} />
      <LatestVideos videos={videos} />
      <NewsletterBanner source="home" />
      <TestimonialsSlider testimonials={testimonials} />
      <AboutTeaser />
    </>
  );
}
