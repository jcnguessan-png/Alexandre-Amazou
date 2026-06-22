import Link from 'next/link';
import { bookThemes, type Book, type BookTheme } from '@/data/books';
import { BookCover } from './BookCover';

const THEME_LABEL: Record<BookTheme, string> = Object.fromEntries(
  bookThemes.map((t) => [t.id, t.label]),
) as Record<BookTheme, string>;

export function BooksStrip({ books }: { books: Book[] }) {
  return (
    <section className="c-books" aria-labelledby="books-strip-heading">
      <div className="c-sec c-books-head">
        <div className="c-head c-books-headrow reveal" style={{ marginBottom: 0 }}>
          <div>
            <p className="k">Bibliographie</p>
            <h2 id="books-strip-heading">
              Onze <em>ouvrages</em>
            </h2>
          </div>
          <Link className="btn btn-ghost-gold" href="/mes-livres">
            Tout le catalogue <span className="ar">→</span>
          </Link>
        </div>
      </div>

      <div className="c-strip">
        {books.map((book) => {
          const primaryTheme = book.themes[0];
          return (
            <Link className="card" href={`/mes-livres/${book.slug}`} key={book.slug}>
              <BookCover book={book} badge={book.bestseller ? 'Best-seller' : undefined} />
              <h3>{book.title}</h3>
              {primaryTheme ? <div className="th">{THEME_LABEL[primaryTheme]}</div> : null}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
