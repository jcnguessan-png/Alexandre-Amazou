import Image from 'next/image';
import Link from 'next/link';

const MARQUEE_WORDS = ['Enseignements', 'Leadership', 'Foi', 'Prière', 'Héritage', 'Réveil'];

function MarqueeTrack() {
  // Doublé pour un défilement sans couture (translateX -50%).
  const sequence = [...MARQUEE_WORDS, ...MARQUEE_WORDS];
  return (
    <div className="track">
      {sequence.map((word, i) => {
        const alt = i % 2 === 1;
        return (
          <span key={`${word}-${i}`} className={alt ? 'alt' : undefined}>
            {word}
            <span className={alt ? 'star cream' : 'star'}> ✦</span>
          </span>
        );
      })}
    </div>
  );
}

export function HeroDynamic() {
  return (
    <section className="c-hero">
      <div className="c-hero-bg" aria-hidden="true">
        <div className="g1" />
        <div className="g2" />
        <div className="grid-lines" />
      </div>

      <div className="c-hero-main">
        <div>
          <span className="c-tagline">
            <span className="pin" aria-hidden="true" />
            Site officiel · Pasteur Alexandre AMAZOU
          </span>
          <h1 className="c-h1">
            La Parole qui forme
            <br />
            des gens ordinaires
            <br />
            en <span className="sweep">leaders</span>
          </h1>
          <p className="c-sub">
            Enseignant biblique, Bishop, fondateur de l&apos;ABMCI, auteur de onze ouvrages.
            Des centaines d&apos;enseignements pour transformer des personnes ordinaires en
            véritables leaders.
          </p>
          <div className="c-hero-cta">
            <Link className="btn btn-gold" href="#enseignements">
              Regarder les enseignements <span className="ar">→</span>
            </Link>
            <Link className="btn btn-ghost-gold" href="/mes-livres">
              Mes livres
            </Link>
          </div>
        </div>

        <div className="c-portrait">
          <div className="panel">
            <Image
              src="/images/bishop-sans-fond.png"
              alt="Portrait du Bishop Alexandre AMAZOU"
              width={660}
              height={1080}
              priority
              sizes="(max-width: 940px) 300px, 380px"
            />
          </div>
        </div>
      </div>

      <div className="marquee" aria-hidden="true">
        <MarqueeTrack />
      </div>
    </section>
  );
}
