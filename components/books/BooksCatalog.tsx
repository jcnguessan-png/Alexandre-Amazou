'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { bookThemes, type Book, type BookTheme } from '@/data/books';
import { buildBookWhatsAppUrl } from '@/lib/site-config';
import { BookCover } from '@/components/home/dynamic/BookCover';

const THEME_LABEL = Object.fromEntries(bookThemes.map((t) => [t.id, t.label])) as Record<
  BookTheme,
  string
>;

/** Catalogue filtrable (Direction C) : boutons thèmes + grille de fiches. */
export function BooksCatalog({ books }: { books: Book[] }) {
  const [active, setActive] = useState<BookTheme | 'all'>('all');

  const themes = useMemo(() => {
    const present = new Set<BookTheme>();
    books.forEach((b) => b.themes.forEach((t) => present.add(t)));
    return bookThemes.filter((t) => present.has(t.id));
  }, [books]);

  const list = active === 'all' ? books : books.filter((b) => b.themes.includes(active));

  return (
    <>
      <div className="lv-filters reveal">
        <button
          type="button"
          className={active === 'all' ? 'active' : undefined}
          onClick={() => setActive('all')}
        >
          Tous les ouvrages
        </button>
        {themes.map((t) => (
          <button
            type="button"
            key={t.id}
            className={active === t.id ? 'active' : undefined}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="lv-grid">
        {list.map((book) => {
          const href = `/mes-livres/${book.slug}`;
          return (
            <article className="lv-card" key={book.slug}>
              <Link className="lv-cover-link" href={href} aria-label={`Voir la fiche : ${book.title}`}>
                <BookCover book={book} badge={book.bestseller ? 'Best-seller' : undefined} />
              </Link>
              <div className="body">
                <div className="yr">{book.datePublished.slice(0, 4)}</div>
                <h3>
                  <Link href={href}>{book.title}</Link>
                </h3>
                {book.subtitle ? <div className="sub">{book.subtitle}</div> : null}
                <p>{book.description}</p>
                <div className="foot">
                  <div className="themes">
                    {book.themes.map((t) => (
                      <span key={t}>{THEME_LABEL[t]}</span>
                    ))}
                  </div>
                </div>
                <a
                  className="order"
                  href={buildBookWhatsAppUrl(book.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Commander <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
