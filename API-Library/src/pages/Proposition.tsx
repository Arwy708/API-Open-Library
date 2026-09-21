import { useState } from "react";

const formulaireVide = { titre: "", annee: "", categorie: "", courriel: "" };

const verifierChamps = (saisie: typeof formulaireVide) => {
  const problemes: Record<string, string> = {};
  const anneeActuelle = new Date().getFullYear();
  const anneeNumerique = parseInt(saisie.annee, 10);

  if (saisie.titre.trim().length < 2) problemes.titre = "Au moins 2 caractères.";

  if (saisie.annee.length !== 4 || Number.isNaN(anneeNumerique))
    problemes.annee = "4 chiffres attendus.";
  else if (anneeNumerique < 1900 || anneeNumerique > anneeActuelle)
    problemes.annee = "Entre 1900 et cette année.";

  if (!saisie.categorie) problemes.categorie = "Choisissez un genre.";
  if (!/^\S+@\S+\.\S+$/.test(saisie.courriel)) problemes.courriel = "Email invalide.";

  return problemes;
};

export default function Proposition() {
  const [saisie, setSaisie] = useState(formulaireVide);
  const [visites, setVisites] = useState<Record<string, boolean>>({});
  const [envoye, setEnvoye] = useState(false);

  const problemes = verifierChamps(saisie);
  const formulaireValide = Object.keys(problemes).length === 0;

  const majChamp = (evenement: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const champ = evenement.target.name;
    const contenu = evenement.target.value;
    setSaisie((ancienneSaisie) => ({ ...ancienneSaisie, [champ]: contenu }));
  };

  const marquerVisite = (evenement: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const champ = evenement.target.name;
    setVisites((anciennesVisites) => ({ ...anciennesVisites, [champ]: true }));
  };

  const envoyerFormulaire = (evenement: React.FormEvent) => {
    evenement.preventDefault();
    setSaisie(formulaireVide);
    setVisites({});
    setEnvoye(true);
  };

  return (
    <section>
      <h2>Proposer un titre</h2>
      <form onSubmit={envoyerFormulaire}>
        <div>
          <label>Titre</label>
          <input className="champ-saisie" name="titre" value={saisie.titre} onChange={majChamp} onBlur={marquerVisite} />
          {visites.titre && problemes.titre && <p>{problemes.titre}</p>}
        </div>
        <div>
          <label>Année</label>
          <input className="champ-saisie" name="annee" value={saisie.annee} onChange={majChamp} onBlur={marquerVisite} />
          {visites.annee && problemes.annee && <p>{problemes.annee}</p>}
        </div>
        <div>
          <label>Genre</label>
          <select className="champ-saisie" name="categorie" value={saisie.categorie} onChange={majChamp} onBlur={marquerVisite}>
            <option value="">Choisir un genre</option>
            {["Action", "Comedy", "Drama", "Horror"].map((categorie) => (
              <option key={categorie} value={categorie}>{categorie}</option>
            ))}
          </select>
          {visites.categorie && problemes.categorie && <p>{problemes.categorie}</p>}
        </div>
        <div>
          <label>Email</label>
          <input className="champ-saisie" name="courriel" value={saisie.courriel} onChange={majChamp} onBlur={marquerVisite} />
          {visites.courriel && problemes.courriel && <p>{problemes.courriel}</p>}
        </div>
        <button type="submit" disabled={!formulaireValide}>Envoyer</button>
        {envoye && <p>Proposition envoyée.</p>}
      </form>
    </section>
  );
}
