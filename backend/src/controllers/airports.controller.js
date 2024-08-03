import { sequelize } from "../database/connectDb.js";

const getAirportByName = async (req, res) => {
  try {
    const airportName = req.query.name;

    const query = airportName
      ? `SELECT * FROM airport WHERE "airports" = '${airportName}'`
      : `SELECT * FROM airport`;
    const result = await pool.query(query);
    const airport = airportName ? result.rows[0] : result.rows;

    return res.send(airport);
  } catch (error) {
    console.log("error getting airport by name\n", error.message);
    return res.status(400).send({ error: { message: error.message } });
  }
};

export { getAirportByName };
