import express from "express";
import {
  getSubscription,
  updateSubscription,
} from "../controllers/subscriptions.controllers.js";

const subscriptionsRouter = express.Router();

// Read subscription for loggedIn user
subscriptionsRouter.get("/:userId", getSubscription);

// Update subscription for loggedIn user
subscriptionsRouter.put("/:userId", updateSubscription);

export { subscriptionsRouter };
