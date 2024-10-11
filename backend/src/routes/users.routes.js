import express from "express";
import {
  updateUserbyId,
  getUserbyId,
} from "../controllers/users.controllers.js";

const usersRouter = express.Router();

// Update user by id
usersRouter.put("/:id", updateUserbyId);

// Get user by id
usersRouter.get("/:id", getUserbyId);

export { usersRouter };
