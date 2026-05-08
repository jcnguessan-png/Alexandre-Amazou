import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { Button } from '@/components/ui/Button';

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-primary text-primary-foreground"
    >
      {/* Décor : dégradé + accents dorés */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,168,76,0.15),_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(201,168,76,0.08),_transparent_60%)]" />
      </div>

      <div className="container relative grid min-h-[calc(100vh-5rem)] items-center gap-12 py-20 md:py-28 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <div className="motion-safe:animate-fade-up">
          <p className="font-quote text-sm uppercase tracking-[0.25em] text-secondary">
            Site officiel
          </p>
          <h1
            id="hero-heading"
            className="mt-4 text-balance font-heading text-display-xl font-semibold leading-[1.05] text-primary-foreground"
          >
            Pasteur Alexandre <span className="text-secondary">AMAZOU</span>
          </h1>
          <p className="mt-6 max-w-xl font-quote text-xl italic leading-relaxed text-secondary md:text-2xl">
            « {siteConfig.baseline} »
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/80 md:text-lg">
            Enseignant biblique, Bishop, fondateur de l'ABMCI, auteur de onze ouvrages.
            Une voix doctrinale pour une génération en quête de vérité, de
            leadership et d'héritage spirituel.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild variant="primary" size="lg">
              <Link href="/mes-enseignements">
                Découvrir mes enseignements
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/mes-livres">
                <BookOpen size={18} aria-hidden="true" />
                Commander mes livres
              </Link>
            </Button>
          </div>
        </div>

        <div className="relative mx-auto hidden aspect-[3/5] w-full max-w-md motion-safe:animate-fade-in lg:block">
          {/* Cadre décoratif doré décalé */}
          <div
            aria-hidden="true"
            className="absolute -right-4 -top-4 h-full w-full rounded-2xl border border-secondary/40"
          />
          <div className="relative h-full w-full overflow-hidden rounded-2xl ring-1 ring-secondary/20">
            {/* Halo doré derrière le portrait découpé (PNG transparent) */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,_rgba(201,168,76,0.18),_transparent_65%)]"
            />
            <Image
              src="/images/bishop-sans-fond.png"
              alt="Portrait officiel du Bishop Alexandre AMAZOU"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 480px"
              className="object-cover object-top"
            />
            {/* Caption en bas, sur dégradé sombre */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="font-quote text-xs uppercase tracking-[0.2em] text-secondary">
                Pasteur · Bishop · Auteur
              </p>
              <p className="mt-1 font-heading text-lg font-semibold leading-snug text-primary-foreground">
                « La parole de Dieu est sa propre lumière. »
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
