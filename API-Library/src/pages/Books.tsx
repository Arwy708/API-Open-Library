import { useEffect, useState } from "react";
import MovieCard from "../components/BookCard";
import type { Show } from "../types/Show";

export default function Movies() {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // état de ma recherche
  const [searchTerm, setSearchTerm] = useState("");
  const [searchGenre, setSearchGenre] = useState("");

  const listeGenres = Array.from(new Set(shows.map((show) => show.genres).flat())).sort();

  // filtrer par genre
  const filteredShows = shows.filter((show)=>
    show.name.toLowerCase().includes(searchTerm.toLowerCase())
    && show.genres.some((genre) => genre.toLowerCase().includes(searchGenre.toLowerCase()))
  );

  useEffect(() => {
    async function loadShows() {
      try {
        const response = await fetch("https://openlibrary.org/search.json?q=dune&limit=20&fields=key,title,author_name,first_publish_year,cover_i");

        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const data = await response.json();
        setShows(data);
      } catch (error) {
        setError("Impossible de charger le catalogue.");
      } finally {
        setLoading(false);
      }
    }

    loadShows();
  }, []);

  if (loading) {
    return <p className="state-message">Chargement du catalogue...</p>;
  }

  if (error) {
    return <p className="state-message error">{error}</p>;
  }

  return (
    <section>
      <div className="section-heading">
        <div>
          <p className="eyebrow">Catalogue</p>
          <h2>Films</h2>
        </div>
        <p>{filteredShows.length} / {shows.length} titres affichés</p>

        <input className="champ-saisie"
        type="text" 
        placeholder="Rechercher un film..." 
        onChange={(event) => 
          setSearchTerm(event.target.value)}
          value ={searchTerm}
        />
        <select className="champ-saisie"
          onChange={(event) =>
            setSearchGenre(event.target.value)}
            value={searchGenre}
            >
            <option value="">Tous les genres</option>
            {listeGenres.map((nomGenre) => <option key={nomGenre} value={nomGenre}>{nomGenre}</option>)}
            </select>
      </div>

      {filteredShows.length > 0 ? (
        <div className="movie-grid">
          {filteredShows.map((serie) => <MovieCard key={serie.id} show={serie} />)}
        </div>
      ) : (
        <p className="state-message">Aucun titre ne correspond à votre recherche.</p>
      )}
    </section>
  );
}
