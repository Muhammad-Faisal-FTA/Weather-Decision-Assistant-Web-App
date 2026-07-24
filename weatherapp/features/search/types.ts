/**
 * features/search/types.ts
 * Shared types for the search feature. [F-W01]
 */

/** Raw shape returned by Open-Meteo's geocoding search. [R-WA06] */
export interface GeocodeResult {
  id: number;
  name: string;
  country: string;
  admin1?: string; // state/province, when the API provides one
  latitude: number;
  longitude: number;
}

/** Raw shape returned by Nominatim reverse geocoding. [R-WA07] */
export interface ReverseGeocodeResult {
  displayName: string;
  latitude: number;
  longitude: number;
}

/**
 * Normalized shape both forward and reverse geocoding resolve to,
 * and what LocationContext stores. Keeps every downstream consumer
 * (weather hooks, forecast cards) agnostic to which geocoding path
 * produced the location.
 */
export interface SelectedLocation {
  displayName: string;
  latitude: number;
  longitude: number;
}
