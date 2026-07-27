// recommendation-service/src/middleware/rateLimit.middleware.ts — R-WA17
import { Response, NextFunction } from "express";
import { AuthedRequest } from "./auth.middleware";

const DAILY_LIMIT = 20;
const WINDOW_MS = 24 * 60 * 60 * 1000;

// In-memory is fine for a single-instance MVP. If this service ever
// runs multiple instances, swap this Map for Redis — the counting
// logic below stays the same either way.
const requestCounts = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(req: AuthedRequest, res: Response, next: NextFunction) {
  const userId = req.userId!;
  const now = Date.now();
  const entry = requestCounts.get(userId);

  if (!entry || now > entry.resetAt) {
    requestCounts.set(userId, { count: 1, resetAt: now + WINDOW_MS });
    return next();
  }

  if (entry.count >= DAILY_LIMIT) {
    return res.status(429).json({ error: "Daily recommendation limit reached. Try again tomorrow." });
  }

  entry.count += 1;
  next();
}
