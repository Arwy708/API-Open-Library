import { useState } from "react";
import BookCard from "../components/BookCard";
import { searchBooks } from "../services/openLibrary";
import { useApi } from "../hooks/useApi";

export default function Books() {
  const [searchTerm, setSearchTerm] = useState("");
  const [author, setAuthor] = useState("");

  const { data, loading, error } = useApi(() => searchBooks("dune"), []);
  const books = data?.docs ?? [];

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (book.author_name?.[0] ?? "").toLowerCase().includes(author.toLowerCase())
  );

  if (loading) {
    return <p className="state-message">Chargement du catalogue...</p>;
  }

  if (error) {
    return <p className="state-message error">Impossible de charger le catalogue.</p>;
  }

  return (
    <section>
      <div className="section-heading">
        <div>
          <p className="eyebrow">Catalogue</p>
          <h2>Livres</h2>
        </div>

        <p>{filteredBooks.length} / {books.length} livres affichés</p>

        <input
          className="champ-saisie"
          type="text"
          placeholder="Rechercher un livre..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <input
          className="champ-saisie"
          type="text"
          placeholder="Rechercher par auteur..."
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        />
      </div>

      {filteredBooks.length > 0 ? (
        <div className="movie-grid">
          {filteredBooks.map((book) => (
            <BookCard key={book.key} book={book} />
          ))}
        </div>
      ) : (
        <p className="state-message">Aucun livre ne correspond à votre recherche.</p>
      )}
    </section>
  );
}