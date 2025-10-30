import express from "express";
import { verifyAuth } from "../middlewares/authMiddleware";
import { restrictTo } from "../middlewares/roleMiddleware";

const router = express.Router();

// Open route (no auth)
router.get("/public", (_req, res) => res.json({ message: "Public route OK" }));

// Protected route (requires any logged-in user)
router.get("/protected", verifyAuth, (req, res) => {
  res.json({ message: `Hello ${req.user?.role}, you are authenticated!` });
});

// Admin-only route
router.get("/admin", verifyAuth, restrictTo("admin"), (req, res) => {
  res.json({ message: "Welcome Admin!" });
});

export default router;
