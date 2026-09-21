/**
 * Ancien type utilisé lorsque le catalogue était local (src/data/movies.ts).
 * Conservé volontairement comme point de comparaison avec les données distantes.
 */
export interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string;
  description: string;
}
