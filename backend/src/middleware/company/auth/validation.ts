import type { Request, Response, NextFunction } from "express";
import * as z from "zod";

const signUp = z.object({
  name: z.string("name: expected a string").trim(),
  email: z.email("email: expected a string containing @").trim(),
  password: z
    .string("password: expected a string with a minimum length of 8 characters")
    .trim()
    .min(8),
  niche: z.string("niche: expected a string").trim(),
  description: z.string("description: expected a string").trim(),
});

const logIn = z.object({
  email: z.email("email: expected a string containing @").trim(),
  password: z
    .string("password: expected a string with a minimum length of 8 characters")
    .trim()
    .min(8),
});

//used a universal id schema because listingsSanitize, applicantsSanitize and profileSanitize all use id
const getId = z.object({
  id: z.string("id: expected a string").trim(),
});

const jobPost = z.object({
  title: z.string("title: expected a string").trim(),
  description: z.string("description: expected a string").trim(),
  location: z.string("location: expected a string").trim(),
  jobType: z.string("job type: expected a string").trim(),
  companyId: z.string("error: expected a string").trim(),
});

export const signUpSanitize = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = signUp.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: z.prettifyError(result.error),
      });
    }

    req.body = result.data;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};

export const logInSanitize = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = logIn.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: z.prettifyError(result.error),
      });
    }

    req.body = result.data;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};

export const JobPostingSanitize = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = jobPost.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: z.prettifyError(result.error),
      });
    }

    req.body = result.data;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};

export const getProfileSanitize = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = getId.safeParse(req.params);

    if (!result.success) {
      return res.status(400).json({
        message: z.prettifyError(result.error),
      });
    }

    req.params = result.data;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};

export const listingsSanitize = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = getId.safeParse(req.params);

    if (!result.success) {
      return res.status(400).json({
        message: z.prettifyError(result.error),
      });
    }

    req.params = result.data;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};

export const applicantsSanitize = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = getId.safeParse(req.params);

    if (!result.success) {
      return res.status(400).json({
        message: z.prettifyError(result.error),
      });
    }

    req.params = result.data;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};
