'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  EVENEMENT_CONSENTEMENT,
  chargerPixel,
  enregistrerConsentement,
  lireConsentement,
  suivrePage,
  type Consentement,
} from '@/lib/meta-pixel';

/**
 * Bandeau de cookies + pixel Meta. Le pixel n'est chargé qu'après « Accepter » ;
 * un PageView part ensuite à chaque changement de page (un seul par page).
 */
export function MetaPixel() {
  const pathname = usePathname();
  const [consentement, setConsentement] = useState<Consentement | null | 'inconnu'>('inconnu');
  const dernierePage = useRef<string | null>(null);

  useEffect(() => {
    setConsentement(lireConsentement());
    const surChangement = (e: Event) => setConsentement((e as CustomEvent<Consentement | null>).detail);
    window.addEventListener(EVENEMENT_CONSENTEMENT, surChangement);
    return () => window.removeEventListener(EVENEMENT_CONSENTEMENT, surChangement);
  }, []);

  useEffect(() => {
    if (consentement !== 'accepte' || dernierePage.current === pathname) return;
    chargerPixel();
    suivrePage(pathname);
    dernierePage.current = pathname;
  }, [consentement, pathname]);

  if (consentement !== null) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookies"
      className="fixed inset-x-4 bottom-4 z-[60] rounded-xl border border-[#c9a84c]/40 bg-[#12122b]/95 p-4 text-sm text-white/85 shadow-2xl backdrop-blur sm:right-auto sm:max-w-md"
    >
      <p className="leading-relaxed">
        Nous utilisons un cookie de mesure Meta (Facebook, Instagram) pour savoir quelles
        publicités vous ont amené ici. Rien n&apos;est déposé sans votre accord.{' '}
        <a href="/politique-de-confidentialite#cookies" className="text-[#c9a84c] underline underline-offset-2">
          En savoir plus
        </a>
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => enregistrerConsentement('refuse')}
          className="flex-1 rounded-md border border-white/30 px-3 py-2 font-medium text-white transition hover:bg-white/10"
        >
          Refuser
        </button>
        <button
          type="button"
          onClick={() => enregistrerConsentement('accepte')}
          className="flex-1 rounded-md bg-[#c9a84c] px-3 py-2 font-semibold text-[#0a0a14] transition hover:bg-[#d8b95c]"
        >
          Accepter
        </button>
      </div>
    </div>
  );
}

/** Bouton « Gérer les cookies » : efface le choix et réaffiche le bandeau. */
export function GererCookies({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => enregistrerConsentement(null)}>
      Gérer les cookies
    </button>
  );
}
