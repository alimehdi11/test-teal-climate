import { Sequelize } from "sequelize";
import { Eeio } from "../models/eeio.model.js";

const getEeios = async (req, res) => {
  try {
    const {
      productOrIndustry,
      level1,
      // level2,
      // level3,
      // level4,
      // level5,
      sector,
      column,
      distinct,
    } = req.query;
    const query = {};
    const whereClause = {};
    const attributes = [];
    if (productOrIndustry) whereClause.productOrIndustry = productOrIndustry;
    if (level1) whereClause.level1 = level1;
    // if (level2) whereClause.level2 = level2;
    // if (level3) whereClause.level3 = level3;
    // if (level4) whereClause.level4 = level4;
    // if (level5) whereClause.level5 = level5;
    if (sector) whereClause.sector = sector;
    if (column) {
      if (distinct === "true") {
        attributes.push([
          Sequelize.fn("DISTINCT", Sequelize.col(column)),
          column,
        ]);
      } else {
        attributes.push(column);
      }
      query.order = [[column, "ASC"]];
    }
    query.where = whereClause;
    query.attributes = attributes.length > 0 ? attributes : undefined;
    const records = await Eeio.findAll(query);
    return res.status(200).json(records);
  } catch (error) {
    console.log("Could not getEeios");
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getEeios };
