import express from "express";
import {
  createBusinessUnitActivity,
  getBusinessUnitActivityById,
  updateBusinessUnitActivityById,
  deleteBusinessUnitActivityById,
  getAllBusinessUnitsActivities,
  getTop5BusinessUnitsEmissions
} from "../controllers/businessUnitsActivities.controllers.js";
import {
  isBusinessUnitActivityOwner,
  isbusinessUnitIdBelongsToUser,
} from "../middlewares/businessUnitsActivities.middlewares.js";

const businessUnitsActivitiesRouter = express.Router();

// Create businessUnitActivity
businessUnitsActivitiesRouter.post(
  "/",
  isbusinessUnitIdBelongsToUser,
  createBusinessUnitActivity
);

// Get top 5 business units emissions
businessUnitsActivitiesRouter.get(
  "/top5BusinessUnitsEmissions",
  getTop5BusinessUnitsEmissions
);

// Get a businessUnitActivity by given id
businessUnitsActivitiesRouter.get(
  "/:id",
  isBusinessUnitActivityOwner,
  getBusinessUnitActivityById
);

// Update a businessUnitActivity by given id
businessUnitsActivitiesRouter.put(
  "/:id",
  isBusinessUnitActivityOwner,
  isbusinessUnitIdBelongsToUser,
  updateBusinessUnitActivityById
);

// Delete a businessUnitActivity by given id
businessUnitsActivitiesRouter.delete(
  "/:id",
  isBusinessUnitActivityOwner,
  deleteBusinessUnitActivityById
);

// Get businessUnitsActivities for loggedIn user
businessUnitsActivitiesRouter.get("/", getAllBusinessUnitsActivities);

export { businessUnitsActivitiesRouter };
