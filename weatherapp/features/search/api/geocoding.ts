/**
 * features/search/api/geocoding.ts
 *
 * Data-access layer for location search. [F-W01]
 * Wraps two independent, keyless APIs:
 *   - Open-Meteo Geocoding  -> forward search (name -> coordinates)   [R-WA06]
 *   - Nominatim (OSM)       -> reverse geocoding (coordinates -> name) [R-WA07]
 *
 * Kept as plain fetch functions with no React and no caching logic,
 * so they can be unit-tested in isolation (per the TRD testing
 * strategy) and reused outside a hook if needed later.
 */

import type { GeocodeResult, ReverseGeocodeResult } from "../types";

const OPEN_METEO_GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const NOMINATIM_REVERSE_URL = "https://nominatim.openstreetmap.org/reverse";

/**
 * Forward geocoding — resolves a free-text query (e.g. "Lahore") to a
 * list of candidate locations. Powers the search bar's autocomplete
 * dropdown. [R-WA06]
 *
 * Throws on network/HTTP failure. The caller (useLocationSearch) is
 * responsible for surfacing this as a scoped, non-blocking error —
 * a failed search must never affect any other dashboard widget. [R-WA18]
 */
export async function searchLocations(query: string): Promise<GeocodeResult[]> {
  if (!query.trim()) return [];

  const url = new URL(OPEN_METEO_GEO_URL);
  url.searchParams.set("name", query);
  url.searchParams.set("count", "5"); // cap suggestions so the dropdown stays scannable
  url.searchParams.set("language", "en");

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error(`Geocoding request failed with status ${res.status}`);
  }

  const data = await res.json();

  // Open-Meteo omits the `results` key entirely when there are no
  // matches, rather than returning an empty array — normalize that
  // here so every caller can rely on always getting an array back.
  return data.results ?? [];
}

/**
 * Reverse geocoding — resolves device coordinates to a human-readable
 * place name, used by a future "use my current location" affordance. [R-WA07]
 *
 * Note: Nominatim's usage policy caps this at 1 request/second and
 * asks for a descriptive User-Agent in production. Browsers block
 * setting a custom User-Agent client-side, so if this call sees
 * meaningful traffic it should move behind a small server-side proxy
 * that can set the header correctly — flagged here rather than
 * silently shipped non-compliant.
 */
export async function reverseGeocode(
  latitude: number,
  longitude: number
): Promise<ReverseGeocodeResult> {
  const url = new URL(NOMINATIM_REVERSE_URL);
  url.searchParams.set("lat", String(latitude));
  url.searchParams.set("lon", String(longitude));
  url.searchParams.set("format", "json");

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error(`Reverse geocoding failed with status ${res.status}`);
  }

  const data = await res.json();

  return {
    displayName: data.display_name ?? "Unknown location",
    latitude,
    longitude,
  };
}
