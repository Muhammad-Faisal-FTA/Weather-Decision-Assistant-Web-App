// features/forecast/api/weather.ts
// R-WA08, R-WA09, R-WA10, R-WA11 — single call, sliced later per card

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

export async function fetchWeather(lat: number, lon: number) {
  const url = new URL(BASE_URL);
  url.searchParams.set("latitude", String(lat));
  url.searchParams.set("longitude", String(lon));
  url.searchParams.set(
    "current",
    "temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code"
  );
  url.searchParams.set(
    "daily",
    "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max"
  );
  url.searchParams.set("timezone", "auto");
  url.searchParams.set("forecast_days", "16");

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Weather request failed: ${res.status}`);
  return res.json();
}
