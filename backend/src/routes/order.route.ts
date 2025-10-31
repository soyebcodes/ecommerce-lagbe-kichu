import express from "express";
import { verifyAuth } from "../middlewares/authMiddleware";
import { restrictTo } from "../middlewares/roleMiddleware";
import { createOrder, getMyOrders } from "../controllers/order.controller";

const router = express.Router();

router.use(verifyAuth, restrictTo("buyer"));

router.post("/", createOrder);
router.get("/", getMyOrders);

export default router;
