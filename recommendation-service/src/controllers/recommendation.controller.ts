// recommendation-service/src/controllers/recommendation.controller.ts — R-WA13
import { Response } from "express";
import { AuthedRequest } from "../middleware/auth.middleware";
import { getProfile } from "../services/profile.service";
import { getRecommendations } from "../services/ai.service";
import { WeatherSnapshot, UserProfileSnapshot } from "../engine/types";

export async function postRecommendation(req: AuthedRequest, res: Response) {
  try {
    const weather = req.body.weather as WeatherSnapshot;
    if (!weather) {
      return res.status(400).json({ error: "Weather data required" });
    }

    const savedProfile = await getProfile(req.userId!);

    // No profile yet (onboarding skipped) — recommendations still
    // work, just generic, rather than blocking the request. [supports skip-onboarding decision]
    const profile: UserProfileSnapshot = {
      occupation: savedProfile?.occupation ?? "other",
      hobbies: savedProfile?.hobbies ?? [],
      healthConsiderations: savedProfile?.healthConsiderations ?? [],
    };
     console.log(weather, profile)
    const result = await getRecommendations(weather, profile);
    res.status(200).json(result);
  } catch (err) {
    console.error("Recommendation request failed:", err);
    res.status(500).json({ error: (err as Error).message });
  }
}
