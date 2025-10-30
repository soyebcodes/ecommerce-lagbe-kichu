import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { ApiError } from "../errors/ApiError";

export const verifyAuth = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw ApiError.unauthorized("Access token missing");
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, config.accessSecret) as {
      id: string;
      role: string;
    };

    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    next(ApiError.unauthorized("Invalid or expired token"));
  }
};
