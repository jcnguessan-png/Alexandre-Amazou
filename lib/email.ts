/**
 * Envoi d'emails transactionnels via l'API Resend.
 * Docs : https://resend.com/docs/api-reference/emails/send-email
 *
 * Prérequis : RESEND_API_KEY renseignée et le domaine de CONTACT_EMAIL_FROM
 * (alexandreamazou.com) vérifié dans Resend > Domains. Sans clé, en développement,
 * l'email est simplement affiché dans la console pour pouvoir tester le parcours.
 */

const RESEND_API = 'https://api.resend.com/emails';

type Recipient = { email: string; name?: string };

export type EmailPayload = {
  to: Recipient | Recipient[];
  subject: string;
  html: string;
  replyTo?: { email: string; name?: string };
};

/**
 * Destinataires des demandes reçues par le site : CONTACT_EMAIL_TO (défaut contact@)
 * + CONTACT_EMAIL_EXTRA_TO, liste séparée par des virgules (adresses gardées hors du
 * dépôt public).
 */
export function teamRecipients(): Recipient[] {
  const list = [process.env.CONTACT_EMAIL_TO || 'contact@alexandreamazou.com', process.env.CONTACT_EMAIL_EXTRA_TO ?? '']
    .join(',')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return Array.from(new Set(list)).map((email) => ({ email }));
}

/** « Nom <email> » — format d'adresse attendu par Resend. */
function formatAddress({ email, name }: { email: string; name?: string }): string {
  return name ? `${name.replace(/["<>]/g, '')} <${email}>` : email;
}

export async function sendEmail(payload: EmailPayload): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_EMAIL_FROM || 'no-reply@alexandreamazou.com';

  if (!apiKey) {
    if (process.env.NODE_ENV !== 'production') {
      console.info('[email] RESEND_API_KEY absente — email non envoyé (dev) :', {
        to: payload.to,
        subject: payload.subject,
        text: htmlToText(payload.html),
      });
      return { ok: true };
    }
    console.error('[email] RESEND_API_KEY manquante — impossible d’envoyer « %s »', payload.subject);
    return { ok: false, error: 'RESEND_API_KEY manquante' };
  }

  try {
    const res = await fetch(RESEND_API, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: formatAddress({ email: fromEmail, name: 'Pasteur Alexandre AMAZOU' }),
        to: (Array.isArray(payload.to) ? payload.to : [payload.to]).map(formatAddress),
        reply_to: payload.replyTo ? formatAddress(payload.replyTo) : undefined,
        subject: payload.subject,
        html: payload.html,
      }),
    });
    if (res.ok) return { ok: true };
    const data = await res.json().catch(() => ({}));
    console.error('[email] Resend %s : %s', res.status, data?.message ?? '');
    return { ok: false, error: `Erreur Resend ${res.status}` };
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
