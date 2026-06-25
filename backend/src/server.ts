import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";

import userRouter from "./routes/User.js";
import companyRouter from "./routes/Company.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
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

app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`);
});
