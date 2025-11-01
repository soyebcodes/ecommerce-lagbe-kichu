// controllers/auth.controller.ts
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { registerUser, loginUser } from "../services/auth.service";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export const register = catchAsync(async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  const { user, accessToken, refreshToken } = await registerUser(
    name,
    email,
    password,
    role
  );

  // Set refresh token as httpOnly cookie
  res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);

  res.status(201).json({ success: true, user, accessToken });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { user, accessToken, refreshToken } = await loginUser(email, password);

  res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);

  res.json({ success: true, user, accessToken });
});

export const logout = catchAsync(async (req: Request, res: Response) => {
  // Clear refresh token cookie
  res.clearCookie("refreshToken", COOKIE_OPTIONS);
  res.json({ success: true, message: "Logged out successfully" });
});

export const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken)
    return res.status(401).json({ message: "No refresh token provided" });

  // Verify refresh token
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string,
    (err, decoded: any) => {
      if (err)
        return res.status(403).json({ message: "Invalid or expired token" });

      // Issue new access token
      const accessToken = jwt.sign(
        { id: decoded.id, role: decoded.role },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: "15m" }
      );

      res.json({ accessToken });
    }
  );
});
