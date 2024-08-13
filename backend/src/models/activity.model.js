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

// UPDATE public.activities
// SET "greenHouseGas" = CASE
//     WHEN "greenHouseGas" = 'kg CO2e of CO2 per unit' THEN 'kg CO2e of CO2'
//     WHEN "greenHouseGas" = 'kg CO2e of CH4 per unit' THEN 'kg CO2e of CH4'
//     WHEN "greenHouseGas" = 'kg CO2e of N2O per unit' THEN 'kg CO2e of N2O'
//     ELSE "greenHouseGas" -- to retain other values as they are
// END
// WHERE "greenHouseGas" IN ('kg CO2e of CO2 per unit', 'kg CO2e of CH4 per unit', 'kg CO2e of N2O per unit');

export { Activity };
