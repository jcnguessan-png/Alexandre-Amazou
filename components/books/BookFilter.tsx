'use client';

import { useState, useMemo } from 'react';
import type { Book, BookTheme } from '@/data/books';
import { bookThemes } from '@/data/books';
import { BookGrid } from './BookGrid';
import { cn } from '@/lib/utils';

export function BookFilter({ books }: { books: Book[] }) {
  const [theme, setTheme] = useState<BookTheme | null>(null);

  const filtered = useMemo(
    () => (theme ? books.filter((b) => b.themes.includes(theme)) : books),
    [books, theme],
  );

  return (
    <div>
      <div role="group" aria-label="Filtrer les livres par thématique" className="mb-10 flex flex-wrap gap-2">
        <FilterPill active={theme === null} onClick={() => setTheme(null)}>
          Tous ({books.length})
        </FilterPill>
        {bookThemes.map((t) => {
          const count = books.filter((b) => b.themes.includes(t.id)).length;
          if (count === 0) return null;
          return (
            <FilterPill
              key={t.id}
              active={theme === t.id}
              onClick={() => setTheme(t.id)}
            >
              {t.label} ({count})
            </FilterPill>
          );
        })}
      </div>
      <BookGrid books={filtered} />
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'rounded-full border px-4 py-2 text-sm font-medium transition',
        active
          ? 'border-secondary bg-secondary text-secondary-foreground'
          : 'border-border bg-background text-foreground/70 hover:border-secondary/60 hover:text-primary',
      )}
    >
      {children}
    </button>
  );
}
