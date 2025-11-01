import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { registerUser, loginUser } from "../services/auth.service";
import { User } from "../models/user.model";

export const register = catchAsync(async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  const { user, accessToken, refreshToken } = await registerUser(
    name,
    email,
    password,
    role
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({ success: true, user, accessToken });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { user, accessToken, refreshToken } = await loginUser(email, password);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ success: true, user, accessToken });
});

export const logout = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie("refreshToken");
  res.json({ success: true, message: "Logged out successfully" });
});

export const refreshTokenController = catchAsync(
  async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken)
      return res.status(401).json({ message: "No refresh token" });

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!
    ) as { id: string };
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "User not found" });

    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    );

    res.json({
      accessToken,
      user: { _id: user._id, email: user.email, role: user.role },
    });
  }
);
