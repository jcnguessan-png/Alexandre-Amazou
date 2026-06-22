import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/seo/JsonLd';
import { bookListSchema, breadcrumbSchema } from '@/lib/schema';
import { books, featuredBook } from '@/data/books';
import { siteConfig, buildBookWhatsAppUrl } from '@/lib/site-config';
import { BookCover } from '@/components/home/dynamic/BookCover';
import { BooksCatalog } from '@/components/books/BooksCatalog';
import './mes-livres.css';

export const metadata: Metadata = {
  title: 'Mes livres',
  description:
    "Les onze ouvrages du Pasteur Alexandre AMAZOU — dont deux best-sellers — sur la foi, le leadership chrétien, la prière, le monde spirituel, la famille, l'héritage et les finances. Commandez sur Amazon, par WhatsApp ou à la Librairie Alliance.",
  alternates: { canonical: '/mes-livres' },
  openGraph: {
    title: 'Mes livres – Pasteur Alexandre AMAZOU',
    description:
      "11 ouvrages d'enseignement biblique : leadership, foi, prière, monde spirituel, famille, héritage, finances.",
    url: '/mes-livres',
  },
};

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const slice = text.slice(0, max);
  const lastSpace = slice.lastIndexOf(' ');
  return `${slice.slice(0, lastSpace > 0 ? lastSpace : max).trimEnd()}…`;
}

export default function BooksPage() {
  const sorted = [...books].sort((a, b) => b.datePublished.localeCompare(a.datePublished));
  const feat = featuredBook;
  const amazon = siteConfig.bookOrder.amazonAuthorUrl;

  return (
    <div className="dyn dyn-livres" data-page="livres">
      <JsonLd data={bookListSchema(sorted)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', href: '/' },
          { name: 'Mes livres', href: '/mes-livres' },
        ])}
      />

      {/* HERO */}
      <section className="lv-hero">
        <div className="inner">
          <p className="eyebrow eyebrow-gold reveal">Bibliographie</p>
          <h1 className="reveal" data-delay="1">
            Onze ouvrages pour <em>bâtir des leaders</em>
          </h1>
          <p className="reveal" data-delay="2">
            Du monde spirituel au leadership chrétien, de la prière aux finances du Royaume —
            une œuvre écrite, fruit de plus de vingt ans de ministère et de révélation.
          </p>
        </div>
      </section>

      {/* À LA UNE */}
      <section className="lv-feat">
        <div className="inner">
          <div className="cover reveal">
            <BookCover book={feat} badge="Best-seller 2026" priority />
          </div>
          <div className="reveal" data-delay="1">
            <p className="tag">À la une · Réédition révisée &amp; augmentée</p>
            <h2>{feat.title}</h2>
            {feat.subtitle ? <p className="sub">{feat.subtitle}</p> : null}
            <p className="desc">{truncate(feat.description, 360)}</p>
            <div className="cta">
              <a
                className="btn btn-gold"
                href={buildBookWhatsAppUrl(feat.title)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Commander sur WhatsApp <span className="ar">→</span>
              </a>
              <a className="btn btn-ghost-gold" href={amazon} target="_blank" rel="noopener noreferrer">
                Voir sur Amazon
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CATALOGUE */}
      <section className="lv-cat">
        <div className="inner">
          <BooksCatalog books={sorted} />
        </div>
      </section>

      {/* COMMANDER */}
      <section className="lv-order">
        <h2 className="reveal">
          Comment <em>commander</em> ?
        </h2>
        <p className="reveal" data-delay="1">
          Tous les ouvrages sont disponibles à la Librairie Alliance (Abidjan) via WhatsApp, et
          sur la boutique Amazon de l&apos;auteur pour une livraison internationale.
        </p>
        <div className="cta reveal" data-delay="1">
          <a
            className="btn btn-gold"
            href={buildBookWhatsAppUrl('vos ouvrages')}
            target="_blank"
            rel="noopener noreferrer"
          >
            Librairie Alliance · WhatsApp
          </a>
          <a className="btn btn-ghost-gold" href={amazon} target="_blank" rel="noopener noreferrer">
            Boutique Amazon
          </a>
        </div>
      </section>
    </div>
  );
}
