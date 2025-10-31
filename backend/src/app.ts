import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "./config";
import { ApiError } from "./errors/ApiError";
import { errorHandler } from "./middlewares/errorHandler";
import authRoutes from "./routes/auth.route";
import testRoutes from "./routes/test.route";
import productRoutes from "./routes/product.route";
import publicRoutes from "./routes/public.route";
import orderRoutes from "./routes/order.route";

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

// Test route
app.use("/api/test", testRoutes);

// Product routes
app.use("/api/products", productRoutes);

// Public routes
app.use("/api/public", publicRoutes);

// Buyer routes
app.use("/api/orders", orderRoutes);

// 404 route handler
app.use(/.*/, (req, _res, next) => {
  next(ApiError.notFound(`Route ${req.originalUrl} not found`));
});
// Global error handler
app.use(errorHandler);

export default app;
