/**
 * Bande-annonce du livre « Comment préparer et réussir une nouvelle année ? »
 * (campagne novembre → janvier). Médias privés dans public/private/livre/ (hors Git).
 *
 *   private/livre/broll/<id>.mp4      ← plans IA (voir PROMPTS-LIVRE.md)
 *   private/livre/vo/<format>-<id>.mp3 ← voix off féminine, une phrase par fichier
 *   private/livre/musique-30.mp3, musique-15.mp3
 */

/** Années affichées dans l'accroche (à basculer si la campagne déborde). */
export const ANNEES = { passee: '2026', prochaine: '2027' };

export const LIVRE = {
  couverture: 'livres/preparer-et-reussir-une-nouvelle-annee.jpg',
  titre: 'Comment préparer et réussir une nouvelle année ?',
  url: 'alexandreamazou.com/nouvelle-annee',
  note: '4,6/5 sur Amazon',
};

export const MEDIA_LIVRE = {
  broll: {
    calendrier: null as string | null, // L1 — pages de calendrier qui s'envolent
    horloge: null as string | null, // L2 — horloge qui marque minuit
    echecs: null as string | null, // L3 — roi d'or debout, pièces d'argent qui tombent
    portes: null as string | null, // L4 — quatre portes monumentales qui s'ouvrent sur la lumière
  },
  /** Passer à true quand les voix sont livrées dans private/livre/vo/. */
  voix: false,
  musique30: null as string | null,
  musique15: null as string | null,
};

export type Ligne = { id: string; at: number; max: number; text: string };

/** Voix off — version 30 s. `at` = instant de pose (s), `max` = durée maximale (s). */
export const VOIX_30: Ligne[] = [
  { id: '01', at: 0.15, max: 2.3, text: 'Et si l’année prochaine ressemblait… à celle-ci ?' },
  { id: '02', at: 2.6, max: 2.6, text: 'Mêmes combats. Mêmes blocages. Mêmes déceptions.' },
  { id: '03', at: 5.4, max: 2.8, text: 'Une nouvelle année n’est pas un simple changement de calendrier.' },
  { id: '04', at: 8.4, max: 2.2, text: 'C’est un champ de bataille spirituel !' },
  { id: '05', at: 10.9, max: 3.4, text: 'Dans ce livre, le Pasteur Alexandre Amazou vous révèle' },
  { id: '06', at: 14.5, max: 1.9, text: 'les quatre portes de l’année,' },
  { id: '07', at: 16.6, max: 2.2, text: 'les quatre armes de commandement,' },
  { id: '08', at: 19.0, max: 2.5, text: 'et un plan d’action pour la gagner.' },
  { id: '09', at: 21.8, max: 1.8, text: 'Ne subissez plus votre année.' },
  { id: '10', at: 23.8, max: 1.3, text: 'Commandez-la !' },
  { id: '11', at: 25.7, max: 3.5, text: 'Disponible dès maintenant sur Amazon.' },
];

/** Voix off — version 15 s. */
export const VOIX_15: Ligne[] = [
  { id: '01', at: 0.1, max: 2.1, text: 'Et si l’année prochaine ressemblait à celle-ci ?' },
  { id: '02', at: 2.4, max: 2.8, text: 'Une nouvelle année est un champ de bataille spirituel.' },
  { id: '03', at: 5.5, max: 3.4, text: 'Découvrez les quatre portes et les quatre armes pour la gagner.' },
  { id: '04', at: 9.2, max: 2.7, text: 'Ne subissez plus votre année. Commandez-la !' },
  { id: '05', at: 12.3, max: 2.4, text: 'Disponible sur Amazon.' },
];

/** Voix off — version 6 s (bumper). */
export const VOIX_6: Ligne[] = [
  { id: '01', at: 0.1, max: 1.9, text: 'Ne subissez plus votre année.' },
  { id: '02', at: 2.2, max: 1.2, text: 'Commandez-la !' },
  { id: '03', at: 4.0, max: 1.7, text: 'Sur Amazon.' },
];

/** Durées réelles mesurées après livraison (clé = chemin du fichier). */
export const DUREES_LIVRE: Record<string, number> = {};

export const fichierVoixLivre = (format: '30' | '15' | '6', id: string) =>
  `private/livre/vo/${format}-${id}.mp3`;
