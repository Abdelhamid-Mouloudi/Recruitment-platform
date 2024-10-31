export interface Offer {
  title: string;
  description: string;
  contractType?: string;  // Pour les offres d'emploi
  durationInMonths?: number;  // Pour les offres de stage
}
