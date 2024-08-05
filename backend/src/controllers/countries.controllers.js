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

  // let client; // Declare the client variable outside the promise chain
  // pool
  //   .connect()
  //   .then((connectedClient) => {
  //     client = connectedClient; // Assign the connected client to the variable

  //     return Promise.all([
  //       client.query("SELECT * FROM Countries"),
  //       client.query("SELECT * FROM companies WHERE userid = $1", [id]),
  //     ]);
  //   })
  //   .then(([countriesResult, companiesResult]) => {
  //     // Send the data as JSON instead of rendering a server-side template
  //     res.json({
  //       countries: countriesResult.rows,
  //       companies: companiesResult.rows,
  //     });
  //   })
  //   .catch((error) => {
  //     console.error("Error:", error);
  //     res.status(500).json({ error: "Error fetching data" });
  //   })
  //   .finally(() => {
  //     if (client) {
  //       client.release(); // Release the connection back to the pool in all cases
  //     }
  // });
};
export { getAllCountries };
