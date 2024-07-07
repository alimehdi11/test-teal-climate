import dotenv from "dotenv";

if (process.env.NODE_ENV === "development") {
  dotenv.config({ path: "./.env.development" });
} else {
  dotenv.config({ path: "./.env.production" });
}

/**
 * ---------- Log environment variables ----------
 */
if (process.env.NODE_ENV === "development") {
  console.table([
    ["PORT", process.env.PORT],
    ["NODE_ENV", process.env.NODE_ENV],
    ["DATABASE_NAME", process.env.DATABASE_NAME],
    ["DATABASE_USER", process.env.DATABASE_USER],
    ["DATABASE_PASSWORD", process.env.DATABASE_PASSWORD],
    ["DATABASE_HOST", process.env.DATABASE_HOST],
    ["DATABASE_PORT", process.env.DATABASE_PORT],
  ]);
}
