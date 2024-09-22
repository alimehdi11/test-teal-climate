import express from "express";
import { getReits } from "../controllers/reits.controllers.js";

const reitsRouter = express.Router();

reitsRouter.get("/", getReits);

export { reitsRouter };
