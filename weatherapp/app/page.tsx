"use client";
// app/page.tsx

import { useLocation } from "@/context/LocationContext";
import { CurrentWeatherCard } from "@/features/forecast/components/CurrentWeatherCard";
import { DailyForecastCard } from "@/features/forecast/components/DailyForecastCard";
import { WeeklyForecastCard } from "@/features/forecast/components/WeeklyForecastCard";
import { MonthlyForecastCard } from "@/features/forecast/components/MonthlyForecastCard";
import { AirQualityCard } from "@/features/forecast/components/AirQualityCard";
import { RecommendationCard } from "@/features/recommendation/components/RecommendationCard";

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
    <main className="w-full flex-1 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-sm text-text-secondary">
          Showing <span className="text-text-primary">{location.displayName}</span>
        </p>

        {/* Cards fill available width first (1 col on mobile, up to
            3 on desktop) — only individual cards with long lists
            (Monthly) scroll internally, not the whole page. */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <CurrentWeatherCard />
          <DailyForecastCard />
          <WeeklyForecastCard />
          <MonthlyForecastCard />
          <AirQualityCard />
          <RecommendationCard />
        </div>
      </div>
    </main>
  );
}
