import express from "express";
import {
  registerUser,
  loginUser,
  updateToken,
  forgetPassword,
  resetPassword,
} from "./../controllers/auth.controllers.js";
import { verifyToken } from "./../middlewares/auth.middlewares.js";

const authRouter = express.Router();

// Register route
authRouter.post("/register", registerUser);

// Login route
authRouter.post("/login", loginUser);

// Update JWT
authRouter.post("/token", verifyToken, updateToken);

// Forget password
authRouter.post("/forget-password", forgetPassword);

// Reset password
authRouter.post("/reset-password", resetPassword);

export { authRouter };
