# alexandreamazou.com — refonte 2026

Site officiel du **Pasteur Alexandre AMAZOU**, refondu avec une stack moderne pour viser un score audit ≥ 85/100 (vs 47/100 sur l'ancien site WordPress/Divi).

## Stack

| Domaine        | Choix |
|----------------|-------|
| Framework      | Next.js 14 (App Router, TypeScript strict, RSC par défaut) |
| Styling        | Tailwind CSS v3 + design tokens custom (palette bleu nuit / or) |
| Animations     | Framer Motion + respect de `prefers-reduced-motion` |
| Contenu éditorial | next-mdx-remote (extraits de livres en MDX) |
| Catalogue livres | TypeScript local (`data/books.ts`) |
| Vidéos         | YouTube Data API v3 (façade `<VideoPlayer>` — iframe au clic) |
| Newsletter     | Brevo API REST + double opt-in |
| Formulaires    | Server Actions + zod + react-hook-form pour l'enrichissement client |
| Anti-spam      | Cloudflare Turnstile |
| SEO            | Metadata API Next.js 14 + JSON-LD manuel (Person, Organization, Book, VideoObject, Event, ContactPage, LocalBusiness, BreadcrumbList) |
| Analytics      | Plausible (privacy-first, RGPD/loi ivoirienne 2013-450) |
| Images         | next/image (WebP/AVIF, lazy, srcset) |
| Déploiement    | Vercel recommandé |

## Démarrage

```bash
# 1. Installer les dépendances
npm install

# 2. Copier les variables d'environnement
cp .env.example .env.local
# puis renseigner YOUTUBE_API_KEY, BREVO_API_KEY, etc.

# 3. Lancer le serveur de dev
npm run dev
```

Le site est servi sur [http://localhost:3000](http://localhost:3000).

## Scripts

| Script            | Effet |
|-------------------|-------|
| `npm run dev`     | Serveur de développement (Hot Reload) |
| `npm run build`   | Build de production statique (29 pages prérendues) |
| `npm start`       | Démarre le build de production |
| `npm run lint`    | ESLint (config next/core-web-vitals) |
| `npm run typecheck` | `tsc --noEmit` — vérification stricte TypeScript |

## Variables d'environnement

Voir [`.env.example`](./.env.example).

| Variable | Obligatoire | Rôle |
|----------|:-----------:|------|
| `YOUTUBE_API_KEY` | ⚠️ | Clé Google Cloud — sans elle, les sections vidéo affichent un fallback |
| `YOUTUBE_CHANNEL_ID` | ⚠️ | Chaîne YouTube principale (par défaut : `UCi2WIBsPCQycQK2NYwKA61Q`, à confirmer) |
| `BREVO_API_KEY` | ⚠️ | Clé Brevo — newsletter & lead magnet |
| `BREVO_LIST_ID` | ⚠️ | ID de la liste de diffusion principale |
| `CLOUDFLARE_TURNSTILE_SECRET` | recommandé | Vérification anti-spam côté serveur |
| `NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITEKEY` | recommandé | Sitekey rendue côté client |
| `NEXT_PUBLIC_SITE_URL` | ✅ | URL canonique (par défaut `https://alexandreamazou.com`) |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | optionnel | Active le snippet Plausible si renseigné |
| `CONTACT_EMAIL_TO` / `CONTACT_EMAIL_FROM` | optionnel | Réservé pour l'intégration future d'un service d'envoi (Resend, Brevo SMTP) |

> Le projet est conçu pour **builder même sans aucune variable d'environnement** : les wrappers `safeGetLatestVideos` etc. capturent les erreurs et retournent un tableau vide. Vous pouvez donc déployer immédiatement, puis brancher progressivement chaque intégration.

## Structure du projet

```
alexandreamazou/
├── app/                          ← Routes App Router
│   ├── layout.tsx                ← RootLayout : fonts, JSON-LD global, Plausible
│   ├── page.tsx                  ← Accueil
│   ├── a-propos/                 ← Biographie complète + timeline
│   ├── mes-livres/               ← Catalogue + fiche [slug] avec extrait MDX
│   ├── mes-enseignements/        ← Grille YouTube paginée + filtres + recherche
│   ├── agenda/                   ← Agenda conférences avec Schema Event
│   ├── podcast/                  ← Page podcast (Spotify/Apple/Deezer à brancher)
│   ├── newsletter/               ← Page d'inscription + /confirme
│   ├── temoignages/              ← Témoignages avec consentement
│   ├── presse/                   ← Media kit & contact presse
│   ├── me-contacter/             ← Formulaire complet + /merci
│   ├── faire-un-don/             ← Page don (Mobile Money + virement + CB)
│   ├── mentions-legales/         ← RGPD + loi ivoirienne 2013-450
│   ├── politique-de-confidentialite/
│   ├── not-found.tsx             ← Page 404 personnalisée (croix dorée + recherche)
│   ├── sitemap.ts                ← Sitemap XML auto-généré
│   ├── robots.ts                 ← robots.txt
│   └── actions/                  ← Server Actions (newsletter, contact)
│
├── components/
│   ├── layout/                   ← Header sticky, Footer, SkipToContent
│   ├── home/                     ← Sections de la page d'accueil
│   ├── books/                    ← BookCard, BookGrid, BookFilter, BookDetail
│   ├── teachings/                ← VideoCard, VideoPlayer (façade), TeachingsBrowser
│   ├── ui/                       ← Button, SectionTitle, Quote, Timeline, ContactForm, TurnstileWidget
│   └── seo/                      ← <JsonLd>
│
├── lib/
│   ├── youtube.ts                ← Client YouTube Data API v3 (avec wrappers `safe`)
│   ├── brevo.ts                  ← Client Brevo + verifyTurnstile
│   ├── schema.ts                 ← Helpers JSON-LD typés
│   ├── site-config.ts            ← Source unique : URL, contacts, réseaux sociaux, stats
│   └── utils.ts                  ← cn(), formatDateFR, formatDuration, formatViewCount
│
├── data/
│   ├── books.ts                  ← 9 livres pré-remplis (titres exacts du site actuel)
│   ├── events.ts                 ← Agenda (placeholder)
│   ├── testimonials.ts           ← Témoignages (placeholder)
│   ├── podcasts.ts               ← Podcast (placeholder)
│   └── excerpts/*.mdx            ← Extraits chapitre 1
│
└── public/
    ├── images/livres/            ← À fournir : 9 couvertures HD WebP, 800×1200
    ├── images/                   ← À fournir : portrait pasteur, og-image 1200×630
    └── favicon.ico               ← À fournir
```

## Ce qu'il reste à fournir (assets)

Le site est **100 % fonctionnel et déployable** avec les fallbacks éditoriaux, mais voici les assets à livrer pour atteindre la qualité finale :

| Asset | Chemin | Format conseillé |
|-------|--------|------------------|
| Portrait du Pasteur (hero, à propos) | `/public/images/alexandre-amazou-portrait.jpg` | 1200×1500 px, JPG/WebP |
| 9 couvertures de livres HD | `/public/images/livres/{slug}.webp` | 800×1200 px, WebP |
| Image Open Graph par défaut | `/public/og-image.jpg` | 1200×630 px |
| Favicon multi-tailles | `/public/favicon.ico`, `/public/apple-touch-icon.png` | 32×32, 180×180 |
| Manifest PWA | `/public/site.webmanifest` | JSON |

Les slugs des livres (à respecter pour les noms de fichier) :
```
la-realite-du-monde-des-esprits-partie-1
la-faveur-des-peres
les-hommes-de-la-race-de-dieu
la-verite-sur-les-prieres-non-exaucees
l-ordre-divin
la-foi-pour-changer-son-monde
le-protocole-d-acces-a-la-gloire-de-dieu
reussir-sa-vie
devenez-riche-pour-dieu
```

## Conformité audit (47 → 85+)

Voici les points critiques de l'audit traités dans cette refonte :

| Point audit | Statut |
|-------------|:------:|
| Title SEO orphelin (« Pasteur ... — Site officiel \| ») | ✅ Title unique par page via `generateMetadata` |
| Meta description absente | ✅ Description unique 150–160 car. par page |
| Open Graph & Twitter Cards absents | ✅ Présent globalement + override par page |
| JSON-LD absent (5 pages auditées) | ✅ Person + Organization + WebSite globaux ; Book, VideoObject, Event, ContactPage, LocalBusiness, BreadcrumbList contextuels |
| Hiérarchie H3 → H1 cassée sur 4 pages | ✅ Un seul H1 par page, hiérarchie séquentielle |
| Viewport bloque le zoom (`maximum-scale=1`) | ✅ Viewport conforme : `width=device-width, initial-scale=1` |
| Alts vides (25+ images) | ✅ Alt descriptifs systématiques, alt vide uniquement pour décor |
| Footer figé à 2021 | ✅ Année dynamique : `new Date().getFullYear()` |
| Faute « Denière » → « Dernière » | ✅ Corrigée |
| Mention « Désormais disponible » | ✅ Remplacée par « Dernière parution » |
| YouTube iframe lourdes | ✅ Façade — `<iframe>` chargée uniquement au clic |
| URLs HTTP non sécurisées | ✅ Toutes les URLs externes en HTTPS |
| /don vs /dons incohérent | ✅ URL unique `siteConfig.donationUrl` |
| Captcha mathématique | ✅ Cloudflare Turnstile (privacy-friendly, accessible) |
| Conformité RGPD formulaires | ✅ Checkbox consentement + double opt-in newsletter + politique de confidentialité dédiée |
| aria-label réseaux sociaux manquants | ✅ aria-label explicite par plateforme |
| Pas de skip-to-content | ✅ `<SkipToContent>` en tout premier dans le `<body>` |
| Pas de sections « Conférences » / « Newsletter » / « Témoignages » sur home | ✅ Sections ajoutées |
| Pas de page 404 personnalisée | ✅ Page chaleureuse + recherche + 3 suggestions |
| Pages manquantes : /agenda, /newsletter, /podcast, /témoignages, /presse, /faire-un-don, /mentions-legales, /politique-de-confidentialite | ✅ Toutes créées |

## Déploiement Vercel (recommandé)

1. Importer le dépôt Git dans le dashboard [Vercel](https://vercel.com/new).
2. Vercel détecte automatiquement Next.js 14 — aucune config manuelle nécessaire.
3. Renseigner les variables d'environnement dans **Settings → Environment Variables** (en mode `Production` + `Preview`) :
   - `YOUTUBE_API_KEY`
   - `YOUTUBE_CHANNEL_ID`
   - `BREVO_API_KEY`
   - `BREVO_LIST_ID`
   - `CLOUDFLARE_TURNSTILE_SECRET`
   - `NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITEKEY`
   - `NEXT_PUBLIC_SITE_URL=https://alexandreamazou.com`
   - `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=alexandreamazou.com`
4. Déployer. Le domaine `alexandreamazou.com` est ensuite à pointer vers `cname.vercel-dns.com` chez votre registrar.
5. Activer le **renouvellement automatique du certificat SSL** (Vercel s'en charge nativement).

## Déploiement statique alternatif (Hostinger)

Si vous souhaitez rester chez Hostinger, le projet supporte l'export statique en remplaçant `output:` dans `next.config.mjs` :

```js
// next.config.mjs
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // ...
};
```

Limitation : les Server Actions (formulaires contact / newsletter) ne fonctionneront pas en mode export — il faudra alors basculer vers une API externe (Brevo via JS côté client + un endpoint serverless séparé pour Turnstile).

## Performance attendue

- **Lighthouse Performance** : ≥ 90 (objectif brief) — facade YouTube, next/image WebP/AVIF, code splitting App Router, fonts via `next/font` (pas de @import externe), aucun jQuery.
- **Lighthouse Accessibility** : ≥ 95 — WCAG 2.2 AA, focus visible, skip link, alts, aria-label, hiérarchie H1→H3 stricte, viewport non bloqué, prefers-reduced-motion respecté.
- **Lighthouse SEO** : 100 — metadata + JSON-LD complets.
- **Bundle First Load JS** : 87 kB partagé + 0–24 kB par page.

## Roadmap post-livraison

Voir le rapport d'audit (`Audit-alexandreamazou-com.docx`) pour la liste complète. Priorités courtes :
1. Renseigner les couvertures de livres HD + portrait du pasteur.
2. Confirmer la chaîne YouTube principale (`UCi2WIBsPCQycQK2NYwKA61Q` ou `UCwqHNYIvsrNQBgTvhD1XgEA`).
3. Préciser les dates de publication exactes des 9 livres.
4. Renseigner les vrais événements à venir dans `data/events.ts`.
5. Lancer le podcast officiel (Spotify for Podcasters → flux RSS) puis le brancher dans `data/podcasts.ts`.
6. Solliciter 5–10 témoignages écrits avec consentement explicite.

---

*Refonte conduite à partir de l'audit digital du 29 avril 2026 (47/100). Objectif : 85+/100 dans les 6 mois post-livraison.*
