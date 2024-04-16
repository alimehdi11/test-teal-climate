import { pool } from "./../database/connectDb.js";

const createCompanyIntro = async (req, res) => {
  const {
    userId,
    companyName,
    country,
    primaryIndustry,
    secondaryIndustry,
    sustainabilityManager,
    email,
    phoneNumber,
  } = req.body;
  const query = `INSERT INTO "companyIntro" ("userId", "companyName", country, "primaryIndustry", "secondaryIndustry", "sustainabilityManager", email, "phoneNumber") VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
  const values = [
    userId,
    companyName,
    country,
    primaryIndustry,
    secondaryIndustry,
    sustainabilityManager,
    email,
    phoneNumber,
  ];
  pool.query(query, values, (err) => {
    if (err) {
      console.error("Error inserting data:", err);
      res.status(500).json({ error: "Error inserting data" });
    } else {
      console.log("Data inserted successfully");
      res.status(200).json({ message: "Companies Intro inserted succesfully" });
    }
  });
};

export { createCompanyIntro };
