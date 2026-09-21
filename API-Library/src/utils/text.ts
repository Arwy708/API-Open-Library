/**
 * L'API TVmaze renvoie des résumés contenant des balises HTML (<p>, <b>...).
 * Nous ne les injectons pas telles quelles dans le DOM : nous les retirons
 * pour n'afficher que du texte.
 */
export function stripHtml(value: string | null): string {
  if (!value) {
    return "";
  }
  return value.replace(/<[^>]*>/g, "").trim();
}

/** Renvoie l'année d'une date "2014-11-07", ou un tiret si la date est absente. */
export function toYear(premiered: string | null): string {
  if (!premiered) {
    return "—";
  }
  return premiered.slice(0, 4);
}
