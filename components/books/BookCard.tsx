import Link from 'next/link';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import type { Book } from '@/data/books';
import { bookThemes } from '@/data/books';
import { siteConfig } from '@/lib/site-config';
import { cn } from '@/lib/utils';
import { BookCoverImage } from './BookCoverImage';

const statusLabel: Record<Book['status'], string> = {
  available: 'En stock',
  'out-of-stock': 'En rupture',
  'coming-soon': 'À paraître',
};

export function BookCard({
  book,
  priority = false,
  className,
}: {
  book: Book;
  priority?: boolean;
  className?: string;
}) {
  const themeLabels = book.themes
    .map((t) => bookThemes.find((bt) => bt.id === t)?.label)
    .filter(Boolean);

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-background shadow-sm transition hover:border-secondary/60 hover:shadow-md',
        className,
      )}
    >
      <Link
        href={`/mes-livres/${book.slug}`}
        className="relative block aspect-[2/3] w-full overflow-hidden bg-primary/5"
        aria-label={`Voir le livre : ${book.title}`}
      >
        <BookCover book={book} priority={priority} />
        {book.status !== 'available' ? (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            {statusLabel[book.status]}
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        {themeLabels.length > 0 ? (
          <div className="mb-2 flex flex-wrap gap-1.5">
            {themeLabels.map((label) => (
              <span
                key={label}
                className="rounded-full bg-secondary/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-secondary"
              >
                {label}
              </span>
            ))}
          </div>
        ) : null}

        <h3 className="text-lg font-semibold leading-snug text-primary">
          <Link href={`/mes-livres/${book.slug}`}>{book.title}</Link>
        </h3>
        {book.subtitle ? (
          <p className="mt-1 text-sm font-medium text-foreground/60">{book.subtitle}</p>
        ) : null}
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-foreground/70">
          {book.description}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3 pt-3">
          <Link
            href={`/mes-livres/${book.slug}`}
            className="text-sm font-medium text-primary hover:text-secondary"
          >
            Lire l'extrait <ArrowRight size={12} aria-hidden="true" className="inline" />
          </Link>
          <a
            href={book.amazonUrl ?? siteConfig.bookOrder.amazonAuthorUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Commander « ${book.title} » sur Amazon`}
            className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground transition hover:bg-secondary/90"
          >
            <ShoppingCart size={14} aria-hidden="true" />
            Commander
          </a>
        </div>
      </div>
    </article>
  );
}

function BookCover({ book, priority }: { book: Book; priority: boolean }) {
  // Fallback éditorial rendu en arrière-plan : il reste visible si la
  // couverture HD n'a pas encore été déposée dans /public/images/livres.
  return (
    <>
      <span
        aria-hidden="true"
        className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary via-primary to-primary/90 p-6 text-center text-primary-foreground"
      >
        <span className="font-quote text-xs uppercase tracking-[0.2em] text-secondary">
          Alexandre AMAZOU
        </span>
        <span className="mt-3 font-heading text-xl font-semibold leading-tight">
          {book.title}
        </span>
        {book.subtitle ? (
          <span className="mt-1 text-sm italic text-primary-foreground/70">{book.subtitle}</span>
        ) : null}
      </span>
      <BookCoverImage book={book} priority={priority} />
    </>
  );
}
