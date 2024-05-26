import express from "express";
import {
  createCompanyProfile,
  getCompanyProfileById,
  updateCompanyProfileById,
  deleteCompanyProfileById,
  getCompanyProfiles,
} from "./../controllers/companies.controllers.js";

const companiesRouter = express.Router();

// Create company profile
companiesRouter.post("/", createCompanyProfile);

// Get a company profile of a given id
companiesRouter.get("/profile/:id", getCompanyProfileById);

// Update a company profile of a given id
companiesRouter.put("/:id", updateCompanyProfileById);

// Delete a  company profile of a given id
companiesRouter.delete("/:id", deleteCompanyProfileById);

// Get company profiles for a given userId
companiesRouter.get("/:userId", getCompanyProfiles);

export { companiesRouter };
