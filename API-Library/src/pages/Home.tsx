import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="hero">
      <p className="eyebrow">Projet Open Library</p>
      <h2>Découvrez notre sélection de Livres</h2>
      <p>
        Voici une sélection de livres que vous pouvez explorer. Vous pouvez également rechercher des livres spécifiques et les ajouter à votre liste de favoris pour les retrouver facilement plus tard.
      </p>
      <Link className="primary-button" to="/books">Voir la bibliotheque</Link>
    </section>
  );
}
