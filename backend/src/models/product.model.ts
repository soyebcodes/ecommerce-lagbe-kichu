import { Schema, model, Document, Types } from "mongoose";

export interface IProduct extends Document {
  title: string;
  description: string;
  category: string;
  price: number;
  discountPrice?: number;
  images: string[];
  video?: string;
  seller: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    images: [{ type: String, required: true }],
    video: { type: String },
    seller: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Product = model<IProduct>("Product", productSchema);
