import express from "express";
import {
  signUp,
  logIn,
  getProfile,
  postJob,
  getApplications,
  logOut,
} from "../controllers/company.js";

import { getCompanyListings } from "../controllers/jobs.js";

import {
  upload,
  uploadMiddleWare,
} from "../middleware/company/multer-cloudinary.js";

import { checkCompanyEmail } from "../middleware/company/checkCompanyEmail.js";
import {
  signUpSanitize,
  logInSanitize,
  JobPostingSanitize,
  getProfileSanitize,
  listingsSanitize,
  applicantsSanitize,
} from "../middleware/company/auth/validation.js";

import { authorizationMiddleWare } from "../middleware/company/auth/authorization.js";

const companyRouter = express.Router();

companyRouter.post(
  "/signUp",
  [
    upload.fields([{ name: "profileImg", maxCount: 1 }]),
    uploadMiddleWare,
    signUpSanitize,
    checkCompanyEmail,
  ],
  signUp,
);
companyRouter.post("/login", logInSanitize, logIn);
companyRouter.get(
  "/:id",
  authorizationMiddleWare,
  getProfileSanitize,
  getProfile,
);
companyRouter.post(
  "/postJob",
  authorizationMiddleWare,
  JobPostingSanitize,
  postJob,
);
companyRouter.get(
  "/:id/listings",
  authorizationMiddleWare,
  listingsSanitize,
  getCompanyListings,
);
companyRouter.get(
  "/jobs/:jobId/applications",
  authorizationMiddleWare,
  applicantsSanitize,
  getApplications,
);
companyRouter.get("/logout", logOut);

export default companyRouter;
