import express from "express";
import {
  createCustomerAtStripe,
  createSubscriptionAtStripe,
  getCustomerFromStripe,
  getSubscriptionFromStripe,
  updateSubscriptionAtStripe,
} from "../controllers/stripe.controllers.js";

const stripeRouter = express.Router();

// Get STRIPE_PUBLISHABLE_KEY
stripeRouter.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

// Create customer
stripeRouter.post("/customers", createCustomerAtStripe);

// Get customer
stripeRouter.get("/customers/:customerId", getCustomerFromStripe);

// Create subscription
stripeRouter.post("/subscriptions", createSubscriptionAtStripe);

// Get subscription
stripeRouter.get("/subscriptions/:subscriptionId", getSubscriptionFromStripe);

// Update subscription
stripeRouter.put("/subscriptions/:subscriptionId", updateSubscriptionAtStripe);

export { stripeRouter };
