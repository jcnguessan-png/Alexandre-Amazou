'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { navItems, siteConfig } from '@/lib/site-config';
import { Button } from '@/components/ui/Button';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all',
        scrolled || open
          ? 'border-b border-border bg-background/90 backdrop-blur-md'
          : 'bg-background/40 backdrop-blur-sm',
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link
          href="/"
          aria-label={`${siteConfig.shortName} — accueil`}
          className="inline-flex items-center text-primary"
        >
          {/* Mobile : marque seule (M stylisé) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 130 50"
            className="h-9 w-auto lg:hidden"
            aria-hidden="true"
            fill="none"
          >
            <g stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 45 L35 5 L65 45" />
              <path d="M65 45 L95 5 L125 45" />
              <path d="M35 5 Q65 35 95 5" />
            </g>
          </svg>

          {/* Desktop : signature complète (marque + nom) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 240 80"
            className="hidden h-12 w-auto lg:block"
            aria-hidden="true"
            fill="none"
          >
            <g stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M55 50 L75 15 L95 50" />
              <path d="M95 50 L115 15 L135 50" />
              <path d="M75 15 Q95 40 115 15" />
            </g>
            <text
              x="120"
              y="73"
              textAnchor="middle"
              fontSize="9"
              fontFamily="Georgia, serif"
              fill="currentColor"
              letterSpacing="2.5"
            >
              ALEXANDRE AMAZOU
            </text>
          </svg>
        </Link>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname?.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'relative rounded-md px-3 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'text-primary'
                        : 'text-foreground/70 hover:text-primary',
                    )}
                  >
                    {item.label}
                    {isActive ? (
                      <span
                        className="absolute -bottom-0.5 left-3 right-3 h-[2px] bg-secondary"
                        aria-hidden="true"
                      />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Button asChild variant="primary" size="sm">
            <Link href="/faire-un-don">Soutenir le ministère</Link>
          </Button>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-primary lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-border bg-background lg:hidden"
      >
        <nav aria-label="Navigation mobile" className="container py-6">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname?.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'block rounded-md px-3 py-3 text-base font-medium',
                      isActive
                        ? 'bg-primary/5 text-primary'
                        : 'text-foreground/80',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 border-t border-border pt-6">
            <Button asChild variant="primary" size="md" className="w-full">
              <Link href="/faire-un-don">Soutenir le ministère</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
