const Pool = require("pg").Pool;

const DATABASE_NAME = process.env.DATABASE_NAME || "main";

const pool = new Pool({
  user: "postgres",
  password: "admin",
  host: "localhost",
  port: 5432,
  database: DATABASE_NAME,
});

module.exports = pool;
