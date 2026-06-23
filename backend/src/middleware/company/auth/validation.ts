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

const getProfile = z.object({
  email: z.string().trim(),
  role: z.string().trim(),
});

export const getProfileSanitize = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = getProfile.safeParse({
      email: req.body.email,
      role: req.body.role,
    });

    if (!result.success) {
      return res.status(400).json({
        message: z.prettifyError(result.error),
      });
    }
    req.body.email = result.data.email;
    req.body.role = result.data.role;
    next();
  } catch (error) {
    console.error("get profile sanitize company");
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

const jobId = z.object({
  jobId: z.string("error job info").trim(),
});

export const applicantsSanitize = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = jobId.safeParse(req.params);
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

const editJob = z.object({
  email: z.string().email().trim(),
  role: z.string().trim(),
  title: z.string("error,no title provided"),
  description: z.string("error, no valid job description"),
  jobType: z.string("error, no valid job type provided"),
  location: z.string("error, no valid location provided"),
});

export const editJobSanitize = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = editJob.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: z.prettifyError(result.error)
          ? z.prettifyError(result.error)
          : "Unauthorized, Invalid data",
      });
    }
    req.body = result.data;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const deleteJob = z.object({
  email: z.email(),
  role: z.string().trim(),
  jobId: z.string().trim(),
});

export const deleteJobSanitize = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = deleteJob.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: "Unauthorized access, unable to delete job",
      });
    }
    req.body = result.data;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};
