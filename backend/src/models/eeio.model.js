import { DataTypes } from "sequelize";
import { sequelize } from "../database/connectDb.js";

const Eeio = sequelize.define(
  "Eeio",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    countryCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productOrIndustry: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    level1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sector: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uniqueCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    greenHouseGas: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    greenHouseGasEmissionFactor: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "eeios",
  }
);

export { Eeio };
