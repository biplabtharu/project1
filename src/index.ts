// import "./types/express";
import express, { Express, Request, Response } from "express";
import rootRouter from "./routes";
import { PORT } from "./secrets";
import { PrismaClient } from "@prisma/client";
import { globalErrorMiddleware } from "./middlewares/globalErrorMiddleware";

const app: Express = express();
export const prisma = new PrismaClient();

app.use(express.json());
app.use("/api", rootRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

app.use(globalErrorMiddleware);
app.listen(PORT, () => {
  console.log(`listening at port 3000`);
});
