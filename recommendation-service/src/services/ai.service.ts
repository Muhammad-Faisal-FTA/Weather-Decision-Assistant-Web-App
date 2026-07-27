// recommendation-service/src/services/ai.service.ts — R-WA13, R-WA15, R-WA16
import { WeatherSnapshot, UserProfileSnapshot, Recommendation } from "../engine/types";
import { runRules } from "../engine/ruleRunner";
import { aiConfig } from "../config/ai";

// Health-adjacent output must never read as medical advice. [R-WA15]
const DISCLAIMER =
  "This is general guidance, not medical advice. Consult a professional for health concerns.";

function buildPrompt(weather: WeatherSnapshot, profile: UserProfileSnapshot): string {
  return `Weather: ${weather.temperature}°C, feels like ${weather.feelsLike}°C, UV index ${weather.uvIndex}, ${weather.precipitationChance}% rain chance.
User: occupation ${profile.occupation}, hobbies: ${profile.hobbies.join(", ") || "none"}, health considerations: ${profile.healthConsiderations.join(", ") || "none"}.

Return ONLY JSON matching exactly this shape:
{"recommendations":[{"category":"activity|clothing|wellness|warning","message":"string","priority":1-10}]}

Keep each message under 20 words. Never give medical diagnoses or specific treatment advice — general wellness framing only.`;
}

// Validates the AI's JSON shape before trusting it — malformed or
// missing fields fall back to the rule engine rather than forwarding
// unvalidated text straight to the UI. [R-WA16]
function isValidRecommendation(item: unknown): item is Recommendation {
  if (typeof item !== "object" || item === null) return false;
  const r = item as Record<string, unknown>;
  return (
    typeof r.message === "string" &&
    typeof r.priority === "number" &&
    ["activity", "clothing", "wellness", "warning"].includes(r.category as string)
  );
}

export async function getRecommendations(weather: WeatherSnapshot, profile: UserProfileSnapshot) {
  // No key configured — skip straight to the fallback rather than
  // making a request guaranteed to fail. [R-WA16]
  if (!aiConfig.apiKey) {
    return runRules(weather, profile);
  }

  try {
    const url = `${aiConfig.baseUrl}/${aiConfig.model}:generateContent?key=${aiConfig.apiKey}`;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: buildPrompt(weather, profile) }] }],
        // responseMimeType forces Gemini to return valid JSON rather
        // than JSON wrapped in prose or markdown fences — meaningfully
        // reduces how often the validation step below has to fall back.
        generationConfig: { temperature: 0.4, responseMimeType: "application/json" },
      }),
      signal: AbortSignal.timeout(aiConfig.timeoutMs),
    });

    if (!res.ok) throw new Error(`Gemini request failed: ${res.status}`);

    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    const parsed = JSON.parse(text ?? "{}");

    if (!Array.isArray(parsed.recommendations) || !parsed.recommendations.every(isValidRecommendation)) {
      throw new Error("AI response failed validation");
    }

    return {
      recommendations: (parsed.recommendations as Recommendation[]).sort((a, b) => b.priority - a.priority),
      disclaimer: DISCLAIMER,
      source: "ai" as const,
    };
  } catch (err) {
    // Logged, not swallowed — silent fallbacks make failures
    // undiagnosable. Timeout, bad JSON, invalid shape, or a network
    // error all land here; the rule engine still returns a result. [R-WA16]
    console.error("AI recommendation failed, falling back to rules:", err);
    return runRules(weather, profile);
  }
}
