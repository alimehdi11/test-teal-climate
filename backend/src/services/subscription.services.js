import { Subscription } from "./../models/subscription.model.js";
import stripeConfig from "stripe";

const stripe = stripeConfig(process.env.STRIPE_SECRET_KEY);

const getSubscriptionFromStripe = async (subscriptionId) => {
  try {
    if (!subscriptionId) {
      throw new Error("subscriptionId is required");
    }
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    return subscription;
  } catch (error) {
    console.log("Could not getSubscriptionFromStripe");
    console.error(error.message);
  }
};

const getSubscription = async (userId) => {
  try {
    if (!userId) {
      throw new Error("userId is required");
    }

    // const query = `SELECT * FROM subscriptions WHERE "userId" = '${userId}'`;
    // const result = await pool.query(query);
    // const subscription = result.rows[0];
    const subscription = Subscription.findOne({ where: { userId } });
    return subscription;
  } catch (error) {
    console.log("Could not getSubscriptionFromStripe");
    console.error(error.message);
  }
};

export { getSubscriptionFromStripe, getSubscription };
