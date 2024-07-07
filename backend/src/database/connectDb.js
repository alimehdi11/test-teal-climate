import pg from "pg";

const poolOptions = {
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
};

if (process.env.NODE_ENV === "production") {
  poolOptions.ssl = {
    rejectUnauthorized: false, // Set to true to reject unauthorized connections
  };
}

const pool = new pg.Pool(poolOptions);

export { pool };
