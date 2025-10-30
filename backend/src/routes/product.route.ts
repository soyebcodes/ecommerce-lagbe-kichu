import express from "express";
import { verifyAuth } from "../middlewares/authMiddleware";
import { restrictTo } from "../middlewares/roleMiddleware";
import { upload } from "../middlewares/upload";
import {
  createProduct,
  getMyProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";

const router = express.Router();

router.use(verifyAuth, restrictTo("seller", "admin"));

router.post("/", upload.array("files", 5), createProduct);
router.get("/", getMyProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
