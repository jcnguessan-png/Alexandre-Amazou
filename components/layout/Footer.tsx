import Link from 'next/link';
import { Facebook, Youtube, Instagram, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

const footerNav = {
  navigation: [
    { href: '/a-propos', label: 'À propos' },
    { href: '/mes-livres', label: 'Mes livres' },
    { href: '/mes-enseignements', label: 'Mes enseignements' },
    { href: '/agenda', label: 'Agenda' },
    { href: '/podcast', label: 'Podcast' },
  ],
  ministeres: [
    { href: 'https://abmci.com', label: 'ABMCI', external: true },
    { href: '/a-propos#isbem', label: 'ISBEM' },
    { href: '/a-propos#leadership', label: 'Plateforme Leadership' },
    { href: '/temoignages', label: 'Témoignages' },
    { href: '/presse', label: 'Presse & médias' },
  ],
  legal: [
    { href: '/me-contacter', label: 'Me contacter' },
    { href: '/newsletter', label: 'Newsletter' },
    { href: '/faire-un-don', label: 'Faire un don' },
    { href: '/mentions-legales', label: 'Mentions légales' },
    { href: '/politique-de-confidentialite', label: 'Politique de confidentialité' },
  ],
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="container py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-heading text-xl font-semibold">
              Alexandre <span className="text-secondary">AMAZOU</span>
            </p>
            <p className="mt-3 max-w-xs text-sm text-primary-foreground/70">
              {siteConfig.baseline}.
            </p>
            <ul className="mt-6 flex items-center gap-3">
              <li>
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer me"
                  aria-label="Suivre le Pasteur Alexandre AMAZOU sur Facebook"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/20 text-primary-foreground transition hover:border-secondary hover:text-secondary"
                >
                  <Facebook aria-hidden="true" size={18} />
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer me"
                  aria-label="S'abonner à la chaîne YouTube officielle"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/20 text-primary-foreground transition hover:border-secondary hover:text-secondary"
                >
                  <Youtube aria-hidden="true" size={18} />
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer me"
                  aria-label="Suivre sur Instagram"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/20 text-primary-foreground transition hover:border-secondary hover:text-secondary"
                >
                  <Instagram aria-hidden="true" size={18} />
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Discuter sur WhatsApp"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/20 text-primary-foreground transition hover:border-secondary hover:text-secondary"
                >
                  <MessageCircle aria-hidden="true" size={18} />
                </a>
              </li>
            </ul>
          </div>

          <FooterColumn title="Navigation" items={footerNav.navigation} />
          <FooterColumn title="Ministères" items={footerNav.ministeres} />
          <FooterColumn title="Informations" items={footerNav.legal} />
        </div>

        <div className="mt-14 border-t border-primary-foreground/10 pt-8">
          <div className="flex flex-col items-start gap-4 text-sm text-primary-foreground/60 md:flex-row md:items-center md:justify-between">
            <p>
              &copy; {year} Alexandre AMAZOU. Tous droits réservés.
            </p>
            <p className="font-quote italic text-secondary/90">
              {siteConfig.baseline}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

type FooterItem = { href: string; label: string; external?: boolean };

function FooterColumn({ title, items }: { title: string; items: readonly FooterItem[] }) {
  return (
    <nav aria-label={title}>
      <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
        {title}
      </h2>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item.href}>
            {item.external ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary-foreground/75 transition hover:text-secondary"
              >
                {item.label}
              </a>
            ) : (
              <Link
                href={item.href}
                className="text-sm text-primary-foreground/75 transition hover:text-secondary"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
