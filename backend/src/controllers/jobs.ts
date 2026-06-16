import "dotenv/config";
import type { Request, Response } from "express";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq, and, sql, or, desc, ilike } from "drizzle-orm";
import {
  companyTable,
  applicationTable,
  jobsTable,
  usersTable,
} from "../db/schema.js";

const db = drizzle(process.env.DATABASE_URL!);

//company controller for personal job listing

export const getCompanyListings = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Error, Incomplete data" });
    }
    if (isNaN(Number(id))) {
      return res.status(400).json({ message: "Invalid user" });
    }
    const jobs = await db
      .select()
      .from(jobsTable)
      .where(eq(jobsTable.companyId, Number(id)))
      .orderBy(desc(jobsTable.createdAt))
      .limit(10);
    if (jobs.length == 0) {
      return res.status(200).json({ message: "Jobs not found" });
    }
    return res.status(200).json({ jobs });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};

//user controller for jobs

export const getJobs = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (!userId || isNaN(Number(userId))) {
      return res.status(400).json({
        message: "Invalid user data, unable to get job posts",
      });
    }

    const userInfo = await db
      .select({
        niche: usersTable.niche,
        skills: usersTable.skills,
      })
      .from(usersTable)
      .where(eq(usersTable.id, Number(userId)))
      .limit(1);

    const foundUser = userInfo[0];

    if (!foundUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const jobs = await db
      .select({
        id: jobsTable.id,
        title: jobsTable.title,
        description: jobsTable.description,
        jobType: jobsTable.jobType,
        location: jobsTable.locationType,
        companyId: jobsTable.companyId,
        profileURL: companyTable.profileURL,
        name: companyTable.name,
        createdAt: jobsTable.createdAt,
      })
      .from(jobsTable)
      .innerJoin(companyTable, eq(jobsTable.companyId, companyTable.id))
      .where(eq(companyTable.niche, foundUser.niche))
      .orderBy(desc(jobsTable.createdAt));

    return res.status(200).json({
      jobs,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
