import type { Metadata } from 'next';
import { GererCookies } from '@/components/analytics/MetaPixel';
import { DynPageHero } from '@/components/layout/DynPageHero';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description:
    "Politique de confidentialité du site officiel du Pasteur Alexandre AMAZOU : données collectées, finalités, durée de conservation, vos droits (RGPD et loi ivoirienne 2013-450).",
  alternates: { canonical: '/politique-de-confidentialite' },
};

export default function PrivacyPage() {
  return (
    <div className="dyn" data-page="legal">
      <DynPageHero eyebrow="Vos données, votre vie privée" title="Politique de confidentialité" />

      <div className="page-body narrow">
        <div className="prose-dark">
          <p>
            Le Pasteur Alexandre AMAZOU s&apos;engage à respecter votre vie privée et à protéger
            vos données personnelles, conformément au Règlement général européen sur la protection
            des données (<strong>RGPD</strong>) et à la <strong>loi ivoirienne n° 2013-450</strong>{' '}
            du 19 juin 2013 relative à la protection des données à caractère personnel.
          </p>

          <h2>Quelles données collectons-nous ?</h2>
          <p>
            Nous collectons uniquement les données que vous nous fournissez volontairement, pour
            les finalités suivantes :
          </p>
          <ul>
            <li>
              <strong>Formulaire de contact</strong> : prénom, nom, email, téléphone (optionnel),
              objet et contenu du message.
            </li>
            <li>
              <strong>Newsletter</strong> : adresse email, prénom (optionnel).
            </li>
            <li>
              <strong>Téléchargement d&apos;extrait gratuit</strong> : adresse email.
            </li>
            <li>
              <strong>Statistiques anonymes</strong> : pages visitées, durée de visite, pays de
              provenance — collectés via{' '}
              <a href="https://plausible.io/data-policy" target="_blank" rel="noopener noreferrer">
                Plausible Analytics
              </a>
              , solution privacy-first qui ne dépose pas de cookie ni ne traque les visiteurs entre
              les sites.
            </li>
            <li>
              <strong>Mesure des publicités Meta</strong> (uniquement si vous l&apos;acceptez) : pages
              vues et clics vers Amazon ou WhatsApp, associés à un identifiant de navigateur, via le
              pixel Meta (Facebook, Instagram).
            </li>
          </ul>

          <h2>Pourquoi collectons-nous ces données ?</h2>
          <ul>
            <li>Répondre à vos demandes (contact, RDV, partenariats).</li>
            <li>Vous adresser la newsletter à laquelle vous vous êtes abonné·e.</li>
            <li>Vous transmettre les ressources gratuites demandées.</li>
            <li>Mesurer l&apos;audience du site de façon anonymisée afin de l&apos;améliorer.</li>
            <li>
              Avec votre accord, mesurer l&apos;efficacité de nos publicités Facebook et Instagram et les
              montrer aux personnes les plus intéressées.
            </li>
          </ul>

          <h2>Combien de temps conservons-nous vos données ?</h2>
          <ul>
            <li>
              <strong>Messages de contact</strong> : 3 ans après le dernier échange.
            </li>
            <li>
              <strong>Inscription newsletter</strong> : tant que vous ne vous désinscrivez pas.
            </li>
            <li>
              <strong>Statistiques Plausible</strong> : agrégées et anonymisées indéfiniment.
            </li>
            <li>
              <strong>Cookies Meta</strong> : 90 jours au plus ; votre choix (accepter ou refuser) est
              mémorisé dans votre navigateur jusqu&apos;à ce que vous le modifiiez.
            </li>
          </ul>

          <h2>Avec qui sont partagées vos données ?</h2>
          <p>
            Vos données ne sont <strong>jamais vendues</strong>. Elles sont partagées uniquement
            avec les sous-traitants techniques nécessaires au fonctionnement du site :
          </p>
          <ul>
            <li>
              <strong>Brevo (ex-Sendinblue)</strong> — gestionnaire de newsletter.
            </li>
            <li>
              <strong>Cloudflare</strong> — protection anti-spam (Turnstile).
            </li>
            <li>
              <strong>Vercel</strong> — hébergeur du site.
            </li>
            <li>
              <strong>Plausible Analytics</strong> — statistiques anonymes.
            </li>
            <li>
              <strong>Meta Platforms Ireland</strong> — mesure des publicités Facebook et Instagram,
              seulement si vous l&apos;acceptez.
            </li>
          </ul>
          <p>Tous ces prestataires sont engagés contractuellement à respecter le RGPD.</p>

          <h2>Vos droits</h2>
          <p>Vous disposez à tout moment des droits suivants :</p>
          <ul>
            <li>
              Droit d&apos;<strong>accès</strong> à vos données.
            </li>
            <li>
              Droit de <strong>rectification</strong> en cas d&apos;erreur.
            </li>
            <li>
              Droit à l&apos;<strong>effacement</strong> (« droit à l&apos;oubli »).
            </li>
            <li>
              Droit à la <strong>portabilité</strong> de vos données.
            </li>
            <li>
              Droit d&apos;<strong>opposition</strong> au traitement.
            </li>
            <li>
              Droit de <strong>retirer votre consentement</strong> à tout moment.
            </li>
          </ul>
          <p>
            Pour exercer l&apos;un de ces droits, écrivez-nous à{' '}
            <a href={`mailto:${siteConfig.contact.email}?subject=Exercice%20de%20mes%20droits%20RGPD`}>
              {siteConfig.contact.email}
            </a>
            . Nous répondrons sous 30 jours maximum.
          </p>
          <p>
            En cas de désaccord, vous pouvez introduire une réclamation auprès de l&apos;
            <strong>
              Autorité de Régulation des Télécommunications/TIC de Côte d&apos;Ivoire (ARTCI)
            </strong>
            , ou de la CNIL pour les résidents européens.
          </p>

          <h2 id="cookies">Cookies</h2>
          <p>
            Plausible Analytics ne dépose pas de cookie sur votre navigateur. Des cookies strictement
            techniques (préférences, session) peuvent être créés.
          </p>
          <p>
            Avec votre accord, et seulement après avoir cliqué sur « Accepter » dans le bandeau, le
            pixel Meta dépose des cookies de mesure (<code>_fbp</code>, <code>_fbc</code>) pour savoir
            quelle publicité Facebook ou Instagram vous a amené sur le site et si vous avez cliqué vers
            Amazon. Si vous refusez, rien n&apos;est envoyé à Meta. Vous pouvez changer d&apos;avis à
            tout moment : <GererCookies className="font-medium underline underline-offset-2" />.
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
