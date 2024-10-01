import express from "express";
import {
  createPeriod,
  getAllPeriods,
} from "../controllers/periods.controllers.js";

const periodsRouter = express.Router();

// Create period
periodsRouter.post("/", createPeriod);
// Get all periods of loggedIn user
periodsRouter.get("/", getAllPeriods);

export { periodsRouter };
