import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Inscription confirmée — Bienvenue',
  description: "Votre inscription à la newsletter du Pasteur Alexandre AMAZOU est confirmée. Bienvenue !",
  robots: { index: false, follow: true },
};

export default function NewsletterConfirmedPage() {
  return (
    <div className="dyn" data-page="newsletter">
      <div className="page-center">
        <CheckCircle2 className="ico" size={60} aria-hidden="true" />
        <p className="k">Inscription confirmée</p>
        <h1>Bienvenue ! Votre inscription est confirmée.</h1>
        <p>
          Le chapitre&nbsp;1 du dernier livre vient d&apos;être envoyé à votre adresse. Pensez à
          vérifier vos spams si vous ne le trouvez pas.
        </p>
        <div className="cta">
          <Link className="btn btn-gold" href="/mes-livres">
            Découvrir tous mes livres <span className="ar">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
