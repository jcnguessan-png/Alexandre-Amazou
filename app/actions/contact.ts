'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { verifyTurnstile } from '@/lib/brevo';

const subjectValues = [
  'invitation-conference',
  'rdv-pastoral',
  'demande-presse',
  'partenariat',
  'question-doctrinale',
  'temoignage',
  'autre',
] as const;

const schema = z.object({
  firstName: z.string().trim().min(2, 'Le prénom est requis.').max(80),
  lastName: z.string().trim().min(2, 'Le nom est requis.').max(80),
  email: z.string().trim().email('Adresse email invalide.'),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  subject: z.enum(subjectValues, { errorMap: () => ({ message: "Sélectionnez l'objet de votre message." }) }),
  message: z.string().trim().min(20, 'Votre message est trop court (20 caractères minimum).').max(5000),
  consent: z
    .union([z.literal('on'), z.literal('true'), z.boolean()])
    .refine((v) => v === 'on' || v === 'true' || v === true, {
      message: 'Le consentement RGPD est obligatoire.',
    }),
  turnstileToken: z.string().optional(),
  // Honeypot
  website: z.string().max(0).optional(),
});

export type ContactState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  fieldErrors?: Partial<Record<keyof z.infer<typeof schema>, string>>;
};

export async function contactAction(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const data = {
    firstName: formData.get('firstName')?.toString() ?? '',
    lastName: formData.get('lastName')?.toString() ?? '',
    email: formData.get('email')?.toString() ?? '',
    phone: formData.get('phone')?.toString() ?? '',
    subject: formData.get('subject')?.toString() ?? '',
    message: formData.get('message')?.toString() ?? '',
    consent: formData.get('consent') ?? false,
    turnstileToken: formData.get('cf-turnstile-response')?.toString() ?? '',
    website: formData.get('website')?.toString() ?? '',
  };

  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    const fieldErrors: ContactState['fieldErrors'] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof z.infer<typeof schema>;
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      status: 'error',
      message: 'Veuillez corriger les erreurs ci-dessous.',
      fieldErrors,
    };
  }

  // Honeypot triggered → silent success
  if (parsed.data.website && parsed.data.website.length > 0) {
    redirect('/me-contacter/merci');
  }

  const ip = headers().get('x-forwarded-for')?.split(',')[0]?.trim();

  if (parsed.data.turnstileToken) {
    const ok = await verifyTurnstile(parsed.data.turnstileToken, ip);
    if (!ok) {
      return { status: 'error', message: 'Vérification anti-spam échouée. Veuillez réessayer.' };
    }
  }

  // TODO : intégrer un service d'envoi (Brevo SMTP / Resend / nodemailer)
  // Pour la mise en production, remplacer ce log par un véritable transport.
  console.info('[contact] new message', {
    from: parsed.data.email,
    subject: parsed.data.subject,
    name: `${parsed.data.firstName} ${parsed.data.lastName}`,
  });

  redirect('/me-contacter/merci');
}
