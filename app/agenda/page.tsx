import type { Metadata } from 'next';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { JsonLd } from '@/components/seo/JsonLd';
import { upcomingEvents } from '@/data/events';
import { eventSchema, breadcrumbSchema } from '@/lib/schema';
import { formatDateFR } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Agenda — Conférences & événements',
  description:
    "Retrouvez le Pasteur Alexandre AMAZOU en convention, séminaire, mission et conférence — Côte d'Ivoire, Canada, France et au-delà. Toutes les dates à venir.",
  alternates: { canonical: '/agenda' },
};

export default function AgendaPage() {
  const events = upcomingEvents();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', href: '/' },
          { name: 'Agenda', href: '/agenda' },
        ])}
      />
      {events.map((e) => (
        <JsonLd key={e.id} data={eventSchema(e)} />
      ))}

      <div className="container py-16 md:py-20">
        <SectionTitle
          as="h1"
          eyebrow="Agenda"
          title="Conférences & événements à venir"
          description="Conventions annuelles, missions internationales, séminaires de leadership : retrouvez les prochaines occasions de recevoir l'enseignement du Pasteur Alexandre AMAZOU en présentiel."
        />

        {events.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-muted/40 p-12 text-center text-foreground/60">
            Aucun événement à venir pour le moment. Inscrivez-vous à la
            newsletter pour être prévenu·e des prochaines dates.
          </div>
        ) : (
          <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <li
                key={event.id}
                className="flex flex-col rounded-lg border border-border bg-background p-6 shadow-sm transition hover:border-secondary/50 hover:shadow-md"
              >
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                  <Calendar size={14} aria-hidden="true" />
                  <time dateTime={event.startDate}>{formatDateFR(event.startDate)}</time>
                  {event.endDate ? (
                    <>
                      <span>—</span>
                      <time dateTime={event.endDate}>{formatDateFR(event.endDate)}</time>
                    </>
                  ) : null}
                </p>
                <h2 className="mt-3 text-xl font-semibold leading-tight text-primary">
                  {event.title}
                </h2>
                <p className="mt-3 flex items-center gap-1.5 text-sm text-foreground/70">
                  <MapPin size={14} aria-hidden="true" />
                  {event.venue ? `${event.venue} — ` : ''}
                  {event.city}, {event.countryCode}
                </p>
                <p className="mt-4 line-clamp-4 flex-1 text-sm leading-relaxed text-foreground/75">
                  {event.description}
                </p>
                {event.registrationUrl ? (
                  <a
                    href={event.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-secondary"
                  >
                    S'inscrire <ArrowRight size={14} aria-hidden="true" />
                  </a>
                ) : (
                  <span className="mt-5 text-sm font-medium text-foreground/50">
                    Inscriptions à venir
                  </span>
                )}
              </li>
            ))}
          </ol>
        )}
      </div>
    </>
  );
}
