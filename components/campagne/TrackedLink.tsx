'use client';

import type { AnchorHTMLAttributes, ReactNode } from 'react';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** Nom de l'événement (ex. « Clic Amazon »). */
  event: string;
  /** Propriétés : format, emplacement… */
  props?: Record<string, string>;
  children: ReactNode;
};

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Lien suivi : remonte le clic à Plausible et au pixel Meta s'ils sont chargés sur la page
 * (sinon, simple lien). Sert à mesurer quels boutons de la campagne mènent vers Amazon.
 */
export function TrackedLink({ event, props, children, onClick, ...rest }: Props) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        try {
          window.plausible?.(event, { props });
          window.fbq?.('trackCustom', event.replace(/\s+/g, ''), props);
        } catch {
          /* le suivi ne doit jamais bloquer le clic */
        }
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
