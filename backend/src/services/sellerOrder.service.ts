import { Order } from "../models/order.model";
import { ApiError } from "../errors/ApiError";

export const getSellerOrders = async (sellerId: string) => {
  return Order.find({ seller: sellerId })
    .populate("buyer", "name email")
    .populate("products.product", "title price images");
};

export const updateOrderStatus = async (
  sellerId: string,
  orderId: string,
  status: "Processing" | "Out for Delivery" | "Completed" | "Cancelled"
) => {
  const order = await Order.findOne({ _id: orderId, seller: sellerId });
  if (!order) throw ApiError.notFound("Order not found or not yours");

  const allowedStatuses = [
    "Processing",
    "Out for Delivery",
    "Completed",
    "Cancelled",
  ];
  if (!allowedStatuses.includes(status))
    throw ApiError.badRequest("Invalid status update");

  // Prevent illogical transitions
  if (order.status === "Completed" || order.status === "Cancelled") {
    throw ApiError.badRequest("Cannot update completed/cancelled orders");
  }

  order.status = status;
  order.timestamps.push({ status, time: new Date() });
  await order.save();

  return order;
};

export const approveOrder = async (
  sellerId: string,
  orderId: string,
  approve: boolean
) => {
  const order = await Order.findOne({ _id: orderId, seller: sellerId });
  if (!order) throw ApiError.notFound("Order not found");

  if (order.status !== "Pending Approval")
    throw ApiError.badRequest("Order already processed");

  order.status = approve ? "Processing" : "Cancelled";
  order.timestamps.push({
    status: order.status,
    time: new Date(),
  });

  await order.save();
  return order;
};
