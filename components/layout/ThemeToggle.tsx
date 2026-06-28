'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Bascule clair/sombre. La classe `light` est posée sur <html> avant le paint
 * par un script inline (layout.tsx) pour éviter tout flash ; ce composant ne
 * fait que refléter et inverser l'état, en le persistant dans localStorage.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [light, setLight] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLight(document.documentElement.classList.contains('light'));
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle('light', next);
    try {
      localStorage.setItem('theme', next ? 'light' : 'dark');
    } catch {
      /* localStorage indisponible (mode privé) : la bascule reste valable pour la session */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn('theme-toggle', className)}
      aria-label={light ? 'Activer le mode sombre' : 'Activer le mode clair'}
      aria-pressed={mounted ? light : undefined}
      title={light ? 'Mode sombre' : 'Mode clair'}
    >
      {/* Avant montage on affiche la lune (cohérent avec le défaut sombre) */}
      {mounted && light ? <Moon size={18} aria-hidden="true" /> : <Sun size={18} aria-hidden="true" />}
    </button>
  );
}
