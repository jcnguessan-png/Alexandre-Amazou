import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Message envoyé — Merci',
  description: 'Votre message a bien été reçu. Le secrétariat vous répondra sous 48 à 72 h ouvrées.',
  robots: { index: false, follow: true },
};

export default function ContactSuccessPage() {
  return (
    <div className="container flex min-h-[60vh] items-center py-16 md:py-20">
      <div className="mx-auto max-w-lg text-center">
        <CheckCircle2 className="mx-auto text-secondary" size={64} aria-hidden="true" />
        <h1 className="mt-6 text-balance font-heading text-display-md font-semibold text-primary">
          Votre message a bien été envoyé
        </h1>
        <span className="mx-auto mt-5 block h-[2px] w-12 bg-secondary" aria-hidden="true" />
        <p className="mt-6 text-base leading-relaxed text-foreground/75 md:text-lg">
          Merci pour votre confiance. Le secrétariat ministériel a reçu votre
          demande et vous répondra sous <strong>48 à 72 h ouvrées</strong>. Que
          la grâce du Seigneur soit avec vous.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild variant="primary" size="md">
            <Link href="/">Retour à l'accueil</Link>
          </Button>
          <Button asChild variant="outline" size="md">
            <Link href="/mes-enseignements">Découvrir mes enseignements</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
