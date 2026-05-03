/**
 * Agenda des conférences et événements à venir.
 * À tenir à jour manuellement (ou brancher sur un CMS / Google Calendar plus tard).
 */

export type Event = {
  id: string;
  title: string;
  startDate: string; // ISO 8601
  endDate?: string;
  city: string;
  countryCode: string; // ISO 3166-1 alpha-2
  venue?: string;
  description: string;
  registrationUrl?: string;
  online?: boolean;
  type?: 'conference' | 'seminaire' | 'culte' | 'mission';
};

export const events: Event[] = [
  // Données placeholder — à remplacer par l'agenda réel du Pasteur.
  {
    id: 'ca2026-abidjan',
    title: 'Convention Annuelle 2026',
    startDate: '2026-08-12T18:00:00+00:00',
    endDate: '2026-08-17T22:00:00+00:00',
    city: 'Abidjan',
    countryCode: 'CI',
    venue: 'ABMCI Cathédrale — Riviera Palmeraie, Cocody',
    description:
      "Cinq jours d'enseignements, de prière et de consécration autour du thème annuel — ouverts aux délégations internationales.",
    type: 'conference',
  },
  {
    id: 'mission-canada-2026',
    title: 'Mission Canada — Montréal & Gatineau',
    startDate: '2026-10-03T19:00:00-04:00',
    endDate: '2026-10-12T22:00:00-04:00',
    city: 'Montréal',
    countryCode: 'CA',
    description:
      "Cycle d'enseignements et de cultes au sein des assemblées ABMCI Canada — leadership, restauration familiale, mission.",
    type: 'mission',
  },
  {
    id: 'seminaire-paris-2026',
    title: 'Séminaire Leadership — Paris',
    startDate: '2026-11-15T10:00:00+01:00',
    endDate: '2026-11-16T18:00:00+01:00',
    city: 'Paris',
    countryCode: 'FR',
    venue: 'À confirmer',
    description:
      "Week-end de formation pour serviteurs de Dieu et porteurs de visions — Plateforme Leadership.",
    type: 'seminaire',
  },
];

export const upcomingEvents = (limit?: number): Event[] => {
  const now = new Date();
  const list = events
    .filter((e) => new Date(e.endDate ?? e.startDate) >= now)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  return limit ? list.slice(0, limit) : list;
};
