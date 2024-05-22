import { NextFunction, Request, Response } from "express";
import { hashSync, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "..";
import { JWT_PUBLIC_KEY } from "../secrets";
import { BadRequestException } from "../exceptions/badRequest";
import { ErrorCodes } from "../exceptions/root";

export const Signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;

  const user = await prisma.user.findFirst({ where: { email } });
  if (user) {
    next(
      new BadRequestException(
        "User already exists",
        ErrorCodes.USER_ALREADY_EXISTS
      )
    );
  }

  const saveUser = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashSync(password, 10),
    },
  });
  res.json(saveUser);
};

export const Login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  const user = await prisma.user.findFirst({ where: { email } });

  if (!user) {
    next(
      new BadRequestException(
        "Invalid credentials",
        ErrorCodes.INVALID_PASSWORD
      )
    );
    return;
  }

  if (compareSync(password, user!.password) === false) {
    next(
      new BadRequestException(
        "Invalid credentials",
        ErrorCodes.INVALID_PASSWORD
      )
    );
    return;
  }

  res.json("Login");
};