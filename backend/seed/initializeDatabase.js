/**
 * ---------- Loading enviroment varaibles ----------
 */
import "./../src/configs/env.configs.js";

/**
 * ---------- Creating database ----------
 */
// import "./createDatabase.js";

/**
 * ---------- Creating tables ----------
 */
await import("./createDatabaseTables.js");

/**
 * ---------- Seeding tables ----------
 */
await import("./seedTables.js");
