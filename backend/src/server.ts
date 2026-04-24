import express from "express";
import dotenv from "dotenv";

import userRouter from "./routes/User.js";
import companyRouter from "./routes/Company.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/user", userRouter);

app.use("/company", companyRouter);

app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`);
});
