import express from "express";
import { getElectricVehicle } from "../controllers/electricVehicles.controllers.js";

const electricVehiclesRouter = express.Router();

/**
 * Read electricVehicles for given
 * query params => [scope, level1, level2, level3, level4, uom, unit, electricityConsumptionPerUnit]
 */
electricVehiclesRouter.get("/", getElectricVehicle);

export { electricVehiclesRouter };
