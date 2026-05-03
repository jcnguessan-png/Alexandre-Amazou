'use client';

import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import { Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import { subscribeAction, type NewsletterState } from '@/app/actions/newsletter';
import { Button } from '@/components/ui/Button';

const initial: NewsletterState = { status: 'idle' };

export function NewsletterBanner({ source = 'home' }: { source?: string }) {
  const [state, formAction] = useFormState(subscribeAction, initial);

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="bg-primary text-primary-foreground"
    >
      <div className="container py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <p className="font-quote text-sm uppercase tracking-[0.25em] text-secondary">
              Newsletter
            </p>
            <h2
              id="newsletter-heading"
              className="mt-3 text-balance font-heading text-display-md font-semibold leading-tight"
            >
              Recevez mes réflexions hebdomadaires
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/80 md:text-lg">
              En vous abonnant, vous recevez gratuitement le{' '}
              <strong className="text-secondary">chapitre&nbsp;1 de mon
              dernier livre</strong> — « La réalité du monde des esprits » —
              ainsi qu'une méditation chaque semaine.
            </p>
          </div>

          <form
            action={formAction}
            className="rounded-xl bg-primary-foreground/[0.03] p-6 ring-1 ring-primary-foreground/10 backdrop-blur md:p-8"
            noValidate
          >
            <input type="hidden" name="source" value={source} />

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="newsletter-firstname" className="block text-sm font-medium text-primary-foreground/80">
                  Prénom
                </label>
                <input
                  id="newsletter-firstname"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  className="mt-1 w-full rounded-md border-0 bg-primary-foreground/10 px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/40 focus:bg-primary-foreground/15 focus:outline-none focus:ring-2 focus:ring-secondary"
                  placeholder="Votre prénom"
                />
              </div>
              <div>
                <label htmlFor="newsletter-email" className="block text-sm font-medium text-primary-foreground/80">
                  Adresse email <span aria-hidden="true" className="text-secondary">*</span>
                  <span className="sr-only"> (obligatoire)</span>
                </label>
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="mt-1 w-full rounded-md border-0 bg-primary-foreground/10 px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/40 focus:bg-primary-foreground/15 focus:outline-none focus:ring-2 focus:ring-secondary"
                  placeholder="vous@exemple.com"
                />
              </div>
            </div>

            <div className="mt-5 flex items-start gap-3">
              <input
                id="newsletter-consent"
                name="consent"
                type="checkbox"
                required
                className="mt-1 h-4 w-4 cursor-pointer rounded border-primary-foreground/30 bg-transparent text-secondary focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-primary"
              />
              <label
                htmlFor="newsletter-consent"
                className="cursor-pointer text-sm leading-relaxed text-primary-foreground/75"
              >
                J'accepte de recevoir la newsletter du Pasteur Alexandre AMAZOU
                et j'ai pris connaissance de la{' '}
                <Link
                  href="/politique-de-confidentialite"
                  className="text-secondary underline-offset-2 hover:underline"
                >
                  politique de confidentialité
                </Link>
                . Je peux me désinscrire à tout moment via le lien présent en
                bas de chaque email.
              </label>
            </div>

            <div className="mt-6">
              <SubmitButton />
            </div>

            {state.status === 'success' ? (
              <p className="mt-4 flex items-start gap-2 rounded-md bg-secondary/10 p-3 text-sm text-secondary">
                <CheckCircle2 size={18} aria-hidden="true" className="mt-0.5 flex-shrink-0" />
                <span>{state.message}</span>
              </p>
            ) : null}
            {state.status === 'error' ? (
              <p
                role="alert"
                className="mt-4 flex items-start gap-2 rounded-md bg-red-500/10 p-3 text-sm text-red-200"
              >
                <AlertCircle size={18} aria-hidden="true" className="mt-0.5 flex-shrink-0" />
                <span>{state.message}</span>
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="primary" size="md" disabled={pending} className="w-full md:w-auto">
      <Mail size={16} aria-hidden="true" />
      {pending ? 'Envoi en cours…' : 'Recevoir le chapitre 1 gratuit'}
    </Button>
  );
}
