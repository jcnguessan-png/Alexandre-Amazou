import type { Metadata } from 'next';
import { CheckCircle2 } from 'lucide-react';
import { DynPageHero } from '@/components/layout/DynPageHero';
import { NewsletterBanner } from '@/components/home/NewsletterBanner';

export const metadata: Metadata = {
  title: 'Newsletter — Recevez mes réflexions',
  description:
    "Inscrivez-vous à la newsletter du Pasteur Alexandre AMAZOU. Réflexions hebdomadaires, annonces de livres, agenda des conférences et chapitre 1 gratuit en cadeau de bienvenue.",
  alternates: { canonical: '/newsletter' },
};

const benefits = [
  'Une méditation biblique chaque semaine — directement dans votre boîte mail',
  'Le chapitre 1 du dernier livre offert dès la confirmation de votre inscription',
  'Les annonces des nouvelles parutions, conférences et missions internationales',
  "L'accès en avant-première aux contenus exclusifs (séminaires, podcasts, ebooks)",
  'Un désabonnement en un clic, à tout moment, sans question posée',
];

export default function NewsletterPage() {
  return (
    <div className="dyn" data-page="newsletter">
      <DynPageHero
        eyebrow="Newsletter"
        title="Recevez mes réflexions hebdomadaires"
        lead="Une parole pour fortifier votre semaine, équiper votre ministère et nourrir votre marche avec Dieu."
      />

      <div className="page-body">
        <ul className="dgrid cols-2">
          {benefits.map((benefit) => (
            <li
              className="dcard reveal"
              key={benefit}
              style={{ listStyle: 'none', flexDirection: 'row', gap: '14px', alignItems: 'flex-start' }}
            >
              <CheckCircle2
                size={20}
                aria-hidden="true"
                style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '2px' }}
              />
              <p style={{ marginTop: 0 }}>{benefit}</p>
            </li>
          ))}
        </ul>
      </div>

      <NewsletterBanner source="newsletter-page" />
    </div>
  );
}
