import { Schema, model, Document, Types } from "mongoose";

export interface IOrder extends Document {
  buyer: Types.ObjectId;
  seller: Types.ObjectId;
  products: { product: Types.ObjectId; quantity: number; price: number }[];
  totalAmount: number;
  status:
    | "Pending Approval"
    | "Processing"
    | "Out for Delivery"
    | "Completed"
    | "Cancelled";
  timestamps: { status: string; time: Date }[];
  paymentMethod: "COD" | "Bkash";
}

const orderSchema = new Schema<IOrder>(
  {
    buyer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    seller: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: [
        "Pending Approval",
        "Processing",
        "Out for Delivery",
        "Completed",
        "Cancelled",
      ],
      default: "Pending Approval",
    },
    timestamps: [
      {
        status: { type: String },
        time: { type: Date, default: Date.now },
      },
    ],
    paymentMethod: { type: String, enum: ["COD", "Bkash"], default: "COD" },
  },
  { timestamps: true }
);

export const Order = model<IOrder>("Order", orderSchema);
