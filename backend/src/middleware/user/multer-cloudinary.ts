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
  limits: { fileSize: 5 * 1024 * 1024 },
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
      const profileId: any = await cloudinaryUpload(profileImg.buffer, {
        asset_folder: `PERN/users/${personEmail}/profileImgs`,
        resource_type: "image",
      });
      req.body.profileImg = profileId.secure_url;
    }

    const cvId: any = await cloudinaryUpload(cv.buffer, {
      asset_folder: `/PERN/users/${personEmail}/cvs`,
      resource_type: "auto",
    });
    req.body.CVurl = cvId.secure_url;
    next();
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

interface uploadOptions {
  asset_folder: string;
  resource_type: "image" | "video" | "raw" | "auto";
}

const cloudinaryUpload = (buffer: Buffer, options: uploadOptions) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      },
    );
    stream.end(buffer);
  });
};
