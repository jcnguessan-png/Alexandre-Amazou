'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { verifyTurnstile } from '@/lib/brevo';
import { sendEmail, emailLayout, emailButton, emailTable, escapeHtml } from '@/lib/email';
import { createToken, approvalUrl, daysFromNow, KIT_APPROVAL_DAYS } from '@/lib/kit';
import {
  subjectValues,
  subjectLabels,
  eventTypeValues,
  eventTypeLabels,
  audienceValues,
  logisticsValues,
  logisticsLabels,
  INVITATION_SUBJECT,
} from '@/lib/contact-options';

const optionalText = (max: number) => z.string().trim().max(max).optional().or(z.literal(''));

const schema = z
  .object({
    firstName: z.string().trim().min(2, 'Le prénom est requis.').max(80),
    lastName: z.string().trim().min(2, 'Le nom est requis.').max(80),
    email: z.string().trim().email('Adresse email invalide.'),
    phone: z.string().trim().max(40).optional().or(z.literal('')),
    subject: z.enum(subjectValues, { errorMap: () => ({ message: "Sélectionnez l'objet de votre message." }) }),
    message: z.string().trim().max(5000),
    // Invitation — validés seulement si subject === INVITATION_SUBJECT
    organisation: optionalText(160),
    role: optionalText(120),
    eventType: z.enum(eventTypeValues).optional().or(z.literal('')),
    eventTitle: optionalText(200),
    dateStart: optionalText(10),
    dateEnd: optionalText(10),
    city: optionalText(120),
    country: optionalText(120),
    venue: optionalText(200),
    audience: z.enum(audienceValues).optional().or(z.literal('')),
    website: optionalText(300),
    logistics: z.array(z.enum(logisticsValues)).default([]),
    consent: z
      .union([z.literal('on'), z.literal('true'), z.boolean()])
      .refine((v) => v === 'on' || v === 'true' || v === true, {
        message: 'Le consentement RGPD est obligatoire.',
      }),
    turnstileToken: z.string().optional(),
    // Honeypot
    hp: z.string().max(0).optional(),
  })
  .superRefine((d, ctx) => {
    const req = (key: keyof typeof d, message: string) => {
      if (!d[key] || (typeof d[key] === 'string' && !(d[key] as string).trim())) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: [key], message });
      }
    };
    if (d.subject !== INVITATION_SUBJECT) {
      if (d.message.length < 20) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['message'],
          message: 'Votre message est trop court (20 caractères minimum).',
        });
      }
      return;
    }
    req('organisation', "Indiquez le nom de l'église ou de l'organisation.");
    req('eventType', "Sélectionnez le type d'événement.");
    req('dateStart', 'Indiquez la date (ou la première date) souhaitée.');
    req('city', 'Indiquez la ville.');
    req('country', 'Indiquez le pays.');
    const iso = /^\d{4}-\d{2}-\d{2}$/;
    if (d.dateStart && !iso.test(d.dateStart)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['dateStart'], message: 'Date invalide.' });
    }
    if (d.dateEnd && (!iso.test(d.dateEnd) || (d.dateStart && d.dateEnd < d.dateStart))) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['dateEnd'],
        message: 'La date de fin doit être postérieure à la date de début.',
      });
    }
  });

type FormKeys = keyof z.input<typeof schema>;

export type ContactState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  fieldErrors?: Partial<Record<FormKeys, string>>;
};

function formatDate(iso?: string): string {
  if (!iso) return '';
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export async function contactAction(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const str = (key: string) => formData.get(key)?.toString() ?? '';
  const data = {
    firstName: str('firstName'),
    lastName: str('lastName'),
    email: str('email'),
    phone: str('phone'),
    subject: str('subject'),
    message: str('message'),
    organisation: str('organisation'),
    role: str('role'),
    eventType: str('eventType'),
    eventTitle: str('eventTitle'),
    dateStart: str('dateStart'),
    dateEnd: str('dateEnd'),
    city: str('city'),
    country: str('country'),
    venue: str('venue'),
    audience: str('audience'),
    website: str('orgWebsite'),
    logistics: formData.getAll('logistics').map(String),
    consent: formData.get('consent') ?? false,
    turnstileToken: str('cf-turnstile-response'),
    hp: str('website'),
  };

  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    const fieldErrors: ContactState['fieldErrors'] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as FormKeys;
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      status: 'error',
      message: 'Veuillez corriger les erreurs ci-dessous.',
      fieldErrors,
    };
  }

  const d = parsed.data;

  // Honeypot triggered → silent success
  if (d.hp && d.hp.length > 0) {
    redirect('/me-contacter/merci');
  }

  const ip = headers().get('x-forwarded-for')?.split(',')[0]?.trim();

  if (d.turnstileToken) {
    const ok = await verifyTurnstile(d.turnstileToken, ip);
    if (!ok) {
      return { status: 'error', message: 'Vérification anti-spam échouée. Veuillez réessayer.' };
    }
  }

  const fullName = `${d.firstName} ${d.lastName}`;
  const isInvitation = d.subject === INVITATION_SUBJECT;
  const dates = d.dateEnd && d.dateEnd !== d.dateStart
    ? `du ${formatDate(d.dateStart)} au ${formatDate(d.dateEnd)}`
    : formatDate(d.dateStart);
  const place = [d.venue, d.city, d.country].filter(Boolean).join(', ');

  const rows: [string, string | undefined][] = [
    ['Nom', fullName],
    ['Email', d.email],
    ['Téléphone', d.phone],
    ['Objet', subjectLabels[d.subject]],
  ];
  if (isInvitation) {
    rows.push(
      ['Église / organisation', d.organisation],
      ['Fonction', d.role],
      ['Type d’événement', d.eventType ? eventTypeLabels[d.eventType] : ''],
      ['Thème / intitulé', d.eventTitle],
      ['Date(s)', dates],
      ['Lieu', place],
      ['Participants attendus', d.audience],
      ['Site / réseaux', d.website],
      ['Prise en charge proposée', d.logistics.map((l) => logisticsLabels[l]).join(', ')],
    );
  }
  rows.push(['Message', d.message]);

  let body = emailTable(rows);
  // Le kit de communication est proposé aux organisateurs (invitation) et aux médias.
  if (isInvitation || d.subject === 'demande-presse') {
    let token: string | null = null;
    try {
      token = createToken({
        k: 'approve',
        email: d.email,
        name: fullName,
        organisation: d.organisation ?? '',
        eventType: d.eventType ? eventTypeLabels[d.eventType] : isInvitation ? '' : 'Demande presse / média',
        dates,
        place,
        exp: daysFromNow(KIT_APPROVAL_DAYS),
      });
    } catch (err) {
      console.error('[contact]', err instanceof Error ? err.message : err);
    }
    body += token
      ? `<p style="margin-top:24px">Après vérification de la demande, envoyez au demandeur son accès personnel au <strong>kit de communication</strong> (biographies, photos, vidéo) :</p>${emailButton(approvalUrl(token), 'Valider et envoyer le kit')}<p style="font-size:13px;color:#6e6a7a">Ce bouton ouvre une page de confirmation ; rien n’est envoyé tant que vous n’avez pas confirmé. Lien valable ${KIT_APPROVAL_DAYS} jours.</p>`
      : `<p style="color:#9b1c1c">Kit de communication : KIT_SIGNING_SECRET n’est pas configuré, le lien de validation n’a pas pu être généré.</p>`;
  }

  const notify = await sendEmail({
    to: { email: process.env.CONTACT_EMAIL_TO || 'contact@alexandreamazou.com' },
    replyTo: { email: d.email, name: fullName },
    subject: isInvitation
      ? `Invitation — ${d.organisation} (${d.city}) — ${formatDate(d.dateStart)}`
      : `[Site] ${subjectLabels[d.subject]} — ${fullName}`,
    html: emailLayout(
      isInvitation ? 'Nouvelle demande d’invitation' : 'Nouveau message depuis le site',
      body,
    ),
  });

  if (!notify.ok) {
    return {
      status: 'error',
      message:
        'Votre message n’a pas pu être transmis pour le moment. Merci de réessayer plus tard ou d’écrire directement à contact@alexandreamazou.com.',
    };
  }

  // Accusé de réception (non bloquant)
  await sendEmail({
    to: { email: d.email, name: fullName },
    subject: isInvitation
      ? 'Votre demande d’invitation a bien été reçue'
      : 'Votre message a bien été reçu',
    html: emailLayout(
      isInvitation ? 'Demande d’invitation reçue' : 'Message reçu',
      `<p>Bonjour ${escapeHtml(d.firstName)},</p><p>${
        isInvitation
          ? `Nous avons bien reçu votre demande d’invitation du Pasteur Alexandre AMAZOU pour <strong>${escapeHtml(d.organisation ?? '')}</strong> (${escapeHtml(dates)}). Le secrétariat ministériel l’étudie et revient vers vous sous 48 à 72 h ouvrées. Une fois la demande validée, vous recevrez par email votre accès au kit de communication officiel (biographies, photos et vidéo).`
          : 'Le secrétariat ministériel a bien reçu votre message et vous répondra sous 48 à 72 h ouvrées.'
      }</p><p>Que la grâce du Seigneur soit avec vous.</p>`,
    ),
  });

  redirect(isInvitation ? '/me-contacter/merci?invitation=1' : '/me-contacter/merci');
}
