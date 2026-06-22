'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Compteur animé déclenché quand l'élément entre dans le viewport.
 * - SSR : rend directement la valeur finale (correct si JS désactivé / non hydraté).
 * - Client : repart de 0 puis anime jusqu'à `end` au scroll.
 * - prefers-reduced-motion : reste sur la valeur finale, sans animation.
 */
export function CountUp({
  end,
  suffix = '',
  duration = 1400,
  className,
}: {
  end: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(end);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof IntersectionObserver === 'undefined') {
      setValue(end);
      return;
    }

    setValue(0);
    let raf = 0;
    let done = false;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !done) {
            done = true;
            io.disconnect();
            let start: number | null = null;
            const step = (ts: number) => {
              if (start === null) start = ts;
              const p = Math.min((ts - start) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setValue(Math.round(end * eased));
              if (p < 1) raf = requestAnimationFrame(step);
            };
            raf = requestAnimationFrame(step);
          }
        }
      },
      { threshold: 0.4 },
    );

    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [end, duration]);

  return (
    <span ref={ref} className={className} suppressHydrationWarning>
      {value.toLocaleString('fr-FR')}
      {suffix}
    </span>
  );
}
