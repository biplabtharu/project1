import { NextFunction, Request, Response } from "express";
import { hashSync, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "..";
import { JWT_PUBLIC_KEY } from "../secrets";
import { BadRequestException } from "../exceptions/badRequest";
import { ErrorCodes } from "../exceptions/HTTPException";
import { InvalidCredentials } from "../exceptions/invalidCredentials";

export const Signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;

  const user = await prisma.user.findFirst({ where: { email } });
  if (user) {
    throw new BadRequestException(
      "User already exists",
      ErrorCodes.USER_ALREADY_EXISTS
    );
  }

  const saveUser = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashSync(password as string, 10),
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
    throw new InvalidCredentials(
      "Invalid credentials",
      ErrorCodes.INVALID_PASSWORD
    );
  }

  if (compareSync(password as string, user!.password) === false) {
    throw new InvalidCredentials(
      "Invalid credentials",
      ErrorCodes.INVALID_PASSWORD
    );
  }

  const payload = { sub: user.id };
  const token = jwt.sign(payload, JWT_PUBLIC_KEY!);

  res.json({
    user,
    token,
  });
};

export const me = async (req: Request, res: Response) => {
  res.json(req.user);
};
