import { Sequelize } from "sequelize";
import { Reit } from "../models/reit.model.js";

const getReits = async (req, res) => {
  try {
    const {
      continent,
      country,
      region,
      state,
      assetType,
      year,
      unitOfMeasurement,
      greenHouseGas,
      greenHouseGasEmissionFactor,
      averageTemprature,
      column,
      distinct,
    } = req.query;
    const whereClause = {};
    if (continent) whereClause.continent = continent;
    if (country) whereClause.country = country;
    if (region) whereClause.region = region;
    if (state) whereClause.state = state;
    if (assetType) whereClause.assetType = assetType;
    if (year) whereClause.year = year;
    if (unitOfMeasurement) whereClause.unitOfMeasurement = unitOfMeasurement;
    if (greenHouseGas) whereClause.greenHouseGas = greenHouseGas;
    if (greenHouseGasEmissionFactor)
      whereClause.greenHouseGasEmissionFactor = greenHouseGasEmissionFactor;
    if (averageTemprature) whereClause.averageTemprature = averageTemprature;
    let attributes = [];
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
    const records = await Reit.findAll(query);
    return res.status(200).json(records);
  } catch (error) {
    console.log("Could not getReits");
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getReits };
