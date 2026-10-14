/**
 * Voix off « dynamique » — une phrase par fichier (public/private/vo2/<format>-<id>.mp3).
 * `at` = instant où la phrase démarre dans la vidéo (s), calé sur les images et la musique.
 * `max` = durée maximale de la phrase pour ne pas déborder sur la suivante (s).
 * Les durées réelles mesurées après génération vont dans `DUREES` (sinon `max` est utilisé).
 */
export type Ligne = { id: string; at: number; max: number; text: string; fin?: boolean };

export const VOIX_16x9: Ligne[] = [
  { id: '01', at: 0.3, max: 2.0, text: 'Certaines voix passent.' },
  { id: '02', at: 2.6, max: 2.8, text: 'D’autres… transforment des vies !' },
  { id: '03', at: 5.6, max: 2.3, text: 'Depuis plus de trente ans, une mission :' },
  { id: '04', at: 8.0, max: 3.5, text: 'transformer des personnes ordinaires en de véritables leaders !' },
  { id: '05', at: 11.8, max: 4.5, text: 'Partie d’Abidjan, cette voix résonne aujourd’hui dans les nations.' },
  { id: '06', at: 18.6, max: 4.8, text: 'De Montréal à Paris, de Genève à Kinshasa.' },
  { id: '07', at: 24.0, max: 1.7, text: 'Dix mille personnes chaque année.' },
  { id: '08', at: 25.8, max: 2.4, text: 'Plus de mille cinq cents leaders formés.' },
  { id: '09', at: 28.5, max: 2.3, text: 'Son enseignement ne s’écoute pas seulement…' },
  { id: '10', at: 30.9, max: 0.9, text: 'Il se vit !' },
  { id: '11', at: 31.9, max: 2.3, text: 'La Réalité du Monde des Esprits.' },
  { id: '12', at: 34.3, max: 2.3, text: 'Quarante jours de combat spirituel.' },
  { id: '13', at: 36.7, max: 2.4, text: 'Comment préparer et réussir une nouvelle année.' },
  { id: '14', at: 39.2, max: 1.9, text: 'Mon Journal de victoire.' },
  { id: '15', at: 41.2, max: 2.3, text: 'Onze ouvrages pour bâtir votre victoire !' },
  { id: '16', at: 43.6, max: 3.3, text: 'Sur Amazon, à la Librairie Alliance et sur alexandreamazou.com.' },
  { id: '17', at: 49.0, max: 2.6, text: 'Votre histoire n’est pas terminée.', fin: true },
  { id: '18', at: 54.6, max: 2.2, text: 'Enseignements, livres, podcast…' },
  { id: '19', at: 57.0, max: 2.5, text: 'Abonnez-vous. Rejoignez-nous !' },
];

export const VOIX_9x16: Ligne[] = [
  { id: '01', at: 0.1, max: 1.8, text: 'Trente ans. Une mission.' },
  { id: '02', at: 2.0, max: 3.3, text: 'Transformer des personnes ordinaires en véritables leaders !' },
  { id: '03', at: 5.5, max: 3.0, text: 'D’Abidjan à Montréal, de Paris à Genève.' },
  { id: '04', at: 8.6, max: 1.3, text: 'Dix mille personnes par an !' },
  { id: '05', at: 10.1, max: 2.6, text: 'La Réalité du Monde des Esprits.' },
  { id: '06', at: 13.1, max: 2.6, text: 'Quarante jours de combat spirituel.' },
  { id: '07', at: 16.1, max: 2.8, text: 'Comment préparer et réussir une nouvelle année.' },
  { id: '08', at: 19.1, max: 4.4, text: 'Sur Amazon, à la Librairie Alliance et sur alexandreamazou.com.' },
  { id: '09', at: 23.8, max: 2.4, text: 'Votre histoire n’est pas terminée.', fin: true },
  { id: '10', at: 26.8, max: 2.9, text: 'Abonnez-vous. Rejoignez-nous !' },
];

/** Durées réelles mesurées (s), par fichier — renseignées après génération. */
export const DUREES: Record<string, number> = {
  'private/vo2/16x9-01.mp3': 1.45,
  'private/vo2/16x9-02.mp3': 1.92,
  'private/vo2/16x9-03.mp3': 1.92,
  'private/vo2/16x9-04.mp3': 3.12,
  'private/vo2/16x9-05.mp3': 3.12,
  'private/vo2/16x9-06.mp3': 2.96,
  'private/vo2/16x9-07.mp3': 1.52,
  'private/vo2/16x9-08.mp3': 1.70,
  'private/vo2/16x9-09.mp3': 2.01,
  'private/vo2/16x9-10.mp3': 0.80,
  'private/vo2/16x9-11.mp3': 2.03,
  'private/vo2/16x9-12.mp3': 2.03,
  'private/vo2/16x9-13.mp3': 2.19,
  'private/vo2/16x9-14.mp3': 1.71,
  'private/vo2/16x9-15.mp3': 2.21,
  'private/vo2/16x9-16.mp3': 3.25,
  'private/vo2/16x9-17.mp3': 1.56,
  'private/vo2/16x9-18.mp3': 2.11,
  'private/vo2/16x9-19.mp3': 1.68,
  'private/vo2/9x16-01.mp3': 1.68,
  'private/vo2/9x16-02.mp3': 2.96,
  'private/vo2/9x16-03.mp3': 2.40,
  'private/vo2/9x16-04.mp3': 1.24,
  'private/vo2/9x16-05.mp3': 2.03,
  'private/vo2/9x16-06.mp3': 2.03,
  'private/vo2/9x16-07.mp3': 2.19,
  'private/vo2/9x16-08.mp3': 3.41,
  'private/vo2/9x16-09.mp3': 1.56,
  'private/vo2/9x16-10.mp3': 1.68,
};

export const fichierVoix = (format: '16x9' | '9x16', id: string) => `private/vo2/${format}-${id}.mp3`;
