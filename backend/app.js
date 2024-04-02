require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const bodyParser = require("body-parser");
const session = require("express-session");
const authRoutes = require("./authRoutes");
const path = require("path");

//middleware
app.use(cors());
app.use(express.json()); // Use built-in express.json middleware instead of body-parser
// app.use(bodyParser.urlencoded({ extended: true })); // Use bodyParser.urlencoded for form data
app.use(
  session({
    secret: "secret", // Change this to a random string for production
    resave: false,
    saveUninitialized: false,
  })
);
/**
 * public folder
 */
app.use(express.static(path.join(process.cwd(), "/public")));

//ROUTES//

app.get("/", (req, res) => {
  const id = "19";

  if (!id) {
    return res.redirect("/log_in");
  }

  let client; // Declare the client variable outside the promise chain

  pool
    .connect()
    .then((connectedClient) => {
      client = connectedClient; // Assign the connected client to the variable

      return client
        .query("SELECT * FROM companiesdata WHERE ids = $1", [id])
        .then((companiesDataResult) => {
          return client
            .query("SELECT * FROM companies WHERE userid = $1", [id])
            .then((companies) => {
              return {
                companiesdatas: companiesDataResult.rows,
                companies: companies.rows,
              };
            })
            .catch((error) => {
              throw new Error("Error fetching data from companies: " + error);
            });
        })
        .catch((error) => {
          throw new Error("Error fetching data from companiesdata: " + error);
        });
    })
    .then((data) => {
      // res.render('dashboard', data);
      res.status(200).json({ data });
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).send("Error connecting to the database: " + error);
    })
    .finally(() => {
      if (client) {
        client.release(); // Release the connection back to the pool in all cases
      }
    });
});

app.post("/fuel_category_total", (req, res) => {
  res.setHeader("Connection", "keep-alive");
  const id = req.session.userid;

  if (id !== null) {
    const category = req.body.category;

    pool.connect((err, client, done) => {
      if (err) {
        console.error("Error connecting to the database:", err);
        return res.status(500).send("Error connecting to the database");
      }

      try {
        client.query(
          "SELECT * FROM companiesdata WHERE ids = $1 AND fuel_category = $2",
          [id, category],
          (error, result) => {
            if (error) {
              console.error("Error executing query:", error);
              return res.status(500).send("Error fetching fuel category data");
            }

            let co2e = 0;
            const datas = result.rows;

            datas.forEach((element) => {
              co2e += element.co2e;
            });

            res.json(co2e);
          }
        );
      } finally {
        done(); // Release the connection back to the pool in all cases
      }
    });
  } else {
    res.redirect("/log_in");
  }
});

app.get("/activitydata", (req, res) => {
  // const id = req.session.userid;
  const id = 19;

  if (!id) {
    return res.redirect("/log_in");
  }

  pool
    .connect()
    .then((client) => {
      return Promise.all([
        client.query("SELECT * FROM activitydata"),
        client.query("SELECT * FROM companies WHERE userid = $1", [id]),
        client.query("SELECT * FROM companiesdata WHERE ids = $1", [id]),
      ])
        .then(([activityResult, companiesResult, companiesDataResult]) => {
          const datas = activityResult.rows;
          const companies = companiesResult.rows;
          const companiesdatas = companiesDataResult.rows;

          res.status(200).json({ datas, companiesdatas, companies });
          // res.render('activatedata', { datas, companiesdatas, companies });
        })
        .catch((error) => {
          console.error("activatedata Error:", error);
          res.status(500).send("Error fetching data");
        })
        .finally(() => {
          client.release(); // Release the connection back to the pool in all cases
        });
    })
    .catch((error) => {
      console.error("activatedata Error:", error);
      res.status(500).send("Error connecting to the database");
    });
});

app.get("/Profiles", (req, res) => {
  const id = 19;

  if (!id) {
    // Instead of redirecting, send a JSON response indicating the need to log in
    return res.status(401).json({ error: "User not logged in" });
  }

  let client; // Declare the client variable outside the promise chain

  pool
    .connect()
    .then((connectedClient) => {
      client = connectedClient; // Assign the connected client to the variable

      return Promise.all([
        client.query("SELECT * FROM Countries"),
        client.query("SELECT * FROM companies WHERE userid = $1", [id]),
      ]);
    })
    .then(([countriesResult, companiesResult]) => {
      // Send the data as JSON instead of rendering a server-side template
      res.json({
        countries: countriesResult.rows,
        companies: companiesResult.rows,
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).json({ error: "Error fetching data" });
    })
    .finally(() => {
      if (client) {
        client.release(); // Release the connection back to the pool in all cases
      }
    });
});

//Submit profile Data into database
app.post("/submit", (req, res) => {
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

  pool.query(insertQuery, values, (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      res.status(500).json({ error: "Error inserting data" });
    } else {
      console.log("Data inserted successfully");
      res.status(200).json({ successMessage: "Data inserted successfully" });
    }
  });
});

// Fetching data Profile
app.get("/companies/:userId", (req, res) => {
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
});

app.get("/companiesdata/:userid", (req, res) => {
  var userid = req.params.userid;

  console.log(userid);
  if (userid.startsWith(":")) {
    userid = userid.substring(1); // Remove the first character (the colon)
  }
  const selectQuery = "SELECT * FROM companiesdata WHERE ids = $1";

  pool.query(selectQuery, [userid], (err, result) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).send("Error fetching data");
    } else {
      console.log("Data fetched successfully");
      res.json(result.rows); // Send fetched data as JSON response
    }
  });
});

app.delete("/companiesdata/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM companiesdata WHERE id = $1";

  pool.query(query, [id], (error, result) => {
    if (error) {
      console.error("Error deleting data:", error);
      res.status(500).json({ errorMessage: "Error deleting data" });
    } else {
      console.log("===>>> Data deleted successfully");
      res.status(200).json({ successMessage: "Data deleted successfully" });
    }
  });
});

app.post("/companiesdata", (req, res) => {
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
  pool.query(query, values, (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      res.status(500).json({ error: "Error inserting data" });
    } else {
      console.log("Data inserted successfully");
      res.status(200).json({ message: "Companiesdata inserted succesfully" });
    }
  });
});

app.put("/companiesdata/:id", (req, res) => {
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
  pool.query(query, values, (err, result) => {
    if (err) {
      console.error("Error updating data:", err);
      res.status(500).json({ error: "Error updating data" });
    } else {
      console.log("Data updated successfully");
      res.status(200).json({ message: "Data updated successfully" });
    }
  });
});

app.delete("/companies/:id", (req, res) => {
  // if (!userId) {
  //   return res.status(404).json({ errorMessage: "User id is required" });
  // }
  const { id } = req.params;

  const query = "DELETE FROM companies WHERE id = $1";

  pool.query(query, [id], (error, result) => {
    if (error) {
      console.error("Error deleting data:", error);
      res.status(500).json({ errorMessage: "Error deleting data" });
    } else {
      res.status(200).json({ successMessage: "Data deleted successfully" });
    }
  });
});

app.get("/categories", (req, res) => {
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
});

app.get("/companiesdata/activites/:id", (req, res) => {
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
});

app.get("/companies/profile/:id", (req, res) => {
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
});

app.put("/companies/:id", (req, res) => {
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
  pool.query(query, values, (err, result) => {
    if (err) {
      console.error("Error updating data:", err);
      res.status(500).json({ error: "Error updating data" });
    } else {
      console.log("Data updated successfully");
      res.status(200).json({ message: "Data updated successfully" });
      // res.redirect("/profiles");
    }
  });
});

app.get("/companiesdata/top10/:userId", async (req, res) => {
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
});

app.get("/worldHeatMap/:userId", async (req, res) => {
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
});

// Register endpoint
app.use("/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server has started on port ${process.env.PORT}`);
});
