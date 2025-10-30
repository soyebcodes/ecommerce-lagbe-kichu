import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGO_URI || "",
  accessSecret: process.env.ACCESS_TOKEN_SECRET || "access-secret",
  refreshSecret: process.env.REFRESH_TOKEN_SECRET || "refresh-secret",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
  nodeEnv: process.env.NODE_ENV || "development",
};
