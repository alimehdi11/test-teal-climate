import { Sequelize } from "sequelize";
import { Reit } from "../models/reit.model.js";

const getReits = async (req, res) => {
  try {
    const {
      country,
      stateOrRegion,
      assetClass,
      year,
      unitOfMeasurement,
      column,
      distinct,
    } = req.query;
    const query = {};
    const attributes = [];
    const whereClause = {};
    if (country) whereClause.country = country;
    if (stateOrRegion) whereClause.stateOrRegion = stateOrRegion;
    if (assetClass) whereClause.assetClass = assetClass;
    if (year) whereClause.year = year;
    if (unitOfMeasurement) whereClause.unitOfMeasurement = unitOfMeasurement;
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
    const records = await Reit.findAll(query);
    return res.status(200).json(records);
  } catch (error) {
    console.log("Could not getReits");
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getReits };
