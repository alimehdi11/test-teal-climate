import express from "express";
import {
  getEeioByName,
  getEeioLevel2,
  getEeioLevel3,
  getEeioLevel4,
  getEeioLevel5,
  getEeiosector,
  insertEeioData,
  getEeiodata,
  fetchEeioEditData,
  editEeioData,
  deleteEeioData,
} from "../controllers/eeio.controllers.js";

const eeioRouter = express.Router();

eeioRouter.get("/:name", getEeioByName);
eeioRouter.get("/level2/:selectedForm/:selectedlevel1", getEeioLevel2);
eeioRouter.get("/level3/:selectedForm/:selectedlevel1/:level2", getEeioLevel3);
eeioRouter.get(
  "/level4/:selectedForm/:selectedlevel1/:level2/:level3",
  getEeioLevel4
);
eeioRouter.get(
  "/level5/:selectedForm/:selectedlevel1/:level2/:level3/:level4",
  getEeioLevel5
);
eeioRouter.get(
  "/sector/:selectedForm/:selectedlevel1/:level2/:level3/:level4/:level5",
  getEeiosector
);
eeioRouter.post("/insertEeioData", insertEeioData);
eeioRouter.get("/eeiodata/:userid", getEeiodata);
eeioRouter.get("/fetchEeioEditData/:id/:userid", fetchEeioEditData);
eeioRouter.put("/editEeioData/:id", editEeioData);
eeioRouter.delete("/deleteEeioData/:id/:userid", deleteEeioData);

export { eeioRouter };
