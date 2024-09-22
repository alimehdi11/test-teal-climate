import express from "express";
import cors from "cors";
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
// import { handleWebhookEvents } from "./controllers/webhook.controllers.js";
import { airportsRouter } from "./routes/airports.routes.js";
import { electricVehiclesRouter } from "./routes/electricVehicles.routes.js";
import { eeiosRouter } from "./routes/eeios.routes.js";
import { usersRouter } from "./routes/users.routes.js";
import { reitsRouter } from "./routes/reitsRouter.routes.js";

const app = express();

/**
 * ---------- App configs ----------
 */
const corsOptions = {
  methods: ["GET", "POST", "PUT", "DELETE"],
};
if (process.env.NODE_ENV === "development") {
  corsOptions.origin = process.env.FRONTEND_ORIGIN;
} else if (process.env.NODE_ENV === "production") {
  corsOptions.origin = [
    "http://app.tealclimate.com",
    "http://carbon.tealclimate.com",
  ];
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), "public")));

/**
 * ---------- Routes ----------
 */
app.use("/auth", authRouter);

/* ---------------------------------------------------------------------  */

app.get("/activities", isLoggedIn, isSubscribed, getAllActivities);
app.get("/level1Categories", isLoggedIn, isSubscribed, getAllLevel1Categories);
app.get("/countries", isLoggedIn, isSubscribed, getAllCountries);
app.use("/airports", isLoggedIn, isSubscribed, airportsRouter);
app.use("/electricVehicles", isLoggedIn, isSubscribed, electricVehiclesRouter);
app.use("/eeios", isLoggedIn, isSubscribed, eeiosRouter);
app.use("/reits", isLoggedIn, isSubscribed, reitsRouter);

/* ---------------------------------------------------------------------  */

app.use("/users", isLoggedIn, isSubscribed, usersRouter);
app.use("/subscriptions", isLoggedIn, isSubscribed, subscriptionsRouter);
app.use("/stripe", isLoggedIn, isSubscribed, stripeRouter);
app.use("/businessUnits", isLoggedIn, isSubscribed, businessUnitsRouter);
app.use(
  "/businessUnitsActivities",
  isLoggedIn,
  isSubscribed,
  businessUnitsActivitiesRouter
);

// TODO : check webhook setup needed or not
// app.post(
//   "/webhook",
//   express.raw({ type: "application/json" }),
//   handleWebhookEvents
// );

app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

export { app };
