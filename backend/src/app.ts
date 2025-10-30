import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "./config";
import { ApiError } from "./errors/ApiError";
import { errorHandler } from "./middlewares/errorHandler";
import authRoutes from "./routes/auth.route";

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

//  auth routes
app.use("/api/auth", authRoutes);

// 404 route handler
app.use(/.*/, (req, _res, next) => {
  next(ApiError.notFound(`Route ${req.originalUrl} not found`));
});
// Global error handler
app.use(errorHandler);

export default app;
