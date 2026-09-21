import { Link } from "react-router-dom";
import type { Show } from "../types/Show";
import { toYear } from "../utils/text";
import { useFavoris } from "../contexte/ContexteFavoris";

export default function MovieCard({ show }: { show: Show }) {
  const { basculerFavori, estFavori } = useFavoris();
  const marque = estFavori(show.id);

  return (
    <article className="movie-card">
      {show.image ? (
        <img className="poster-image" src={show.image.medium} alt={show.name} />
      ) : (
        <div className="poster">{show.name.slice(0, 1)}</div>
      )}

      <div>
        <p className="eyebrow">{show.genres[0] ?? "Non classé"}</p>
        <h3>{show.name}</h3>
        <p>{toYear(show.premiered)}</p>
        <Link className="primary-button" to={`/movies/${show.id}`}>
          Voir le détail
        </Link>
        <button className={"favorite-button" + (marque ? " is-favorite" : "")} onClick={() => basculerFavori(show)}>
          {marque ? "Retirer des favoris" : "Ajouter aux favoris"}
        </button>
      </div>
    </article>
  );
}
