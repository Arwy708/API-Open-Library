import type { Movie } from "../types/Book";

/**
 * Catalogue local historique. Il n'alimente plus l'application depuis le TP
 * de consommation d'API, mais il reste disponible pour comparer l'ancien
 * fonctionnement et le nouveau.
 */
export const movies: Movie[] = [
  { id: 1, title: "Interstellar", year: 2014, genre: "Science-fiction", description: "Une équipe d'explorateurs traverse un trou de ver à la recherche d'un nouvel avenir pour l'humanité." },
  { id: 2, title: "Inception", year: 2010, genre: "Science-fiction", description: "Un spécialiste de l'extraction de secrets par les rêves reçoit une mission particulièrement complexe." },
  { id: 3, title: "Dune", year: 2021, genre: "Science-fiction", description: "Paul Atréides rejoint Arrakis, planète au cœur d'enjeux politiques et économiques majeurs." },
  { id: 4, title: "The Truman Show", year: 1998, genre: "Comédie dramatique", description: "Truman découvre progressivement que son quotidien cache une réalité bien différente." }
];
