/**
 * features/search/hooks/useLocationSearch.ts
 *
 * Debounced, cached location search backing the persistent search bar.
 * [F-W01, R-WA06]
 *
 * React Query owns caching + dedup here: retyping a query already
 * searched within staleTime serves cached results instead of
 * re-hitting Open-Meteo — meaningful given the API has no key and no
 * documented rate-limit ceiling to budget against.
 */
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { searchLocations } from "../api/geocoding";
import type { GeocodeResult } from "../types";

const DEBOUNCE_MS = 350;
const MIN_QUERY_LENGTH = 2;

export function useLocationSearch() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, DEBOUNCE_MS);

  const {
    data: results,
    isLoading,
    isError,
    error,
  } = useQuery<GeocodeResult[]>({
    // Cache key includes the debounced query so every distinct search
    // term gets its own cache entry rather than overwriting the last.
    queryKey: ["geocode", debouncedQuery],
    queryFn: () => searchLocations(debouncedQuery),
    // Skip the network call below 2 characters — noisy and rarely
    // useful for place names, saves a request on every keystroke.
    enabled: debouncedQuery.trim().length >= MIN_QUERY_LENGTH,
    staleTime: 5 * 60 * 1000, // place names don't change; cache generously
  });

  return {
    query,
    setQuery,
    results: results ?? [],
    isLoading,
    isError,
    error,
  };
}
