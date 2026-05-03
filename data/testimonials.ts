export type Testimonial = {
  id: string;
  name: string;
  role?: string;
  city?: string;
  countryCode?: string;
  quote: string;
};

// Témoignages placeholder — à remplacer par des témoignages authentiques avec consentement écrit.
export const testimonials: Testimonial[] = [
  {
    id: 't-1',
    name: 'Pasteur Jean-Marc K.',
    role: 'Implanteur d\'Église',
    city: 'Bouaké',
    countryCode: 'CI',
    quote:
      "Les enseignements du Pasteur AMAZOU sur l'ordre divin ont restauré ma vie de famille avant de toucher mon ministère. C'est une voix qui transforme à la racine.",
  },
  {
    id: 't-2',
    name: 'Esther M.',
    role: 'Entrepreneure chrétienne',
    city: 'Montréal',
    countryCode: 'CA',
    quote:
      "« Devenez riche pour Dieu » a libéré ma théologie de l'argent. Aujourd'hui mon entreprise finance trois œuvres missionnaires en Afrique de l'Ouest.",
  },
  {
    id: 't-3',
    name: 'David O.',
    role: 'Étudiant ISBEM',
    city: 'Abidjan',
    countryCode: 'CI',
    quote:
      "La Plateforme Leadership a fait naître en moi la rigueur d'un serviteur. Je n'ai plus peur de prêcher la doctrine biblique sans concession.",
  },
];
