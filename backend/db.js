const Pool = require("pg").Pool;

const DATABASE_NAME = process.env.DATABASE_NAME || "main";

// const pool = new Pool({
//   user: "postgres",
//   password: "admin",
//   host: "localhost",
//   port: 5432,
//   database: DATABASE_NAME,
// });

const pool = new Pool({
  user: "postgres",
  password: "12345678",
  host: "tealclimate.cxswce6u20m6.ca-central-1.rds.amazonaws.com",
  port: 5432,
  database: DATABASE_NAME,
  ssl: {
    rejectUnauthorized: false, // Set to true to reject unauthorized connections
  },
});

module.exports = pool;
