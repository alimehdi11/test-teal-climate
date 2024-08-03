import pg from "pg";

const { Client } = pg;

const config = {
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
};

const databaseName = process.env.DATABASE_NAME;

const createDatabase = async () => {
  const client = new Client(config);

  try {
    await client.connect();
    console.log("Client connected to PostgreSQL");
    await client.query(`CREATE DATABASE ${databaseName};`);
    console.log(`Database ${databaseName} created successfully`);
  } catch (err) {
    console.error("Error creating database", err);
  } finally {
    await client.end();
    console.log("Client disconnected");
  }
};

await createDatabase();
