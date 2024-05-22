import { Router, Express } from "express";
import { Login, Signup } from "../controllers/auth";

const authRouter = Router();

authRouter.post("/signup", Signup);
authRouter.post("/login", Login);

export default authRouter;
