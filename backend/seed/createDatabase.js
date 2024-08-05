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

    // Check if the database exists
    const res = await client.query(
      `SELECT 1 FROM pg_database WHERE datname='${databaseName}'`
    );

    if (res.rows.length > 0) {
      // Database exists, so drop it
      console.log(`Database ${databaseName} exists. Dropping it...`);
      await client.query(`DROP DATABASE ${databaseName};`);
      console.log(`Database ${databaseName} dropped successfully`);
    }

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
