/**
 * ---------- Loading enviroment varaibles ----------
 */
import "./configs/env.configs.js";
/**
 * ---------- Connecting with database ----------
 */
import "./database/connectDb.js";

import express from "express";
import cors from "cors";
import path from "path";
import { authRouter } from "./routes/auth.routes.js";
import { businessUnitsRouter } from "./routes/businessUnits.routes.js";
import { businessUnitsActivitiesRouter } from "./routes/businessUnitsActivities.routes.js";
// import { getWorldHeatMapDataByUserId } from "./controllers/worldHeatMap.controllers.js";
import { getAllActivities } from "./controllers/activities.controllers.js";
import { getAllLevel1Categories } from "./controllers/level1Categories.controllers.js";
import { getAllCountries } from "./controllers/countries.controllers.js";
import { verifyToken } from "./middlewares/auth.middlewares.js";
import { subscriptionsRouter } from "./routes/subscriptions.routes.js";
import { stripeRouter } from "./routes/stripe.routes.js";
// import { handleWebhookEvents } from "./controllers/webhook.controllers.js";
import { airportsRouter } from "./routes/airports.routes.js";
import { electricVehiclesRouter } from "./routes/electricVehicles.routes.js";
import { eeiosRouter } from "./routes/eeios.routes.js";
import { usersRouter } from "./routes/users.routes.js";

const app = express();

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

/* ---------------------------------------------------------------------  */

// app.get("/activitydata", verifyToken, getAllActivities); // TODO : this line should removed when frontend side uri updated from activitydata -> activities
app.get("/activities", verifyToken, getAllActivities);
// app.get("/categories", verifyToken, getAllLevel1Categories); // TODO : this line should removed when frontend side uri updated from categories -> level1Categories
app.get("/level1Categories", verifyToken, getAllLevel1Categories);
app.get("/countries", verifyToken, getAllCountries);
app.use("/airports", verifyToken, airportsRouter);
// app.get("/worldHeatMap/:userId", verifyToken, getWorldHeatMapDataByUserId);
app.use("/electricVehicles", verifyToken, electricVehiclesRouter);

/* ---------------------------------------------------------------------  */

// users route is created to get users businessUnits/businessUnitsActivities by thier userid
app.use("/users", verifyToken, usersRouter);
app.use("/subscriptions", verifyToken, subscriptionsRouter);
app.use("/stripe", verifyToken, stripeRouter);
// app.use("/companies", verifyToken, businessUnitsRouter); // TODO : this line should removed when frontend side uri updated from companies -> businessUnits
app.use("/businessUnits", verifyToken, businessUnitsRouter);
// app.use("/companiesdata", verifyToken, businessUnitsActivitiesRouter); // TODO : this line should removed when frontend side uri updated from companiesdata -> businessUnitsActivities
app.use("/businessUnitsActivities", verifyToken, businessUnitsActivitiesRouter);

// app.use("/eeios", verifyToken, eeiosRouter); NOTE : Bilal will help for eeios

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
