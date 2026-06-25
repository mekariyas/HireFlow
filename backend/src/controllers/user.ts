import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import type { Request, Response } from "express";
import { usersTable, applicationTable } from "../db/schema.js";
import { eq, and } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const db = drizzle(process.env.DATABASE_URL!);

const signUp = async (req: Request, res: Response) => {
  try {
    const {
      email,
      password,
      first_name,
      last_name,
      role,
      skills,
      niche,
      CVurl,
      profileImg,
    } = req.body;
    if (
      !email ||
      !password ||
      !first_name ||
      !last_name ||
      !role ||
      !skills ||
      !niche ||
      !CVurl
    ) {
      return res.status(400).json({ message: "Incomplete Data" });
    }

    const checkUser = await db
      .select()
      .from(usersTable)
      .where(eq(email, email));
    if (checkUser.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    const newUser = await db
      .insert(usersTable)
      .values({
        first_name: first_name,
        last_name: last_name,
        email: email.toString(),
        password: hash,
        role: role.toString(),
        skills: skills.toString(),
        niche: niche.toString(),
        CVurl: CVurl,
        profileURL: profileImg ? profileImg : "",
      })
      .returning();

    const accessToken = jwt.sign(
      { email: email, role: role },
      process.env.USER_ACCESS_TOKEN_SECRET!,
      { expiresIn: "7d" },
    );

    const refreshToken = jwt.sign(
      { email, role },
      process.env.USER_REFRESH_TOKEN_SECRET!,
      { expiresIn: "7d" },
    );

    res.cookie("userToken", refreshToken, {
      maxAge: 604800000,
      secure: process.env.NODE_ENV === "production",
      httpOnly: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res.status(201).json({
      message: "Account Created",
      id: newUser[0]?.id,
      accessToken: accessToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const logIn = async (req: Request, res: Response) => {
  try {
    const { userEmail, password } = req.body;
    if (!userEmail || !password) {
      return res.status(400).json({ message: "Error, Incomplete data" });
    }
    const user = await db
      .select({
        id: usersTable.id,
        email: usersTable.email,
        password: usersTable.password,
        role: usersTable.role,
      })
      .from(usersTable)
      .where(eq(usersTable.email, userEmail))
      .limit(1);
    const foundUser:
      | { email: string; password: string; id: number; role: string }
      | undefined = user[0];
    if (!foundUser?.email) {
      return res.status(404).json({ message: "user not found" });
    }
    const userAuth = await bcrypt.compare(password, foundUser.password);
    if (!userAuth) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const accessToken = jwt.sign(
      { email: foundUser.email, role: foundUser.role },
      process.env.USER_ACCESS_TOKEN_SECRET!,
      { expiresIn: "15m" },
    );

    const refreshToken = jwt.sign(
      { email: foundUser.email, role: foundUser.role },
      process.env.USER_REFRESH_TOKEN_SECRET!,
      { expiresIn: "7d" },
    );

    res.cookie("userToken", refreshToken, {
      maxAge: 604800000,
      secure: process.env.NODE_ENV === "production",
      httpOnly: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    return res.status(200).json({
      message: "Successfully logged in",
      id: foundUser.id,
      accessToken: accessToken,
    });
  } catch (error) {
    console.log("login controller error");
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUser = async (req: Request, res: Response) => {
  console.log("i am here");
  try {
    const { id } = req.params;
    const { accessToken } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Error, Incomplete data" });
    }

    const user = await db
      .select({
        id: usersTable.id,
        email: usersTable.email,
        firstName: usersTable.first_name,
        lastName: usersTable.last_name,
        role: usersTable.role,
        skills: usersTable.skills,
        niche: usersTable.niche,
        CVurl: usersTable.CVurl,
        profileURL: usersTable.profileURL,
      })
      .from(usersTable)
      .where(eq(usersTable.id, Number(id)))
      .limit(1);
    const foundUser = user[0];
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "user found",
      accessToken: accessToken,
      ...foundUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const apply = async (req: Request, res: Response) => {
  try {
    const { userId, accessToken } = req.body;

    const { jobId } = req.params;

    if (!userId || !jobId) {
      return res.status(400).json({ message: "Incomplete Data" });
    }

    if (isNaN(Number(userId)) || isNaN(Number(jobId))) {
      return res
        .status(400)
        .json({ message: "Error. Couldn't apply, invalid user information" });
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
    return res
      .status(201)
      .json({ message: "Successfully applied", accessToken });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getApplications = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { accessToken } = req.body;
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
      .json({ message: "Applications found", applications, accessToken });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const viewApplication = async (req: Request, res: Response) => {
  try {
    const { id, userId, jobId } = req.params;
    const { accessToken } = req.body;
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
    return res.status(200).json({
      message: "application found",
      application: application[0],
      accessToken,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const logOut = (req: Request, res: Response) => {
  try {
    console.log("you called for user log out");
    const userToken = req.cookies?.userToken;
    if (!userToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized access, cannot carry out action" });
    }
    res.clearCookie("userToken", {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    return res.status(200).json({ message: "successfully logged out" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
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
