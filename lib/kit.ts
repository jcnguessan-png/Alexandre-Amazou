import { createHmac, timingSafeEqual } from 'node:crypto';

/**
 * Kit de communication — accès protégé par liens signés (HMAC), sans base de données.
 *
 * Parcours :
 *  1. Une église envoie une demande d'invitation (formulaire /me-contacter).
 *  2. Le secrétariat reçoit un email avec un lien de validation signé (jeton « approve »).
 *  3. En validant, le demandeur reçoit un lien d'accès personnel au kit (jeton « access »),
 *     valable KIT_ACCESS_DAYS jours.
 *  4. Les fichiers vivent dans un store Vercel Blob privé ; /api/kit/[fichier] vérifie le
 *     jeton puis redirige vers une URL présignée de quelques minutes.
 *
 * Révoquer tous les liens émis : changer KIT_SIGNING_SECRET sur Vercel.
 */

export const KIT_ACCESS_DAYS = 30;
export const KIT_APPROVAL_DAYS = 60;

export type KitFile = {
  slug: string;
  pathname: string;
  filename: string;
  label: string;
  kind: 'video' | 'photo' | 'text';
  details: string;
};

export const KIT_FILES: KitFile[] = [
  {
    slug: 'video',
    pathname: 'kit/video-biographie-alexandre-amazou.mp4',
    filename: 'Video-biographie-Pasteur-Alexandre-AMAZOU.mp4',
    label: 'Vidéo de présentation',
    kind: 'video',
    details: 'MP4 · 1920×1080 · 54 s · 30 Mo',
  },
  {
    slug: 'photo-smoking',
    pathname: 'kit/photo-officielle-smoking.jpg',
    filename: 'Pasteur-Alexandre-AMAZOU-smoking.jpg',
    label: 'Portrait en pied — smoking',
    kind: 'photo',
    details: 'JPG · 2114×4119 px · 1,7 Mo',
  },
  {
    slug: 'photo-smoking-hd',
    pathname: 'kit/photo-officielle-smoking-hd.png',
    filename: 'Pasteur-Alexandre-AMAZOU-smoking-HD.png',
    label: 'Portrait en pied — smoking (PNG HD)',
    kind: 'photo',
    details: 'PNG · 2114×4119 px · 19 Mo · pour l’impression',
  },
  {
    slug: 'photo-blanc-1',
    pathname: 'kit/photo-officielle-costume-blanc-1.png',
    filename: 'Pasteur-Alexandre-AMAZOU-costume-blanc-1.png',
    label: 'Portrait — costume blanc (1)',
    kind: 'photo',
    details: 'PNG · 646×1038 px · réseaux sociaux',
  },
  {
    slug: 'photo-blanc-2',
    pathname: 'kit/photo-officielle-costume-blanc-2.png',
    filename: 'Pasteur-Alexandre-AMAZOU-costume-blanc-2.png',
    label: 'Portrait — costume blanc (2)',
    kind: 'photo',
    details: 'PNG · 658×1043 px · réseaux sociaux',
  },
  {
    slug: 'bio-courte',
    pathname: 'kit/bio-courte.txt',
    filename: 'Biographie-courte-Pasteur-Alexandre-AMAZOU.txt',
    label: 'Biographie courte',
    kind: 'text',
    details: 'Texte · environ 90 mots',
  },
  {
    slug: 'bio-longue',
    pathname: 'kit/bio-longue.txt',
    filename: 'Biographie-longue-Pasteur-Alexandre-AMAZOU.txt',
    label: 'Biographie longue',
    kind: 'text',
    details: 'Texte · environ 220 mots',
  },
];

export function getKitFile(slug: string): KitFile | undefined {
  return KIT_FILES.find((f) => f.slug === slug);
}

/** Demande d'invitation transportée dans le lien de validation du secrétariat. */
export type ApprovalPayload = {
  k: 'approve';
  email: string;
  name: string;
  organisation: string;
  eventType: string;
  dates: string;
  place: string;
  exp: number;
};

/** Droit d'accès au kit remis au demandeur. */
export type AccessPayload = {
  k: 'access';
  email: string;
  name: string;
  organisation: string;
  exp: number;
};

type Payload = ApprovalPayload | AccessPayload;

function getSecret(): string {
  const secret = process.env.KIT_SIGNING_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('KIT_SIGNING_SECRET manquant ou trop court (32 caractères minimum).');
  }
  return secret;
}

function sign(data: string): string {
  return createHmac('sha256', getSecret()).update(data).digest('base64url');
}

export function createToken<T extends Payload>(payload: T): string {
  const data = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  return `${data}.${sign(data)}`;
}

export function verifyToken<K extends Payload['k']>(
  token: string | undefined | null,
  kind: K,
): Extract<Payload, { k: K }> | null {
  if (!token || token.length > 4000) return null;
  const [data, sig] = token.split('.');
  if (!data || !sig) return null;

  let expected: string;
  try {
    expected = sign(data);
  } catch (err) {
    console.error('[kit]', err instanceof Error ? err.message : err);
    return null;
  }
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const payload = JSON.parse(Buffer.from(data, 'base64url').toString('utf8')) as Payload;
    if (payload.k !== kind) return null;
    if (typeof payload.exp !== 'number' || payload.exp < Date.now()) return null;
    return payload as Extract<Payload, { k: K }>;
  } catch {
    return null;
  }
}

export function daysFromNow(days: number): number {
  return Date.now() + days * 24 * 60 * 60 * 1000;
}

export function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'https://alexandreamazou.com').replace(/\/$/, '');
}

export function accessUrl(token: string): string {
  return `${siteUrl()}/kit-communication?acces=${encodeURIComponent(token)}`;
}

export function approvalUrl(token: string): string {
  return `${siteUrl()}/kit-communication/valider?t=${encodeURIComponent(token)}`;
}
