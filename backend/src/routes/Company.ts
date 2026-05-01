import express from "express";
import {
  signUp,
  logIn,
  postJob,
  getApplications,
  getApplication,
  logOut,
} from "../controllers/company.js";

const companyRouter = express.Router();

companyRouter.post("/signUp", signUp);
companyRouter.post("/login", logIn);
companyRouter.post("/postJob", postJob);
companyRouter.get("/jobs/:jobId/applications", getApplications);
companyRouter.get(
  "/application/:applicationId/applicant/:applicantId",
  getApplication,
);
companyRouter.get("/logout", logOut);

export default companyRouter;
