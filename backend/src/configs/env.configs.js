import dotenv from "dotenv";

// Load environment variables based on NODE_ENV
switch (process.env.NODE_ENV) {
  case "development":
    dotenv.config({ path: "./.env.development" });
    // Always load .env.development.local to override any specific environment variables
    dotenv.config({
      path: "./.env.development.local",
      override: true,
    });
    break;
  case "production":
    dotenv.config({ path: "./.env.production" });
    break;
}

// Log environment variables in development mode
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
