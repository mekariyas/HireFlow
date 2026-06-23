import type { Response, Request, NextFunction } from "express";
import { usersTable, companyTable } from "../db/schema.js";
import jwt from "jsonwebtoken";

export const tokenRefreshMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, role } = req.body;
    if (role === "user") {
      const accessToken = jwt.sign(
        { email: email, role: role },
        process.env.USER_ACCESS_TOKEN_SECRET!,
        { expiresIn: "15m" },
      );

      const refreshToken = jwt.sign(
        { email: email, role: role },
        process.env.USER_REFRESH_TOKEN_SECRET!,
        { expiresIn: "7d" },
      );

      res.cookie("userToken", refreshToken, {
        maxAge: 604800000,
        secure: process.env.NODE_ENV === "production",
        httpOnly: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
      req.body.accessToken = accessToken;
      next();
    } else if (role == "company") {
      const accessToken = jwt.sign(
        { email: email, role: role },
        process.env.COMPANY_ACCESS_TOKEN_SECRET!,
        { expiresIn: "15m" },
      );
      const refreshToken = jwt.sign(
        { email: email, role: role },
        process.env.COMPANY_REFRESH_TOKEN_SECRET!,
        { expiresIn: "7d" },
      );
      res.cookie("companyToken", refreshToken, {
        maxAge: 604800000,
        secure: process.env.NODE_ENV === "production",
        httpOnly: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
      req.body.accessToken = accessToken;
      next();
    }
  } catch (error) {
    console.log("token refresh error");
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
