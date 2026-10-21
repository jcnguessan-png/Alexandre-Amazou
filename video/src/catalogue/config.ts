/**
 * Catalogue des 12 livres présentés dans la vidéo (ordre d'apparition).
 * « Le Protocole d'accès à la Gloire de Dieu » est volontairement écarté (ouvrage ancien).
 * Voix off Paul K : public/private/catalogue/vo/ (hors Git).
 */
export type Livre = {
  id: string;
  titre: string;
  /** Texte affiché sous le titre. */
  accroche: string;
  /** Phrase dite par la voix (sous-titres). */
  phrase: string;
  /** Chemin dans public/ ; null = couverture provisoire aux couleurs du site. */
  couverture: string | null;
  /** true si l'image est déjà une maquette 3D détourée (pas d'ombre portée rectangulaire). */
  maquette: boolean;
  voix: string;
};

const V = 'private/catalogue/vo/';

export const VO = {
  intro: `${V}intro.mp3`,
  fin: `${V}fin.mp3`,
  avant: `${V}avant.mp3`,
};

export const CATALOGUE: Livre[] = [
  { id: '01', titre: 'La Réalité du Monde des Esprits', accroche: 'Ouvrez les yeux sur le combat invisible.', phrase: 'La Réalité du Monde des Esprits : ouvrez les yeux sur le combat invisible.', couverture: 'livres/realite-monde-esprits-2026.png', maquette: true, voix: `${V}01.mp3` },
  { id: '02', titre: '40 Jours de Combat Spirituel', accroche: 'Un programme de prière, pas à pas.', phrase: 'Quarante jours de combat spirituel : un programme de prière, pas à pas.', couverture: 'livres/40-jours-combat-spirituel.png', maquette: true, voix: `${V}02.mp3` },
  { id: '03', titre: 'Le transfert de l’iniquité', accroche: 'Rompez les chaînes de l’héritage.', phrase: 'Le transfert de l’iniquité : rompez les chaînes de l’héritage.', couverture: 'livres/le-transfert-de-l-iniquite-face.png', maquette: false, voix: `${V}03.mp3` },
  { id: '04', titre: 'Comment préparer et réussir une nouvelle année ?', accroche: 'Ne la subissez plus.', phrase: 'Comment préparer et réussir une nouvelle année : ne la subissez plus !', couverture: 'livres/preparer-et-reussir-une-nouvelle-annee.jpg', maquette: false, voix: `${V}04.mp3` },
  { id: '05', titre: 'Mon Journal de Victoire', accroche: 'Votre compagnon de prière au quotidien.', phrase: 'Mon Journal de Victoire : votre compagnon de prière au quotidien.', couverture: 'livres/mon-journal-de-victoire.png', maquette: false, voix: `${V}05.mp3` },
  { id: '06', titre: 'La Faveur des Pères', accroche: 'Le pouvoir de la bénédiction transmise.', phrase: 'La Faveur des Pères : le pouvoir de la bénédiction transmise.', couverture: 'livres/la-faveur-des-peres-face.png', maquette: false, voix: `${V}06.mp3` },
  { id: '07', titre: 'Les Hommes de la Race de Dieu', accroche: 'Une génération qui porte sa nature.', phrase: 'Les Hommes de la Race de Dieu : une génération qui porte sa nature.', couverture: 'livres/les-hommes-de-la-race-de-dieu-face.png', maquette: false, voix: `${V}07.mp3` },
  { id: '08', titre: 'Le secret des prières non exaucées', accroche: 'Pourquoi certaines restent sans réponse.', phrase: 'Le secret des prières non exaucées : pourquoi certaines restent sans réponse.', couverture: 'livres/la-verite-sur-les-prieres-non-exaucees-face.png', maquette: false, voix: `${V}08.mp3` },
  { id: '09', titre: 'Réussir sa vie', accroche: 'Accomplir le projet de Dieu pour vous.', phrase: 'Réussir sa vie : accomplir le projet de Dieu pour vous.', couverture: 'livres/reussir-sa-vie-face.png', maquette: false, voix: `${V}09.mp3` },
  { id: '10', titre: 'Devenir riche pour Dieu', accroche: 'La richesse au service du Royaume.', phrase: 'Devenir riche pour Dieu : la richesse au service du Royaume.', couverture: 'livres/devenir-riche-pour-dieu-face.png', maquette: false, voix: `${V}10.mp3` },
  { id: '11', titre: 'Commencer et bien finir sa vie', accroche: 'Tenir jusqu’à la dernière ligne.', phrase: 'Commencer et bien finir sa vie : tenir jusqu’à la dernière ligne.', couverture: null, maquette: false, voix: `${V}11.mp3` },
  { id: '12', titre: 'Devenir la meilleure version de soi', accroche: 'Révélez le potentiel que Dieu a mis en vous.', phrase: 'Devenir la meilleure version de soi : révélez le potentiel que Dieu a mis en vous.', couverture: null, maquette: false, voix: `${V}12.mp3` },
];

/** Durées réelles des voix (s), renseignées après génération. */
export const DUREES_CATALOGUE: Record<string, number> = {
  'private/catalogue/vo/01.mp3': 4.60,
  'private/catalogue/vo/02.mp3': 3.66,
  'private/catalogue/vo/03.mp3': 3.60,
  'private/catalogue/vo/04.mp3': 3.93,
  'private/catalogue/vo/05.mp3': 3.63,
  'private/catalogue/vo/06.mp3': 3.80,
  'private/catalogue/vo/07.mp3': 3.86,
  'private/catalogue/vo/08.mp3': 4.45,
  'private/catalogue/vo/09.mp3': 3.00,
  'private/catalogue/vo/10.mp3': 3.81,
  'private/catalogue/vo/11.mp3': 3.95,
  'private/catalogue/vo/12.mp3': 4.26,
  'private/catalogue/vo/avant.mp3': 9.57,
  'private/catalogue/vo/fin.mp3': 6.08,
  'private/catalogue/vo/intro.mp3': 4.67,
};
