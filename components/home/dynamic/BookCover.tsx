import { BookCoverImage } from '@/components/books/BookCoverImage';
import type { Book } from '@/data/books';

/**
 * Couverture pour la page d'accueil dynamique : conteneur sombre + badge
 * éventuel + fallback éditorial (titre doré) si l'image n'est pas déposée.
 * Le recadrage 1ère de couv (scans recto-verso) est géré par BookCoverImage.
 */
export function BookCover({
  book,
  badge,
  priority,
}: {
  book: Book;
  badge?: string;
  priority?: boolean;
}) {
  return (
    <div className="book-cover group">
      {badge ? <span className="book-badge">{badge}</span> : null}
      <span className="book-cover-fallback" aria-hidden="true">
        {book.title}
      </span>
      <BookCoverImage book={book} priority={priority} />
    </div>
  );
}
