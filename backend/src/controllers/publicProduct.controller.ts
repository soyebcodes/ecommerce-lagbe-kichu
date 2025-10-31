import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { Product } from "../models/product.model";

export const getAllProducts = catchAsync(
  async (req: Request, res: Response) => {
    const { search, category, minPrice, maxPrice } = req.query;
    const filter: any = {};

    if (search) filter.title = { $regex: search, $options: "i" };
    if (category) filter.category = category;
    if (minPrice || maxPrice)
      filter.price = {
        ...(minPrice && { $gte: minPrice }),
        ...(maxPrice && { $lte: maxPrice }),
      };

    const products = await Product.find(filter).populate(
      "seller",
      "name email"
    );
    res.json({ success: true, data: products });
  }
);

export const getProductById = catchAsync(
  async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id).populate(
      "seller",
      "name email"
    );
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    res.json({ success: true, data: product });
  }
);
