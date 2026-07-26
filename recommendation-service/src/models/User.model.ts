// recommendation-service/src/models/User.model.ts
// import mongoose, { Schema, model } from "mongoose";
import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const User = model("User", userSchema);
