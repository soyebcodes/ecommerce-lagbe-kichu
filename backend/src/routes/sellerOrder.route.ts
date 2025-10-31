import express from "express";
import { verifyAuth } from "../middlewares/authMiddleware";
import { restrictTo } from "../middlewares/roleMiddleware";
import {
  getMyOrders,
  approveOrder,
  updateStatus,
} from "../controllers/sellerOrder.controller";

const router = express.Router();

router.use(verifyAuth, restrictTo("seller"));

router.get("/", getMyOrders);
router.patch("/:id/approve", approveOrder); // approve/reject
router.patch("/:id/status", updateStatus); // update to next phase

export default router;
