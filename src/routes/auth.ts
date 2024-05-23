import { Router } from "express";
import { Login, me, Signup } from "../controllers/auth";
import { errorHandler } from "../controllers/errorHandler";
import { AuthMiddleware } from "../middlewares/authMiddleware";

const authRouter = Router();

authRouter.post("/signup", errorHandler(Signup));
authRouter.post("/login", errorHandler(Login));
authRouter.get("/me", [AuthMiddleware], me);

export default authRouter;
