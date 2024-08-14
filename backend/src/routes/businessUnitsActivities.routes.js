import express from "express";
import {
  createBusinessUnitActivity,
  getBusinessUnitActivityById,
  updateBusinessUnitActivityById,
  deleteBusinessUnitActivityById,
} from "../controllers/businessUnitsActivites.controllers.js";
import {
  isBusinessUnitActivityOwner,
  isbusinessUnitIdBelongsToUser,
} from "../middlewares/businessUnitsActivites.middleware.js";

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

export { businessUnitsActivitiesRouter };