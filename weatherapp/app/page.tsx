"use client";
// app/page.tsx

import { useLocation } from "@/context/LocationContext";
import { CurrentWeatherCard } from "@/features/forecast/components/CurrentWeatherCard";
import { DailyForecastCard } from "@/features/forecast/components/DailyForecastCard";
import { WeeklyForecastCard } from "@/features/forecast/components/WeeklyForecastCard";
import { MonthlyForecastCard } from "@/features/forecast/components/MonthlyForecastCard";

export default function Home() {
  const { location } = useLocation();

  if (!location) {
    return (
      <main className="flex w-full flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-secondary">
          WeatherMind AI
        </p>
        <h1 className="max-w-md text-balance text-2xl font-semibold leading-snug text-text-primary sm:text-3xl">
          Search for a city to see its forecast and get personalized guidance.
        </h1>
        <p className="mt-3 max-w-sm text-sm text-text-secondary">
          Use the search bar above, or tap the location icon to use where you are right now.
        </p>
      </main>
    );
  }

  return (
    <main className="flex w-full flex-1 flex-col items-center gap-4 px-6 py-10">
      <p className="text-sm text-text-secondary">
        Showing <span className="text-text-primary">{location.displayName}</span>
      </p>
      <CurrentWeatherCard />
      <DailyForecastCard />
      <WeeklyForecastCard />
      <MonthlyForecastCard />
    </main>
  );
}
