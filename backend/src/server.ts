import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import userRouter from "./routes/User.js";
import companyRouter from "./routes/Company.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(cookieParser());

app.use("/user", userRouter);

app.use("/company", companyRouter);

app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`);
});
