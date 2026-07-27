// recommendation-service/src/config/ai.ts
import "dotenv/config";

export const aiConfig = {
  apiKey: process.env.GOOGLE_API_KEY!,
  model: process.env.GOOGLE_MODEL || "gemini-2.5-flash",
  baseUrl: "https://generativelanguage.googleapis.com/v1beta/models",
  timeoutMs: 8000,
};
