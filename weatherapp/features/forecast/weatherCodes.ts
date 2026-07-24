// features/forecast/weatherCodes.ts
// WMO weather codes -> label + icon (common subset)
// Open-Meteo returns only the numeric code — no icon/image is provided by the API.

const WEATHER: Record<number, { label: string; icon: string }> = {
  0: { label: "Clear sky", icon: "☀️" },
  1: { label: "Mostly clear", icon: "🌤️" },
  2: { label: "Partly cloudy", icon: "⛅" },
  3: { label: "Overcast", icon: "☁️" },
  45: { label: "Fog", icon: "🌫️" },
  48: { label: "Fog", icon: "🌫️" },
  51: { label: "Light drizzle", icon: "🌦️" },
  61: { label: "Light rain", icon: "🌧️" },
  63: { label: "Rain", icon: "🌧️" },
  65: { label: "Heavy rain", icon: "🌧️" },
  71: { label: "Snow", icon: "🌨️" },
  80: { label: "Rain showers", icon: "🌦️" },
  95: { label: "Thunderstorm", icon: "⛈️" },
};

const DEFAULT = { label: "Unknown", icon: "🌡️" };

export function weatherLabel(code: number): string {
  return (WEATHER[code] ?? DEFAULT).label;
}

export function weatherIcon(code: number): string {
  return (WEATHER[code] ?? DEFAULT).icon;
}
