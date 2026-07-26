// features/forecast/api/airQuality.ts — R-WA12
const BASE_URL = "https://air-quality-api.open-meteo.com/v1/air-quality";

export async function fetchAirQuality(lat: number, lon: number) {
  const url = new URL(BASE_URL);
  url.searchParams.set("latitude", String(lat));
  url.searchParams.set("longitude", String(lon));
  url.searchParams.set("current", "pm10,pm2_5,uv_index");
  url.searchParams.set("timezone", "auto");

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Air quality request failed: ${res.status}`);
  return res.json();
}
