import bcrypt from "bcryptjs";
import { User } from "../models/user.model";
import { ApiError } from "../errors/ApiError";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens";

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  role: string
) => {
  const existing = await User.findOne({ email });
  if (existing) throw ApiError.badRequest("Email already in use");

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed, role });

  const accessToken = generateAccessToken({ id: user._id, role: user.role });
  const refreshToken = generateRefreshToken({ id: user._id, role: user.role });

  return { user, accessToken, refreshToken };
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw ApiError.unauthorized("Invalid credentials");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw ApiError.unauthorized("Invalid credentials");

  const accessToken = generateAccessToken({ id: user._id, role: user.role });
  const refreshToken = generateRefreshToken({ id: user._id, role: user.role });

  return { user, accessToken, refreshToken };
};
