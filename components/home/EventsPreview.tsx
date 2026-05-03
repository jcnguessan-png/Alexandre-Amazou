import Link from 'next/link';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import type { Event } from '@/data/events';
import { Button } from '@/components/ui/Button';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { formatDateFR } from '@/lib/utils';

export function EventsPreview({ events }: { events: Event[] }) {
  if (events.length === 0) return null;

  return (
    <section
      aria-labelledby="events-heading"
      className="bg-background py-14 md:py-20"
    >
      <div className="container">
        <SectionTitle
          eyebrow="Conférences & agenda"
          title="Les prochains rendez-vous"
          description="Retrouvez le Pasteur Alexandre AMAZOU en convention, en mission et en séminaire — Côte d'Ivoire et international."
        />

        <ol className="grid gap-6 md:grid-cols-3">
          {events.slice(0, 3).map((event) => (
            <li
              key={event.id}
              className="flex flex-col rounded-lg border border-border bg-background p-6 shadow-sm transition hover:border-secondary/50 hover:shadow-md"
            >
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                <Calendar size={14} aria-hidden="true" />
                <time dateTime={event.startDate}>{formatDateFR(event.startDate)}</time>
              </p>
              <h3
                id={event.id === events[0]?.id ? 'events-heading' : undefined}
                className="mt-3 text-xl font-semibold leading-tight text-primary"
              >
                {event.title}
              </h3>
              <p className="mt-3 flex items-center gap-1.5 text-sm text-foreground/70">
                <MapPin size={14} aria-hidden="true" />
                {event.city}, {event.countryCode}
              </p>
              <p className="mt-4 line-clamp-3 flex-1 text-sm leading-relaxed text-foreground/70">
                {event.description}
              </p>
              {event.registrationUrl ? (
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-secondary"
                >
                  S'inscrire
                  <ArrowRight size={14} aria-hidden="true" />
                </a>
              ) : (
                <span className="mt-5 text-sm font-medium text-foreground/50">
                  Détails à venir
                </span>
              )}
            </li>
          ))}
        </ol>

        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="md">
            <Link href="/agenda">
              Voir tout l'agenda
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
