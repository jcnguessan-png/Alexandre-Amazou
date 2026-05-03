import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Download } from 'lucide-react';
import type { Book } from '@/data/books';
import { bookThemes } from '@/data/books';
import { Button } from '@/components/ui/Button';
import { BookCard } from './BookCard';
import { BookOrderActions } from './BookOrderActions';

export function BookDetail({
  book,
  excerptSource,
  related,
}: {
  book: Book;
  excerptSource?: string;
  related: Book[];
}) {
  const themeLabels = book.themes
    .map((id) => bookThemes.find((t) => t.id === id)?.label)
    .filter(Boolean);

  return (
    <article>
      <nav aria-label="Fil d'Ariane" className="text-sm text-foreground/60">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="hover:text-primary">Accueil</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/mes-livres" className="hover:text-primary">Mes livres</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-foreground/80">{book.title}</li>
        </ol>
      </nav>

      <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(280px,360px)_1fr]">
        <div className="mx-auto w-full max-w-sm lg:sticky lg:top-28 lg:self-start">
          <BookCard book={book} priority />

          <div id="commander" className="mt-6 scroll-mt-24">
            <BookOrderActions book={book} layout="stacked" />
            {excerptSource ? (
              <div className="mt-4 border-t border-border pt-4">
                <Button asChild variant="ghost" size="sm" className="w-full">
                  <a href="#extrait">
                    <Download size={14} aria-hidden="true" />
                    Lire l'extrait gratuit
                  </a>
                </Button>
              </div>
            ) : null}
          </div>
        </div>

        <div>
          <p className="font-quote text-sm uppercase tracking-[0.25em] text-secondary">
            {themeLabels.join(' · ')}
          </p>
          <h1 className="mt-3 text-balance font-heading text-display-lg font-semibold leading-tight text-primary">
            {book.title}
          </h1>
          {book.subtitle ? (
            <p className="mt-2 font-quote text-xl italic text-foreground/70">
              {book.subtitle}
            </p>
          ) : null}

          <dl className="mt-8 grid grid-cols-2 gap-6 border-y border-border py-6 text-sm">
            <div>
              <dt className="text-foreground/60">Auteur</dt>
              <dd className="mt-1 font-medium text-primary">Alexandre AMAZOU</dd>
            </div>
            <div>
              <dt className="text-foreground/60">Année</dt>
              <dd className="mt-1 font-medium text-primary">{book.datePublished}</dd>
            </div>
            <div>
              <dt className="text-foreground/60">Langue</dt>
              <dd className="mt-1 font-medium text-primary">Français</dd>
            </div>
            <div>
              <dt className="text-foreground/60">Disponibilité</dt>
              <dd className="mt-1 font-medium text-primary">
                {book.status === 'available'
                  ? 'En stock'
                  : book.status === 'out-of-stock'
                    ? 'En rupture'
                    : 'À paraître'}
              </dd>
            </div>
          </dl>

          <div className="mt-8 max-w-prose">
            <h2 className="text-2xl font-semibold text-primary">À propos de ce livre</h2>
            <p className="mt-4 text-base leading-relaxed text-foreground/80 md:text-lg">
              {book.description}
            </p>
          </div>

          {excerptSource ? (
            <section id="extrait" className="mt-16 max-w-prose scroll-mt-24">
              <p className="font-quote text-sm uppercase tracking-[0.25em] text-secondary">
                Extrait gratuit
              </p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-primary">
                Lire le chapitre 1
              </h2>
              <span className="mt-4 block h-[2px] w-12 bg-secondary" aria-hidden="true" />
              <div className="prose-editorial mt-8">
                <MDXRemote source={excerptSource} />
              </div>
              <div className="mt-10 rounded-lg border border-secondary/30 bg-secondary/5 p-6">
                <p className="font-heading text-lg font-semibold text-primary">
                  Recevez la suite par email
                </p>
                <p className="mt-2 text-sm text-foreground/70">
                  Inscrivez-vous à la newsletter et recevez gratuitement la
                  version PDF intégrale du chapitre&nbsp;1.
                </p>
                <Button asChild variant="primary" size="md" className="mt-4">
                  <Link href="/newsletter">S'inscrire à la newsletter</Link>
                </Button>
              </div>
            </section>
          ) : null}
        </div>
      </div>

      {related.length > 0 ? (
        <section aria-labelledby="related-heading" className="mt-24 border-t border-border pt-16">
          <h2 id="related-heading" className="text-balance font-heading text-3xl font-semibold text-primary">
            Livres similaires
          </h2>
          <span className="mt-4 block h-[2px] w-12 bg-secondary" aria-hidden="true" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((b) => (
              <BookCard key={b.slug} book={b} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
