import { eq } from "drizzle-orm";
import type { Request, Response, NextFunction } from "express";
import { drizzle } from "drizzle-orm/node-postgres";
import { usersTable } from "../../db/schema.js";

const db = drizzle(process.env.DATABASE_URL!);

export const checkUserEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Incomplete Data" });
    }
    const fetchUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (fetchUser.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
