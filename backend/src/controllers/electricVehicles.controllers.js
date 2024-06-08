import { pool } from "../database/connectDb.js";

const getElectricVehicle = async (req, res) => {
  try {
    // Query params
    const scope = req.query.scope;
    const level1 = req.query.level1;
    const level2 = req.query.level2;
    const level3 = req.query.level3;
    const level4 = req.query.level4;
    const uom = req.query.uom;
    const unit = req.query.unit;
    const electricityConsumptionPerUnit =
      req.query.electricityConsumptionPerUnit;

    const queryParams = [
      scope,
      level1,
      level2,
      level3,
      level4,
      uom,
      unit,
      electricityConsumptionPerUnit,
    ];

    const passedQueryParams = [];

    const columnNames = [
      "scope",
      "level1",
      "level2",
      "level3",
      "level4",
      "uom",
      "unit",
      "electricityConsumptionPerUnit",
    ];

    queryParams.forEach((param, index) => {
      if (param !== undefined) {
        passedQueryParams.push(`"${columnNames[index]}" = '${param}'`);
      }
    });

    const query =
      `SELECT * FROM "electricVehicles"` +
      (passedQueryParams.length > 0
        ? ` WHERE ${passedQueryParams.join(" AND ")}`
        : ``);

    const result = await pool.query(query);
    const electricVehicle = result.rows[0];
    return res.send(electricVehicle);
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
};

export { getElectricVehicle };
