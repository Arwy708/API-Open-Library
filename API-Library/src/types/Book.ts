/**
 * Ancien type utilisé lorsque le catalogue était local (src/data/movies.ts).
 * Conservé volontairement comme point de comparaison avec les données distantes.
 */
export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
}