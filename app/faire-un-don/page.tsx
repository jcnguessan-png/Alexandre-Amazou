import type { Metadata } from 'next';
import { Heart, CreditCard, Smartphone, Building2 } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { Quote } from '@/components/ui/Quote';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Faire un don — Soutenir le ministère',
  description:
    "Soutenez le ministère du Pasteur Alexandre AMAZOU et l'œuvre de l'ABMCI. Don ponctuel ou régulier — Mobile Money, virement, carte bancaire. Reçu fiscal disponible sur demande.",
  alternates: { canonical: '/faire-un-don' },
};

const channels = [
  {
    icon: Smartphone,
    title: 'Mobile Money',
    description: 'Wave, Orange Money, MTN Money — les solutions privilégiées en Afrique de l\'Ouest.',
    note: 'Numéros communiqués par le secrétariat sur demande.',
  },
  {
    icon: Building2,
    title: 'Virement bancaire',
    description: 'Pour les dons importants ou récurrents — RIB sur demande.',
    note: 'Reçu fiscal disponible.',
  },
  {
    icon: CreditCard,
    title: 'Carte bancaire',
    description: 'Don en ligne sécurisé via la plateforme officielle ABMCI.',
    note: 'Paiement HTTPS, données chiffrées.',
  },
];

export default function DonationPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', href: '/' },
          { name: 'Faire un don', href: '/faire-un-don' },
        ])}
      />

      <div className="container py-16 md:py-20">
        <SectionTitle
          as="h1"
          eyebrow="Soutenir le ministère"
          title="Faire un don"
          description="Votre soutien financier permet de poursuivre l'œuvre missionnaire, de financer les conférences internationales, de former gratuitement les serviteurs de Dieu et de produire les contenus qui transforment des vies."
        />

        <Quote reference="2 Corinthiens 9 : 7-8">
          Que chacun donne comme il l'a résolu en son cœur, sans tristesse ni
          contrainte ; car Dieu aime celui qui donne avec joie. Et Dieu peut
          vous combler de toutes sortes de grâces, afin que, possédant toujours
          en toutes choses de quoi satisfaire à tous vos besoins, vous ayez
          encore en abondance pour toute bonne œuvre.
        </Quote>

        <h2 className="mt-12 text-2xl font-semibold text-primary">
          Comment faire un don
        </h2>
        <span className="mt-3 block h-[2px] w-12 bg-secondary" aria-hidden="true" />

        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {channels.map((c) => (
            <li
              key={c.title}
              className="flex flex-col rounded-lg border border-border bg-background p-6 shadow-sm"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                <c.icon size={22} aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-primary">{c.title}</h3>
              <p className="mt-2 flex-1 text-sm text-foreground/75">{c.description}</p>
              <p className="mt-4 text-xs italic text-foreground/55">{c.note}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 rounded-xl bg-primary p-8 text-primary-foreground md:p-12">
          <Heart className="text-secondary" size={36} aria-hidden="true" />
          <h2 className="mt-5 text-balance font-heading text-2xl font-semibold md:text-3xl">
            Donner directement via le portail officiel ABMCI
          </h2>
          <p className="mt-3 max-w-2xl text-primary-foreground/80">
            Toutes les transactions sont gérées par le portail sécurisé de
            l'Alliance Biblique Missionnaire Côte d'Ivoire — vous recevrez un
            accusé de réception immédiat et, sur demande, un reçu fiscal.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="primary" size="md">
              <a href={siteConfig.donationUrl} target="_blank" rel="noopener noreferrer">
                Faire un don sur abmci.com
              </a>
            </Button>
            <Button asChild variant="secondary" size="md">
              <a href="/me-contacter">Demander un reçu fiscal</a>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
