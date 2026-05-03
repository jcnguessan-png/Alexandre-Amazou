'use server';

import { z } from 'zod';
import { headers } from 'next/headers';
import { subscribeToNewsletter, verifyTurnstile } from '@/lib/brevo';

const schema = z.object({
  email: z.string().trim().email("L'adresse email semble invalide."),
  firstName: z.string().trim().max(80).optional(),
  consent: z
    .union([z.literal('on'), z.literal('true'), z.boolean()])
    .refine((v) => v === 'on' || v === 'true' || v === true, {
      message: 'Le consentement RGPD est obligatoire.',
    }),
  source: z.string().trim().max(80).optional(),
  turnstileToken: z.string().optional(),
});

export type NewsletterState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  alreadySubscribed?: boolean;
};

export async function subscribeAction(
  _prev: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  const parsed = schema.safeParse({
    email: formData.get('email'),
    firstName: formData.get('firstName') ?? undefined,
    consent: formData.get('consent') ?? false,
    source: formData.get('source') ?? undefined,
    turnstileToken: formData.get('cf-turnstile-response') ?? undefined,
  });

  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? 'Formulaire invalide.';
    return { status: 'error', message: first };
  }

  const data = parsed.data;
  const ip = headers().get('x-forwarded-for')?.split(',')[0]?.trim();

  if (data.turnstileToken) {
    const ok = await verifyTurnstile(data.turnstileToken, ip);
    if (!ok) return { status: 'error', message: 'Vérification anti-spam échouée. Réessayez.' };
  }

  const result = await subscribeToNewsletter({
    email: data.email,
    firstName: data.firstName,
    attributes: { SOURCE: data.source ?? 'site-web' },
    doubleOptIn: true,
  });

  if (!result.ok) {
    return { status: 'error', message: result.error };
  }

  return {
    status: 'success',
    alreadySubscribed: result.alreadySubscribed,
    message: result.alreadySubscribed
      ? 'Vous êtes déjà inscrit·e à la newsletter — merci !'
      : 'Merci ! Un email de confirmation vient d\'être envoyé. Cliquez sur le lien pour finaliser votre inscription.',
  };
}
