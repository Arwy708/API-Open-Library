import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="hero">
      <p className="eyebrow">Projet Movie Explorer</p>
      <h2>Découvrez notre sélection de titres</h2>
      <p>
        Cette version reprend les séances précédentes : pages et navigation, route
        dynamique, page 404, puis chargement du catalogue depuis une API distante
        avec gestion du chargement et des erreurs.
      </p>
      <Link className="primary-button" to="/movies">Voir le catalogue</Link>
    </section>
  );
}
