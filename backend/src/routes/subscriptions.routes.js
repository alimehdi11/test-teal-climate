import express from "express";
import {
  getSubscription,
  updateSubscription,
} from "../controllers/subscriptions.controllers.js";

const subscriptionRouter = express.Router();

// Read subscription for loggedIn user
subscriptionRouter.get("/:userId", getSubscription);

// Update subscription for loggedIn user
subscriptionRouter.put("/:userId", updateSubscription);

export { subscriptionRouter };
