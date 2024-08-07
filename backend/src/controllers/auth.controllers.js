import bcrypt from "bcrypt";
import { issueJWT } from "./../services/auth.services.js";
import {
  getSubscriptionFromStripe,
  getSubscription,
} from "./../services/subscription.services.js";
import { User } from "../models/user.model.js";
import { Subscription } from "../models/subscription.model.js";

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Invalid payload" });
    }
    // Check if the email already exists in the database
    const isUserExists = await User.findOne({ where: { email } });

    if (isUserExists) {
      // Email already exists, return an error
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ email, password: hashedPassword });

    await Subscription.create({ userId: user.id });

    const token = issueJWT({
      id: user.id,
      email: user.email,
    });

    res.status(200).json({
      message: "User registered successfully",
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Could not registerUser");
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Invalid payload" });
    }

    const user = await User.findOne({ where: { email } });

    // If no user found with the provided email, return 401 Unauthorized
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password from the database
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    // If passwords don't match, return 401 Unauthorized
    if (!isPasswordMatch) {
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
    console.error("Could not loginUser");
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateToken = (req, res) => {
  try {
    const tokenPayload = req.user;
    if (!tokenPayload.subscribed) {
      delete tokenPayload.exp;
      tokenPayload.subscribed = true;
      // TODO : IMPORTANT : Issue token after confirming if user is surely subscribed from stripe
      const token = issueJWT(tokenPayload);
      return res.send({ token });
    } else {
      return res.status(204).send();
    }
  } catch (error) {
    console.error("Could not updateToken");
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { registerUser, loginUser, updateToken };
