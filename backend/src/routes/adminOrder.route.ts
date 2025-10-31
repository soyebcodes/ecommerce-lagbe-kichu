import express from "express";
import { verifyAuth } from "../middlewares/authMiddleware";
import { restrictTo } from "../middlewares/roleMiddleware";
import { getAllOrders } from "../controllers/adminOrder.controller";

const router = express.Router();

router.use(verifyAuth, restrictTo("admin"));

router.get("/", getAllOrders);

export default router;
