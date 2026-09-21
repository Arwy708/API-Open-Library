import { createContext, useContext, useState, type ReactNode } from "react";
import type { Show } from "../types/Show";

interface ValeurFavoris {
  listeFavoris: Show[];
  basculerFavori: (serie: Show) => void;
  estFavori: (identifiant: number) => boolean;
}

const ContexteFavoris = createContext<ValeurFavoris | null>(null);

export const FournisseurFavoris = ({ children }: { children: ReactNode }) => {
  const [listeFavoris, setListeFavoris] = useState<Show[]>([]);

  const basculerFavori = (serie: Show) => {
    setListeFavoris((ancienneListe) => {
      const dejaPresent = ancienneListe.find((element) => element.id === serie.id);

      if (dejaPresent) {
        return ancienneListe.filter((element) => element.id !== serie.id);
      }

      return ancienneListe.concat(serie);
    });
  };

  const estFavori = (identifiant: number) =>
    listeFavoris.filter((element) => element.id === identifiant).length > 0;

  const valeur = { listeFavoris, basculerFavori, estFavori };

  return <ContexteFavoris.Provider value={valeur}>{children}</ContexteFavoris.Provider>;
};

export const useFavoris = () => {
  const valeur = useContext(ContexteFavoris);

  if (valeur === null) {
    throw new Error("useFavoris doit être utilisé dans <FournisseurFavoris>.");
  }

  return valeur;
};
