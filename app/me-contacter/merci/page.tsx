import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Message envoyé — Merci',
  description: 'Votre message a bien été reçu. Le secrétariat vous répondra sous 48 à 72 h ouvrées.',
  robots: { index: false, follow: true },
};

export default function ContactSuccessPage({
  searchParams,
}: {
  searchParams: { invitation?: string };
}) {
  const isInvitation = searchParams.invitation === '1';

  return (
    <div className="dyn" data-page="merci">
      <div className="page-center">
        <CheckCircle2 className="ico" size={60} aria-hidden="true" />
        <p className="k">{isInvitation ? 'Invitation reçue' : 'Message reçu'}</p>
        <h1>
          {isInvitation
            ? 'Votre demande d’invitation a bien été envoyée'
            : 'Votre message a bien été envoyé'}
        </h1>
        {isInvitation ? (
          <p>
            Merci pour votre invitation. Le secrétariat ministériel l&apos;étudie avec l&apos;agenda
            du Pasteur et vous répondra sous <strong>48 à 72 h ouvrées</strong>. Dès la demande
            validée, vous recevrez par email votre accès au <strong>kit de communication</strong>{' '}
            (biographies, photos et vidéo officielles) pour préparer vos visuels.
          </p>
        ) : (
          <p>
            Merci pour votre confiance. Le secrétariat ministériel a reçu votre demande et vous
            répondra sous <strong>48 à 72 h ouvrées</strong>. Que la grâce du Seigneur soit avec
            vous.
          </p>
        )}
        <div className="cta">
          <Link className="btn btn-gold" href="/">
            Retour à l&apos;accueil <span className="ar">→</span>
          </Link>
          <Link className="btn btn-ghost-gold" href="/mes-enseignements">
            Découvrir mes enseignements
          </Link>
        </div>
      </div>
    </div>
  );
}
