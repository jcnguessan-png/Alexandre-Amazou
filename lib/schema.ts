import { siteConfig } from './site-config';
import type { Book } from '@/data/books';
import type { Event } from '@/data/events';
import type { Video } from './youtube';
import type { PodcastShow } from '@/data/podcasts';

const absoluteUrl = (path: string) =>
  path.startsWith('http') ? path : `${siteConfig.url.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`;

export const personSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${siteConfig.url}/#person`,
  name: 'Alexandre AMAZOU',
  alternateName: 'Pasteur Alexandre Amazou',
  jobTitle: 'Pasteur, enseignant biblique, auteur',
  description: siteConfig.description,
  url: siteConfig.url,
  image: absoluteUrl('/images/alexandre-amazou-portrait.jpg'),
  alumniOf: [
    {
      '@type': 'EducationalOrganization',
      name: "Institut Supérieur d'Informatique Appliquée (ISIA)",
    },
    {
      '@type': 'EducationalOrganization',
      name: "Université Biblique d'Atlanta",
      address: { '@type': 'PostalAddress', addressCountry: 'US' },
    },
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Alliance Biblique Missionnaire Côte d\'Ivoire (ABMCI)',
    url: siteConfig.ministries.abmci.url,
  },
  sameAs: [
    siteConfig.social.facebook,
    siteConfig.social.youtube,
    siteConfig.social.instagram,
  ],
});

export const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteConfig.url}/#organization`,
  name: 'Alliance Biblique Missionnaire Côte d\'Ivoire',
  alternateName: 'ABMCI',
  url: siteConfig.ministries.abmci.url,
  foundingDate: siteConfig.ministries.abmci.founded,
  founder: { '@id': `${siteConfig.url}/#person` },
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.contact.address.street,
    addressLocality: siteConfig.contact.address.locality,
    addressRegion: siteConfig.contact.address.city,
    addressCountry: siteConfig.contact.address.countryCode,
  },
});

export const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteConfig.url}/#website`,
  url: siteConfig.url,
  name: siteConfig.name,
  description: siteConfig.description,
  inLanguage: 'fr-FR',
  publisher: { '@id': `${siteConfig.url}/#person` },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteConfig.url}/recherche?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
});

export const bookSchema = (book: Book) => ({
  '@context': 'https://schema.org',
  '@type': 'Book',
  '@id': `${siteConfig.url}/mes-livres/${book.slug}#book`,
  name: book.title,
  ...(book.subtitle ? { alternativeHeadline: book.subtitle } : {}),
  author: { '@id': `${siteConfig.url}/#person` },
  ...(book.isbn ? { isbn: book.isbn } : {}),
  datePublished: book.datePublished,
  inLanguage: 'fr',
  description: book.description,
  image: absoluteUrl(book.coverImage),
  url: absoluteUrl(`/mes-livres/${book.slug}`),
  offers: {
    '@type': 'Offer',
    url: book.amazonUrl ?? siteConfig.bookOrder.amazonAuthorUrl,
    availability:
      book.status === 'available'
        ? 'https://schema.org/InStock'
        : book.status === 'out-of-stock'
          ? 'https://schema.org/OutOfStock'
          : 'https://schema.org/PreOrder',
  },
});

export const bookListSchema = (books: Book[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: books.map((book, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    url: absoluteUrl(`/mes-livres/${book.slug}`),
    name: book.title,
  })),
});

export const videoObjectSchema = (video: Video) => ({
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: video.title,
  description: video.description.slice(0, 500),
  thumbnailUrl: video.thumbnailUrl,
  uploadDate: video.publishedAt,
  ...(video.duration ? { duration: video.duration } : {}),
  embedUrl: `https://www.youtube.com/embed/${video.id}`,
  contentUrl: `https://www.youtube.com/watch?v=${video.id}`,
});

export const contactPageSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  url: `${siteConfig.url}/me-contacter`,
  about: { '@id': `${siteConfig.url}/#person` },
});

export const localBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Church',
  name: 'ABMCI Cathédrale',
  url: siteConfig.ministries.abmci.url,
  telephone: siteConfig.contact.phone,
  email: siteConfig.contact.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.contact.address.street,
    addressLocality: siteConfig.contact.address.locality,
    addressRegion: siteConfig.contact.address.city,
    addressCountry: siteConfig.contact.address.countryCode,
  },
});

export const eventSchema = (event: Event) => ({
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: event.title,
  startDate: event.startDate,
  ...(event.endDate ? { endDate: event.endDate } : {}),
  eventAttendanceMode: event.online
    ? 'https://schema.org/OnlineEventAttendanceMode'
    : 'https://schema.org/OfflineEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
  location: event.online
    ? {
        '@type': 'VirtualLocation',
        url: event.registrationUrl ?? siteConfig.url,
      }
    : {
        '@type': 'Place',
        name: event.venue ?? event.city,
        address: {
          '@type': 'PostalAddress',
          addressLocality: event.city,
          addressCountry: event.countryCode,
        },
      },
  description: event.description,
  organizer: { '@id': `${siteConfig.url}/#person` },
  ...(event.registrationUrl ? { url: event.registrationUrl } : {}),
});

export const podcastSchema = (show: PodcastShow, imageUrl?: string) => {
  const platforms = [
    show.spotifyShowUrl,
    show.applePodcastUrl,
    show.amazonMusicUrl,
    show.deezerUrl,
    show.youtubePlaylistUrl,
  ].filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@type': 'PodcastSeries',
    '@id': `${siteConfig.url}/podcast/${show.slug}#podcast`,
    name: show.name,
    description: show.description,
    url: absoluteUrl(`/podcast/${show.slug}`),
    inLanguage: 'fr',
    webFeed: show.rssUrl,
    author: { '@id': `${siteConfig.url}/#person` },
    ...(imageUrl ? { image: imageUrl } : {}),
    ...(platforms.length ? { sameAs: platforms } : {}),
  };
};

export const breadcrumbSchema = (items: { name: string; href: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    name: item.name,
    item: absoluteUrl(item.href),
  })),
});
