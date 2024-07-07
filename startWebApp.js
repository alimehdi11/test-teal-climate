import app from "./backend/src/app.js";

/**
 * ---------- Environment variables ----------
 */
process.env.PORT = "5000";
process.env.NODE_ENV = "production";
process.env.DATABASE_NAME = "tealClimate";
process.env.DATABASE_USER = "postgres";
process.env.DATABASE_PASSWORD = "12345678";
process.env.DATABASE_HOST =
  "tealclimate.cxswce6u20m6.ca-central-1.rds.amazonaws.com";
process.env.DATABASE_PORT = "5432";
process.env.SESSION_SECRET =
  "t2ktn1mur7bs7grd2bnokplfig404z887m26qkt188ble8tk8fcylnp0cu7knsqv";
process.env.AUTH_JWT_SECRET_KEY =
  "d3xtmg5j7dsbdyxkiaibcqysmhs0ya0xppz0v5t6vvu4tbhlerywlg8xx0d96y0e8";
process.env.STRIPE_PUBLISHABLE_KEY =
  "pk_test_51P6r4nRu2G1zaGnriyiu4cW4OXXJf8VQbz9XBxxQ1Bxetl2CZ1gKSSAB75vEUHA68Byvq0rELjeJDrmKMXxRCFsl00InZc8UbB";
process.env.STRIPE_SECRET_KEY =
  "sk_test_51P6r4nRu2G1zaGnresFfTp1vnKNjItASmyJuXU27EXFstExso5QqdkhPd2I7xNUU0NL4FKvWKcXdBBGYm1iBjVWV006faNDPeZ";

/**
 * ---------- Starting server ----------
 */
app.listen(process.env.PORT, () => {
  console.log("Server listening on ...");
  console.log("\x1b[33m%s\x1b[0m", `http://localhost:${process.env.PORT}`);
});
