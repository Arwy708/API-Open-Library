const API_URL = "https://openlibrary.org";

export async function searchBooks(query: string) {
  const response = await fetch(
    `${API_URL}/search.json?q=${encodeURIComponent(query)}&limit=20&fields=key,title,author_name,first_publish_year,cover_i`
  );

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des livres");
  }

  return response.json();
}