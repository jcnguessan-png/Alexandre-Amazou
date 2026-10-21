/**
 * Pixel Meta (Facebook / Instagram), chargé uniquement après accord du visiteur (RGPD).
 * Aucune requête vers Meta tant que le bandeau de cookies n'a pas été accepté.
 *
 * Événements envoyés :
 *  - PageView à chaque page ;
 *  - ViewContent sur les pages de livre listées dans PAGES_LIVRE ;
 *  - InitiateCheckout au clic vers Amazon (la « conversion » des campagnes : les ventes
 *    se font sur Amazon, invisibles pour nous) ;
 *  - Contact au clic vers WhatsApp.
 * Jamais de Purchase ni de donnée personnelle.
 */

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? '1504755687938131';

const CLE_CONSENTEMENT = 'consentement-cookies';
export const EVENEMENT_CONSENTEMENT = 'consentement-cookies';

export type Consentement = 'accepte' | 'refuse';

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  push?: unknown;
  loaded?: boolean;
  version?: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

const TITRE_CAMPAGNE = 'Comment préparer et réussir une nouvelle année';

/** Pages qui présentent un livre : ViewContent au chargement. */
export const PAGES_LIVRE: Record<string, { content_name: string; content_ids: string[] }> = {
  '/nouvelle-annee': { content_name: TITRE_CAMPAGNE, content_ids: ['B0G349RCYM'] },
};

/** Fiches Amazon du livre de campagne (broché, relié, série livre + journal). */
const ASIN_CAMPAGNE = ['B0G349RCYM', 'B0G349G3NN', 'B0G6MR161K'];

export function lireConsentement(): Consentement | null {
  try {
    const v = window.localStorage.getItem(CLE_CONSENTEMENT);
    return v === 'accepte' || v === 'refuse' ? v : null;
  } catch {
    return null;
  }
}

export function enregistrerConsentement(v: Consentement | null) {
  try {
    if (v) window.localStorage.setItem(CLE_CONSENTEMENT, v);
    else window.localStorage.removeItem(CLE_CONSENTEMENT);
  } catch {
    /* stockage indisponible : le choix vaut pour cette visite seulement */
  }
  // Pixel déjà chargé pendant la visite : retrait (ou rétablissement) immédiat de l'accord.
  window.fbq?.('consent', v === 'accepte' ? 'grant' : 'revoke');
  window.dispatchEvent(new CustomEvent(EVENEMENT_CONSENTEMENT, { detail: v }));
}

/** Charge fbevents.js une seule fois (code officiel Meta, réécrit en TypeScript). */
export function chargerPixel() {
  if (typeof window === 'undefined' || window.fbq) return;
  const fbq: Fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue!.push(args);
  };
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.queue = [];
  window.fbq = fbq;
  if (!window._fbq) window._fbq = fbq;

  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(s);

  fbq('init', META_PIXEL_ID);
}

function track(evenement: string, params?: Record<string, unknown>) {
  try {
    window.fbq?.('track', evenement, params);
  } catch {
    /* le suivi ne doit jamais bloquer la navigation */
  }
}

export function suivrePage(chemin: string) {
  track('PageView');
  const livre = PAGES_LIVRE[chemin];
  if (livre) track('ViewContent', { ...livre, content_type: 'product' });
}

function boutique(url: URL) {
  return url.hostname.replace(/^www\./, '');
}

/**
 * Clic sortant : InitiateCheckout vers Amazon, Contact vers WhatsApp, rien sinon.
 * `titre` sert pour les livres hors campagne (fiches livre du site).
 */
export function suivreClicSortant(href: string | undefined, titre?: string) {
  if (!href || !window.fbq) return;
  let url: URL;
  try {
    url = new URL(href, window.location.href);
  } catch {
    return;
  }
  if (/(^|\.)amazon\./.test(url.hostname)) {
    const asin = url.pathname.match(/\/dp\/([A-Z0-9]{10})/)?.[1];
    track('InitiateCheckout', {
      content_name: asin && ASIN_CAMPAGNE.includes(asin) ? TITRE_CAMPAGNE : titre,
      content_ids: asin ? [asin] : undefined,
      content_type: 'product',
      boutique: boutique(url),
    });
  } else if (/(^|\.)(wa\.me|whatsapp\.com)$/.test(url.hostname)) {
    track('Contact', { content_name: titre });
  }
}
