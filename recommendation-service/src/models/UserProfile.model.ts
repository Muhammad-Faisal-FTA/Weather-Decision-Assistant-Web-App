// recommendation-service/src/models/UserProfile.model.ts — R-WA03
import { Schema, model,  } from "mongoose";

const profileSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  gender: String,
  ageRange: String,
  occupation: String,
  hobbies: [String],
  healthConsiderations: [String], // categorical tags, "none" is a valid entry
  updatedAt: { type: Date, default: Date.now },
});

export const UserProfile = model("UserProfile", profileSchema);
