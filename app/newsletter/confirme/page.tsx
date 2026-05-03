import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Inscription confirmée — Bienvenue',
  description: "Votre inscription à la newsletter du Pasteur Alexandre AMAZOU est confirmée. Bienvenue !",
  robots: { index: false, follow: true },
};

export default function NewsletterConfirmedPage() {
  return (
    <div className="container flex min-h-[60vh] items-center py-16 md:py-20">
      <div className="mx-auto max-w-lg text-center">
        <CheckCircle2 className="mx-auto text-secondary" size={64} aria-hidden="true" />
        <h1 className="mt-6 text-balance font-heading text-display-md font-semibold text-primary">
          Bienvenue ! Votre inscription est confirmée.
        </h1>
        <span className="mx-auto mt-5 block h-[2px] w-12 bg-secondary" aria-hidden="true" />
        <p className="mt-6 text-base leading-relaxed text-foreground/75 md:text-lg">
          Le chapitre&nbsp;1 du dernier livre vient d'être envoyé à votre
          adresse. Pensez à vérifier vos spams si vous ne le trouvez pas.
        </p>
        <div className="mt-10">
          <Button asChild variant="primary" size="md">
            <Link href="/mes-livres">Découvrir tous mes livres</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
