import type { Request, Response } from "express";
import bcrypt from "bcrypt";

const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password, first_name, last_name, role, skills, niche } =
      req.body;
    if (
      !email ||
      !password ||
      !first_name ||
      !last_name ||
      !role ||
      !skills ||
      !niche
    ) {
      return res.status(400).json({ message: "Incomplete Data" });
    }
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
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
  } catch (error) {}
};

const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
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
