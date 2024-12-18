import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();

export const client = new PrismaClient();

app.use(
  cors({
    origin: process.env.FRONTEND_URI,
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

// <-----------------------------------------routes----------------------------------------->
import userRouter from "./routes/User.routes";
import animeRouter from "./routes/Anime.routes";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/anime", animeRouter);

app.listen(process.env.PORT, () => {
  console.log("Server running on port :: ", process.env.PORT);
});
