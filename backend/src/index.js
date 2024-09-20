/**
 * ---------- Loading enviroment varaibles ----------
 */
import "./configs/env.configs.js";

/**
 * ---------- Connecting with database ----------
 */
import "./database/connectDb.js";

/**
 * ---------- Api ----------
 */
import { app } from "./app.js";

/**
 * ---------- Starting server ----------
 */
app.listen(process.env.PORT, () => {
  console.log("Server listening on ...");
  console.log("\x1b[33m%s\x1b[0m", `http://localhost:${process.env.PORT}`);
});
