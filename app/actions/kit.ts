'use server';

import { sendEmail, emailLayout, emailButton, escapeHtml } from '@/lib/email';
import {
  verifyToken,
  createToken,
  accessUrl,
  daysFromNow,
  KIT_ACCESS_DAYS,
} from '@/lib/kit';

export type KitApprovalState =
  | { status: 'idle' }
  | { status: 'error'; message: string }
  | { status: 'sent'; link: string; emailed: boolean; email: string };

/**
 * Validation d'une demande d'invitation par le secrétariat : génère le lien d'accès
 * personnel au kit et l'envoie par email au demandeur. Le lien est aussi renvoyé à
 * l'écran pour pouvoir le transmettre autrement (WhatsApp) si l'email échoue.
 */
export async function approveKitAction(
  _prev: KitApprovalState,
  formData: FormData,
): Promise<KitApprovalState> {
  const request = verifyToken(formData.get('t')?.toString(), 'approve');
  if (!request) {
    return { status: 'error', message: 'Lien de validation invalide ou expiré.' };
  }

  const exp = daysFromNow(KIT_ACCESS_DAYS);
  const link = accessUrl(
    createToken({
      k: 'access',
      email: request.email,
      name: request.name,
      organisation: request.organisation,
      exp,
    }),
  );
  const until = new Date(exp).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const sent = await sendEmail({
    to: { email: request.email, name: request.name },
    replyTo: { email: process.env.CONTACT_EMAIL_TO ?? 'contact@alexandreamazou.com' },
    subject: 'Votre accès au kit de communication du Pasteur Alexandre AMAZOU',
    html: emailLayout(
      'Votre kit de communication',
      `<p>Bonjour ${escapeHtml(request.name)},</p>
<p>Merci pour votre invitation${request.organisation ? ` au nom de <strong>${escapeHtml(request.organisation)}</strong>` : ''}. Pour préparer la communication de votre événement, vous trouverez dans l’espace ci-dessous les éléments officiels : biographie courte et longue, photos et vidéo de présentation.</p>
${emailButton(link, 'Accéder au kit de communication')}
<p style="font-size:14px;color:#6e6a7a">Ce lien est personnel et valable jusqu’au ${escapeHtml(until)}. Merci de ne pas le diffuser publiquement. Les éléments sont réservés à la promotion de votre événement.</p>
<p>Que la grâce du Seigneur soit avec vous.<br>Le secrétariat ministériel</p>`,
    ),
  });

  return { status: 'sent', link, emailed: sent.ok, email: request.email };
}
