import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

export const authorizationMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  try {
    if (!accessToken) {
      validateRefreshToken(req, res);
    } else {
      jwt.verify(
        accessToken,
        process.env.COMPANY_ACCESS_TOKEN_SECRET!,
        (err: any, decoded: any) => {
          if (err) {
            validateRefreshToken(req, res);
            next();
          } else {
            req.body.email = decoded.email;
            req.body.role = decoded.role;
            next();
          }
        },
      );
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const validateRefreshToken = (req: Request, res: Response) => {
  const refreshToken = req.cookies?.companyToken;
  if (refreshToken) {
    return res.status(401).json({
      message: "Unauthorized access, signup or login",
      redirect: true,
    });
  } else {
    jwt.verify(
      refreshToken,
      process.env.COMPANY_REFRESH_TOKEN_SECRET!,
      (err: any, decoded: any) => {
        if (err) {
          return res.status(401).json({
            message: "Unauthorized access, signup or login",
            redirect: true,
          });
        }
        req.body.email = decoded.email;
        req.body.role = decoded.role;
      },
    );
  }
};
