import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, AlertCircle } from 'lucide-react';
import { verifyToken, KIT_ACCESS_DAYS } from '@/lib/kit';
import { KitApprovalForm } from '@/components/kit/KitApprovalForm';
import '../kit.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Valider une demande — Kit de communication',
  robots: { index: false, follow: false },
};

/**
 * Page ouverte depuis l'email reçu par le secrétariat. Elle n'envoie rien d'elle-même :
 * l'envoi exige un clic (POST), pour que les antivirus de messagerie qui « visitent »
 * les liens ne valident pas une demande à la place du secrétariat.
 */
export default function KitApprovePage({ searchParams }: { searchParams: { t?: string } }) {
  const request = verifyToken(searchParams.t, 'approve');

  return (
    <div className="dyn dyn-kit" data-page="kit-valider">
      <div className="page-center">
        {request ? (
          <>
            <ShieldCheck className="ico" size={56} aria-hidden="true" />
            <p className="k">Secrétariat ministériel</p>
            <h1>Envoyer le kit de communication&nbsp;?</h1>
            <dl className="kit-summary">
              <dt>Demandeur</dt>
              <dd>
                {request.name} — {request.email}
              </dd>
              {request.organisation ? (
                <>
                  <dt>Église / organisation</dt>
                  <dd>{request.organisation}</dd>
                </>
              ) : null}
              {request.eventType ? (
                <>
                  <dt>Événement</dt>
                  <dd>{request.eventType}</dd>
                </>
              ) : null}
              {request.dates ? (
                <>
                  <dt>Date(s)</dt>
                  <dd>{request.dates}</dd>
                </>
              ) : null}
              {request.place ? (
                <>
                  <dt>Lieu</dt>
                  <dd>{request.place}</dd>
                </>
              ) : null}
            </dl>
            <p>
              Le demandeur recevra par email un lien personnel vers les biographies, photos et
              vidéo officielles, valable {KIT_ACCESS_DAYS} jours.
            </p>
            <div className="cta">
              <KitApprovalForm token={searchParams.t as string} />
            </div>
          </>
        ) : (
          <>
            <AlertCircle className="ico" size={56} aria-hidden="true" />
            <p className="k">Lien invalide</p>
            <h1>Ce lien de validation n’est plus valable</h1>
            <p>
              Il a peut-être expiré. Demandez à l’organisateur de renvoyer sa demande depuis le
              formulaire de contact.
            </p>
            <div className="cta">
              <Link className="btn btn-gold" href="/">
                Retour à l&apos;accueil
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
