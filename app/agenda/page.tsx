import type { Metadata } from 'next';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { DynPageHero } from '@/components/layout/DynPageHero';
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
    <div className="dyn" data-page="agenda">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', href: '/' },
          { name: 'Agenda', href: '/agenda' },
        ])}
      />
      {events.map((e) => (
        <JsonLd key={e.id} data={eventSchema(e)} />
      ))}

      <DynPageHero
        eyebrow="Agenda"
        title="Conférences & événements à venir"
        lead="Conventions annuelles, missions internationales, séminaires de leadership : retrouvez les prochaines occasions de recevoir l'enseignement du Pasteur Alexandre AMAZOU en présentiel."
      />

      <div className="page-body">
        {events.length === 0 ? (
          <div className="dcard reveal" style={{ textAlign: 'center', alignItems: 'center' }}>
            <p>
              Aucun événement à venir pour le moment. Inscrivez-vous à la newsletter pour être
              prévenu·e des prochaines dates.
            </p>
          </div>
        ) : (
          <ol className="dgrid cols-3">
            {events.map((event) => (
              <li className="dcard reveal" key={event.id} style={{ listStyle: 'none' }}>
                <span className="ko">
                  <Calendar size={14} aria-hidden="true" />
                  <time dateTime={event.startDate}>{formatDateFR(event.startDate)}</time>
                  {event.endDate ? (
                    <>
                      {' — '}
                      <time dateTime={event.endDate}>{formatDateFR(event.endDate)}</time>
                    </>
                  ) : null}
                </span>
                <h3 style={{ marginTop: '12px' }}>{event.title}</h3>
                <p
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '14px',
                    marginTop: '10px',
                  }}
                >
                  <MapPin size={14} aria-hidden="true" />
                  {event.venue ? `${event.venue} — ` : ''}
                  {event.city}, {event.countryCode}
                </p>
                <p style={{ flex: 1 }}>{event.description}</p>
                {event.registrationUrl ? (
                  <a className="go" href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
                    S&apos;inscrire <ArrowRight size={14} aria-hidden="true" />
                  </a>
                ) : (
                  <span className="go" style={{ color: 'var(--muted-on-dark)' }}>
                    Inscriptions à venir
                  </span>
                )}
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
