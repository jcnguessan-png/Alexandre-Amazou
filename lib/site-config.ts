export const siteConfig = {
  name: 'Pasteur Alexandre AMAZOU',
  shortName: 'Alexandre AMAZOU',
  baseline: 'Transformer des personnes ordinaires en véritables leaders',
  description:
    "Site officiel du Pasteur Alexandre AMAZOU — enseignant biblique, Bishop, fondateur de l'ABMCI, auteur de onze ouvrages. Enseignements, livres et podcast.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://alexandreamazou.com',
  locale: 'fr_FR',
  contact: {
    email: 'contact@alexandreamazou.com',
    phone: '+225 07 68 22 12 72',
    phoneIntl: '+22507682221272',
    whatsapp: 'https://wa.me/22507682221272',
    address: {
      street: 'Riviera Palmeraie',
      locality: 'Cocody',
      city: 'Abidjan',
      country: "Côte d'Ivoire",
      countryCode: 'CI',
      organisation: 'ABMCI Cathédrale',
    },
    rdv: 'Mercredi & vendredi 14h–18h (sur rendez-vous)',
    responseDelay: 'Réponse sous 48 à 72 h ouvrées',
  },
  social: {
    facebook: 'https://www.facebook.com/PasteurAlexandreAmazouABMCI',
    youtube: 'https://www.youtube.com/channel/UCi2WIBsPCQycQK2NYwKA61Q',
    instagram: 'https://instagram.com/alexandreamazou',
    whatsapp: 'https://wa.me/22507682221272',
  },
  ministries: {
    abmci: { name: 'ABMCI', url: 'https://abmci.com', founded: '2003' },
    isbem: { name: 'ISBEM — Institut Supérieur de l\'Enseignement Biblique et Missionnaire' },
    isolm: { name: 'International Seed of Life Ministry' },
  },
  bookstoreUrl: 'https://librairie.abmci.com',
  donationUrl: 'https://abmci.com/dons',
  bookOrder: {
    /** Numéro WhatsApp dédié à la commande de livres (Librairie Alliance, Abidjan) */
    whatsappNumber: '2250705320607',
    whatsappDisplay: '+225 07 05 32 06 07',
    bookstoreName: 'Librairie Alliance',
    bookstoreCity: 'Abidjan',
    /** Page Amazon Author Store officielle — listing complet des ouvrages */
    amazonAuthorUrl: 'https://www.amazon.fr/stores/Alexandre-Amazou/author/B0GDWBDYL4',
    /** Fallback : résultats de recherche Amazon filtrés sur l'auteur */
    amazonSearchUrl:
      'https://www.amazon.fr/s?i=stripbooks&rh=p_27%3APast%2BAlexandre%2BAmazou&s=relevancerank&text=Past+Alexandre+Amazou',
  },
  youtube: {
    channelUrl: 'https://www.youtube.com/channel/UCi2WIBsPCQycQK2NYwKA61Q',
    /** Playlist officielle affichée sur le site (curation du pasteur) */
    featuredPlaylistId: 'PL1j6au4j0Fs5oAbh6rg9SvMCi7AbUgVBI',
    featuredPlaylistUrl:
      'https://www.youtube.com/playlist?list=PL1j6au4j0Fs5oAbh6rg9SvMCi7AbUgVBI',
  },
} as const;

/** Construit un lien WhatsApp pré-rempli pour commander un livre précis */
export function buildBookWhatsAppUrl(bookTitle: string): string {
  const message = `Bonjour, je souhaite commander le livre « ${bookTitle} » du Pasteur Alexandre AMAZOU. Merci de m'indiquer les modalités.`;
  return `https://wa.me/${siteConfig.bookOrder.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export type SiteConfig = typeof siteConfig;

export const navItems = [
  { href: '/', label: 'Accueil' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/mes-livres', label: 'Mes livres' },
  { href: '/mes-enseignements', label: 'Mes enseignements' },
  { href: '/podcast', label: 'Podcast' },
  { href: '/me-contacter', label: 'Me contacter' },
] as const;

export const ministryStats = [
  { value: '30+', label: 'années de ministère' },
  { value: '11', label: 'livres publiés' },
  { value: '1500+', label: 'leaders formés' },
  { value: '10+', label: 'pays de présence' },
] as const;
