import type { Metadata } from 'next';
import Link from 'next/link';
import { Download, Mail, ImageIcon, FileText } from 'lucide-react';
import { DynPageHero } from '@/components/layout/DynPageHero';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Presse & médias',
  description:
    "Espace presse du Pasteur Alexandre AMAZOU : biographie courte, biographie longue, photos haute définition, logos, demandes d'interview et passages médias.",
  alternates: { canonical: '/presse' },
};

const mediaKit = [
  {
    icon: FileText,
    title: 'Biographie courte (200 mots)',
    description: 'Idéale pour une présentation rapide en plateau radio/TV.',
  },
  {
    icon: FileText,
    title: 'Biographie longue (800 mots)',
    description: 'Parcours complet — appel, formation, ministère, famille.',
  },
  {
    icon: ImageIcon,
    title: 'Portrait studio HD',
    description: 'Photo officielle sous licence presse — 4000×6000 px.',
  },
  {
    icon: ImageIcon,
    title: 'Logo & charte',
    description: 'Logo signature ABMCI + charte couleurs.',
  },
];

export default function PressPage() {
  return (
    <div className="dyn" data-page="presse">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', href: '/' },
          { name: 'Presse & médias', href: '/presse' },
        ])}
      />

      <DynPageHero
        eyebrow="Espace presse"
        title="Médias & journalistes"
        lead="Vous préparez un article, un reportage ou une interview ? Cette page rassemble les ressources officielles et le contact direct du secrétariat ministériel."
      />

      <div className="page-body">
        <div className="stack-lg">
          <div>
            <div className="subhead reveal">
              <p className="eyebrow eyebrow-gold">Ressources</p>
              <h2>Media kit</h2>
              <span className="bar" aria-hidden="true" />
            </div>
            <p className="reveal" style={{ marginTop: '18px', maxWidth: '62ch', color: 'var(--muted-on-dark)' }}>
              Le kit presse complet (PDF + photos HD + logos) est en cours de finalisation. En
              attendant, contactez-nous directement pour recevoir les éléments dont vous avez
              besoin.
            </p>
            <div className="dgrid cols-2" style={{ marginTop: '30px' }}>
              {mediaKit.map((item) => (
                <div className="dcard reveal" key={item.title}>
                  <span className="ic">
                    <item.icon size={20} aria-hidden="true" />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="panel-gold reveal">
            <h2>Demande de presse</h2>
            <p>
              Pour toute demande d&apos;interview, d&apos;invitation média ou d&apos;éléments
              complémentaires, écrivez directement à{' '}
              <a
                href={`mailto:${siteConfig.contact.email}?subject=Demande%20presse%20-%20`}
                style={{ color: 'var(--gold)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
              >
                {siteConfig.contact.email}
              </a>{' '}
              en précisant le média, le format et la date souhaités.
            </p>
            <div className="cta">
              <a className="btn btn-gold" href={`mailto:${siteConfig.contact.email}?subject=Demande%20presse`}>
                <Mail size={16} aria-hidden="true" /> Contacter le secrétariat
              </a>
              <Link className="btn btn-ghost-gold" href="/me-contacter">
                <Download size={16} aria-hidden="true" /> Demander le media kit complet
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
