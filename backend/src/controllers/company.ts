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
    const accessToken = jwt.sign(
      { email: email, role: role },
      process.env.COMPANY_ACCESS_TOKEN_SECRET!,
      { expiresIn: "7d" },
    );

    const refreshToken = jwt.sign(
      { email, role },
      process.env.COMPANY_REFRESH_TOKEN_SECRET!,
      { expiresIn: "7d" },
    );

    res.cookie("companyToken", refreshToken, {
      maxAge: 604800000,
      secure: process.env.NODE_ENV === "production",
      httpOnly: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    return res
      .status(201)
      .json({ message: "Profile created", id: newCompany[0]?.id, accessToken });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    if (!email || !password) {
      return res.status(400).json({ message: "Error, Incomplete data" });
    }
    const company = await db
      .select({
        id: companyTable.id,
        email: companyTable.email,
        password: companyTable.password,
        role: companyTable.role,
      })
      .from(companyTable)
      .where(eq(companyTable.email, email));

    const foundCompany:
      | { email: string; password: string; id: number; role: string }
      | undefined = company[0];
    if (!foundCompany?.email) {
      return res.status(404).json({ message: "user not found" });
    }
    const userAuth = await bcrypt.compare(password, foundCompany.password);
    if (!userAuth) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign(
      { email: foundCompany.email, role: foundCompany.role },
      process.env.COMPANY_ACCESS_TOKEN_SECRET!,
      { expiresIn: "15m" },
    );

    const refreshToken = jwt.sign(
      { email: foundCompany.email, role: foundCompany.role },
      process.env.COMPANY_REFRESH_TOKEN_SECRET!,
      { expiresIn: "7d" },
    );

    res.cookie("companyToken", refreshToken, {
      maxAge: 604800000,
      secure: process.env.NODE_ENV === "production",
      httpOnly: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    return res.status(200).json({
      message: "Successfully logged in",
      id: foundCompany.id,
      accessToken: accessToken,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { accessToken } = req.body;
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
      accessToken,
      ...foundCompany,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const postJob = async (req: Request, res: Response) => {
  try {
    const { title, description, location, jobType, companyId, accessToken } =
      req.body;

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

    return res.status(201).json({ message: "Job Posted", accessToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getApplications = async (req: Request, res: Response) => {
  try {
    const { jobId } = req.params;
    const { accessToken } = req.body;
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
    return res.status(200).json({ applications, accessToken });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logOut = async (req: Request, res: Response) => {
  try {
    const companyToken = req.cookies?.companyToken;
    if (!companyToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized access, cannot carry out action" });
    }
    res.clearCookie("companyToken", {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res.status(200).json({ message: "successfully logged out" });
  } catch (error) {
    console.log("logout error");
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
