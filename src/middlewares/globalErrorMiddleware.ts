import { Request, Response, NextFunction } from "express";
import { HTTPException } from "../exceptions/HTTPException";

export const globalErrorMiddleware = (
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
