import express, { Express, Request, Response } from "express";
import rootRouter from "./routes";
import { PORT } from "./secrets";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middlewares/errorMiddleware";

const app: Express = express();
export const prisma = new PrismaClient();

app.use(express.json());
app.use("/api", rootRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

app.use(errorMiddleware);
app.listen(PORT, () => {
  console.log(`listening at port 3000`);
});
