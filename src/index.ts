import express, { Express, Request, Response } from "express";

const app: Express = express();

app.get("/", (req, res) => {
  res.send("Hello world");
});
