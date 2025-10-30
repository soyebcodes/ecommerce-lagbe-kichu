import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { registerUser, loginUser } from "../services/auth.service";

export const register = catchAsync(async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  const { user, accessToken, refreshToken } = await registerUser(
    name,
    email,
    password,
    role
  );

  // store refresh token in cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: { user, accessToken },
  });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { user, accessToken, refreshToken } = await loginUser(email, password);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: { user, accessToken },
  });
});

export const logout = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie("refreshToken");
  res.status(200).json({ success: true, message: "Logged out successfully" });
});
