import express from "express";
import {
  createCompaniesData,
  getCompaniesDataById,
  updateCompaniesDataById,
  deleteCompaniesDataById,
  getCompaniesDataByUserId,
  getTop10EmissionsByUserId,
} from "./../controllers/companiesData.controllers.js";

const companiesDataRouter = express.Router();

// Create companiesdata
companiesDataRouter.post("/", createCompaniesData);

// Get a companiesdata by given id
companiesDataRouter.get("/activites/:id", getCompaniesDataById); //====>

// Update a companiesdata by given id
companiesDataRouter.put("/:id", updateCompaniesDataById);

// Delete a companiesdata by given id
companiesDataRouter.delete("/:id", deleteCompaniesDataById);

// Get all companiesdata for given userId
companiesDataRouter.get("/:userId", getCompaniesDataByUserId); //====>

// Get top 10 emissions companiesdata by given userId
companiesDataRouter.get("/top10/:userId", getTop10EmissionsByUserId);

export { companiesDataRouter };
