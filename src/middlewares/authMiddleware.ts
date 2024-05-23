import { NextFunction, Request, Response } from "express";
import { Unauthorized } from "../exceptions/unauthorized";
import { ErrorCodes, HTTPException } from "../exceptions/HTTPException";
import jwt from "jsonwebtoken";
import { JWT_PUBLIC_KEY } from "../secrets";
import { prisma } from "..";
import { InternalException } from "../exceptions/internalException";

export const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new Unauthorized("You are not authorized", ErrorCodes.UNAUTHORIZED);
    }

    const payload = jwt.verify(token, JWT_PUBLIC_KEY!) as any;

    const user = await prisma.user.findFirst({
      where: { id: payload.sub },
    });

    if (!user) {
      throw new Unauthorized("Invalid token", ErrorCodes.UNAUTHORIZED);
    }

    req.user = user;
    next();
  } catch (err) {
    let exception: HTTPException;
    if (err instanceof HTTPException) {
      exception = err;
    } else {
      exception = new InternalException(
        "Something went wrong",
        ErrorCodes.UNAUTHORIZED,
        err
      );
    }
    next(exception);
  }
};
