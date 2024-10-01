import { Airport } from "./../models/airport.model.js";

const getAllAirports = async (req, res) => {
  try {
    const airports = await Airport.findAll();
    return res.status(200).json(airports);
  } catch (error) {
    console.log("Could not getAllAirports");
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getAllAirports };
