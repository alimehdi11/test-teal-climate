import express from "express";
import cors from "cors";
import path from "path";
import { authRouter } from "./routes/auth.routes.js";
import { companiesRouter } from "./routes/companies.routes.js";
import { companiesDataRouter } from "./routes/companiesData.routes.js";
import { getWorldHeatMapDataByUserId } from "./controllers/worldHeatMap.controllers.js";
import { createCompanyIntro } from "./controllers/companyIntro.controllers.js";
import { getActivityeData } from "./controllers/activityData.controllers.js";
import { getCategories } from "./controllers/categories.controllers.js";
import { getCountries } from "./controllers/countries.controllers.js";
import { verifyToken } from "./middlewares/auth.middlewares.js";
import { subscriptionsRouter } from "./routes/subscriptions.routes.js";
import { stripeRouter } from "./routes/stripe.routes.js";
import { handleWebhookEvents } from "./controllers/webhook.controllers.js";
import { airportsRouter } from "./routes/airports.routes.js";
import { electricVehiclesRouter } from "./routes/electricVehicles.routes.js";

const app = express();

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

/**
 * ---------- App configs ----------
 */
if (process.env.NODE_ENV === "development") {
  const corsOptions = {
    origin: process.env.FRONTEND_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
  };
  app.use(cors(corsOptions));
}

app.use(express.json());
app.use(express.static(path.join(process.cwd(), "public")));

/**
 * ---------- Routes ----------
 */
app.use("/auth", authRouter);
app.get("/activitydata", verifyToken, getActivityeData);
app.get("/categories", verifyToken, getCategories);
app.get("/countries", verifyToken, getCountries);
app.use("/companies", verifyToken, companiesRouter);
app.use("/companiesdata", verifyToken, companiesDataRouter);
app.post("/companyIntro", verifyToken, createCompanyIntro);
app.get("/worldHeatMap/:userId", verifyToken, getWorldHeatMapDataByUserId);
app.use("/subscriptions", verifyToken, subscriptionsRouter);
app.use("/stripe", verifyToken, stripeRouter);
app.use("/airports", verifyToken, airportsRouter);
app.use("/electricVehicles", electricVehiclesRouter);

// TODO : check webhook setup needed or not
// app.post(
//   "/webhook",
//   express.raw({ type: "application/json" }),
//   handleWebhookEvents
// );

app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

/**
 * ---------- Starting server ----------
 */
app.listen(process.env.PORT, () => {
  console.log("Server listening on ...");
  console.log("\x1b[33m%s\x1b[0m", `http://localhost:${process.env.PORT}`);
});
