import Link from 'next/link';
import type { Book } from '@/data/books';
import { BookCover } from './BookCover';
import { CountUp } from './CountUp';
import { YouTubeFacade } from './YouTubeFacade';

export function BentoSection({
  book,
  playlistId,
  poster,
}: {
  book: Book;
  playlistId: string;
  poster?: string;
}) {
  return (
    <section className="c-sec" id="enseignements">
      <div className="c-head reveal">
        <p className="k">Tout le ministère, en un coup d&apos;œil</p>
        <h2>
          Enseignements &amp; <em>ressources</em>
        </h2>
      </div>

      <div className="c-player reveal">
        <YouTubeFacade
          playlistId={playlistId}
          poster={poster}
          ariaLabel="Lancer la lecture des enseignements"
        />
      </div>

      <div className="bento">
        <div className="tile tile-book reveal">
          <BookCover book={book} badge={book.bestseller ? 'Best-seller' : undefined} />
          <span className="lbl">{book.title}</span>
        </div>

        <div className="tile tile-stat reveal" data-delay="1">
          <CountUp className="v" end={4} />
          <div className="l">continents</div>
        </div>

        <div className="tile tile-stat reveal" data-delay="2">
          <CountUp className="v" end={10} suffix="+" />
          <div className="l">pays de présence</div>
        </div>

        <Link className="tile tile-cta reveal" data-delay="2" href="/a-propos">
          <span className="big">
            Qui est le
            <br />
            Pasteur ?
          </span>
          <span className="ar">→</span>
        </Link>

        <div className="tile tile-quote reveal" data-delay="1">
          <p className="q">
            « La Parole de Dieu enseignée avec exactitude et révélation, dans la droite ligne
            de la doctrine. »
          </p>
          <p className="src">— Vision du ministère</p>
        </div>
      </div>
    </section>
  );
}
