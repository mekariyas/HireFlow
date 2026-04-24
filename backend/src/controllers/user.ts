import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import type { Request, Response } from "express";
import { usersTable, applicationTable } from "../db/schema.js";
import { eq, and } from "drizzle-orm";
import bcrypt from "bcrypt";

const db = drizzle(process.env.DATABASE_URL!);

const signUp = async (req: Request, res: Response) => {
  try {
    const {
      email,
      password,
      first_name,
      last_name,
      age,
      role,
      skills,
      niche,
      CVurl,
    } = req.body;
    if (
      !email ||
      !password ||
      !first_name ||
      !last_name ||
      !role ||
      !skills ||
      !niche ||
      !CVurl ||
      !age
    ) {
      return res.status(400).json({ message: "Incomplete Data" });
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    await db.insert(usersTable).values({
      name: first_name + " " + last_name,
      email: email.toString(),
      password: hash,
      age: age,
      role: role.toString(),
      skills: skills.toString(),
      niche: niche.toString(),
      CVurl: CVurl,
    });

    return res.status(201).json({ message: "Account Created" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const logIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Error, Incomplete data" });
    }
    const user = await db
      .select({ email, password })
      .from(usersTable)
      .where(eq(usersTable.email, email));
    const foundUser = user[0];
    if (!foundUser.email) {
      return res.status(404).json({ message: "user not found" });
    }
    const userAuth = await bcrypt.compare(password, foundUser.password);
    if (!userAuth) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res
      .status(200)
      .json({ message: "Successfully logged in", foundUser });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Error, Incomplete data" });
    }

    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, Number(id)));
    const foundUser = user[0];
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "user found", foundUser });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const apply = async (req: Request, res: Response) => {
  try {
    const { userId, jobId, status } = req.body;
    if (!userId || jobId || !status) {
      return res.status(400).json({ message: "Incomplete Data" });
    }
    const applications = await db
      .select()
      .from(applicationTable)
      .where(
        and(
          eq(applicationTable.applicantId, Number(userId)),
          eq(applicationTable.jobId, Number(jobId)),
        ),
      );
    if (applications.length > 0) {
      return res
        .status(409)
        .json({ message: "You already have applied to this job" });
    }
    await db
      .insert(applicationTable)
      .values({ applicantId: Number(userId), jobId: Number(jobId) });
    return res.status(201).json({ message: "Successfully applied" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getApplications = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "Incomplete Data" });
    }
    const applications = await db
      .select()
      .from(applicationTable)
      .where(eq(applicationTable.applicantId, Number(userId)));
    if (applications.length === 0) {
      return res.status(404).json({ message: "No applications found" });
    }
    return res
      .status(200)
      .json({ message: "Applications found", applications });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const viewApplication = async (req: Request, res: Response) => {
  try {
    const { id, userId, jobId } = req.params;
    if (!id || !userId || !jobId) {
      return res.status(404).json({ message: "Error, not found" });
    }
    const application = await db
      .select()
      .from(applicationTable)
      .where(
        and(
          eq(applicationTable.id, Number(id)),
          eq(applicationTable.applicantId, Number(userId)),
          eq(applicationTable.jobId, Number(jobId)),
        ),
      );
    if (application.length === 0) {
      return res.status(404).json({ message: "no job applications found" });
    }
    return res
      .status(200)
      .json({ message: "application found", application: application[0] });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const logOut = (req: Request, res: Response) => {
  const { userCookie } = req.cookies.userCookies;
  if (!userCookie) {
    return res
      .status(401)
      .json({ message: "Unauthorized access, Cookie not found" });
  }
  res.clearCookie(userCookie);
  return res.status(200).json({ message: "successfully logged out" });
};

export {
  signUp,
  logIn,
  logOut,
  getUser,
  viewApplication,
  getApplications,
  apply,
};
