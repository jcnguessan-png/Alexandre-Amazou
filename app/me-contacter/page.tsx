import type { Metadata } from 'next';
import { Mail, Phone, MapPin, Clock, MessageCircle, ArrowRight } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ContactForm } from '@/components/ui/ContactForm';
import { JsonLd } from '@/components/seo/JsonLd';
import { contactPageSchema, localBusinessSchema, breadcrumbSchema } from '@/lib/schema';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Me contacter',
  description:
    "Contactez le Pasteur Alexandre AMAZOU : invitation en conférence, rendez-vous pastoral, demande presse, partenariat. Cathédrale ABMCI à Riviera Palmeraie (Cocody, Abidjan).",
  alternates: { canonical: '/me-contacter' },
  openGraph: {
    title: 'Contacter le Pasteur Alexandre AMAZOU',
    description: 'Invitations, RDV pastoraux, presse, partenariats — réponse sous 48 à 72 h.',
    url: '/me-contacter',
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactPageSchema()} />
      <JsonLd data={localBusinessSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', href: '/' },
          { name: 'Me contacter', href: '/me-contacter' },
        ])}
      />

      <div className="container py-16 md:py-20">
        <SectionTitle
          as="h1"
          eyebrow="Contact"
          title="Contacter le Pasteur Alexandre AMAZOU"
          description="Invitations, rendez-vous pastoraux, demandes de presse, partenariats : votre message sera transmis directement au secrétariat ministériel."
        />

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <ContactForm />

          <aside className="space-y-8 rounded-lg border border-border bg-muted/30 p-6 md:p-8 lg:sticky lg:top-28 lg:self-start">
            <div>
              <h2 className="font-heading text-xl font-semibold text-primary">
                Coordonnées
              </h2>
              <span className="mt-3 block h-[2px] w-12 bg-secondary" aria-hidden="true" />

              <ul className="mt-6 space-y-5 text-sm">
                <li>
                  <p className="flex items-center gap-2 font-semibold text-primary">
                    <Mail size={16} className="text-secondary" aria-hidden="true" />
                    Email
                  </p>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="mt-1 block text-foreground/75 hover:text-secondary"
                  >
                    {siteConfig.contact.email}
                  </a>
                </li>
                <li>
                  <p className="flex items-center gap-2 font-semibold text-primary">
                    <Phone size={16} className="text-secondary" aria-hidden="true" />
                    Téléphone
                  </p>
                  <a
                    href={`tel:${siteConfig.contact.phoneIntl}`}
                    className="mt-1 block text-foreground/75 hover:text-secondary"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </li>
                <li>
                  <p className="flex items-center gap-2 font-semibold text-primary">
                    <Clock size={16} className="text-secondary" aria-hidden="true" />
                    Rendez-vous
                  </p>
                  <p className="mt-1 text-foreground/75">{siteConfig.contact.rdv}</p>
                </li>
                <li>
                  <p className="flex items-center gap-2 font-semibold text-primary">
                    <MapPin size={16} className="text-secondary" aria-hidden="true" />
                    Adresse
                  </p>
                  <address className="mt-1 not-italic text-foreground/75">
                    {siteConfig.contact.address.organisation}
                    <br />
                    {siteConfig.contact.address.street}
                    <br />
                    {siteConfig.contact.address.locality}, {siteConfig.contact.address.city}
                    <br />
                    {siteConfig.contact.address.country}
                  </address>
                </li>
              </ul>
            </div>

            <a
              href={siteConfig.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 rounded-lg bg-[#25D366] px-5 py-4 text-white transition hover:bg-[#1da851]"
              aria-label="Discuter sur WhatsApp avec le secrétariat"
            >
              <span className="flex items-center gap-3">
                <MessageCircle size={20} aria-hidden="true" />
                <span className="font-semibold">Discuter sur WhatsApp</span>
              </span>
              <ArrowRight size={16} aria-hidden="true" />
            </a>

            <p className="text-xs leading-relaxed text-foreground/60">
              {siteConfig.contact.responseDelay}. Pour toute urgence pastorale,
              merci de contacter directement votre église locale ABMCI.
            </p>
          </aside>
        </div>
      </div>
    </>
  );
}
