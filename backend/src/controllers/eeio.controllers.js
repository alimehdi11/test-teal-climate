import { sequelize } from "./../database/connectDb.js";

const getEeioByName = async (req, res) => {
  const pi = req.params.name;
  if (!pi) {
    return res.status(400).json({ error: "Invalid param" });
  }
  pool
    .query("SELECT level1 FROM eeio WHERE pi = $1", [pi])
    .then((eeioDataResult) => {
      const eeiodatas = eeioDataResult.rows;
      const level1Data = eeiodatas.map((item) => ({ level1: item.level1 }));
      const seenNames = new Set();
      const uniqueObjects = [];
      for (const obj of level1Data) {
        if (!seenNames.has(obj.level1)) {
          seenNames.add(obj.level1);
          uniqueObjects.push(obj);
        }
      }
      res.status(200).json(uniqueObjects);
    })
    .catch((error) => {
      console.error("activatedata Error:", error);
      res.status(500).send("Error fetching data");
    });
};

const getEeioLevel2 = async (req, res) => {
  const selectedForm = req.params.selectedForm;
  const selectedlevel1 = req.params.selectedlevel1;
  pool
    .query("SELECT level2 FROM eeio WHERE pi = $1 AND level1 = $2", [
      selectedForm,
      selectedlevel1,
    ])
    .then((eeioLevel2Result) => {
      const eeioLevel2Data = eeioLevel2Result.rows;
      const Level2Data = eeioLevel2Data.map((item) => ({
        level2: item.level2,
      }));
      const seenNames = new Set();
      const uniqueObjects = [];

      for (const obj of Level2Data) {
        if (!seenNames.has(obj.level2)) {
          seenNames.add(obj.level2);
          uniqueObjects.push(obj);
        }
      }
      res.status(200).json(uniqueObjects);
    })
    .catch((error) => {
      console.error("activatedata Error:", error);
      res.status(500).send("Error fetching data");
    });
};

const getEeioLevel3 = (req, res) => {
  const selectlevel2 = req.params.level2;
  const selectedForm = req.params.selectedForm;
  const selectedlevel1 = req.params.selectedlevel1;
  pool
    .query(
      "SELECT level3 FROM eeio WHERE pi = $1 AND level1 = $2 AND level2 = $3",
      [selectedForm, selectedlevel1, selectlevel2]
    )
    .then((eeioLevel3Result) => {
      const eeioLevel3Data = eeioLevel3Result.rows;

      const Level3Data = eeioLevel3Data.map((item) => ({
        level3: item.level3,
      }));

      const seenNames = new Set();
      const uniqueObjects = [];

      for (const obj of Level3Data) {
        if (!seenNames.has(obj.level3)) {
          seenNames.add(obj.level3);
          uniqueObjects.push(obj);
        }
      }
      res.status(200).json(uniqueObjects);
    })
    .catch((error) => {
      console.error("activatedata level2 Error:", error);
      res.status(500).send("Error fetching data");
    });
};

const getEeioLevel4 = (req, res) => {
  const selectlevel3 = req.params.level3;
  const selectlevel2 = req.params.level2;
  const selectedForm = req.params.selectedForm;
  const selectedlevel1 = req.params.selectedlevel1;
  pool
    .query(
      "SELECT level4 FROM eeio WHERE pi = $1 AND level1 = $2 AND level2 = $3 AND level3 = $4",
      [selectedForm, selectedlevel1, selectlevel2, selectlevel3]
    )
    .then((eeioLevel4Result) => {
      const eeioLevel4Data = eeioLevel4Result.rows;

      const Level4Data = eeioLevel4Data.map((item) => ({
        level4: item.level4,
      }));
      const seenNames = new Set();
      const uniqueObjects = [];
      for (const obj of Level4Data) {
        if (!seenNames.has(obj.level4)) {
          seenNames.add(obj.level4);
          uniqueObjects.push(obj);
        }
      }
      res.status(200).json(uniqueObjects);
    })
    .catch((error) => {
      console.error("activatedata level2 Error:", error);
      res.status(500).send("Error fetching data");
    });
};

const getEeioLevel5 = (req, res) => {
  const selectlevel4 = req.params.level4;
  const selectlevel3 = req.params.level3;
  const selectlevel2 = req.params.level2;
  const selectedForm = req.params.selectedForm;
  const selectedlevel1 = req.params.selectedlevel1;
  pool
    .query(
      "SELECT Level5 FROM eeio WHERE pi = $1 AND level1 = $2 AND level2 = $3 AND level3 = $4 AND level4 = $5",
      [selectedForm, selectedlevel1, selectlevel2, selectlevel3, selectlevel4]
    )
    .then((eeioLevel5Result) => {
      const eeioLevel5Data = eeioLevel5Result.rows;
      const level5Data = eeioLevel5Data.map((item) => ({
        level5: item.level5,
      }));
      const seenNames = new Set();
      const uniqueObjects = [];
      for (const obj of level5Data) {
        if (!seenNames.has(obj.level5)) {
          seenNames.add(obj.level5);
          uniqueObjects.push(obj);
        }
      }
      res.status(200).json(uniqueObjects);
    })
    .catch((error) => {
      console.error("activatedata level2 Error:", error);
      res.status(500).send("Error fetching data");
    });
};

const getEeiosector = (req, res) => {
  const selectedlevel5 = req.params.level5;
  const selectlevel4 = req.params.level4;
  const selectlevel3 = req.params.level3;
  const selectlevel2 = req.params.level2;
  const selectedForm = req.params.selectedForm;
  const selectedlevel1 = req.params.selectedlevel1;
  pool
    .query(
      "SELECT sector FROM eeio WHERE pi = $1 AND level1 = $2 AND level2 = $3 AND level3 = $4 AND level4 = $5 AND level5 = $6",
      [
        selectedForm,
        selectedlevel1,
        selectlevel2,
        selectlevel3,
        selectlevel4,
        selectedlevel5,
      ]
    )
    .then((eeioSectorResult) => {
      const eeioSectorData = eeioSectorResult.rows;
      const sectorData = eeioSectorData.map((item) => ({
        sector: item.sector,
      }));
      const seenNames = new Set();
      const uniqueObjects = [];
      for (const obj of sectorData) {
        if (!seenNames.has(obj.sector)) {
          seenNames.add(obj.sector);
          uniqueObjects.push(obj);
        }
      }
      res.status(200).json(uniqueObjects);
    })
    .catch((error) => {
      console.error("activatedata level2 Error:", error);
      res.status(500).send("Error fetching data");
    });
};

const insertEeioData = async (req, res) => {
  try {
    const {
      userId,
      businessUnitsvalue,
      selectedForm,
      selectedlevel1,
      Level2value,
      Level3value,
      Level4value,
      Level5value,
      Sectorvalue,
      currencyvalue,
      quantity,
    } = req.body;
    const fetchQuery1 =
      "SELECT * FROM companies WHERE userid = $1 AND unitname= $2";
    const fetchValues1 = [userId, businessUnitsvalue];
    const fetchResult1 = await pool.query(fetchQuery1, fetchValues1);
    if (fetchResult1.rows.length === 0) {
      console.log("hi");
      return res
        .status(404)
        .json({ error: "No data found for the given user id" });
    }
    const userData = fetchResult1.rows;
    const continent = userData[0].continent;
    const country = userData[0].countries;
    // const region = userData[0].region;
    const fetchQuery =
      "SELECT * FROM eeio WHERE pi = $1 AND level1 = $2 AND level2 = $3 AND level3 = $4 AND level4 = $5 AND level5 = $6 AND sector = $7 AND continent = $8 AND country = $9";
    const fetchValues = [
      selectedForm,
      selectedlevel1,
      Level2value,
      Level3value,
      Level4value,
      Level5value,
      Sectorvalue,
      continent,
      country,
    ];
    const fetchResult = await pool.query(fetchQuery, fetchValues);
    if (fetchResult.rows.length === 0) {
      return res.status(500).json({ error: "Something went wrong" });
    }
    const datas = fetchResult.rows;
    let co2e = null;
    let co2eofco2 = null;
    let co2eofch4 = null;
    let co2eofn2o = null;
    let co2eofother = null;
    const ghgValues = [
      "kg CO2e",
      "kg CO2e of CO2",
      "kg CO2e of CH4",
      "kg CO2e of N2O",
      "kg CO2e of Other",
    ];
    datas.forEach((data) => {
      if (data.ghg == ghgValues[0]) {
        co2e = data.pereuro * quantity;
      }
      if (data.ghg == ghgValues[1]) {
        co2eofco2 = data.pereuro * quantity;
      }
      if (data.ghg == ghgValues[2]) {
        co2eofch4 = data.pereuro * quantity;
      }
      if (data.ghg == ghgValues[3]) {
        co2eofn2o = data.pereuro * quantity;
      }
      if (data.ghg == ghgValues[4]) {
        co2eofother = data.pereuro * quantity;
      }
    });
    const exiobasecode = datas[0]?.exiobasecode;
    const scope = "scope 3";
    const insertQuery =
      "INSERT INTO eeioentry (scope, continent, country, usercountry, pi, level1, level2, level3, level4, level5, sector, exiobasecode, uom, quantity, userid, co2e, co2eofco2, co2eofch4, co2eofn2o, co2eofother, unitname) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21) RETURNING *";
    const values = [
      scope,
      continent,
      country,
      country,
      selectedForm,
      selectedlevel1,
      Level2value,
      Level3value,
      Level4value,
      Level5value,
      Sectorvalue,
      exiobasecode,
      currencyvalue,
      quantity,
      userId,
      co2e,
      co2eofco2,
      co2eofch4,
      co2eofn2o,
      co2eofother,
      businessUnitsvalue,
    ];

    const insertResult = await pool.query(insertQuery, values);
    console.log("Companies data inserted successfully");
    res.status(200).json({
      message: "Companies data inserted successfully",
      data: insertResult.rows[0],
    });
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).json({ error: "Error inserting data" });
  }
};

const getEeiodata = async (req, res) => {
  const userid = req.params.userid;
  if (!userid) {
    return res.status(400).json({ error: "Invalid param" });
  }
  pool
    .query("SELECT * FROM eeioentry WHERE userid = $1", [userid])
    .then((eeioDataResult) => {
      const eeiodatas = eeioDataResult.rows;

      res.status(200).json(eeiodatas);
    })
    .catch((error) => {
      console.error("activatedata Error:", error);
      res.status(500).send("Error fetching data");
    });
};

const fetchEeioEditData = async (req, res) => {
  const userid = req.params.userid;
  const id = req.params.id;

  if (!userid) {
    return res.status(400).json({ error: "Invalid param" });
  }
  pool
    .query("SELECT * FROM eeioentry WHERE userid = $1 AND id =$2", [userid, id])
    .then((eeioEditDataResult) => {
      const eeioEditData = eeioEditDataResult.rows;

      res.status(200).json(eeioEditData);
    })
    .catch((error) => {
      console.error("activatedata Error:", error);
      res.status(500).send("Error fetching data");
    });
};

const editEeioData = async (req, res) => {
  const id = req.params.id;

  const {
    userId,
    businessUnitsvalue,
    selectedForm,
    selectedlevel1,
    Level2value,
    Level3value,
    Level4value,
    Level5value,
    Sectorvalue,
    currencyvalue,
    quantity,
  } = req.body;

  if (!userId) {
    return res.status(401).json({ error: "User id is required" });
  }

  try {
    const fetchQuery1 =
      "SELECT * FROM companies WHERE userid = $1 AND unitname= $2";
    const fetchValues1 = [userId, businessUnitsvalue];
    const fetchResult1 = await pool.query(fetchQuery1, fetchValues1);

    if (fetchResult1.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "No data found for the given user id" });
    }
    const userData = fetchResult1.rows;

    const continent = userData[0].continent;
    const country = userData[0].countries;
    // Assuming you need to fetch some data before inserting
    const fetchQuery =
      "SELECT * FROM eeio WHERE pi = $1 AND level1 = $2 AND level2 = $3 AND level3 = $4 AND level4 = $5 AND level5 = $6 AND sector = $7 AND continent = $8 AND country = $9";
    const fetchValues = [
      selectedForm,
      selectedlevel1,
      Level2value,
      Level3value,
      Level4value,
      Level5value,
      Sectorvalue,
      continent,
      country,
    ];
    const fetchResult = await pool.query(fetchQuery, fetchValues);

    if (fetchResult.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "No data found for the given user id" });
    }
    const datas = fetchResult.rows;

    let co2e = null;
    let co2eofco2 = null;
    let co2eofch4 = null;
    let co2eofn2o = null;
    let co2eofother = null;

    const ghgValues = [
      "kg CO2e",
      "kg CO2e of CO2",
      "kg CO2e of CH4",
      "kg CO2e of N2O",
      "kg CO2e of Other",
    ];

    datas.forEach((data) => {
      if (data.ghg == ghgValues[0]) {
        co2e = data.pereuro * quantity;
      }

      if (data.ghg == ghgValues[1]) {
        co2eofco2 = data.pereuro * quantity;
      }

      if (data.ghg == ghgValues[2]) {
        co2eofch4 = data.pereuro * quantity;
      }

      if (data.ghg == ghgValues[3]) {
        co2eofn2o = data.pereuro * quantity;
      }

      if (data.ghg == ghgValues[4]) {
        co2eofother = data.pereuro * quantity;
      }
    });

    const exiobasecode = datas[0].exiobasecode;
    const scope = "scope 3";
    const updateQuery = `
            UPDATE eeioentry 
            SET scope = $1,
                continent = $2,
                country = $3,
                usercountry = $4,
                pi = $5,
                level1 = $6,
                level2 = $7,
                level3 = $8,
                level4 = $9,
                level5 = $10,
                sector = $11,
                exiobasecode = $12,
                uom = $13,
                quantity = $14,
                co2e = $15,
                co2eofco2 = $16,
                co2eofch4 = $17,
                co2eofn2o = $18,
                co2eofother = $19,
                unitname = $20
            WHERE id = $21 AND userid= $22
            RETURNING *
        `;

    const values = [
      scope,
      continent,
      country,
      country, // Assuming usercountry is the same as country for update
      selectedForm,
      selectedlevel1,
      Level2value,
      Level3value,
      Level4value,
      Level5value,
      Sectorvalue,
      exiobasecode,
      currencyvalue,
      quantity,
      co2e,
      co2eofco2,
      co2eofch4,
      co2eofn2o,
      co2eofother,
      businessUnitsvalue,
      id,
      userId,
      // assuming idToUpdate is the variable holding the id value for update
    ];

    const updateResult = await pool.query(updateQuery, values);

    if (updateResult.rowCount > 0) {
      console.log("Data updated successfully");
      res.status(200).json({
        message: "Company data updated successfully",
        data: updateResult.rows[0],
      });
    } else {
      console.log("No record found to update", userId, id);
      res.status(404).json({ message: "No record found to update" });
    }
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).json({ error: "Error inserting data" });
  }
};

const deleteEeioData = (req, res) => {
  const { id, userid } = req.params;

  const query = "DELETE FROM eeioentry WHERE id = $1 AND userid = $2";

  pool.query(query, [id, userid], (error) => {
    if (error) {
      console.error("Error deleting data:", error);
      res.status(500).json({ error: "Error deleting data" });
    } else {
      res.status(200).json({ message: "Data deleted successfully" });
    }
  });
};

export {
  getEeioByName,
  getEeioLevel2,
  getEeioLevel3,
  getEeioLevel4,
  getEeioLevel5,
  getEeiosector,
  insertEeioData,
  getEeiodata,
  fetchEeioEditData,
  editEeioData,
  deleteEeioData,
};
