import { faq } from '@/data/faq';

/**
 * FAQ d'accueil — contenu visible (requis pour l'éligibilité au schéma FAQPage,
 * dont le JSON-LD est émis côté page). Accordéon natif <details> : accessible,
 * sans JavaScript.
 */
export function FaqSection() {
  return (
    <section className="c-faq" aria-labelledby="faq-title">
      <div className="c-faq-inner">
        <div className="c-head reveal">
          <p className="k">Questions fréquentes</p>
          <h2 id="faq-title">
            À propos du <em>Pasteur Amazou</em>
          </h2>
        </div>
        <div className="c-faq-list">
          {faq.map((item, i) => (
            <details className="c-faq-item reveal" data-delay={String(i % 3)} key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
