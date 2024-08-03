import { DataTypes } from "sequelize";
import { sequelize } from "../database/connectDb.js";

const ElectricVehicle = sequelize.define(
  "ElectricVehicle",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    scope: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    level1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    level2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    level3: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    level4: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unitOfMeasurement: {
      type: DataTypes.STRING,
      allowNull: false,
      // field: "unit_of_measurement",
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    electricityConsumptionPerUnit: {
      type: DataTypes.FLOAT,
      allowNull: false,
      // field: "electricity_consumption_per_unit",
    },
  },
  {
    timestamps: false,
    tableName: "electricVehicles",
    // tableName: "electric_vehicles",
  }
);

// await ElectricVehicle.sync();

export { ElectricVehicle };
