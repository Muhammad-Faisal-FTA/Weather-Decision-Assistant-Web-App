// recommendation-service/src/routes/auth.routes.ts
import { Router } from "express";
import { register, login } from "../controllers/auth.controller";

const router = Router();
router.post("/register", register); // R-WA01
router.post("/login", login); // R-WA01

export default router;
