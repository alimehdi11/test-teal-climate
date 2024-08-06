import { ElectricVehicle } from "./../models/electricVehicle.model.js";

const getElectricVehicle = async (req, res) => {
  try {
    // Query params
    const {
      // scope,
      level1,
      level2,
      level3,
      level4,
      unitOfMeasurement,
      // unit,
      // electricityConsumptionPerUnit,
    } = req.query;

    const whereClause = {};
    // if (scope) whereClause.scope = scope;
    if (level1) whereClause.level1 = level1;
    if (level2) whereClause.level2 = level2;
    if (level3) whereClause.level3 = level3;
    if (level4) whereClause.level4 = level4;
    if (unitOfMeasurement) whereClause.unitOfMeasurement = unitOfMeasurement;
    // if (unit) whereClause.unit = unit;
    // if (electricityConsumptionPerUnit)
    // whereClause.electricityConsumptionPerUnit = electricityConsumptionPerUnit;

    const electricVehicle = await ElectricVehicle.findAll({
      where: whereClause,
    });

    if (!electricVehicle) {
      return res.status(404).send({ message: "Electric Vehicle not found" });
    }

    return res.status(200).json(electricVehicle);
  } catch (error) {
    console.log("Could not getElectricVehicle");
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getElectricVehicle };
