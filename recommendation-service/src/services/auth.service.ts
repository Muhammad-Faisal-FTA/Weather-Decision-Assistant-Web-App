// recommendation-service/src/services/auth.service.ts — R-WA01
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.model";
import { env } from "../config/env";

export async function registerUser(email: string, password: string) {
  const existing = await User.findOne({ email });
  if (existing) throw new Error("Email already registered");

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, passwordHash });
  return signToken(user._id.toString(), user.email);
}

export async function loginUser(email: string, password: string) {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new Error("Invalid credentials");

  return signToken(user._id.toString(), user.email);
}

function signToken(userId: string, email: string) {
  const token = jwt.sign({ sub: userId, email }, env.jwtSecret, { expiresIn: "7d" });
  return { token, userId, email };
}
