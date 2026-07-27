// recommendation-service/src/engine/rules/clothing.rules.ts
import { WeatherSnapshot, Recommendation } from "../types";

export function clothingRules(weather: WeatherSnapshot): Recommendation[] {
  const recs: Recommendation[] = [];

  if (weather.feelsLike <= 5) {
    recs.push({ category: "clothing", message: "Bundle up — wear a heavy coat and gloves.", priority: 8 });
  } else if (weather.feelsLike <= 15) {
    recs.push({ category: "clothing", message: "A jacket is a good idea today.", priority: 5 });
  } else if (weather.feelsLike >= 32) {
    recs.push({ category: "clothing", message: "Wear light, breathable clothing — it's hot out.", priority: 6 });
  }

  if (weather.precipitationChance >= 50) {
    recs.push({ category: "clothing", message: "Bring an umbrella or rain jacket.", priority: 7 });
  }

  return recs;
}
