/**
 * Campagne « Comment préparer et réussir une nouvelle année ? » (novembre → janvier).
 * Tout ce qui change pendant la campagne se règle ici : liens, dates, avis.
 * Page : /nouvelle-annee
 */

export const campagne = {
  slugLivre: 'comment-preparer-et-reussir-une-nouvelle-annee',
  slugJournal: 'mon-journal-de-victoire',

  /** Liens Amazon. Pour mesurer les ventes, remplacer par les liens Amazon Attribution. */
  amazon: {
    broche: 'https://www.amazon.fr/dp/B0G349RCYM',
    relie: 'https://www.amazon.fr/dp/B0G349G3NN',
    /** Page de la série : le livre et le journal côte à côte (= « le pack »). */
    serie: 'https://www.amazon.fr/dp/B0G6MR161K',
    canada: 'https://www.amazon.ca/dp/B0G349RCYM',
    belgique: 'https://www.amazon.com.be/dp/B0G349RCYM',
  },

  prix: { broche: '30,00 €', relie: '34,99 €', journal: '17,05 €' },

  /** Note visible sur Amazon.fr (à mettre à jour). */
  note: { valeur: '4,6', nombreAvis: 7 },

  /**
   * Avis lecteurs Amazon à citer (texte exact + prénom ou initiale). Section masquée tant que vide.
   * Ne jamais inventer d'avis.
   */
  avis: [] as { texte: string; auteur: string }[],

  /** Direct du Pasteur sur le thème du livre — afficher dès que la date est fixée. */
  direct: null as null | { date: string; heure: string; plateforme: string; lien?: string },

  /** Séance de dédicace à Abidjan (décembre) — afficher dès que fixée. */
  dedicace: null as null | { date: string; heure: string; lieu: string; adresse?: string },
};
