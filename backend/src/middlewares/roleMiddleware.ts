import { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors/ApiError";

export const restrictTo =
  (...roles: string[]) =>
  (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) return next(ApiError.unauthorized());
    if (!roles.includes(req.user.role))
      return next(ApiError.forbidden("Access denied"));
    next();
  };
