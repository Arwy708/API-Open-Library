import BookCard from "../components/BookCard";
import { useFavoris } from "../contexte/ContexteFavoris";

export default function Favorites() {
  const { listeFavoris } = useFavoris();

  return (
    <section>
      <p className="eyebrow">Espace personnel</p>

      <h2>Mes favoris</h2>

      {listeFavoris.length > 0 ? (
        <div className="movie-grid">
          {listeFavoris.map((book) => (
            <BookCard key={book.key} book={book} />
          ))}
        </div>
      ) : (
        <p className="state-message">
          Vous n'avez aucun livre en favoris.
        </p>
      )}
    </section>
  );
}