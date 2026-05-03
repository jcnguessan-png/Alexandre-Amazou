import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ministryStats } from '@/lib/site-config';

export function AboutTeaser() {
  return (
    <section
      aria-labelledby="about-teaser-heading"
      className="bg-background py-14 md:py-20"
    >
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/5] w-full max-w-md justify-self-center overflow-hidden rounded-2xl ring-1 ring-secondary/20 lg:justify-self-start">
            <Image
              src="/images/pasteur-amazou-couple-landscape.jpg"
              alt="Le Pasteur Alexandre AMAZOU et la Pasteure Manzan Laurette AMAZOU"
              fill
              sizes="(max-width: 1024px) 90vw, 480px"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/30 to-transparent"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-primary-foreground">
              <p className="font-quote text-xs uppercase tracking-[0.2em] text-secondary">
                À propos
              </p>
              <p className="mt-2 max-w-xs font-heading text-2xl font-semibold leading-tight">
                Une voix prophétique au service du leadership chrétien.
              </p>
            </div>
          </div>

          <div>
            <p className="font-quote text-sm uppercase tracking-[0.25em] text-secondary">
              Biographie
            </p>
            <h2
              id="about-teaser-heading"
              className="mt-3 text-balance font-heading text-display-md font-semibold leading-tight text-primary"
            >
              Pasteur, enseignant, mentor.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-foreground/80 md:text-lg">
              Le Pasteur Alexandre AMAZOU dirige l'Alliance Biblique
              Missionnaire Côte d'Ivoire depuis 2003. Docteur en divinité
              (Université Biblique d'Atlanta), fondateur de l'ISBEM et
              initiateur de la Plateforme Leadership, il est consacré à former
              des serviteurs de Dieu au cœur de l'Afrique et bien au-delà.
            </p>

            <ul className="mt-8 grid grid-cols-2 gap-6 border-y border-border py-6">
              {ministryStats.map((stat) => (
                <li key={stat.label}>
                  <div className="font-heading text-3xl font-semibold text-secondary">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-foreground/70">{stat.label}</div>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Button asChild variant="primary" size="md">
                <Link href="/a-propos">
                  Lire ma biographie complète
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
