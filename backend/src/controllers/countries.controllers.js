import { Country } from "./../models/country.model.js";

const getAllCountries = async (req, res) => {
  try {
    const allCountries = await Country.findAll({
      attributes: ["name", "continent", "region"],
    });
    return res.status(200).json(allCountries);
  } catch (error) {
    console.log("Could not getAllCountries");
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export { getAllCountries };
