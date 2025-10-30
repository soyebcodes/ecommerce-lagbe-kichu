import jwt from "jsonwebtoken";
import { config } from "../config";

export const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, config.accessSecret, { expiresIn: "15m" });
};

export const generateRefreshToken = (payload: object) => {
  return jwt.sign(payload, config.refreshSecret, { expiresIn: "7d" });
};
