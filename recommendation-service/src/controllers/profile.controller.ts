// recommendation-service/src/controllers/profile.controller.ts
import { Response } from "express";
import { AuthedRequest } from "../middleware/auth.middleware";
import { saveProfile, getProfile } from "../services/profile.service";

export async function postProfile(req: AuthedRequest, res: Response) {
  try {
    const profile = await saveProfile(req.userId!, req.body);
    res.status(200).json(profile);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
}

export async function fetchProfile(req: AuthedRequest, res: Response) {
  const profile = await getProfile(req.userId!);
  res.status(200).json(profile ?? null);
}
