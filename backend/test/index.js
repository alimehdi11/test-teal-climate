/**
 * ---------- Loading enviroment varaibles ----------
 */
import "../src/configs/env.configs.js";

/**
 * ---------- Connecting with database ----------
 */
const { sequelize } = await import("../src/database/connectDb.js");

/**
 * ---------- Api ----------
 */
const { app } = await import("../src/app.js");

/**
 * ---------- Starting server ----------
 */
app.listen(process.env.PORT, () => {
  console.log("Server listening on ...");
  console.log("\x1b[33m%s\x1b[0m", `http://localhost:${process.env.PORT}`);
});

// Step-1 : Create test user
await import("./createTestUser.js");

// Step-2 : Create businessUnits in all the continents->countries->regions
await import("./createBusinessUnits.js");

// Step-3 : Drop the database
// try {
//   await sequelize.drop();
//   console.log("All tables dropped!");
// } catch (err) {
//   console.error("Error dropping tables:", err);
// }
process.exit();
