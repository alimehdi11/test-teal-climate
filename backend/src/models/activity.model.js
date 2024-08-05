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
    },
    level4: {
      type: DataTypes.STRING,
    },
    level5: {
      type: DataTypes.STRING,
    },
    unitOfMeasurement: {
      type: DataTypes.STRING,
    },
    greenHouseGas: {
      type: DataTypes.STRING,
    },
    greenHouseGasEmissionFactor: {
      type: DataTypes.FLOAT,
    },
  },
  {
    timestamps: false,
    tableName: "activities",
  }
);

export { Activity };
