'use client';

import { useEffect } from 'react';

/**
 * Révèle les éléments `.reveal` de la page d'accueil quand ils entrent dans le
 * viewport. S'exécute à chaque montage (y compris navigations côté client).
 * L'état caché initial est posé avant le paint par un script inline (voir
 * app/page.tsx) gaté sur <html class="js-reveal"> — donc sans JS, tout reste
 * visible. Un filet de sécurité dans ce script révèle tout après 5 s au cas où
 * l'hydratation échouerait.
 */
export function RevealOnScroll() {
  useEffect(() => {
    const root = document.querySelector('.dyn-home');
    if (!root) return;

    const els = Array.from(root.querySelectorAll<HTMLElement>('.reveal'));
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
  }, []);

  return null;
}
