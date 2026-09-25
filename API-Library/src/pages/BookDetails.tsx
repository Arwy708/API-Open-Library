import { Link, useParams } from "react-router-dom";
import { getBookDetails } from "../services/openLibrary";
import { useApi } from "../hooks/useApi";

export default function BookDetails() {
  const { id } = useParams();
  const { data: book, error } = useApi(() => getBookDetails(id!), [id]);

  if (error) {
    return (
      <section className="panel">
        <h2>Livre introuvable</h2>
        <Link to="/books">Retour au catalogue</Link>
      </section>
    );
  }

  if (!book) {
    return <p className="state-message">Chargement...</p>;
  }

  const description =
    typeof book.description === "string" ? book.description : book.description?.value;

  return (
    <section className="panel">
      <p>{book.subjects?.slice(0, 3).join(" · ") || "Livre"}</p>
      <h2>{book.title}</h2>

      {book.covers?.[0] && (
        <img
          className="book-cover"
          src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`}
          alt={`Couverture de ${book.title}`}
        />
      )}

      <p><strong>Première publication :</strong> {book.first_publish_year ?? "Inconnue"}</p>
      <p>{description || "Aucune description disponible."}</p>

      <Link to="/books">← Retour aux livres</Link>
    </section>
  );
}