import type { Metadata } from 'next';
import { books, featuredBook } from '@/data/books';
import { safeGetFeaturedPlaylistVideos } from '@/lib/youtube';
import { siteConfig } from '@/lib/site-config';
import { HeroDynamic } from '@/components/home/dynamic/HeroDynamic';
import { StatsBand } from '@/components/home/dynamic/StatsBand';
import { BentoSection } from '@/components/home/dynamic/BentoSection';
import { BooksStrip } from '@/components/home/dynamic/BooksStrip';
import { ConferenceBand } from '@/components/home/dynamic/ConferenceBand';
import { FinalCta } from '@/components/home/dynamic/FinalCta';
import './dynamic-home.css';

export const metadata: Metadata = {
  title: `${siteConfig.name} — Transformer des gens ordinaires en véritables leaders`,
  description:
    "Site officiel du Pasteur Alexandre AMAZOU. Enseignements YouTube, onze ouvrages, biographie. Enseignant biblique, Bishop, fondateur de l'ABMCI.",
  alternates: { canonical: '/' },
};

// ISR : revalidation toutes les heures (les vidéos YouTube changent ; le reste est statique).
export const revalidate = 3600;

export default async function HomePage() {
  const videos = await safeGetFeaturedPlaylistVideos(8);
  const poster = videos[0]?.thumbnailHigh ?? videos[0]?.thumbnailUrl;

  return (
    <div className="dyn dyn-home" data-page="accueil">
      <HeroDynamic />
      <StatsBand />
      <BentoSection
        book={featuredBook}
        playlistId={siteConfig.youtube.featuredPlaylistId}
        poster={poster}
      />
      <BooksStrip books={books} />
      <ConferenceBand />
      <FinalCta youtubeUrl={siteConfig.youtube.channelUrl} />
    </div>
  );
}
