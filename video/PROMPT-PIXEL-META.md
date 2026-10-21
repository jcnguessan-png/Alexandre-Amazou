# Prompt Claude Code — Installer le pixel Meta sur alexandreamazou.com

> **Réalisé le 21 octobre 2026** (PR #21) : `lib/meta-pixel.ts`, `components/analytics/MetaPixel.tsx`,
> `components/campagne/TrackedLink.tsx`. Ce prompt est conservé pour mémoire.

> À coller tel quel dans Claude Code, ouvert à la racine du projet du site alexandreamazou.com.

---

## Contexte

Nous lançons le 2 novembre une campagne Meta (Facebook / Instagram) pour le livre
« Comment préparer et réussir une nouvelle année ? » du Pasteur Alexandre AMAZOU.
Toutes les publicités renverront vers **/nouvelle-annee**, qui contient des boutons
vers Amazon (France, Belgique, Canada). Le livre se vend uniquement sur Amazon (KDP),
donc nous ne pouvons pas mesurer les ventes : **le clic sur un bouton Amazon est
notre conversion**. Le pixel doit la remonter à Meta pour que la campagne s'optimise
sur les vrais acheteurs potentiels.

- **ID du pixel Meta (dataset) : `1504755687938131`**
- Audience principale : France, Belgique, Suisse (RGPD applicable) + Canada + Côte d'Ivoire.

## Ce que je te demande

### 0. Explorer avant de coder
Identifie le framework (Next.js App Router / Pages Router, autre), le layout racine,
la page `/nouvelle-annee` et le composant qui affiche les boutons Amazon
(probablement lié à `src/livre/config.ts` et `lib/campagne-nouvelle-annee.ts`).
Vérifie s'il existe déjà un pixel Meta, un gestionnaire de cookies ou un outil
d'analytics. Montre-moi ton plan avant de modifier quoi que ce soit.

### 1. Charger le pixel sur tout le site, avec consentement
- Ajouter le code de base du pixel Meta (fbevents.js) dans le layout racine,
  avec l'ID ci-dessus, via le composant prévu par le framework
  (ex. `next/script` avec `strategy="afterInteractive"`).
- **Consentement RGPD obligatoire** : appeler `fbq('consent', 'revoke')` avant
  `fbq('init', ...)`, puis `fbq('consent', 'grant')` uniquement après acceptation.
  - S'il existe déjà un bandeau cookies, s'y brancher.
  - Sinon, créer un bandeau simple et sobre (accorder / refuser), mémorisé dans
    `localStorage` (avec try/catch), cohérent avec la charte du site, en français.
- Envoyer `PageView` à chaque changement de page (attention à la navigation
  côté client : un seul PageView par page, pas de doublon).

### 2. Événement sur la page du livre
Sur `/nouvelle-annee`, envoyer une seule fois au chargement :
```js
fbq('track', 'ViewContent', {
  content_name: 'Comment préparer et réussir une nouvelle année',
  content_ids: ['B0G349RCYM'],
  content_type: 'product'
});
```

### 3. Événement de conversion : clic vers Amazon (le plus important)
Sur **chaque** lien ou bouton qui mène vers Amazon (sur `/nouvelle-annee` et ailleurs
sur le site si d'autres existent), envoyer au clic :
```js
fbq('track', 'InitiateCheckout', {
  content_name: 'Comment préparer et réussir une nouvelle année',
  content_ids: ['B0G349RCYM'],
  content_type: 'product',
  boutique: 'amazon.fr' // ou 'amazon.com.be', 'amazon.ca' selon le bouton
});
```
- Créer un petit utilitaire réutilisable (ex. `lib/meta-pixel.ts` avec
  `trackAmazonClick(boutique)`) plutôt que dupliquer le code.
- Les liens Amazon doivent s'ouvrir dans un nouvel onglet
  (`target="_blank" rel="noopener"`) pour que l'événement parte avant la navigation.
- L'appel doit être protégé : si `fbq` n'existe pas (bloqueur, refus de cookies),
  le lien fonctionne quand même, sans erreur.

### 4. Paramètres UTM
Les publicités ajouteront `?utm_source=meta&utm_campaign=...` aux URL. Vérifie
que ces paramètres ne cassent rien (ancres comme `#abidjan` incluses).

### 5. Ne pas faire
- Ne pas envoyer d'événement `Purchase` (nous ne voyons pas les ventes Amazon).
- Ne pas stocker ni envoyer de données personnelles (email, téléphone).
- Ne pas modifier les textes, prix ou liens Amazon existants.

### 6. Vérifier
- Build sans erreur, lint OK.
- Lancer le site en local et vérifier dans la console du navigateur que :
  `PageView` part sur chaque page, `ViewContent` sur `/nouvelle-annee`,
  `InitiateCheckout` au clic sur chaque bouton Amazon avec la bonne `boutique`,
  et qu'aucun événement ne part avant l'acceptation des cookies.
- Me donner la liste des fichiers modifiés et un résumé.

Après le déploiement, je vérifierai la réception avec l'extension
« Meta Pixel Helper » et dans le Gestionnaire d'événements (onglet Tester les événements).
