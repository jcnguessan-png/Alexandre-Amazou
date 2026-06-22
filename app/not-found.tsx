import Link from 'next/link';
import { Home, BookOpen, Video, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="dyn" data-page="404">
      <div className="page-center">
        <svg width="110" height="110" viewBox="0 0 120 120" aria-hidden="true">
          <defs>
            <linearGradient id="cross-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E4C977" />
              <stop offset="100%" stopColor="#9A7B2E" />
            </linearGradient>
          </defs>
          <rect x="52" y="20" width="16" height="80" rx="2" fill="url(#cross-gradient)" />
          <rect x="30" y="42" width="60" height="16" rx="2" fill="url(#cross-gradient)" />
        </svg>

        <p className="k">Erreur 404</p>
        <h1>Cette page n&apos;existe pas encore… mais votre destinée, oui.</h1>
        <p>
          Le contenu que vous cherchiez n&apos;a peut-être jamais existé, ou il a été déplacé.
          Voici quelques chemins qui pourraient vous être utiles.
        </p>

        <div className="cta">
          <Link className="btn btn-gold" href="/">
            <Home size={16} aria-hidden="true" /> Accueil
          </Link>
          <Link className="btn btn-ghost-gold" href="/mes-enseignements">
            <Video size={16} aria-hidden="true" /> Mes enseignements
          </Link>
          <Link className="btn btn-ghost-gold" href="/mes-livres">
            <BookOpen size={16} aria-hidden="true" /> Mes livres
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
