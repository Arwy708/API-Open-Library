import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { BookDetailsType } from "../types/Book";

export default function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [book, setBook] = useState<BookDetailsType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBook() {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        // Décodage du paramètre id (ex: "works%2FOL893415W" -> "works/OL893415W")
        const decodedId = decodeURIComponent(id);
        const response = await fetch(`https://openlibrary.org/${decodedId}.json`);

        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const data: BookDetailsType = await response.json();
        setBook(data);
      } catch {
        setError("Ce livre est introuvable.");
      } finally {
        setLoading(false);
      }
    }

    loadBook();
  }, [id]);

  if (loading) {
    return <p className="state-message">Chargement du livre...</p>;
  }

  if (error || !book) {
    return (
      <section className="panel">
        <p className="eyebrow">Erreur</p>
        <h2>Livre introuvable</h2>
        <p>Aucune ressource ne correspond à cet identifiant.</p>
        <Link className="primary-button" to="/books">
          Retour au catalogue
        </Link>
      </section>
    );
  }

  // Extraction propre de la description
  const descriptionText =
    typeof book.description === "string"
      ? book.description
      : book.description?.value ?? "Aucune description disponible.";

  // Récupération de l'image de couverture si disponible
  const coverUrl = book.covers?.[0]
    ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
    : null;

  return (
    <section className="panel">
      <p className="eyebrow">
        {book.subjects?.slice(0, 3).join(" · ") || "Livre"}
      </p>

      <h2>{book.title}</h2>

      {coverUrl && (
        <img
          src={coverUrl}
          alt={`Couverture de ${book.title}`}
          className="book-cover"
        />
      )}

      <p>
        <strong>Première publication :</strong>{" "}
        {book.first_publish_year ?? "Inconnue"}
      </p>

      <p>{descriptionText}</p>

      <button className="secondary-button" onClick={() => navigate("/books")}>
        ← Retour aux livres
      </button>
    </section>
  );
}
