import Link from 'next/link';
import { Download } from 'lucide-react';
import type { Book } from '@/data/books';
import { Button } from '@/components/ui/Button';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { BookCard } from '@/components/books/BookCard';
import { BookOrderActions } from '@/components/books/BookOrderActions';

export function LatestBook({ book }: { book: Book }) {
  return (
    <section
      aria-labelledby="latest-book-heading"
      className="bg-background py-14 md:py-20"
    >
      <div className="container">
        <SectionTitle
          eyebrow="Dernière parution"
          title="Le tout dernier ouvrage"
          description="Une plongée biblique dans la cosmologie spirituelle — pour comprendre les enjeux invisibles de la vie chrétienne."
        />

        <div className="grid items-center gap-12 lg:grid-cols-[minmax(280px,400px)_1fr]">
          <div className="mx-auto w-full max-w-sm">
            <BookCard book={book} priority />
          </div>

          <div>
            <h3
              id="latest-book-heading"
              className="text-balance font-heading text-3xl font-semibold leading-tight text-primary md:text-4xl"
            >
              {book.title}
              {book.subtitle ? (
                <span className="ml-2 text-2xl font-medium text-foreground/60">
                  — {book.subtitle}
                </span>
              ) : null}
            </h3>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/80 md:text-lg">
              {book.description}
            </p>

            <div className="mt-8 max-w-md">
              <BookOrderActions book={book} layout="stacked" />
            </div>

            <div className="mt-5">
              <Button asChild variant="ghost" size="sm">
                <Link href={`/mes-livres/${book.slug}#extrait`}>
                  <Download size={14} aria-hidden="true" />
                  Lire l'extrait gratuit
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
