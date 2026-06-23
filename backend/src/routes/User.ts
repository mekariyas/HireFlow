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

import { authorizationMiddleWare } from "../middleware/user/auth/authorization.js";

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
userRouter.get("/logout", logOut);
userRouter.get("/:id", authorizationMiddleWare, getProfileSanitize, getUser);
userRouter.get("/:userId/getJobs", authorizationMiddleWare, getJobs);
userRouter.get(
  "/:userId/job/:jobId/viewApplication/:id",
  authorizationMiddleWare,
  viewApplication,
);
userRouter.get(
  "/:userId/getApplications",
  authorizationMiddleWare,
  getApplications,
);
userRouter.post(
  "/jobs/:jobId/apply",
  authorizationMiddleWare,
  applySanitize,
  apply,
);
export default userRouter;
