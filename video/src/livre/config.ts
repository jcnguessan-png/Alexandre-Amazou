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
    calendrier: 'private/livre/broll/calendrier.mp4' as string | null, // L1 — pages de calendrier qui s'envolent
    horloge: 'private/livre/broll/horloge.mp4' as string | null, // L2 — horloge qui marque minuit
    echecs: 'private/livre/broll/echecs.mp4' as string | null, // L3 — roi d'or debout, pièces d'argent qui tombent
    portes: 'private/livre/broll/portes.mp4' as string | null, // L4 — quatre portes monumentales qui s'ouvrent sur la lumière
  },
  /** Passer à true quand les voix sont livrées dans private/livre/vo/. */
  voix: true,
  musique30: 'private/livre/musique-30.mp3' as string | null,
  musique15: 'private/livre/musique-15.mp3' as string | null,
};

export type Ligne = { id: string; at: number; max: number; text: string };

/** Voix off — version 30 s. `at` = instant de pose (s), `max` = durée maximale (s). */
export const VOIX_30: Ligne[] = [
  { id: '01', at: 0.05, max: 2.3, text: 'Et si l’année prochaine ressemblait… à celle-ci ?' },
  { id: '02', at: 2.62, max: 2.6, text: 'Mêmes combats. Mêmes blocages. Mêmes déceptions.' },
  { id: '03', at: 5.55, max: 2.8, text: 'Une nouvelle année n’est pas un simple changement de calendrier.' },
  { id: '04', at: 8.4, max: 2.2, text: 'C’est un champ de bataille spirituel !' },
  { id: '05', at: 11, max: 3.4, text: 'Dans ce livre, le Pasteur Alexandre Amazou vous révèle' },
  { id: '06', at: 14.4, max: 1.9, text: 'les quatre portes de l’année,' },
  { id: '07', at: 16.3, max: 2.2, text: 'les quatre armes de commandement,' },
  { id: '08', at: 18.45, max: 2.5, text: 'et un plan d’action pour la gagner.' },
  { id: '09', at: 20.95, max: 1.8, text: 'Ne subissez plus votre année.' },
  { id: '10', at: 23.25, max: 1.3, text: 'Commandez-la !' },
  { id: '11', at: 25.45, max: 3.5, text: 'Disponible dès maintenant sur Amazon.' },
];

/** Voix off — version 15 s. */
export const VOIX_15: Ligne[] = [
  { id: '01', at: 0.1, max: 2.1, text: 'Et si l’année prochaine ressemblait à celle-ci ?' },
  { id: '02', at: 2.55, max: 2.8, text: 'Une nouvelle année est un champ de bataille spirituel.' },
  { id: '03', at: 5.35, max: 3.4, text: 'Découvrez les quatre portes et les quatre armes pour la gagner.' },
  { id: '04', at: 8.5, max: 2.7, text: 'Ne subissez plus votre année. Commandez-la !' },
  { id: '05', at: 12.3, max: 2.4, text: 'Disponible sur Amazon.' },
];

/** Voix off — version 6 s (bumper). */
export const VOIX_6: Ligne[] = [
  { id: '01', at: 0.1, max: 1.9, text: 'Ne subissez plus votre année.' },
  { id: '02', at: 2.35, max: 1.2, text: 'Commandez-la !' },
  { id: '03', at: 4, max: 1.7, text: 'Sur Amazon.' },
];

/** Durées réelles mesurées après livraison (clé = chemin du fichier). */
export const DUREES_LIVRE: Record<string, number> = {
  'private/livre/vo/15-01.mp3': 2.41,
  'private/livre/vo/15-02.mp3': 2.37,
  'private/livre/vo/15-03.mp3': 3.29,
  'private/livre/vo/15-04.mp3': 2.75,
  'private/livre/vo/15-05.mp3': 1.53,
  'private/livre/vo/30-01.mp3': 2.56,
  'private/livre/vo/30-02.mp3': 2.93,
  'private/livre/vo/30-03.mp3': 2.76,
  'private/livre/vo/30-04.mp3': 2.46,
  'private/livre/vo/30-05.mp3': 3.26,
  'private/livre/vo/30-06.mp3': 1.79,
  'private/livre/vo/30-07.mp3': 2.00,
  'private/livre/vo/30-08.mp3': 2.31,
  'private/livre/vo/30-09.mp3': 2.19,
  'private/livre/vo/30-10.mp3': 1.03,
  'private/livre/vo/30-11.mp3': 2.34,
  'private/livre/vo/6-01.mp3': 2.19,
  'private/livre/vo/6-02.mp3': 1.03,
  'private/livre/vo/6-03.mp3': 1.81,
  'private/livre/vo-homme/30-01.mp3': 2.56,
  'private/livre/vo-homme/30-02.mp3': 2.96,
  'private/livre/vo-homme/30-03.mp3': 2.81,
  'private/livre/vo-homme/30-04.mp3': 2.16,
  'private/livre/vo-homme/30-05.mp3': 3.37,
  'private/livre/vo-homme/30-06.mp3': 1.77,
  'private/livre/vo-homme/30-07.mp3': 1.92,
  'private/livre/vo-homme/30-08.mp3': 2.01,
  'private/livre/vo-homme/30-09.mp3': 1.55,
  'private/livre/vo-homme/30-10.mp3': 0.81,
  'private/livre/vo-homme/30-11.mp3': 2.08,
  'private/livre/vo-homme/15-01.mp3': 2.29,
  'private/livre/vo-homme/15-02.mp3': 2.77,
  'private/livre/vo-homme/15-03.mp3': 2.91,
  'private/livre/vo-homme/15-04.mp3': 2.72,
  'private/livre/vo-homme/15-05.mp3': 1.68,
  'private/livre/vo-homme/6-01.mp3': 1.55,
  'private/livre/vo-homme/6-02.mp3': 0.81,
  'private/livre/vo-homme/6-03.mp3': 1.01,
  'private/livre/noel/vo/N-01.mp3': 2.21,
  'private/livre/noel/vo/N-02.mp3': 1.88,
  'private/livre/noel/vo/N-03.mp3': 4.96,
  'private/livre/noel/vo/N-04.mp3': 4.13,
  'private/livre/noel/vo/N-05.mp3': 3.35,
  'private/livre/noel/vo/N-06.mp3': 1.15,
  'private/livre/noel/vo/N15-01.mp3': 4.16,
};

/** Dossier de voix : 'vo-homme' = Paul K (voix de la campagne), 'vo' = Sophie (variante). */
export type DossierVoix = 'vo' | 'vo-homme';

export const fichierVoixLivre = (format: '30' | '15' | '6', id: string, dossier: DossierVoix = 'vo-homme') =>
  `private/livre/${dossier}/${format}-${id}.mp3`;
