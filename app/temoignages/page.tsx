import type { Metadata } from 'next';
import { Quote as QuoteIcon } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
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
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', href: '/' },
          { name: 'Témoignages', href: '/temoignages' },
        ])}
      />

      <div className="container py-16 md:py-20">
        <SectionTitle
          as="h1"
          eyebrow="Témoignages"
          title="Des vies transformées par la Parole"
          description="Voici quelques témoignages de frères et sœurs qui ont reçu les enseignements du Pasteur Alexandre AMAZOU. Ils sont partagés avec leur consentement explicite."
        />

        <ul className="mt-12 grid gap-8 md:grid-cols-2">
          {testimonials.map((t) => (
            <li
              key={t.id}
              className="relative rounded-lg border border-border bg-background p-8 shadow-sm"
            >
              <QuoteIcon
                size={36}
                aria-hidden="true"
                className="absolute -top-4 left-6 text-secondary"
              />
              <blockquote className="font-quote text-lg italic leading-relaxed text-primary md:text-xl">
                « {t.quote} »
              </blockquote>
              <figcaption className="mt-6 text-sm">
                <span className="font-semibold text-primary">{t.name}</span>
                {t.role ? <span className="block text-foreground/70">{t.role}</span> : null}
                {t.city ? (
                  <span className="block text-xs uppercase tracking-[0.15em] text-secondary">
                    {t.city}
                    {t.countryCode ? `, ${t.countryCode}` : ''}
                  </span>
                ) : null}
              </figcaption>
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-16 max-w-2xl rounded-lg border border-secondary/30 bg-secondary/5 p-6 text-center md:p-8">
          <p className="font-heading text-xl font-semibold text-primary">
            Vous avez vécu une transformation ?
          </p>
          <p className="mt-3 text-sm text-foreground/70">
            Partagez votre témoignage en sélectionnant l'objet « Témoignage »
            dans le formulaire de contact. Votre récit pourra encourager
            d'autres frères et sœurs.
          </p>
          <a
            href="/me-contacter"
            className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-secondary"
          >
            Partager mon témoignage →
          </a>
        </div>
      </div>
    </>
  );
}
