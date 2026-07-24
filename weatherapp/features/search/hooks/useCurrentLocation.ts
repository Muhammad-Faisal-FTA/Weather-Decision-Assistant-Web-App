/**
 * features/search/hooks/useCurrentLocation.ts
 *
 * Wraps the browser Geolocation API + reverseGeocode() into a single
 * "use my location" action. [R-WA07]
 *
 * Kept separate from useLocationSearch — that hook is about typed
 * queries, this one is about device coordinates. Different trigger,
 * different failure modes (permission denial vs. no search results),
 * so splitting them keeps each hook's error handling legible instead
 * of one hook branching on "which kind of lookup is this."
 */
import { useState } from "react";
import { reverseGeocode } from "../api/geocoding";
import { useLocation } from "@/context/LocationContext";

interface UseCurrentLocationResult {
  locate: () => void;
  isLocating: boolean;
  error: string | null;
}

export function useCurrentLocation(): UseCurrentLocationResult {
  const { setLocation } = useLocation();
  const [isLocating, setIsLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function locate() {
    if (!("geolocation" in navigator)) {
      setError("Geolocation isn't supported by this browser.");
      return;
    }

    setIsLocating(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const result = await reverseGeocode(latitude, longitude);
          setLocation(result);
        } catch {
          // Scoped failure: geolocation itself succeeded, only the
          // reverse-geocode lookup failed. User's location IS known,
          // just not its name — so this is a real, narrow error
          // message rather than a generic "something went wrong." [R-WA18]
          setError("Found your location, but couldn't look up its name. Try searching instead.");
        } finally {
          setIsLocating(false);
        }
      },
      (geoError) => {
        setIsLocating(false);
        // Permission denial is the overwhelmingly common failure
        // case here — message it specifically rather than lumping
        // it in with generic geolocation errors. [R-WA18]
        setError(
          geoError.code === geoError.PERMISSION_DENIED
            ? "Location access was denied. You can still search manually."
            : "Couldn't get your location right now."
        );
      },
      { timeout: 10000 }
    );
  }

  return { locate, isLocating, error };
}
