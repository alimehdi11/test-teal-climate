import { Sequelize } from "sequelize";
import { Activity } from "../models/activity.model.js";

const getAllActivities = async (req, res) => {
  try {
    const { scope, level1, level2, level3, level4, level5, column, distinct } =
      req.query;
    const whereClause = {};
    if (scope) whereClause.scope = scope;
    if (level1) whereClause.level1 = level1;
    if (level2) whereClause.level2 = level2;
    if (level3) whereClause.level3 = level3;
    if (level4) whereClause.level4 = level4;
    if (level5) whereClause.level5 = level5;
    const attributes = [];
    if (column) {
      whereClause[column] = {
        [Sequelize.Op.not]: "",
      };
      if (distinct === "true") {
        attributes.push([
          Sequelize.fn("DISTINCT", Sequelize.col(column)),
          column,
        ]);
      } else {
        attributes.push(column);
      }
    }
    const query = {};
    query.where = whereClause;
    query.attributes = attributes.length > 0 ? attributes : undefined;
    const records = await Activity.findAll(query);
    return res.status(200).json(records);
  } catch (error) {
    console.log("Could not getAllActivites");
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getAllActivities };
