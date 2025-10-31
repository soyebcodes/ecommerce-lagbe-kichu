import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import * as sellerOrderService from "../services/sellerOrder.service";

export const getMyOrders = catchAsync(async (req: Request, res: Response) => {
  const orders = await sellerOrderService.getSellerOrders(req.user!.id);
  res.json({ success: true, data: orders });
});

export const approveOrder = catchAsync(async (req: Request, res: Response) => {
  const { approve } = req.body; // true or false
  const order = await sellerOrderService.approveOrder(
    req.user!.id,
    req.params.id,
    approve
  );
  res.json({ success: true, message: "Order updated", data: order });
});

export const updateStatus = catchAsync(async (req: Request, res: Response) => {
  const { status } = req.body;
  const order = await sellerOrderService.updateOrderStatus(
    req.user!.id,
    req.params.id,
    status
  );
  res.json({ success: true, message: "Status updated", data: order });
});
