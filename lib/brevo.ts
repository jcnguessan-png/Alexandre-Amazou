/**
 * Client Brevo (ex-Sendinblue) — newsletter avec double opt-in.
 * Docs : https://developers.brevo.com/reference/createcontact
 */

const BREVO_API = 'https://api.brevo.com/v3';

export type SubscribeResult =
  | { ok: true; alreadySubscribed: boolean }
  | { ok: false; error: string };

export type SubscribePayload = {
  email: string;
  firstName?: string;
  attributes?: Record<string, string | number | boolean>;
  /** Si true, déclenche un email de double opt-in via un template Brevo dédié */
  doubleOptIn?: boolean;
  doubleOptInTemplateId?: number;
  redirectionUrl?: string;
};

function getCredentials(): { apiKey: string; listId: number } {
  const apiKey = process.env.BREVO_API_KEY;
  const listId = process.env.BREVO_LIST_ID;
  if (!apiKey) throw new Error('BREVO_API_KEY manquante');
  if (!listId) throw new Error('BREVO_LIST_ID manquant');
  return { apiKey, listId: parseInt(listId, 10) };
}

export async function subscribeToNewsletter(payload: SubscribePayload): Promise<SubscribeResult> {
  let apiKey: string;
  let listId: number;
  try {
    ({ apiKey, listId } = getCredentials());
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Configuration Brevo invalide' };
  }

  const useDoubleOptIn = payload.doubleOptIn !== false; // default true
  const endpoint = useDoubleOptIn ? '/contacts/doubleOptinConfirmation' : '/contacts';

  const body: Record<string, unknown> = useDoubleOptIn
    ? {
        email: payload.email,
        includeListIds: [listId],
        templateId: payload.doubleOptInTemplateId ?? 1,
        redirectionUrl: payload.redirectionUrl ?? `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/newsletter/confirme`,
        attributes: {
          PRENOM: payload.firstName,
          ...payload.attributes,
        },
      }
    : {
        email: payload.email,
        listIds: [listId],
        attributes: {
          PRENOM: payload.firstName,
          ...payload.attributes,
        },
        updateEnabled: true,
      };

  try {
    const res = await fetch(`${BREVO_API}${endpoint}`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      return { ok: true, alreadySubscribed: false };
    }

    if (res.status === 400) {
      const data = await res.json().catch(() => ({}));
      // Brevo renvoie { code: 'duplicate_parameter' } si déjà inscrit
      if (data?.code === 'duplicate_parameter') {
        return { ok: true, alreadySubscribed: true };
      }
      return { ok: false, error: data?.message ?? 'Adresse invalide' };
    }

    return { ok: false, error: `Erreur Brevo ${res.status}` };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Erreur réseau' };
  }
}

/**
 * Vérifie un token Cloudflare Turnstile côté serveur (anti-spam).
 */
export async function verifyTurnstile(token: string, ip?: string): Promise<boolean> {
  const secret = process.env.CLOUDFLARE_TURNSTILE_SECRET;
  if (!secret) {
    // En dev sans clé : on laisse passer mais on log.
    console.warn('[turnstile] CLOUDFLARE_TURNSTILE_SECRET manquant — vérification ignorée (dev only).');
    return process.env.NODE_ENV !== 'production';
  }
  if (!token) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set('remoteip', ip);

  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
    });
    const data = (await res.json()) as { success: boolean };
    return Boolean(data.success);
  } catch {
    return false;
  }
}
