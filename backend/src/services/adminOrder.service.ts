import { Order } from "../models/order.model";

export const getAllOrders = async (filter: any = {}) => {
  return Order.find(filter)
    .populate("buyer", "name email")
    .populate("seller", "name email")
    .populate("products.product", "title price images");
};
