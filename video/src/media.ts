/**
 * Médias externes à brancher au fur et à mesure (fichiers dans public/private/, non commités).
 * Tant qu'un média vaut null, la vidéo affiche un plan d'attente stylisé à la place.
 *
 *   public/private/broll/<id>.mp4   ← plans IA (Higgsfield / Veo), voir PROMPTS.md
 *   (déclarer ici le chemin relatif à public/, ex. 'private/broll/bible.mp4')
 *   public/private/vo-16x9.mp3      ← voix off ElevenLabs (version 60 s)
 *   public/private/vo-9x16.mp3      ← voix off ElevenLabs (version 30 s)
 *   public/private/pasteur-fin.mp3  ← « Votre histoire n'est pas terminée » dite par le Pasteur
 *   public/private/musique.mp3      ← musique 60 s (ElevenLabs Music), + musique-9x16.mp3 (30 s)
 */
export const MEDIA = {
  broll: {
    bible: 'private/broll/bible.mp4' as string | null, // B1 — Bible, pages qui tournent dans la lumière
    abidjan: 'private/broll/abidjan.jpg' as string | null, // B2 — Abidjan au lever du soleil, vue drone
    foule: 'private/broll/foule.mp4' as string | null, // B3 — foule en louange, de dos, contre-jour (16:9)
    foule9x16: 'private/broll/foule-9x16.mp4' as string | null, // B3 — même plan en vertical (version 9:16)
    pupitre: 'private/broll/pupitre.mp4' as string | null, // B4 — livre fermé sur un pupitre, lumière entre les pages
  },
  vo16x9: 'private/vo-16x9.mp3' as string | null,
  vo9x16: 'private/vo-9x16.mp3' as string | null,
  pasteurFin: null as string | null,
  musique: 'private/musique.mp3' as string | null, // 60 s, version 16:9
  musique9x16: 'private/musique-9x16.mp3' as string | null, // 30 s, version 9:16
};

/** Affiche le nom du plan IA attendu sur les plans d'attente (à passer à false pour le rendu final). */
export const SHOW_PLACEHOLDER_LABELS = false;
