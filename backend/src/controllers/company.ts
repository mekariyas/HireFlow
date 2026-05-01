import "dotenv/config";
import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq, and } from "drizzle-orm";
import {
  companyTable,
  applicationTable,
  jobsTable,
  usersTable,
} from "../db/schema.js";

const db = drizzle(process.env.DATABASE_URL!);
export const signUp = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      password,
      niche,
      description,
    }: {
      name: string;
      email: string;
      niche: string;
      password: string;
      description: string;
    } = req.body;
    if (!name || !email! || password || !niche || !description) {
      return res.status(400).json({ message: "Incomplete Data" });
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    await db.insert(companyTable).values({
      name: name,
      email: email,
      password: hash,
      niche,
      description,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Error, Incomplete data" });
    }
    const user = await db
      .select({ email, password })
      .from(companyTable)
      .where(eq(companyTable.email, email));

    const foundUser: any = user[0];
    if (!foundUser.email) {
      return res.status(404).json({ message: "user not found" });
    }
    const userAuth = await bcrypt.compare(password, foundUser.password);
    if (!userAuth) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res
      .status(200)
      .json({ message: "Successfully logged in", id: foundUser.id });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const postJob = async (req: Request, res: Response) => {
  try {
    const { title, description, companyId } = req.body;
    if (!title || !description || !companyId) {
      return res.status(400).json({ message: "Error, Incomplete data" });
    }
    await db.insert(jobsTable).values({
      title: title,
      description: title,
      companyId: Number(companyId),
    });

    return res.status(201).json({ message: "Job Posted" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getApplications = async (req: Request, res: Response) => {
  try {
    const { jobId } = req.params;
    if (!jobId) {
      return res.status(400).json({ message: "Error, Incomplete data" });
    }

    const applications = await db
      .select()
      .from(applicationTable)
      .where(eq(applicationTable.id, Number(jobId)));

    if (applications.length == 0) {
      return res.status(404).json({ message: "Applications not found" });
    }
    return res.status(200).json({ applications });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getApplication = async (req: Request, res: Response) => {
  try {
    const { applicationId, applicantId } = req.params;

    if (!applicationId || !applicantId) {
      return res.status(400).json({ message: "Incomplete Data" });
    }
    const application = await db
      .select()
      .from(applicationTable)
      .where(eq(applicationTable.id, Number(applicationId)))
      .fullJoin(usersTable, eq(applicationTable.applicantId, usersTable.id));
    if (application.length === 0) {
      return res.status(404).json({ message: "Application not found" });
    }
    return res.status(200).json({ application });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logOut = async (req: Request, res: Response) => {
  try {
    const { companyCookie } = req.cookies.companyCookie;
    if (!companyCookie) {
      return res
        .status(401)
        .json({ message: "Unauthorized access, Cookie not found" });
    }
    res.clearCookie(companyCookie);
    return res.status(200).json({ message: "successfully logged out" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
