/** Options du formulaire de contact — partagées entre le formulaire (client) et l'action serveur. */

export const INVITATION_SUBJECT = 'invitation-conference';

export const subjectValues = [
  'invitation-conference',
  'rdv-pastoral',
  'demande-presse',
  'partenariat',
  'question-doctrinale',
  'temoignage',
  'autre',
] as const;

export const subjectLabels: Record<(typeof subjectValues)[number], string> = {
  'invitation-conference': 'Inviter le Pasteur (culte, conférence, événement)',
  'rdv-pastoral': 'Rendez-vous pastoral',
  'demande-presse': 'Demande presse / média',
  partenariat: 'Partenariat',
  'question-doctrinale': 'Question doctrinale',
  temoignage: 'Témoignage',
  autre: 'Autre',
};

export const eventTypeValues = [
  'culte',
  'conference',
  'seminaire',
  'evangelisation',
  'retraite',
  'leadership',
  'jeunesse',
  'media',
  'ceremonie',
  'autre',
] as const;

export const eventTypeLabels: Record<(typeof eventTypeValues)[number], string> = {
  culte: 'Culte / service dominical',
  conference: 'Conférence / convention',
  seminaire: 'Séminaire / formation biblique',
  evangelisation: 'Croisade / campagne d’évangélisation',
  retraite: 'Retraite / camp',
  leadership: 'Rencontre de pasteurs et leaders',
  jeunesse: 'Rassemblement de jeunesse',
  media: 'Émission média (radio, TV, podcast)',
  ceremonie: 'Cérémonie (consécration, dédicace, mariage…)',
  autre: 'Autre',
};

export const audienceValues = [
  'Moins de 100',
  '100 à 500',
  '500 à 1 000',
  '1 000 à 5 000',
  'Plus de 5 000',
] as const;

export const logisticsValues = ['transport', 'hebergement', 'restauration', 'visa'] as const;

export const logisticsLabels: Record<(typeof logisticsValues)[number], string> = {
  transport: 'Transport (billets)',
  hebergement: 'Hébergement',
  restauration: 'Restauration',
  visa: 'Lettre d’invitation / visa',
};
