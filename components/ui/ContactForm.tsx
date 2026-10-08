'use client';

import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import { Send, AlertCircle } from 'lucide-react';
import { contactAction, type ContactState } from '@/app/actions/contact';
import { Button } from '@/components/ui/Button';
import { TurnstileWidget } from '@/components/ui/TurnstileWidget';
import {
  INVITATION_SUBJECT,
  subjectValues,
  subjectLabels,
  eventTypeValues,
  eventTypeLabels,
  audienceValues,
  logisticsValues,
  logisticsLabels,
} from '@/lib/contact-options';
import { cn } from '@/lib/utils';

const subjects = subjectValues.map((value) => ({ value, label: subjectLabels[value] }));

const initial: ContactState = { status: 'idle' };

const controlClass = (error?: string) =>
  cn(
    'mt-2 w-full rounded-md border bg-background px-4 py-3 text-base text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-secondary',
    error ? 'border-red-500' : 'border-border',
  );

export function ContactForm({ defaultSubject = '' }: { defaultSubject?: string }) {
  const [state, formAction] = useFormState(contactAction, initial);
  const [subject, setSubject] = useState(defaultSubject);
  const isInvitation = subject === INVITATION_SUBJECT;
  const errors = state.fieldErrors ?? {};

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
          error={errors.firstName}
        />
        <Field
          id="lastName"
          name="lastName"
          label="Nom"
          required
          autoComplete="family-name"
          error={errors.lastName}
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
          error={errors.email}
        />
        <Field
          id="phone"
          name="phone"
          type="tel"
          label={isInvitation ? 'Téléphone / WhatsApp' : 'Téléphone (optionnel)'}
          autoComplete="tel"
          error={errors.phone}
        />
      </div>

      <SelectField
        id="subject"
        name="subject"
        label="Objet de votre message"
        required
        placeholder="Sélectionnez une raison…"
        value={subject}
        onChange={setSubject}
        options={subjects}
        error={errors.subject}
      />

      {isInvitation ? (
        <fieldset className="space-y-6 rounded-md border border-secondary/40 bg-secondary/5 p-5">
          <legend className="px-2 text-sm font-semibold uppercase tracking-wider text-secondary">
            Votre invitation
          </legend>
          <p className="text-sm leading-relaxed text-foreground/70">
            Ces informations permettent au secrétariat d’étudier la demande avec l’agenda du
            Pasteur. Une fois validée, vous recevrez par email l’accès au{' '}
            <strong>kit de communication officiel</strong> (biographies, photos, vidéo) pour
            préparer vos visuels.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <Field
              id="organisation"
              name="organisation"
              label="Église / organisation"
              required
              autoComplete="organization"
              error={errors.organisation}
            />
            <Field
              id="role"
              name="role"
              label="Votre fonction"
              placeholder="Ex. Pasteur principal, coordinateur…"
              autoComplete="organization-title"
              error={errors.role}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <SelectField
              id="eventType"
              name="eventType"
              label="Type d’événement"
              required
              placeholder="Sélectionnez…"
              options={eventTypeValues.map((v) => ({ value: v, label: eventTypeLabels[v] }))}
              error={errors.eventType}
            />
            <Field
              id="eventTitle"
              name="eventTitle"
              label="Thème / intitulé"
              error={errors.eventTitle}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Field
              id="dateStart"
              name="dateStart"
              type="date"
              label="Date (ou date de début)"
              required
              error={errors.dateStart}
            />
            <Field
              id="dateEnd"
              name="dateEnd"
              type="date"
              label="Date de fin (si plusieurs jours)"
              error={errors.dateEnd}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Field
              id="city"
              name="city"
              label="Ville"
              required
              autoComplete="address-level2"
              error={errors.city}
            />
            <Field
              id="country"
              name="country"
              label="Pays"
              required
              autoComplete="country-name"
              error={errors.country}
            />
          </div>

          <Field
            id="venue"
            name="venue"
            label="Lieu de l’événement"
            placeholder="Nom du lieu, adresse"
            error={errors.venue}
          />

          <div className="grid gap-6 md:grid-cols-2">
            <SelectField
              id="audience"
              name="audience"
              label="Participants attendus"
              placeholder="Estimation…"
              options={audienceValues.map((v) => ({ value: v, label: v }))}
              error={errors.audience}
            />
            <Field
              id="orgWebsite"
              name="orgWebsite"
              type="url"
              label="Site web ou page de l’église"
              placeholder="https://"
              error={errors.website}
            />
          </div>

          <fieldset>
            <legend className="block text-sm font-medium text-foreground">
              Prise en charge proposée
            </legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {logisticsValues.map((v) => (
                <label key={v} className="flex cursor-pointer items-center gap-3 text-sm text-foreground/80">
                  <input
                    type="checkbox"
                    name="logistics"
                    value={v}
                    className="h-4 w-4 cursor-pointer rounded border-border text-secondary focus:ring-2 focus:ring-secondary"
                  />
                  {logisticsLabels[v]}
                </label>
              ))}
            </div>
          </fieldset>
        </fieldset>
      ) : null}

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-foreground"
        >
          {isInvitation ? 'Informations complémentaires' : 'Votre message'}
          {isInvitation ? null : (
            <>
              {' '}
              <span aria-hidden="true" className="text-secondary">*</span>
              <span className="sr-only"> (obligatoire)</span>
            </>
          )}
        </label>
        <textarea
          id="message"
          name="message"
          required={!isInvitation}
          rows={isInvitation ? 4 : 6}
          minLength={isInvitation ? undefined : 20}
          aria-invalid={errors.message ? 'true' : undefined}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={controlClass(errors.message)}
          placeholder={
            isInvitation
              ? 'Programme, nombre d’interventions souhaitées, horaires, contexte de l’église…'
              : 'Décrivez votre demande en quelques lignes…'
          }
        />
        {errors.message ? (
          <p id="message-error" className="mt-2 text-sm text-red-600">
            {errors.message}
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
            aria-invalid={errors.consent ? 'true' : undefined}
            aria-describedby={errors.consent ? 'consent-error' : undefined}
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
        {errors.consent ? (
          <p id="consent-error" className="mt-2 text-sm text-red-600">
            {errors.consent}
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

      <SubmitButton label={isInvitation ? 'Envoyer ma demande d’invitation' : 'Envoyer mon message'} />
    </form>
  );
}

function RequiredMark() {
  return (
    <>
      {' '}
      <span aria-hidden="true" className="text-secondary">*</span>
      <span className="sr-only"> (obligatoire)</span>
    </>
  );
}

function Field({
  id,
  name,
  label,
  type = 'text',
  required,
  autoComplete,
  placeholder,
  error,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
        {required ? <RequiredMark /> : null}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={controlClass(error)}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SelectField({
  id,
  name,
  label,
  required,
  placeholder,
  options,
  value,
  onChange,
  error,
}: {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  placeholder: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
}) {
  const controlled = value !== undefined;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
        {required ? <RequiredMark /> : null}
      </label>
      <select
        id={id}
        name={name}
        required={required}
        {...(controlled
          ? { value, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => onChange?.(e.target.value) }
          : { defaultValue: '' })}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={controlClass(error)}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="primary" size="lg" disabled={pending}>
      <Send size={16} aria-hidden="true" />
      {pending ? 'Envoi en cours…' : label}
    </Button>
  );
}
