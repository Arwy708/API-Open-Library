import { NavLink } from "react-router-dom";
import { useFavoris } from "../contexte/ContexteFavoris";

const navClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? "nav-button active" : "nav-button";

export default function Header() {
  const { listeFavoris } = useFavoris();

  return (
    <header className="site-header">
      <div>
        <p className="eyebrow">API Bibliotheque</p>
        <h1>Open Library</h1>
      </div>
      <nav className="nav">
        <NavLink to="/" end className={navClass}>Accueil</NavLink>
        <NavLink to="/books" className={navClass}>Livres</NavLink>
        <NavLink to="/favorites" className={navClass}>Favoris ({listeFavoris.length})</NavLink>
        <NavLink to="/suggest" className={navClass}>Proposer un livre</NavLink>
        <NavLink to="/about" className={navClass}>À propos</NavLink>
      </nav>
    </header>
  );
}
