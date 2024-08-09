import { Subscription } from "../models/subscription.model.js";

const getSubscription = async (req, res) => {
  try {
    const { userId } = req.params;
    const subscription = await Subscription.findOne({ where: { userId } });
    return res.status(200).json(subscription);
  } catch (error) {
    console.log("Could not getSubscription");
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateSubscription = async (req, res) => {
  try {
    const { userId } = req.params;
    const { customerId, subscriptionId, paymentIntentId, clientSecret } =
      req.body;
    const subscription = await Subscription.update(
      { customerId, subscriptionId, paymentIntentId, clientSecret },
      {
        where: {
          userId,
        },
      }
    );
    return res.status(200).json(subscription);
  } catch (error) {
    console.log("Could not updateSubscription");
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getSubscription, updateSubscription };
