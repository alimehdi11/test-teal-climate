import express from "express";
import path from "path";
import { authRouter } from "./routes/auth.routes.js";
import { businessUnitsRouter } from "./routes/businessUnits.routes.js";
import { businessUnitsActivitiesRouter } from "./routes/businessUnitsActivities.routes.js";
import { getAllActivities } from "./controllers/activities.controllers.js";
import { getAllLevel1Categories } from "./controllers/level1Categories.controllers.js";
import { getAllCountries } from "./controllers/countries.controllers.js";
import { isLoggedIn, isSubscribed } from "./middlewares/auth.middlewares.js";
import { subscriptionsRouter } from "./routes/subscriptions.routes.js";
import { stripeRouter } from "./routes/stripe.routes.js";
import { airportsRouter } from "./routes/airports.routes.js";
import { electricVehiclesRouter } from "./routes/electricVehicles.routes.js";
import { eeiosRouter } from "./routes/eeios.routes.js";
import { usersRouter } from "./routes/users.routes.js";
import { reitsRouter } from "./routes/reits.routes.js";
import { periodsRouter } from "./routes/periods.routes.js";

const app = express();

/**
 * ---------- App configs ----------
 */
app.use(express.json());
app.use(express.static(path.join(process.cwd(), "../frontend", "dist")));

/**
 * ---------- Routes ----------
 */
/* ---------------------------------------------------------------------  */
app.get("/api/activities", isLoggedIn, isSubscribed, getAllActivities);
app.get(
  "/api/level1Categories",
  isLoggedIn,
  isSubscribed,
  getAllLevel1Categories
);
app.get("/api/countries", isLoggedIn, isSubscribed, getAllCountries);
app.use("/api/airports", isLoggedIn, isSubscribed, airportsRouter);
app.use(
  "/api/electricVehicles",
  isLoggedIn,
  isSubscribed,
  electricVehiclesRouter
);
app.use("/api/eeios", isLoggedIn, isSubscribed, eeiosRouter);
app.use("/api/reits", isLoggedIn, isSubscribed, reitsRouter);
/* ---------------------------------------------------------------------  */
app.use("/api/auth", authRouter);
app.use("/api/users", isLoggedIn, isSubscribed, usersRouter);
app.use("/api/subscriptions", isLoggedIn, isSubscribed, subscriptionsRouter);
app.use("/api/stripe", isLoggedIn, isSubscribed, stripeRouter);
app.use("/api/periods", isLoggedIn, isSubscribed, periodsRouter);
app.use("/api/businessUnits", isLoggedIn, isSubscribed, businessUnitsRouter);
app.use(
  "/api/businessUnitsActivities",
  isLoggedIn,
  isSubscribed,
  businessUnitsActivitiesRouter
);
app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "../frontend", "dist", "index.html"));
});
/* ---------------------------------------------------------------------  */

export { app };
