import express from "express";
import {
  createBusinessUnit,
  getBusinessUnitById,
  updateBusinessUnitById,
  deleteBusinessUnitById,
} from "./../controllers/businessUnits.controllers.js";
import { isBusinessUnitOwner } from "./..//middlewares/businessUnits.middleware.js";

const businessUnitsRouter = express.Router();

// Create businessunit
businessUnitsRouter.post("/", createBusinessUnit);

// Get a businessunit of a given id
businessUnitsRouter.get("/:id", isBusinessUnitOwner, getBusinessUnitById);

// Update a businessunit of a given id
businessUnitsRouter.put("/:id", isBusinessUnitOwner, updateBusinessUnitById);

// Delete a businessunit of a given id
businessUnitsRouter.delete("/:id", isBusinessUnitOwner, deleteBusinessUnitById);

export { businessUnitsRouter };
