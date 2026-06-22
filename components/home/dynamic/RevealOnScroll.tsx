'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Révèle les éléments `.dyn .reveal` quand ils entrent dans le viewport.
 * Monté une fois dans le layout, il re-scanne à chaque changement de route
 * (navigation côté client). L'état caché initial est posé avant le paint par
 * un script inline dans le layout, gaté sur <html class="js-reveal"> — donc
 * sans JS, tout reste visible ; un filet de sécurité y révèle tout après 5 s
 * si l'hydratation échoue.
 */
export function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.dyn .reveal'));
    if (els.length === 0) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof IntersectionObserver === 'undefined') {
      els.forEach((el) => el.classList.add('in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
