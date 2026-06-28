import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";

import userRouter from "./routes/User.js";
import companyRouter from "./routes/Company.js";

export const app = express();

app.get("/healthCheck", (req: Request, res: Response) => {
  return res.status(200).json({ message: "This end point works" });
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 56,
  message: "too many requests, try again later",
});

app.use(limiter);
app.use(helmet());

app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONT_END,
    credentials: true,
  }),
);

app.use(cookieParser());

app.use("/user", userRouter);

app.use("/company", companyRouter);
