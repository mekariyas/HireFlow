import type { Request, Response, NextFunction } from "express";
import * as z from "zod";

const SignUp = z.object({
  first_name: z.string("First name: expected a string").trim(),
  last_name: z.string("last name: expected a string").trim(),
  skills: z.string("skills: expected a string").trim(),
  niche: z.string("niche: expected a string").trim(),
  email: z.z.email("email: expected a string containing @").trim(),
  password: z
    .string("password: expected a string with a minimum length of 8 characters")
    .trim()
    .min(8),
});

export const signUpSanitize = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = SignUp.safeParse(req.body);

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

const Login = z.object({
  userEmail: z.email("email: expected a string containing @").trim(),
  password: z.string("password: expected a string").trim(),
});

export const logInSanitize = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = Login.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: z.prettifyError(result.error),
      });
    }

    req.body = result.data;
    next();
  } catch (error) {
    console.log("login validation error");
    console.error(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const getId = z.object({
  id: z.string("expected a string").trim(),
});

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

const apply = z.object({
  userId: z.string("expected a string").trim(),
  jobId: z.string("expected a string").trim(),
});

export const applySanitize = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = apply.safeParse({ ...req.body, ...req.params });

    if (!result.success) {
      return res.status(400).json({
        message: z.prettifyError(result.error),
      });
    }
    console.log();
    req.body.userId = result.data.userId;
    req.params.id = result.data.jobId;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};
