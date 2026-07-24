"use client";

/**
 * context/LocationContext.tsx
 *
 * Single source of truth for "what location is the dashboard
 * currently showing." Supports the full weather/forecast requirement
 * range [R-WA06 - R-WA12], since every one of those widgets needs to
 * know the same current location.
 *
 * Written to by SearchBar (features/search); read by every weather
 * widget built in upcoming sprint steps (current weather, daily/
 * weekly/monthly forecast, recommendations). Centralizing this here
 * avoids each widget independently tracking "what location am I
 * showing" and drifting out of sync with the others — a bug class
 * that's easy to introduce with prop-drilling and hard to debug later.
 */
import { createContext, useContext, useState, ReactNode } from "react";
import type { SelectedLocation } from "@/features/search/types";

interface LocationContextValue {
  location: SelectedLocation | null;
  setLocation: (location: SelectedLocation) => void;
}

const LocationContext = createContext<LocationContextValue | undefined>(
  undefined
);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<SelectedLocation | null>(null);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

/**
 * Throws when used outside <LocationProvider> — fails loudly at
 * development time rather than silently returning undefined to a
 * widget that would then be unable to fetch weather data at all.
 */
export function useLocation(): LocationContextValue {
  const ctx = useContext(LocationContext);
  if (!ctx) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return ctx;
}
