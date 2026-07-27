// recommendation-service/src/engine/ruleRunner.ts — R-WA13, R-WA14, R-WA15, R-WA16
import { WeatherSnapshot, UserProfileSnapshot } from "./types";
import { clothingRules } from "./rules/clothing.rules";
import { activityRules } from "./rules/activity.rules";
import { healthRules } from "./rules/health.rules";

// Health-adjacent output must never read as medical advice. [R-WA15]
const DISCLAIMER =
  "This is general guidance, not medical advice. Consult a professional for health concerns.";

export function runRules(weather: WeatherSnapshot, profile: UserProfileSnapshot) {
  const recommendations = [
    ...clothingRules(weather),
    ...activityRules(weather, profile),
    ...healthRules(weather, profile),
  ].sort((a, b) => b.priority - a.priority);

  return {
    recommendations,
    disclaimer: DISCLAIMER,
    source: "fallback_rules" as const, // used directly if AI is unavailable [R-WA16]
  };
}
