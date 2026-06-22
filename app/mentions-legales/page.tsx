import type { Metadata } from 'next';
import { DynPageHero } from '@/components/layout/DynPageHero';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Mentions légales',
  description:
    "Mentions légales du site officiel du Pasteur Alexandre AMAZOU : éditeur, hébergement, propriété intellectuelle, conditions d'utilisation.",
  alternates: { canonical: '/mentions-legales' },
  robots: { index: true, follow: true },
};

export default function LegalNoticePage() {
  return (
    <div className="dyn" data-page="legal">
      <DynPageHero eyebrow="Informations légales" title="Mentions légales" />

      <div className="page-body narrow">
        <div className="prose-dark">
          <h2>Éditeur du site</h2>
          <p>
            Le site <strong>{siteConfig.url.replace('https://', '')}</strong> est édité par le
            Pasteur Alexandre AMAZOU.
          </p>
          <p>
            Adresse : {siteConfig.contact.address.organisation},{' '}
            {siteConfig.contact.address.street}, {siteConfig.contact.address.locality},{' '}
            {siteConfig.contact.address.city}, {siteConfig.contact.address.country}.
            <br />
            Email : <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
            <br />
            Téléphone : {siteConfig.contact.phone}
          </p>

          <h2>Directeur de la publication</h2>
          <p>Pasteur Alexandre AMAZOU.</p>

          <h2>Hébergement</h2>
          <p>
            Le site est hébergé par <strong>Vercel Inc.</strong>, 340 S Lemon Ave #4133, Walnut,
            CA 91789, États-Unis (ou tout autre hébergeur contractualisé ultérieurement).
          </p>

          <h2>Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble des contenus présents sur ce site (textes, images, vidéos, logos,
            charte graphique, code source) sont la propriété exclusive du Pasteur Alexandre
            AMAZOU ou de ses ayants droit. Toute reproduction, représentation ou diffusion,
            totale ou partielle, sans autorisation écrite préalable, est strictement interdite et
            constitue une contrefaçon sanctionnée par le Code de la propriété intellectuelle.
          </p>

          <h2>Liens hypertextes</h2>
          <p>
            Ce site contient des liens vers d&apos;autres sites — notamment{' '}
            <a href="https://abmci.com" target="_blank" rel="noopener noreferrer">
              abmci.com
            </a>{' '}
            et{' '}
            <a href={siteConfig.bookstoreUrl} target="_blank" rel="noopener noreferrer">
              librairie.abmci.com
            </a>
            . Le Pasteur Alexandre AMAZOU n&apos;est pas responsable du contenu ni des pratiques
            de confidentialité de ces sites tiers.
          </p>

          <h2>Conditions d&apos;utilisation</h2>
          <p>
            L&apos;utilisation du site implique l&apos;acceptation pleine et entière des présentes
            conditions. Le Pasteur Alexandre AMAZOU se réserve le droit de modifier ces mentions à
            tout moment, sans préavis.
          </p>

          <h2>Droit applicable</h2>
          <p>
            Les présentes mentions sont régies par le droit ivoirien, notamment la loi n° 2013-450
            du 19 juin 2013 relative à la protection des données à caractère personnel, ainsi que
            par le Règlement général européen sur la protection des données (RGPD) pour les
            visiteurs européens.
          </p>

          <p className="updated">
            Dernière mise à jour :{' '}
            {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })}.
          </p>
        </div>
      </div>
    </div>
  );
}
