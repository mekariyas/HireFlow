import express from "express";
import {
  signUp,
  logIn,
  getProfile,
  postJob,
  getApplications,
  getApplication,
  logOut,
} from "../controllers/company.js";
import { getCompanyListings } from "../controllers/jobs.js";

import {
  upload,
  uploadMiddleWare,
} from "../middleware/company/multer-cloudinary.js";
import { checkCompanyEmail } from "../middleware/company/checkCompanyEmail.js";

const companyRouter = express.Router();

companyRouter.post(
  "/signUp",
  [
    upload.fields([{ name: "profileImg", maxCount: 1 }]),
    uploadMiddleWare,
    checkCompanyEmail,
  ],
  signUp,
);
companyRouter.get("/:id", getProfile);
companyRouter.post("/login", logIn);
companyRouter.post("/postJob", postJob);
companyRouter.get("/:id/listings", getCompanyListings);
companyRouter.get("/jobs/:jobId/applications", getApplications);
companyRouter.get(
  "/application/:applicationId/applicant/:applicantId",
  getApplication,
);
companyRouter.get("/logout", logOut);

export default companyRouter;
