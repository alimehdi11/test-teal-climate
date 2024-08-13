import express from "express";
import { getElectricVehicle } from "../controllers/electricVehicles.controllers.js";

const electricVehiclesRouter = express.Router();

/**
 * Read electricVehicles for given
 * query params => [level1, level2, level3, unitOfMeasurement]
 */
electricVehiclesRouter.get("/", getElectricVehicle);

export { electricVehiclesRouter };
