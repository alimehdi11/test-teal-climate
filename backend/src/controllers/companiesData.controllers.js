import { sequelize } from "./../database/connectDb.js";

const createCompaniesData = (req, res) => {
  const {
    ids,
    uom,
    businessunit,
    quantity,
    scope,
    level1,
    level2,
    level3,
    level4,
    level5,
    co2e,
    co2eofco2,
    co2eofch4,
    co2eofn2o,
    fuel_category,
  } = req.body;
  console.table({
    ids,
    uom,
    businessunit,
    quantity,
    scope,
    level1,
    level2,
    level3,
    level4,
    level5,
    co2e,
    co2eofco2,
    co2eofch4,
    co2eofn2o,
    fuel_category,
  });

  if (!ids) {
    return res.status(401).json({ error: "User id is required" });
  }
  const query =
    "INSERT INTO companiesdata (ids, scope, businessunit, level1, level2, level3, level4, level5, co2e, co2eofco2, co2eofch4, co2eofn2o, uom, quantity, fuel_category) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15);";
  const values = [
    ids,
    scope,
    businessunit,
    level1,
    level2,
    level3,
    level4,
    level5,
    co2e * quantity,
    co2eofco2 * quantity,
    co2eofch4 * quantity,
    co2eofn2o * quantity,
    uom,
    quantity,
    fuel_category,
  ];
  pool.query(query, values, (err) => {
    if (err) {
      console.error("Error inserting data:", err);
      res.status(500).json({ error: "Error inserting data" });
    } else {
      console.log("Data inserted successfully");
      res.status(200).json({ message: "Companiesdata inserted succesfully" });
    }
  });
};

const getCompaniesDataById = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM companiesdata WHERE id = $1";

  pool.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).send("Error fetching data");
    } else {
      console.log("Data fetched successfully");
      res.json(result.rows); // Send fetched data as JSON response
    }
  });
};

const updateCompaniesDataById = (req, res) => {
  const { id } = req.params;
  const {
    ids /* userId */,
    uom,
    businessunit,
    quantity,
    scope,
    level1,
    level2,
    level3,
    level4,
    level5,
    co2e,
    co2eofco2,
    co2eofch4,
    co2eofn2o,
    fuel_category,
  } = req.body;
  console.log("====UPDATE QUERY====");
  console.table({
    ids /* userId */,
    uom,
    businessunit,
    quantity,
    scope,
    level1,
    level2,
    level3,
    level4,
    level5,
    co2e,
    co2eofco2,
    co2eofch4,
    co2eofn2o,
    fuel_category,
  });

  // if (!ids) {
  //   return res.status(401).json({ error: "User id is required" });
  // }
  const query = `UPDATE companiesdata 
        SET scope = $2, 
            businessunit = $3, 
            level1 = $4, 
            level2 = $5, 
            level3 = $6, 
            level4 = $7, 
            level5 = $8, 
            co2e = $9, 
            co2eofco2 = $10, 
            co2eofch4 = $11, 
            co2eofn2o = $12, 
            uom = $13, 
            quantity = $14, 
            fuel_category = $15
        WHERE id = $1;`;

  const values = [
    id,
    scope,
    businessunit,
    level1,
    level2,
    level3,
    level4,
    level5,
    co2e * quantity,
    co2eofco2 * quantity,
    co2eofch4 * quantity,
    co2eofn2o * quantity,
    uom,
    quantity,
    fuel_category,
  ];
  pool.query(query, values, (err) => {
    if (err) {
      console.error("Error updating data:", err);
      res.status(500).json({ error: "Error updating data" });
    } else {
      console.log("Data updated successfully");
      res.status(200).json({ message: "Data updated successfully" });
    }
  });
};

const deleteCompaniesDataById = (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM companiesdata WHERE id = $1";

  pool.query(query, [id], (error) => {
    if (error) {
      console.error("Error deleting data:", error);
      res.status(500).json({ errorMessage: "Error deleting data" });
    } else {
      console.log("===>>> Data deleted successfully");
      res.status(200).json({ successMessage: "Data deleted successfully" });
    }
  });
};

const getCompaniesDataByUserId = (req, res) => {
  let userId = req.params.userId;

  console.log(userId);
  if (userId.startsWith(":")) {
    userId = userId.substring(1); // Remove the first character (the colon)
  }
  const selectQuery = "SELECT * FROM companiesdata WHERE ids = $1";

  pool.query(selectQuery, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).send("Error fetching data");
    } else {
      console.log("Data fetched successfully");
      res.json(result.rows); // Send fetched data as JSON response
    }
  });
};

const getTop10EmissionsByUserId = async (req, res) => {
  const { userId } = req.params;
  const column = "co2e";
  const query = `SELECT * FROM companiesdata WHERE ids = $1 ORDER BY ${column} DESC LIMIT 10`;
  const values = [userId];
  pool.query(query, values, (error, result) => {
    if (error) {
      console.error("Error :", error);
      res.status(500).json({ error: "Something went wrong" });
    } else {
      res.status(200).json(result.rows);
    }
  });
};

export {
  createCompaniesData,
  getCompaniesDataById,
  updateCompaniesDataById,
  deleteCompaniesDataById,
  getCompaniesDataByUserId,
  getTop10EmissionsByUserId,
};
