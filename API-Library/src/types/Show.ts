/**
 * Type décrivant les champs de l'API TVmaze réellement utilisés par Movie Explorer.
 * Documentation : https://www.tvmaze.com/api
 *
 * Certains champs peuvent valoir null : l'API ne garantit pas une image
 * ou un résumé pour chaque ressource.
 */
export interface Show {
  id: number;
  name: string;
  premiered: string | null;
  genres: string[];
  summary: string | null;
  image: { medium: string; original: string } | null;
  rating: { average: number | null };
}
