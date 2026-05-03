'use client';

import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import { Send, AlertCircle } from 'lucide-react';
import { contactAction, type ContactState } from '@/app/actions/contact';
import { Button } from '@/components/ui/Button';
import { TurnstileWidget } from '@/components/ui/TurnstileWidget';
import { cn } from '@/lib/utils';

const subjects = [
  { value: 'invitation-conference', label: 'Invitation en conférence' },
  { value: 'rdv-pastoral', label: 'Rendez-vous pastoral' },
  { value: 'demande-presse', label: 'Demande presse / média' },
  { value: 'partenariat', label: 'Partenariat' },
  { value: 'question-doctrinale', label: 'Question doctrinale' },
  { value: 'temoignage', label: 'Témoignage' },
  { value: 'autre', label: 'Autre' },
];

const initial: ContactState = { status: 'idle' };

export function ContactForm() {
  const [state, formAction] = useFormState(contactAction, initial);

  return (
    <form
      action={formAction}
      className="space-y-6"
      noValidate
      aria-describedby={state.status === 'error' ? 'contact-error' : undefined}
    >
      {/* Honeypot — caché aux humains, visible aux bots */}
      <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label>
          Site web (laisser vide)
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Field
          id="firstName"
          name="firstName"
          label="Prénom"
          required
          autoComplete="given-name"
          error={state.fieldErrors?.firstName}
        />
        <Field
          id="lastName"
          name="lastName"
          label="Nom"
          required
          autoComplete="family-name"
          error={state.fieldErrors?.lastName}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Field
          id="email"
          name="email"
          type="email"
          label="Adresse email"
          required
          autoComplete="email"
          error={state.fieldErrors?.email}
        />
        <Field
          id="phone"
          name="phone"
          type="tel"
          label="Téléphone (optionnel)"
          autoComplete="tel"
          error={state.fieldErrors?.phone}
        />
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-foreground"
        >
          Objet de votre message <span aria-hidden="true" className="text-secondary">*</span>
          <span className="sr-only"> (obligatoire)</span>
        </label>
        <select
          id="subject"
          name="subject"
          required
          defaultValue=""
          aria-invalid={state.fieldErrors?.subject ? 'true' : undefined}
          aria-describedby={state.fieldErrors?.subject ? 'subject-error' : undefined}
          className={cn(
            'mt-2 w-full rounded-md border bg-background px-4 py-3 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-secondary',
            state.fieldErrors?.subject ? 'border-red-500' : 'border-border',
          )}
        >
          <option value="" disabled>
            Sélectionnez une raison…
          </option>
          {subjects.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        {state.fieldErrors?.subject ? (
          <p id="subject-error" className="mt-2 text-sm text-red-600">
            {state.fieldErrors.subject}
          </p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-foreground"
        >
          Votre message <span aria-hidden="true" className="text-secondary">*</span>
          <span className="sr-only"> (obligatoire)</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          minLength={20}
          aria-invalid={state.fieldErrors?.message ? 'true' : undefined}
          aria-describedby={state.fieldErrors?.message ? 'message-error' : undefined}
          className={cn(
            'mt-2 w-full rounded-md border bg-background px-4 py-3 text-base text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-secondary',
            state.fieldErrors?.message ? 'border-red-500' : 'border-border',
          )}
          placeholder="Décrivez votre demande en quelques lignes…"
        />
        {state.fieldErrors?.message ? (
          <p id="message-error" className="mt-2 text-sm text-red-600">
            {state.fieldErrors.message}
          </p>
        ) : null}
      </div>

      <fieldset>
        <legend className="sr-only">Consentement RGPD</legend>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            required
            aria-invalid={state.fieldErrors?.consent ? 'true' : undefined}
            aria-describedby={state.fieldErrors?.consent ? 'consent-error' : undefined}
            className="mt-1 h-4 w-4 cursor-pointer rounded border-border text-secondary focus:ring-2 focus:ring-secondary"
          />
          <span className="text-sm leading-relaxed text-foreground/80">
            J'accepte que mes données personnelles (nom, email, téléphone) soient
            traitées dans le seul but de répondre à ma demande, conformément à la{' '}
            <Link
              href="/politique-de-confidentialite"
              className="font-medium text-primary underline-offset-2 hover:underline"
            >
              politique de confidentialité
            </Link>
            . Je peux à tout moment exercer mes droits d'accès, rectification et
            suppression. <span aria-hidden="true" className="text-secondary">*</span>
          </span>
        </label>
        {state.fieldErrors?.consent ? (
          <p id="consent-error" className="mt-2 text-sm text-red-600">
            {state.fieldErrors.consent}
          </p>
        ) : null}
      </fieldset>

      <TurnstileWidget />

      {state.status === 'error' ? (
        <p
          id="contact-error"
          role="alert"
          className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        >
          <AlertCircle size={18} aria-hidden="true" className="mt-0.5 flex-shrink-0" />
          <span>{state.message}</span>
        </p>
      ) : null}

      <SubmitButton />
    </form>
  );
}

function Field({
  id,
  name,
  label,
  type = 'text',
  required,
  autoComplete,
  error,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
        {required ? (
          <>
            {' '}
            <span aria-hidden="true" className="text-secondary">*</span>
            <span className="sr-only"> (obligatoire)</span>
          </>
        ) : null}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          'mt-2 w-full rounded-md border bg-background px-4 py-3 text-base text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-secondary',
          error ? 'border-red-500' : 'border-border',
        )}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="primary" size="lg" disabled={pending}>
      <Send size={16} aria-hidden="true" />
      {pending ? 'Envoi en cours…' : 'Envoyer mon message'}
    </Button>
  );
}
