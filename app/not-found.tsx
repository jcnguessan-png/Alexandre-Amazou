import Link from 'next/link';
import { Home, BookOpen, Video, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="container py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        {/* Croix stylisée — SVG minimaliste */}
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          aria-hidden="true"
          className="mx-auto"
        >
          <defs>
            <linearGradient id="cross-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C9A84C" />
              <stop offset="100%" stopColor="#B0903E" />
            </linearGradient>
          </defs>
          <rect x="52" y="20" width="16" height="80" rx="2" fill="url(#cross-gradient)" />
          <rect x="30" y="42" width="60" height="16" rx="2" fill="url(#cross-gradient)" />
        </svg>

        <p className="mt-6 font-quote text-sm uppercase tracking-[0.25em] text-secondary">
          Erreur 404
        </p>
        <h1 className="mt-3 text-balance font-heading text-display-md font-semibold text-primary">
          Cette page n'existe pas encore… mais votre destinée, oui.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-foreground/75 md:text-lg">
          Le contenu que vous cherchiez n'a peut-être jamais existé, ou il a
          été déplacé. Voici quelques chemins qui pourraient vous être utiles.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <SuggestionCard href="/" icon={Home} label="Accueil" />
          <SuggestionCard href="/mes-enseignements" icon={Video} label="Mes enseignements" />
          <SuggestionCard href="/mes-livres" icon={BookOpen} label="Mes livres" />
        </div>

        <div className="mt-10">
          <form action="/recherche" className="mx-auto flex max-w-md gap-2">
            <label htmlFor="search-404" className="sr-only">
              Rechercher sur le site
            </label>
            <input
              id="search-404"
              type="search"
              name="q"
              placeholder="Rechercher un sujet, un livre, un enseignement…"
              className="w-full rounded-md border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-foreground/40 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <Button type="submit" variant="primary" size="md">
              Rechercher
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

function SuggestionCard({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: typeof Home;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between gap-3 rounded-lg border border-border bg-background p-4 text-left transition hover:border-secondary hover:shadow-sm"
    >
      <span className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary/10 text-secondary">
          <Icon size={18} aria-hidden="true" />
        </span>
        <span className="font-medium text-primary">{label}</span>
      </span>
      <ArrowRight
        size={16}
        aria-hidden="true"
        className="text-foreground/40 transition group-hover:translate-x-0.5 group-hover:text-secondary"
      />
    </Link>
  );
}
