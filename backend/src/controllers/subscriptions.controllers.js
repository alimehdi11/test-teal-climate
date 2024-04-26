import { pool } from "../database/connectDb.js";

const getSubscription = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      throw new Error("userId is required");
    }

    const query = `SELECT * FROM subscriptions WHERE "userId" = '${userId}'`;

    const result = await pool.query(query);
    const subscription = result.rows[0];
    return res.send(subscription);
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
};

const updateSubscription = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      throw new Error("userId is required");
    }

    // Payload
    const customerId = req.body.customerId;
    const subscriptionId = req.body.subscriptionId;
    const paymentIntentId = req.body.paymentIntentId;
    const clientSecret = req.body.clientSecret;

    if (!customerId && !subscriptionId && !paymentIntentId && !clientSecret) {
      console.log("No payload data provided. Skipping update operation.");
      return res.status(204).send(); // Send a 204 No Content response
    }

    let queryParams = [];
    if (customerId) {
      queryParams.push(`"customerId" = '${customerId}'`);
    }
    if (subscriptionId) {
      queryParams.push(`"subscriptionId" = '${subscriptionId}'`);
    }
    if (paymentIntentId) {
      queryParams.push(`"paymentIntentId" = '${paymentIntentId}'`);
    }
    if (clientSecret) {
      queryParams.push(`"clientSecret" = '${clientSecret}'`);
    }

    const query = `UPDATE subscriptions SET ${queryParams.join(
      ", "
    )} WHERE "userId" = '${userId}' RETURNING *`;

    const result = await pool.query(query);
    const subscription = result.rows[0];
    console.table(subscription);
    return res.send(subscription);
  } catch (error) {
    console.log("error updating subscription\n", error.message);
    return res.status(400).send({ error: { message: error.message } });
  }
};

export { getSubscription, updateSubscription };
