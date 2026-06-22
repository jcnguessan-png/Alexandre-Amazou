import type { Metadata } from 'next';
import Link from 'next/link';
import { CreditCard, Smartphone, Building2 } from 'lucide-react';
import { DynPageHero } from '@/components/layout/DynPageHero';
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
    description: "Wave, Orange Money, MTN Money — les solutions privilégiées en Afrique de l'Ouest.",
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
    <div className="dyn" data-page="don">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', href: '/' },
          { name: 'Faire un don', href: '/faire-un-don' },
        ])}
      />

      <DynPageHero
        eyebrow="Soutenir le ministère"
        title="Faire un don"
        lead="Votre soutien financier permet de poursuivre l'œuvre missionnaire, de financer les conférences internationales, de former gratuitement les serviteurs de Dieu et de produire les contenus qui transforment des vies."
      />

      <div className="page-body">
        <div className="stack-lg">
          <div className="dquote reveal">
            <p className="q">
              « Que chacun donne comme il l&apos;a résolu en son cœur, sans tristesse ni
              contrainte ; car Dieu aime celui qui donne avec joie. »
            </p>
            <p className="src">— 2 Corinthiens 9 : 7</p>
          </div>

          <div>
            <div className="subhead reveal">
              <p className="eyebrow eyebrow-gold">Trois canaux</p>
              <h2>Comment faire un don</h2>
              <span className="bar" aria-hidden="true" />
            </div>
            <div className="dgrid cols-3" style={{ marginTop: '32px' }}>
              {channels.map((c) => (
                <div className="dcard reveal" key={c.title}>
                  <span className="ic">
                    <c.icon size={22} aria-hidden="true" />
                  </span>
                  <h3>{c.title}</h3>
                  <p>{c.description}</p>
                  <p className="note">{c.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="panel-gold reveal">
            <h2>Donner directement via le portail officiel ABMCI</h2>
            <p>
              Toutes les transactions sont gérées par le portail sécurisé de l&apos;Alliance
              Biblique Missionnaire Côte d&apos;Ivoire — vous recevrez un accusé de réception
              immédiat et, sur demande, un reçu fiscal.
            </p>
            <div className="cta">
              <a className="btn btn-gold" href={siteConfig.donationUrl} target="_blank" rel="noopener noreferrer">
                Faire un don sur abmci.com <span className="ar">→</span>
              </a>
              <Link className="btn btn-ghost-gold" href="/me-contacter">
                Demander un reçu fiscal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
