import { prisma } from "../../lib/prisma.ts";
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
    const user = await prisma.user.create({
      data: {
        email: email,
        password: hash,
        first_name: first_name,
        last_name: last_name,
        role: role,
        skills: skills,
        niche: niche,
      },
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
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userAuth = await bcrypt.compare(password, user.password);
    if (!userAuth) {
      return res
        .status(401)
        .json({ message: "Email or password doesn't match" });
    }
    return res.status(200).json({ message: "User AUthorized" });
  } catch (error) {}
};

const getUser = async (req: Request, res: Response) => {};

const Apply = (req: Request, res: Response) => {};

const viewApplications = (req: Request, res: Response) => {};

const viewApplication = async (req: Request, res: Response) => {
  try {
    const { id, userId, jobId } = req.params;
    if (!id || !userId || !jobId) {
      return res.status(404).json({ message: "Error, not found" });
    }
    const application = await prisma.application.findUnique({
      where: {
        id: Number(id),
        applicantId: Number(userId),
        jobId: Number(jobId),
      },
      include: { job: true },
    });
    if (!application) {
      return res.status(404).json({ message: "Error, data not found" });
    }
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const logOut = (req: Request, res: Response) => {};
