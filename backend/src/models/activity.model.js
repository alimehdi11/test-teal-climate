import { DataTypes } from "sequelize";
import { sequelize } from "../database/connectDb.js";

const Activity = sequelize.define(
  "Activity",
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
    level5: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unitOfMeasurement: {
      type: DataTypes.STRING,
      // field: "unit_of_measurement",
    },
    greenHouseGas: {
      type: DataTypes.STRING,
      // field: "green_house_gas",
    },
    greenHouseGasEmissionFactor: {
      type: DataTypes.FLOAT,
      // field: "green_house_gas_emission_factor",
    },
  },
  {
    timestamps: false,
    tableName: "activities",
  }
);

// await Activity.sync();

export { Activity };
