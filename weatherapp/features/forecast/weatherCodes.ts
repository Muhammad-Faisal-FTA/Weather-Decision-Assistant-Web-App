// features/forecast/weatherCodes.ts
// WMO weather codes -> short label (common subset)

const LABELS: Record<number, string> = {
  0: "Clear sky",
  1: "Mostly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Fog",
  51: "Light drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  71: "Snow",
  80: "Rain showers",
  95: "Thunderstorm",
};

export function weatherLabel(code: number): string {
  return LABELS[code] ?? "Unknown";
}
