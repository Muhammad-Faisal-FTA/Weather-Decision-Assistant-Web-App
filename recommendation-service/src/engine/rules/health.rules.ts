// recommendation-service/src/engine/rules/health.rules.ts — R-WA14, R-WA15
import { WeatherSnapshot, UserProfileSnapshot, Recommendation } from "../types";

export function healthRules(
  weather: WeatherSnapshot,
  profile: UserProfileSnapshot
): Recommendation[] {
  const recs: Recommendation[] = [];
  const health = profile.healthConsiderations;

  if (weather.uvIndex >= 6) {
    recs.push({
      category: "wellness",
      message: "UV is high today — sunscreen and shade are recommended.",
      priority: health.includes("sun_sensitivity") ? 9 : 6,
    });
  }

  if (health.includes("respiratory") && weather.weatherCode >= 45 && weather.weatherCode <= 48) {
    recs.push({
      category: "warning",
      message: "Foggy conditions — air quality may affect breathing. Consider limiting outdoor time.",
      priority: 8,
    });
  }

  if (health.includes("heat_sensitivity") && weather.feelsLike >= 30) {
    recs.push({
      category: "warning",
      message: "High heat — stay hydrated and avoid prolonged sun exposure.",
      priority: 9,
    });
  }

  if (health.includes("cold_sensitivity") && weather.feelsLike <= 5) {
    recs.push({
      category: "warning",
      message: "Cold conditions — dress warmly and limit time outside.",
      priority: 9,
    });
  }

  if (weather.weatherCode === 95) {
    recs.push({ category: "warning", message: "Thunderstorms expected — stay indoors if possible.", priority: 10 });
  }

  return recs;
}
