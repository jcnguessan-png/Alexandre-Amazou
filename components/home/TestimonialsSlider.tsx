'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote as QuoteIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Testimonial } from '@/data/testimonials';
import { SectionTitle } from '@/components/ui/SectionTitle';

const ROTATION_MS = 7000;

export function TestimonialsSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || testimonials.length <= 1) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % testimonials.length),
      ROTATION_MS,
    );
    return () => clearInterval(id);
  }, [paused, testimonials.length]);

  // Respect prefers-reduced-motion : pause auto-rotation
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = () => setPaused(mq.matches);
    handler();
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  if (testimonials.length === 0) return null;

  const current = testimonials[index]!;
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIndex((i) => (i + 1) % testimonials.length);

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="bg-muted/30 py-14 md:py-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="container">
        <SectionTitle
          eyebrow="Témoignages"
          title="Des vies transformées"
          align="center"
        />

        <div
          className="relative mx-auto max-w-3xl"
          aria-roledescription="carousel"
          aria-label="Témoignages en rotation"
        >
          <QuoteIcon
            aria-hidden="true"
            size={48}
            className="absolute -left-4 -top-4 text-secondary/30 md:-left-8"
          />
          <AnimatePresence mode="wait">
            <motion.figure
              key={current.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative px-2 text-center md:px-12"
              aria-roledescription="slide"
              aria-label={`Témoignage ${index + 1} sur ${testimonials.length}`}
            >
              <blockquote className="font-quote text-2xl italic leading-relaxed text-primary md:text-3xl">
                « {current.quote} »
              </blockquote>
              <figcaption className="mt-6 text-sm text-foreground/70">
                <span className="font-semibold text-primary">{current.name}</span>
                {current.role ? <span className="block">{current.role}</span> : null}
                {current.city ? (
                  <span className="block text-xs uppercase tracking-[0.15em] text-secondary">
                    {current.city}
                    {current.countryCode ? `, ${current.countryCode}` : ''}
                  </span>
                ) : null}
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          {testimonials.length > 1 ? (
            <div className="mt-10 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={prev}
                aria-label="Témoignage précédent"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-primary transition hover:border-secondary hover:text-secondary"
              >
                <ChevronLeft size={18} aria-hidden="true" />
              </button>
              <ul className="flex items-center gap-2" role="tablist">
                {testimonials.map((t, i) => (
                  <li key={t.id}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={i === index}
                      aria-label={`Aller au témoignage ${i + 1}`}
                      onClick={() => setIndex(i)}
                      className={`h-2.5 w-2.5 rounded-full transition ${
                        i === index ? 'bg-secondary' : 'bg-foreground/20 hover:bg-foreground/40'
                      }`}
                    />
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={next}
                aria-label="Témoignage suivant"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-primary transition hover:border-secondary hover:text-secondary"
              >
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
