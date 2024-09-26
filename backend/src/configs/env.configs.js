import dotenv from "dotenv";

// Load environment variables based on NODE_ENV
switch (process.env.NODE_ENV) {
  case "development":
    dotenv.config({ path: "./.env.development" });
    break;
  case "production":
    dotenv.config({ path: "./.env.production" });
    break;
  case "test":
    dotenv.config({ path: "./.env.test" });
    break;
}

// Always load .env.local to override any specific environment variables
dotenv.config({ path: "./.env.local", override: true });

// Log environment variables in development or test mode
if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
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
