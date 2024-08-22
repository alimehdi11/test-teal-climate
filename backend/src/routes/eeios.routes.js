import express from "express";
import {
  getEeio,
  // getEeioLevel2,
  // getEeioLevel3,
  // getEeioLevel4,
  // getEeioLevel5,
  // getEeiosector,
  // insertEeioData,
  // getEeiodata,
  // fetchEeioEditData,
  // editEeioData,
  // deleteEeioData,
} from "../controllers/eeio.controllers.js";

const eeiosRouter = express.Router();

eeiosRouter.get("/", getEeio);
// eeiosRouter.get("/level2/:productOrIndustry/:level1", getEeioLevel2);
// eeiosRouter.get("/level3/:selectedForm/:selectedlevel1/:level2", getEeioLevel3);
// eeiosRouter.get(
//   "/level4/:selectedForm/:selectedlevel1/:level2/:level3",
//   getEeioLevel4
// );
// eeiosRouter.get(
//   "/level5/:selectedForm/:selectedlevel1/:level2/:level3/:level4",
//   getEeioLevel5
// );
// eeiosRouter.get(
//   "/sector/:selectedForm/:selectedlevel1/:level2/:level3/:level4/:level5",
//   getEeiosector
// );
// eeiosRouter.post("/", insertEeioData);
// eeiosRouter.get("/eeiodata/:userid", getEeiodata);
// eeiosRouter.get("/fetchEeioEditData/:id/:userid", fetchEeioEditData);
// eeiosRouter.put("/editEeioData/:id", editEeioData);
// eeiosRouter.delete("/deleteEeioData/:id/:userid", deleteEeioData);

export { eeiosRouter };
