import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { Show } from "../types/Show";
import { stripHtml, toYear } from "../utils/text";
import { useFavoris } from "../contexte/ContexteFavoris";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { basculerFavori, estFavori } = useFavoris();

  const [show, setShow] = useState<Show | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadShow() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://api.artic.edu/api/v1/artworks/${id}`);

        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const data = await response.json();
        setShow(data);
      } catch (error) {
        setError("Ce titre est introuvable.");
      } finally {
        setLoading(false);
      }
    }

    loadShow();
  }, [id]);

  if (loading) {
    return <p className="state-message">Chargement de la fiche...</p>;
  }

  if (error || !show) {
    return (
      <section className="panel">
        <p className="eyebrow">Erreur</p>
        <h2>Titre introuvable</h2>
        <p>Aucune ressource ne correspond à l'identifiant {id}.</p>
        <Link className="primary-button" to="/movies">Retour au catalogue</Link>
      </section>
    );
  }

  const marque = estFavori(show.id);

  return (
    <section className="panel">
      <p className="eyebrow">{show.genres.join(" · ") || "Non classé"}</p>
      <h2>{show.name}</h2>
      <p><strong>Première diffusion :</strong> {toYear(show.premiered)}</p>
      <p><strong>Note moyenne :</strong> {show.rating.average ?? "—"}</p>
      <p>{stripHtml(show.summary) || "Aucun résumé disponible."}</p>
      <button
        className={"favorite-button" + (marque ? " is-favorite" : "")}
        onClick={() => basculerFavori(show)}
      >
        {marque ? "Retirer des favoris" : "Ajouter aux favoris"}
      </button>
      <button className="secondary-button" onClick={() => navigate("/movies")}>
        ← Retour aux films
      </button>
    </section>
  );
}
