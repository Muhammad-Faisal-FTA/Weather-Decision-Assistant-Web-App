// recommendation-service/src/engine/rules/activity.rules.ts
import { WeatherSnapshot, UserProfileSnapshot, Recommendation } from "../types";

export function activityRules(
  weather: WeatherSnapshot,
  profile: UserProfileSnapshot
): Recommendation[] {
  const recs: Recommendation[] = [];
  const goodOutdoorWeather =
    weather.precipitationChance < 30 && weather.feelsLike >= 10 && weather.feelsLike <= 30;

  if (profile.hobbies.includes("Running") || profile.hobbies.includes("Cycling")) {
    if (goodOutdoorWeather) {
      recs.push({ category: "activity", message: "Good conditions for a run or ride today.", priority: 4 });
    } else if (weather.precipitationChance >= 50) {
      recs.push({ category: "activity", message: "Rain likely — consider an indoor workout instead.", priority: 4 });
    }
  }

  if (profile.hobbies.includes("Photography") && weather.weatherCode <= 2) {
    recs.push({ category: "activity", message: "Clear skies — a good day for outdoor photography.", priority: 3 });
  }

  if (profile.hobbies.includes("Gardening") && weather.precipitationChance < 20) {
    recs.push({ category: "activity", message: "Dry conditions — a good day to get in the garden.", priority: 2 });
  }

  return recs;
}
