// recommendation-service/src/services/profile.service.ts
import { UserProfile } from "../models/UserProfile.model";

export async function saveProfile(userId: string, data: object) {
  return UserProfile.findOneAndUpdate(
    { userId },
    { ...data, userId, updatedAt: new Date() },
    { upsert: true, new: true }
  );
}

export async function getProfile(userId: string) {
  return UserProfile.findOne({ userId });
}
