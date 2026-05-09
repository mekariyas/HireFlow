import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import type { Request, Response, NextFunction } from "express";
import path from "node:path";

const storage = multer.memoryStorage();

interface MulterFiles {
  profileImg?: Express.Multer.File[];
  cv?: Express.Multer.File[];
}

export const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
});

//Cloudinary configuration

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const uploadMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const files = req.files as MulterFiles;
    const profileImg = files.profileImg?.[0];
    const cv = files.cv?.[0];
    const personEmail = req.body.email;
    if (!cv) {
      return res.status(400).json({ message: "Upload cv" });
    } else if (cv.mimetype !== "application/pdf") {
      return res.status(400).json({ message: "cv must be in pdf format" });
    } else if (profileImg) {
      await cloudinaryUpload(profileImg.buffer, {
        asset_folder: `PERN/users/${personEmail}/profileImgs/${profileImg.originalname}`,
      });
      req.body.profileImg = `PERN/users/${personEmail}/profileImgs/${profileImg.originalname}`;
    }

    await cloudinaryUpload(cv.buffer, {
      asset_folder: `/PERN/users/${personEmail}/cvs/${cv.originalname}`,
    });
    req.body.CVurl = `PERN/users/${personEmail}/cvs/${cv.originalname}`;
    next();
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

interface uploadOptions {
  asset_folder: string;
}

const cloudinaryUpload = (buffer: Buffer, options: uploadOptions) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) reject(error);
        resolve(result);
      },
    );
    stream.end(buffer);
  });
};
