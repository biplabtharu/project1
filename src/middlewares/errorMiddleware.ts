import { Request, Response, NextFunction } from "express";
import { HTTPException } from "../exceptions/root";

export const errorMiddleware = (
  err: HTTPException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.statusCode).json({
    message: err.message,
    errorCode: err.errorCode,
    error: err.error,
  });
};
