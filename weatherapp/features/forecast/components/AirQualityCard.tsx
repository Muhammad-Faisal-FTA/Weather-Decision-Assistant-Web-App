"use client";
// features/forecast/components/AirQualityCard.tsx — F-W10, R-WA12
import { useAirQuality } from "../hooks/useAirQuality";
import { uvColor, pm25Color, pm10Color } from "../conditionColors";

export function AirQualityCard() {
  const { data, isLoading, isError } = useAirQuality();

  if (isLoading) {
    return (
      <div className="w-full max-w-md rounded-lg bg-surface p-6 text-text-muted">
        Loading air quality…
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="w-full max-w-md rounded-lg bg-surface p-6 text-danger">
        Couldn&apos;t load air quality.
      </div>
    );
  }

  return (
    <div className="w-full max-w-md rounded-lg bg-surface p-6 shadow-card">
      <p className="mb-3 text-sm font-semibold text-text-primary">Air Quality</p>

      <div className="flex justify-between text-sm text-text-secondary">
        <span>PM2.5</span>
        <span className={pm25Color(data.pm25)}>{data.pm25} µg/m³</span>
      </div>
      <div className="mt-2 flex justify-between text-sm text-text-secondary">
        <span>PM10</span>
        <span className={pm10Color(data.pm10)}>{data.pm10} µg/m³</span>
      </div>
      <div className="mt-2 flex justify-between text-sm text-text-secondary">
        <span>UV Index</span>
        <span className={uvColor(data.uvIndex)}>{data.uvIndex}</span>
      </div>
    </div>
  );
}
