/**
 * Base de connaissances de l'assistant : assemblée à partir des données
 * structurées du site (livres, biographie, coordonnées, canaux, agenda).
 * C'est la « base de données » sur laquelle le bot s'appuie ; pour brancher
 * une vraie base ultérieurement, c'est le point d'intégration unique.
 *
 * Le résultat est un texte stable (recalculé au démarrage de l'instance), ce
 * qui permet de le mettre en cache de prompt côté API (préfixe identique).
 */

import { siteConfig, ministryStats } from '@/lib/site-config';
import { books, bookThemes, type BookTheme } from '@/data/books';
import { podcasts } from '@/data/podcasts';
import { upcomingEvents } from '@/data/events';
import { formatDateFR } from '@/lib/utils';

const THEME_LABEL = Object.fromEntries(bookThemes.map((t) => [t.id, t.label])) as Record<
  BookTheme,
  string
>;

function booksSection(): string {
  return books
    .map((b) => {
      const year = b.datePublished.slice(0, 4);
      const themes = b.themes.map((t) => THEME_LABEL[t]).join(', ');
      const tags = [b.bestseller ? 'Best-seller' : null, `${year}`, themes]
        .filter(Boolean)
        .join(' · ');
      const sub = b.subtitle ? ` — ${b.subtitle}` : '';
      return `- « ${b.title} »${sub} (${tags}). ${b.description}`;
    })
    .join('\n');
}

function eventsSection(): string {
  const events = upcomingEvents();
  if (events.length === 0) {
    return "Aucun événement public n'est listé actuellement sur le site. Inviter à s'abonner à la newsletter pour être prévenu.";
  }
  return events
    .map((e) => {
      const when = e.endDate
        ? `${formatDateFR(e.startDate)} – ${formatDateFR(e.endDate)}`
        : formatDateFR(e.startDate);
      const where = `${e.venue ? `${e.venue}, ` : ''}${e.city} (${e.countryCode})`;
      return `- ${e.title} — ${when}, ${where}. ${e.description}`;
    })
    .join('\n');
}

export function buildKnowledgeBase(): string {
  const c = siteConfig;
  const stats = ministryStats.map((s) => `${s.value} ${s.label}`).join(' · ');

  return `# BASE DE CONNAISSANCES — Site officiel du ${c.name}

## Identité & ministère
- ${c.name} — ${c.baseline}.
- Enseignant biblique, Bishop chargé des Affaires Africaines (People's Church of Christ, Pennsylvanie, depuis 2005), Docteur en divinité (Université Biblique d'Atlanta).
- Pasteur principal de l'${c.ministries.abmci.name} (Alliance Biblique Missionnaire Côte d'Ivoire), fondée en ${c.ministries.abmci.founded} ; siège à la Cathédrale Riviera Palmeraie (Cocody, Abidjan).
- Fondateur de l'${c.ministries.isbem.name}.
- Président du ${c.ministries.isolm.name} (Ministère International Semence de Vie).
- Initiateur de la Plateforme Leadership (plus de 1 500 serviteurs de Dieu) et porteur de la vision de la Conférence d'Abidjan (Conférence Internationale Annuelle des Églises ABMCI-Monde), qui réunit près de 10 000 personnes chaque année.
- Ambassadeur de Bonne Volonté pour la lutte contre la Tuberculose en Côte d'Ivoire.
- Marié à la Pasteure Manzan Laurette AMAZOU (missionnaire), père de cinq enfants.
- Vision : l'enseignement de la Parole de Dieu avec exactitude et révélation, dans la droite ligne de la doctrine biblique.
- Chiffres clés : ${stats} ; présence sur 4 continents et plus de 10 pays.

## Coordonnées (à donner si on les demande)
- Email : ${c.contact.email}
- Téléphone & WhatsApp : ${c.contact.phone} (${c.contact.whatsapp})
- Adresse : ${c.contact.address.organisation}, ${c.contact.address.street}, ${c.contact.address.locality}, ${c.contact.address.city}, ${c.contact.address.country}
- Rendez-vous : ${c.contact.rdv}
- Délai de réponse : ${c.contact.responseDelay}
- Page de contact du site : /me-contacter

## Enseignements (vidéo)
- Chaîne YouTube officielle : ${c.youtube.channelUrl}
- Playlist officielle d'enseignements : ${c.youtube.featuredPlaylistUrl}
- Des centaines de prédications, séminaires et enseignements bibliques en accès libre. Page du site : /mes-enseignements

## Podcasts (page du site : /podcast)
${podcasts
  .map(
    (p) =>
      `- « ${p.name} » — ${p.tagline}. ${p.description} Page : /podcast/${p.slug}${
        p.youtubePlaylistUrl ? ` · Version vidéo (YouTube) : ${p.youtubePlaylistUrl}` : ''
      } · Flux RSS : ${p.rssUrl}`,
  )
  .join('\n')}

## Livres (${books.length} ouvrages) et comment les commander
- Catalogue complet sur la page : /mes-livres
- Pour commander : par WhatsApp à la ${c.bookOrder.bookstoreName} (${c.bookOrder.bookstoreCity}) au ${c.bookOrder.whatsappDisplay}, ou sur la boutique Amazon de l'auteur : ${c.bookOrder.amazonAuthorUrl}
- Liste des ouvrages :
${booksSection()}

## Agenda
${eventsSection()}

## Soutenir le ministère / faire un don
- Portail officiel sécurisé ABMCI : ${c.donationUrl} (page du site : /faire-un-don). Reçu fiscal sur demande.

## Autres pages du site
- Biographie complète : /a-propos
- Témoignages de vies transformées : /temoignages
- Espace presse & médias : /presse
- Newsletter (méditation hebdomadaire + chapitre 1 offert) : /newsletter

## Réseaux sociaux
- YouTube : ${c.social.youtube}
- Facebook : ${c.social.facebook}
- Instagram : ${c.social.instagram}
- WhatsApp (contact direct) : ${c.social.whatsapp}
- Chaîne WhatsApp officielle (diffusion d'annonces, enseignements et actualités, à recommander pour rester informé) : ${c.social.whatsappChannel}`;
}
