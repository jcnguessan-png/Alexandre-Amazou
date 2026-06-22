import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** En-tête sombre réutilisable pour les pages utilitaires/légales (Direction C). */
export function DynPageHero({
  eyebrow,
  title,
  lead,
  center,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  center?: boolean;
}) {
  return (
    <section className={cn('page-hero', center && 'center')}>
      <div className="inner">
        <p className="eyebrow eyebrow-gold reveal">{eyebrow}</p>
        <h1 className="reveal" data-delay="1">
          {title}
        </h1>
        {lead ? (
          <p className="lead reveal" data-delay="2">
            {lead}
          </p>
        ) : null}
      </div>
    </section>
  );
}
