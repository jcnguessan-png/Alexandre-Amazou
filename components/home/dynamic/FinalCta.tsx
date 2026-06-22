import Link from 'next/link';

export function FinalCta({ youtubeUrl }: { youtubeUrl: string }) {
  return (
    <section className="c-final" aria-labelledby="final-heading">
      <h2 className="reveal" id="final-heading">
        Prêt à <em>grandir</em> ?
      </h2>
      <div className="cta reveal" data-delay="1">
        <a className="btn btn-gold" href={youtubeUrl} target="_blank" rel="noopener noreferrer">
          Regarder sur YouTube <span className="ar">→</span>
        </a>
        <Link className="btn btn-ghost-gold" href="/me-contacter">
          Me contacter
        </Link>
      </div>
    </section>
  );
}
