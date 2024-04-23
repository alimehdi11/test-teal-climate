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
import { subscriptionRouter } from "./routes/subscription.routes.js";

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
  app.use(cors());
}
app.use(express.json());
app.use(express.static(path.join(process.cwd(), "public")));

/**
 * ---------- Routes ----------
 */
app.use("/auth", authRouter);
// app.use(verifyToken);
app.get("/activitydata", verifyToken, getActivityeData);
app.get("/categories", verifyToken, getCategories);
app.get("/countries", verifyToken, getCountries);
app.use("/companies", verifyToken, companiesRouter);
app.use("/companiesdata", verifyToken, companiesDataRouter);
app.post("/companyIntro", verifyToken, createCompanyIntro);
app.get("/worldHeatMap/:userId", verifyToken, getWorldHeatMapDataByUserId);
app.use("/subscription", verifyToken, subscriptionRouter);
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
