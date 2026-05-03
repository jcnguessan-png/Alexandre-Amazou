import type { Book } from '@/data/books';
import { BookCard } from './BookCard';
import { cn } from '@/lib/utils';

export function BookGrid({ books, className }: { books: Book[]; className?: string }) {
  if (books.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-muted/40 p-12 text-center text-foreground/60">
        Aucun livre dans cette thématique pour le moment.
      </div>
    );
  }
  return (
    <div className={cn('grid gap-6 sm:grid-cols-2 lg:grid-cols-3', className)}>
      {books.map((book, idx) => (
        <BookCard key={book.slug} book={book} priority={idx < 3} />
      ))}
    </div>
  );
}
