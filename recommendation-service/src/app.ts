// recommendation-service/src/app.ts
import express from "express";
import cors from "cors";
import { env } from "./config/env";
import { connectDB } from "./config/db";
import authRoutes from "./routes/auth.routes";
import profileRoutes from "./routes/profile.routes";

import { setServers } from "node:dns/promises";

// Force Node.js to use Google and Cloudflare public DNS resolvers globally
try {
  setServers(["8.8.8.8", "1.1.1.1"]);
} catch (error) {
  console.warn("⚠️ Custom DNS configuration skipped:", error);
}



const app = express();

const isDev = process.env.NODE_ENV !== "production";
const allowedOrigins = (env.corsOrigin || "http://localhost:3000")
  .split(",")
  .map((o) => o.trim().replace(/\/$/, ""));

app.use(
  cors({
    origin(origin, callback) {
      if (isDev || !origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(`CORS blocked request from origin: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

connectDB().then(() => {
  app.listen(env.port, () => console.log(`recommendation-service running on ${env.port}`));
});
