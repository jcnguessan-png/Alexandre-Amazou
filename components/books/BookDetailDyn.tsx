import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { bookThemes, type Book } from '@/data/books';
import { siteConfig, buildBookWhatsAppUrl } from '@/lib/site-config';
import { BookCover } from '@/components/home/dynamic/BookCover';

const STATUS_LABEL: Record<Book['status'], string> = {
  available: 'En stock',
  'out-of-stock': 'En rupture',
  'coming-soon': 'À paraître',
};

/** Fiche livre — Direction C (sombre, panneau d'extrait clair pour la lecture). */
export function BookDetailDyn({
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
  const amazon = book.amazonUrl ?? siteConfig.bookOrder.amazonAuthorUrl;
  const whatsapp = buildBookWhatsAppUrl(book.title);

  return (
    <article>
      <div className="lvd">
        <nav aria-label="Fil d'Ariane" className="crumb">
          <Link href="/">Accueil</Link>
          <span aria-hidden="true">/</span>
          <Link href="/mes-livres">Mes livres</Link>
          <span aria-hidden="true">/</span>
          <span>{book.title}</span>
        </nav>

        <div className="lvd-grid">
          <aside className="lvd-aside">
            <div className="lvd-cover">
              <BookCover book={book} badge={book.bestseller ? 'Best-seller' : undefined} priority />
            </div>
            <div className="lvd-order">
              <a className="btn btn-gold" href={whatsapp} target="_blank" rel="noopener noreferrer">
                Commander sur WhatsApp <span className="ar">→</span>
              </a>
              <a className="btn btn-ghost-gold" href={amazon} target="_blank" rel="noopener noreferrer">
                Acheter sur Amazon
              </a>
            </div>
            <p className="lvd-store">
              Également disponible en version papier à la {siteConfig.bookOrder.bookstoreName} (
              {siteConfig.bookOrder.bookstoreCity}) — commande WhatsApp au{' '}
              <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                {siteConfig.bookOrder.whatsappDisplay}
              </a>
              .
            </p>
          </aside>

          <div className="lvd-main">
            {themeLabels.length > 0 ? (
              <p className="lvd-themes">{themeLabels.join(' · ')}</p>
            ) : null}
            <h1>{book.title}</h1>
            {book.subtitle ? <p className="sub">{book.subtitle}</p> : null}

            <dl className="lvd-meta">
              <div>
                <dt>Auteur</dt>
                <dd>Alexandre AMAZOU</dd>
              </div>
              <div>
                <dt>Année</dt>
                <dd>{book.datePublished}</dd>
              </div>
              <div>
                <dt>Langue</dt>
                <dd>Français</dd>
              </div>
              <div>
                <dt>Disponibilité</dt>
                <dd>{STATUS_LABEL[book.status]}</dd>
              </div>
            </dl>

            <div className="lvd-about">
              <h2>À propos de ce livre</h2>
              <p>{book.description}</p>
            </div>

            {excerptSource ? (
              <section id="extrait" className="excerpt-panel">
                <p className="lbl">Extrait gratuit</p>
                <h2>Lire le chapitre 1</h2>
                <span className="bar" aria-hidden="true" />
                <div className="prose">
                  <MDXRemote source={excerptSource} />
                </div>
                <div className="excerpt-cta">
                  <p className="h">Recevez la suite par email</p>
                  <p>
                    Inscrivez-vous à la newsletter et recevez gratuitement la version PDF
                    intégrale du chapitre&nbsp;1.
                  </p>
                  <Link className="btn btn-dark" href="/newsletter">
                    S&apos;inscrire à la newsletter
                  </Link>
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="lvd-related" aria-labelledby="related-heading">
          <h2 id="related-heading">Livres similaires</h2>
          <div className="grid">
            {related.map((b) => (
              <Link className="rel-card" href={`/mes-livres/${b.slug}`} key={b.slug}>
                <BookCover book={b} badge={b.bestseller ? 'Best-seller' : undefined} />
                <h3>{b.title}</h3>
                <div className="yr">{b.datePublished.slice(0, 4)}</div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
