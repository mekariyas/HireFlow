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

const userRouter = express.Router();

userRouter.post("/signUp", signUp);
userRouter.post("/logIn", logIn);
userRouter.post("/:id", getUser);
userRouter.get("/:userId/job/:jobId/viewApplication/:id", viewApplication);
userRouter.get("/:userId/getApplications", getApplications);
userRouter.post("/apply", apply);
userRouter.get("/logOut", logOut);
export default userRouter;
