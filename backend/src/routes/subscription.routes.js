import express from "express";
import {
  createCustomer,
  createSubscription,
} from "./../controllers/subscription.controllers.js";

const subscriptionRouter = express.Router();

// Get STRIPE_PUBLISHABLE_KEY
subscriptionRouter.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

// Create customer
subscriptionRouter.post("/customer", createCustomer);

// Create subscription
subscriptionRouter.post("/", createSubscription);

export { subscriptionRouter };
