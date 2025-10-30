import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "./config";
import { ApiError } from "./errors/ApiError";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: config.frontendUrl,
    credentials: true,
  })
);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "API running..." });
});

// 404 route handler
app.use(/.*/, (req, _res, next) => {
  next(ApiError.notFound(`Route ${req.originalUrl} not found`));
});
// Global error handler
app.use(errorHandler);

export default app;
