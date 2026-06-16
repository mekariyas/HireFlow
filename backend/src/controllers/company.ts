import "dotenv/config";
import jwt from "jsonwebtoken";
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
    const { name, email, password, niche, role, description, profileImg } =
      req.body;

    if (!name || !email! || !password || !role || !niche || !description) {
      return res.status(400).json({ message: "Incomplete Data" });
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    const newCompany = await db
      .insert(companyTable)
      .values({
        name,
        email,
        password: hash,
        niche,
        role,
        description,
        profileURL: profileImg,
      })
      .returning();
    return res
      .status(201)
      .json({ message: "Profile created", id: newCompany[0]?.id });
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
    const company = await db
      .select({
        id: companyTable.id,
        email: companyTable.email,
        password: companyTable.password,
      })
      .from(companyTable)
      .where(eq(companyTable.email, email));

    const foundCompany:
      | { email: string; password: string; id: number }
      | undefined = company[0];
    if (!foundCompany?.email) {
      return res.status(404).json({ message: "user not found" });
    }
    const userAuth = await bcrypt.compare(password, foundCompany.password);
    if (!userAuth) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res
      .status(200)
      .json({ message: "Successfully logged in", id: foundCompany.id });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Error, Incomplete data" });
    }

    if (!Number(id)) {
      return res.status(400).json({ message: "Invalid user" });
    }
    const company = await db
      .select({
        id: companyTable.id,
        email: companyTable.email,
        name: companyTable.name,
        role: companyTable.role,
        niche: companyTable.niche,
        profileURL: companyTable.profileURL,
        description: companyTable.description,
      })
      .from(companyTable)
      .where(eq(companyTable.id, Number(id)))
      .limit(1);
    const foundCompany = company[0];
    if (!foundCompany) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "user found",
      ...foundCompany,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const postJob = async (req: Request, res: Response) => {
  try {
    const { title, description, location, jobType, companyId } = req.body;

    if (!title || !description || !companyId || !location || !jobType) {
      return res.status(400).json({ message: "Error, Incomplete data" });
    }

    const id = Number(companyId);
    if (!id) {
      return res
        .status(400)
        .json({ message: "Invalid user, unable to post job" });
    }
    const company = await db
      .select({
        id: companyTable.id,
      })
      .from(companyTable)
      .where(eq(companyTable.id, id))
      .limit(1);
    const foundCompany = company[0];
    if (!foundCompany) {
      return res
        .status(404)
        .json({ message: "User not found, unable to post job" });
    }

    await db.insert(jobsTable).values({
      title: title,
      description: description,
      locationType: location,
      jobType,
      companyId: foundCompany.id,
    });

    return res.status(201).json({ message: "Job Posted" });
  } catch (error) {
    console.error(error);
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
      .select({
        id: applicationTable.id,
        createdAt: applicationTable.createdAt,
        status: applicationTable.status,
        jobId: applicationTable.jobId,
        firstName: usersTable.first_name,
        lastName: usersTable.last_name,
        skills: usersTable.skills,
        cvUrl: usersTable.CVurl,
        profileURL: usersTable.profileURL,
      })
      .from(applicationTable)
      .innerJoin(usersTable, eq(applicationTable.applicantId, usersTable.id))
      .where(eq(applicationTable.id, Number(jobId)));

    if (applications.length == 0) {
      return res.status(404).json({ message: "Applications not found" });
    }
    return res.status(200).json({ applications });
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
