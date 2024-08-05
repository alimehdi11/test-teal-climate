import express from "express";
import {
  getBusinessUnitsByUserId,
  getBusinessUnitsActivitiesByUserId,
  getTop10EmissionsByUserId,
  updateUserbyId,
  getUserbyId,
} from "../controllers/users.controllers.js";

const usersRouter = express.Router();

// Get user's businessUnits for given userId
usersRouter.get("/:userId/businessUnits", getBusinessUnitsByUserId);

// Get user's businessUnitsActivities for given userId
usersRouter.get(
  "/:userId/businessUnitsActivities",
  getBusinessUnitsActivitiesByUserId
);

// Get user's top10Emissions for given userId
usersRouter.get("/:userId/top10Emissions", getTop10EmissionsByUserId);

// Update user by id
usersRouter.put("/:id", updateUserbyId);

// Get user by id
usersRouter.get("/:id", getUserbyId);

export { usersRouter };
