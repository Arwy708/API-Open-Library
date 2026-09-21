import MovieCard from "../components/BookCard";
import { useFavoris } from "../contexte/ContexteFavoris";

export default function Favorites() {
  const { listeFavoris } = useFavoris();

  return (
    <section className="panel">
      <p className="eyebrow">Espace personnel</p>
      <h2>Mes favoris</h2>

      {listeFavoris.length > 0 ? (
        <div className="movie-grid">
          {listeFavoris.map((serie) => <MovieCard key={serie.id} show={serie} />)}
        </div>
      ) : (
        <p>Aucun favori pour le moment.</p>
      )}
    </section>
  );
}
