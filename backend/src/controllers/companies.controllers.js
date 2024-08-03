import { sequelize } from "./../database/connectDb.js";

const createCompanyProfile = (req, res) => {
  res.setHeader("Connection", "keep-alive");
  const userId = req.body.userid; // Corrected to match the frontend property name
  const unit = req.body.unit;
  const continent = req.body.continent;
  const country = req.body.country;
  const region = req.body.region;
  const employees = req.body.employees;
  const production = req.body.production;
  const revenue = req.body.revenue;
  const partnership = req.body.partnership;
  const notes = req.body.notes;

  if (!userId) {
    return res.status(401).json({ error: "User ID is required" });
  }

  function handleEmptyString(value) {
    return value === "" ? null : value;
  }

  const insertQuery =
    "INSERT INTO companies (unitname, continent, countries, region, employees, production, revenue, partnership, notes, userid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *";
  let values = [
    unit,
    continent,
    country,
    region,
    employees,
    production,
    revenue,
    partnership,
    notes,
    userId,
  ];

  console.table(values);

  values = values.map(handleEmptyString);
  console.table(values);

  pool.query(insertQuery, values, (err) => {
    if (err) {
      console.error("Error inserting data:", err);
      res.status(500).json({ error: "Error inserting data" });
    } else {
      console.log("Data inserted successfully");
      res.status(200).json({ successMessage: "Data inserted successfully" });
    }
  });
};

const getCompanyProfileById = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM companies WHERE id = $1";

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

const updateCompanyProfileById = (req, res) => {
  const { id } = req.params;
  const {
    userId,
    unit,
    continent,
    countries,
    region,
    employees,
    production,
    revenue,
    partnership,
    notes,
  } = req.body;
  console.log("====UPDATE QUERY====");
  console.table({
    userId,
    unit,
    continent,
    countries,
    region,
    employees,
    production,
    revenue,
    partnership,
    notes,
  });

  // if (!ids) {
  //   return res.status(401).json({ error: "User id is required" });
  // }
  const query = `UPDATE companies
                  SET unitname = $2, 
                  continent = $3, 
                  countries= $4, 
                  region = $5, 
                  employees = $6, 
                  production = $7, 
                  revenue = $8, 
                  partnership = $9, 
                  notes = $10
                 WHERE id = $1;`;

  const values = [
    id,
    unit,
    continent,
    countries,
    region,
    employees,
    production,
    revenue,
    partnership,
    notes,
  ];
  pool.query(query, values, (err) => {
    if (err) {
      console.error("Error updating data:", err);
      res.status(500).json({ error: "Error updating data" });
    } else {
      console.log("Data updated successfully");
      res.status(200).json({ message: "Data updated successfully" });
      // res.redirect("/profiles");
    }
  });
};

const deleteCompanyProfileById = (req, res) => {
  // if (!userId) {
  //   return res.status(404).json({ errorMessage: "User id is required" });
  // }
  const { id } = req.params;

  const query = "DELETE FROM companies WHERE id = $1";

  pool.query(query, [id], (error) => {
    if (error) {
      console.error("Error deleting data:", error);
      res.status(500).json({ errorMessage: "Error deleting data" });
    } else {
      res.status(200).json({ successMessage: "Data deleted successfully" });
    }
  });
};

const getCompanyProfiles = (req, res) => {
  const { userId } = req.params;
  const { column } = req.query;
  const query = `SELECT ${column || "*"} FROM companies WHERE userid = $1`;
  pool.query(query, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).send("Error fetching data");
    } else {
      console.log("Data fetched successfully");
      res.json(result.rows);
    }
  });
};

export {
  createCompanyProfile,
  getCompanyProfileById,
  updateCompanyProfileById,
  deleteCompanyProfileById,
  getCompanyProfiles,
};
