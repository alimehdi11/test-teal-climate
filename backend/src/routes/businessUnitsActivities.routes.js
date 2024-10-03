import express from "express";
import {
  createBusinessUnitActivity,
  getBusinessUnitActivityById,
  updateBusinessUnitActivityById,
  deleteBusinessUnitActivityById,
  getAllBusinessUnitsActivities,
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
