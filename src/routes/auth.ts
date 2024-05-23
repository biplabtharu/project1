import { Router } from "express";
import { Login, Signup } from "../controllers/auth";
import { errorHandler } from "../controllers/errorHandler";

const authRouter = Router();

authRouter.post("/signup", errorHandler(Signup));
authRouter.post("/login", errorHandler(Login));

export default authRouter;
