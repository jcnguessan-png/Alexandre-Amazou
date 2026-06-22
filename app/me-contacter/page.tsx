import type { Metadata } from 'next';
import { Mail, Phone, MapPin, Youtube, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { ContactForm } from '@/components/ui/ContactForm';
import { JsonLd } from '@/components/seo/JsonLd';
import { contactPageSchema, localBusinessSchema, breadcrumbSchema } from '@/lib/schema';
import { siteConfig } from '@/lib/site-config';
import './me-contacter.css';

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
  const { contact, social } = siteConfig;

  return (
    <div className="dyn dyn-contact" data-page="contact">
      <JsonLd data={contactPageSchema()} />
      <JsonLd data={localBusinessSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', href: '/' },
          { name: 'Me contacter', href: '/me-contacter' },
        ])}
      />

      <section className="ct-hero">
        <div className="ct-wrap">
          <div className="ct-intro">
            <p className="eyebrow eyebrow-gold reveal">Me contacter</p>
            <h1 className="reveal" data-delay="1">
              Entrons en <em>relation</em>
            </h1>
            <p className="lead reveal" data-delay="2">
              Pour une invitation, une question sur les enseignements, une commande d&apos;ouvrage
              ou une demande de prière — l&apos;équipe pastorale vous répond.
            </p>

            <div className="ct-list reveal" data-delay="2">
              <div className="ct-item">
                <span className="ic">
                  <Mail aria-hidden="true" />
                </span>
                <div>
                  <div className="k">Email</div>
                  <div className="v">
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  </div>
                  <div className="sub">{contact.responseDelay}</div>
                </div>
              </div>
              <div className="ct-item">
                <span className="ic">
                  <Phone aria-hidden="true" />
                </span>
                <div>
                  <div className="k">Téléphone &amp; WhatsApp</div>
                  <div className="v">
                    <a href={`tel:${contact.phoneIntl}`}>{contact.phone}</a>
                  </div>
                  <div className="sub">{contact.rdv}</div>
                </div>
              </div>
              <div className="ct-item">
                <span className="ic">
                  <MapPin aria-hidden="true" />
                </span>
                <div>
                  <div className="k">Adresse</div>
                  <div className="v">{contact.address.organisation}</div>
                  <div className="sub">
                    {contact.address.street}, {contact.address.locality} — {contact.address.city},{' '}
                    {contact.address.country}
                  </div>
                </div>
              </div>
            </div>

            <div className="ct-social reveal" data-delay="3">
              <a href={social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <Youtube aria-hidden="true" />
              </a>
              <a href={social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook aria-hidden="true" />
              </a>
              <a href={social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram aria-hidden="true" />
              </a>
              <a href={social.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <MessageCircle aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="ct-form reveal" data-delay="1">
            <h2>Envoyer un message</h2>
            <p className="note">
              Vos données ne sont utilisées que pour répondre à votre demande.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
