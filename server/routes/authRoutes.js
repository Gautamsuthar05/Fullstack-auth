import express from "express";
import {
  isAuthenticated,
  Login,
  Logout,
  register,
  resetPassword,
  sendResetOtp,
  sendVerifyOtp,
  verifyEmail,
} from "../controllers/authController.js";
import { userAuth } from "../middleware/userAuth.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", Login);
authRouter.post("/logout", Logout);
authRouter.post("/sendVerifyOtp", userAuth, sendVerifyOtp);
authRouter.post("/verifyEmail", userAuth, verifyEmail);
authRouter.get("/is-auth", userAuth, isAuthenticated);
authRouter.post("/resetPassOtp", sendResetOtp);
authRouter.post("/resetPass", resetPassword);

export default authRouter;
