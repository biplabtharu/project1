import { NextFunction, Request, Response } from "express";
import { ErrorCodes, HTTPException } from "../exceptions/HTTPException";
import { InternalException } from "../exceptions/internalException";

export const errorHandler = (method: Function) => {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await method(req, res, next);
    } catch (err) {
      let exception: HTTPException;
      if (err instanceof HTTPException) {
        exception = err;
      } else {
        exception = new InternalException(
          "Something went wrong",
          ErrorCodes.INTERNAL_ERROR,
          err
        );
      }
      next(exception);
    }
  };
};
