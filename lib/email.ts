/**
 * Envoi d'emails transactionnels via l'API Brevo (même clé que la newsletter).
 * Docs : https://developers.brevo.com/reference/sendtransacemail
 *
 * Prérequis : BREVO_API_KEY renseignée et l'expéditeur CONTACT_EMAIL_FROM validé
 * dans Brevo (Expéditeurs & domaines). Sans clé, en développement, l'email est
 * simplement affiché dans la console pour pouvoir tester le parcours.
 */

const BREVO_API = 'https://api.brevo.com/v3';

export type EmailPayload = {
  to: { email: string; name?: string };
  subject: string;
  html: string;
  replyTo?: { email: string; name?: string };
};

export async function sendEmail(payload: EmailPayload): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.BREVO_API_KEY;
  const fromEmail = process.env.CONTACT_EMAIL_FROM ?? 'no-reply@alexandreamazou.com';

  if (!apiKey) {
    if (process.env.NODE_ENV !== 'production') {
      console.info('[email] BREVO_API_KEY absente — email non envoyé (dev) :', {
        to: payload.to.email,
        subject: payload.subject,
        text: htmlToText(payload.html),
      });
      return { ok: true };
    }
    console.error('[email] BREVO_API_KEY manquante — impossible d’envoyer « %s »', payload.subject);
    return { ok: false, error: 'BREVO_API_KEY manquante' };
  }

  try {
    const res = await fetch(`${BREVO_API}/smtp/email`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        sender: { email: fromEmail, name: 'Pasteur Alexandre AMAZOU' },
        to: [payload.to],
        replyTo: payload.replyTo,
        subject: payload.subject,
        htmlContent: payload.html,
      }),
    });
    if (res.ok) return { ok: true };
    const data = await res.json().catch(() => ({}));
    console.error('[email] Brevo %s : %s', res.status, data?.message ?? '');
    return { ok: false, error: `Erreur Brevo ${res.status}` };
  } catch (err) {
    console.error('[email] erreur réseau', err);
    return { ok: false, error: 'Erreur réseau' };
  }
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function htmlToText(html: string): string {
  return html
    .replace(/<a [^>]*href="([^"]+)"[^>]*>([^<]*)<\/a>/g, '$2 ($1)')
    .replace(/<(br|\/p|\/tr|\/h\d)>/g, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/** Gabarit sobre, compatible clients mail (tableaux + styles inline). */
export function emailLayout(title: string, body: string): string {
  return `<!doctype html><html lang="fr"><body style="margin:0;background:#f4eedf;font-family:Georgia,serif;color:#12122b">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4eedf;padding:32px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-top:4px solid #c9a84c">
<tr><td style="padding:32px 32px 8px"><p style="margin:0;font:600 11px Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#9a7b2e">Pasteur Alexandre AMAZOU</p>
<h1 style="margin:10px 0 0;font-size:24px;line-height:1.25;color:#12122b">${title}</h1></td></tr>
<tr><td style="padding:16px 32px 32px;font-size:16px;line-height:1.6">${body}</td></tr>
</table></td></tr></table></body></html>`;
}

export function emailButton(href: string, label: string): string {
  return `<p style="margin:28px 0"><a href="${escapeHtml(href)}" style="display:inline-block;background:#c9a84c;color:#12122b;font:600 15px Arial,sans-serif;text-decoration:none;padding:14px 26px">${escapeHtml(label)}</a></p>`;
}

export function emailTable(rows: [string, string | undefined][]): string {
  const cells = rows
    .filter(([, v]) => v && v.trim())
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px 8px 0;vertical-align:top;font:600 13px Arial,sans-serif;color:#6e6a7a;white-space:nowrap">${escapeHtml(k)}</td><td style="padding:8px 0;vertical-align:top">${escapeHtml(v as string).replace(/\n/g, '<br>')}</td></tr>`,
    )
    .join('');
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-top:1px solid #e2dbca;border-bottom:1px solid #e2dbca;margin:8px 0">${cells}</table>`;
}
