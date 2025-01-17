import stripeConfig from "stripe";

const stripe = stripeConfig(process.env.STRIPE_SECRET_KEY);

const createCustomerAtStripe = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      throw new Error("email is required");
    }
    const customer = await stripe.customers.create({
      email: `${email}`,
    });
    return res.status(200).json(customer);
  } catch (error) {
    console.log("Could not createCustomerAtStripe");
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const createSubscriptionAtStripe = async (req, res) => {
  const { customerId, priceId } = req.body;
  if (!customerId || !priceId) {
    return res
      .status(400)
      .send({ error: { message: "customerId and priceId required" } });
  }
  try {
    // Create the subscription. Note we're expanding the Subscription's
    // latest invoice and that invoice's payment_intent
    // so we can pass it to the front end to confirm the payment
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [
        {
          price: priceId,
        },
      ],
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent"],
    });
    res.send({
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    });
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
};

const getCustomerFromStripe = async (req, res) => {
  try {
    const { customerId } = req.params;
    if (!customerId) {
      throw new Error("customerId is required");
    }
    const customer = await stripe.customers.retrieve(customerId);
    return res.send(customer);
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
};

const getSubscriptionFromStripe = async (req, res) => {
  try {
    const { subscriptionId } = req.params;
    if (!subscriptionId) {
      throw new Error("subscriptionId is required");
    }
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    return res.send(subscription);
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
};

// const updateSubscriptionAtStripe = async (req, res) => {
//   try {
//     const { subscriptionId } = req.params;
//     const payload = req.body;

//     if (!subscriptionId) {
//       throw new Error("subscriptionId is required");
//     }
//     const subscription = await stripe.subscriptions.update(
//       subscriptionId,
//       payload
//     );

//     return res.send(subscription);
//   } catch (error) {
//     return res.status(400).send({ error: { message: error.message } });
//   }
// };

const deleteSubscriptionAtStripe = async (req, res) => {
  try {
    const { subscriptionId } = req.params;
    if (!subscriptionId) {
      throw new Error("subscriptionId is required");
    }
    const subscription = await stripe.subscriptions.cancel(subscriptionId);
    return res.send(subscription);
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
};

const getPaymentMethodByIdFromStripe = async (req, res) => {
  try {
    const { id: paymentMethodId } = req.params;
    if (!paymentMethodId) {
      throw new Error("paymentMethodId is required");
    }
    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);
    return res.send(paymentMethod);
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
};

export {
  createCustomerAtStripe,
  createSubscriptionAtStripe,
  getCustomerFromStripe,
  getSubscriptionFromStripe,
  // updateSubscriptionAtStripe,
  deleteSubscriptionAtStripe,
  getPaymentMethodByIdFromStripe,
};
