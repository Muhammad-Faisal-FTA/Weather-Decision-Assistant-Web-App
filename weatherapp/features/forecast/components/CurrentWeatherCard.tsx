"use client";
// features/forecast/components/CurrentWeatherCard.tsx — F-W02, R-WA08

import { useWeatherData } from "../hooks/useWeatherData";
import { weatherLabel } from "../weatherCodes";

export function CurrentWeatherCard() {
  const { data, isLoading, isError } = useWeatherData();

  if (isLoading) {
    return (
      <div className="w-full max-w-md rounded-lg bg-surface p-6 text-text-muted">
        Loading weather…
      </div>
    );
  }

  if (isError || !data) {
    // Scoped error — other cards render independently. R-WA18
    return (
      <div className="w-full max-w-md rounded-lg bg-surface p-6 text-danger">
        Couldn&apos;t load weather.
      </div>
    );
  }

  const { current } = data;

  return (
    <div className="w-full max-w-md rounded-lg bg-surface p-6 shadow-card">
      <p className="text-sm text-text-secondary">{weatherLabel(current.weatherCode)}</p>
      <p className="text-readout text-5xl font-semibold text-text-primary">
        {Math.round(current.temperature)}°
      </p>
      <p className="mt-1 text-sm text-text-secondary">
        Feels like {Math.round(current.feelsLike)}° · {current.humidity}% humidity ·{" "}
        {Math.round(current.windSpeed)} km/h wind
      </p>
    </div>
  );
}
