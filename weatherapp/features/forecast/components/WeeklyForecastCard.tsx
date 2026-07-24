"use client";
// features/forecast/components/WeeklyForecastCard.tsx — F-W04, R-WA10

import { useWeatherData } from "../hooks/useWeatherData";
import { weatherLabel, weatherIcon } from "../weatherCodes";

export function WeeklyForecastCard() {
  const { data, isLoading, isError } = useWeatherData();

  if (isLoading) {
    return (
      <div className="w-full max-w-md rounded-lg bg-surface p-6 text-text-muted">
        Loading weekly forecast…
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="w-full max-w-md rounded-lg bg-surface p-6 text-danger">
        Couldn&apos;t load the weekly forecast.
      </div>
    );
  }

  const week = data.daily.slice(0, 7);

  return (
    <div className="w-full max-w-md rounded-lg bg-surface p-6 shadow-card">
      <p className="mb-3 text-sm font-semibold text-text-primary">This Week</p>
      <ul className="space-y-2">
        {week.map((day) => (
          <li
            key={day.date}
            className="flex items-center justify-between text-sm text-text-secondary"
          >
            <span className="w-20">
              {new Date(day.date).toLocaleDateString(undefined, { weekday: "short" })}
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
