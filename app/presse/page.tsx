import type { Metadata } from 'next';
import { Download, Mail, ImageIcon, FileText } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
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
  { icon: FileText, title: 'Biographie courte (200 mots)', description: 'Idéale pour une présentation rapide en plateau radio/TV.', href: '#bio-courte' },
  { icon: FileText, title: 'Biographie longue (800 mots)', description: 'Parcours complet — appel, formation, ministère, famille.', href: '#bio-longue' },
  { icon: ImageIcon, title: 'Portrait studio HD', description: 'Photo officielle sous licence presse — 4000×6000 px.', href: '#portrait' },
  { icon: ImageIcon, title: 'Logo & charte', description: 'Logo signature ABMCI + charte couleurs.', href: '#logo' },
];

export default function PressPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', href: '/' },
          { name: 'Presse & médias', href: '/presse' },
        ])}
      />

      <div className="container py-16 md:py-20">
        <SectionTitle
          as="h1"
          eyebrow="Espace presse"
          title="Médias & journalistes"
          description="Vous préparez un article, un reportage ou une interview ? Cette page rassemble les ressources officielles et le contact direct du secrétariat ministériel."
        />

        <h2 className="mt-12 text-2xl font-semibold text-primary">Media kit</h2>
        <span className="mt-3 block h-[2px] w-12 bg-secondary" aria-hidden="true" />
        <p className="mt-4 max-w-prose text-foreground/75">
          Le kit presse complet (PDF + photos HD + logos) est en cours de
          finalisation. En attendant, contactez-nous directement pour recevoir
          les éléments dont vous avez besoin.
        </p>

        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {mediaKit.map((item) => (
            <li
              key={item.title}
              className="flex items-start gap-4 rounded-lg border border-border bg-background p-5"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-secondary/10 text-secondary">
                <item.icon size={20} aria-hidden="true" />
              </div>
              <div>
                <p className="font-semibold text-primary">{item.title}</p>
                <p className="mt-1 text-sm text-foreground/70">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-12 rounded-lg border border-secondary/30 bg-secondary/5 p-6 md:p-8">
          <h2 className="font-heading text-2xl font-semibold text-primary">
            Demande de presse
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/75">
            Pour toute demande d'interview, d'invitation média ou d'éléments
            complémentaires, écrivez directement à{' '}
            <a
              href={`mailto:${siteConfig.contact.email}?subject=Demande%20presse%20-%20`}
              className="font-medium text-primary underline-offset-2 hover:underline"
            >
              {siteConfig.contact.email}
            </a>{' '}
            en précisant le média, le format et la date souhaités.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild variant="primary" size="md">
              <a href={`mailto:${siteConfig.contact.email}?subject=Demande%20presse`}>
                <Mail size={16} aria-hidden="true" />
                Contacter le secrétariat
              </a>
            </Button>
            <Button asChild variant="outline" size="md">
              <a href="/me-contacter">
                <Download size={16} aria-hidden="true" />
                Demander le media kit complet
              </a>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
