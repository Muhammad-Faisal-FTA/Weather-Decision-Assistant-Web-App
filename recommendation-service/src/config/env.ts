// recommendation-service/src/config/env.ts
import "dotenv/config";

export const env = {
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGODB_URI!,
  jwtSecret: process.env.JWT_SECRET!,
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000",
};
