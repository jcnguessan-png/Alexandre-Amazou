import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { books, getBookBySlug, getRelatedBooks } from '@/data/books';
import { BookDetail } from '@/components/books/BookDetail';
import { JsonLd } from '@/components/seo/JsonLd';
import { bookSchema, breadcrumbSchema } from '@/lib/schema';

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return books.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const book = getBookBySlug(params.slug);
  if (!book) return {};
  const title = `${book.title}${book.subtitle ? ` — ${book.subtitle}` : ''}`;
  return {
    title,
    description: book.description.slice(0, 160),
    alternates: { canonical: `/mes-livres/${book.slug}` },
    openGraph: {
      type: 'book',
      title: `${title} – Pasteur Alexandre AMAZOU`,
      description: book.description.slice(0, 200),
      url: `/mes-livres/${book.slug}`,
      images: [{ url: book.coverImage, width: 800, height: 1200, alt: book.title }],
    },
  };
}

async function loadExcerpt(file?: string): Promise<string | undefined> {
  if (!file) return undefined;
  try {
    const fullPath = path.join(process.cwd(), 'data', 'excerpts', file);
    return await fs.readFile(fullPath, 'utf-8');
  } catch {
    return undefined;
  }
}

export default async function BookPage({ params }: { params: Params }) {
  const book = getBookBySlug(params.slug);
  if (!book) notFound();

  const [excerpt] = await Promise.all([loadExcerpt(book.excerptFile)]);
  const related = getRelatedBooks(book, 3);

  return (
    <div className="container py-16 md:py-20">
      <JsonLd data={bookSchema(book)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', href: '/' },
          { name: 'Mes livres', href: '/mes-livres' },
          { name: book.title, href: `/mes-livres/${book.slug}` },
        ])}
      />
      <BookDetail book={book} excerptSource={excerpt} related={related} />
    </div>
  );
}
