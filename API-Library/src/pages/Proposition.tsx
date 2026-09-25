import { useState, type FormEvent } from "react";

export default function Proposition() {
  const [titre, setTitre] = useState("");
  const [auteur, setAuteur] = useState("");
  const [email, setEmail] = useState("");
  const [envoye, setEnvoye] = useState(false);

  const envoyer = (e: FormEvent) => {
    e.preventDefault();

    if (!titre.trim() || !auteur.trim() || !email.includes("@")) {
      setEnvoye(false);
      return;
    }

    setEnvoye(true);
    setTitre("");
    setAuteur("");
    setEmail("");
  };

  return (
    <section>
      <h2>Proposer un livre</h2>

      <form onSubmit={envoyer}>
        <input
          className="champ-saisie"
          placeholder="Titre du livre"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
        />
        {!titre.trim() && <p>Il manque le titre.</p>}

        <input
          className="champ-saisie"
          placeholder="Auteur"
          value={auteur}
          onChange={(e) => setAuteur(e.target.value)}
        />
        {!auteur.trim() && <p>Il manque l'auteur.</p>}

        <input
          className="champ-saisie"
          placeholder="Votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {!email.includes("@") && <p>Il faut un email valide.</p>}

        <button type="submit">Envoyer</button>

        {envoye && <p>Proposition envoyée !</p>}
      </form>
    </section>
  );
}
