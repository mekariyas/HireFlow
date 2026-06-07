import { eq } from "drizzle-orm";
import type { Request, Response, NextFunction } from "express";
import { drizzle } from "drizzle-orm/node-postgres";
import { companyTable } from "../../db/schema.js";
import { v2 as cloudinary } from "cloudinary";

const db = drizzle(process.env.DATABASE_URL!);

export const checkCompanyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log("email request body: ", req.body);
    const { email, public_id } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Incomplete Data" });
    }
    const fetchUser = await db
      .select()
      .from(companyTable)
      .where(eq(companyTable.email, email));

    if (fetchUser.length > 0) {
      //to check if the media has been uploaded by public_id
      if (public_id) {
        await cloudinaryDelete(public_id);
      }
      return res.status(409).json({ message: "User already exists" });
    }
    next();
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

const cloudinaryDelete = async (public_id: string) => {
  try {
    await cloudinary.uploader.destroy(public_id);
  } catch (error) {
    throw error;
  }
};
