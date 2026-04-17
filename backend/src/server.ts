import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  return res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`);
});
