import { pool } from "./../database/connectDb.js";

const getCategories = (req, res) => {
  const query = "SELECT type, categy FROM categries";

  pool.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).send("Error fetching data");
    } else {
      console.log("Data fetched successfully");
      res.json(result.rows); // Send fetched data as JSON response
    }
  });
};

export { getCategories };
