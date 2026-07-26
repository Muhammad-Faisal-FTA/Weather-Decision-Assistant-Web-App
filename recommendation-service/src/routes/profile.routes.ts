// recommendation-service/src/routes/profile.routes.ts
import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import { postProfile, fetchProfile } from "../controllers/profile.controller";

const router = Router();
router.get("/", requireAuth, fetchProfile); // R-WA04
router.post("/", requireAuth, postProfile); // R-WA02, R-WA03

export default router;
