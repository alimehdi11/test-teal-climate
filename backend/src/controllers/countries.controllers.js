import { Sequelize } from "sequelize";
import { Country } from "./../models/country.model.js";

const getAllCountries = async (req, res) => {
  try {
    const { column, distinct } = req.query;
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
    const query = {
      order: [["name", "ASC"]],
    };
    query.attributes = attributes.length > 0 ? attributes : undefined;
    const allCountries = await Country.findAll(query);
    return res.status(200).json(allCountries);
  } catch (error) {
    console.log("Could not getAllCountries");
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getAllCountries };
