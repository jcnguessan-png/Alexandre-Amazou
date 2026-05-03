import type { Metadata } from 'next';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { BookFilter } from '@/components/books/BookFilter';
import { JsonLd } from '@/components/seo/JsonLd';
import { books } from '@/data/books';
import { bookListSchema, breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Mes livres',
  description:
    "Les onze ouvrages du Pasteur Alexandre AMAZOU — dont deux best-sellers — sur la foi, le leadership chrétien, la prière, le monde spirituel, la famille, l'héritage et les finances. Commandez sur Amazon, par WhatsApp ou à la Librairie Alliance.",
  alternates: { canonical: '/mes-livres' },
  openGraph: {
    title: 'Mes livres – Pasteur Alexandre AMAZOU',
    description:
      "11 ouvrages d'enseignement biblique : leadership, foi, prière, monde spirituel, famille, héritage, finances.",
    url: '/mes-livres',
  },
};

export default function BooksPage() {
  // Tri : récent d'abord
  const sorted = [...books].sort((a, b) => b.datePublished.localeCompare(a.datePublished));

  return (
    <div className="container py-16 md:py-20">
      <JsonLd data={bookListSchema(sorted)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', href: '/' },
          { name: 'Mes livres', href: '/mes-livres' },
        ])}
      />

      <SectionTitle
        as="h1"
        eyebrow="Bibliographie"
        title="Les livres du Pasteur Alexandre AMAZOU"
        description="Neuf ouvrages d'enseignement biblique, écrits pour bâtir, restaurer et équiper. Chaque livre est disponible à la commande sur la librairie ABMCI ; un extrait gratuit accompagne plusieurs titres."
      />

      <BookFilter books={sorted} />
    </div>
  );
}
