import bcrypt from "bcrypt";
import { pool } from "./../database/connectDb.js";
import { issueJWT } from "./../services/auth.services.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the email already exists in the database
    const checkEmailQuery = "SELECT * FROM users WHERE email = $1";
    const checkEmailResult = await pool.query(checkEmailQuery, [email]);

    if (checkEmailResult.rows.length > 0) {
      // Email already exists, return an error
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertQuery =
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *";
    const values = [name, email, hashedPassword];

    const result = await pool.query(insertQuery, values);
    const newUser = result.rows[0];

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

    const token = issueJWT({ id: user.id, name: user.name, email: user.email });

    // Return token along with user information
    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { registerUser, loginUser };
