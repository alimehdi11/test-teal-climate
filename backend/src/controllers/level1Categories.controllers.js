import { Sequelize } from "sequelize";
import { Level1Category } from "../models/level1Category.model.js";

const getAllLevel1Categories = async (req, res) => {
  try {
    const { level1, column, distinct } = req.query;
    const whereClause = {};
    if (level1) whereClause.level1 = level1;
    const attributes = [];
    if (column) {
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
    const records = await Level1Category.findAll(query);
    return res.status(200).json(records);
  } catch (error) {
    console.log("Could not getAllLevel1Categories");
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getAllLevel1Categories };
