import { createContext, useContext, useState, type ReactNode } from "react";
import type { Book } from "../types/Book";

interface ValeurFavoris {
  listeFavoris: Book[];
  basculerFavori: (book: Book) => void;
  estFavori: (identifiant: string) => boolean;
}

const ContexteFavoris = createContext<ValeurFavoris | null>(null);

export const FournisseurFavoris = ({ children }: { children: ReactNode }) => {
  const [listeFavoris, setListeFavoris] = useState<Book[]>([]);

  const basculerFavori = (book: Book) => {
    setListeFavoris((ancienneListe) => {
      const dejaPresent = ancienneListe.find((element) => element.key === book.key);

      if (dejaPresent) {
        return ancienneListe.filter((element) => element.key !== book.key);
      }

      return ancienneListe.concat(book);
    });
  };

  const estFavori = (identifiant: string) =>
    listeFavoris.filter((element) => element.key === identifiant).length > 0;

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
