"use client";
// features/forecast/components/DailyForecastCard.tsx — F-W03, R-WA09

import { useWeatherData } from "../hooks/useWeatherData";
import { weatherLabel } from "../weatherCodes";

export function DailyForecastCard() {
  const { data, isLoading, isError } = useWeatherData();

  if (isLoading) {
    return (
      <div className="w-full max-w-md rounded-lg bg-surface p-6 text-text-muted">
        Loading today&apos;s forecast…
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="w-full max-w-md rounded-lg bg-surface p-6 text-danger">
        Couldn&apos;t load today&apos;s forecast.
      </div>
    );
  }

  const today = data.daily[0];

  return (
    <div className="w-full max-w-md rounded-lg bg-surface p-6 shadow-card">
      <p className="text-sm font-semibold text-text-primary">Today</p>
      <p className="text-sm text-text-secondary">{weatherLabel(today.weatherCode)}</p>
      <p className="mt-2 text-sm text-text-secondary">
        High {Math.round(today.tempMax)}° · Low {Math.round(today.tempMin)}° ·{" "}
        {today.precipitationChance}% rain · UV {today.uvIndex}
      </p>
    </div>
  );
}
