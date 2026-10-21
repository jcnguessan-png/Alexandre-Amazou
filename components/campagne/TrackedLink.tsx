'use client';

import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { suivreClicSortant } from '@/lib/meta-pixel';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** Nom de l'événement (ex. « Clic Amazon »). */
  event: string;
  /** Propriétés : format, emplacement… */
  props?: Record<string, string>;
  /** Titre du livre, transmis au pixel Meta (inutile pour le livre de campagne). */
  titre?: string;
  children: ReactNode;
};

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
  }
}

/**
 * Lien suivi : remonte le clic à Plausible et au pixel Meta s'ils sont chargés sur la page
 * (sinon, simple lien). Vers Amazon, le pixel reçoit InitiateCheckout : la conversion des campagnes.
 */
export function TrackedLink({ event, props, titre, children, onClick, ...rest }: Props) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        try {
          window.plausible?.(event, { props });
          suivreClicSortant(rest.href, titre);
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
