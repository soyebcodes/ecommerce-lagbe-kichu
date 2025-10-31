import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import * as orderService from "../services/order.service";

export const createOrder = catchAsync(async (req: Request, res: Response) => {
  const { items, paymentMethod } = req.body;
  const order = await orderService.createOrder(
    req.user!.id,
    items,
    paymentMethod || "COD"
  );
  res.status(201).json({ success: true, message: "Order placed", data: order });
});

export const getMyOrders = catchAsync(async (req: Request, res: Response) => {
  const orders = await orderService.getBuyerOrders(req.user!.id);
  res.json({ success: true, data: orders });
});
