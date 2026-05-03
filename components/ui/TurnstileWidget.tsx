'use client';

import Script from 'next/script';

/**
 * Cloudflare Turnstile — widget invisible/managed.
 * Si NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITEKEY n'est pas renseigné, le composant
 * ne rend rien (le serveur traite alors le formulaire sans vérification CF).
 */
export function TurnstileWidget({ theme = 'light' }: { theme?: 'light' | 'dark' | 'auto' }) {
  const sitekey = process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITEKEY;
  if (!sitekey) return null;

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
        async
        defer
      />
      <div
        className="cf-turnstile"
        data-sitekey={sitekey}
        data-theme={theme}
        data-language="fr"
      />
    </>
  );
}
