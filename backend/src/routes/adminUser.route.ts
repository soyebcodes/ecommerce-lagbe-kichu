import express from "express";
import { verifyAuth } from "../middlewares/authMiddleware";
import { restrictTo } from "../middlewares/roleMiddleware";
import {
  getAllUsers,
  banOrUnbanUser,
} from "../controllers/adminUser.controller";

const router = express.Router();

router.use(verifyAuth, restrictTo("admin"));

router.get("/", getAllUsers);
router.patch("/:id", banOrUnbanUser);

export default router;
