import Image from 'next/image';
import Link from 'next/link';
import { Download } from 'lucide-react';
import type { Book } from '@/data/books';
import { Button } from '@/components/ui/Button';
import { SectionTitle } from '@/components/ui/SectionTitle';
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
          description="Une plongée biblique dans la cosmologie spirituelle, accompagnée de son livret de 40 jours d'application — pour comprendre et expérimenter les enjeux invisibles de la vie chrétienne."
        />

        <div className="mt-8 grid items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <div className="relative mx-auto w-full max-w-xl lg:sticky lg:top-28 lg:self-start">
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-primary ring-1 ring-secondary/20 shadow-md">
              <Image
                src="/images/livres/combo-realite-40-jours.png"
                alt="La réalité du monde des esprits (réédition 2026) accompagné du livret 40 jours de combat spirituel"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
              />
            </div>
            <span className="absolute -top-3 left-6 rounded-full bg-secondary px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-secondary-foreground shadow-md">
              Nouveau · 2026
            </span>
          </div>

          <div>
            <p className="font-quote text-xs uppercase tracking-[0.22em] text-secondary">
              Le livre + le livret d'accompagnement
            </p>
            <h3
              id="latest-book-heading"
              className="mt-3 text-balance font-heading text-3xl font-semibold leading-tight text-primary md:text-4xl"
            >
              {book.title}
            </h3>
            {book.subtitle ? (
              <p className="mt-2 font-quote text-base italic text-foreground/65 md:text-lg">
                {book.subtitle}
              </p>
            ) : null}
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/80 md:text-lg">
              {book.description}
            </p>

            {book.companion ? (
              <div className="mt-6 rounded-lg border border-secondary/30 bg-secondary/5 p-5">
                <p className="font-heading text-base font-semibold text-primary">
                  Inclus : {book.companion.title}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground/75">
                  {book.companion.description}
                </p>
              </div>
            ) : null}

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
