import type { Book, BookDetailsType } from "../types/Book";

const API_URL = import.meta.env.VITE_API_URL;

interface OpenLibraryResponse {
  numFound: number;
  docs: Book[];
}
// chercher un livre
export async function searchBooks(query: string): Promise<OpenLibraryResponse> {
  const response = await fetch(
    `${API_URL}/search.json?q=${encodeURIComponent(query)}&limit=20&fields=key,title,author_name,first_publish_year,cover_i`
  );

  if (!response.ok) throw new Error("Erreur API");

  return response.json();
}

// chercher un livre par son ID

export async function getBookDetails(id: string): Promise<BookDetailsType> {
  const response = await fetch(`${API_URL}/works/${id}.json`);

  if (!response.ok) throw new Error("Livre introuvable");

  return response.json();
}

