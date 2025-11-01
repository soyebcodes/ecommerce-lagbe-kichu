import { Product } from "../models/product.model";
import { ApiError } from "../errors/ApiError";

export const createProduct = async (
  sellerId: string,
  data: any,
  files?: Express.Multer.File[]
) => {
  const images = files
    ? files.filter((f) => f.mimetype.startsWith("image")).map((f) => f.path)
    : []; // default empty array

  const videoFile = files?.find((f) => f.mimetype.startsWith("video"));

  const product = await Product.create({
    ...data,
    images,
    video: videoFile?.path,
    seller: sellerId,
  });

  return product;
};

export const getSellerProducts = async (sellerId: string) => {
  return Product.find({ seller: sellerId }).sort({ createdAt: -1 });
};

export const updateProduct = async (
  sellerId: string,
  productId: string,
  data: any
) => {
  const product = await Product.findOneAndUpdate(
    { _id: productId, seller: sellerId },
    data,
    { new: true }
  );

  if (!product) throw ApiError.notFound("Product not found or not yours");
  return product;
};

export const deleteProduct = async (sellerId: string, productId: string) => {
  const product = await Product.findOneAndDelete({
    _id: productId,
    seller: sellerId,
  });
  if (!product) throw ApiError.notFound("Product not found or not yours");
  return product;
};
