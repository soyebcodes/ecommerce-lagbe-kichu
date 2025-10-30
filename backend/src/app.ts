import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "./config";

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: config.frontendUrl,
    credentials: true,
  })
);

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "API running..." });
});

export default app;
