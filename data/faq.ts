export type FaqItem = { question: string; answer: string };

/**
 * Questions fréquentes — affichées sur l'accueil ET injectées en JSON-LD
 * (FAQPage). Rédigées pour les requêtes de marque et thématiques
 * (« Pasteur Alexandre Amazou », livres, ABMCI, enseignements…).
 */
export const faq: FaqItem[] = [
  {
    question: 'Qui est le Pasteur Alexandre AMAZOU ?',
    answer:
      "Alexandre AMAZOU est un pasteur, enseignant biblique et Bishop ivoirien, fondateur de l'Alliance Biblique Missionnaire Côte d'Ivoire (ABMCI) en 2003. Auteur de onze ouvrages, il forme des leaders chrétiens à travers le monde, avec la vision de transformer des gens ordinaires en de véritables leaders.",
  },
  {
    question: 'Où suivre les enseignements du Pasteur Alexandre AMAZOU ?',
    answer:
      "Tous ses enseignements bibliques sont disponibles gratuitement sur sa chaîne YouTube officielle et sur la page « Mes enseignements » du site. Il anime également des podcasts accessibles sur Spotify, Amazon Music et les principales plateformes.",
  },
  {
    question: 'Quels livres a écrit le Pasteur Alexandre AMAZOU ?',
    answer:
      "Il est l'auteur de onze ouvrages sur la foi, le leadership, la prière, le combat spirituel et la réussite selon Dieu — parmi lesquels « La Réalité du Monde des Esprits », « 40 Jours de Combat Spirituel » et « La Faveur des Pères ». Le catalogue complet et les modalités de commande figurent sur la page « Mes livres ».",
  },
  {
    question: "Qu'est-ce que l'ABMCI ?",
    answer:
      "L'ABMCI (Alliance Biblique Missionnaire Côte d'Ivoire) est l'Église fondée par le Pasteur Alexandre AMAZOU en 2003, dont le siège est la Cathédrale de Riviera Palmeraie à Cocody, Abidjan. Le ministère est présent sur quatre continents et plus de dix pays.",
  },
  {
    question: 'Comment contacter le Pasteur Alexandre AMAZOU ou soutenir le ministère ?',
    answer:
      "Vous pouvez écrire à l'équipe pastorale via la page « Me contacter » ou rejoindre la chaîne WhatsApp officielle. Pour soutenir le ministère, la page « Faire un don » réunit les coordonnées Mobile Money, virement bancaire et le don en ligne par carte.",
  },
];
