import { useEffect, useState } from "react";

export function useApi<T>(fetcher: () => Promise<T>, deps: unknown[]) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetcher()
      .then(setData)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, deps);

  return { data, loading, error };
}