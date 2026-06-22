import type { Metadata, Viewport } from 'next';
import {
  Inter,
  Playfair_Display,
  Lora,
  Space_Grotesk,
  Cormorant_Garamond,
  Source_Serif_4,
  Archivo,
} from 'next/font/google';
import Script from 'next/script';
import { siteConfig } from '@/lib/site-config';
import { personSchema, organizationSchema, websiteSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { SkipToContent } from '@/components/layout/SkipToContent';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { RevealOnScroll } from '@/components/home/dynamic/RevealOnScroll';
import './globals.css';
import './theme-dyn.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-quote',
  display: 'swap',
  style: ['italic'],
});

// ── Direction C (accueil dynamique) — système typographique dédié ──
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
});

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
  display: 'swap',
  weight: ['400', '500'],
});

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} – Site officiel`,
    template: `%s – ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: 'Alexandre AMAZOU', url: siteConfig.url }],
  creator: 'Alexandre AMAZOU',
  publisher: 'Alexandre AMAZOU',
  category: 'Religion & Spiritualité',
  keywords: [
    'Alexandre Amazou',
    'Pasteur Alexandre Amazou',
    'ABMCI',
    'enseignement biblique',
    'leadership chrétien',
    'livres chrétiens',
    'Côte d\'Ivoire',
    'Abidjan',
  ],
  alternates: {
    canonical: siteConfig.url,
    languages: { 'fr-FR': siteConfig.url },
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} – Site officiel`,
    description: siteConfig.description,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.baseline}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} – Site officiel`,
    description: siteConfig.description,
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48', type: 'image/x-icon' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo-mark.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A0A14',
};

// Pose l'état « caché » des éléments .reveal avant le paint (pas de FOUC) et,
// en filet de sécurité, révèle tout après 5 s si l'hydratation échoue.
const REVEAL_BOOTSTRAP =
  "document.documentElement.classList.add('js-reveal');" +
  'setTimeout(function(){var n=document.querySelectorAll(".dyn .reveal");' +
  'for(var i=0;i<n.length;i++)n[i].classList.add("in");},5000);';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  return (
    <html
      lang="fr"
      className={`${inter.variable} ${playfair.variable} ${lora.variable} ${spaceGrotesk.variable} ${cormorant.variable} ${sourceSerif.variable} ${archivo.variable}`}
    >
      <head>
        <JsonLd data={personSchema()} />
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        {plausibleDomain ? (
          <Script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        ) : null}
      </head>
      <body className="flex min-h-screen flex-col bg-[#0A0A14]">
        <script dangerouslySetInnerHTML={{ __html: REVEAL_BOOTSTRAP }} />
        <SkipToContent targetId="main-content" />
        <Header />
        <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <RevealOnScroll />
      </body>
    </html>
  );
}
