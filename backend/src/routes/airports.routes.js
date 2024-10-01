import express from "express";
import { getAllAirports } from "../controllers/airports.controllers.js";

const airportsRouter = express.Router();

// Get airport
airportsRouter.get("/", getAllAirports);

export { airportsRouter };
