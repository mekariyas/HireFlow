import express from "express";
import {
  signUp,
  logIn,
  logOut,
  getUser,
  viewApplication,
  getApplications,
  apply,
} from "../controllers/user.js";

import { getJobs } from "../controllers/jobs.js";

import { checkUserEmail } from "../middleware/user/checkUserEmail.js";
import {
  upload,
  uploadMiddleWare,
} from "../middleware/user/multer-cloudinary.js";

import {
  signUpSanitize,
  logInSanitize,
  getProfileSanitize,
  applySanitize,
} from "../middleware/user/auth/validation.js";

const userRouter = express.Router();

userRouter.post(
  "/signUp",
  [
    upload.fields([
      { name: "profileImg", maxCount: 1 },
      { name: "cv", maxCount: 1 },
    ]),
    uploadMiddleWare,
    signUpSanitize,
    checkUserEmail,
  ],
  signUp,
);
userRouter.post("/logIn", logInSanitize, logIn);
userRouter.get("/:id", getProfileSanitize, getUser);
userRouter.get("/:userId/getJobs", getJobs);
userRouter.get("/:userId/job/:jobId/viewApplication/:id", viewApplication);
userRouter.get("/:userId/getApplications", getApplications);
userRouter.post("/jobs/:jobId/apply", applySanitize, apply);
userRouter.get("/logOut", logOut);
export default userRouter;
