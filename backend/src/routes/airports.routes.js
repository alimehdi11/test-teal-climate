import express from "express";
import { getAirportByName } from "../controllers/airports.controller.js";

const airportsRouter = express.Router();

// Get airport
airportsRouter.get("/", getAirportByName);

export { airportsRouter };
