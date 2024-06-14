import bcrypt from "bcrypt";
import { pool } from "./../database/connectDb.js";
import { issueJWT } from "./../services/auth.services.js";
import {
  getSubscriptionFromStripe,
  getSubscription,
} from "./../services/subscription.services.js";

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Invalid payload" });
    }
    // Check if the email already exists in the database
    const checkEmailQuery = "SELECT * FROM users WHERE email = $1";
    const checkEmailResult = await pool.query(checkEmailQuery, [email]);

    if (checkEmailResult.rows.length > 0) {
      // Email already exists, return an error
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertQuery =
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *";
    const values = [email, hashedPassword];

    const result = await pool.query(insertQuery, values);
    const newUser = result.rows[0];

    // Create a subscription entry
    const subscriptionInsertQuery = `INSERT INTO subscriptions ("userId") VALUES ($1)`;
    await pool.query(subscriptionInsertQuery, [newUser.id]);

    const token = issueJWT({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    });

    res.status(200).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // SQL query to fetch user data by email
    const query = "SELECT * FROM users WHERE email = $1";
    const result = await pool.query(query, [email]);

    // If no user found with the provided email, return 401 Unauthorized
    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = result.rows[0];

    // Compare the provided password with the hashed password from the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If passwords don't match, return 401 Unauthorized
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    let subscriptionFromStripe;
    const subscription = await getSubscription(user.id);

    if (subscription && subscription.subscriptionId) {
      subscriptionFromStripe = await getSubscriptionFromStripe(
        subscription.subscriptionId
      );
    }

    const tokenPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      subscribed: false,
    };

    if (
      subscriptionFromStripe &&
      !subscriptionFromStripe.error &&
      subscriptionFromStripe.status === "active"
    ) {
      tokenPayload.subscribed = true;
    }

    const token = issueJWT(tokenPayload);

    // Return token along with user information
    res.status(200).json({
      message: "Login successful",
      token,
      user: tokenPayload,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateToken = (req, res) => {
  const tokenPayload = req.user;
  if (!tokenPayload.subscribed) {
    delete tokenPayload.exp;
    tokenPayload.subscribed = true;
    const token = issueJWT(tokenPayload);
    return res.send({ token });
  } else {
    return res.status(204).send();
  }
};

export { registerUser, loginUser, updateToken };
