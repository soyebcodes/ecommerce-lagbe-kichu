import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import * as adminOrderService from "../services/adminOrder.service";

export const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const { status } = req.query;
  const filter: any = {};
  if (status) filter.status = status;

  const orders = await adminOrderService.getAllOrders(filter);
  res.json({ success: true, data: orders });
});
