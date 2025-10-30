import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import * as productService from "../services/product.service";

export const createProduct = catchAsync(async (req: Request, res: Response) => {
  const product = await productService.createProduct(
    req.user!.id,
    req.body,
    req.files as Express.Multer.File[]
  );
  res
    .status(201)
    .json({ success: true, message: "Product created", data: product });
});

export const getMyProducts = catchAsync(async (req: Request, res: Response) => {
  const products = await productService.getSellerProducts(req.user!.id);
  res.json({ success: true, data: products });
});

export const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const product = await productService.updateProduct(
    req.user!.id,
    req.params.id,
    req.body
  );
  res.json({ success: true, message: "Product updated", data: product });
});

export const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  await productService.deleteProduct(req.user!.id, req.params.id);
  res.json({ success: true, message: "Product deleted" });
});
