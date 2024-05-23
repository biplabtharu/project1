import { NextFunction, Request, Response } from "express";
import { ErrorCodes, HTTPException } from "../exceptions/root";
import { internalException } from "../exceptions/internal-exception";

export const errorHandler = (method: Function) => {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await method(req, res, next);
    } catch (err) {
      let exception: HTTPException;
      if (err instanceof HTTPException) {
        exception = err;
      } else {
        exception = new internalException(
          "Something went wrong",
          ErrorCodes.INTERNAL_ERROR,
          500,
          err
        );
      }
      next(exception);
    }
  };
};
