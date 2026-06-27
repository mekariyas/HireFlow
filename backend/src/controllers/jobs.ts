import "dotenv/config";
import type { Request, Response, NextFunction } from "express";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq, and, sql, or, desc, ilike } from "drizzle-orm";
import {
  companyTable,
  applicationTable,
  jobsTable,
  usersTable,
} from "../db/schema.js";

const db = drizzle(process.env.DATABASE_URL!);

//company-job  controllers

export const getCompanyListings = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { accessToken } = req.body;
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
    return res.status(200).json({ jobs, accessToken });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};

export const editJob = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, description, location, jobType, jobId, accessToken } =
      req.body;

    if (
      !jobId ||
      isNaN(Number(jobId)) ||
      !title ||
      !description ||
      !location ||
      !jobType
    ) {
      return res
        .status(400)
        .json({ message: "Error, data is incomplete or wrong" });
    }

    const updatedJob = await db
      .update(jobsTable)
      .set({
        title: title,
        description: description,
        locationType: location,
        jobType: jobType,
        updatedAt: new Date(),
      })
      .where(eq(jobsTable.id, Number(jobId)))
      .returning();

    if (updatedJob.length === 0) {
      return res.status(403).json({ error: "Unauthorized or job not found" });
    }
    return res
      .status(200)
      .json({ message: "Job edited successfully", accessToken });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};

export const deleteJob = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { jobId, accessToken } = req.body;

    if (isNaN(Number(jobId))) {
      return res
        .status(400)
        .json({ message: "Invalid job information, unable to delete" });
    }

    const deletedJob = await db
      .delete(jobsTable)
      .where(eq(jobsTable.id, Number(jobId)))
      .returning();
    if (deletedJob.length === 0) {
      return res.status(403).json({ error: "Unauthorized or job not found" });
    }
    res.status(200).json({ message: "job deleted successfully", accessToken });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};

//user-job related controllers

export const getJobs = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { accessToken } = req.body;
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
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const searchJob = async (req: Request, res: Response) => {
  try {
    const { title, locationType, jobType } = req.query as {
      title?: string;
      locationType?: string;
      jobType?: string;
    };

    if (!title && !locationType && !jobType) {
      return res
        .status(400)
        .json({ message: "Provide at least one search parameter" });
    }

    const jobs = await db
      .select({
        id: jobsTable.id,
        title: jobsTable.title,
        description: jobsTable.description,
        locationType: jobsTable.locationType,
        jobType: jobsTable.jobType,
        createdAt: jobsTable.createdAt,
        updatedAt: jobsTable.updatedAt,
        companyId: jobsTable.companyId,
        companyName: companyTable.name,
        profileURL: companyTable.profileURL,
      })
      .from(jobsTable)
      .innerJoin(companyTable, eq(companyTable.id, jobsTable.companyId))
      .where(
        or(
          title ? ilike(jobsTable.title, `%${title}%`) : undefined,
          locationType
            ? eq(
                jobsTable.locationType,
                locationType as "Remote" | "Hybrid" | "On-site",
              )
            : undefined,
          jobType
            ? eq(
                jobsTable.jobType,
                jobType as
                  | "Full-time"
                  | "Part-time"
                  | "Contract"
                  | "Internship",
              )
            : undefined,
        ),
      )
      .limit(20);

    if (jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found" });
    }

    return res.status(200).json({ message: "Found jobs", jobs });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
