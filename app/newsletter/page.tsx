import type { Metadata } from 'next';
import { CheckCircle2 } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
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
    <>
      <div className="container py-16 md:py-20">
        <SectionTitle
          as="h1"
          eyebrow="Newsletter"
          title="Recevez mes réflexions hebdomadaires"
          description="Une parole pour fortifier votre semaine, équiper votre ministère et nourrir votre marche avec Dieu."
        />

        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-3 rounded-lg border border-border bg-background p-5">
              <CheckCircle2
                size={20}
                aria-hidden="true"
                className="mt-0.5 flex-shrink-0 text-secondary"
              />
              <p className="text-sm leading-relaxed text-foreground/80">{benefit}</p>
            </li>
          ))}
        </ul>
      </div>

      <NewsletterBanner source="newsletter-page" />
    </>
  );
}
