import express from "express";
import {
  signUp,
  logIn,
  getProfile,
  postJob,
  getApplications,
  logOut,
} from "../controllers/company.js";

import { getCompanyListings, editJob, deleteJob } from "../controllers/jobs.js";

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
  editJobSanitize,
  deleteJobSanitize,
} from "../middleware/company/auth/validation.js";

import { tokenRefreshMiddleWare } from "../middleware/TokenRefresh.js";

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
companyRouter.get("/logout", logOut);

companyRouter.get(
  "/:id",
  authorizationMiddleWare,
  getProfileSanitize,
  tokenRefreshMiddleWare,
  getProfile,
);
companyRouter.post(
  "/postJob",
  authorizationMiddleWare,
  JobPostingSanitize,
  tokenRefreshMiddleWare,
  postJob,
);
companyRouter.get(
  "/:id/listings",
  authorizationMiddleWare,
  listingsSanitize,
  tokenRefreshMiddleWare,
  getCompanyListings,
);
companyRouter.get(
  "/jobs/:jobId/applications",
  authorizationMiddleWare,
  applicantsSanitize,
  tokenRefreshMiddleWare,
  getApplications,
);
companyRouter.put(
  "/editJob",
  authorizationMiddleWare,
  editJobSanitize,
  tokenRefreshMiddleWare,
  editJob,
);

companyRouter.delete(
  "/deleteJob",
  authorizationMiddleWare,
  deleteJobSanitize,
  tokenRefreshMiddleWare,
  deleteJob,
);

export default companyRouter;
