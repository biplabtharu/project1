import authRouter from "./auth";
import { Router } from "express";

const rootRouter = Router();

rootRouter.use("/auth", authRouter);

export default rootRouter;
