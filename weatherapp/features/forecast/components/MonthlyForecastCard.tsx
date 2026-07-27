"use client";
// features/forecast/components/MonthlyForecastCard.tsx — F-W05, R-WA11

import { useWeatherData } from "../hooks/useWeatherData";
import { weatherLabel, weatherIcon } from "../weatherCodes";

export function MonthlyForecastCard() {
  const { data, isLoading, isError } = useWeatherData();

  if (isLoading) {
    return (
      <div className="w-full rounded-lg bg-surface p-6 text-text-muted">
        Loading 16-day forecast…
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="w-full rounded-lg bg-surface p-6 text-danger">
        Couldn&apos;t load the 16-day forecast.
      </div>
    );
  }

  // Same daily[] array as Daily/Weekly cards — just the full 16 days,
  // no separate API call. [R-WA11]
  const days = data.daily.slice(0, 16);

  return (
    <div className="w-full rounded-lg bg-surface p-6 shadow-card">
      <p className="mb-3 text-sm font-semibold text-text-primary">Next 16 Days</p>
      <ul className="max-h-80 space-y-2 overflow-y-auto pr-1">
        {days.map((day) => (
          <li
            key={day.date}
            className="flex items-center justify-between text-sm text-text-secondary"
          >
            <span className="w-24">
              {new Date(day.date).toLocaleDateString(undefined, {
                weekday: "short",
                day: "numeric",
              })}
            </span>
            <span className="flex-1 text-center">{weatherIcon(day.weatherCode)} {weatherLabel(day.weatherCode)}</span>
            <span>
              {Math.round(day.tempMax)}° / {Math.round(day.tempMin)}°
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
