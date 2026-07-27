// recommendation-service/src/routes/recommendation.routes.ts — R-WA17, R-WA22
import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { rateLimit } from "../middleware/rateLimit.middleware.js";
import { postRecommendation } from "../controllers/recommendation.controller.js";

const router = Router();
router.post("/", requireAuth, rateLimit, postRecommendation);

export default router;
