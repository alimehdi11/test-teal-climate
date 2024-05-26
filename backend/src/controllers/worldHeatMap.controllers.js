import { pool } from "./../database/connectDb.js";

const getWorldHeatMapDataByUserId = async (req, res) => {
  const { userId } = req.params;
  const query = `SELECT cd.co2e, c.countries
    FROM companiesdata cd
    JOIN companies c ON cd.businessunit = c.unitname
    WHERE cd.ids = $1
    AND c.userId = $2;
    `;
  const values = [userId, userId];
  pool.query(query, values, (error, result) => {
    if (error) {
      console.error("Error :", error);
      res.status(500).json({ error: "Something went wrong" });
    } else {
      res.status(200).json(result.rows);
    }
  });
};

export { getWorldHeatMapDataByUserId };
