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

import { checkUserEmail } from "../middleware/user/checkUserEmail.js";
import {
  upload,
  uploadMiddleWare,
} from "../middleware/user/multer-cloudinary.js";

const userRouter = express.Router();

userRouter.post(
  "/signUp",
  [
    upload.fields([
      { name: "profileImg", maxCount: 1 },
      { name: "cv", maxCount: 1 },
    ]),
    uploadMiddleWare,
    checkUserEmail,
  ],
  signUp,
);
userRouter.post("/logIn", logIn);
userRouter.get("/:id", getUser);
userRouter.get("/:userId/job/:jobId/viewApplication/:id", viewApplication);
userRouter.get("/:userId/getApplications", getApplications);
userRouter.post("/jobs/:jobId/apply", apply);
userRouter.get("/logOut", logOut);
export default userRouter;
