import express from "express";
import { getEeios } from "../controllers/eeios.controllers.js";

const eeiosRouter = express.Router();

eeiosRouter.get("/", getEeios);

export { eeiosRouter };
