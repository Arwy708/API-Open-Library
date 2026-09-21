import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import type { Book } from "../types/Book";
import { searchBooks } from "../services/openLibrary";

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function loadBooks() {
      try {
        const data = await searchBooks("dune");

        setBooks(data.docs);
      } catch {
        setError("Impossible de charger le catalogue.");
      } finally {
        setLoading(false);
      }
    }

    loadBooks();
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h2>Livres</h2>
        </div>

        <p>
          {filteredBooks.length} / {books.length} livres affichés
        </p>

        <input
          className="champ-saisie"
          type="text"
          placeholder="Rechercher un livre..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      {filteredBooks.length > 0 ? (
        <div className="movie-grid">
          {filteredBooks.map((book) => (
            <BookCard key={book.key} book={book} />
          ))}
        </div>
      ) : (
        <p className="state-message">
          Aucun livre ne correspond à votre recherche.
        </p>
      )}
    </section>
  );
}