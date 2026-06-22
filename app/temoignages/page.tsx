import type { Metadata } from 'next';
import Link from 'next/link';
import { Quote as QuoteIcon } from 'lucide-react';
import { DynPageHero } from '@/components/layout/DynPageHero';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import { testimonials } from '@/data/testimonials';

export const metadata: Metadata = {
  title: 'Témoignages — Vies transformées',
  description:
    "Témoignages de vies transformées par les enseignements du Pasteur Alexandre AMAZOU : pasteurs, entrepreneurs chrétiens, étudiants ISBEM. Une parole qui touche à la racine.",
  alternates: { canonical: '/temoignages' },
};

export default function TestimonialsPage() {
  return (
    <div className="dyn" data-page="temoignages">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', href: '/' },
          { name: 'Témoignages', href: '/temoignages' },
        ])}
      />

      <DynPageHero
        eyebrow="Témoignages"
        title="Des vies transformées par la Parole"
        lead="Voici quelques témoignages de frères et sœurs qui ont reçu les enseignements du Pasteur Alexandre AMAZOU. Ils sont partagés avec leur consentement explicite."
      />

      <div className="page-body">
        <ul className="dgrid cols-2">
          {testimonials.map((t) => (
            <li className="dcard reveal" key={t.id} style={{ listStyle: 'none' }}>
              <QuoteIcon size={30} aria-hidden="true" style={{ color: 'var(--gold)' }} />
              <blockquote
                style={{
                  fontFamily: 'var(--serif)',
                  fontStyle: 'italic',
                  fontSize: '20px',
                  lineHeight: 1.4,
                  color: 'var(--cream)',
                  marginTop: '14px',
                }}
              >
                « {t.quote} »
              </blockquote>
              <figcaption style={{ marginTop: '18px' }}>
                <span style={{ fontFamily: 'var(--serif)', fontSize: '18px', color: 'var(--cream)' }}>
                  {t.name}
                </span>
                {t.role ? (
                  <span style={{ display: 'block', fontSize: '14px', color: 'var(--muted-on-dark)', marginTop: '2px' }}>
                    {t.role}
                  </span>
                ) : null}
                {t.city ? (
                  <span
                    style={{
                      display: 'block',
                      fontFamily: 'var(--sans)',
                      fontSize: '11px',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--gold)',
                      marginTop: '6px',
                    }}
                  >
                    {t.city}
                    {t.countryCode ? `, ${t.countryCode}` : ''}
                  </span>
                ) : null}
              </figcaption>
            </li>
          ))}
        </ul>

        <div className="panel-gold reveal" style={{ marginTop: '56px', textAlign: 'center' }}>
          <h2>Vous avez vécu une transformation ?</h2>
          <p style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            Partagez votre témoignage en sélectionnant l&apos;objet « Témoignage » dans le
            formulaire de contact. Votre récit pourra encourager d&apos;autres frères et sœurs.
          </p>
          <div className="cta" style={{ justifyContent: 'center' }}>
            <Link className="btn btn-gold" href="/me-contacter">
              Partager mon témoignage <span className="ar">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
