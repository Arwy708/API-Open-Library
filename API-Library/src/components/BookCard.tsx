import { Link } from "react-router-dom";
import type { Book } from "../types/Book";
import { useFavoris } from "../contexte/ContexteFavoris";

export default function BookCard({ book }: { book: Book }) {
  const { basculerFavori, estFavori } = useFavoris();

  const marque = estFavori(book.key);

  return (
    <article className="movie-card">
      {book.cover_i ? (
        <img
          className="poster-image"
          src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
          alt={book.title}
        />
      ) : (
        <div className="poster">
          {book.title.slice(0, 1)}
        </div>
      )}

      <div>
        <p className="eyebrow">
          {book.author_name?.[0] ?? "Auteur inconnu"}
        </p>

        <h3>{book.title}</h3>

        <p>
          {book.first_publish_year ?? "Date inconnue"}
        </p>

        <Link
          className="primary-button"
          to={`/books/${encodeURIComponent(book.key)}`}
        >
          Voir le détail
        </Link>

        <button
          className={
            "favorite-button" + (marque ? " is-favorite" : "")
          }
          onClick={() => basculerFavori(book)}
        >
          {marque
            ? "Retirer des favoris"
            : "Ajouter aux favoris"}
        </button>
      </div>
    </article>
  );
}