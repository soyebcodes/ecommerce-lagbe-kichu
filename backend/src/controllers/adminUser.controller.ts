import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import * as adminUserService from "../services/adminUser.service";

export const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await adminUserService.getAllUsers();
  res.json({ success: true, data: users });
});

export const banOrUnbanUser = catchAsync(
  async (req: Request, res: Response) => {
    const { action } = req.body; // "ban" or "unban"
    const user = await adminUserService.updateUserStatus(req.params.id, action);
    res.json({
      success: true,
      message: `User ${action}ned successfully`,
      data: user,
    });
  }
);
