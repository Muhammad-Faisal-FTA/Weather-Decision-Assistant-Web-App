// recommendation-service/src/engine/types.ts

export interface WeatherSnapshot {
  temperature: number;
  feelsLike: number;
  weatherCode: number;
  uvIndex: number;
  precipitationChance: number;
  windSpeed: number;
}

export interface UserProfileSnapshot {
  occupation: string;
  hobbies: string[];
  healthConsiderations: string[];
}

export interface Recommendation {
  category: "activity" | "clothing" | "wellness" | "warning";
  message: string;
  priority: number; // higher = shown first
}
